import React, { useState } from "react";
import { 
  ShoppingBag, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Clock, 
  ShieldCheck, 
  FileText, 
  AlertCircle,
  Building,
  CreditCard,
  Phone
} from "lucide-react";
import { ORDER_STATES } from "../../data/categories";

export const VendorIncomingOrders = ({ orders, onUpdateStatus }) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (orderId, targetState, note) => {
    setLoadingId(orderId);
    try {
      await onUpdateStatus(orderId, targetState, note);
    } catch (e) {
      alert(e.message || "Failed to update order");
    } finally {
      setLoadingId(null);
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
        <h4 className="font-bold text-slate-800 text-sm">No Incoming Buyer Orders</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          When steel mills or recyclers request lots from your yard, they will appear here for verification and dispatch.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const stateDef = ORDER_STATES[order.orderStatus?.toUpperCase()] || ORDER_STATES.ORDER_CREATED;

        return (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">#{order.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stateDef.badgeColor}`}>
                    {stateDef.label}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  {order.listingTitle}
                </h4>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 font-medium">Order Total</span>
                <p className="text-base font-black text-slate-900">
                  ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Middle Grid: Buyer, Quantity, Fulfillment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Purchasing Dealer / Mill</span>
                <p className="font-bold text-slate-900">{order.dealerBusiness || order.dealerName}</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {order.dealerPhone}
                </p>
                {order.dealerGstin && (
                  <p className="text-[10px] text-emerald-700 font-mono">GST: {order.dealerGstin}</p>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Quantity & Pricing</span>
                <p className="font-bold text-slate-900">
                  {order.requestedQuantity} {order.unit} @ ₹{order.pricePerUnit}/{order.unit}
                </p>
                <p className="text-[11px] text-slate-500">
                  Subtotal: ₹{Number(order.subtotal).toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-500">
                  GST 18%: ₹{Number(order.gstAmount || 0).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Fulfillment Details</span>
                <p className="font-bold text-slate-900">{order.deliveryAddress}</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-emerald-600" />
                  {order.paymentMode === "gateway" ? "Escrow Gateway Confirmed" : "Cash on Delivery (Unprotected)"}
                </p>
              </div>

            </div>

            {/* Action Bar based on State Machine */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 italic">
                {stateDef.description}
              </p>

              <div className="flex items-center gap-2">
                {/* State: PAYMENT_CONFIRMED -> Vendor Accept or Reject */}
                {order.orderStatus === ORDER_STATES.PAYMENT_CONFIRMED.key && (
                  <>
                    <button
                      onClick={() => handleAction(order.id, ORDER_STATES.VENDOR_ACCEPTED.key, "Vendor confirmed yard inventory and scheduled loading.")}
                      disabled={loadingId === order.id}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Accept Order Request
                    </button>
                    <button
                      onClick={() => handleAction(order.id, ORDER_STATES.VENDOR_REJECTED.key, "Vendor unable to fulfill order at this time. Refund triggered.")}
                      disabled={loadingId === order.id}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Decline & Auto-Refund
                    </button>
                  </>
                )}

                {/* State: VENDOR_ACCEPTED -> Ready for Pickup */}
                {order.orderStatus === ORDER_STATES.VENDOR_ACCEPTED.key && (
                  <button
                    onClick={() => handleAction(order.id, ORDER_STATES.READY_FOR_PICKUP.key, "Scrap is segregated, gross weighbridge slip printed, and ready at yard.")}
                    disabled={loadingId === order.id}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    Mark Ready for Pickup / Loaded
                  </button>
                )}

                {/* State: READY_FOR_PICKUP -> Complete */}
                {order.orderStatus === ORDER_STATES.READY_FOR_PICKUP.key && (
                  <button
                    onClick={() => handleAction(order.id, ORDER_STATES.COMPLETED.key, "Material received and verified at destination. Payout released to vendor.")}
                    disabled={loadingId === order.id}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirm Handover & Settle
                  </button>
                )}

                {order.orderStatus === ORDER_STATES.COMPLETED.key && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Payout Settled to Bank
                  </span>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
