import React from "react";
import { ShieldCheck, Scale, Award } from "lucide-react";

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-ios-bg2 text-ios-label2 text-xs border-t border-ios-separator/20 pt-10 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-ios-separator/15">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="ScrapMandi" 
                className="w-10 h-10 object-contain" 
              />
              <div>
                <span className="text-lg font-black tracking-tight text-ios-label block">
                  Scrap<span className="text-ios-green">Mandi</span>
                </span>
                <span className="text-[10px] text-ios-green font-bold tracking-wider uppercase block">
                  Sell • Buy • Recycle
                </span>
              </div>
            </div>
            <p className="text-[11px] text-ios-label2 leading-relaxed">
              Delhi NCR's dedicated B2B scrap exchange connecting scrap yards, kabaris, recyclers, and secondary steel re-rolling mills. Direct spot rates, zero dalal markups, and verified Dharam Kanta slips.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] text-ios-green font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> GSTIN Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" /> Kanta Verified
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-ios-label text-[11px] font-bold uppercase tracking-wider mb-2.5">
              Delhi Scrap Streams
            </h4>
            <ul className="space-y-1.5 text-xs text-ios-label2">
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-ios-label transition cursor-pointer">HMS 1 & 2 Structure Scrap</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-ios-label transition cursor-pointer">Copper Armature & 99% Wire</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-ios-label transition cursor-pointer">Aluminium Section 6063</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-ios-label transition cursor-pointer">OCC Gatta & Factory Bales</button></li>
              <li><button onClick={() => setActiveTab("browse")} className="hover:text-ios-label transition cursor-pointer">PET Bottle Flakes & HDPE</button></li>
            </ul>
          </div>

          {/* Col 3: Hubs */}
          <div>
            <h4 className="text-ios-label text-[11px] font-bold uppercase tracking-wider mb-2.5">
              Covered Delhi Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-ios-label2">
              <li><span className="font-semibold text-ios-label">Mayapuri Scrap Yard:</span> Auto & Heavy Scrap</li>
              <li><span className="font-semibold text-ios-label">Mundka Metal Hub:</span> Machinery & Iron</li>
              <li><span className="font-semibold text-ios-label">Bawana & Narela:</span> Polymer & Plastic</li>
              <li><span className="font-semibold text-ios-label">Wazirpur:</span> Stainless Steel</li>
              <li><span className="font-semibold text-ios-label">Naraina & Okhla:</span> Copper & Cables</li>
            </ul>
          </div>

          {/* Col 4: Links */}
          <div>
            <h4 className="text-ios-label text-[11px] font-bold uppercase tracking-wider mb-2.5">
              Daily Mandi Rates
            </h4>
            <div className="space-y-1.5 text-xs text-ios-label2">
              <button onClick={() => setActiveTab("indicative-prices")} className="block text-left hover:text-ios-label transition cursor-pointer">
                Today's Delhi Mandi Bhav
              </button>
              <button onClick={() => setActiveTab("whatsapp-alerts")} className="block text-left hover:text-ios-label transition cursor-pointer">
                WhatsApp Morning Mandi Alerts
              </button>
              <button onClick={() => setActiveTab("admin-dashboard")} className="block text-left hover:text-ios-label transition cursor-pointer">
                Dispute & Kanta Audit Desk
              </button>
              <p className="pt-2 text-[10px] text-ios-label3">
                Helpline: <span className="text-ios-label font-medium">+91 (011) 4982-MANDI</span>
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="py-4 text-[10px] text-ios-label3 leading-relaxed bg-ios-bg3/60 p-3.5 rounded-[14px] my-5 border border-ios-separator/15">
          <p className="font-bold text-ios-label mb-0.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-ios-orange" />
            <span>Delhi NCR Mandi Rate Transparency:</span>
          </p>
          <p>
            ScrapMandi operates as a digital trade facilitation platform for Delhi NCR scrap dealers and yard owners. Benchmark rates are calculated averages from spot lots across Mayapuri, Mundka, Bawana, and Wazirpur. Final transaction value is settled on actual electronic Dharam Kanta weighbridge slips.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ios-label3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ios-green"></span>
            <span>Live Spot Scrap Network • Delhi NCR Region</span>
          </div>
          <div className="flex items-center gap-3">
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
