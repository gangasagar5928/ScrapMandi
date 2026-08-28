import React from "react";
import { Filter, X, RefreshCw, CheckSquare, Square, MapPin, Tag } from "lucide-react";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../../data/categories";

export const ListingFilterSidebar = ({
  filters,
  setFilters,
  resetFilters,
  totalResults = 0
}) => {
  const selectedCatObj = SCRAP_CATEGORIES.find(c => c.id === filters.category);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-sm sticky top-20">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900">Search Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Scrap Stream
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setFilters({ ...filters, category: "all", subCategory: "all" })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
              filters.category === "all" 
                ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Categories ({totalResults})
          </button>
          {SCRAP_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.id, subCategory: "all" })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                filters.category === cat.id 
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-400">{cat.subcategories.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory selection (if category selected) */}
      {selectedCatObj && (
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Grade / Spec ({selectedCatObj.name})
          </label>
          <select
            value={filters.subCategory}
            onChange={(e) => setFilters({ ...filters, subCategory: e.target.value })}
            className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
          >
            <option value="all">All Grades in {selectedCatObj.name}</option>
            {selectedCatObj.subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Region / Mandi Hub */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          Mandi Region
        </label>
        <select
          value={filters.mandi}
          onChange={(e) => setFilters({ ...filters, mandi: e.target.value })}
          className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
        >
          <option value="all">All India Mandis</option>
          {MAJOR_MANDIS.map((m, idx) => (
            <option key={idx} value={m.city}>{m.city} ({m.state})</option>
          ))}
        </select>
      </div>

      {/* Trust & Verification Badges */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Trust & Accreditation
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.gstinOnly}
              onChange={(e) => setFilters({ ...filters, gstinOnly: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>GSTIN Verified Sellers Only</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>Ready in Yard (In Stock)</span>
          </label>
        </div>
      </div>

    </div>
  );
};
