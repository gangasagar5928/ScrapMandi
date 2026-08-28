import React from "react";
import { CheckCircle2, ShieldCheck, Award, PhoneCheck, Sparkles } from "lucide-react";

export const TrustBadge = ({ type = "gstin", verified = true, count = 0, size = "sm" }) => {
  const sizeClasses = size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  if (type === "phone") {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${
        verified ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-slate-50 text-slate-400 border-slate-200"
      } ${sizeClasses}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
        <span>Phone Verified</span>
      </span>
    );
  }

  if (type === "gstin") {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${
        verified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-400 border-slate-200"
      } ${sizeClasses}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>GSTIN Verified</span>
      </span>
    );
  }

  if (type === "business") {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${
        verified ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-slate-50 text-slate-400 border-slate-200"
      } ${sizeClasses}`}>
        <Award className="w-3.5 h-3.5 text-purple-600" />
        <span>Yard Audited</span>
      </span>
    );
  }

  if (type === "history") {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-medium border bg-amber-50 text-amber-800 border-amber-200 ${sizeClasses}`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>{count}+ Deals Settled</span>
      </span>
    );
  }

  return null;
};
