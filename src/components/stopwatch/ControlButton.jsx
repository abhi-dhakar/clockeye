// src/components/stopwatch/ControlButton.jsx
import React from "react";

const variants = {
  start: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-500/30",
  stop: "bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-500/30",
  lap: "bg-slate-900/80 dark:bg-gray-100 text-emerald-400 dark:text-emerald-600 border border-slate-700 dark:border-gray-300 hover:bg-slate-800 dark:hover:bg-gray-200",
  reset: "bg-slate-800/80 dark:bg-gray-200 text-slate-300 dark:text-slate-700 border border-slate-700 dark:border-gray-300 hover:bg-slate-700 dark:hover:bg-gray-300",
};

const sizes = {
  sm: "px-5 py-2 text-xs",
  md: "px-8 py-3 text-sm",
  lg: "px-10 py-3.5 text-sm",
};

const ControlButton = ({
  onClick,
  variant = "start",
  size = "md",
  disabled = false,
  children,
  icon: Icon,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wider
        transition-all duration-300 transform hover:scale-105 active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default React.memo(ControlButton);