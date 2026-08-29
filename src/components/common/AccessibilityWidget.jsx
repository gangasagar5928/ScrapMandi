import React, { useState, useEffect, useRef } from "react";
import { X, Accessibility, Check, Globe } from "lucide-react";

const FONT_SIZES = [
  { label: "A-",     size: "13px", key: "sm" },
  { label: "A",      size: "16px", key: "base", default: true },
  { label: "A+",     size: "19px", key: "lg" },
  { label: "Senior", size: "23px", key: "xl" },
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
  { label: "High Contrast",value: "contrast" },
];

export const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState("base");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");
  const panelRef = useRef(null);

  // 1. Dynamic Root Font Size Scaling (Scales all Tailwind rem units across entire app)
  const handleFontSizeChange = (key, size) => {
    setFontSize(key);
    document.documentElement.style.fontSize = size;
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
      // Load Google Translate script dynamically if not yet loaded
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
    const foundFont = FONT_SIZES.find(f => f.key === savedFont) || FONT_SIZES[1];
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

      {/* Floating trigger button in ScrapMandi green theme */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Accessibility Settings"
        title="Accessibility (सुगम्यता)"
        className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-emerald-400/40 cursor-pointer"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Accessibility Modal Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-6 z-[1000] w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 animate-slide-up a11y-widget text-slate-900"
          role="dialog"
          aria-label="Accessibility Settings Panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 uppercase tracking-wider">ACCESSIBILITY</span>
              <span className="text-base">🎖️</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Text Size */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              TEXT SIZE / आकार
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {FONT_SIZES.map((f) => (
                <button
                  key={f.key}
                  onClick={() => handleFontSizeChange(f.key, f.size)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                    fontSize === f.key
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Language */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span>LANGUAGE / भाषा</span>
              {lang !== "en" && (
                <span className="text-emerald-700 font-bold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded">
                  ✓ Active
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    lang === l.code
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Contrast Theme */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              CONTRAST THEME / थीम
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => handleThemeChange(t.value)}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    theme === t.value
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
};
