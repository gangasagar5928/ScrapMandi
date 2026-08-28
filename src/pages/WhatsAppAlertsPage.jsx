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
  X
} from "lucide-react";
import { SCRAP_CATEGORIES } from "../data/categories";
import { useAuth } from "../context/AuthContext";

export const WhatsAppAlertsPage = () => {
  const { userProfile, updateUserProfile } = useAuth();
  
  const [optIn, setOptIn] = useState(userProfile?.notificationPreferences?.whatsappOptIn ?? true);
  const [frequency, setFrequency] = useState("daily_morning"); // "daily_morning" | "twice_daily"
  const [selectedCats, setSelectedCats] = useState(["ferrous", "non_ferrous"]);
  const [phone, setPhone] = useState(userProfile?.phone || "+91 98112 34567");
  const [saved, setSaved] = useState(false);

  const toggleCat = (catId) => {
    setSelectedCats(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      notificationPreferences: {
        whatsappOptIn: optIn,
        frequency,
        categories: selectedCats
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Delhi Mandi WhatsApp Bhav Alert
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Get 9:00 AM daily scrap benchmark rates for Mayapuri, Mundka, Bawana & Wazirpur directly on WhatsApp. Reply STOP anytime to cancel.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Preferences Form */}
          <div className="lg:col-span-6 space-y-6">
            <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Delhi Scrap Alert Settings</h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Verified Service
                </span>
              </div>

              {/* Opt-In Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Daily WhatsApp Morning Bhav</p>
                  <p className="text-[11px] text-slate-500">Receive 9:00 AM spot scrap rates on WhatsApp</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOptIn(!optIn)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
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
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  required
                />
              </div>

              {/* Category Filter Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Scrap Streams
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SCRAP_CATEGORIES.map(cat => {
                    const isSelected = selectedCats.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCat(cat.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                          isSelected 
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold" 
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                >
                  <option value="daily_morning">Daily Morning Opening Bhav (09:00 AM)</option>
                  <option value="twice_daily">Morning Opening + Evening Closing Rates</option>
                </select>
              </div>

              {/* Save */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{saved ? "Alert Settings Saved!" : "Save Alert Settings"}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Reply <strong>STOP</strong> at any time to immediately stop receiving rate messages.
              </p>

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
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                    SM
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-xs">ScrapMandi Delhi</p>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    </div>
                    <p className="text-[10px] text-slate-400">Delhi NCR Mandi Desk</p>
                  </div>
                </div>

                {/* WA Chat Body */}
                <div className="p-3 space-y-3 bg-[#0b141a] min-h-[380px] flex flex-col justify-end">
                  
                  <div className="bg-[#005c4b] text-slate-100 p-3.5 rounded-2xl rounded-tl-none space-y-2 shadow">
                    <p className="font-bold text-emerald-200 text-xs">
                      📊 Delhi Mandi Opening Bhav • {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      Namaste! Here are today's morning spot rates across Delhi NCR yards:
                    </p>

                    <div className="space-y-1 bg-[#025143] p-2 rounded-lg text-[11px] font-mono">
                      <p>• <strong>HMS 1 Loha:</strong> ₹38,800/t (Mayapuri)</p>
                      <p>• <strong>Copper 99% Wire:</strong> ₹775/kg (Naraina)</p>
                      <p>• <strong>Peetal Honey Purza:</strong> ₹490/kg (Wazirpur)</p>
                      <p>• <strong>OCC Gatta Bales:</strong> ₹16.00/kg (Bawana)</p>
                    </div>

                    <p className="text-[10px] text-emerald-300">
                      ⚡ 14 new truckloads listed this morning.
                    </p>

                    <div className="pt-2 border-t border-[#046e5b] text-[10px] text-slate-300">
                      <p>Rates at 09:00 AM • Dharam Kanta weight slip</p>
                      <p className="text-[9px] text-slate-400 mt-1">Reply STOP to unsubscribe.</p>
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-500 self-end">09:00 AM ✓✓</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
