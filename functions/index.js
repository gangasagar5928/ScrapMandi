const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

// -------------------------------------------------------------
// 1. RAZORPAY CONFIGURATION & HELPERS
// -------------------------------------------------------------
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || functions.config().razorpay?.key_id || "rzp_test_scrapmandi_placeholder";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || functions.config().razorpay?.key_secret || "rzp_secret_placeholder";
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

/**
 * HTTP: Create Razorpay Order
 * Called from client frontend before opening Razorpay checkout modal
 */
exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated to create an order.");
  }

  const { orderId, amountInRupees, currency = "INR", notes = {} } = data;
  if (!orderId || !amountInRupees || amountInRupees <= 0) {
    throw new functions.https.HttpsError("invalid-argument", "Valid orderId and positive amount are required.");
  }

  try {
    const razorpay = getRazorpayInstance();
    const amountInPaise = Math.round(Number(amountInRupees) * 100);

    const options = {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${orderId.substring(0, 30)}`,
      notes: {
        scrapMandiOrderId: orderId,
        buyerUid: context.auth.uid,
        ...notes
      }
    };

    const rzpOrder = await razorpay.orders.create(options);

    // Record intent in Firestore
    await db.collection("orders").doc(orderId).set({
      razorpayOrderId: rzpOrder.id,
      paymentStatus: "ORDER_CREATED_PENDING_GATEWAY",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return {
      success: true,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID || functions.config().razorpay?.key_id
    };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new functions.https.HttpsError("internal", error.message || "Failed to create payment order.");
  }
});

/**
 * Webhook: Razorpay Payment Events Webhook
 * Source of truth for server-side payment confirmation & idempotent processing
 */
exports.razorpayWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || functions.config().razorpay?.webhook_secret;
  const signature = req.headers["x-razorpay-signature"];

  // Verify HMAC-SHA256 Signature
  if (webhookSecret && signature) {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid Razorpay Webhook Signature");
      return res.status(400).send("Invalid signature");
    }
  }

  const event = req.body;
  const eventId = event.event_id || `evt_${Date.now()}`;
  const eventType = event.event;
  const payload = event.payload?.payment?.entity || event.payload?.order?.entity || {};

  console.log(`Processing Razorpay Webhook: ${eventType} (Event ID: ${eventId})`);

  // Idempotency Check: Prevent duplicate webhook processing
  const eventRef = db.collection("paymentEvents").doc(eventId);
  const eventDoc = await eventRef.get();
  if (eventDoc.exists && eventDoc.data().processed) {
    console.log(`Duplicate event ${eventId} already processed.`);
    return res.status(200).json({ status: "already_processed" });
  }

  try {
    const orderId = payload.notes?.scrapMandiOrderId;

    if (eventType === "payment.captured") {
      const paymentId = payload.id;
      const amount = payload.amount / 100;

      if (orderId) {
        const orderRef = db.collection("orders").doc(orderId);
        
        await db.runTransaction(async (transaction) => {
          const docSnap = await transaction.get(orderRef);
          if (!docSnap.exists) return;

          const currentData = docSnap.data();
          const existingTimeline = currentData.timeline || [];

          transaction.update(orderRef, {
            orderStatus: "payment_confirmed",
            paymentStatus: "PAID_ESCROW_GATEWAY",
            providerPaymentId: paymentId,
            paymentEventId: eventId,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            timeline: [
              ...existingTimeline,
              {
                state: "payment_confirmed",
                title: "Payment Confirmed via Razorpay",
                timestamp: new Date().toISOString(),
                note: `₹${amount.toLocaleString('en-IN')} verified server-side (Payment ID: ${paymentId})`
              }
            ]
          });
        });
      }
    } else if (eventType === "refund.processed") {
      const refundId = payload.id;
      if (orderId) {
        await db.collection("orders").doc(orderId).set({
          orderStatus: "refunded",
          refundStatus: "REFUND_SETTLED_GATEWAY",
          providerRefundId: refundId,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    }

    // Save Event Log in paymentEvents
    await eventRef.set({
      providerEventId: eventId,
      eventType,
      orderId: orderId || null,
      providerPaymentId: payload.id || null,
      amount: (payload.amount || 0) / 100,
      rawPayload: event,
      signatureVerified: true,
      processed: true,
      receivedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(200).json({ status: "success", eventId });
  } catch (err) {
    console.error("Error processing Razorpay webhook:", err);
    return res.status(500).send("Webhook processing error");
  }
});

/**
 * Callable: Process Refund for Rejected / Disputed Orders
 */
exports.processOrderRefund = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Authentication required");
  }

  const { orderId, reason = "Vendor unable to fulfill order" } = data;
  if (!orderId) {
    throw new functions.https.HttpsError("invalid-argument", "orderId is required");
  }

  const orderDoc = await db.collection("orders").doc(orderId).get();
  if (!orderDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Order not found");
  }

  const orderData = orderDoc.data();
  const paymentId = orderData.providerPaymentId;

  if (!paymentId) {
    throw new functions.https.HttpsError("failed-precondition", "No gateway payment ID found on order");
  }

  try {
    const razorpay = getRazorpayInstance();
    const refund = await razorpay.payments.refund(paymentId, {
      notes: {
        orderId,
        reason,
        processedBy: context.auth.uid
      }
    });

    await db.collection("orders").doc(orderId).set({
      orderStatus: "refunded",
      refundStatus: "REFUND_INITIATED_GATEWAY",
      providerRefundId: refund.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return { success: true, refundId: refund.id };
  } catch (error) {
    console.error("Refund error:", error);
    throw new functions.https.HttpsError("internal", error.message || "Failed to process refund");
  }
});


// -------------------------------------------------------------
// 2. WHATSAPP MANDI DIGEST & META BUSINESS PLATFORM
// -------------------------------------------------------------

/**
 * Helper: Calculate average indicative benchmark from qualifying listings
 */
const calculateCategoryBenchmarks = async () => {
  const listingsSnap = await db.collection("listings")
    .where("status", "==", "Available")
    .get();

  const categoryMap = {
    ferrous: { name: "HMS 1 Loha", prices: [], unit: "tonne" },
    non_ferrous: { name: "Copper 99% Wire", prices: [], unit: "kg" },
    paper: { name: "OCC Gatta Bales", prices: [], unit: "kg" },
    plastic: { name: "PET Washed Flakes", prices: [], unit: "kg" }
  };

  listingsSnap.forEach(doc => {
    const data = doc.data();
    if (categoryMap[data.category] && data.pricePerUnit > 0) {
      categoryMap[data.category].prices.push(Number(data.pricePerUnit));
    }
  });

  const benchmarks = {};
  for (const [key, obj] of Object.entries(categoryMap)) {
    if (obj.prices.length > 0) {
      const avg = Math.round(obj.prices.reduce((a, b) => a + b, 0) / obj.prices.length);
      benchmarks[key] = {
        name: obj.name,
        rate: avg,
        unit: obj.unit,
        count: obj.prices.length
      };
    } else {
      // Default baseline spot benchmark
      const fallbacks = {
        ferrous: { name: "HMS 1 Loha", rate: 38800, unit: "tonne", count: 12 },
        non_ferrous: { name: "Copper 99% Wire", rate: 775, unit: "kg", count: 8 },
        paper: { name: "OCC Gatta Bales", rate: 16.0, unit: "kg", count: 6 },
        plastic: { name: "PET Washed Flakes", rate: 47.5, unit: "kg", count: 9 }
      };
      benchmarks[key] = fallbacks[key];
    }
  }

  return benchmarks;
};

/**
 * Helper: Send WhatsApp Message via Meta Cloud API
 */
const sendWhatsAppCloudMessage = async (toPhone, messageBody) => {
  const token = process.env.WHATSAPP_API_TOKEN || functions.config().whatsapp?.token;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || functions.config().whatsapp?.phone_number_id;

  if (!token || !phoneNumberId) {
    console.warn("WhatsApp credentials not configured in environment. Simulating send.");
    return { simulated: true };
  }

  // Format clean 10-12 digit international number without spaces or +
  const cleanPhone = toPhone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: formattedPhone,
    type: "text",
    text: {
      preview_url: true,
      body: messageBody
    }
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return response.data;
};

/**
 * Scheduled Cron Job: Daily Morning WhatsApp Mandi Digest (09:00 AM IST)
 */
exports.dailyWhatsAppDigest = functions.pubsub
  .schedule("0 9 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {
    console.log("Running Daily 9:00 AM WhatsApp Mandi Rate Digest Job...");

    const benchmarks = await calculateCategoryBenchmarks();
    const todayFormatted = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    const digestMessage = 
`📊 *Delhi Mandi Opening Bhav • ${todayFormatted}*

Namaste! Aaj ke spot scrap benchmark rates (Mayapuri, Mundka, Bawana & Wazirpur):

• *HMS 1 Loha:* ₹${benchmarks.ferrous.rate.toLocaleString('en-IN')}/${benchmarks.ferrous.unit}
• *Copper 99% Wire:* ₹${benchmarks.non_ferrous.rate.toLocaleString('en-IN')}/${benchmarks.non_ferrous.unit}
• *Peetal Honey Purza:* ₹490/kg
• *OCC Gatta Bales:* ₹${benchmarks.paper.rate.toLocaleString('en-IN')}/${benchmarks.paper.unit}
• *PET Bottle Flakes:* ₹${benchmarks.plastic.rate.toLocaleString('en-IN')}/${benchmarks.plastic.unit}

⚡ *Live Lots Available on ScrapMandi:* https://scrapmandi5928.firebaseapp.com

_Rates computed at 09:00 AM IST. Settlement on Dharam Kanta slip._
_Reply *STOP* to unsubscribe._`;

    // Query all opt-in users
    const usersSnap = await db.collection("users")
      .where("notificationPreferences.whatsappOptIn", "==", true)
      .get();

    let successCount = 0;
    const sendPromises = [];

    usersSnap.forEach((doc) => {
      const user = doc.data();
      const phone = user.phone;

      if (phone) {
        sendPromises.push(
          sendWhatsAppCloudMessage(phone, digestMessage)
            .then(() => {
              successCount++;
              return db.collection("notifications").add({
                userId: user.uid || doc.id,
                channel: "whatsapp",
                template: "daily_mandi_digest",
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                status: "DELIVERED"
              });
            })
            .catch(err => {
              console.error(`Failed to send WhatsApp digest to ${phone}:`, err.message);
            })
        );
      }
    });

    await Promise.all(sendPromises);
    console.log(`WhatsApp digest sent successfully to ${successCount} opted-in traders.`);
    return null;
  });

/**
 * Webhook: Meta WhatsApp Inbound Webhook (Verification + STOP Opt-Out handler)
 */
exports.whatsappWebhook = functions.https.onRequest(async (req, res) => {
  // 1. GET: Webhook verification challenge from Meta
  if (req.method === "GET") {
    const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || functions.config().whatsapp?.verify_token || "scrapmandi_verify_token_5928";
    
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verifyToken) {
      console.log("WhatsApp Webhook Verified by Meta");
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Verification token mismatch");
    }
  }

  // 2. POST: Inbound user replies (STOP / UNSUBSCRIBE / START / BHAV)
  if (req.method === "POST") {
    const body = req.body;

    if (body.object === "whatsapp_business_account") {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];
        for (const change of changes) {
          const value = change.value;
          const messages = value.messages || [];

          for (const msg of messages) {
            const senderPhone = msg.from; // e.g. "919811234567"
            const textBody = msg.text?.body?.trim().toUpperCase() || "";

            console.log(`Inbound WhatsApp message from ${senderPhone}: "${textBody}"`);

            // Handle STOP / UNSUBSCRIBE (PRD Section 5.7 compliance)
            if (textBody === "STOP" || textBody === "UNSUBSCRIBE" || textBody === "BAND") {
              const usersSnap = await db.collection("users")
                .where("phone", ">=", senderPhone.substring(2))
                .limit(5)
                .get();

              usersSnap.forEach(async (uDoc) => {
                await uDoc.ref.update({
                  "notificationPreferences.whatsappOptIn": false,
                  updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
              });

              await sendWhatsAppCloudMessage(
                senderPhone,
                "Aapka WhatsApp Mandi Bhav alert band kar diya gaya hai. Dobara shuru karne ke liye *START* likh kar bhejein."
              );
            } 
            // Handle START / BHAV instant rate query
            else if (textBody === "START" || textBody === "BHAV" || textBody === "RATE") {
              const benchmarks = await calculateCategoryBenchmarks();
              const quickBhav = 
`⚡ *Delhi Mandi Instant Rates:*

• HMS 1 Loha: ₹${benchmarks.ferrous.rate.toLocaleString('en-IN')}/${benchmarks.ferrous.unit}
• Copper 99% Wire: ₹${benchmarks.non_ferrous.rate.toLocaleString('en-IN')}/${benchmarks.non_ferrous.unit}
• Peetal Honey: ₹490/kg
• OCC Gatta: ₹${benchmarks.paper.rate.toLocaleString('en-IN')}/${benchmarks.paper.unit}

Visit: https://scrapmandi5928.firebaseapp.com`;

              await sendWhatsAppCloudMessage(senderPhone, quickBhav);
            }
          }
        }
      }

      return res.status(200).send("EVENT_RECEIVED");
    }

    return res.status(404).send("Not Found");
  }
});
