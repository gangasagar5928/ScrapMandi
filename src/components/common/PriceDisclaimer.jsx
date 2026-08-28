import React from "react";
import { Info, AlertCircle, Clock, MapPin, BarChart2 } from "lucide-react";

export const PriceDisclaimer = ({ 
  sampleSize = 42, 
  region = "Delhi-NCR & Mandi Gobindgarh", 
  timestamp = new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
}) => {
  return (
    <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900">
            Indicative Benchmark Price (Not an Official Fixed Mandate)
          </p>
          <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
            Rates are computed statistics from {sampleSize} qualifying spot listings in {region}. Actual transaction rates depend on physical moisture/impurity tests and mutual settlement.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-amber-900/80 font-medium shrink-0 bg-amber-100/60 px-2.5 py-1.5 rounded-lg border border-amber-200">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          {timestamp}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <BarChart2 className="w-3.5 h-3.5 text-amber-700" />
          N={sampleSize} Listings
        </span>
      </div>
    </div>
  );
};
