import React from "react";
import { 
  Hammer, 
  Coins, 
  FileText, 
  Boxes, 
  Cpu, 
  Disc, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Scale, 
  Truck 
} from "lucide-react";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../../data/categories";

// Guaranteed local SVG assets — never fail, never 403, 100% offline-ready
const categoryPhotos = {
  ferrous:      "/images/scrap-loha.svg",
  non_ferrous:  "/images/scrap-copper.svg",
  paper:        "/images/scrap-paper.svg",
  plastic:      "/images/scrap-plastic.svg",
  ewaste:       "/images/scrap-ewaste.svg",
  rubber_glass: "/images/scrap-tyres.svg"
};

const iconMap = {
  Hammer: Hammer,
  Coins: Coins,
  FileText: FileText,
  Boxes: Boxes,
  Cpu: Cpu,
  Disc: Disc
};

export const CategoryGrid = ({ onSelectCategory, setActiveTab }) => {
  return (
    <div className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Logo Icon */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <img src="/logo.png" alt="Logo" className="w-4 h-4 object-contain" />
            <span>Delhi NCR Scrap Streams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trade High-Liquidity Scrap by Grade
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Spot rate benchmarks and direct yard lots for secondary rolling mills, foundries, and plastic dana units in Delhi NCR.
          </p>
        </div>

        {/* Visual Category 6-Grid with Local Vector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SCRAP_CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Hammer;
            const photo = categoryPhotos[cat.id] || categoryPhotos.ferrous;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/60 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[280px]"
              >
                {/* Guaranteed Local Card Vector Artwork */}
                <img
                  src={photo}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Dark Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 group-hover:via-slate-950/60 transition-colors" />

                {/* Top Badge Area */}
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-400 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
                    <span>Inspect Lots</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 pt-0 space-y-3">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                      {cat.hindiName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategory Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map(sub => (
                      <span key={sub.id} className="text-[10px] bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 px-2 py-0.5 rounded-lg font-medium">
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-lg font-bold border border-emerald-500/30">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How ScrapMandi Works with 4K Visual Cards */}
        <div className="bg-slate-950/90 backdrop-blur-xl text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative border border-slate-800">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                Direct Yard Settlement
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
                How ScrapMandi Works in Delhi NCR
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Simple, transparent yard coordination without middlemen dalals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* For Yard Owners (Sellers) */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-7 space-y-4 hover:border-emerald-500/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-lg flex items-center justify-center border border-emerald-500/30">
                    1
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">For Yard Owners (Sellers)</h4>
                    <p className="text-xs text-emerald-400">Mayapuri • Mundka • Bawana</p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1-Minute Post:</strong> Put your available lot quantity, grade, and rate per kg/tonne.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Yard Address Privacy:</strong> Your exact gate location is shared only after the buyer confirms payment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Direct Bank Payout:</strong> Payout released immediately once weighbridge slip is signed at the gate.</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveTab("vendor-dashboard")}
                  className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-3 rounded-xl text-xs transition text-center shadow-lg shadow-emerald-600/20"
                >
                  Post Your Yard Lot Now →
                </button>
              </div>

              {/* For Dealers & Mills (Buyers) */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-7 space-y-4 hover:border-blue-500/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 font-black text-lg flex items-center justify-center border border-blue-500/30">
                    2
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">For Secondary Mills & Dealers (Buyers)</h4>
                    <p className="text-xs text-blue-400">Wazirpur • Okhla • Faridabad</p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Live Stock Visibility:</strong> Find verified stock in Mayapuri, Mundka, or Wazirpur without making 30 phone calls.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Lock Spot Price:</strong> Lock full or partial truckload quantity with instant inventory reservation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Dharam Kanta Weight Protection:</strong> Funds held securely until weight slip matches billed tonnage.</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="w-full mt-3 bg-slate-800 hover:bg-slate-750 text-white font-bold py-3 rounded-xl text-xs border border-slate-700 transition text-center"
                >
                  Browse Available Lots →
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
