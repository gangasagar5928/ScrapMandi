import React from "react";
import { 
  Users, 
  Layers, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  Wallet,
  CheckCircle2
} from "lucide-react";
import { ORDER_STATES, LISTING_STATES } from "../../data/categories";

export const AdminOverview = ({ listings, orders, disputes }) => {
  const totalGMV = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const settledGMV = orders
    .filter(o => o.orderStatus === ORDER_STATES.COMPLETED.key)
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const activeListingsCount = listings.filter(l => l.status === LISTING_STATES.AVAILABLE).length;
  const openDisputesCount = disputes.filter(d => d.status === "UNDER_REVIEW").length;

  return (
    <div className="space-y-6">
      
      {/* 4-Card KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Marketplace Settled GMV</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            ₹{settledGMV.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">
            Target: ₹50,000+ Pilot GMV (PRD Section 10)
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Active Yard Listings</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            {activeListingsCount} Lots
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Target: 50+ Qualified Listings
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Total Orders Initiated</span>
            <ShoppingBag className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            {orders.length} Orders
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            {orders.filter(o => o.orderStatus === ORDER_STATES.COMPLETED.key).length} fully settled
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Open Disputes / Exceptions</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-600">
            {openDisputesCount} Pending
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            SLA: Review within 4 business hours
          </p>
        </div>

      </div>

      {/* Orders Breakdown by State Machine */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900">
          Order State Machine Distribution (PRD Section 5.6)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {Object.values(ORDER_STATES).map((state) => {
            const count = orders.filter(o => o.orderStatus === state.key).length;

            return (
              <div key={state.key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block truncate">{state.label}</span>
                <p className="text-lg font-black text-slate-900 mt-1">{count}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
