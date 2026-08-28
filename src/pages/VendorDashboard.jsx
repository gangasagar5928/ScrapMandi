import React, { useState } from "react";
import { 
  PlusCircle, 
  Building2, 
  TrendingUp, 
  ShoppingBag, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Award,
  Wallet
} from "lucide-react";
import { VendorListingsTable } from "../components/vendor/VendorListingsTable";
import { VendorIncomingOrders } from "../components/vendor/VendorIncomingOrders";
import { CreateListingModal } from "../components/vendor/CreateListingModal";
import { useAuth } from "../context/AuthContext";
import { useMarketplace } from "../context/MarketplaceContext";
import { ORDER_STATES, LISTING_STATES } from "../data/categories";

export const VendorDashboard = ({ onSelectListing }) => {
  const { userProfile } = useAuth();
  const { listings, orders, updateListing, deleteListing, updateOrderStatus } = useMarketplace();

  const [activeTab, setActiveTab] = useState("listings"); // "listings" | "orders"
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Filter only current vendor's items (or all in demo mode if matching uid)
  const vendorListings = listings.filter(l => l.vendorUid === (userProfile?.uid || "demo_vendor_001") || l.vendorBusiness === userProfile?.businessName);
  const vendorOrders = orders.filter(o => o.vendorUid === (userProfile?.uid || "demo_vendor_001") || o.vendorBusiness === userProfile?.businessName);

  // Completed / settled transactions for revenue calculation (PRD Section 5.2 Rule)
  const completedOrders = vendorOrders.filter(o => o.orderStatus === ORDER_STATES.COMPLETED.key);
  const settledRevenue = completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrdersCount = vendorOrders.filter(o => o.orderStatus === ORDER_STATES.PAYMENT_CONFIRMED.key).length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Vendor Yard Profile Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  {userProfile?.businessName || "Sharma Metals & Scrap Yard"}
                </h1>
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  Verified Vendor
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Yard Location: {userProfile?.approxLocation || "Mandi Gobindgarh Industrial Area, Punjab"} • GSTIN: {userProfile?.gstin || "03AABCS1429B1Z8"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Post New Scrap Lot (60s)
          </button>
        </div>

        {/* Vendor KPI Metrics Strip (PRD Compliant Settled vs Placed) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Settled Revenue (Payouts)</span>
              <Wallet className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              ₹{settledRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Based on completed handovers (excludes pending POs)
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Active Lots in Yard</span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {vendorListings.filter(l => l.status === LISTING_STATES.AVAILABLE).length} Lots
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Live on exchange across all Indian Mandis
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Action Required POs</span>
              <ShoppingBag className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-amber-600">
              {pendingOrdersCount} Pending
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Awaiting your yard dispatch acceptance
            </p>
          </div>
        </div>

        {/* Tab Navigation (Active Inventory vs Incoming Orders) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === "listings"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            Active Yard Lots ({vendorListings.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 relative ${
              activeTab === "orders"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Incoming Mill Orders ({vendorOrders.length})
            {pendingOrdersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "listings" ? (
          <VendorListingsTable
            listings={vendorListings}
            onUpdateListing={updateListing}
            onDeleteListing={deleteListing}
            onSelectListing={onSelectListing}
          />
        ) : (
          <VendorIncomingOrders
            orders={vendorOrders}
            onUpdateStatus={updateOrderStatus}
          />
        )}

      </div>

      {/* 60s Create Listing Modal */}
      <CreateListingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={(item) => {
          setActiveTab("listings");
        }}
      />
    </div>
  );
};
