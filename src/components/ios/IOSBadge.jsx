import React from "react";

export const IOSBadge = ({
  children,
  color = "green", // green | blue | orange | red | gray | purple
  variant = "tinted", // tinted | filled
  className = "",
}) => {
  const colorMap = {
    green: {
      tinted: "bg-ios-green/15 text-ios-green border border-ios-green/25",
      filled: "bg-ios-green text-white",
    },
    blue: {
      tinted: "bg-ios-blue/15 text-ios-blue border border-ios-blue/25",
      filled: "bg-ios-blue text-white",
    },
    orange: {
      tinted: "bg-ios-orange/15 text-ios-orange border border-ios-orange/25",
      filled: "bg-ios-orange text-white",
    },
    red: {
      tinted: "bg-ios-red/15 text-ios-red border border-ios-red/25",
      filled: "bg-ios-red text-white",
    },
    purple: {
      tinted: "bg-ios-purple/15 text-ios-purple border border-ios-purple/25",
      filled: "bg-ios-purple text-white",
    },
    gray: {
      tinted: "bg-ios-gray5 text-ios-label2 border border-ios-separator/20",
      filled: "bg-ios-gray text-white",
    },
  };

  const selected = colorMap[color] || colorMap.green;
  const style = selected[variant] || selected.tinted;

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-tight px-2.5 py-0.5 rounded-full ${style} ${className}`}>
      {children}
    </span>
  );
};
