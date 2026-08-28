import React, { useState } from "react";
import { 
  Building2, 
  Search, 
  TrendingUp, 
  MessageSquare, 
  PlusCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";

export const Navbar = ({ activeTab, setActiveTab, onOpenAuth }) => {
  const { userProfile, isAuthenticated, role, switchRole, loginWithDemoRole, logOut } = useAuth();
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top utility alert bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 font-medium flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wide uppercase">
            Live Exchange
          </span>
          <span className="hidden sm:inline text-slate-400">
            Mandi Gobindgarh • Delhi-NCR • Mumbai • Alang • Chennai • Raipur
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Verified GSTIN & Yard Audits
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab("landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Scrap<span className="text-emerald-600">Mandi</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                  B2B
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">
                India's Digital Scrap Exchange
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "browse" 
                  ? "bg-slate-100 text-emerald-700 font-semibold" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Search className="w-4 h-4 text-slate-500" />
              Browse Scrap
            </button>

            <button
              onClick={() => setActiveTab("indicative-prices")}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "indicative-prices" 
                  ? "bg-slate-100 text-emerald-700 font-semibold" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-slate-500" />
              Mandi Benchmark
            </button>

            <button
              onClick={() => setActiveTab("whatsapp-alerts")}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "whatsapp-alerts" 
                  ? "bg-slate-100 text-emerald-700 font-semibold" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              WhatsApp Digest
            </button>

            {/* Role-Specific Shortcuts */}
            {role === "vendor" && (
              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === "vendor-dashboard" 
                    ? "bg-emerald-50 text-emerald-700 font-semibold" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                Vendor Yard
              </button>
            )}

            {role === "dealer" && (
              <button
                onClick={() => setActiveTab("dealer-dashboard")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === "dealer-dashboard" 
                    ? "bg-emerald-50 text-emerald-700 font-semibold" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                Dealer Orders
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => setActiveTab("admin-dashboard")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === "admin-dashboard" 
                    ? "bg-purple-50 text-purple-700 font-semibold" 
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                <Layers className="w-4 h-4 text-purple-600" />
                Admin Desk
              </button>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-slate-700 transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Role: <span className="uppercase text-emerald-800 font-bold">{role}</span>
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-left">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona (Demo)
                  </div>
                  <button
                    onClick={() => handleRoleSelect("vendor")}
                    className={`w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-slate-50 ${role === "vendor" ? "text-emerald-600 font-bold bg-emerald-50/50" : "text-slate-700"}`}
                  >
                    <span>Vendor (Seller / Yard)</span>
                    {role === "vendor" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSelect("dealer")}
                    className={`w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-slate-50 ${role === "dealer" ? "text-emerald-600 font-bold bg-emerald-50/50" : "text-slate-700"}`}
                  >
                    <span>Dealer (Buyer / Foundry)</span>
                    {role === "dealer" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSelect("admin")}
                    className={`w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-slate-50 ${role === "admin" ? "text-purple-600 font-bold bg-purple-50/50" : "text-slate-700"}`}
                  >
                    <span>Admin (Ops & Disputes)</span>
                    {role === "admin" && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Exchange Alerts</span>
                    <span className="text-[11px] text-emerald-600 font-medium">Real-time</span>
                  </div>
                  <div className="py-2 max-h-64 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3 text-center">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2 rounded-lg bg-slate-50 text-xs">
                          <p className="font-semibold text-slate-800">{n.title}</p>
                          <p className="text-slate-600 text-[11px] mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile or Login Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {userProfile?.businessName || userProfile?.name}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {userProfile?.city || "Delhi-NCR"}
                  </div>
                </div>
                <button
                  onClick={logOut}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition"
              >
                <User className="w-4 h-4" />
                Sign In / Join
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => handleRoleSelect(role === "vendor" ? "dealer" : role === "dealer" ? "admin" : "vendor")}
              className="text-[10px] uppercase font-bold bg-slate-100 px-2 py-1 rounded border border-slate-300 text-slate-700"
            >
              {role}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => { setActiveTab("browse"); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-slate-500" />
            Browse Scrap Catalog
          </button>
          <button
            onClick={() => { setActiveTab("indicative-prices"); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-slate-500" />
            Mandi Benchmark Prices
          </button>
          <button
            onClick={() => { setActiveTab("whatsapp-alerts"); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            WhatsApp Price Alerts
          </button>
          <button
            onClick={() => { setActiveTab("vendor-dashboard"); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            Vendor Dashboard
          </button>
          <button
            onClick={() => { setActiveTab("dealer-dashboard"); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            Dealer Dashboard
          </button>
          <button
            onClick={() => { setActiveTab("admin-dashboard"); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-lg flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-purple-600" />
            Admin Control Desk
          </button>
        </div>
      )}
    </header>
  );
};
