import React from "react";
import { 
  MapPin, 
  Star, 
  ArrowRight, 
  Building 
} from "lucide-react";
import { TrustBadge } from "../common/TrustBadge";
import { LISTING_STATES } from "../../data/categories";
import { IOSBadge } from "../ios/IOSBadge";
import { IOSButton } from "../ios/IOSButton";

export const ListingCard = ({ listing, onSelectListing }) => {
  const isAvailable = listing.status === LISTING_STATES.AVAILABLE && listing.quantityAvailable > 0;
  const isLowStock = isAvailable && listing.quantityAvailable <= (listing.totalInitialQuantity ? listing.totalInitialQuantity * 0.25 : 5);

  return (
    <div 
      onClick={() => onSelectListing(listing)}
      className="group bg-ios-bg2 rounded-[20px] border border-ios-separator/20 shadow-ios-card dark:shadow-ios-card-dark overflow-hidden flex flex-col justify-between cursor-pointer transition-all active:scale-[0.99]"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-44 sm:h-48 w-full bg-ios-bg3 overflow-hidden">
          <img
            src={listing.photos?.[0] || `/images/scrap-${listing.category === 'non_ferrous' ? 'copper' : listing.category === 'rubber_glass' ? 'tyres' : listing.category || 'loha'}.svg`}
            alt={listing.subCategoryName || listing.subCategory}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/images/scrap-loha.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Top Category & Stock Pills */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/20">
              {listing.category?.replace('_', ' ')}
            </span>
            
            {isAvailable ? (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isLowStock ? "bg-ios-orange text-white" : "bg-ios-green text-white"
              }`}>
                {isLowStock ? "⚡ High Demand" : "● Live Inventory"}
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ios-red text-white">
                Sold Out
              </span>
            )}
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <p className="text-[11px] font-semibold text-ios-green">
              {listing.grade || "Standard Commercial Grade"}
            </p>
            <h4 className="text-base font-black truncate text-white">
              {listing.subCategoryName || listing.subCategory}
            </h4>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4 space-y-3">
          
          {/* Price & Quantity Grid */}
          <div className="bg-ios-bg3/60 rounded-[14px] p-2.5 sm:p-3 border border-ios-separator/15 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-ios-label2 font-medium">Spot Price</p>
              <p className="text-base sm:text-lg font-black text-ios-label">
                ₹{Number(listing.pricePerUnit).toLocaleString('en-IN')}{" "}
                <span className="text-xs text-ios-label3 font-normal">/ {listing.unit}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-ios-label2 font-medium">Available</p>
              <p className="text-xs sm:text-sm font-bold text-ios-green">
                {Number(listing.quantityAvailable).toLocaleString('en-IN')} {listing.unit}
              </p>
            </div>
          </div>

          {/* Seller Profile & Location */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-ios-label truncate max-w-[170px]">
                <Building className="w-3.5 h-3.5 text-ios-label3 shrink-0" />
                <span className="truncate">{listing.vendorBusiness || listing.vendorName}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-ios-orange">
                <Star className="w-3 h-3 fill-ios-orange text-ios-orange" />
                <span>{listing.vendorRating || 4.9}</span>
                <span className="text-ios-label3 font-normal">({listing.vendorReviewsCount || 14})</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-ios-label2 text-[11px]">
              <MapPin className="w-3 h-3 text-ios-label3 shrink-0" />
              <span className="truncate">{listing.approxLocation || listing.city}, {listing.state || "Delhi"}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            <TrustBadge type="phone" verified={true} size="sm" />
            <TrustBadge type="gstin" verified={true} size="sm" />
            <TrustBadge type="business" verified={true} size="sm" />
          </div>

        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1">
        <IOSButton
          fullWidth
          size="sm"
          color={isAvailable ? "green" : "gray"}
          variant={isAvailable ? "filled" : "gray"}
          disabled={!isAvailable}
          onClick={(e) => {
            e.stopPropagation();
            onSelectListing(listing);
          }}
        >
          <span>{isAvailable ? "Inspect & Buy Material" : "Lot Settled (Sold)"}</span>
          {isAvailable && <ArrowRight className="w-3 h-3" />}
        </IOSButton>
      </div>

    </div>
  );
};
