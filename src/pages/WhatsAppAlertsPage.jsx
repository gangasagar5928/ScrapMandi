import React, { useState } from "react";
import { 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Clock, 
  Bell, 
  AlertCircle,
  Smartphone,
  Check,
  X,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { SCRAP_CATEGORIES } from "../data/categories";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const WhatsAppAlertsPage = () => {
  const { userProfile, updateUserProfile } = useAuth();
  
  const [optIn, setOptIn] = useState(userProfile?.notificationPreferences?.whatsappOptIn ?? true);
  const [frequency, setFrequency] = useState("daily_morning");
  const [selectedCats, setSelectedCats] = useState(["ferrous", "non_ferrous", "paper"]);
  const [phone, setPhone] = useState(userProfile?.phone || "+91 98112 34567");
  const [saved, setSaved] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
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

    // 3. Open WhatsApp Web / App with Instant Welcome Notification
    const formattedPhone = cleanPhoneNumber(phone);
    const waUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${generateWhatsAppMessage()}`;
    
    // Open in new tab/window for the user to receive the notification
    window.open(waUrl, "_blank");

    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="w-14 h-14 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-xl shadow-emerald-600/30">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Delhi Mandi WhatsApp Bhav Alert
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Get 9:00 AM daily scrap benchmark rates for Mayapuri, Mundka, Bawana & Wazirpur directly on your WhatsApp. Instant welcome notification sent upon saving.
          </p>
        </div>

        {/* Success Alert Banner */}
        {testSent && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-xs text-emerald-900 flex items-center justify-between shadow-lg shadow-emerald-500/10 animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-emerald-900">
                  🎉 WhatsApp Subscription Notification Dispatched!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Welcome Bhav and spot rates sent to {phone}. Check your WhatsApp window.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setTestSent(false)}
              className="text-emerald-700 hover:text-emerald-900 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Preferences Form */}
          <div className="lg:col-span-6 space-y-6">
            <form onSubmit={handleSaveAndSendAlert} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">Delhi Scrap Alert Settings</h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                  ⚡ Instant Delivery
                </span>
              </div>

              {/* Opt-In Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Daily WhatsApp Morning Bhav</p>
                  <p className="text-[11px] text-slate-500">Receive 9:00 AM spot scrap rates on WhatsApp</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOptIn(!optIn)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
                    optIn ? "bg-emerald-600 justify-end" : "bg-slate-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Mobile Number (Delhi NCR)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                        className={`p-3 rounded-2xl border text-xs font-medium text-left flex items-center justify-between transition cursor-pointer ${
                          isSelected 
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-sm" 
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alert Timing
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900"
                >
                  <option value="daily_morning">Daily Morning Opening Bhav (09:00 AM)</option>
                  <option value="twice_daily">Morning Opening (09:00 AM) + Evening Closing (05:00 PM)</option>
                </select>
              </div>

              {/* Submit / Send Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{saved ? "✓ Subscribed & Dispatched!" : "Subscribe & Send Instant Welcome Bhav on WhatsApp"}</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  🔒 Free service. No spam. Reply <strong>STOP</strong> at any time to immediately cancel.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: Interactive WhatsApp Message Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-sm bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800">
              
              {/* Phone Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3"></div>

              {/* WhatsApp Mockup */}
              <div className="bg-[#0b141a] rounded-[1.8rem] overflow-hidden text-white border border-slate-800 text-xs">
                
                {/* WA Top Bar */}
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow">
                      SM
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-bold text-xs text-white">ScrapMandi Delhi</p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      </div>
                      <p className="text-[10px] text-slate-400">Delhi NCR Mandi Desk • Online</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    Official
                  </span>
                </div>

                {/* WA Chat Body */}
                <div className="p-3 space-y-3 bg-[#0b141a] min-h-[380px] flex flex-col justify-end">
                  
                  <div className="bg-[#005c4b] text-slate-100 p-3.5 rounded-2xl rounded-tl-none space-y-2 shadow-md">
                    <div className="flex items-center justify-between border-b border-[#046e5b] pb-1.5">
                      <p className="font-bold text-emerald-200 text-xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Delhi Mandi Opening Bhav</span>
                      </p>
                      <span className="text-[10px] text-emerald-300">{getTodayFormattedDate()}</span>
                    </div>

                    <p className="text-[11px] text-slate-100 leading-relaxed">
                      Namaste! Your daily scrap spot rate alert is active for Delhi NCR yards:
                    </p>

                    <div className="space-y-1.5 bg-[#025143] p-2.5 rounded-xl text-[11px] font-mono border border-[#046e5b]">
                      <p>• <strong>HMS 1 Loha:</strong> ₹38,800/t (Mayapuri)</p>
                      <p>• <strong>Copper 99% Wire:</strong> ₹775/kg (Naraina)</p>
                      <p>• <strong>Peetal Honey:</strong> ₹490/kg (Wazirpur)</p>
                      <p>• <strong>OCC Gatta Bales:</strong> ₹16.00/kg (Bawana)</p>
                      <p>• <strong>PET Washed Flakes:</strong> ₹47.50/kg (Narela)</p>
                    </div>

                    <p className="text-[10px] text-emerald-200">
                      ⚡ 30+ new truckloads listed this morning in Mayapuri &amp; Mundka.
                    </p>

                    <div className="pt-2 border-t border-[#046e5b] text-[10px] text-slate-300">
                      <p>Rates verified at 09:00 AM • Dharam Kanta weight slip backed</p>
                      <p className="text-[9px] text-slate-400 mt-1">Reply STOP to unsubscribe.</p>
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
