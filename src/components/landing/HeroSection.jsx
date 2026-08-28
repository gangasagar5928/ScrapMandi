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
  MapPin,
  Sparkles
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
    <div className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-800/80">
      
      {/* 4K Industrial Scrap Yard Background with Subtle Parallax Zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center hero-bg-zoom opacity-20 pointer-events-none mix-blend-luminosity"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2560&auto=format&fit=crop&q=90')"
        }}
      />

      {/* Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Live Delhi NCR Mandi Ticker Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-2.5 flex items-center gap-3 overflow-x-auto shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 border border-emerald-500/30">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            Delhi Mandi Spot Bhav
          </div>
          <div className="flex items-center gap-6 text-xs whitespace-nowrap overflow-x-auto py-0.5">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 border-r border-slate-800 pr-6 last:border-0">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand, Headline, & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Regional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Delhi NCR Scrap Exchange • Mayapuri • Mundka • Bawana • Wazirpur</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Sell • Buy • Recycle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 drop-shadow">
                Turning Waste Into Value.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
              Direct scrap trading between verified yard owners, kabaris, recyclers, and secondary steel re-rolling mills in Delhi NCR. Guaranteed electronic Dharam Kanta slips, spot rates, and zero dalal middleman commission.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 group transition transform hover:-translate-y-0.5"
              >
                <span>Find Scrap Lots (Buy)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab("vendor-dashboard")}
                className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-white font-bold px-7 py-4 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2 transition hover:border-emerald-500/50"
              >
                <span>Post Yard Stock (Sell)</span>
              </button>
            </div>

            {/* Trust Pill Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Zero Dalal Commission
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Scale className="w-4 h-4 text-emerald-400" />
                Dharam Kanta Weight Slips
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Yard Gate Verification
              </span>
            </div>
          </div>

          {/* Right Column: Visual Logo Showcase & Live Spot Deals Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 3D Glassmorphism Spot Card */}
            <div className="bg-slate-900/85 backdrop-blur-xl p-6 rounded-3xl border border-slate-700/70 shadow-2xl space-y-4 relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header with Logo */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo.png" 
                    alt="ScrapMandi Official Logo" 
                    className="w-12 h-12 object-contain animate-float drop-shadow-lg" 
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

              {/* Spot items list with high-res thumbnails */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&auto=format&fit=crop&q=80" 
                      alt="HMS 1 Structure" 
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700" 
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">HMS 1 Heavy Structure</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">80:20</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Sharma Loha • Mayapuri Phase 2</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">₹38,800 <span className="text-[10px] text-slate-400 font-normal">/ t</span></p>
                    <p className="text-[10px] text-slate-400">35 t ready</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1618764400608-9e7115eabb7c?w=120&auto=format&fit=crop&q=80" 
                      alt="Copper 99%" 
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700" 
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">Copper Armature (99%)</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">Berry</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Salim Tamba • Naraina Phase 1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-amber-400">₹775 <span className="text-[10px] text-slate-400 font-normal">/ kg</span></p>
                    <p className="text-[10px] text-slate-400">2,800 kg</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=120&auto=format&fit=crop&q=80" 
                      alt="OCC Gatta" 
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700" 
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">OCC Gatta (Mill Baled)</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Grade A</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Aggarwal Recyclers • Bawana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">₹16.00 <span className="text-[10px] text-slate-400 font-normal">/ kg</span></p>
                    <p className="text-[10px] text-slate-400">24 t ready</p>
                  </div>
                </div>
              </div>

              {/* View All Lots CTA */}
              <button
                onClick={() => setActiveTab("browse")}
                className="w-full py-3 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 rounded-xl border border-slate-700 text-center transition block shadow-sm"
              >
                Inspect All Delhi Yard Lots →
              </button>

            </div>
          </div>

        </div>

        {/* 4-Stat Platform Metric Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-slate-900/50 backdrop-blur p-4 rounded-2xl border border-slate-800">
            <p className="text-2xl sm:text-3xl font-black text-white">₹2.8+ Cr</p>
            <p className="text-xs text-slate-400 mt-1">Delhi NCR Monthly Volume</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur p-4 rounded-2xl border border-slate-800">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">950+ Tonnes</p>
            <p className="text-xs text-slate-400 mt-1">Scrap Lifted This Month</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur p-4 rounded-2xl border border-slate-800">
            <p className="text-2xl sm:text-3xl font-black text-white">120+ Active Yards</p>
            <p className="text-xs text-slate-400 mt-1">Mayapuri, Mundka & Bawana</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur p-4 rounded-2xl border border-slate-800">
            <p className="text-2xl sm:text-3xl font-black text-emerald-300">100%</p>
            <p className="text-xs text-slate-400 mt-1">Dharam Kanta Slip Backed</p>
          </div>
        </div>

      </div>
    </div>
  );
};
