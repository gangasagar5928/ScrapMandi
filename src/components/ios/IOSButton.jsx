import React from "react";

export const IOSButton = ({
  children,
  onClick,
  variant = "filled", // filled | tinted | gray | plain | destructive
  color = "blue",     // blue | green | orange | red
  size = "md",        // sm | md | lg
  fullWidth = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-[10px] gap-1.5",
    md: "px-4 py-2.5 text-sm font-semibold rounded-[12px] gap-2",
    lg: "px-5 py-3.5 text-base font-bold rounded-[14px] gap-2.5",
  };

  const colorVariants = {
    blue: {
      filled: "bg-ios-blue text-white hover:brightness-110 active:brightness-90 shadow-sm",
      tinted: "bg-ios-blue/15 text-ios-blue hover:bg-ios-blue/20 active:bg-ios-blue/25",
      plain: "text-ios-blue hover:opacity-80 active:opacity-60 bg-transparent",
    },
    green: {
      filled: "bg-ios-green text-white hover:brightness-110 active:brightness-90 shadow-sm",
      tinted: "bg-ios-green/15 text-ios-green hover:bg-ios-green/20 active:bg-ios-green/25",
      plain: "text-ios-green hover:opacity-80 active:opacity-60 bg-transparent",
    },
    orange: {
      filled: "bg-ios-orange text-white hover:brightness-110 active:brightness-90 shadow-sm",
      tinted: "bg-ios-orange/15 text-ios-orange hover:bg-ios-orange/20 active:bg-ios-orange/25",
      plain: "text-ios-orange hover:opacity-80 active:opacity-60 bg-transparent",
    },
    red: {
      filled: "bg-ios-red text-white hover:brightness-110 active:brightness-90 shadow-sm",
      tinted: "bg-ios-red/15 text-ios-red hover:bg-ios-red/20 active:bg-ios-red/25",
      plain: "text-ios-red hover:opacity-80 active:opacity-60 bg-transparent",
    },
  };

  let variantStyle = "";
  if (variant === "gray") {
    variantStyle = "bg-ios-gray5 dark:bg-ios-gray5 text-ios-label hover:bg-ios-gray4 active:bg-ios-gray3";
  } else if (variant === "destructive") {
    variantStyle = "bg-ios-red text-white hover:brightness-110 active:brightness-90";
  } else {
    const selectedColor = colorVariants[color] || colorVariants.blue;
    variantStyle = selectedColor[variant] || selectedColor.filled;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all duration-150 active:scale-[0.98] select-none cursor-pointer disabled:opacity-45 disabled:pointer-events-none disabled:active:scale-100 ${
        sizeClasses[size] || sizeClasses.md
      } ${variantStyle} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
    </button>
  );
};
