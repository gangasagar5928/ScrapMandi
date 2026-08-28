import React, { useState } from "react";
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  CreditCard, 
  Banknote, 
  Lock 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Modal } from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";

export const OrderRequestModal = ({ isOpen, onClose, listing, onSuccess }) => {
  const { userProfile, isAuthenticated } = useAuth();
  const { createOrder } = useMarketplace();

  const [quantity, setQuantity] = useState(listing ? Math.min(5, listing.quantityAvailable) : 1);
  const [deliveryType, setDeliveryType] = useState("ex_yard"); // "ex_yard" | "mill_delivery"
  const [deliveryAddress, setDeliveryAddress] = useState(userProfile?.approxLocation || "Singhania Mill Yard, Phase 2");
  const [paymentMode, setPaymentMode] = useState("gateway"); // "gateway" | "cash"
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (quantity <= 0 || quantity > maxQty) {
      setError(`Quantity must be between 1 and ${maxQty} ${listing.unit}`);
      return;
    }

    setLoading(true);
    try {
      const created = await createOrder({
        listing,
        requestedQuantity: quantity,
        deliveryAddress: deliveryType === "mill_delivery" ? deliveryAddress : "Ex-Yard Vendor Pickup",
        notes,
        paymentMode
      });

      // Trigger Confetti
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Scrap Order (B2B Purchase)" maxWidth="max-w-xl">
      <form onSubmit={handleSubmitOrder} className="space-y-5">
        
        {/* Listing Mini Summary */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              {listing.grade}
            </span>
            <h4 className="font-bold text-slate-900 text-sm mt-1">
              {listing.subCategoryName || listing.subCategory}
            </h4>
            <p className="text-xs text-slate-500">
              Vendor: {listing.vendorBusiness || listing.vendorName} ({listing.city})
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium">Spot Rate</p>
            <p className="text-base font-black text-slate-900">
              ₹{unitPrice.toLocaleString('en-IN')} <span className="text-xs font-normal">/{listing.unit}</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quantity Selection */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Purchase Quantity ({listing.unit})
            </label>
            <span className="text-xs text-slate-500 font-semibold">
              Available in Yard: <strong className="text-emerald-700">{maxQty} {listing.unit}</strong>
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={maxQty}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Quick % buttons */}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleSetPercent(25)}
              className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition"
            >
              25%
            </button>
            <button
              type="button"
              onClick={() => handleSetPercent(50)}
              className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition"
            >
              50% (Half Lot)
            </button>
            <button
              type="button"
              onClick={() => handleSetPercent(75)}
              className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition"
            >
              75%
            </button>
            <button
              type="button"
              onClick={() => handleSetPercent(100)}
              className="flex-1 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg transition"
            >
              100% (Entire Lot)
            </button>
          </div>
        </div>

        {/* Fulfillment & Logistics */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Fulfillment Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDeliveryType("ex_yard")}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition ${
                deliveryType === "ex_yard" 
                  ? "border-emerald-600 bg-emerald-50 text-emerald-900" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <p className="font-bold">Ex-Yard (Self Pickup)</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Dealer sends truck to vendor yard</p>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType("mill_delivery")}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition ${
                deliveryType === "mill_delivery" 
                  ? "border-emerald-600 bg-emerald-50 text-emerald-900" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <p className="font-bold">Mill Delivery Requested</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Freight coordinated with vendor</p>
            </button>
          </div>

          {deliveryType === "mill_delivery" && (
            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Destination Delivery Address / Unloading Mill
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Mill Gate 3, Industrial Area, Mandi Gobindgarh"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>
          )}
        </div>

        {/* Payment Infrastructure Selection (PRD Section 5.6 Compliance) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Payment & Settlement Protection
          </label>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setPaymentMode("gateway")}
              className={`w-full p-3 rounded-xl border text-xs text-left transition flex items-start justify-between ${
                paymentMode === "gateway" 
                  ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm" 
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Online Gateway Split (Recommended)</p>
                  <p className="text-[11px] text-slate-600">
                    Payment held securely; released to vendor upon yard weighbridge acceptance.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                Protected
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMode("cash")}
              className={`w-full p-3 rounded-xl border text-xs text-left transition flex items-start justify-between ${
                paymentMode === "cash" 
                  ? "border-amber-500 bg-amber-50/70 text-amber-950" 
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <Banknote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Cash / Direct Bank at Yard</p>
                  <p className="text-[11px] text-amber-800">
                    Direct yard payment. Treated outside ScrapMandi online protection.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Unprotected
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Breakdown Card */}
        <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Material Subtotal ({quantity} {listing.unit} × ₹{unitPrice})</span>
            <span className="font-semibold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>GST (18% Input Credit)</span>
            <span className="font-semibold text-white">₹{gstAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Marketplace Platform Fee</span>
            <span className="text-emerald-400 font-bold">₹0 (Phase 1 Waiver)</span>
          </div>
          <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline text-sm">
            <span className="font-bold text-white">Total Order Value</span>
            <span className="text-xl font-black text-emerald-400">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          <span>{loading ? "Processing Order Lock..." : "Confirm & Authorize Order Request"}</span>
        </button>

      </form>
    </Modal>
  );
};
