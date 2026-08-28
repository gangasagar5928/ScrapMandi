import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Star,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { ORDER_STATES } from "../../data/categories";

export const OrderTrackerCard = ({ 
  order, 
  onRaiseDispute, 
  onOpenRatingModal 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const stateDef = ORDER_STATES[order.orderStatus?.toUpperCase()] || ORDER_STATES.ORDER_CREATED;

  const steps = [
    { key: ORDER_STATES.ORDER_CREATED.key, label: "Order Created" },
    { key: ORDER_STATES.PAYMENT_CONFIRMED.key, label: "Payment Confirmed" },
    { key: ORDER_STATES.VENDOR_ACCEPTED.key, label: "Vendor Accepted" },
    { key: ORDER_STATES.READY_FOR_PICKUP.key, label: "Ready / In Transit" },
    { key: ORDER_STATES.COMPLETED.key, label: "Completed" }
  ];

  const getCurrentStepIndex = () => {
    if (order.orderStatus === ORDER_STATES.REFUNDED.key || order.orderStatus === ORDER_STATES.VENDOR_REJECTED.key) {
      return 1;
    }
    const idx = steps.findIndex(s => s.key === order.orderStatus);
    return idx >= 0 ? idx : 1;
  };

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400">PO #{order.id}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stateDef.badgeColor}`}>
              {stateDef.label}
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
            {order.listingTitle}
          </h4>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500 font-medium">Order Total Paid</span>
          <p className="text-base font-black text-emerald-700">
            ₹{Number(order.totalAmount).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* PRD Visual State Machine Stepper */}
      <div className="py-2">
        <div className="flex items-center justify-between relative">
          {/* Background progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isDone = idx <= currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  isDone 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-[10px] mt-1.5 font-medium hidden sm:block ${
                  isCurrent ? "text-emerald-800 font-bold" : "text-slate-500"
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Details Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-slate-400 font-medium block">Allocated Lot</span>
          <p className="font-bold text-slate-900 mt-0.5">
            {order.requestedQuantity} {order.unit} @ ₹{order.pricePerUnit}/{order.unit}
          </p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
            ✓ Atomic Quantity Reserved
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-slate-400 font-medium block">Vendor Yard Contact</span>
          <p className="font-bold text-slate-900 mt-0.5">{order.vendorBusiness || order.vendorName}</p>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-slate-400" />
            {order.vendorPhone || "+91 98112 34567"}
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-slate-400 font-medium block">Yard Coordinates / Pickup</span>
          {order.orderStatus === ORDER_STATES.ORDER_CREATED.key ? (
            <p className="text-[11px] text-slate-400 italic">Locked until vendor accepts</p>
          ) : (
            <p className="font-bold text-slate-900 mt-0.5">{order.privatePickupAddress || "Mandi Gobindgarh Focal Point Gate 2"}</p>
          )}
          <p className="text-[10px] text-slate-500 mt-0.5">Tare + Gross slips required</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
        >
          <span>{showDetails ? "Hide Audit Timeline" : "View Audit Timeline"}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          {/* Dispute button for non-completed / in-progress */}
          {order.orderStatus !== ORDER_STATES.COMPLETED.key && order.orderStatus !== ORDER_STATES.DISPUTED.key && (
            <button
              onClick={() => onRaiseDispute(order)}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Report Discrepancy / Dispute
            </button>
          )}

          {/* Review button only for COMPLETED orders (PRD Section 5.8 Rule) */}
          {order.orderStatus === ORDER_STATES.COMPLETED.key && (
            <button
              onClick={() => onOpenRatingModal(order)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition"
            >
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              Rate Verified Transaction
            </button>
          )}
        </div>
      </div>

      {/* Expandable Audit Timeline (PRD Section 5.6) */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 bg-slate-50 p-4 rounded-xl">
          <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Server-Verified Order Audit Trail
          </h5>
          <div className="space-y-2">
            {order.timeline?.map((evt, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">{evt.title}</p>
                  <p className="text-[11px] text-slate-500">{evt.note}</p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(evt.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
