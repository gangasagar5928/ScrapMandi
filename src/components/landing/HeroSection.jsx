import React from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Building, 
  Truck, 
  CheckCircle, 
  Zap,
  Sparkles,
  Scale
} from "lucide-react";

export const HeroSection = ({ setActiveTab, onOpenAuth }) => {
  const tickerItems = [
    { name: "HMS 1 Heavy Steel", price: "₹38,500/tonne", change: "+1.8%", mandi: "Mandi Gobindgarh" },
    { name: "Copper Armature 99%", price: "₹765/kg", change: "+0.9%", mandi: "Delhi-NCR" },
    { name: "Brass Honey Clean", price: "₹485/kg", change: "-0.4%", mandi: "Jamnagar" },
    { name: "Aluminium 6063", price: "₹215/kg", change: "+2.1%", mandi: "Chennai" },
    { name: "OCC Cardboard Baled", price: "₹15.50/kg", change: "+0.5%", mandi: "Vapi / Gujarat" },
    { name: "PET Flakes Hot Wash", price: "₹46.00/kg", change: "+1.2%", mandi: "Mumbai" },
    { name: "Lead Battery Plates", price: "₹182/kg", change: "-0.2%", mandi: "Hyderabad" }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Live Ticker Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-3 overflow-x-auto shadow-inner">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Spot Mandi Ticker
          </div>
          <div className="flex items-center gap-6 text-xs whitespace-nowrap overflow-x-auto py-0.5">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 border-r border-slate-700/60 pr-6 last:border-0">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-white font-bold">{item.price}</span>
                <span className={`text-[10px] font-semibold px-1 rounded ${item.change.startsWith("+") ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                  {item.change}
                </span>
                <span className="text-slate-500 text-[10px]">({item.mandi})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              India's #1 B2B Recyclable Material Network
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Trade Industrial Scrap. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Transparent & Audited.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Connect directly with verified scrap yards, foundries, and recyclers across Mandi Gobindgarh, Delhi-NCR, Mumbai, and Chennai. Real-time listing discovery, atomic order allocation, and protected settlement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group transition"
              >
                <span>Find Scrap Supply (Dealers)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition"
              >
                <span>Sell Inventory (60-sec Post)</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Zero Marketplace Commission (Phase 1)
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                GSTIN & Yard Verification
              </span>
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                Weighbridge Slip Dispute Protection
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Exchange Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800 to-slate-850 p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div>
                  <h3 className="font-bold text-white text-base">Live Spot Deals</h3>
                  <p className="text-xs text-slate-400">Ready for immediate mill dispatch</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  ⚡ 50+ Active Listings
                </span>
              </div>

              {/* Sample spot items */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-750 flex items-center justify-between hover:border-slate-600 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">HMS 1 Structure Scrap</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Grade 80:20</span>
                    </div>
                    <p className="text-xs text-slate-400">Sharma Metals • Mandi Gobindgarh</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">₹38,500 <span className="text-[10px] text-slate-400 font-normal">/ tonne</span></p>
                    <p className="text-[11px] text-slate-400">45 tonnes available</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-750 flex items-center justify-between hover:border-slate-600 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Copper Armature (Berry)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded">99% Pure</span>
                    </div>
                    <p className="text-xs text-slate-400">National Cables • Mayapuri, Delhi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-amber-400">₹765 <span className="text-[10px] text-slate-400 font-normal">/ kg</span></p>
                    <p className="text-[11px] text-slate-400">3,200 kg available</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-750 flex items-center justify-between hover:border-slate-600 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">OCC Mill Baled Cardboard</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded">Grade A</span>
                    </div>
                    <p className="text-xs text-slate-400">Gujarat Eco Paper • Vapi Hub</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">₹15.50 <span className="text-[10px] text-slate-400 font-normal">/ kg</span></p>
                    <p className="text-[11px] text-slate-400">18 tonnes available</p>
                  </div>
                </div>
              </div>

              {/* View All Button */}
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full py-2.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-750 rounded-xl border border-slate-700 text-center transition block"
              >
                Explore All 50+ Verified Yard Listings →
              </button>

            </div>
          </div>

        </div>

        {/* Bottom Platform Metrics Banner */}
        <div className="mt-16 pt-8 border-t border-slate-800/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">₹5.4+ Cr</p>
            <p className="text-xs text-slate-400 mt-1">Transaction GMV Run-Rate</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">1,850+ Tonnes</p>
            <p className="text-xs text-slate-400 mt-1">Scrap Traded This Month</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">450+ Accredited</p>
            <p className="text-xs text-slate-400 mt-1">Yards & Foundries</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-cyan-400">&lt; 90 Sec</p>
            <p className="text-xs text-slate-400 mt-1">Average Post-to-Order Speed</p>
          </div>
        </div>

      </div>
    </div>
  );
};
