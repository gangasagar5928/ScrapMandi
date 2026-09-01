import React, { useState } from "react";
import { 
  Search, 
  TrendingUp, 
  MessageSquare, 
  PlusCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  Layers, 
  MapPin,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { IOSBadge } from "../ios/IOSBadge";

export const Navbar = ({ activeTab, setActiveTab, onOpenAuth }) => {
  const { userProfile, isAuthenticated, role, loginWithDemoRole, logOut } = useAuth();
  const { notifications } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleRoleSelect = (targetRole) => {
    loginWithDemoRole(targetRole);
    setShowRoleMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-ios-bar/85 ios-blur border-b border-ios-separator/20 transition-colors">
      {/* iOS Top Bar - Delhi NCR Context */}
      <div className="bg-ios-bg3/60 px-4 py-1 text-[11px] text-ios-label2 font-medium flex justify-between items-center border-b border-ios-separator/15">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-ios-green/15 text-ios-green text-[10px] font-bold tracking-wide uppercase">
            Delhi NCR Mandi
          </span>
          <span className="hidden sm:inline text-ios-label3 text-[11px]">
            Mayapuri • Mundka • Bawana • Wazirpur • Okhla • Naraina • Faridabad
          </span>
        </div>
        <div className="flex items-center gap-1 text-ios-green font-medium text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Dharam Kanta Guaranteed</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & App Title */}
          <div 
            onClick={() => setActiveTab("landing")}
            className="flex items-center gap-2.5 cursor-pointer select-none active:opacity-70 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="ScrapMandi Logo" 
              className="w-9 h-9 object-contain" 
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-ios-label">
                  Scrap<span className="text-ios-green">Mandi</span>
                </span>
                <span className="text-[9px] font-bold bg-ios-green/15 text-ios-green px-1.5 py-0.2 rounded-full font-mono uppercase">
                  DELHI NCR
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "browse" 
                  ? "bg-ios-bg2 text-ios-blue shadow-xs font-bold" 
                  : "text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/50"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Scrap Lots</span>
            </button>

            <button
              onClick={() => setActiveTab("indicative-prices")}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "indicative-prices" 
                  ? "bg-ios-bg2 text-ios-blue shadow-xs font-bold" 
                  : "text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/50"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Delhi Bhav</span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp-alerts")}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "whatsapp-alerts" 
                  ? "bg-ios-bg2 text-ios-green shadow-xs font-bold" 
                  : "text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/50"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-ios-green" />
              <span>WhatsApp Rates</span>
            </button>

            {role === "vendor" && (
              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "vendor-dashboard" 
                    ? "bg-ios-green/15 text-ios-green font-bold" 
                    : "text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/50"
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5 text-ios-green" />
                <span>Yard Dashboard</span>
              </button>
            )}

            {role === "dealer" && (
              <button
                onClick={() => setActiveTab("dealer-dashboard")}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "dealer-dashboard" 
                    ? "bg-ios-blue/15 text-ios-blue font-bold" 
                    : "text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/50"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-ios-blue" />
                <span>Dealer Orders</span>
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => setActiveTab("admin-dashboard")}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "admin-dashboard" 
                    ? "bg-ios-purple/15 text-ios-purple font-bold" 
                    : "text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/50"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-ios-purple" />
                <span>Admin Desk</span>
              </button>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ios-bg3 border border-ios-separator/25 text-xs font-semibold text-ios-label transition active:scale-95 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-ios-green"></span>
                <span className="uppercase text-[11px] font-bold text-ios-green">{role}</span>
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-ios-bg2 rounded-[16px] shadow-ios-modal border border-ios-separator/20 py-2 z-50 text-left overflow-hidden">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-ios-label3 uppercase tracking-wider">
                    Switch Active Persona (Demo)
                  </div>
                  <button
                    onClick={() => handleRoleSelect("vendor")}
                    className={`w-full px-3.5 py-2 text-xs flex items-center justify-between hover:bg-ios-bg3/60 transition ${role === "vendor" ? "text-ios-green font-bold bg-ios-green/10" : "text-ios-label"}`}
                  >
                    <span>Yard Vendor (Mayapuri Seller)</span>
                    {role === "vendor" && <CheckCircle2 className="w-4 h-4 text-ios-green" />}
                  </button>
                  <button
                    onClick={() => handleRoleSelect("dealer")}
                    className={`w-full px-3.5 py-2 text-xs flex items-center justify-between hover:bg-ios-bg3/60 transition ${role === "dealer" ? "text-ios-blue font-bold bg-ios-blue/10" : "text-ios-label"}`}
                  >
                    <span>Dealer / Mill (Mayapuri Buyer)</span>
                    {role === "dealer" && <CheckCircle2 className="w-4 h-4 text-ios-blue" />}
                  </button>
                  <button
                    onClick={() => handleRoleSelect("admin")}
                    className={`w-full px-3.5 py-2 text-xs flex items-center justify-between hover:bg-ios-bg3/60 transition ${role === "admin" ? "text-ios-purple font-bold bg-ios-purple/10" : "text-ios-label"}`}
                  >
                    <span>Mandi Operations Admin</span>
                    {role === "admin" && <CheckCircle2 className="w-4 h-4 text-ios-purple" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-full text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/60 active:scale-95 transition relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-ios-red text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-ios-bg2 rounded-[16px] shadow-ios-modal border border-ios-separator/20 p-3 z-50 text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-ios-separator/20">
                    <span className="text-xs font-bold text-ios-label">Delhi Mandi Alerts</span>
                    <span className="text-[10px] text-ios-green font-semibold">Real-time</span>
                  </div>
                  <div className="py-2 max-h-60 overflow-y-auto space-y-1.5">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-ios-label3 py-3 text-center">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2 rounded-[10px] bg-ios-bg3 text-xs">
                          <p className="font-semibold text-ios-label">{n.title}</p>
                          <p className="text-ios-label2 text-[11px] mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile or Login Button */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-ios-separator/20">
                <div className="text-right">
                  <div className="text-xs font-bold text-ios-label truncate max-w-[120px]">
                    {userProfile?.businessName || userProfile?.name}
                  </div>
                  <div className="text-[10px] text-ios-label3 flex items-center gap-1 justify-end font-medium">
                    <MapPin className="w-3 h-3 text-ios-green" />
                    <span>{userProfile?.city || "Delhi"}</span>
                  </div>
                </div>
                <button
                  onClick={logOut}
                  title="Sign Out"
                  className="p-2 rounded-full text-ios-label3 hover:text-ios-red hover:bg-ios-bg3/60 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-ios-blue text-white px-3.5 py-1.5 rounded-full text-xs font-semibold hover:brightness-110 active:scale-95 transition shadow-xs cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-ios-label2 hover:text-ios-label hover:bg-ios-bg3/60 active:scale-95 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ios-bg2 border-b border-ios-separator/20 px-4 py-3 space-y-2 animate-slide-up">
          <button
            onClick={() => { setActiveTab("browse"); setMobileMenuOpen(false); }}
            className="w-full px-3 py-2.5 rounded-[12px] bg-ios-bg3 text-left text-xs font-semibold text-ios-label flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><Search className="w-4 h-4 text-ios-blue" /> Scrap Lots (Buy)</span>
            <span className="text-[10px] text-ios-label3">Browse →</span>
          </button>
          <button
            onClick={() => { setActiveTab("indicative-prices"); setMobileMenuOpen(false); }}
            className="w-full px-3 py-2.5 rounded-[12px] bg-ios-bg3 text-left text-xs font-semibold text-ios-label flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-ios-green" /> Delhi Mandi Bhav</span>
            <span className="text-[10px] text-ios-label3">Live Rates →</span>
          </button>
          <button
            onClick={() => { setActiveTab("whatsapp-alerts"); setMobileMenuOpen(false); }}
            className="w-full px-3 py-2.5 rounded-[12px] bg-ios-bg3 text-left text-xs font-semibold text-ios-label flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-ios-green" /> WhatsApp Rate Digest</span>
            <span className="text-[10px] text-ios-label3">Subscribe →</span>
          </button>
          <button
            onClick={() => { setActiveTab("vendor-dashboard"); setMobileMenuOpen(false); }}
            className="w-full px-3 py-2.5 rounded-[12px] bg-ios-bg3 text-left text-xs font-semibold text-ios-label flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><PlusCircle className="w-4 h-4 text-ios-orange" /> Yard Vendor Dashboard</span>
            <span className="text-[10px] text-ios-label3">Sell Scrap →</span>
          </button>
        </div>
      )}
    </header>
  );
};
