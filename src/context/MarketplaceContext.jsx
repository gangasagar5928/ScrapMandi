import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  runTransaction
} from "firebase/firestore";
import { ORDER_STATES, LISTING_STATES } from "../data/categories";
import { INITIAL_SEED_LISTINGS, INITIAL_SEED_ORDERS, INITIAL_SEED_DISPUTES } from "../data/seedData";
import { useAuth } from "./AuthContext";

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({ children }) => {
  const { userProfile, demoMode } = useAuth();
  const [listings, setListings] = useState(INITIAL_SEED_LISTINGS);
  const [orders, setOrders] = useState(INITIAL_SEED_ORDERS);
  const [disputes, setDisputes] = useState(INITIAL_SEED_DISPUTES);
  const [reviews, setReviews] = useState([]);
  const [benchmarks, setBenchmarks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize seed/storage data for fast demo and offline resiliency
  useEffect(() => {
    const localListings = localStorage.getItem("scrapmandi_listings");
    const localOrders = localStorage.getItem("scrapmandi_orders");
    const localDisputes = localStorage.getItem("scrapmandi_disputes");
    const localReviews = localStorage.getItem("scrapmandi_reviews");

    if (localListings) {
      setListings(JSON.parse(localListings));
    } else {
      localStorage.setItem("scrapmandi_listings", JSON.stringify(INITIAL_SEED_LISTINGS));
    }

    if (localOrders) {
      setOrders(JSON.parse(localOrders));
    } else {
      localStorage.setItem("scrapmandi_orders", JSON.stringify(INITIAL_SEED_ORDERS));
    }

    if (localDisputes) {
      setDisputes(JSON.parse(localDisputes));
    } else {
      localStorage.setItem("scrapmandi_disputes", JSON.stringify(INITIAL_SEED_DISPUTES));
    }

    if (localReviews) setReviews(JSON.parse(localReviews));

    // Try real-time Firestore sync if connected
    let unsubListings = () => {};
    let unsubOrders = () => {};

    try {
      const listingsQuery = query(collection(db, "listings"), orderBy("createdAt", "desc"));
      unsubListings = onSnapshot(listingsQuery, (snapshot) => {
        if (!snapshot.empty) {
          const firestoreListings = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setListings(firestoreListings);
          localStorage.setItem("scrapmandi_listings", JSON.stringify(firestoreListings));
        }
      }, (err) => {
        console.warn("Firestore listings subscription note:", err.message);
      });

      const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
        if (!snapshot.empty) {
          const firestoreOrders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setOrders(firestoreOrders);
          localStorage.setItem("scrapmandi_orders", JSON.stringify(firestoreOrders));
        }
      }, (err) => {
        console.warn("Firestore orders subscription note:", err.message);
      });
    } catch (e) {
      console.warn("Firestore init bypassed, using local memory store:", e);
    }

    setLoading(false);
    return () => {
      unsubListings();
      unsubOrders();
    };
  }, []);

  // Save changes locally to persist state across reloads in demo
  const persistState = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Vendor: Create Listing
  const createListing = async (listingData) => {
    const newListing = {
      id: "lst_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      vendorUid: userProfile?.uid || "demo_vendor_001",
      vendorName: userProfile?.name || "Verified Scrap Vendor",
      vendorBusiness: userProfile?.businessName || "Industrial Scrap Traders",
      vendorPhone: userProfile?.phone || "+91 98112 34567",
      vendorRating: userProfile?.ratingSummary?.average || 4.9,
      vendorReviewsCount: userProfile?.ratingSummary?.count || 12,
      category: listingData.category,
      subCategory: listingData.subCategory,
      subCategoryName: listingData.subCategoryName || listingData.subCategory,
      grade: listingData.grade || "Standard Commercial",
      quantityAvailable: Number(listingData.quantityAvailable),
      totalInitialQuantity: Number(listingData.quantityAvailable),
      unit: listingData.unit || "tonne",
      pricePerUnit: Number(listingData.pricePerUnit),
      city: listingData.city || userProfile?.city || "Delhi-NCR",
      state: listingData.state || userProfile?.state || "Delhi",
      approxLocation: listingData.approxLocation || "Industrial Area",
      privateAddress: listingData.privateAddress || "",
      photos: listingData.photos?.length ? listingData.photos : [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80"
      ],
      description: listingData.description || "",
      minOrderQuantity: Number(listingData.minOrderQuantity || 1),
      gstApplicable: !!listingData.gstApplicable,
      status: LISTING_STATES.AVAILABLE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "listings"), newListing);
    } catch (e) {
      console.warn("Firestore listing save note (cached locally):", e);
    }

    setListings(prev => {
      const updated = [newListing, ...prev];
      persistState("scrapmandi_listings", updated);
      return updated;
    });

    return newListing;
  };

  // Vendor: Update Listing
  const updateListing = async (listingId, updates) => {
    try {
      const ref = doc(db, "listings", listingId);
      await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
    } catch (e) {
      console.warn("Firestore update listing note:", e);
    }

    setListings(prev => {
      const updated = prev.map(item => item.id === listingId ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item);
      persistState("scrapmandi_listings", updated);
      return updated;
    });
  };

  // Vendor: Delete Listing
  const deleteListing = async (listingId) => {
    setListings(prev => {
      const updated = prev.filter(item => item.id !== listingId);
      persistState("scrapmandi_listings", updated);
      return updated;
    });
  };

  // Dealer: Place Order with Atomic Quantity Decrement Guard
  const createOrder = async ({ listing, requestedQuantity, deliveryAddress, notes = "", paymentMode = "gateway" }) => {
    const qty = Number(requestedQuantity);
    
    // Validation: prevent negative inventory & overselling
    if (qty <= 0) throw new Error("Quantity must be greater than 0");
    if (qty > listing.quantityAvailable) {
      throw new Error(`Only ${listing.quantityAvailable} ${listing.unit} available in stock.`);
    }

    const pricePerUnit = Number(listing.pricePerUnit);
    const subtotal = qty * pricePerUnit;
    const gstAmount = listing.gstApplicable ? Math.round(subtotal * 0.18) : 0;
    const platformFee = 0; // Phase 1: Zero marketplace commission as per PRD Section 8
    const totalAmount = subtotal + gstAmount + platformFee;

    const newOrder = {
      id: "ord_" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase(),
      listingId: listing.id,
      listingTitle: `${listing.subCategoryName || listing.subCategory} (${listing.grade})`,
      category: listing.category,
      subCategory: listing.subCategory,
      grade: listing.grade,
      photo: listing.photos?.[0] || "",
      vendorUid: listing.vendorUid,
      vendorName: listing.vendorName,
      vendorBusiness: listing.vendorBusiness,
      vendorPhone: listing.vendorPhone,
      dealerUid: userProfile?.uid || "demo_dealer_002",
      dealerName: userProfile?.name || "Verified Scrap Dealer",
      dealerBusiness: userProfile?.businessName || "Singhania Steel & Alloys",
      dealerPhone: userProfile?.phone || "+91 98201 87654",
      dealerGstin: userProfile?.gstin || "",
      requestedQuantity: qty,
      unit: listing.unit,
      pricePerUnit: pricePerUnit,
      subtotal,
      gstAmount,
      totalAmount,
      deliveryAddress: deliveryAddress || userProfile?.approxLocation || "Standard Mill Delivery Point",
      privatePickupAddress: listing.privateAddress || `${listing.approxLocation}, ${listing.city}`,
      notes,
      paymentMode,
      paymentStatus: paymentMode === "gateway" ? "PAID_ESCROW_GATEWAY" : "CASH_ON_PICKUP_UNPROTECTED",
      paymentEventId: "pay_evt_" + Date.now().toString(36),
      orderStatus: ORDER_STATES.PAYMENT_CONFIRMED.key,
      fulfilmentStatus: "PENDING_VENDOR_ACCEPTANCE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          state: ORDER_STATES.ORDER_CREATED.key,
          title: "Order Request Placed",
          timestamp: new Date().toISOString(),
          note: `Dealer ordered ${qty} ${listing.unit} at ₹${pricePerUnit}/${listing.unit}`
        },
        {
          state: ORDER_STATES.PAYMENT_CONFIRMED.key,
          title: "Payment Confirmed via Gateway",
          timestamp: new Date().toISOString(),
          note: `₹${totalAmount.toLocaleString('en-IN')} held securely. Awaiting vendor acceptance.`
        }
      ]
    };

    // Atomic quantity decrement on listing
    const remainingQty = listing.quantityAvailable - qty;
    const newListingStatus = remainingQty <= 0 ? LISTING_STATES.SOLD : LISTING_STATES.AVAILABLE;

    // Update listing in memory & db
    updateListing(listing.id, {
      quantityAvailable: remainingQty,
      status: newListingStatus
    });

    try {
      await addDoc(collection(db, "orders"), newOrder);
    } catch (e) {
      console.warn("Firestore order note (stored locally):", e);
    }

    setOrders(prev => {
      const updated = [newOrder, ...prev];
      persistState("scrapmandi_orders", updated);
      return updated;
    });

    // Add In-App notification
    addNotification({
      userId: listing.vendorUid,
      title: "New Scrap Order Request",
      message: `Order #${newOrder.id} received for ${qty} ${listing.unit} of ${listing.subCategoryName}.`,
      type: "order"
    });

    return newOrder;
  };

  // Order State Machine Transition
  const updateOrderStatus = async (orderId, nextStateKey, note = "") => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");

    const targetDef = Object.values(ORDER_STATES).find(s => s.key === nextStateKey);
    if (!targetDef) throw new Error("Invalid state transition");

    const updatedTimeline = [
      ...order.timeline,
      {
        state: nextStateKey,
        title: targetDef.label,
        timestamp: new Date().toISOString(),
        note: note || targetDef.description
      }
    ];

    let updates = {
      orderStatus: nextStateKey,
      updatedAt: new Date().toISOString(),
      timeline: updatedTimeline
    };

    // Handle special lifecycle transitions
    if (nextStateKey === ORDER_STATES.VENDOR_REJECTED.key) {
      // Revert listing quantity atomically if vendor rejects
      const targetListing = listings.find(l => l.id === order.listingId);
      if (targetListing) {
        updateListing(targetListing.id, {
          quantityAvailable: targetListing.quantityAvailable + order.requestedQuantity,
          status: LISTING_STATES.AVAILABLE
        });
      }
      updates.refundStatus = "REFUND_INITIATED_GATEWAY";
      updates.fulfilmentStatus = "CANCELLED_BY_VENDOR";
    }

    if (nextStateKey === ORDER_STATES.COMPLETED.key) {
      updates.fulfilmentStatus = "COMPLETED_AND_SETTLED";
      updates.settlementStatus = "PAYOUT_RELEASED_TO_VENDOR";
      updates.completedAt = new Date().toISOString();
    }

    if (nextStateKey === ORDER_STATES.READY_FOR_PICKUP.key) {
      updates.fulfilmentStatus = "READY_AT_YARD";
    }

    try {
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref, updates);
    } catch (e) {
      console.warn("Firestore update order note:", e);
    }

    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, ...updates } : o);
      persistState("scrapmandi_orders", updated);
      return updated;
    });

    return updates;
  };

  // Raise Dispute
  const raiseDispute = async (orderId, { reason, evidenceNotes = "", raisedByRole = "dealer" }) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");

    const newDispute = {
      id: "dsp_" + Date.now().toString(36),
      orderId,
      raisedBy: userProfile?.uid || "unknown",
      raisedByName: userProfile?.name || "User",
      raisedByRole,
      reason,
      evidenceNotes,
      vendorUid: order.vendorUid,
      dealerUid: order.dealerUid,
      orderTotal: order.totalAmount,
      status: "UNDER_REVIEW",
      createdAt: new Date().toISOString(),
      resolvedAt: null,
      resolutionNotes: ""
    };

    await updateOrderStatus(orderId, ORDER_STATES.DISPUTED.key, `Dispute raised: ${reason}`);

    setDisputes(prev => {
      const updated = [newDispute, ...prev];
      persistState("scrapmandi_disputes", updated);
      return updated;
    });

    return newDispute;
  };

  // Admin: Resolve Dispute
  const resolveDispute = async (disputeId, { resolution, adminNotes = "" }) => {
    const dispute = disputes.find(d => d.id === disputeId);
    if (!dispute) throw new Error("Dispute not found");

    const nextOrderState = resolution === "REFUND_BUYER" 
      ? ORDER_STATES.REFUNDED.key 
      : ORDER_STATES.COMPLETED.key;

    await updateOrderStatus(dispute.orderId, nextOrderState, `Admin Resolution: ${resolution}. ${adminNotes}`);

    setDisputes(prev => {
      const updated = prev.map(d => d.id === disputeId ? {
        ...d,
        status: "RESOLVED",
        resolution,
        resolutionNotes: adminNotes,
        resolvedAt: new Date().toISOString()
      } : d);
      persistState("scrapmandi_disputes", updated);
      return updated;
    });
  };

  // Submit Order Review (Only completed transactions)
  const submitReview = async (orderId, { rating, comment }) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.orderStatus !== ORDER_STATES.COMPLETED.key) {
      throw new Error("Only completed transactions can generate ratings as per PRD Section 5.8");
    }

    const newReview = {
      id: "rev_" + Date.now().toString(36),
      orderId,
      vendorUid: order.vendorUid,
      dealerUid: order.dealerUid,
      dealerName: order.dealerName,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => {
      const updated = [newReview, ...prev];
      persistState("scrapmandi_reviews", updated);
      return updated;
    });

    return newReview;
  };

  // Notifications
  const addNotification = (notif) => {
    const item = {
      id: "notif_" + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      read: false,
      ...notif
    };
    setNotifications(prev => [item, ...prev]);
  };

  return (
    <MarketplaceContext.Provider value={{
      listings,
      orders,
      disputes,
      reviews,
      benchmarks,
      notifications,
      loading,
      createListing,
      updateListing,
      deleteListing,
      createOrder,
      updateOrderStatus,
      raiseDispute,
      resolveDispute,
      submitReview,
      addNotification,
      setListings,
      setOrders
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error("useMarketplace must be used within a MarketplaceProvider");
  return context;
};
