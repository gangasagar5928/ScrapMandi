import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  auth, 
  db, 
  googleProvider 
} from "../firebase/config";
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  // Load demo profile from localStorage if exists
  useEffect(() => {
    const savedDemo = localStorage.getItem("scrapmandi_demo_user");
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setCurrentUser({ uid: parsed.uid, phoneNumber: parsed.phone, email: parsed.email });
        setUserProfile(parsed);
        setDemoMode(true);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem("scrapmandi_demo_user");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUserProfile(snap.data());
          } else {
            // New user initial profile skeleton
            const defaultProfile = {
              uid: user.uid,
              phone: user.phoneNumber || "",
              email: user.email || "",
              name: user.displayName || "Marketplace User",
              businessName: "",
              role: "dealer", // Default role
              city: "Delhi-NCR",
              state: "Delhi",
              approxLocation: "Delhi-NCR",
              gstin: "",
              gstinStatus: "unverified",
              verificationStatus: {
                phoneVerified: !!user.phoneNumber,
                gstinVerified: false,
                businessVerified: false
              },
              ratingSummary: {
                average: 5.0,
                count: 0
              },
              notificationPreferences: {
                whatsappOptIn: true,
                dailyPriceDigest: true,
                orderAlerts: true
              },
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            await setDoc(userDocRef, defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (err) {
          console.warn("Firestore profile fetch note (using fallback):", err);
          // Safe fallback for restricted or offline rules
          setUserProfile({
            uid: user.uid,
            phone: user.phoneNumber || "+91 98765 43210",
            name: user.displayName || "Scrap Trader",
            businessName: "Mandi Enterprises",
            role: "vendor",
            city: "Delhi-NCR",
            approxLocation: "Delhi-NCR",
            verificationStatus: { phoneVerified: true, gstinVerified: true, businessVerified: true },
            ratingSummary: { average: 4.8, count: 14 }
          });
        }
      } else {
        if (!localStorage.getItem("scrapmandi_demo_user")) {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Quick Demo Login for instant testing of Vendor / Dealer / Admin roles
  const loginWithDemoRole = (role = "vendor", customData = {}) => {
    const demoProfiles = {
      vendor: {
        uid: "demo_vendor_001",
        name: "Rajesh Sharma",
        businessName: "Sharma Loha Scrap Yard",
        phone: "+91 98112 34567",
        email: "rajesh@sharmaloha.in",
        role: "vendor",
        city: "Mayapuri Scrap Yard",
        state: "Delhi",
        approxLocation: "Mayapuri Phase 2, New Delhi",
        privateAddress: "Plot C-42/1, Mayapuri Industrial Area Phase 2, New Delhi - 110064",
        gstin: "07AABCS1429B1Z8",
        gstinStatus: "verified",
        verificationStatus: {
          phoneVerified: true,
          gstinVerified: true,
          businessVerified: true
        },
        ratingSummary: { average: 4.9, count: 42 },
        notificationPreferences: {
          whatsappOptIn: true,
          dailyPriceDigest: true,
          orderAlerts: true
        }
      },
      dealer: {
        uid: "demo_dealer_002",
        name: "Vikram Singhania",
        businessName: "Singhania Secondary Steel & Alloys",
        phone: "+91 98201 87654",
        email: "procure@singhaniasteel.com",
        role: "dealer",
        city: "Mayapuri Scrap Yard",
        state: "Delhi",
        approxLocation: "Mayapuri Phase 2 Secondary Rolling Unit",
        privateAddress: "C-12, Mayapuri Industrial Area Phase 2, New Delhi - 110064",
        gstin: "07AAACS9821C1Z4",
        gstinStatus: "verified",
        verificationStatus: {
          phoneVerified: true,
          gstinVerified: true,
          businessVerified: true
        },
        ratingSummary: { average: 4.8, count: 24 },
        notificationPreferences: {
          whatsappOptIn: true,
          dailyPriceDigest: true,
          orderAlerts: true
        }
      },
      admin: {
        uid: "demo_admin_003",
        name: "Aman Singh (Admin)",
        businessName: "ScrapMandi Operations Control",
        phone: "+91 99999 00000",
        email: "admin@scrapmandi.com",
        role: "admin",
        city: "National Operations",
        state: "HQ",
        approxLocation: "Central Exchange HQ",
        verificationStatus: {
          phoneVerified: true,
          gstinVerified: true,
          businessVerified: true
        },
        ratingSummary: { average: 5.0, count: 99 },
        notificationPreferences: {
          whatsappOptIn: true,
          dailyPriceDigest: true,
          orderAlerts: true
        }
      }
    };

    const targetProfile = { ...demoProfiles[role], ...customData };
    localStorage.setItem("scrapmandi_demo_user", JSON.stringify(targetProfile));
    setCurrentUser({ uid: targetProfile.uid, phoneNumber: targetProfile.phone, email: targetProfile.email });
    setUserProfile(targetProfile);
    setDemoMode(true);
    return targetProfile;
  };

  const setupRecaptcha = (containerId) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
    return window.recaptchaVerifier;
  };

  const sendPhoneOtp = async (phoneNumber, appVerifier) => {
    try {
      return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    } catch (err) {
      console.error("Phone OTP Error:", err);
      throw err;
    }
  };

  const signInGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res.user;
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      throw err;
    }
  };

  const updateUserProfileData = async (data) => {
    if (demoMode || !currentUser) {
      const updated = { ...userProfile, ...data, updatedAt: new Date().toISOString() };
      setUserProfile(updated);
      localStorage.setItem("scrapmandi_demo_user", JSON.stringify(updated));
      return updated;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      setUserProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.warn("Firestore update error:", err);
      setUserProfile(prev => ({ ...prev, ...data }));
    }
  };

  const switchRole = (newRole) => {
    updateUserProfileData({ role: newRole });
  };

  const logOut = async () => {
    localStorage.removeItem("scrapmandi_demo_user");
    setDemoMode(false);
    try {
      await signOut(auth);
    } catch (err) {
      console.error("SignOut error:", err);
    }
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      userProfile,
      loading,
      role: userProfile?.role || "guest",
      isAuthenticated: !!currentUser,
      demoMode,
      loginWithDemoRole,
      setupRecaptcha,
      sendPhoneOtp,
      signInGoogle,
      updateUserProfile: updateUserProfileData,
      switchRole,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
