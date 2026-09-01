import React, { useState } from "react";
import { 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  Smartphone, 
  Check, 
  X, 
  Sparkles 
} from "lucide-react";
import { SCRAP_CATEGORIES } from "../data/categories";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { IOSToggle } from "../components/ios/IOSToggle";
import { IOSButton } from "../components/ios/IOSButton";
import { IOSCard } from "../components/ios/IOSCard";
import { IOSBadge } from "../components/ios/IOSBadge";

export const WhatsAppAlertsPage = () => {
  const { userProfile, updateUserProfile } = useAuth();
  
  const [optIn, setOptIn] = useState(userProfile?.notificationPreferences?.whatsappOptIn ?? true);
  const [frequency, setFrequency] = useState("daily_morning");
  const [selectedCats, setSelectedCats] = useState(["ferrous", "non_ferrous", "paper"]);
  const [phone, setPhone] = useState(userProfile?.phone || "+91 98112 34567");
  const [saved, setSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const toggleCat = (catId) => {
    setSelectedCats(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const getTodayFormattedDate = () => {
    return new Date().toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const cleanPhoneNumber = (p) => {
    let cleaned = p.replace(/\D/g, "");
    if (cleaned.length === 10) {
      cleaned = "91" + cleaned;
    }
    return cleaned;
  };

  // Generate WhatsApp formatted message text
  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `*ScrapMandi Delhi NCR — Mandi Bhav Subscription* ✅\n\n` +
      `Namaste! Your daily spot rate alerts are now ACTIVE for Delhi NCR yards.\n` +
      `📍 *Hubs:* Mayapuri • Mundka • Bawana • Wazirpur • Naraina\n\n` +
      `📊 *Today's Opening Bhav (${getTodayFormattedDate()}):*\n` +
      `• *HMS 1 Heavy Loha:* ₹38,800/tonne (Mayapuri)\n` +
      `• *Copper 99% Armature:* ₹775/kg (Naraina)\n` +
      `• *Brass Honey Purza:* ₹490/kg (Wazirpur)\n` +
      `• *OCC Gatta (Mill Bales):* ₹16.00/kg (Bawana)\n` +
      `• *PET Washed Flakes:* ₹47.50/kg (Narela)\n\n` +
      `⚡ *Next Scheduled Digest:* Tomorrow at 09:00 AM IST\n` +
      `🔒 100% Dharam Kanta Slip Backed & Zero Dalal Commission.\n\n` +
      `Reply *STOP* at any time to pause alerts.\n` +
      `🌐 *Browse Live Lots:* https://scrapmandi.web.app/#browse`
    );
  };

  const handleSaveAndSendAlert = async (e) => {
    if (e) e.preventDefault();

    // 1. Update Auth Context
    updateUserProfile({
      phone,
      notificationPreferences: {
        whatsappOptIn: optIn,
        frequency,
        categories: selectedCats
      }
    });

    // 2. Save subscription to Firebase Firestore
    try {
      if (db) {
        await addDoc(collection(db, "whatsapp_subscriptions"), {
          phone,
          optIn,
          frequency,
          categories: selectedCats,
          subscribedAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.warn("Firestore note (using local subscription):", err.message);
    }

    setSaved(true);
    setTestSent(true);

    // 3. Open WhatsApp
    const formattedPhone = cleanPhoneNumber(phone);
    const waUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${generateWhatsAppMessage()}`;
    window.open(waUrl, "_blank");

    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label py-6 sm:py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="w-12 h-12 rounded-[16px] bg-ios-green/15 text-ios-green flex items-center justify-center mx-auto mb-2.5 shadow-xs">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-ios-label tracking-tight">
            Delhi Mandi WhatsApp Bhav Alert
          </h1>
          <p className="text-xs sm:text-sm text-ios-label2 mt-1.5 leading-relaxed">
            Get 9:00 AM daily scrap benchmark rates for Mayapuri, Mundka, Bawana & Wazirpur directly on your WhatsApp.
          </p>
        </div>

        {/* Success Alert Banner */}
        {testSent && (
          <div className="bg-ios-green/15 border border-ios-green/30 rounded-[16px] p-3.5 text-xs text-ios-label flex items-center justify-between shadow-xs animate-slide-up">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-ios-green text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-ios-green">
                  WhatsApp Subscription Notification Dispatched!
                </p>
                <p className="text-[11px] text-ios-label2">
                  Welcome Bhav and spot rates sent to {phone}.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setTestSent(false)}
              className="text-ios-label3 hover:text-ios-label p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Preferences Form */}
          <div className="lg:col-span-6 space-y-5">
            <form onSubmit={handleSaveAndSendAlert} className="bg-ios-bg2 rounded-[24px] border border-ios-separator/20 p-5 sm:p-7 shadow-ios-card dark:shadow-ios-card-dark space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-ios-separator/15">
                <h3 className="font-bold text-sm sm:text-base text-ios-label">Delhi Scrap Alert Settings</h3>
                <IOSBadge color="green" variant="tinted">
                  ⚡ Instant Delivery
                </IOSBadge>
              </div>

              {/* Opt-In Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-ios-bg3/60 rounded-[16px] border border-ios-separator/15">
                <div>
                  <p className="text-xs font-bold text-ios-label">Daily WhatsApp Morning Bhav</p>
                  <p className="text-[11px] text-ios-label2">Receive 9:00 AM spot scrap rates</p>
                </div>
                <IOSToggle
                  checked={optIn}
                  onChange={setOptIn}
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider">
                  WhatsApp Mobile Number (Delhi NCR)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full px-3.5 py-2.5 bg-ios-bg3 text-ios-label rounded-[12px] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ios-green/40 border border-transparent transition"
                    required
                  />
                  <Smartphone className="w-4 h-4 text-ios-label3 absolute right-3.5 top-3" />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider">
                  Select Scrap Streams to Track
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SCRAP_CATEGORIES.map(cat => {
                    const isSelected = selectedCats.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCat(cat.id)}
                        className={`p-2.5 rounded-[12px] border text-xs font-medium text-left flex items-center justify-between transition cursor-pointer active:scale-[0.98] ${
                          isSelected 
                            ? "border-ios-green bg-ios-green/15 text-ios-green font-bold" 
                            : "border-ios-separator/20 bg-ios-bg3/40 text-ios-label hover:bg-ios-bg3"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-ios-green shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider">
                  Alert Timing
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-ios-bg3 text-ios-label rounded-[12px] text-xs font-semibold border border-transparent focus:outline-none focus:ring-2 focus:ring-ios-green/40 cursor-pointer"
                >
                  <option value="daily_morning">Daily Morning Opening Bhav (09:00 AM)</option>
                  <option value="twice_daily">Morning (09:00 AM) + Evening (05:00 PM)</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2 space-y-2">
                <IOSButton
                  fullWidth
                  size="lg"
                  color="green"
                  variant="filled"
                  type="submit"
                  icon={Send}
                >
                  {saved ? "✓ Subscribed & Dispatched!" : "Subscribe & Send Instant Bhav on WhatsApp"}
                </IOSButton>

                <p className="text-[10px] text-ios-label3 text-center leading-relaxed">
                  🔒 Free service. No spam. Reply <strong>STOP</strong> at any time to immediately cancel.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: iOS WhatsApp Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-sm bg-ios-bg2 rounded-[32px] p-3 shadow-ios-modal border border-ios-separator/20">
              
              <div className="bg-[#0b141a] rounded-[24px] overflow-hidden text-white text-xs">
                
                {/* WA Top Bar */}
                <div className="bg-[#1f2c34] px-3.5 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-ios-green flex items-center justify-center text-white font-bold text-xs">
                      SM
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-bold text-xs text-white">ScrapMandi Delhi</p>
                        <CheckCircle2 className="w-3 h-3 text-ios-green fill-ios-green" />
                      </div>
                      <p className="text-[9px] text-slate-400">Delhi NCR Mandi Desk • Online</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-ios-green bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    Official
                  </span>
                </div>

                {/* WA Chat Body */}
                <div className="p-3 space-y-2.5 bg-[#0b141a] min-h-[340px] flex flex-col justify-end">
                  
                  <div className="bg-[#005c4b] text-slate-100 p-3 rounded-2xl rounded-tl-none space-y-2 shadow-md">
                    <div className="flex items-center justify-between border-b border-[#046e5b] pb-1">
                      <p className="font-bold text-emerald-200 text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-300" />
                        <span>Delhi Mandi Opening Bhav</span>
                      </p>
                      <span className="text-[9px] text-emerald-300">{getTodayFormattedDate()}</span>
                    </div>

                    <p className="text-[10px] text-slate-100 leading-relaxed">
                      Namaste! Your daily scrap spot rate alert is active for Delhi NCR yards:
                    </p>

                    <div className="space-y-1 bg-[#025143] p-2 rounded-[10px] text-[10px] font-mono border border-[#046e5b]">
                      <p>• <strong>HMS 1 Loha:</strong> ₹38,800/t (Mayapuri)</p>
                      <p>• <strong>Copper 99%:</strong> ₹775/kg (Naraina)</p>
                      <p>• <strong>Peetal Honey:</strong> ₹490/kg (Wazirpur)</p>
                      <p>• <strong>OCC Gatta:</strong> ₹16.00/kg (Bawana)</p>
                    </div>

                    <div className="pt-1.5 border-t border-[#046e5b] text-[9px] text-slate-300">
                      <p>Rates verified at 09:00 AM • Dharam Kanta slip backed</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-500 px-1">
                    <span>ScrapMandi Bot Desk</span>
                    <span>09:00 AM ✓✓</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
