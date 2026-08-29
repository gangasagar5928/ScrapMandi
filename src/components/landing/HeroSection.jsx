import React from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Scale,
  MapPin,
  CheckCircle,
  Zap
} from "lucide-react";

export const HeroSection = ({ setActiveTab, onOpenAuth }) => {
  const tickerItems = [
    { name: "HMS 1 Heavy Structure", price: "₹38,800/t", change: "+1.2%", mandi: "Mayapuri Yard" },
    { name: "Copper 99% Wire",       price: "₹775/kg",    change: "+0.8%", mandi: "Naraina Phase 1" },
    { name: "Brass Purza (Honey)",   price: "₹490/kg",    change: "-0.5%", mandi: "Wazirpur" },
    { name: "Aluminium Section 6063",price: "₹218/kg",    change: "+1.5%", mandi: "Faridabad" },
    { name: "OCC Gatta Mill Baled",  price: "₹16.00/kg",  change: "+0.3%", mandi: "Bawana" },
    { name: "PET Washed Flakes",     price: "₹47.50/kg",  change: "+1.0%", mandi: "Narela" },
    { name: "Saria Tukda / TMT Cut", price: "₹37,200/t",  change: "+0.9%", mandi: "Mundka" }
  ];

  const stats = [
    { value: "₹2.8+ Cr",    label: "Delhi NCR Monthly Volume",   color: "text-white" },
    { value: "950+ Tonnes", label: "Scrap Lifted This Month",    color: "text-emerald-400" },
    { value: "120+ Yards",  label: "Mayapuri, Mundka & Bawana", color: "text-white" },
    { value: "100%",        label: "Dharam Kanta Slip Backed",   color: "text-emerald-300" },
  ];

  const heroImg = "/images/scrap-hero-yard.svg";

  const spotItems = [
    {
      img: "/images/scrap-loha.svg",
      name: "HMS 1 Heavy Structure", badge: "80:20", badgeCls: "bg-slate-800 text-slate-300",
      seller: "Sharma Loha • Mayapuri Phase 2", price: "₹38,800", unit: "/ t", qty: "35 t ready", priceCls: "text-emerald-400"
    },
    {
      img: "/images/scrap-copper.svg",
      name: "Copper Armature (99%)", badge: "Berry", badgeCls: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      seller: "Salim Tamba • Naraina Phase 1", price: "₹775", unit: "/ kg", qty: "2,800 kg", priceCls: "text-amber-400"
    },
    {
      img: "/images/scrap-paper.svg",
      name: "OCC Gatta (Mill Baled)", badge: "Grade A", badgeCls: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      seller: "Aggarwal Recyclers • Bawana", price: "₹16.00", unit: "/ kg", qty: "24 t ready", priceCls: "text-emerald-400"
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-24 border-b border-slate-800/80">
      
      {/* Static Crisp Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('${heroImg}')` }}
      />

      {/* Cinematic dark gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Live Mandi Ticker */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8 relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-2.5 flex items-center gap-3 overflow-x-auto shadow-2xl">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Delhi Spot Bhav
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs whitespace-nowrap overflow-x-auto py-0.5">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 border-r border-slate-800 pr-4 sm:pr-6 last:border-0 shrink-0">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-white font-bold">{item.price}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${item.change.startsWith("+") ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-rose-400 bg-rose-500/10 border border-rose-500/20"}`}>
                  {item.change}
                </span>
                <span className="text-slate-400 text-[10px]">({item.mandi})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Delhi NCR Scrap Exchange • Mayapuri • Mundka • Bawana • Wazirpur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Sell • Buy • Recycle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Turning Waste Into Value.
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
              Direct scrap trading between verified yard owners, kabaris, recyclers, and secondary steel re-rolling mills in Delhi NCR. Guaranteed electronic Dharam Kanta slips, spot rates, zero dalal commission.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition active:scale-95 cursor-pointer"
              >
                <span>Find Scrap Lots (Buy)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl border border-slate-700/80 flex items-center justify-center gap-2 transition hover:border-emerald-500/50 active:scale-95 cursor-pointer"
              >
                <span>Post Yard Stock (Sell)</span>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Zero Dalal Commission</span>
              <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Dharam Kanta Weight Slips</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Yard Gate Verification</span>
            </div>
          </div>

          {/* Right column — Spot Deals Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-slate-700/70 shadow-2xl space-y-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="ScrapMandi"
                    className="w-10 h-10 object-contain drop-shadow"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Delhi NCR Spot Deals</h3>
                    <p className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">Ready for immediate truck loading</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] sm:text-[11px] font-bold border border-emerald-500/30 shrink-0">
                  ⚡ 30+ Lots
                </span>
              </div>

              <div className="space-y-2.5">
                {spotItems.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/scrap-loha.svg";
                        }}
                      />
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-white text-xs sm:text-sm truncate">{item.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${item.badgeCls}`}>{item.badge}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{item.seller}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <p className={`text-xs sm:text-sm font-black ${item.priceCls}`}>{item.price} <span className="text-[9px] text-slate-400 font-normal">{item.unit}</span></p>
                      <p className="text-[9px] text-slate-400">{item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("browse")}
                className="w-full py-2.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 text-center transition shadow-sm cursor-pointer"
              >
                Inspect All Delhi Yard Lots →
              </button>
            </div>
          </div>
        </div>

        {/* Stat Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800">
              <p className={`text-xl sm:text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
