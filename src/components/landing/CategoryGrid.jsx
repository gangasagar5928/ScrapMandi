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
    <div className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Delhi NCR Scrap Categories
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Trade Industrial Scrap by Standard Grade
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Real mandi rates for secondary rolling mills, foundries, and plastic dana units in Delhi, Haryana & UP border.
          </p>
        </div>

        {/* Categories 6-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SCRAP_CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Hammer;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 flex items-center gap-1">
                      Check Lots <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mb-2">
                    {cat.hindiName}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories preview tags */}
                <div className="pt-3 border-t border-slate-200/80">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map(sub => (
                      <span key={sub.id} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How ScrapMandi Works for Delhi NCR */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative border border-slate-800">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Direct Yard Settlement
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                How ScrapMandi Works in Delhi NCR
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Simple, transparent yard coordination without middlemen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* For Yard Owners (Sellers) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                    1
                  </div>
                  <h4 className="text-base font-bold text-white">For Yard Owners & Sellers (Mayapuri / Bawana)</h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1-Minute Post:</strong> Put your available lot quantity, grade, and rate per kg/tonne.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Yard Address Privacy:</strong> Your exact gate location is shared only after the buyer confirms payment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Direct Bank Payout:</strong> Payout released immediately once weighbridge slip is signed at the gate.</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveTab("vendor-dashboard")}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition text-center"
                >
                  Post Your Yard Lot Now →
                </button>
              </div>

              {/* For Dealers & Mills (Buyers) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center">
                    2
                  </div>
                  <h4 className="text-base font-bold text-white">For Secondary Mills & Dealers (Buyers)</h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Live Stock Visibility:</strong> Find verified stock in Mayapuri, Mundka, or Wazirpur without making 30 phone calls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Lock Spot Price:</strong> Lock full or partial truckload quantity with instant inventory reservation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Dharam Kanta Weight Protection:</strong> Funds held securely until weight slip matches billed tonnage.</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="w-full mt-2 bg-slate-800 hover:bg-slate-750 text-white font-bold py-2.5 rounded-xl text-xs border border-slate-700 transition text-center"
                >
                  Browse Available Lots →
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Delhi NCR Scrap Hubs Strip */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Scrap Hubs Across Delhi NCR
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
            {MAJOR_MANDIS.slice(0, 5).map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-xs">{m.city}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">{m.tag}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{m.region}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
