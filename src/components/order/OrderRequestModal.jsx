import React, { useState } from "react";
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Banknote, 
  Lock 
} from "lucide-react";
import confetti from "canvas-confetti";
import { IOSSheet } from "../ios/IOSSheet";
import { IOSButton } from "../ios/IOSButton";
import { IOSSegmentedControl } from "../ios/IOSSegmentedControl";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { initiateRazorpayPayment, createServerRazorpayOrder } from "../../utils/razorpay";

export const OrderRequestModal = ({ isOpen, onClose, listing, onSuccess }) => {
  const { userProfile, isAuthenticated } = useAuth();
  const { createOrder } = useMarketplace();

  const [quantity, setQuantity] = useState(listing ? Math.min(5, listing.quantityAvailable) : 1);
  const [deliveryType, setDeliveryType] = useState("ex_yard");
  const [deliveryAddress, setDeliveryAddress] = useState(userProfile?.approxLocation || "Mayapuri Phase 2 Secondary Rolling Mill");
  const [paymentMode, setPaymentMode] = useState("gateway");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (listing) {
      setQuantity(Math.min(5, listing.quantityAvailable || 1));
      setError("");
    }
  }, [listing]);

  if (!listing) return null;

  const maxQty = listing.quantityAvailable;
  const unitPrice = Number(listing.pricePerUnit);
  const subtotal = quantity * unitPrice;
  const gstAmount = listing.gstApplicable ? Math.round(subtotal * 0.18) : 0;
  const totalAmount = subtotal + gstAmount;

  const handleSetPercent = (percent) => {
    const calculated = Math.max(1, Math.round((maxQty * percent) / 100));
    setQuantity(calculated);
  };

  const deliveryOptions = [
    { value: "ex_yard", label: "Ex-Yard Pickup" },
    { value: "mill_delivery", label: "Mill Truck Delivery" },
  ];

  const paymentOptions = [
    { value: "gateway", label: "Razorpay / UPI Escrow" },
    { value: "cash", label: "Dharam Kanta Gate Cash" },
  ];

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (quantity <= 0 || quantity > maxQty) {
      setError(`Quantity must be between 1 and ${maxQty} ${listing.unit}`);
      return;
    }

    setLoading(true);

    const finalizeOrder = async (rzpPaymentId = null) => {
      try {
        const created = await createOrder({
          listing,
          requestedQuantity: quantity,
          deliveryAddress: deliveryType === "mill_delivery" ? deliveryAddress : "Ex-Yard Vendor Pickup",
          notes: rzpPaymentId ? `${notes} (Razorpay ID: ${rzpPaymentId})` : notes,
          paymentMode
        });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        onSuccess(created);
        onClose();
      } catch (err) {
        setError(err.message || "Failed to place order request");
      } finally {
        setLoading(false);
      }
    };

    if (paymentMode === "gateway") {
      const internalOrderId = `ORD_${Date.now()}`;
      try {
        const serverOrderResult = await createServerRazorpayOrder({
          orderId: internalOrderId,
          amountInRupees: totalAmount,
          notes: {
            listingId: listing.id,
            buyerUid: userProfile?.uid || "guest_buyer",
            quantityRequested: `${quantity} ${listing.unit}`
          }
        });

        initiateRazorpayPayment({
          amount: totalAmount,
          currency: "INR",
          name: "ScrapMandi Delhi NCR",
          description: `Escrow: ${quantity} ${listing.unit} ${listing.subCategoryName || listing.subCategory}`,
          orderId: serverOrderResult.orderId || "",
          user: {
            name: userProfile?.name || "Delhi Scrap Buyer",
            email: userProfile?.email || "dealer@scrapmandi.in",
            contact: userProfile?.phone || "9811234567"
          },
          themeColor: "#007AFF",
          onSuccess: async (response) => {
            await finalizeOrder(response.razorpay_payment_id);
          },
          onDismiss: () => {
            setLoading(false);
          }
        });
      } catch (err) {
        console.warn("Razorpay fallback to direct order creation:", err);
        await finalizeOrder("DIRECT_DEMO_ESCROW");
      }
    } else {
      await finalizeOrder();
    }
  };

  return (
    <IOSSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Place Scrap Order"
      subtitle={`${listing.subCategoryName || listing.subCategory} • ₹${Number(listing.pricePerUnit).toLocaleString('en-IN')}/${listing.unit}`}
    >
      <form onSubmit={handleSubmitOrder} className="space-y-4">
        
        {error && (
          <div className="p-3 bg-ios-red/15 border border-ios-red/30 rounded-[12px] text-xs text-ios-red flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quantity Selector Group */}
        <div className="p-3.5 bg-ios-bg2 rounded-[16px] border border-ios-separator/20 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-ios-label">Order Quantity</span>
            <span className="text-ios-label2 font-medium">Available: {maxQty} {listing.unit}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={maxQty}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(maxQty, Math.max(1, Number(e.target.value))))}
              className="flex-1 px-3.5 py-2.5 bg-ios-bg3 text-ios-label rounded-[12px] text-base font-bold focus:outline-none focus:ring-2 focus:ring-ios-blue/40 border border-transparent"
              required
            />
            <span className="px-3 py-2.5 bg-ios-bg3 text-ios-label2 font-bold text-xs rounded-[12px]">
              {listing.unit}
            </span>
          </div>

          {/* Quick Percentage Presets */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => handleSetPercent(pct)}
                className="py-1.5 rounded-[8px] bg-ios-bg3 hover:bg-ios-gray4 text-[11px] font-semibold text-ios-label transition active:scale-95 cursor-pointer"
              >
                {pct === 100 ? "Full Lot" : `${pct}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider">
            Logistics & Delivery Method
          </label>
          <IOSSegmentedControl
            options={deliveryOptions}
            value={deliveryType}
            onChange={setDeliveryType}
          />
        </div>

        {/* Payment Options */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider">
            Payment & Escrow Method
          </label>
          <IOSSegmentedControl
            options={paymentOptions}
            value={paymentMode}
            onChange={setPaymentMode}
          />
        </div>

        {/* Price Breakdown Card */}
        <div className="p-3.5 bg-ios-bg2 rounded-[16px] border border-ios-separator/20 space-y-2 text-xs">
          <div className="flex justify-between text-ios-label2">
            <span>Material Subtotal ({quantity} {listing.unit})</span>
            <span className="font-semibold text-ios-label">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          {gstAmount > 0 && (
            <div className="flex justify-between text-ios-label2">
              <span>18% GST (Input Tax Credit Eligible)</span>
              <span className="font-semibold text-ios-label">₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="pt-2 border-t border-ios-separator/15 flex justify-between items-baseline font-bold">
            <span className="text-sm text-ios-label">Total Payable</span>
            <span className="text-lg font-black text-ios-green">₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Submit Order Button */}
        <div className="pt-1">
          <IOSButton
            fullWidth
            size="lg"
            color="green"
            variant="filled"
            type="submit"
            disabled={loading}
            icon={ShieldCheck}
          >
            {loading ? "Authorizing Order..." : `Confirm & Authorize ₹${totalAmount.toLocaleString('en-IN')}`}
          </IOSButton>
        </div>

      </form>
    </IOSSheet>
  );
};
