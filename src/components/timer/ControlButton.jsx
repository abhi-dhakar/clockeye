// src/components/timer/ControlButton.jsx
import React from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 text-white shadow-xl shadow-blue-500/40",
  secondary:
    "bg-slate-800 dark:bg-gray-200 hover:bg-slate-700 dark:hover:bg-gray-300 text-slate-300 dark:text-gray-700 border border-slate-700 dark:border-gray-300",
  danger:
    "bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white shadow-xl shadow-red-500/40",
  success:
    "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white shadow-xl shadow-green-500/40",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const ControlButton = ({ 
  onClick, 
  variant = "primary", 
  size = "lg",
  children, 
  icon: Icon, 
  disabled,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`
        flex items-center justify-center gap-3 rounded-2xl font-bold 
        transition-all duration-300 transform hover:scale-105 active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${variants[variant]} 
        ${sizes[size]}
        ${className}
      `}
      aria-label={ariaLabel}
    >
      {Icon && <Icon className="w-6 h-6" />}
      {children}
    </button>
  );
};

export default React.memo(ControlButton);