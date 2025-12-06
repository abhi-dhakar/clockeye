// src/components/stopwatch/ControlButton.jsx
import React from "react";

const ControlButton = ({
  onClick,
  variant = "default",
  icon: Icon,
  children,
  disabled = false,
}) => {
  const variants = {
    start:
      "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 dark:shadow-emerald-500/40",
    stop: "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 dark:shadow-amber-500/40",
    lap: "bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 dark:shadow-cyan-500/40",
    reset:
      "bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 dark:from-gray-300 dark:to-gray-400 dark:hover:from-gray-400 dark:hover:to-gray-500 text-white dark:text-slate-800 shadow-lg shadow-slate-900/30 dark:shadow-gray-400/30",
  };

  const disabledStyles = "opacity-40 cursor-not-allowed hover:shadow-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative
        flex items-center justify-center gap-2
        px-6 lg:px-8 py-3 lg:py-3.5
        rounded-xl lg:rounded-2xl
        font-semibold text-sm lg:text-base
        transition-all duration-300
        transform hover:scale-105 active:scale-95
        ${variants[variant]}
        ${disabled ? disabledStyles : ""}
        overflow-hidden
      `}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Content */}
      {Icon && (
        <Icon
          className="w-4 h-4 lg:w-5 lg:h-5 relative z-10"
          strokeWidth={2.5}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ControlButton;
