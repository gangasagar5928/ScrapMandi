import React, { useState } from "react";
import { 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Layers, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { LISTING_STATES } from "../../data/categories";

export const VendorListingsTable = ({ listings, onUpdateListing, onDeleteListing, onSelectListing }) => {
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editQty, setEditQty] = useState("");

  const startEdit = (listing) => {
    setEditingId(listing.id);
    setEditPrice(String(listing.pricePerUnit));
    setEditQty(String(listing.quantityAvailable));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (listingId) => {
    if (Number(editPrice) <= 0 || Number(editQty) < 0) return;
    onUpdateListing(listingId, {
      pricePerUnit: Number(editPrice),
      quantityAvailable: Number(editQty),
      status: Number(editQty) > 0 ? LISTING_STATES.AVAILABLE : LISTING_STATES.SOLD
    });
    setEditingId(null);
  };

  if (!listings || listings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <Package className="w-10 h-10 text-slate-300 mx-auto" />
        <h4 className="font-bold text-slate-800 text-sm">No Active Listings in Yard</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Post your first recyclable lot using the fast 60-second wizard to start receiving mill POs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Lot Material & Grade</th>
              <th className="py-3.5 px-4">Spot Rate</th>
              <th className="py-3.5 px-4">Stock Available</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {listings.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  {/* Title & Grade */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.photos?.[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80"}
                        alt={item.subCategoryName || item.subCategory}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">
                          {item.subCategoryName || item.subCategory}
                        </p>
                        <p className="text-[11px] text-emerald-700 font-semibold">
                          {item.grade}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.approxLocation || item.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Spot Rate */}
                  <td className="py-3.5 px-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold">₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-20 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
                        />
                      </div>
                    ) : (
                      <span className="font-bold text-slate-900 text-sm">
                        ₹{Number(item.pricePerUnit).toLocaleString('en-IN')}{" "}
                        <span className="text-[10px] text-slate-500 font-normal">/{item.unit}</span>
                      </span>
                    )}
                  </td>

                  {/* Quantity */}
                  <td className="py-3.5 px-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editQty}
                          onChange={(e) => setEditQty(e.target.value)}
                          className="w-20 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
                        />
                        <span className="text-[10px] text-slate-500">{item.unit}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-slate-800">
                        {Number(item.quantityAvailable).toLocaleString('en-IN')} {item.unit}
                      </span>
                    )}
                  </td>

                  {/* Status Pill */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === LISTING_STATES.AVAILABLE 
                        ? "bg-emerald-100 text-emerald-800" 
                        : item.status === LISTING_STATES.SOLD 
                          ? "bg-slate-100 text-slate-600" 
                          : "bg-amber-100 text-amber-800"
                    }`}>
                      {item.status || "Available"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                          title="Save Changes"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                          title="Quick Edit Rate/Qty"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectListing(item)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                          title="View Public View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteListing(item.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
