import React, { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Scale, 
  Building, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  Phone, 
  Share2, 
  AlertTriangle,
  FileText
} from "lucide-react";
import { TrustBadge } from "../components/common/TrustBadge";
import { PriceDisclaimer } from "../components/common/PriceDisclaimer";
import { LISTING_STATES } from "../data/categories";

export const ListingDetailPage = ({ listing, onBack, onOpenOrderModal }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!listing) return null;

  const photos = listing.photos?.length ? listing.photos : [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80"
  ];

  const isAvailable = listing.status === LISTING_STATES.AVAILABLE && listing.quantityAvailable > 0;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Listings Catalog
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? "Link Copied!" : "Share Lot"}
            </button>
          </div>
        </div>

        {/* Main Listing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Photo Gallery & Specs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Gallery Main Photo */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative h-80 sm:h-96 w-full bg-slate-900">
                <img
                  src={photos[selectedPhotoIndex]}
                  alt={listing.subCategoryName || listing.subCategory}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur text-white px-3 py-1 rounded-full border border-slate-700">
                    {listing.category?.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold bg-emerald-500 text-white px-3 py-1 rounded-full">
                    {listing.grade || "Standard Grade"}
                  </span>
                </div>
              </div>

              {/* Thumbnails if multiple */}
              {photos.length > 1 && (
                <div className="p-3 bg-slate-50 flex gap-2 overflow-x-auto border-t border-slate-100">
                  {photos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                        selectedPhotoIndex === idx ? "border-emerald-600 shadow" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Material Specifications & Quality Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Material Specifications & Inspection Details
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Category</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 capitalize">
                    {listing.category?.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Standard Grade</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5">
                    {listing.grade}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Min Order Size</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5">
                    {listing.minOrderQuantity || 1} {listing.unit}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">GST Status</span>
                  <span className="font-bold text-emerald-700 text-sm mt-0.5">
                    {listing.gstApplicable ? "18% GST Extra (Input Credit)" : "GST Included"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Weighbridge Proof</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5">
                    Mandatory at Gate
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Inspection Mode</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5">
                    Yard Visit Allowed
                  </span>
                </div>
              </div>

              {/* Vendor Description */}
              {listing.description && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-700 mb-1">Vendor Lot Notes</h4>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              )}
            </div>

            {/* Price Disclaimer */}
            <PriceDisclaimer region={listing.city || "Delhi-NCR"} />

          </div>

          {/* Right Column: Pricing, Ordering & Verified Seller Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Instant Pricing & Buy Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-5">
              
              <div>
                <span className="text-xs font-semibold text-slate-500">Live Spot Rate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{Number(listing.pricePerUnit).toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    / {listing.unit}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  ✓ Verified Spot Price (Zero Broker Markups)
                </p>
              </div>

              {/* Inventory Meter */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Available Stock:</span>
                  <span className="font-black text-slate-900 text-sm">
                    {Number(listing.quantityAvailable).toLocaleString('en-IN')} {listing.unit}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ 
                      width: `${Math.min(100, Math.max(15, (listing.quantityAvailable / (listing.totalInitialQuantity || listing.quantityAvailable || 1)) * 100))}%` 
                    }}
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Atomic inventory lock prevents overselling across concurrent buyers.
                </p>
              </div>

              {/* Order Button */}
              <button
                onClick={() => onOpenOrderModal(listing)}
                disabled={!isAvailable}
                className={`w-full py-4 rounded-xl text-sm font-black shadow-lg transition flex items-center justify-center gap-2 ${
                  isAvailable 
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Truck className="w-5 h-5" />
                <span>{isAvailable ? "Order Full or Partial Lot" : "Material Sold Out"}</span>
              </button>

              {/* Trust Safeguards */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Payment Protection:</strong> Funds authorized & held until acceptance.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Weighbridge SLA:</strong> Standard tare weight reconciliation.</span>
                </div>
              </div>

            </div>

            {/* Seller Accreditation Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Accredited Scrap Vendor Profile
              </h3>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {listing.vendorBusiness || listing.vendorName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Contact: {listing.vendorName}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg text-amber-900 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{listing.vendorRating || 4.9}</span>
                  <span className="text-slate-400 font-normal">({listing.vendorReviewsCount || 14})</span>
                </div>
              </div>

              {/* Approximate Location Notice (PRD Section 5.1 Privacy Rule) */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{listing.approxLocation || listing.city}, {listing.state || "India"}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Approximate yard area. Exact private address & weighbridge gate coordinates are securely unlocked upon order acceptance.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
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
