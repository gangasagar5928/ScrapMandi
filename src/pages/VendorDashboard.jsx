import React, { useState } from "react";
import { 
  PlusCircle, 
  Building2, 
  Wallet,
  ShoppingBag,
  Layers
} from "lucide-react";
import { VendorListingsTable } from "../components/vendor/VendorListingsTable";
import { VendorIncomingOrders } from "../components/vendor/VendorIncomingOrders";
import { CreateListingModal } from "../components/vendor/CreateListingModal";
import { useAuth } from "../context/AuthContext";
import { useMarketplace } from "../context/MarketplaceContext";
import { ORDER_STATES } from "../data/categories";
import { IOSButton } from "../components/ios/IOSButton";
import { IOSSegmentedControl } from "../components/ios/IOSSegmentedControl";
import { IOSBadge } from "../components/ios/IOSBadge";

export const VendorDashboard = ({ onSelectListing }) => {
  const { userProfile } = useAuth();
  const { listings, orders, updateListing, deleteListing, updateOrderStatus } = useMarketplace();

  const [activeTab, setActiveTab] = useState("listings");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const vendorListings = listings.filter(l => l.vendorUid === (userProfile?.uid || "demo_vendor_001") || l.vendorBusiness === userProfile?.businessName);
  const vendorOrders = orders.filter(o => o.vendorUid === (userProfile?.uid || "demo_vendor_001") || o.vendorBusiness === userProfile?.businessName);

  const completedOrders = vendorOrders.filter(o => o.orderStatus === ORDER_STATES.COMPLETED.key);
  const settledRevenue = completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrdersCount = vendorOrders.filter(o => o.orderStatus === ORDER_STATES.PAYMENT_CONFIRMED.key).length;

  const tabOptions = [
    { value: "listings", label: "My Yard Lots", count: vendorListings.length },
    { value: "orders", label: "Incoming Orders", count: vendorOrders.length },
  ];

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label py-6 sm:py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* iOS Vendor Profile Card */}
        <div className="bg-ios-bg2 rounded-[24px] border border-ios-separator/20 p-5 sm:p-6 shadow-ios-card dark:shadow-ios-card-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-[16px] bg-ios-green/15 text-ios-green flex items-center justify-center text-xl font-bold shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-ios-label">
                  {userProfile?.businessName || "Sharma Loha Scrap Yard"}
                </h1>
                <IOSBadge color="green" variant="tinted">
                  Mayapuri Yard
                </IOSBadge>
              </div>
              <p className="text-xs text-ios-label2 mt-0.5">
                Location: {userProfile?.approxLocation || "Mayapuri Phase 2, Delhi"} • GSTIN: {userProfile?.gstin || "07AABCS1429B1Z8"}
              </p>
            </div>
          </div>

          <IOSButton
            size="md"
            color="green"
            variant="filled"
            onClick={() => setCreateModalOpen(true)}
            icon={PlusCircle}
            className="self-start md:self-auto"
          >
            Post New Scrap Lot
          </IOSButton>
        </div>

        {/* iOS Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-ios-bg2 rounded-[18px] border border-ios-separator/20 p-4 shadow-ios-card dark:shadow-ios-card-dark">
            <div className="flex items-center justify-between text-xs text-ios-label2 font-medium mb-1">
              <span>Settled Revenue</span>
              <Wallet className="w-4 h-4 text-ios-green" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-ios-label">
              ₹{settledRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-ios-green mt-1 font-medium">
              ✓ Direct Dharam Kanta settlements
            </p>
          </div>

          <div className="bg-ios-bg2 rounded-[18px] border border-ios-separator/20 p-4 shadow-ios-card dark:shadow-ios-card-dark">
            <div className="flex items-center justify-between text-xs text-ios-label2 font-medium mb-1">
              <span>Active Yard Lots</span>
              <Layers className="w-4 h-4 text-ios-blue" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-ios-label">
              {vendorListings.length}
            </p>
            <p className="text-[10px] text-ios-label2 mt-1">
              Visible across Delhi secondary buyers
            </p>
          </div>

          <div className="bg-ios-bg2 rounded-[18px] border border-ios-separator/20 p-4 shadow-ios-card dark:shadow-ios-card-dark">
            <div className="flex items-center justify-between text-xs text-ios-label2 font-medium mb-1">
              <span>Pending Gate Dispatches</span>
              <ShoppingBag className="w-4 h-4 text-ios-orange" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-ios-label">
              {pendingOrdersCount}
            </p>
            <p className="text-[10px] text-ios-orange mt-1 font-medium">
              Requires truck loading authorization
            </p>
          </div>
        </div>

        {/* iOS Segmented Navigation Tab Switcher */}
        <div className="max-w-md">
          <IOSSegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === "listings" ? (
          <VendorListingsTable
            listings={vendorListings}
            onUpdate={updateListing}
            onDelete={deleteListing}
            onSelectListing={onSelectListing}
            onOpenCreate={() => setCreateModalOpen(true)}
          />
        ) : (
          <VendorIncomingOrders
            orders={vendorOrders}
            onUpdateStatus={updateOrderStatus}
          />
        )}

      </div>

      {/* Create Listing Sheet */}
      <CreateListingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};
