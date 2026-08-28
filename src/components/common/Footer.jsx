import React from "react";
import { Building2, ShieldCheck, FileCheck, Phone, Mail, Award, Lock, ExternalLink } from "lucide-react";

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Scrap<span className="text-emerald-400">Mandi</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier digital B2B marketplace for recyclable scrap materials, connecting accredited yards, steel mills, recyclers, and foundries across industrial hubs.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> GSTIN Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4" /> Secure Split Payouts
              </span>
            </div>
          </div>

          {/* Col 2: Marketplace Segments */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Scrap Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">HMS 1 & 2 (Heavy Melting Steel)</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">Copper Armature & Bright Wire</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">Aluminium Extrusion 6063 & Tense</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">OCC Corrugated Cardboard</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">Rigid PET, HDPE & PVC Polymers</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">E-Waste & Industrial Batteries</button></li>
            </ul>
          </div>

          {/* Col 3: Key Mandi Hubs */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Active Mandi Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300 font-medium">Mandi Gobindgarh:</span> Secondary Steel Hub</li>
              <li><span className="text-slate-300 font-medium">Delhi-NCR:</span> Multi-Grade Aggregation</li>
              <li><span className="text-slate-300 font-medium">Alang / Bhavnagar:</span> Shipbreaking Plates</li>
              <li><span className="text-slate-300 font-medium">Mumbai / JNPT:</span> Import & Marine Scrap</li>
              <li><span className="text-slate-300 font-medium">Chennai & Pune:</span> Auto Cluster Metals</li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Platform & Trust
            </h4>
            <div className="space-y-2 text-xs">
              <button onClick={() => setActiveTab("indicative-prices")} className="block text-left hover:text-white transition">
                Live Indicative Mandi Benchmark
              </button>
              <button onClick={() => setActiveTab("whatsapp-alerts")} className="block text-left hover:text-white transition">
                WhatsApp Price Alerts Opt-In
              </button>
              <button onClick={() => setActiveTab("admin-dashboard")} className="block text-left hover:text-white transition">
                Dispute & Audit Console
              </button>
              <p className="pt-2 text-[11px] text-slate-500">
                Support: <span className="text-slate-300">desk@scrapmandi.com</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Helpline: <span className="text-slate-300">+91 (011) 4982-MANDI</span>
              </p>
            </div>
          </div>

        </div>

        {/* PRD Mandated Transparency & Regulatory Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl my-6">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Pricing Transparency & Regulatory Disclaimer (PRD v1.1 Rule):
          </p>
          <p>
            ScrapMandi operates as a technology marketplace and information intermediary. ScrapMandi does not set, mandate, or guarantee platform-fixed market prices. Any benchmark rates shown are indicative statistical averages computed from qualifying listings and transaction logs within specified regions. Verified weighbridge slips and mutual physical inspection at vendor yard or delivery point govern final settlement.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScrapMandi Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for India's Recyclers</span>
            <span>•</span>
            <span>ISO 9001:2015 Compliant Processes</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
