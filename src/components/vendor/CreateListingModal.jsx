import React, { useState } from "react";
import { 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Lock, 
  AlertCircle, 
  Image as ImageIcon 
} from "lucide-react";
import { IOSSheet } from "../ios/IOSSheet";
import { IOSButton } from "../ios/IOSButton";
import { IOSToggle } from "../ios/IOSToggle";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../../data/categories";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { compressImage, uploadListingPhoto } from "../../utils/imageCompressor";

export const CreateListingModal = ({ isOpen, onClose, onSuccess }) => {
  const { userProfile } = useAuth();
  const { createListing } = useMarketplace();

  const [category, setCategory] = useState("ferrous");
  const [subCategory, setSubCategory] = useState("hms1");
  const [grade, setGrade] = useState("Heavy Structure 80:20");
  const [quantityAvailable, setQuantityAvailable] = useState("25");
  const [unit, setUnit] = useState("tonne");
  const [pricePerUnit, setPricePerUnit] = useState("38800");
  const [city, setCity] = useState(userProfile?.city || "Mayapuri Scrap Yard");
  const [approxLocation, setApproxLocation] = useState(userProfile?.approxLocation || "Mayapuri Phase 2, New Delhi");
  const [privateAddress, setPrivateAddress] = useState(userProfile?.privateAddress || "Plot C-42/1, Mayapuri Phase 2");
  const [photoUrl, setPhotoUrl] = useState("/images/scrap-loha.svg");
  const [description, setDescription] = useState("");
  const [gstApplicable, setGstApplicable] = useState(true);
  
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentCatObj = SCRAP_CATEGORIES.find(c => c.id === category) || SCRAP_CATEGORIES[0];
  const currentSubObj = currentCatObj.subcategories.find(s => s.id === subCategory) || currentCatObj.subcategories[0];

  const handleCategoryChange = (newCatId) => {
    setCategory(newCatId);
    const catObj = SCRAP_CATEGORIES.find(c => c.id === newCatId);
    if (catObj && catObj.subcategories.length > 0) {
      const firstSub = catObj.subcategories[0];
      setSubCategory(firstSub.id);
      setGrade(firstSub.grades[0] || "Standard Commercial");
      setUnit(firstSub.unit || catObj.defaultUnit);
      setPricePerUnit(String(firstSub.baseBenchmark || 100));
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    setError("");

    try {
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setPhotoUrl(compressed.dataUrl);

      try {
        const storageUrl = await uploadListingPhoto(compressed.blob, compressed.fileName);
        setPhotoUrl(storageUrl);
      } catch (storageErr) {
        console.warn("Storage upload note (using compressed local preview):", storageErr.message);
      }
    } catch (err) {
      setError("Failed to compress image: " + err.message);
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!quantityAvailable || Number(quantityAvailable) <= 0) {
      setError("Please enter a valid lot quantity");
      return;
    }

    if (!pricePerUnit || Number(pricePerUnit) <= 0) {
      setError("Please enter a valid rate per unit");
      return;
    }

    setLoading(true);

    try {
      await createListing({
        category,
        subCategory,
        subCategoryName: currentSubObj.name,
        grade,
        quantityAvailable: Number(quantityAvailable),
        totalInitialQuantity: Number(quantityAvailable),
        unit,
        pricePerUnit: Number(pricePerUnit),
        city,
        approxLocation,
        privateAddress,
        photos: [photoUrl],
        description,
        gstApplicable
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to post yard lot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IOSSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Post New Scrap Lot"
      subtitle="Mayapuri • Mundka • Bawana Yard Inventory"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {error && (
          <div className="p-3 bg-ios-red/15 border border-ios-red/30 rounded-[12px] text-xs text-ios-red flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Category & Subcategory Group */}
        <div className="p-3.5 bg-ios-bg2 rounded-[16px] border border-ios-separator/20 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
              Scrap Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-green/40 cursor-pointer"
            >
              {SCRAP_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
              Material Grade / Sub-Stream
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-green/40 cursor-pointer"
            >
              {currentCatObj.subcategories.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.specs || "Standard"})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price & Quantity Group */}
        <div className="p-3.5 bg-ios-bg2 rounded-[16px] border border-ios-separator/20 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                Available Stock ({unit})
              </label>
              <input
                type="number"
                value={quantityAvailable}
                onChange={(e) => setQuantityAvailable(e.target.value)}
                placeholder="25"
                className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-ios-green/40"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                Spot Rate (₹ / {unit})
              </label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="38800"
                className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-ios-green/40"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-ios-label">GST 18% Applicable</span>
            <IOSToggle
              checked={gstApplicable}
              onChange={setGstApplicable}
            />
          </div>
        </div>

        {/* Mandi Yard Location */}
        <div className="p-3.5 bg-ios-bg2 rounded-[16px] border border-ios-separator/20 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
              Mandi Region
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-green/40"
            >
              {MAJOR_MANDIS.map((m, idx) => (
                <option key={idx} value={m.city}>{m.city} ({m.region})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
              Public Yard Area (Buyer View)
            </label>
            <input
              type="text"
              value={approxLocation}
              onChange={(e) => setApproxLocation(e.target.value)}
              placeholder="e.g. Mayapuri Phase 2 Industrial Area"
              className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-green/40"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <IOSButton
            fullWidth
            size="lg"
            color="green"
            variant="filled"
            type="submit"
            disabled={loading || compressing}
          >
            {loading ? "Publishing Lot..." : "Publish Scrap Lot to Delhi Mandi"}
          </IOSButton>
        </div>

      </form>
    </IOSSheet>
  );
};
