import React, { useState } from "react";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { LandingPage } from "./pages/LandingPage";
import { BrowseListingsPage } from "./pages/BrowseListingsPage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { VendorDashboard } from "./pages/VendorDashboard";
import { DealerDashboard } from "./pages/DealerDashboard";
import { IndicativePricesPage } from "./pages/IndicativePricesPage";
import { WhatsAppAlertsPage } from "./pages/WhatsAppAlertsPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AuthPage } from "./pages/AuthPage";
import { CreateListingModal } from "./components/vendor/CreateListingModal";
import { OrderRequestModal } from "./components/order/OrderRequestModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MarketplaceProvider, useMarketplace } from "./context/MarketplaceContext";

function MainApp() {
  const { role, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("landing"); // landing, browse, indicative-prices, whatsapp-alerts, vendor-dashboard, dealer-dashboard, admin-dashboard, detail
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState(null);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createListingModalOpen, setCreateListingModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleSelectListing = (listing) => {
    setSelectedListing(listing);
    setActiveTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelectAndBrowse = (catId) => {
    setSelectedCategory(catId);
    setActiveTab("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenOrderModal = (listing) => {
    setSelectedListing(listing);
    setOrderModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Tab Router */}
      <main className="flex-1">
        {activeTab === "landing" && (
          <LandingPage
            setActiveTab={setActiveTab}
            onSelectCategory={handleCategorySelectAndBrowse}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === "browse" && (
          <BrowseListingsPage
            initialCategory={selectedCategory}
            onSelectListing={handleSelectListing}
            onOpenCreateListing={() => setCreateListingModalOpen(true)}
          />
        )}

        {activeTab === "detail" && (
          <ListingDetailPage
            listing={selectedListing}
            onBack={() => setActiveTab("browse")}
            onOpenOrderModal={handleOpenOrderModal}
          />
        )}

        {activeTab === "indicative-prices" && (
          <IndicativePricesPage
            onSelectCategoryAndBrowse={handleCategorySelectAndBrowse}
          />
        )}

        {activeTab === "whatsapp-alerts" && (
          <WhatsAppAlertsPage />
        )}

        {activeTab === "vendor-dashboard" && (
          <VendorDashboard
            onSelectListing={handleSelectListing}
          />
        )}

        {activeTab === "dealer-dashboard" && (
          <DealerDashboard
            onBrowseMore={() => setActiveTab("browse")}
          />
        )}

        {activeTab === "admin-dashboard" && (
          <AdminDashboard />
        )}
      </main>

      {/* Persistent Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Modals */}
      <AuthPage
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={role === "guest" ? "dealer" : role}
      />

      <CreateListingModal
        isOpen={createListingModalOpen}
        onClose={() => setCreateListingModalOpen(false)}
        onSuccess={(created) => {
          setSelectedListing(created);
          setActiveTab("detail");
        }}
      />

      <OrderRequestModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        listing={selectedListing}
        onSuccess={(order) => {
          setActiveTab("dealer-dashboard");
        }}
      />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <MainApp />
      </MarketplaceProvider>
    </AuthProvider>
  );
}

export default App;
