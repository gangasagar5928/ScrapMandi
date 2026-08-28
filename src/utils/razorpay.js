import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/config";

/**
 * ScrapMandi Razorpay Checkout Integration Utility
 * Handles dynamic script loading, server order verification, checkout modal triggering, and callback handlers
 */

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Call createRazorpayOrder Cloud Function for server-side order generation & amount validation
 */
export const createServerRazorpayOrder = async ({ orderId, amountInRupees, notes = {} }) => {
  try {
    const createOrderFn = httpsCallable(functions, "createRazorpayOrder");
    const result = await createOrderFn({
      orderId,
      amountInRupees,
      currency: "INR",
      notes
    });
    return result.data;
  } catch (error) {
    console.warn("Cloud function createRazorpayOrder note (falling back to direct client checkout):", error.message);
    return null;
  }
};

export const initiateRazorpayPayment = async ({
  orderId,
  razorpayOrderId = "",
  amountInRupees,
  customerName = "Scrap Trader",
  customerPhone = "+91 98112 34567",
  customerEmail = "trader@scrapmandi.com",
  listingTitle = "Scrap Lot Purchase",
  onSuccess,
  onFailure,
  onDismiss
}) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error("Could not load Razorpay SDK. Please check your internet connection.");
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_ScrapMandi5928";
  const amountInPaise = Math.round(Number(amountInRupees) * 100);

  const options = {
    key: keyId,
    amount: amountInPaise,
    currency: "INR",
    name: "ScrapMandi Delhi NCR",
    description: `Payment for ${listingTitle}`,
    image: "/logo.png",
    order_id: razorpayOrderId || undefined, // Server-generated order ID from Cloud Function
    prefill: {
      name: customerName,
      contact: customerPhone,
      email: customerEmail
    },
    notes: {
      scrapMandiOrderId: orderId,
      mandiRegion: "Delhi NCR"
    },
    theme: {
      color: "#059669" // ScrapMandi emerald brand
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id || razorpayOrderId || null,
          razorpaySignature: response.razorpay_signature || null,
          orderId
        });
      }
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      }
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      if (onFailure) {
        onFailure(response.error);
      }
    });
    rzp.open();
    return rzp;
  } catch (err) {
    console.error("Razorpay initiation error:", err);
    throw err;
  }
};
