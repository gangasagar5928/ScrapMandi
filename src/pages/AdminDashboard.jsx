import React, { useState } from "react";
import { 
  ShieldCheck, 
  Layers, 
  AlertTriangle, 
  CreditCard, 
  BarChart3, 
  Users,
  Building2
} from "lucide-react";
import { AdminOverview } from "../components/admin/AdminOverview";
import { ListingModeration } from "../components/admin/ListingModeration";
import { DisputeResolutionDesk } from "../components/admin/DisputeResolutionDesk";
import { PaymentAuditLedger } from "../components/admin/PaymentAuditLedger";
import { useMarketplace } from "../context/MarketplaceContext";

export const AdminDashboard = () => {
  const { listings, orders, disputes, updateListing, deleteListing, resolveDispute } = useMarketplace();
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "moderation" | "disputes" | "payments"

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">ScrapMandi Operations Control</h1>
                <span className="text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full">
                  Admin Authority
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Marketplace Liquidity, Yard Verification, Dispute Arbitration & Settlement Audit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Environment: PRODUCTION_PILOT</span>
          </div>
        </div>

        {/* Admin Nav Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === "overview" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Platform Overview
          </button>

          <button
            onClick={() => setActiveTab("moderation")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === "moderation" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            Listing Moderation ({listings.length})
          </button>

          <button
            onClick={() => setActiveTab("disputes")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === "disputes" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Disputes Desk ({disputes.filter(d => d.status === "UNDER_REVIEW").length})
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === "payments" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Payment Reconciliation
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <AdminOverview
            listings={listings}
            orders={orders}
            disputes={disputes}
          />
        )}

        {activeTab === "moderation" && (
          <ListingModeration
            listings={listings}
            onUpdateListing={updateListing}
            onDeleteListing={deleteListing}
          />
        )}

        {activeTab === "disputes" && (
          <DisputeResolutionDesk
            disputes={disputes}
            onResolveDispute={resolveDispute}
          />
        )}

        {activeTab === "payments" && (
          <PaymentAuditLedger
            orders={orders}
          />
        )}

      </div>
    </div>
  );
};
