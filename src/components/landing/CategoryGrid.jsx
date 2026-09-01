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
import { IOSBadge } from "../ios/IOSBadge";
import { IOSButton } from "../ios/IOSButton";

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
    <div className="py-12 sm:py-16 bg-ios-bg text-ios-label border-b border-ios-separator/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ios-green/15 text-ios-green text-xs font-bold uppercase tracking-wider mb-3">
            <img src="/logo.png" alt="Logo" className="w-3.5 h-3.5 object-contain" />
            <span>Delhi NCR Scrap Streams</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-ios-label tracking-tight">
            Trade High-Liquidity Scrap by Grade
          </h2>
          <p className="text-ios-label2 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Spot rate benchmarks and direct yard lots for secondary rolling mills, foundries, and plastic dana units in Delhi NCR.
          </p>
        </div>

        {/* Visual Category 6-Grid with iOS Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 sm:mb-16">
          {SCRAP_CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Hammer;
            const photo = categoryPhotos[cat.id] || categoryPhotos.ferrous;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-[20px] overflow-hidden border border-ios-separator/20 shadow-ios-card dark:shadow-ios-card-dark transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[260px] bg-ios-bg2 active:scale-[0.99]"
              >
                {/* Artwork */}
                <img
                  src={photo}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 group-hover:via-black/50 transition-colors" />

                {/* Top Badge Area */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-[12px] bg-black/60 backdrop-blur-md text-ios-green border border-white/20 flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white/90 group-hover:text-ios-green flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <span>Inspect Lots</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-5 pt-0 space-y-2.5">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-ios-green transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-ios-green font-semibold mt-0.5">
                      {cat.hindiName}
                    </p>
                  </div>

                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategory Pills */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map(sub => (
                      <span key={sub.id} className="text-[10px] bg-black/60 backdrop-blur-md border border-white/20 text-white/90 px-2 py-0.5 rounded-[8px] font-medium">
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] bg-ios-green/30 text-white px-2 py-0.5 rounded-[8px] font-bold border border-ios-green/40">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How ScrapMandi Works — iOS Inset Grouped Box */}
        <div className="bg-ios-bg2 text-ios-label rounded-[24px] p-6 sm:p-10 shadow-ios-card dark:shadow-ios-card-dark border border-ios-separator/20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[11px] uppercase font-bold text-ios-green bg-ios-green/15 px-3 py-1 rounded-full">
              Direct Yard Settlement
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-ios-label mt-2.5 tracking-tight">
              How ScrapMandi Works in Delhi NCR
            </h3>
            <p className="text-xs sm:text-sm text-ios-label2 mt-1">
              Simple, transparent yard coordination without middlemen dalals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* For Yard Owners (Sellers) */}
            <div className="bg-ios-bg3/60 rounded-[20px] p-5 sm:p-6 space-y-3.5 border border-ios-separator/15">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-ios-green/20 text-ios-green font-black text-sm flex items-center justify-center">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ios-label">For Yard Owners (Sellers)</h4>
                  <p className="text-[11px] text-ios-green">Mayapuri • Mundka • Bawana</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-ios-label2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ios-green shrink-0 mt-0.5" />
                  <span><strong>1-Minute Post:</strong> Put your available lot quantity, grade, and rate per kg/tonne.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ios-green shrink-0 mt-0.5" />
                  <span><strong>Yard Address Privacy:</strong> Exact gate location is shared only after payment confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ios-green shrink-0 mt-0.5" />
                  <span><strong>Direct Payout:</strong> Payout released immediately once weighbridge slip is signed.</span>
                </li>
              </ul>
              <IOSButton
                fullWidth
                color="green"
                variant="filled"
                onClick={() => setActiveTab("vendor-dashboard")}
              >
                Post Your Yard Lot Now →
              </IOSButton>
            </div>

            {/* For Dealers & Mills (Buyers) */}
            <div className="bg-ios-bg3/60 rounded-[20px] p-5 sm:p-6 space-y-3.5 border border-ios-separator/15">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-ios-blue/20 text-ios-blue font-black text-sm flex items-center justify-center">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ios-label">For Secondary Mills & Dealers (Buyers)</h4>
                  <p className="text-[11px] text-ios-blue">Wazirpur • Okhla • Faridabad</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-ios-label2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ios-blue shrink-0 mt-0.5" />
                  <span><strong>Live Yard Inspection:</strong> View verified yard photos, purity grade, and location.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ios-blue shrink-0 mt-0.5" />
                  <span><strong>Dharam Kanta Guarantee:</strong> Weight slip from authorized weighbridges determines final bill.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ios-blue shrink-0 mt-0.5" />
                  <span><strong>Escrow Protection:</strong> Payment held in secure escrow until truck is loaded and dispatched.</span>
                </li>
              </ul>
              <IOSButton
                fullWidth
                color="blue"
                variant="tinted"
                onClick={() => setActiveTab("browse")}
              >
                Browse Available Lots →
              </IOSButton>
            </div>
          </div>

          {/* Mandi Yard Coverage */}
          <div className="mt-6 pt-6 border-t border-ios-separator/15">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ios-label3 text-center mb-3">
              Active Covered Industrial Clusters in Delhi NCR
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {MAJOR_MANDIS.map((mandi) => (
                <div key={mandi.id} className="p-2.5 rounded-[12px] bg-ios-bg3/60 border border-ios-separator/15 text-center">
                  <MapPin className="w-3.5 h-3.5 text-ios-green mx-auto mb-0.5" />
                  <p className="font-bold text-ios-label text-xs">{mandi.name}</p>
                  <p className="text-[9px] text-ios-label3 mt-0.5">{mandi.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
