import React, { useState } from "react";
import { 
  Building2, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MAJOR_MANDIS } from "../data/categories";
import { IOSSheet } from "../components/ios/IOSSheet";
import { IOSButton } from "../components/ios/IOSButton";
import { IOSSegmentedControl } from "../components/ios/IOSSegmentedControl";

export const AuthPage = ({ isOpen, onClose, initialRole = "dealer" }) => {
  const { loginWithDemoRole, signInGoogle, sendPhoneOtp, setupRecaptcha, updateUserProfile } = useAuth();
  
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState(initialRole);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    businessName: "",
    city: "Mayapuri Scrap Yard",
    state: "Delhi",
    approxLocation: "Mayapuri Phase 2, New Delhi",
    privateAddress: "",
    gstin: "",
    whatsappSame: true
  });

  const roleOptions = [
    { value: "dealer", label: "Buyer / Mill" },
    { value: "vendor", label: "Yard Seller" },
    { value: "admin", label: "Admin" },
  ];

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    
    setLoading(true);
    try {
      const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
      try {
        const appVerifier = setupRecaptcha("recaptcha-container");
        const confirmation = await sendPhoneOtp(formattedPhone, appVerifier);
        setConfirmationResult(confirmation);
        setStep(2);
      } catch (phoneErr) {
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
      setStep(3);
    } catch (err) {
      setStep(3);
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
          gstinVerified: Boolean(profileData.gstin),
          businessVerified: true
        }
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (targetRole) => {
    loginWithDemoRole(targetRole);
    onClose();
  };

  return (
    <IOSSheet
      isOpen={isOpen}
      onClose={onClose}
      title={step === 3 ? "Complete KYC Profile" : "Sign In to ScrapMandi"}
      subtitle={step === 3 ? "Delhi NCR Yard Registration" : "Verified B2B Scrap Exchange"}
    >
      <div className="space-y-4">
        
        {/* Recaptcha container */}
        <div id="recaptcha-container"></div>

        {error && (
          <div className="p-3 bg-ios-red/15 border border-ios-red/30 rounded-[12px] text-xs text-ios-red flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Phone / Role Selection */}
        {step === 1 && (
          <div className="space-y-4">
            
            {/* Persona Role Switcher */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider">
                Select Your Role
              </label>
              <IOSSegmentedControl
                options={roleOptions}
                value={role}
                onChange={setRole}
              />
            </div>

            {/* Phone OTP Form */}
            <form onSubmit={handleSendOtp} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                  Mobile Number (OTP Verification)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98112 34567"
                    className="w-full px-3.5 py-3 bg-ios-bg3 text-ios-label rounded-[14px] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ios-blue/40 border border-transparent transition"
                    autoFocus
                  />
                  <Phone className="w-4 h-4 text-ios-label3 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <IOSButton
                fullWidth
                size="lg"
                color="blue"
                variant="filled"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Get Verification Code →"}
              </IOSButton>
            </form>

            {/* Demo Instant Access Row */}
            <div className="pt-3 border-t border-ios-separator/15 space-y-2">
              <p className="text-[10px] font-bold text-ios-label3 uppercase tracking-wider text-center">
                Instant 1-Click Demo Profiles
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("vendor")}
                  className="p-2.5 rounded-[12px] bg-ios-green/15 text-ios-green border border-ios-green/25 text-xs font-bold text-center active:scale-95 transition cursor-pointer"
                >
                  Mayapuri Yard Seller
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("dealer")}
                  className="p-2.5 rounded-[12px] bg-ios-blue/15 text-ios-blue border border-ios-blue/25 text-xs font-bold text-center active:scale-95 transition cursor-pointer"
                >
                  Mayapuri Buyer / Mill
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <p className="text-xs text-ios-label2">
                Enter the 6-digit verification code sent to
              </p>
              <p className="text-sm font-bold text-ios-label">{phone || "+91 98112 34567"}</p>
            </div>

            <div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3 bg-ios-bg3 text-ios-label rounded-[14px] text-center text-xl font-mono font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-ios-blue/40 border border-transparent transition"
                autoFocus
              />
            </div>

            <IOSButton
              fullWidth
              size="lg"
              color="blue"
              variant="filled"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </IOSButton>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-xs text-ios-blue font-semibold"
            >
              ← Change Mobile Number
            </button>
          </form>
        )}

        {/* Step 3: KYC Profile Form */}
        {step === 3 && (
          <form onSubmit={handleCompleteProfile} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                Full Name / Owner Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-blue/40"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                Business / Yard Name
              </label>
              <input
                type="text"
                value={profileData.businessName}
                onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                placeholder="e.g. Sharma Loha & Metal Traders"
                className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-blue/40"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                Mandi Yard Hub
              </label>
              <select
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ios-blue/40"
              >
                {MAJOR_MANDIS.map((m, idx) => (
                  <option key={idx} value={m.city}>{m.city} ({m.region})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-ios-label2 uppercase tracking-wider mb-1">
                GSTIN (Optional for Input Tax Credit)
              </label>
              <input
                type="text"
                value={profileData.gstin}
                onChange={(e) => setProfileData({ ...profileData, gstin: e.target.value.toUpperCase() })}
                placeholder="07AABCS1429B1Z8"
                className="w-full px-3 py-2 bg-ios-bg3 text-ios-label rounded-[10px] text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-ios-blue/40"
              />
            </div>

            <div className="pt-2">
              <IOSButton
                fullWidth
                size="lg"
                color="green"
                variant="filled"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving Profile..." : "Complete Setup & Access Mandi"}
              </IOSButton>
            </div>
          </form>
        )}

      </div>
    </IOSSheet>
  );
};
