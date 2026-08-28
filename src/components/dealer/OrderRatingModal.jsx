import React, { useState } from "react";
import { Star, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Modal } from "../common/Modal";
import { useMarketplace } from "../../context/MarketplaceContext";

export const OrderRatingModal = ({ isOpen, onClose, order }) => {
  const { submitReview } = useMarketplace();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await submitReview(order.id, { rating, comment });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⭐ Rate Completed Scrap Transaction" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900">{order.listingTitle}</p>
          <p className="text-slate-500 mt-0.5">
            Vendor: {order.vendorBusiness || order.vendorName} • PO #{order.id}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Star Rating Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            Rate Material Grade & Yard Loading Accuracy
          </label>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-2 text-2xl transition hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? "fill-amber-400 text-amber-500" : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-xs font-bold text-slate-700 mt-1">
            {rating === 5 && "Excellent (Accurate Grade & Weight)"}
            {rating === 4 && "Good (Acceptable Tolerance)"}
            {rating === 3 && "Average"}
            {rating <= 2 && "Needs Improvement"}
          </p>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Transaction Experience Feedback
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Weighbridge slip matched exactly. Fast yard loading and clean material."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
        >
          {loading ? "Submitting..." : "Submit Verified Rating"}
        </button>

      </form>
    </Modal>
  );
};
