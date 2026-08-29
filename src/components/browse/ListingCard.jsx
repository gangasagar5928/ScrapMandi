import React from "react";
import { 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Package, 
  Building 
} from "lucide-react";
import { TrustBadge } from "../common/TrustBadge";
import { LISTING_STATES } from "../../data/categories";

export const ListingCard = ({ listing, onSelectListing }) => {
  const isAvailable = listing.status === LISTING_STATES.AVAILABLE && listing.quantityAvailable > 0;
  const isLowStock = isAvailable && listing.quantityAvailable <= (listing.totalInitialQuantity ? listing.totalInitialQuantity * 0.25 : 5);

  return (
    <div 
      onClick={() => onSelectListing(listing)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={listing.photos?.[0] || `/images/scrap-${listing.category === 'non_ferrous' ? 'copper' : listing.category === 'rubber_glass' ? 'tyres' : listing.category || 'loha'}.svg`}
            alt={listing.subCategoryName || listing.subCategory}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/images/scrap-loha.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          
          {/* Top category & stock pills */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur text-white px-2.5 py-1 rounded-full border border-slate-700">
              {listing.category?.replace('_', ' ')}
            </span>
            
            {isAvailable ? (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isLowStock ? "bg-amber-500 text-slate-950 animate-pulse" : "bg-emerald-500 text-white"
              }`}>
                {isLowStock ? "⚡ High Demand / Low Stock" : "● Live Inventory"}
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                Sold Out
              </span>
            )}
          </div>

          {/* Bottom title on image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-xs font-semibold text-emerald-300">
              {listing.grade || "Standard Commercial Grade"}
            </p>
            <h4 className="text-base font-black truncate">
              {listing.subCategoryName || listing.subCategory}
            </h4>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 space-y-3">
          
          {/* Price & Quantity Grid */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Spot Price</p>
              <p className="text-lg font-black text-slate-900">
                ₹{Number(listing.pricePerUnit).toLocaleString('en-IN')}{" "}
                <span className="text-xs text-slate-500 font-normal">/ {listing.unit}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-500 font-medium">Stock Available</p>
              <p className="text-sm font-bold text-emerald-700">
                {Number(listing.quantityAvailable).toLocaleString('en-IN')} {listing.unit}
              </p>
            </div>
          </div>

          {/* Seller Profile & Location */}
          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 truncate max-w-[170px]">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{listing.vendorBusiness || listing.vendorName}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{listing.vendorRating || 4.9}</span>
                <span className="text-slate-400 font-normal">({listing.vendorReviewsCount || 14})</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{listing.approxLocation || listing.city}, {listing.state || "India"}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-1 pt-1">
            <TrustBadge type="phone" verified={true} size="sm" />
            <TrustBadge type="gstin" verified={true} size="sm" />
            <TrustBadge type="business" verified={true} size="sm" />
          </div>

        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 pb-4 pt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectListing(listing);
          }}
          disabled={!isAvailable}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            isAvailable 
              ? "bg-slate-900 hover:bg-emerald-600 text-white shadow-sm" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <span>{isAvailable ? "Inspect & Buy Material" : "Lot Settled (Sold)"}</span>
          {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>

    </div>
  );
};
