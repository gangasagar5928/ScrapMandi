import React, { useState } from "react";
import { 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Camera, 
  MapPin, 
  Lock, 
  AlertCircle, 
  TrendingUp, 
  FileText,
  Image as ImageIcon,
  Check
} from "lucide-react";
import { Modal } from "../common/Modal";
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
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80");
  const [description, setDescription] = useState("");
  const [gstApplicable, setGstApplicable] = useState(true);
  
  // Image Compression & Upload state
  const [compressing, setCompressing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentCatObj = SCRAP_CATEGORIES.find(c => c.id === category) || SCRAP_CATEGORIES[0];
  const currentSubObj = currentCatObj.subcategories.find(s => s.id === subCategory) || currentCatObj.subcategories[0];

  // Auto-switch subcategory and unit when category changes
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

  const handleSubCategoryChange = (newSubId) => {
    setSubCategory(newSubId);
    const subObj = currentCatObj.subcategories.find(s => s.id === newSubId);
    if (subObj) {
      setGrade(subObj.grades[0] || "Standard Commercial");
      setUnit(subObj.unit || currentCatObj.defaultUnit);
      setPricePerUnit(String(subObj.baseBenchmark || 100));
    }
  };

  // Handle Photo Picker & Instant Client-Side Compression
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    setError("");

    try {
      // 1. Compress in browser (e.g. 5MB -> ~180KB)
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setCompressionInfo({
        originalSize: (compressed.originalSize / 1024 / 1024).toFixed(2),
        compressedSize: (compressed.compressedSize / 1024).toFixed(0),
        savingsPercent: Math.round((1 - compressed.compressedSize / compressed.originalSize) * 100)
      });

      // Set local dataUrl for instant preview
      setPhotoUrl(compressed.dataUrl);

      // 2. Upload compressed blob to Firebase Storage (or keep dataUrl on local dev)
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
      setError("Please enter a valid quantity available");
      return;
    }
    if (!pricePerUnit || Number(pricePerUnit) <= 0) {
      setError("Please enter a valid price per unit");
      return;
    }

    setLoading(true);
    try {
      const newListing = await createListing({
        category,
        subCategory,
        subCategoryName: currentSubObj?.name || subCategory,
        grade,
        quantityAvailable: Number(quantityAvailable),
        unit,
        pricePerUnit: Number(pricePerUnit),
        city,
        approxLocation,
        privateAddress,
        photos: [photoUrl],
        description,
        gstApplicable,
        minOrderQuantity: 1
      });

      onSuccess(newListing);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to publish scrap listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚡ 60-Sec Fast Scrap Post (Vendor)" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Quick Time Tip */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Rapid Delhi Post:</strong> Live instantly across Mayapuri, Mundka & Bawana buyer feeds.</span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
            ~60s SLA
          </span>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Scrap Stream
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            >
              {SCRAP_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.hindiName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subcategory / Grade
            </label>
            <select
              value={subCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            >
              {currentCatObj.subcategories.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 2: Specific Grade Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Standard Specification
          </label>
          <div className="flex flex-wrap gap-2">
            {currentSubObj?.grades?.map((g, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGrade(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  grade === g 
                    ? "bg-slate-900 text-white border-slate-900 font-bold" 
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Quantity & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Quantity Available
            </label>
            <input
              type="number"
              min={1}
              value={quantityAvailable}
              onChange={(e) => setQuantityAvailable(e.target.value)}
              placeholder="25"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Trading Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            >
              {currentCatObj.units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Spot Price (₹ / {unit})
            </label>
            <input
              type="number"
              min={1}
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              placeholder="38800"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-black text-emerald-700"
              required
            />
          </div>
        </div>

        {/* Step 4: Locations (Public vs Private isolation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Delhi Mandi Hub
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
            >
              {MAJOR_MANDIS.map((m, idx) => (
                <option key={idx} value={m.city}>{m.city} ({m.region})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Public Approx Location
            </label>
            <input
              type="text"
              value={approxLocation}
              onChange={(e) => setApproxLocation(e.target.value)}
              placeholder="Mayapuri Phase 2, New Delhi"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              required
            />
          </div>
        </div>

        {/* Private Fulfillment Address (PRD privacy mandate) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Private Yard Gate Address (Hidden until payment confirmed)
          </label>
          <input
            type="text"
            value={privateAddress}
            onChange={(e) => setPrivateAddress(e.target.value)}
            placeholder="Plot C-42/1, Mayapuri Industrial Area Phase 2, Gate #2 Dharam Kanta"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            required
          />
        </div>

        {/* Photo Upload with Client-Side Canvas Compression */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Material Yard Photo (Compressed On-Device)
            </label>
            {compressionInfo && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ✓ {compressionInfo.originalSize}MB → {compressionInfo.compressedSize}KB ({compressionInfo.savingsPercent}% saved)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* File Upload Dropzone Button */}
            <div className="sm:col-span-8">
              <label className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-emerald-50/40 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl cursor-pointer transition text-xs font-semibold text-slate-700">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>{compressing ? "Compressing on device..." : "Upload / Take Yard Photo"}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  className="hidden" 
                  disabled={compressing}
                />
              </label>
            </div>

            {/* Thumbnail Preview */}
            <div className="sm:col-span-4 flex items-center gap-2">
              <img 
                src={photoUrl} 
                alt="Preview" 
                className="w-12 h-12 rounded-xl object-cover border border-slate-300 shadow-sm" 
              />
              <span className="text-[11px] text-slate-500">Preview Ready</span>
            </div>

          </div>
        </div>

        {/* Step 6: Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Lot Notes / Loading Details (Optional)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Girder cutting > 8mm. No slag or mud. Direct crane loading available at Mayapuri yard."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        {/* GST Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-900">GST Invoice Applicable (18% RCM/Tax)</p>
            <p className="text-[11px] text-slate-500">Standard GST tax invoice issued upon settlement</p>
          </div>
          <input
            type="checkbox"
            checked={gstApplicable}
            onChange={(e) => setGstApplicable(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || compressing}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
        >
          {loading ? "Publishing Lot..." : "⚡ Publish Scrap Lot on Delhi Mandi"}
        </button>

      </form>
    </Modal>
  );
};
