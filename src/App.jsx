import React, { useState, useEffect } from "react";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { AccessibilityWidget } from "./components/common/AccessibilityWidget";
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
  const { listings } = useMarketplace();

  const [activeTab, setActiveTab] = useState("landing");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState(null);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createListingModalOpen, setCreateListingModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  // Sync state with URL hash on initial load and browser Back/Forward (popstate)
  useEffect(() => {
    const parseUrlHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (!hash) {
        setActiveTab("landing");
        return;
      }

      if (hash.startsWith("listing/")) {
        const listingId = hash.replace("listing/", "");
        const matched = listings.find(l => l.id === listingId);
        if (matched) {
          setSelectedListing(matched);
          setActiveTab("detail");
        }
      } else if (hash.startsWith("browse")) {
        setActiveTab("browse");
      } else if (hash === "indicative-prices" || hash === "prices") {
        setActiveTab("indicative-prices");
      } else if (hash === "whatsapp-alerts" || hash === "alerts") {
        setActiveTab("whatsapp-alerts");
      } else if (hash === "vendor-dashboard" || hash === "seller") {
        setActiveTab("vendor-dashboard");
      } else if (hash === "dealer-dashboard" || hash === "buyer" || hash === "orders") {
        setActiveTab("dealer-dashboard");
      } else if (hash === "admin-dashboard" || hash === "admin") {
        setActiveTab("admin-dashboard");
      } else {
        setActiveTab("landing");
      }
    };

    parseUrlHash();
    window.addEventListener("popstate", parseUrlHash);
    return () => window.removeEventListener("popstate", parseUrlHash);
  }, [listings]);

  // Navigate helper with deep linking URL hash update
  const navigateToTab = (tab, newHash = null) => {
    setActiveTab(tab);
    const targetHash = newHash || (tab === "landing" ? "" : tab);
    if (window.location.hash.replace(/^#\/?/, "") !== targetHash) {
      window.history.pushState(null, "", targetHash ? `#/${targetHash}` : window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectListing = (listing) => {
    setSelectedListing(listing);
    navigateToTab("detail", `listing/${listing.id}`);
  };

  const handleCategorySelectAndBrowse = (catId) => {
    setSelectedCategory(catId);
    navigateToTab("browse", "browse");
  };

  const handleOpenOrderModal = (listing) => {
    setSelectedListing(listing);
    setOrderModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => navigateToTab(tab)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Tab / Deep-Linked Router */}
      <main className="flex-1">
        {activeTab === "landing" && (
          <LandingPage
            setActiveTab={(tab) => navigateToTab(tab)}
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
            onBack={() => navigateToTab("browse")}
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
            onBrowseMore={() => navigateToTab("browse")}
          />
        )}

        {activeTab === "admin-dashboard" && (
          <AdminDashboard />
        )}
      </main>

      {/* Persistent Global Footer */}
      <Footer setActiveTab={(tab) => navigateToTab(tab)} />

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
          navigateToTab("detail", `listing/${created.id}`);
        }}
      />

      <OrderRequestModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        listing={selectedListing}
        onSuccess={(order) => {
          navigateToTab("dealer-dashboard", "dealer-dashboard");
        }}
      />

      {/* Global Accessibility Widget — always visible */}
      <AccessibilityWidget />

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
