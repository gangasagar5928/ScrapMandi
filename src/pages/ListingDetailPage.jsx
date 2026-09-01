import React, { useState } from "react";
import { 
  ChevronLeft, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Scale, 
  Building, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Share2, 
  FileText
} from "lucide-react";
import { TrustBadge } from "../components/common/TrustBadge";
import { PriceDisclaimer } from "../components/common/PriceDisclaimer";
import { LISTING_STATES } from "../data/categories";
import { IOSButton } from "../components/ios/IOSButton";
import { IOSBadge } from "../components/ios/IOSBadge";
import { IOSCard, IOSRow } from "../components/ios/IOSCard";

export const ListingDetailPage = ({ listing, onBack, onOpenOrderModal }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!listing) return null;

  const photos = listing.photos?.length ? listing.photos : [
    `/images/scrap-${listing.category === 'non_ferrous' ? 'copper' : listing.category === 'rubber_glass' ? 'tyres' : listing.category || 'loha'}.svg`
  ];

  const isAvailable = listing.status === LISTING_STATES.AVAILABLE && listing.quantityAvailable > 0;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label py-4 sm:py-8 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* iOS Navigation Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-ios-blue text-sm font-semibold active:opacity-60 transition cursor-pointer select-none"
          >
            <ChevronLeft className="w-5 h-5 -ml-1.5" />
            <span>Browse Lots</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ios-blue bg-ios-bg2 px-3 py-1.5 rounded-full border border-ios-separator/20 shadow-xs active:scale-95 transition cursor-pointer select-none"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>

        {/* Hero Gallery Card */}
        <div className="bg-ios-bg2 rounded-[20px] border border-ios-separator/20 overflow-hidden shadow-ios-card dark:shadow-ios-card-dark">
          <div className="relative h-64 sm:h-80 w-full bg-ios-bg3">
            <img
              src={photos[selectedPhotoIndex]}
              alt={listing.subCategoryName || listing.subCategory}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/images/scrap-loha.svg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                {listing.category?.replace('_', ' ')}
              </span>
              <IOSBadge color={isAvailable ? "green" : "red"} variant="filled">
                {isAvailable ? "● In Stock" : "Sold Out"}
              </IOSBadge>
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-white">
              <p className="text-xs font-semibold text-ios-green">
                {listing.grade || "Standard Grade"}
              </p>
              <h1 className="text-xl sm:text-2xl font-black truncate text-white">
                {listing.subCategoryName || listing.subCategory}
              </h1>
            </div>
          </div>

          {/* Thumbnails if multiple */}
          {photos.length > 1 && (
            <div className="p-3 bg-ios-bg3/50 flex gap-2 overflow-x-auto border-t border-ios-separator/15">
              {photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative w-14 h-14 rounded-[10px] overflow-hidden border-2 shrink-0 transition ${
                    selectedPhotoIndex === idx ? "border-ios-blue shadow" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Grouped Specs */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* iOS Grouped Specification List */}
            <IOSCard title="Material Specifications & Inspection">
              <IOSRow label="Category" value={listing.category?.replace('_', ' ')} />
              <IOSRow label="Standard Grade" value={listing.grade} />
              <IOSRow label="Min Order Quantity" value={`${listing.minOrderQuantity || 1} ${listing.unit}`} />
              <IOSRow label="GST Status" value={listing.gstApplicable ? "18% GST Extra" : "GST Included"} />
              <IOSRow label="Weighbridge Proof" value="Dharam Kanta Slip Mandatory" />
              <IOSRow label="Yard Inspection" value="Physical Visit Permitted" divider={false} />
            </IOSCard>

            {/* Lot Notes */}
            {listing.description && (
              <IOSCard title="Vendor Lot Notes">
                <div className="p-4 text-xs text-ios-label2 leading-relaxed">
                  {listing.description}
                </div>
              </IOSCard>
            )}

            {/* Price Disclaimer */}
            <PriceDisclaimer region={listing.city || "Delhi-NCR"} />
          </div>

          {/* Right Column: Pricing, Ordering & Verified Seller */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Price Box */}
            <div className="bg-ios-bg2 rounded-[20px] border border-ios-separator/20 p-5 space-y-4 shadow-ios-card dark:shadow-ios-card-dark">
              <div>
                <span className="text-xs font-semibold text-ios-label2">Live Spot Rate</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-ios-label">
                    ₹{Number(listing.pricePerUnit).toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-ios-label2">
                    / {listing.unit}
                  </span>
                </div>
                <p className="text-[11px] text-ios-green font-medium mt-0.5">
                  ✓ Verified Spot Price (Zero Dalal Commission)
                </p>
              </div>

              {/* Stock Meter */}
              <div className="p-3 rounded-[14px] bg-ios-bg3/60 border border-ios-separator/15 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ios-label2">Available Stock:</span>
                  <span className="font-bold text-ios-green">
                    {Number(listing.quantityAvailable).toLocaleString('en-IN')} {listing.unit}
                  </span>
                </div>
                <div className="w-full bg-ios-gray4/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-ios-green h-full rounded-full transition-all"
                    style={{ 
                      width: `${Math.min(100, Math.max(15, (listing.quantityAvailable / (listing.totalInitialQuantity || listing.quantityAvailable || 1)) * 100))}%` 
                    }}
                  />
                </div>
              </div>

              {/* Order Button */}
              <IOSButton
                fullWidth
                size="lg"
                color="green"
                variant="filled"
                disabled={!isAvailable}
                onClick={() => onOpenOrderModal(listing)}
                icon={Truck}
              >
                {isAvailable ? "Order Full or Partial Lot" : "Material Sold Out"}
              </IOSButton>

              {/* Trust Features */}
              <div className="space-y-2 pt-2 border-t border-ios-separator/15 text-xs text-ios-label2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-ios-green shrink-0" />
                  <span><strong>Payment Protection:</strong> Funds authorized & held in escrow.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-ios-green shrink-0" />
                  <span><strong>Weighbridge SLA:</strong> Electronic Dharam Kanta weight slip.</span>
                </div>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="bg-ios-bg2 rounded-[20px] border border-ios-separator/20 p-5 space-y-3.5 shadow-ios-card dark:shadow-ios-card-dark">
              <h3 className="text-[10px] font-bold text-ios-label3 uppercase tracking-wider">
                Accredited Scrap Vendor Profile
              </h3>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-ios-label">
                    {listing.vendorBusiness || listing.vendorName}
                  </h4>
                  <p className="text-xs text-ios-label2 mt-0.5">
                    Contact: {listing.vendorName}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-ios-orange/15 px-2 py-0.5 rounded-full text-ios-orange text-xs font-bold">
                  <Star className="w-3 h-3 fill-ios-orange text-ios-orange" />
                  <span>{listing.vendorRating || 4.9}</span>
                </div>
              </div>

              {/* Location Privacy Rule */}
              <div className="p-3 rounded-[12px] bg-ios-bg3/60 border border-ios-separator/15 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-ios-label">
                  <MapPin className="w-3.5 h-3.5 text-ios-green" />
                  <span>{listing.approxLocation || listing.city}, {listing.state || "Delhi"}</span>
                </div>
                <p className="text-[10px] text-ios-label3">
                  Approximate yard area. Exact private gate coordinates unlocked after order authorization.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                <TrustBadge type="phone" verified={true} size="md" />
                <TrustBadge type="gstin" verified={true} size="md" />
                <TrustBadge type="business" verified={true} size="md" />
                <TrustBadge type="history" count={28} size="md" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
