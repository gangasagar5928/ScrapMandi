import React from "react";
import { ShieldCheck, AlertTriangle, Trash2, CheckCircle2, Eye, Ban } from "lucide-react";
import { LISTING_STATES } from "../../data/categories";

export const ListingModeration = ({ listings, onUpdateListing, onDeleteListing }) => {
  const toggleSuspend = (listing) => {
    const nextStatus = listing.status === LISTING_STATES.SUSPENDED ? LISTING_STATES.AVAILABLE : LISTING_STATES.SUSPENDED;
    onUpdateListing(listing.id, { status: nextStatus });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-900">
          Listing Moderation & Fraud Prevention Desk
        </h3>
        <span className="text-xs text-slate-500">{listings.length} total listings registered</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Lot ID & Title</th>
              <th className="py-3 px-4">Vendor & Mandi</th>
              <th className="py-3 px-4">Rate & Stock</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {listings.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4">
                  <p className="font-mono text-[10px] text-slate-400">#{item.id}</p>
                  <p className="font-bold text-slate-900">{item.subCategoryName || item.subCategory}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold">{item.grade}</span>
                </td>

                <td className="py-3 px-4">
                  <p className="font-bold text-slate-800">{item.vendorBusiness || item.vendorName}</p>
                  <p className="text-[10px] text-slate-400">{item.approxLocation || item.city}</p>
                </td>

                <td className="py-3 px-4">
                  <p className="font-bold text-slate-900">₹{item.pricePerUnit}/{item.unit}</p>
                  <p className="text-[10px] text-slate-500">{item.quantityAvailable} {item.unit} available</p>
                </td>

                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === LISTING_STATES.AVAILABLE 
                      ? "bg-emerald-100 text-emerald-800" 
                      : item.status === LISTING_STATES.SUSPENDED 
                        ? "bg-rose-100 text-rose-800" 
                        : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => toggleSuspend(item)}
                      className={`p-1.5 rounded-lg text-xs font-bold transition ${
                        item.status === LISTING_STATES.SUSPENDED
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                      }`}
                      title={item.status === LISTING_STATES.SUSPENDED ? "Re-activate" : "Suspend Listing"}
                    >
                      {item.status === LISTING_STATES.SUSPENDED ? "Reactivate" : "Suspend"}
                    </button>
                    <button
                      onClick={() => onDeleteListing(item.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                      title="Permanently Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
