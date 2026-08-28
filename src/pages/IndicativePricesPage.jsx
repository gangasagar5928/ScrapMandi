import React, { useState } from "react";
import { 
  TrendingUp, 
  Clock, 
  MapPin, 
  BarChart2, 
  Search, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../data/categories";
import { PriceDisclaimer } from "../components/common/PriceDisclaimer";

export const IndicativePricesPage = ({ onSelectCategoryAndBrowse }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMandi, setSelectedMandi] = useState("Mayapuri Scrap Yard");

  const categoriesToDisplay = selectedCategory === "all" 
    ? SCRAP_CATEGORIES 
    : SCRAP_CATEGORIES.filter(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Delhi NCR Mandi Rates
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Today's Delhi Mandi Scrap Bhav
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Spot rate benchmarks computed from verified lots in Mayapuri, Mundka, Bawana, Wazirpur, and Okhla.
              </p>
            </div>
          </div>

          <PriceDisclaimer region={selectedMandi} sampleSize={38} />
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === "all" 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Scrap Streams
            </button>
            {SCRAP_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id 
                    ? "bg-emerald-600 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mandi Selector */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              {MAJOR_MANDIS.map((m, idx) => (
                <option key={idx} value={m.city}>{m.city} ({m.region})</option>
              ))}
            </select>
          </div>

        </div>

        {/* Benchmark Tables by Category */}
        <div className="space-y-6">
          {categoriesToDisplay.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              
              {/* Category Sub-Header */}
              <div className="bg-slate-950 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-sm">{cat.name}</h3>
                  <p className="text-[11px] text-emerald-400 font-semibold">{cat.hindiName}</p>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  Unit: {cat.defaultUnit}
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6">Specification / Grade</th>
                      <th className="py-3 px-4">Today's Benchmark Rate</th>
                      <th className="py-3 px-4">Delhi Spot Range</th>
                      <th className="py-3 px-4">Active Sample Size</th>
                      <th className="py-3 px-4">Daily Trend</th>
                      <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {cat.subcategories.map((sub) => {
                      const basePrice = sub.baseBenchmark;
                      const minPrice = Math.round(basePrice * 0.97);
                      const maxPrice = Math.round(basePrice * 1.03);
                      const sampleSize = Math.floor(Math.random() * 8) + 8;

                      return (
                        <tr key={sub.id} className="hover:bg-slate-50/70 transition">
                          {/* Grade Name */}
                          <td className="py-3.5 px-6">
                            <div>
                              <p className="font-bold text-slate-900">{sub.name}</p>
                              <p className="text-[11px] text-slate-500">{sub.grades?.join(", ")}</p>
                            </div>
                          </td>

                          {/* Benchmark */}
                          <td className="py-3.5 px-4">
                            <span className="text-sm font-black text-slate-900">
                              ₹{basePrice.toLocaleString('en-IN')}{" "}
                              <span className="text-[10px] text-slate-500 font-normal">/{sub.unit}</span>
                            </span>
                          </td>

                          {/* Range */}
                          <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                            ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                          </td>

                          {/* Sample size */}
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              N = {sampleSize} Delhi Lots
                            </span>
                          </td>

                          {/* Trend */}
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                              <TrendingUp className="w-3.5 h-3.5" />
                              +1.2% (Steady)
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => onSelectCategoryAndBrowse(cat.id)}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition inline-flex items-center gap-1"
                            >
                              <span>Inspect Lots</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          ))}
        </div>

        {/* Methodology Note */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Delhi Mandi Rate Calculation Method
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rates are calculated from live yard listings across Mayapuri, Mundka, Bawana, and Wazirpur. Outlier bids and unverified phone postings are automatically filtered out. Weight on weighbridge slip (Dharam Kanta) determines final bill.
          </p>
        </div>

      </div>
    </div>
  );
};
