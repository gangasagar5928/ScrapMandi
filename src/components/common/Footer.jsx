import React from "react";
import { Building2, ShieldCheck, MapPin, Phone, Mail, Award, Lock, Scale } from "lucide-react";

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="ScrapMandi" 
                className="w-12 h-12 object-contain drop-shadow-md" 
              />
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  Scrap<span className="text-emerald-400">Mandi</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold tracking-wider uppercase block">
                  Sell • Buy • Recycle
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Delhi NCR's dedicated B2B scrap exchange connecting local scrap yards, kabaris, recyclers, and secondary steel re-rolling mills. Direct mandi rates, zero dalal markups, and verified Dharam Kanta slips.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> GSTIN Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Scale className="w-4 h-4" /> Kanta Slip Verified
              </span>
            </div>
          </div>

          {/* Col 2: Scrap Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Delhi Scrap Streams
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">HMS 1 & 2 Structure Scrap</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">Copper Armature & 99% Wire</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">Aluminium Section 6063 & Tense</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">OCC Gatta & Factory Bales</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">PET Bottle Flakes & HDPE Dana</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-white transition">Motherboard & Inverter Battery</button></li>
            </ul>
          </div>

          {/* Col 3: Key Delhi NCR Scrap Hubs */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Covered Mandis & Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-200 font-semibold">Mayapuri Scrap Yard:</span> Auto & Heavy Scrap</li>
              <li><span className="text-slate-200 font-semibold">Mundka Metal Hub:</span> Heavy Iron & Machinery</li>
              <li><span className="text-slate-200 font-semibold">Bawana & Narela:</span> Plastic & Polymer Dana</li>
              <li><span className="text-slate-200 font-semibold">Wazirpur:</span> Stainless Steel & Bartan Mix</li>
              <li><span className="text-slate-200 font-semibold">Okhla & Naraina:</span> Non-Ferrous & Cable Scrap</li>
              <li><span className="text-slate-200 font-semibold">Faridabad & Sahibabad:</span> Foundry Scrap</li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Daily Mandi Rates
            </h4>
            <div className="space-y-2 text-xs">
              <button onClick={() => setActiveTab("indicative-prices")} className="block text-left hover:text-white transition">
                Today's Delhi Mandi Bhav
              </button>
              <button onClick={() => setActiveTab("whatsapp-alerts")} className="block text-left hover:text-white transition">
                WhatsApp Morning Mandi Alerts
              </button>
              <button onClick={() => setActiveTab("admin-dashboard")} className="block text-left hover:text-white transition">
                Dispute & Kanta Audit Desk
              </button>
              <p className="pt-2 text-[11px] text-slate-500">
                Helpline: <span className="text-slate-300">+91 (011) 4982-MANDI</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Desk: <span className="text-slate-300">desk@scrapmandi.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* PRD Mandated Transparency & Regulatory Disclaimer */}
        <div className="py-5 border-b border-slate-800/80 text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 p-4 rounded-xl my-6">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Delhi NCR Mandi Rate Transparency Note:
          </p>
          <p>
            ScrapMandi operates as a digital trade facilitation platform for Delhi NCR scrap dealers and yard owners. Benchmark rates are calculated averages from spot lots across Mayapuri, Mundka, Bawana, and Wazirpur. Final transaction value is settled on actual electronic Dharam Kanta weighbridge slips and mutual grade inspection at the yard gate.
          </p>
        </div>

        {/* Bottom Bar - Clean without copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live Spot Scrap Network • Delhi-NCR Region</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Mayapuri</span>
            <span>•</span>
            <span>Mundka</span>
            <span>•</span>
            <span>Bawana</span>
            <span>•</span>
            <span>Wazirpur</span>
            <span>•</span>
            <span>Okhla</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
