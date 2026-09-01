import React, { useState } from "react";
import { 
  TrendingUp, 
  MapPin, 
  ArrowRight, 
  ChevronRight
} from "lucide-react";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../data/categories";
import { PriceDisclaimer } from "../components/common/PriceDisclaimer";
import { IOSCard } from "../components/ios/IOSCard";
import { IOSBadge } from "../components/ios/IOSBadge";
import { IOSButton } from "../components/ios/IOSButton";

export const IndicativePricesPage = ({ onSelectCategoryAndBrowse }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMandi, setSelectedMandi] = useState("Mayapuri Scrap Yard");

  const categoriesToDisplay = selectedCategory === "all" 
    ? SCRAP_CATEGORIES 
    : SCRAP_CATEGORIES.filter(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label py-6 sm:py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* iOS Header */}
        <div className="space-y-3">
          <div>
            <span className="text-[11px] uppercase font-bold text-ios-green bg-ios-green/15 px-3 py-1 rounded-full">
              Delhi NCR Mandi Rates
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-ios-label tracking-tight mt-2">
              Today's Delhi Mandi Scrap Bhav
            </h1>
            <p className="text-xs sm:text-sm text-ios-label2 mt-1">
              Spot rate benchmarks computed from verified lots in Mayapuri, Mundka, Bawana, Wazirpur, and Okhla.
            </p>
          </div>

          <PriceDisclaimer region={selectedMandi} sampleSize={38} />
        </div>

        {/* Filters Toolbar */}
        <div className="bg-ios-bg2 rounded-[16px] border border-ios-separator/20 p-3 sm:p-4 shadow-ios-card dark:shadow-ios-card-dark flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === "all" 
                  ? "bg-ios-blue text-white shadow-xs" 
                  : "bg-ios-bg3 text-ios-label2 hover:text-ios-label"
              }`}
            >
              All Scrap Streams
            </button>
            {SCRAP_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id 
                    ? "bg-ios-blue text-white shadow-xs" 
                    : "bg-ios-bg3 text-ios-label2 hover:text-ios-label"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mandi Selector */}
          <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-ios-green" />
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="px-3 py-1.5 bg-ios-bg3 border border-transparent rounded-[10px] text-xs font-bold text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue/40 cursor-pointer"
            >
              {MAJOR_MANDIS.map((m, idx) => (
                <option key={idx} value={m.city}>{m.city} ({m.region})</option>
              ))}
            </select>
          </div>

        </div>

        {/* Grouped Benchmark Cards by Category */}
        <div className="space-y-6">
          {categoriesToDisplay.map((cat) => (
            <div key={cat.id} className="bg-ios-bg2 rounded-[20px] border border-ios-separator/20 overflow-hidden shadow-ios-card dark:shadow-ios-card-dark">
              
              {/* Category Header */}
              <div className="px-5 py-3.5 flex items-center justify-between border-b border-ios-separator/20 bg-ios-bg3/40">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-ios-label uppercase tracking-wider">{cat.name}</span>
                  <span className="text-xs text-ios-green font-medium">({cat.hindiName})</span>
                </div>
                <button
                  onClick={() => onSelectCategoryAndBrowse(cat.id)}
                  className="text-xs font-semibold text-ios-blue hover:opacity-75 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Browse {cat.name} Lots</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Benchmark List */}
              <div className="divide-y divide-ios-separator/15">
                {cat.subcategories.map((sub, idx) => {
                  const price = sub.pricePerKg ? `₹${sub.pricePerKg}/kg` : `₹${sub.pricePerTonne?.toLocaleString()}/t`;
                  return (
                    <div 
                      key={sub.id} 
                      onClick={() => onSelectCategoryAndBrowse(cat.id)}
                      className="px-5 py-3.5 flex items-center justify-between hover:bg-ios-bg3/50 transition cursor-pointer select-none"
                    >
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-ios-label">{sub.name}</p>
                        <p className="text-[11px] text-ios-label2">{sub.specs || "Standard Commercial Grade"}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-black text-ios-label">{price}</p>
                          <IOSBadge color="green" variant="tinted">
                            Spot Bhav
                          </IOSBadge>
                        </div>
                        <ChevronRight className="w-4 h-4 text-ios-gray3" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
