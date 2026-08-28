import React, { useState, useEffect, useRef } from "react";
import { X, Accessibility } from "lucide-react";

const FONT_SIZES = [
  { label: "A-",     cls: "text-sm-mode",   key: "sm"  },
  { label: "A",      cls: "text-base-mode",  key: "base", default: true },
  { label: "A+",     cls: "text-lg-mode",    key: "lg"  },
  { label: "Senior", cls: "text-xl-mode",    key: "xl"  },
];

const LANGUAGES = [
  { label: "EN",    code: "en" },
  { label: "हिंदी",  code: "hi" },
  { label: "ਪੰਜਾਬੀ", code: "pa" },
  { label: "தமிழ்", code: "ta" },
  { label: "తెలుగు", code: "te" },
  { label: "मराठी",  code: "mr" },
  { label: "বাংলা",  code: "bn" },
];

const THEMES = [
  { label: "Light",   value: "light" },
  { label: "Dark",    value: "dark"  },
];

export const AccessibilityWidget = () => {
  const [open, setOpen]           = useState(false);
  const [fontSize, setFontSize]   = useState("base");
  const [lang, setLang]           = useState("en");
  const [theme, setTheme]         = useState("light");
  const panelRef = useRef(null);

  // Apply font size class to body
  useEffect(() => {
    const body = document.body;
    FONT_SIZES.forEach(f => body.classList.remove(f.cls));
    const active = FONT_SIZES.find(f => f.key === fontSize);
    if (active) body.classList.add(active.cls);
  }, [fontSize]);

  // Apply theme: dark mode / high-contrast
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      document.body.classList.remove("high-contrast");
    } else if (theme === "contrast") {
      document.body.classList.add("high-contrast");
      html.classList.remove("dark");
    } else {
      html.classList.remove("dark");
      document.body.classList.remove("high-contrast");
    }
  }, [theme]);

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
      {/* ── Floating trigger button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Accessibility Settings"
        title="Accessibility (सुगम्यता)"
        className="fixed bottom-6 right-6 z-[999] w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-emerald-400/40"
        style={{ width: 52, height: 52 }}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 z-[1000] w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 animate-slide-up a11y-widget"
          role="dialog"
          aria-label="Accessibility Settings Panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 uppercase tracking-wider">Accessibility</span>
              <span className="text-base">♿</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Text Size */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Text Size / आकार
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {FONT_SIZES.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFontSize(f.key)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    fontSize === f.key
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-400/30"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Language / भाषा
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    lang === l.code
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {lang !== "en" && (
              <p className="text-[10px] text-slate-400 mt-1.5 italic">
                Translation coming soon / जल्द आएगा
              </p>
            )}
          </div>

          {/* Contrast Theme */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Contrast Theme / थीम
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    theme === t.value
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-400/30"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <button
                onClick={() => setTheme("contrast")}
                className={`py-2 rounded-xl text-xs font-bold border transition col-span-1 ${
                  theme === "contrast"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:border-emerald-400"
                }`}
              >
                High
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
