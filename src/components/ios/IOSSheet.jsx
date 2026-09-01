import React, { useEffect } from "react";
import { X } from "lucide-react";

export const IOSSheet = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  leftAction,
  rightAction,
  maxHeight = "max-h-[90vh]",
  className = "",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
      {/* Backdrop with fade */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div
        className={`relative w-full sm:max-w-lg bg-ios-bg rounded-t-[24px] sm:rounded-[24px] border border-ios-separator/20 shadow-ios-modal flex flex-col overflow-hidden z-10 animate-slide-up ${maxHeight} ${className}`}
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
        }}
      >
        {/* Top Grabber Indicator on Mobile */}
        <div className="w-full flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-9 h-1 rounded-full bg-ios-gray3 dark:bg-ios-gray4" />
        </div>

        {/* iOS Navigation Header Bar */}
        <div className="px-4 py-3 border-b border-ios-separator/20 flex items-center justify-between bg-ios-bg2/80 ios-blur">
          <div>
            {leftAction ? (
              leftAction
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-ios-blue text-sm font-normal active:opacity-60 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="text-center min-w-0 px-2">
            <h3 className="text-base font-semibold text-ios-label truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-ios-label2 truncate">{subtitle}</p>
            )}
          </div>

          <div>
            {rightAction ? (
              rightAction
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-ios-blue text-sm font-semibold active:opacity-60 cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
