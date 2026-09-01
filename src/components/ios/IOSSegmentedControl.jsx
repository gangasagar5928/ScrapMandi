import React from "react";

export const IOSSegmentedControl = ({
  options = [], // array of { value, label, count }
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`inline-flex p-0.5 bg-ios-gray5 dark:bg-ios-gray5 rounded-[10px] w-full max-w-full overflow-x-auto select-none ${className}`}>
      <div className="flex w-full gap-0.5">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 py-1.5 px-3 rounded-[8px] text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-ios-bg2 text-ios-label shadow-sm shadow-black/5 dark:shadow-black/20"
                  : "text-ios-label2 hover:text-ios-label active:opacity-70 bg-transparent"
              }`}
            >
              <span>{opt.label}</span>
              {opt.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isSelected
                    ? "bg-ios-blue/15 text-ios-blue"
                    : "bg-ios-gray4/50 text-ios-label3"
                }`}>
                  {opt.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
