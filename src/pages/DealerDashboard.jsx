import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Truck 
} from "lucide-react";
import { OrderTrackerCard } from "../components/dealer/OrderTrackerCard";
import { OrderRatingModal } from "../components/dealer/OrderRatingModal";
import { DisputeModal } from "../components/dealer/DisputeModal";
import { useAuth } from "../context/AuthContext";
import { useMarketplace } from "../context/MarketplaceContext";
import { ORDER_STATES } from "../data/categories";
import { IOSButton } from "../components/ios/IOSButton";
import { IOSSegmentedControl } from "../components/ios/IOSSegmentedControl";
import { IOSBadge } from "../components/ios/IOSBadge";

export const DealerDashboard = ({ onBrowseMore }) => {
  const { userProfile } = useAuth();
  const { orders } = useMarketplace();

  const [activeTab, setActiveTab] = useState("active");
  const [selectedDisputeOrder, setSelectedDisputeOrder] = useState(null);
  const [selectedRatingOrder, setSelectedRatingOrder] = useState(null);

  const dealerOrders = orders.filter(o => o.dealerUid === (userProfile?.uid || "demo_dealer_002") || o.dealerBusiness === userProfile?.businessName);

  const activeOrders = dealerOrders.filter(o => o.orderStatus !== ORDER_STATES.COMPLETED.key && o.orderStatus !== ORDER_STATES.REFUNDED.key);
  const completedOrders = dealerOrders.filter(o => o.orderStatus === ORDER_STATES.COMPLETED.key);

  const displayedOrders = activeTab === "active" 
    ? activeOrders 
    : activeTab === "completed" 
      ? completedOrders 
      : dealerOrders;

  const totalSpent = dealerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const tabOptions = [
    { value: "active", label: "Active Orders", count: activeOrders.length },
    { value: "completed", label: "Completed", count: completedOrders.length },
    { value: "all", label: "All Orders", count: dealerOrders.length },
  ];

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label py-6 sm:py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* iOS Dealer Profile Card */}
        <div className="bg-ios-bg2 rounded-[24px] border border-ios-separator/20 p-5 sm:p-6 shadow-ios-card dark:shadow-ios-card-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-[16px] bg-ios-blue/15 text-ios-blue flex items-center justify-center text-xl font-bold shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-ios-label">
                  {userProfile?.businessName || "Singhania Secondary Steel & Alloys"}
                </h1>
                <IOSBadge color="blue" variant="tinted">
                  Delhi Buyer
                </IOSBadge>
              </div>
              <p className="text-xs text-ios-label2 mt-0.5">
                Procurement Hub: {userProfile?.approxLocation || "Mayapuri Phase 2 Secondary Rolling Unit"} • GSTIN: {userProfile?.gstin || "07AAACS9821C1Z4"}
              </p>
            </div>
          </div>

          <IOSButton
            size="md"
            color="blue"
            variant="filled"
            onClick={onBrowseMore}
            icon={Search}
            className="self-start md:self-auto"
          >
            Discover More Scrap Lots
          </IOSButton>
        </div>

        {/* iOS Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-ios-bg2 rounded-[18px] border border-ios-separator/20 p-4 shadow-ios-card dark:shadow-ios-card-dark">
            <div className="flex items-center justify-between text-xs text-ios-label2 font-medium mb-1">
              <span>Active in Transit</span>
              <Truck className="w-4 h-4 text-ios-green" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-ios-label">{activeOrders.length} Orders</p>
            <p className="text-[10px] text-ios-label2 mt-1">
              Awaiting yard loading or dispatch
            </p>
          </div>

          <div className="bg-ios-bg2 rounded-[18px] border border-ios-separator/20 p-4 shadow-ios-card dark:shadow-ios-card-dark">
            <div className="flex items-center justify-between text-xs text-ios-label2 font-medium mb-1">
              <span>Settled Deliveries</span>
              <CheckCircle2 className="w-4 h-4 text-ios-blue" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-ios-label">{completedOrders.length} Completed</p>
            <p className="text-[10px] text-ios-label2 mt-1">
              Weighbridge slips verified
            </p>
          </div>

          <div className="bg-ios-bg2 rounded-[18px] border border-ios-separator/20 p-4 shadow-ios-card dark:shadow-ios-card-dark">
            <div className="flex items-center justify-between text-xs text-ios-label2 font-medium mb-1">
              <span>Procurement Volume</span>
              <TrendingUp className="w-4 h-4 text-ios-purple" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-ios-label">₹{totalSpent.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-ios-green mt-1 font-medium">
              ✓ Direct mill procurement
            </p>
          </div>
        </div>

        {/* iOS Segmented Navigation */}
        <div className="max-w-md">
          <IOSSegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {displayedOrders.length === 0 ? (
            <div className="bg-ios-bg2 rounded-[20px] border border-ios-separator/20 p-8 sm:p-12 text-center space-y-3 shadow-ios-card dark:shadow-ios-card-dark">
              <ShoppingBag className="w-12 h-12 text-ios-gray mx-auto" />
              <h3 className="text-base font-bold text-ios-label">No orders in this view</h3>
              <p className="text-xs text-ios-label2 max-w-sm mx-auto">
                Explore available scrap lots and place direct weighbridge-guaranteed orders.
              </p>
              <div className="pt-2">
                <IOSButton
                  color="blue"
                  variant="tinted"
                  onClick={onBrowseMore}
                >
                  Browse Available Scrap Lots
                </IOSButton>
              </div>
            </div>
          ) : (
            displayedOrders.map((order) => (
              <OrderTrackerCard
                key={order.id}
                order={order}
                onOpenDispute={(ord) => setSelectedDisputeOrder(ord)}
                onOpenRating={(ord) => setSelectedRatingOrder(ord)}
              />
            ))
          )}
        </div>

      </div>

      {/* Dispute & Rating Sheets */}
      {selectedDisputeOrder && (
        <DisputeModal
          isOpen={Boolean(selectedDisputeOrder)}
          onClose={() => setSelectedDisputeOrder(null)}
          order={selectedDisputeOrder}
        />
      )}

      {selectedRatingOrder && (
        <OrderRatingModal
          isOpen={Boolean(selectedRatingOrder)}
          onClose={() => setSelectedRatingOrder(null)}
          order={selectedRatingOrder}
        />
      )}
    </div>
  );
};
