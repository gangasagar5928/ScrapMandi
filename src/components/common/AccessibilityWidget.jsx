import React, { useState, useEffect, useRef } from "react";
import { X, Accessibility, Check } from "lucide-react";
import { IOSSegmentedControl } from "../ios/IOSSegmentedControl";

const FONT_SIZES = [
  { label: "A-",     size: "13px", value: "sm" },
  { label: "A",      size: "16px", value: "base" },
  { label: "A+",     size: "19px", value: "lg" },
  { label: "Senior", size: "23px", value: "xl" },
];

const LANGUAGES = [
  { label: "EN",    code: "en", name: "English" },
  { label: "हिंदी",  code: "hi", name: "Hindi" },
  { label: "ਪੰਜਾਬੀ", code: "pa", name: "Punjabi" },
  { label: "தமிழ்", code: "ta", name: "Tamil" },
  { label: "తెలుగు", code: "te", name: "Telugu" },
  { label: "मराठी",  code: "mr", name: "Marathi" },
  { label: "বাংলা",  code: "bn", name: "Bengali" },
];

const THEMES = [
  { label: "Light",        value: "light" },
  { label: "Dark",         value: "dark" },
  { label: "Contrast",    value: "contrast" },
];

export const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState("base");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");
  const panelRef = useRef(null);

  // 1. Dynamic Root Font Size Scaling (Scales all Tailwind rem units across entire app)
  const handleFontSizeChange = (key) => {
    const found = FONT_SIZES.find(f => f.value === key) || FONT_SIZES[1];
    setFontSize(key);
    document.documentElement.style.fontSize = found.size;
    localStorage.setItem("scrapmandi_a11y_font", key);
  };

  // 2. Dynamic Dark Mode & High Contrast Switching
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    const html = document.documentElement;
    
    html.classList.remove("dark", "high-contrast");
    if (selectedTheme === "dark") {
      html.classList.add("dark");
    } else if (selectedTheme === "contrast") {
      html.classList.add("high-contrast");
    }
    localStorage.setItem("scrapmandi_a11y_theme", selectedTheme);
  };

  // 3. Indian Multi-Language Translation
  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    localStorage.setItem("scrapmandi_a11y_lang", selectedLang);

    // Set cookie for Google Translate element if present
    document.cookie = `googtrans=/auto/${selectedLang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/auto/${selectedLang}; path=/;`;

    // Trigger translate widget
    if (window.google && window.google.translate) {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = selectedLang;
        select.dispatchEvent(new Event("change"));
      }
    } else if (selectedLang !== "en") {
      if (!document.getElementById("google-translate-script")) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", autoDisplay: false },
            "google_translate_element"
          );
        };
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    }
  };

  // Restore saved preferences on mount
  useEffect(() => {
    const savedFont = localStorage.getItem("scrapmandi_a11y_font") || "base";
    const foundFont = FONT_SIZES.find(f => f.value === savedFont) || FONT_SIZES[1];
    setFontSize(savedFont);
    document.documentElement.style.fontSize = foundFont.size;

    const savedTheme = localStorage.getItem("scrapmandi_a11y_theme") || "light";
    handleThemeChange(savedTheme);

    const savedLang = localStorage.getItem("scrapmandi_a11y_lang") || "en";
    setLang(savedLang);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      {/* Hidden container for Google Translate */}
      <div id="google_translate_element" className="hidden" />

      {/* Floating iOS Accessibility Trigger Button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Accessibility Settings"
        title="Accessibility (सुगम्यता)"
        className="fixed bottom-20 right-3.5 md:bottom-6 md:right-6 z-[890] w-11 h-11 md:w-12 md:h-12 rounded-full bg-ios-blue text-white shadow-ios-card dark:shadow-ios-card-dark flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-white/20 cursor-pointer select-none"
      >
        <Accessibility className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* iOS Accessibility Modal Sheet */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-32 right-3 md:bottom-20 md:right-6 z-[1000] w-[calc(100vw-24px)] max-w-sm sm:w-80 bg-ios-bg2 text-ios-label border border-ios-separator/20 rounded-[24px] shadow-ios-modal p-5 animate-slide-up select-none"
          role="dialog"
          aria-label="Accessibility Settings Panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-ios-separator/15">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ios-label uppercase tracking-wider">Accessibility</span>
              <span className="text-sm">⚙️</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-ios-label3 hover:text-ios-label p-1 rounded-full active:bg-ios-bg3 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Text Size Segmented Control */}
          <div className="mb-4 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ios-label2">
              TEXT SIZE / आकार
            </p>
            <IOSSegmentedControl
              options={FONT_SIZES}
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>

          {/* 2. Language Pills */}
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ios-label2">
                LANGUAGE / भाषा
              </p>
              {lang !== "en" && (
                <span className="text-ios-green font-bold text-[9px] bg-ios-green/10 px-1.5 py-0.2 rounded-full">
                  ✓ Active
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLanguageChange(l.code)}
                  className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition active:scale-95 cursor-pointer ${
                    lang === l.code
                      ? "bg-ios-blue text-white shadow-xs"
                      : "bg-ios-bg3 text-ios-label2 hover:text-ios-label"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Theme Segmented Control */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ios-label2">
              THEME / थीम
            </p>
            <IOSSegmentedControl
              options={THEMES}
              value={theme}
              onChange={handleThemeChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
