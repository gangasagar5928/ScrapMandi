import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Layers, AlertCircle, PlusCircle } from "lucide-react";
import { ListingFilterSidebar } from "../components/browse/ListingFilterSidebar";
import { ListingCard } from "../components/browse/ListingCard";
import { PriceDisclaimer } from "../components/common/PriceDisclaimer";
import { useMarketplace } from "../context/MarketplaceContext";

export const BrowseListingsPage = ({ 
  initialCategory = "all", 
  onSelectListing, 
  onOpenCreateListing 
}) => {
  const { listings } = useMarketplace();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: initialCategory,
    subCategory: "all",
    mandi: "all",
    gstinOnly: false,
    inStockOnly: false
  });

  const resetFilters = () => {
    setFilters({
      category: "all",
      subCategory: "all",
      mandi: "all",
      gstinOnly: false,
      inStockOnly: false
    });
    setSearchTerm("");
  };

  // Filter & Search Engine with normalized tokens
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Category filter
      if (filters.category !== "all" && item.category !== filters.category) return false;
      // Subcategory filter
      if (filters.subCategory !== "all" && item.subCategory !== filters.subCategory) return false;
      // Mandi region filter
      if (filters.mandi !== "all" && !item.city?.toLowerCase().includes(filters.mandi.toLowerCase()) && !item.approxLocation?.toLowerCase().includes(filters.mandi.toLowerCase())) {
        return false;
      }
      // In stock filter
      if (filters.inStockOnly && item.quantityAvailable <= 0) return false;

      // Token Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const searchPool = `${item.subCategoryName || ""} ${item.subCategory || ""} ${item.category || ""} ${item.grade || ""} ${item.city || ""} ${item.vendorBusiness || ""}`.toLowerCase();
        if (!searchPool.includes(query)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === "price_desc") return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === "qty_desc") return b.quantityAvailable - a.quantityAvailable;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); // newest
    });
  }, [listings, filters, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Disclaimer */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Live Scrap Yard Listings
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Accredited spot material ready for inspection and mill dispatch across India.
              </p>
            </div>

            <button
              onClick={onOpenCreateListing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition self-start md:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Post Scrap Lot (Vendor)
            </button>
          </div>

          <PriceDisclaimer 
            sampleSize={filteredListings.length > 0 ? filteredListings.length : 18} 
            region={filters.mandi === "all" ? "All Major Mandis" : filters.mandi} 
          />
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search bar input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by grade (HMS 1, Copper, PET, OCC, Zinc)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Sort & Mobile filter button */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="sm:hidden px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters ({filteredListings.length})
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:bg-white focus:outline-none"
              >
                <option value="newest">Newest Listings First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="qty_desc">Highest Stock Quantity</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Content Layout (Sidebar + Cards Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <ListingFilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              totalResults={filteredListings.length}
            />
          </div>

          {/* Mobile Filters Dropdown */}
          {mobileFilterOpen && (
            <div className="lg:hidden col-span-12">
              <ListingFilterSidebar
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                totalResults={filteredListings.length}
              />
            </div>
          )}

          {/* Right Listings Grid */}
          <div className="lg:col-span-9">
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Scrap Lots Match Criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing search filters or changing region. You can also set an automated WhatsApp price alert for this grade.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow transition hover:bg-emerald-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredListings.map((item) => (
                  <ListingCard
                    key={item.id}
                    listing={item}
                    onSelectListing={onSelectListing}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
