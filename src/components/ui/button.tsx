"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "rounded";
  withShadow?: boolean;
}

export default function ButtonUI({
  size = "md",
  variant = "primary",
  withShadow = false,
  className,
  style,
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-[var(--primary-600)]  rounded-xl",
    secondary:
      "bg-white text-black hover:bg-gray-300  rounded-xl",
    outline:
      "border border-black text-black hover:bg-black hover:text-white  rounded-xl",
    rounded:
     "font-semibold text-black transition-all duration-300 " +
      "bg-primary-600 border-[3px] border-[#18191F] " +
      "shadow-[4px_4px_0px_#151528] rounded-full " +
      "hover:bg-[#FDD132]",
  };

  const shadowStyles = withShadow
    ? { border: "3px solid #18191F", boxShadow: "4px 4px 0px #151528", ...style }
    : style;

  return (
    <button
      className={clsx(
        "font-semibold transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={shadowStyles}
      {...props}
    >
      {children}
    </button>
  );
}
