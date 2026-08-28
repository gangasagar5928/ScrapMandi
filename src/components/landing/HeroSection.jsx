import React from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Building, 
  Truck, 
  CheckCircle, 
  Zap,
  Scale,
  MapPin
} from "lucide-react";

export const HeroSection = ({ setActiveTab, onOpenAuth }) => {
  const tickerItems = [
    { name: "HMS 1 Heavy Structure", price: "₹38,800/t", change: "+1.2%", mandi: "Mayapuri Yard" },
    { name: "Copper 99% Wire", price: "₹775/kg", change: "+0.8%", mandi: "Naraina Phase 1" },
    { name: "Brass Purza (Honey)", price: "₹490/kg", change: "-0.5%", mandi: "Wazirpur" },
    { name: "Aluminium Section 6063", price: "₹218/kg", change: "+1.5%", mandi: "Faridabad" },
    { name: "OCC Gatta Mill Baled", price: "₹16.00/kg", change: "+0.3%", mandi: "Bawana" },
    { name: "PET Washed Flakes", price: "₹47.50/kg", change: "+1.0%", mandi: "Narela" },
    { name: "Saria Tukda / TMT Cut", price: "₹37,200/t", change: "+0.9%", mandi: "Mundka" }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800">
      {/* Subtle grid pattern & glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Live Delhi NCR Ticker Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-2.5 flex items-center gap-3 overflow-x-auto shadow-inner">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Delhi Mandi Spot Bhav
          </div>
          <div className="flex items-center gap-6 text-xs whitespace-nowrap overflow-x-auto py-0.5">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 border-r border-slate-800 pr-6 last:border-0">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-white font-bold">{item.price}</span>
                <span className={`text-[10px] font-semibold px-1 rounded ${item.change.startsWith("+") ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                  {item.change}
                </span>
                <span className="text-slate-400 text-[10px]">({item.mandi})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Direct Scrap Mandi for Delhi NCR • Mayapuri • Mundka • Bawana • Wazirpur
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Buy & Sell Scrap in Delhi NCR. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Direct Yard Rates. Zero Dalali.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Connect directly with verified scrap yard owners in Mayapuri, Mundka, Bawana, Okhla, and Wazirpur. Guaranteed electronic Dharam Kanta slips, instant yard loading slots, and verified bank payouts.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group transition"
              >
                <span>Find Scrap Lots (Buy)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition"
              >
                <span>Post Yard Stock (Sell)</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Zero Broker / Dalal Commission
              </span>
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                Dharam Kanta Weight Slips
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Delhi NCR Yard Gate Inspection
              </span>
            </div>
          </div>

          {/* Right Column: Live Spot Deals Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">Delhi NCR Spot Lots</h3>
                  <p className="text-xs text-slate-400">Ready for immediate truck / tempo loading</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  ⚡ 30+ Active Lots
                </span>
              </div>

              {/* Spot items */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">HMS 1 Heavy Structure</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">80:20</span>
                    </div>
                    <p className="text-xs text-slate-400">Sharma Loha • Mayapuri Phase 2</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">₹38,800 <span className="text-[10px] text-slate-400 font-normal">/ t</span></p>
                    <p className="text-[11px] text-slate-400">35 tonnes ready</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Copper Armature (99% Wire)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded font-mono">Berry</span>
                    </div>
                    <p className="text-xs text-slate-400">Salim Tamba • Naraina Phase 1</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-amber-400">₹775 <span className="text-[10px] text-slate-400 font-normal">/ kg</span></p>
                    <p className="text-[11px] text-slate-400">2,800 kg available</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">OCC Gatta (Mill Baled Boxes)</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Grade A</span>
                    </div>
                    <p className="text-xs text-slate-400">Aggarwal Recyclers • Bawana Sector 3</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">₹16.00 <span className="text-[10px] text-slate-400 font-normal">/ kg</span></p>
                    <p className="text-[11px] text-slate-400">24 tonnes ready</p>
                  </div>
                </div>
              </div>

              {/* View All Button */}
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full py-2.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 text-center transition block"
              >
                View All Delhi NCR Yard Lots →
              </button>

            </div>
          </div>

        </div>

        {/* Bottom Platform Metrics Banner */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">₹2.8+ Cr</p>
            <p className="text-xs text-slate-400 mt-1">Delhi NCR Monthly Volume</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">950+ Tonnes</p>
            <p className="text-xs text-slate-400 mt-1">Scrap Lifted This Month</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">120+ Active Yards</p>
            <p className="text-xs text-slate-400 mt-1">Mayapuri, Mundka & Bawana</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-300">100%</p>
            <p className="text-xs text-slate-400 mt-1">Dharam Kanta Slip Backed</p>
          </div>
        </div>

      </div>
    </div>
  );
};
