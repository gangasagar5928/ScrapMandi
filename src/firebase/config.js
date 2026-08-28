import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Load configuration securely from Vite environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC5RhoN5Jg0j-N-YNuThuHf2fn1aztg_Jc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "scrapmandi5928.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "scrapmandi5928",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "scrapmandi5928.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "616129398050",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:616129398050:web:9acb556e3389fd1566917b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4C62KMG8F9"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firebase Analytics conditionally in supported browser environments
export let analytics = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics fallback for environments with tracking protection
  });
}

export default app;
