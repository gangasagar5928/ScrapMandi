import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { Modal } from "../common/Modal";
import { useMarketplace } from "../../context/MarketplaceContext";

export const DisputeModal = ({ isOpen, onClose, order }) => {
  const { raiseDispute } = useMarketplace();
  const [reason, setReason] = useState("Weight discrepancy on weighbridge slip");
  const [evidenceNotes, setEvidenceNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!order) return null;

  const disputeReasons = [
    "Weight discrepancy on weighbridge slip (Gross/Tare deviation > 2%)",
    "Material grade mismatch (Higher impurity / foreign contamination)",
    "Moisture / excessive water content in paper or plastic bales",
    "Vendor gate loading refusal or unreasonable delay",
    "Damaged or off-spec industrial scrap"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await raiseDispute(order.id, {
        reason,
        evidenceNotes,
        raisedByRole: "dealer"
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to raise dispute");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚠️ Raise Quality / Weighbridge Dispute" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">ScrapMandi Dispute Protection Desk</p>
            <p className="text-[11px] text-rose-800 mt-0.5">
              Escrow payout is frozen immediately. An operations admin will inspect the weighbridge slips and evidence.
            </p>
          </div>
        </div>

        {/* Reason Select */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Primary Dispute Category
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
          >
            {disputeReasons.map((r, idx) => (
              <option key={idx} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Evidence Details */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Evidence & Weighbridge Slip Numbers
          </label>
          <textarea
            rows={4}
            value={evidenceNotes}
            onChange={(e) => setEvidenceNotes(e.target.value)}
            placeholder="e.g. Weighbridge Slip #WB-84920 indicates 18.2 tonnes instead of 22 tonnes billed. Tare weight slip attached."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition"
        >
          {loading ? "Filing Dispute..." : "Submit Dispute to Ops Desk"}
        </button>

      </form>
    </Modal>
  );
};
