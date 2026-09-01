import React from "react";
import { Filter, RefreshCw, MapPin } from "lucide-react";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../../data/categories";
import { IOSToggle } from "../ios/IOSToggle";

export const ListingFilterSidebar = ({
  filters,
  setFilters,
  onReset,
  totalResults = 0
}) => {
  const selectedCatObj = SCRAP_CATEGORIES.find(c => c.id === filters.category);

  return (
    <div className="bg-ios-bg2 text-ios-label rounded-[20px] border border-ios-separator/20 p-4 sm:p-5 space-y-5 shadow-ios-card dark:shadow-ios-card-dark sticky top-20">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-ios-separator/15">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-ios-blue" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-ios-label">Filter Lots</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-ios-blue hover:opacity-75 flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category List */}
      <div>
        <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider mb-2">
          Scrap Category
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setFilters({ ...filters, category: "all", subCategory: "all" })}
            className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium transition cursor-pointer flex items-center justify-between ${
              filters.category === "all" 
                ? "bg-ios-green/15 text-ios-green font-bold" 
                : "text-ios-label hover:bg-ios-bg3/60"
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] text-ios-label3">{totalResults}</span>
          </button>
          {SCRAP_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.id, subCategory: "all" })}
              className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                filters.category === cat.id 
                  ? "bg-ios-green/15 text-ios-green font-bold" 
                  : "text-ios-label hover:bg-ios-bg3/60"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-ios-label3">{cat.subcategories.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Select */}
      {selectedCatObj && (
        <div>
          <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider mb-2">
            Grade / Spec ({selectedCatObj.name})
          </label>
          <select
            value={filters.subCategory}
            onChange={(e) => setFilters({ ...filters, subCategory: e.target.value })}
            className="w-full text-xs font-medium px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] border border-transparent focus:outline-none focus:ring-2 focus:ring-ios-blue/40"
          >
            <option value="all">All Grades in {selectedCatObj.name}</option>
            {selectedCatObj.subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Mandi Region */}
      <div>
        <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider mb-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-ios-label3" />
          <span>Mandi Region</span>
        </label>
        <select
          value={filters.mandi}
          onChange={(e) => setFilters({ ...filters, mandi: e.target.value })}
          className="w-full text-xs font-medium px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] border border-transparent focus:outline-none focus:ring-2 focus:ring-ios-blue/40"
        >
          <option value="all">All Delhi NCR Mandis</option>
          {MAJOR_MANDIS.map((m, idx) => (
            <option key={idx} value={m.city}>{m.city} ({m.state})</option>
          ))}
        </select>
      </div>

      {/* Verification Toggles */}
      <div className="pt-2 border-t border-ios-separator/15 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ios-label">GSTIN Verified Sellers</span>
          <IOSToggle
            checked={filters.gstinOnly}
            onChange={(val) => setFilters({ ...filters, gstinOnly: val })}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ios-label">Ready in Yard (In Stock)</span>
          <IOSToggle
            checked={filters.inStockOnly}
            onChange={(val) => setFilters({ ...filters, inStockOnly: val })}
          />
        </div>
      </div>

    </div>
  );
};
