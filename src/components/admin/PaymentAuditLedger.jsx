import React from "react";
import { CreditCard, CheckCircle2, ShieldCheck, ArrowUpRight, Lock } from "lucide-react";
import { ORDER_STATES } from "../../data/categories";

export const PaymentAuditLedger = ({ orders }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-900">
            Gateway Payment Reconciliation & Split Payout Ledger
          </h3>
          <p className="text-[11px] text-slate-500">
            Immutable server-side event IDs & settlement status (PRD Section 5.9)
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
          Reconciled
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Gateway Event ID</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Gross Amount</th>
              <th className="py-3 px-4">Gateway Status</th>
              <th className="py-3 px-4">Vendor Payout State</th>
              <th className="py-3 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-xs">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 text-slate-500">
                  {o.paymentEventId || "pay_evt_simulated"}
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">
                  #{o.id}
                </td>
                <td className="py-3 px-4 font-sans font-black text-slate-900">
                  ₹{Number(o.totalAmount).toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 font-sans">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    CAPTURED_AUTHENTICATED
                  </span>
                </td>
                <td className="py-3 px-4 font-sans font-semibold text-slate-700">
                  {o.orderStatus === ORDER_STATES.COMPLETED.key ? (
                    <span className="text-emerald-700 font-bold">SETTLED_TO_VENDOR</span>
                  ) : o.orderStatus === ORDER_STATES.REFUNDED.key ? (
                    <span className="text-rose-700 font-bold">REFUNDED_TO_BUYER</span>
                  ) : (
                    <span className="text-amber-700 font-bold">HELD_IN_GATEWAY_ESCROW</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right text-slate-400 text-[11px] font-sans">
                  {new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
