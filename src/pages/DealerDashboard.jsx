import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  FileText,
  Truck
} from "lucide-react";
import { OrderTrackerCard } from "../components/dealer/OrderTrackerCard";
import { OrderRatingModal } from "../components/dealer/OrderRatingModal";
import { DisputeModal } from "../components/dealer/DisputeModal";
import { useAuth } from "../context/AuthContext";
import { useMarketplace } from "../context/MarketplaceContext";
import { ORDER_STATES } from "../data/categories";

export const DealerDashboard = ({ onBrowseMore }) => {
  const { userProfile } = useAuth();
  const { orders } = useMarketplace();

  const [activeTab, setActiveTab] = useState("active"); // "active" | "completed" | "all"
  const [selectedDisputeOrder, setSelectedDisputeOrder] = useState(null);
  const [selectedRatingOrder, setSelectedRatingOrder] = useState(null);

  // Filter orders for this dealer
  const dealerOrders = orders.filter(o => o.dealerUid === (userProfile?.uid || "demo_dealer_002") || o.dealerBusiness === userProfile?.businessName);

  const activeOrders = dealerOrders.filter(o => o.orderStatus !== ORDER_STATES.COMPLETED.key && o.orderStatus !== ORDER_STATES.REFUNDED.key);
  const completedOrders = dealerOrders.filter(o => o.orderStatus === ORDER_STATES.COMPLETED.key);

  const displayedOrders = activeTab === "active" 
    ? activeOrders 
    : activeTab === "completed" 
      ? completedOrders 
      : dealerOrders;

  const totalSpent = dealerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  {userProfile?.businessName || "Singhania Secondary Steel & Alloys"}
                </h1>
                <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                  Delhi Scrap Dealer / Mill
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Procurement Hub: {userProfile?.approxLocation || "Mayapuri Phase 2 Secondary Rolling Unit"} • GSTIN: {userProfile?.gstin || "07AAACS9821C1Z4"}
              </p>
            </div>
          </div>

          <button
            onClick={onBrowseMore}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition self-start md:self-auto"
          >
            <Search className="w-4 h-4" />
            Discover More Scrap Lots
          </button>
        </div>

        {/* Dealer Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Active Orders in Transit</span>
              <Truck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{activeOrders.length} Orders</p>
            <p className="text-[10px] text-slate-400 mt-1">
              Awaiting yard loading or dispatch signoff
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Settled Deliveries</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{completedOrders.length} Completed</p>
            <p className="text-[10px] text-slate-400 mt-1">
              Weighbridge slips verified and archived
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>Total Material Procured</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              ₹{totalSpent.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Procurement volume across Indian Mandis
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "active" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Active In-Progress Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "completed" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Completed & Settled Archive ({completedOrders.length})
          </button>
        </div>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No Orders in this Section</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Find raw recyclable streams in the scrap catalog to place atomic spot purchase orders.
            </p>
            <button
              onClick={onBrowseMore}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
            >
              Browse Scrap Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedOrders.map((order) => (
              <OrderTrackerCard
                key={order.id}
                order={order}
                onRaiseDispute={(ord) => setSelectedDisputeOrder(ord)}
                onOpenRatingModal={(ord) => setSelectedRatingOrder(ord)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modals */}
      <DisputeModal
        isOpen={!!selectedDisputeOrder}
        onClose={() => setSelectedDisputeOrder(null)}
        order={selectedDisputeOrder}
      />

      <OrderRatingModal
        isOpen={!!selectedRatingOrder}
        onClose={() => setSelectedRatingOrder(null)}
        order={selectedRatingOrder}
      />
    </div>
  );
};
