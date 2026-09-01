import React from "react";

export const IOSCard = ({
  children,
  className = "",
  title = null,
  subtitle = null,
  footer = null,
  onClick = null,
  inset = false,
  ...props
}) => {
  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      {title && (
        <div className="px-4 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ios-label2/70">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-ios-label3">{subtitle}</span>
          )}
        </div>
      )}

      <div
        onClick={onClick}
        className={`bg-ios-bg2 text-ios-label rounded-[16px] border border-ios-separator/20 shadow-ios-card dark:shadow-ios-card-dark overflow-hidden transition-all ${
          onClick ? "cursor-pointer active:bg-ios-bg3/60 active:scale-[0.995]" : ""
        } ${inset ? "mx-4" : ""}`}
      >
        {children}
      </div>

      {footer && (
        <p className="px-4 text-xs text-ios-label3 leading-relaxed">
          {footer}
        </p>
      )}
    </div>
  );
};

export const IOSRow = ({
  icon: Icon,
  iconBg = "bg-ios-blue",
  label,
  value,
  subtitle,
  chevron = false,
  divider = true,
  onClick,
  trailing,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between px-4 py-3.5 bg-ios-bg2 text-ios-label transition select-none ${
        onClick ? "cursor-pointer active:bg-ios-bg3/60" : ""
      } ${divider ? "border-b border-ios-separator/15 last:border-b-0" : ""} ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        {Icon && (
          <div className={`w-7 h-7 rounded-[7px] ${iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-ios-label truncate">{label}</p>
          {subtitle && <p className="text-xs text-ios-label2 truncate mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {value && <span className="text-sm text-ios-label2 font-normal">{value}</span>}
        {trailing}
        {chevron && (
          <svg className="w-4 h-4 text-ios-gray3 group-hover:text-ios-gray2 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </div>
  );
};
