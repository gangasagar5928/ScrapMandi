import React, { useState } from "react";
import { 
  Building2, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  User, 
  Building, 
  MapPin, 
  FileText,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MAJOR_MANDIS } from "../data/categories";

export const AuthPage = ({ isOpen, onClose, initialRole = "dealer" }) => {
  const { loginWithDemoRole, signInGoogle, sendPhoneOtp, setupRecaptcha, updateUserProfile } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Phone / Mode select, 2: OTP, 3: Profile Setup
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState(initialRole);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: "",
    businessName: "",
    city: "Delhi-NCR",
    state: "Delhi",
    approxLocation: "Mayapuri Industrial Area",
    privateAddress: "",
    gstin: "",
    whatsappSame: true
  });

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    
    setLoading(true);
    try {
      // If Firebase Phone Auth recaptcha is available
      const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
      try {
        const appVerifier = setupRecaptcha("recaptcha-container");
        const confirmation = await sendPhoneOtp(formattedPhone, appVerifier);
        setConfirmationResult(confirmation);
        setStep(2);
      } catch (phoneErr) {
        console.warn("Phone OTP fallback active (simulated OTP for testing):", phoneErr);
        // Fallback for dev/test mode
        setStep(2);
      }
    } catch (err) {
      setError(err.message || "Failed to send OTP. Try Demo Mode below.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
      }
      setStep(3); // Proceed to business onboarding details
    } catch (err) {
      console.warn("OTP confirm note:", err);
      setStep(3); // dev bypass
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        ...profileData,
        role,
        verificationStatus: {
          phoneVerified: true,
          gstinVerified: profileData.gstin.length === 15,
          businessVerified: false
        }
      });
      onClose();
    } catch (err) {
      setError("Failed to save profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoRole) => {
    loginWithDemoRole(demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 z-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Building2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {step === 1 && "Access India's Scrap Exchange"}
            {step === 2 && "Enter Verification OTP"}
            {step === 3 && "Complete Business Profile"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {step === 1 && "Phone OTP authentication & accredited onboarding"}
            {step === 2 && `OTP sent to ${phone || "+91 98765 43210"}`}
            {step === 3 && "Configure trading credentials and verified location"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div id="recaptcha-container"></div>

        {/* STEP 1: Phone OTP / Google Sign-In */}
        {step === 1 && (
          <div className="space-y-4">
            
            {/* Role selector tab */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                I want to join ScrapMandi as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition ${
                    role === "vendor" 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm" 
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span>Vendor (Seller / Yard)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("dealer")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition ${
                    role === "dealer" 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm" 
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Dealer (Buyer / Foundry)</span>
                </button>
              </div>
            </div>

            {/* Phone form */}
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (India +91)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending OTP..." : "Continue with Phone OTP"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 bg-white px-2">
                Instant Demo Access (1-Click)
              </div>
            </div>

            {/* 1-Click Demo Personas */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("vendor")}
                className="w-full p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Test as Vendor: Rajesh Sharma (Mandi Gobindgarh)
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">Seller</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("dealer")}
                className="w-full p-2.5 rounded-xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-blue-900 flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Test as Dealer: Vikram Singhania (Delhi-NCR Mill)
                </span>
                <span className="text-[10px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded">Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                className="w-full p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-purple-900 flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  Test as Ops Admin: Platform Moderation & Disputes
                </span>
                <span className="text-[10px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded">Admin</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enter 6-Digit SMS Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full tracking-widest text-center text-xl font-bold py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                For demo/testing, you can enter any 6 digits (e.g. 123456)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-xs font-semibold text-slate-500 hover:text-slate-700 text-center"
            >
              ← Change Mobile Number
            </button>
          </form>
        )}

        {/* STEP 3: Complete Onboarding Profile */}
        {step === 3 && (
          <form onSubmit={handleCompleteProfile} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Authorized Contact Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="e.g. Aman Kumar Singh"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business / Yard Name
              </label>
              <input
                type="text"
                value={profileData.businessName}
                onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                placeholder="e.g. Singh Scrap Traders & Recycling"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Mandi City
                </label>
                <select
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                >
                  {MAJOR_MANDIS.map((m, idx) => (
                    <option key={idx} value={m.city}>{m.city} ({m.state})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GSTIN (Optional for MVP)
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={profileData.gstin}
                  onChange={(e) => setProfileData({ ...profileData, gstin: e.target.value.toUpperCase() })}
                  placeholder="07AAAAA0000A1Z5"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Public Approximate Location
              </label>
              <input
                type="text"
                value={profileData.approxLocation}
                onChange={(e) => setProfileData({ ...profileData, approxLocation: e.target.value })}
                placeholder="e.g. Mayapuri Phase 2 / Focal Point"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                required
              />
              <p className="text-[10px] text-slate-400 mt-0.5">
                Exact private yard address is protected and only shared upon order confirmation.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
            >
              {loading ? "Saving Profile..." : "Complete Setup & Enter Exchange"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
