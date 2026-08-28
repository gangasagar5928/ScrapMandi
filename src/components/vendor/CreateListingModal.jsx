import React, { useState } from "react";
import { 
  PlusCircle, 
  Upload, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Info, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Modal } from "../common/Modal";
import { SCRAP_CATEGORIES, MAJOR_MANDIS } from "../../data/categories";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";

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
            <span>Standardized grade templates accelerate buyer PO generation.</span>
          </div>
          <span className="text-[10px] font-bold uppercase bg-emerald-200/80 text-emerald-950 px-2 py-0.5 rounded">
            PRD 60s Flow
          </span>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Scrap Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
            >
              {SCRAP_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name} ({cat.hindiName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Material Stream
            </label>
            <select
              value={subCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
            >
              {currentCatObj.subcategories.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 2: Grade Specification */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Grade / Purity Specification
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {currentSubObj.grades.map((g, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGrade(g)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition ${
                  grade === g 
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold" 
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
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
              Lot Quantity Available
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
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
            >
              {currentCatObj.units.map((u, idx) => (
                <option key={idx} value={u}>{u}</option>
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
              placeholder="38500"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-black text-emerald-700"
              required
            />
          </div>
        </div>

        {/* Step 4: Locations (Public vs Private isolation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Mandi Region / City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
            >
              {MAJOR_MANDIS.map((m, idx) => (
                <option key={idx} value={m.city}>{m.city} ({m.state})</option>
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
              placeholder="Focal Point Industrial Zone"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              required
            />
          </div>
        </div>

        {/* Private Fulfillment Address (PRD privacy mandate) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Private Yard Address (Locked until Order Acceptance)
          </label>
          <input
            type="text"
            value={privateAddress}
            onChange={(e) => setPrivateAddress(e.target.value)}
            placeholder="Plot 42-B, Industrial Focal Point, Gate #2 Weighbridge"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            required
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Material Yard Photo URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
            />
          </div>
        </div>

        {/* GST Toggle */}
        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={gstApplicable}
            onChange={(e) => setGstApplicable(e.target.checked)}
            className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
          />
          <span>18% GST Applicable (Input Tax Credit invoice will be generated)</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{loading ? "Publishing Lot..." : "Publish Scrap Lot to All Mandis"}</span>
        </button>

      </form>
    </Modal>
  );
};
