import React, { useState } from "react";
import { 
  ShieldCheck, 
  Layers, 
  AlertTriangle, 
  CreditCard, 
  BarChart3 
} from "lucide-react";
import { AdminOverview } from "../components/admin/AdminOverview";
import { ListingModeration } from "../components/admin/ListingModeration";
import { DisputeResolutionDesk } from "../components/admin/DisputeResolutionDesk";
import { PaymentAuditLedger } from "../components/admin/PaymentAuditLedger";
import { useMarketplace } from "../context/MarketplaceContext";
import { IOSSegmentedControl } from "../components/ios/IOSSegmentedControl";
import { IOSBadge } from "../components/ios/IOSBadge";

export const AdminDashboard = () => {
  const { listings, orders, disputes, updateListing, deleteListing, resolveDispute } = useMarketplace();
  const [activeTab, setActiveTab] = useState("overview");

  const tabOptions = [
    { value: "overview", label: "Overview" },
    { value: "moderation", label: "Moderation", count: listings.length },
    { value: "disputes", label: "Disputes", count: disputes.length },
    { value: "payments", label: "Settlement Audit" },
  ];

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label py-6 sm:py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* iOS Admin Header Card */}
        <div className="bg-ios-bg2 rounded-[24px] border border-ios-separator/20 p-5 sm:p-6 shadow-ios-card dark:shadow-ios-card-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-[16px] bg-ios-purple/15 text-ios-purple flex items-center justify-center font-bold shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-ios-label">Operations Control Desk</h1>
                <IOSBadge color="purple" variant="tinted">
                  Admin
                </IOSBadge>
              </div>
              <p className="text-xs text-ios-label2 mt-0.5">
                Marketplace Liquidity, Yard Verification, Dispute Arbitration & Settlement Audit
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-ios-label3 self-start md:self-auto">
            Environment: PRODUCTION_PILOT
          </span>
        </div>

        {/* iOS Segmented Navigation */}
        <div className="max-w-xl">
          <IOSSegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content Panels */}
        <div className="space-y-4">
          {activeTab === "overview" && (
            <AdminOverview listings={listings} orders={orders} disputes={disputes} />
          )}

          {activeTab === "moderation" && (
            <ListingModeration 
              listings={listings} 
              onUpdate={updateListing} 
              onDelete={deleteListing} 
            />
          )}

          {activeTab === "disputes" && (
            <DisputeResolutionDesk 
              disputes={disputes} 
              onResolve={resolveDispute} 
            />
          )}

          {activeTab === "payments" && (
            <PaymentAuditLedger orders={orders} />
          )}
        </div>

      </div>
    </div>
  );
};
