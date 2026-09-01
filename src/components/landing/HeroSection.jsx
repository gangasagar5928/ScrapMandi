import React from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Scale,
  MapPin,
  CheckCircle2,
  Zap,
  ChevronRight
} from "lucide-react";
import { IOSButton } from "../ios/IOSButton";
import { IOSBadge } from "../ios/IOSBadge";
import { IOSCard } from "../ios/IOSCard";

export const HeroSection = ({ setActiveTab, onOpenAuth }) => {
  const tickerItems = [
    { name: "HMS 1 Heavy", price: "₹38,800/t", change: "+1.2%", mandi: "Mayapuri" },
    { name: "Copper 99%",  price: "₹775/kg",   change: "+0.8%", mandi: "Naraina" },
    { name: "Brass Purza", price: "₹490/kg",   change: "-0.5%", mandi: "Wazirpur" },
    { name: "Aluminium 6063", price: "₹218/kg", change: "+1.5%", mandi: "Faridabad" },
    { name: "OCC Gatta",   price: "₹16.00/kg", change: "+0.3%", mandi: "Bawana" },
    { name: "PET Flakes",  price: "₹47.50/kg", change: "+1.0%", mandi: "Narela" },
    { name: "Saria Tukda", price: "₹37,200/t", change: "+0.9%", mandi: "Mundka" }
  ];

  const stats = [
    { value: "₹2.8+ Cr",    label: "Delhi Monthly Volume",   color: "text-ios-label" },
    { value: "950+ Tonnes", label: "Scrap Lifted",           color: "text-ios-green" },
    { value: "120+ Yards",  label: "Mayapuri & Mundka",      color: "text-ios-label" },
    { value: "100%",        label: "Dharam Kanta Slip",      color: "text-ios-blue" },
  ];

  const heroImg = "/images/scrap-hero-yard.svg";

  const spotItems = [
    {
      img: "/images/scrap-loha.svg",
      name: "HMS 1 Heavy Structure", badge: "80:20", badgeColor: "blue",
      seller: "Sharma Loha • Mayapuri Phase 2", price: "₹38,800", unit: "/ t", qty: "35 t ready", priceCls: "text-ios-green"
    },
    {
      img: "/images/scrap-copper.svg",
      name: "Copper Armature (99%)", badge: "Berry", badgeColor: "orange",
      seller: "Salim Tamba • Naraina Phase 1", price: "₹775", unit: "/ kg", qty: "2,800 kg", priceCls: "text-ios-orange"
    },
    {
      img: "/images/scrap-paper.svg",
      name: "OCC Gatta (Mill Baled)", badge: "Grade A", badgeColor: "green",
      seller: "Aggarwal Recyclers • Bawana", price: "₹16.00", unit: "/ kg", qty: "24 t ready", priceCls: "text-ios-green"
    },
  ];

  return (
    <div className="relative bg-ios-bg text-ios-label pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-ios-separator/20 transition-colors">
      
      {/* Live Mandi Ticker Pill Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="bg-ios-bg2 rounded-[16px] border border-ios-separator/20 p-2.5 flex items-center gap-3 overflow-x-auto shadow-ios-card dark:shadow-ios-card-dark">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ios-green/15 text-ios-green text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-ios-green animate-pulse" />
            Delhi Spot Bhav
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs whitespace-nowrap overflow-x-auto py-0.5">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 border-r border-ios-separator/15 pr-4 sm:pr-6 last:border-0 shrink-0">
                <span className="text-ios-label2 font-medium">{item.name}</span>
                <span className="text-ios-label font-bold">{item.price}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${item.change.startsWith("+") ? "text-ios-green bg-ios-green/10" : "text-ios-red bg-ios-red/10"}`}>
                  {item.change}
                </span>
                <span className="text-ios-label3 text-[10px]">({item.mandi})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero iOS Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left column — iOS Typography & Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ios-green/15 text-ios-green text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delhi NCR Scrap Exchange • Mayapuri • Mundka • Bawana</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ios-label leading-[1.12]">
              Sell • Buy • Recycle. <br />
              <span className="text-ios-green">
                Turning Waste Into Value.
              </span>
            </h1>

            <p className="text-ios-label2 text-sm sm:text-base sm:leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
              Direct scrap trading between verified yard owners, kabaris, recyclers, and secondary steel re-rolling mills in Delhi NCR. Guaranteed electronic Dharam Kanta slips, live spot rates, zero dalal commission.
            </p>

            {/* iOS Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <IOSButton
                size="lg"
                color="green"
                variant="filled"
                onClick={() => setActiveTab("browse")}
                icon={ArrowRight}
                className="w-full sm:w-auto"
              >
                Find Scrap Lots (Buy)
              </IOSButton>

              <IOSButton
                size="lg"
                variant="gray"
                onClick={() => setActiveTab("vendor-dashboard")}
                className="w-full sm:w-auto"
              >
                Post Yard Stock (Sell)
              </IOSButton>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-ios-label2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-ios-green shrink-0" /> Zero Dalal Commission</span>
              <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-ios-green shrink-0" /> Dharam Kanta Slips</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-ios-green shrink-0" /> Yard Gate Verification</span>
            </div>
          </div>

          {/* Right column — iOS Grouped Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-ios-bg2 rounded-[20px] p-5 sm:p-6 border border-ios-separator/20 shadow-ios-card dark:shadow-ios-card-dark space-y-4">
              
              <div className="flex items-center justify-between border-b border-ios-separator/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="ScrapMandi"
                    className="w-9 h-9 object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-ios-label text-sm sm:text-base">Delhi NCR Spot Deals</h3>
                    <p className="text-[11px] text-ios-green font-medium">Ready for immediate truck loading</p>
                  </div>
                </div>
                <IOSBadge color="green" variant="tinted">
                  ⚡ 30+ Lots
                </IOSBadge>
              </div>

              {/* Grouped Spot Rows */}
              <div className="space-y-2">
                {spotItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveTab("browse")}
                    className="p-3 rounded-[14px] bg-ios-bg3/60 hover:bg-ios-bg3 flex items-center justify-between transition cursor-pointer select-none active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-10 rounded-[10px] object-cover border border-ios-separator/20 shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/scrap-loha.svg";
                        }}
                      />
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-ios-label text-xs sm:text-sm truncate">{item.name}</span>
                          <IOSBadge color={item.badgeColor} variant="tinted">{item.badge}</IOSBadge>
                        </div>
                        <p className="text-[10px] text-ios-label2 truncate">{item.seller}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <p className={`text-xs sm:text-sm font-black ${item.priceCls}`}>{item.price} <span className="text-[9px] text-ios-label3 font-normal">{item.unit}</span></p>
                      <p className="text-[10px] text-ios-label3">{item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <IOSButton
                fullWidth
                variant="tinted"
                color="blue"
                onClick={() => setActiveTab("browse")}
              >
                Inspect All Delhi Yard Lots →
              </IOSButton>
            </div>
          </div>
        </div>

        {/* iOS Grouped Stats Row */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-ios-separator/15 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i} className="bg-ios-bg2 p-3.5 sm:p-4 rounded-[16px] border border-ios-separator/20 shadow-ios-card dark:shadow-ios-card-dark">
              <p className={`text-xl sm:text-2xl font-black tracking-tight ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-ios-label2 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
