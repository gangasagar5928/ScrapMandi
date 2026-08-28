import React, { useEffect, useRef } from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Scale,
  MapPin,
  CheckCircle,
  Zap
} from "lucide-react";

// Hook to trigger reveal animations via IntersectionObserver
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export const HeroSection = ({ setActiveTab, onOpenAuth }) => {
  useReveal();

  const tickerItems = [
    { name: "HMS 1 Heavy Structure", price: "₹38,800/t", change: "+1.2%", mandi: "Mayapuri Yard" },
    { name: "Copper 99% Wire",       price: "₹775/kg",    change: "+0.8%", mandi: "Naraina Phase 1" },
    { name: "Brass Purza (Honey)",   price: "₹490/kg",    change: "-0.5%", mandi: "Wazirpur" },
    { name: "Aluminium Section 6063",price: "₹218/kg",    change: "+1.5%", mandi: "Faridabad" },
    { name: "OCC Gatta Mill Baled",  price: "₹16.00/kg",  change: "+0.3%", mandi: "Bawana" },
    { name: "PET Washed Flakes",     price: "₹47.50/kg",  change: "+1.0%", mandi: "Narela" },
    { name: "Saria Tukda / TMT Cut", price: "₹37,200/t",  change: "+0.9%", mandi: "Mundka" },
    { name: "HMS 1 Heavy Structure", price: "₹38,800/t", change: "+1.2%", mandi: "Mayapuri Yard" },
    { name: "Copper 99% Wire",       price: "₹775/kg",    change: "+0.8%", mandi: "Naraina Phase 1" },
    { name: "Brass Purza (Honey)",   price: "₹490/kg",    change: "-0.5%", mandi: "Wazirpur" },
    { name: "OCC Gatta Mill Baled",  price: "₹16.00/kg",  change: "+0.3%", mandi: "Bawana" },
    { name: "PET Washed Flakes",     price: "₹47.50/kg",  change: "+1.0%", mandi: "Narela" },
  ];

  const stats = [
    { value: "₹2.8+ Cr",    label: "Delhi NCR Monthly Volume",   color: "text-white" },
    { value: "950+ Tonnes", label: "Scrap Lifted This Month",    color: "text-emerald-400" },
    { value: "120+ Yards",  label: "Mayapuri, Mundka & Bawana", color: "text-white" },
    { value: "100%",        label: "Dharam Kanta Slip Backed",   color: "text-emerald-300" },
  ];

  // High-res WORKING image from Pexels (doesn't block cross-origin)
  // Using picsum.photos as reliable fallback with industrial seed
  const heroImg = "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440&fit=crop";

  const spotItems = [
    {
      img: "https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      name: "HMS 1 Heavy Structure", badge: "80:20", badgeCls: "bg-slate-800 text-slate-300",
      seller: "Sharma Loha • Mayapuri Phase 2", price: "₹38,800", unit: "/ t", qty: "35 t ready", priceCls: "text-emerald-400"
    },
    {
      img: "https://images.pexels.com/photos/162634/metal-pipe-copper-gold-162634.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      name: "Copper Armature (99%)", badge: "Berry", badgeCls: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      seller: "Salim Tamba • Naraina Phase 1", price: "₹775", unit: "/ kg", qty: "2,800 kg", priceCls: "text-amber-400"
    },
    {
      img: "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      name: "OCC Gatta (Mill Baled)", badge: "Grade A", badgeCls: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      seller: "Aggarwal Recyclers • Bawana", price: "₹16.00", unit: "/ kg", qty: "24 t ready", priceCls: "text-emerald-400"
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-800/80">
      
      {/* ── Hero BG: Slow Zoom ── */}
      <div 
        className="absolute inset-0 bg-cover bg-center hero-bg-zoom opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('${heroImg}')` }}
      />

      {/* Cinematic dark gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Live Mandi Ticker (Marquee) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-2.5 flex items-center gap-3 overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 border border-emerald-500/30">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            Delhi Spot Bhav
          </div>
          {/* Infinite marquee — duplicated for seamless loop */}
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee items-center gap-6 text-xs whitespace-nowrap">
              {tickerItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 border-r border-slate-800 pr-6 last:border-0 shrink-0">
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
      </div>

      {/* ── Main Hero Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold reveal">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Delhi NCR Scrap Exchange • Mayapuri • Mundka • Bawana • Wazirpur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] reveal reveal-delay-1">
              Sell • Buy • Recycle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 drop-shadow">
                Turning Waste Into Value.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal reveal reveal-delay-2">
              Direct scrap trading between verified yard owners, kabaris, recyclers, and secondary steel re-rolling mills in Delhi NCR. Guaranteed electronic Dharam Kanta slips, spot rates, zero dalal commission.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 reveal reveal-delay-3">
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 group transition transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Find Scrap Lots (Buy)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-white font-bold px-7 py-4 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2 transition hover:border-emerald-500/50 active:scale-95"
              >
                <span>Post Yard Stock (Sell)</span>
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 reveal reveal-delay-4">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Zero Dalal Commission</span>
              <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-emerald-400" /> Dharam Kanta Weight Slips</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Yard Gate Verification</span>
            </div>
          </div>

          {/* Right column — Spot Deals Card */}
          <div className="lg:col-span-5 space-y-4 reveal reveal-delay-2">
            <div className="bg-slate-900/85 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/70 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="ScrapMandi"
                    className="w-12 h-12 object-contain animate-float drop-shadow-lg"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div>
                    <h3 className="font-bold text-white text-base">Delhi NCR Spot Deals</h3>
                    <p className="text-[11px] text-emerald-400 font-medium">Ready for immediate truck loading</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                  ⚡ 30+ Active Lots
                </span>
              </div>

              <div className="space-y-3">
                {spotItems.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/80x80/1e293b/34d399?text=${encodeURIComponent(item.name.slice(0,2))}`;
                        }}
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${item.badgeCls}`}>{item.badge}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{item.seller}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-black ${item.priceCls}`}>{item.price} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span></p>
                      <p className="text-[10px] text-slate-400">{item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("browse")}
                className="w-full py-3 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 rounded-xl border border-slate-700 text-center transition shadow-sm"
              >
                Inspect All Delhi Yard Lots →
              </button>
            </div>
          </div>
        </div>

        {/* ── Stat Bar with Reveal Animations ── */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className={`bg-slate-900/50 backdrop-blur p-4 rounded-2xl border border-slate-800 reveal reveal-delay-${i + 1}`}>
              <p className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
