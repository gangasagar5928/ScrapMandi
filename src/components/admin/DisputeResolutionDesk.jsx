import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Scale,
  ArrowRight
} from "lucide-react";

export const DisputeResolutionDesk = ({ disputes, onResolveDispute }) => {
  const [adminNotes, setAdminNotes] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const handleResolve = async (disputeId, resolution) => {
    setLoadingId(disputeId);
    try {
      await onResolveDispute(disputeId, {
        resolution,
        adminNotes: adminNotes[disputeId] || "Weighbridge evidence reviewed by ScrapMandi Ops"
      });
    } catch (e) {
      alert("Failed to resolve dispute: " + e.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (!disputes || disputes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
        <h4 className="font-bold text-slate-800 text-sm">No Active Disputes</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          All secondary metal transactions and weighbridge handovers are currently running smoothly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {disputes.map((d) => (
        <div key={d.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-400">Case #{d.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                d.status === "RESOLVED" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}>
                {d.status}
              </span>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="text-slate-400">Disputed Order Amount:</span>{" "}
              <strong className="text-slate-900 font-bold">₹{Number(d.orderTotal || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 font-medium block">Claimant / Raised By</span>
              <p className="font-bold text-slate-900 mt-0.5">{d.raisedByName} ({d.raisedByRole})</p>
              <p className="text-slate-600 mt-1 font-semibold">Reason: {d.reason}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 font-medium block">Evidence / Slip Notes</span>
              <p className="text-slate-700 mt-0.5 italic">"{d.evidenceNotes || "No extra slip remarks"}"</p>
              <span className="text-[10px] text-slate-400 block mt-1">
                Timestamp: {new Date(d.createdAt).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action Box */}
          {d.status === "UNDER_REVIEW" && (
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <input
                type="text"
                value={adminNotes[d.id] || ""}
                onChange={(e) => setAdminNotes({ ...adminNotes, [d.id]: e.target.value })}
                placeholder="Enter internal resolution rationale & weighbridge audit findings..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleResolve(d.id, "REFUND_BUYER")}
                  disabled={loadingId === d.id}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Grant Refund to Buyer
                </button>

                <button
                  onClick={() => handleResolve(d.id, "RELEASE_VENDOR")}
                  disabled={loadingId === d.id}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Release Payout to Vendor
                </button>
              </div>
            </div>
          )}

          {d.status === "RESOLVED" && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
              <p className="font-bold">Resolution: {d.resolution}</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">{d.resolutionNotes}</p>
              <span className="text-[10px] text-emerald-700 block mt-1 font-mono">
                Resolved on {new Date(d.resolvedAt || d.createdAt).toLocaleString('en-IN')}
              </span>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};
