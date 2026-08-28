import React from "react";
import { 
  Hammer, 
  Coins, 
  FileText, 
  Boxes, 
  Cpu, 
  Disc, 
  ArrowRight,
  TrendingUp,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles
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
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Catalog & Standard Grades
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Trade High-Volume Recyclable Streams
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Structured specifications conforming to Indian secondary steel, foundry, and polymer recycling norms.
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
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-600 flex items-center gap-1">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {cat.hindiName}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories preview tags */}
                <div className="pt-3 border-t border-slate-200/60">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map(sub => (
                      <span key={sub.id} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How ScrapMandi Works (Two distinct workflows: Seller vs Buyer) */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                End-to-End Coordination
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                How ScrapMandi Eliminates Friction
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Designed specifically for Indian scrap trading realities with multi-stage verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* For Vendors */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                    1
                  </div>
                  <h4 className="text-base font-bold text-white">For Scrap Yards & Sellers</h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>60-90s Rapid Posting:</strong> Upload photos, select standardized grade, set price/quantity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Private Yard Security:</strong> Exact address is only revealed to authenticated buyers after order confirmation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Guaranteed Payment Flow:</strong> Payment authorization is verified server-side before you load material.</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveTab("vendor-dashboard")}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition text-center"
                >
                  Create Scrap Listing Now →
                </button>
              </div>

              {/* For Dealers */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center">
                    2
                  </div>
                  <h4 className="text-base font-bold text-white">For Dealers, Mills & Foundries</h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Centralized Discovery:</strong> Filter by purity, grade, location, and distance without 50 WhatsApp calls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Atomic Quantity Lock:</strong> Prevents overselling when buying full or partial truck loads.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Weighbridge & Dispute SLA:</strong> Funds protected with evidence-based resolution desk.</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="w-full mt-2 bg-slate-700 hover:bg-slate-650 text-white font-bold py-2.5 rounded-xl text-xs border border-slate-600 transition text-center"
                >
                  Browse Available Lots →
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Mandi Regional Hubs Strip */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Active Trading Mandis Across India
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
            {MAJOR_MANDIS.slice(0, 5).map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-800 text-xs">{m.city}</p>
                <p className="text-[11px] text-emerald-600 font-semibold">{m.tag}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{m.state}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
