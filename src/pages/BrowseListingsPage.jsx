import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Layers, AlertCircle, PlusCircle, X } from "lucide-react";
import { ListingFilterSidebar } from "../components/browse/ListingFilterSidebar";
import { ListingCard } from "../components/browse/ListingCard";
import { PriceDisclaimer } from "../components/common/PriceDisclaimer";
import { useMarketplace } from "../context/MarketplaceContext";
import { IOSButton } from "../components/ios/IOSButton";

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
    <div className="min-h-screen bg-ios-bg text-ios-label py-6 sm:py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* iOS Large Title Header */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-ios-label tracking-tight">
                Delhi NCR Scrap Lots
              </h1>
              <p className="text-xs sm:text-sm text-ios-label2 mt-0.5">
                Spot scrap available in Mayapuri, Mundka, Bawana, Wazirpur, and Okhla yards.
              </p>
            </div>

            <IOSButton
              color="green"
              variant="filled"
              onClick={onOpenCreateListing}
              icon={PlusCircle}
              className="self-start md:self-auto"
            >
              Post Yard Lot (Sell)
            </IOSButton>
          </div>

          <PriceDisclaimer 
            sampleSize={filteredListings.length > 0 ? filteredListings.length : 24} 
            region={filters.mandi === "all" ? "Delhi NCR Mandis" : filters.mandi} 
          />
        </div>

        {/* iOS Native Search & Sort Toolbar */}
        <div className="bg-ios-bg2 rounded-[16px] border border-ios-separator/20 p-3 mb-6 shadow-ios-card dark:shadow-ios-card-dark flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* iOS Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-ios-gray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search grade, scrap type, yard..."
              className="w-full pl-9 pr-8 py-2 bg-ios-bg3/70 rounded-[10px] text-xs sm:text-sm text-ios-label placeholder:text-ios-label3 focus:outline-none focus:ring-2 focus:ring-ios-blue/40 border border-transparent transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ios-label3 hover:text-ios-label p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Mobile Filter Sheet Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-ios-bg3 text-xs font-semibold text-ios-label"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-ios-label3" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-ios-bg3 text-ios-label text-xs font-semibold py-2 px-3 rounded-[10px] border border-transparent focus:outline-none focus:ring-2 focus:ring-ios-blue/40 cursor-pointer"
              >
                <option value="newest">Sort: Newest Listings</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="qty_desc">Quantity: Largest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block md:col-span-1">
            <ListingFilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Listings Card Grid */}
          <div className="md:col-span-3 space-y-4">
            
            {/* Active Filters Summary Header */}
            <div className="flex items-center justify-between text-xs text-ios-label2 px-1">
              <p>
                Showing <strong className="text-ios-label">{filteredListings.length}</strong> available lots
                {filters.category !== "all" && <span> in <strong className="text-ios-green capitalize">{filters.category.replace('_', ' ')}</strong></span>}
                {filters.mandi !== "all" && <span> ({filters.mandi})</span>}
              </p>
              
              {(filters.category !== "all" || filters.mandi !== "all" || filters.subCategory !== "all" || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="text-ios-blue hover:opacity-75 font-semibold text-xs cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredListings.length === 0 ? (
              <div className="bg-ios-bg2 rounded-[20px] border border-ios-separator/20 p-8 sm:p-12 text-center space-y-3 shadow-ios-card dark:shadow-ios-card-dark">
                <div className="w-12 h-12 rounded-full bg-ios-orange/15 text-ios-orange mx-auto flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-ios-label">No matching scrap lots found</h3>
                <p className="text-xs text-ios-label2 max-w-md mx-auto">
                  Try clearing your search query, choosing all categories, or removing the mandi region filter.
                </p>
                <div className="pt-2">
                  <IOSButton
                    variant="tinted"
                    color="blue"
                    onClick={resetFilters}
                  >
                    Reset All Filters
                  </IOSButton>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredListings.map(listing => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onSelectListing={onSelectListing}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end md:hidden">
          <div 
            className="fixed inset-0 bg-black/40 dark:bg-black/60 transition-opacity" 
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-ios-bg h-full p-4 overflow-y-auto z-10 space-y-4 animate-slide-left">
            <div className="flex items-center justify-between border-b border-ios-separator/20 pb-3">
              <h3 className="font-bold text-ios-label text-base">Filter Lots</h3>
              <button 
                onClick={() => setMobileFilterOpen(false)}
                className="text-ios-blue font-semibold text-sm"
              >
                Done
              </button>
            </div>
            <ListingFilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
