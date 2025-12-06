// src/components/fullscreen/FullscreenButton.jsx
import React, { useState } from "react";
import { Maximize, Minimize, Expand, Shrink } from "lucide-react";
import { useFullscreenContext } from "../../contexts/FullscreenContext";

const FullscreenButton = ({
  mode,
  className = "",
  size = "md",
  variant = "default",
  showLabel = false,
  showTooltip = true,
}) => {
  const { isFullscreen, isSupported, openFullscreenMode, closeFullscreenMode } =
    useFullscreenContext();
  const [showTooltipState, setShowTooltipState] = useState(false);

  if (!isSupported) return null;

  const sizes = {
    sm: {
      button: "px-3 py-2",
      icon: "w-4 h-4",
      text: "text-xs",
    },
    md: {
      button: "px-4 py-2.5",
      icon: "w-5 h-5",
      text: "text-sm",
    },
    lg: {
      button: "px-5 py-3",
      icon: "w-6 h-6",
      text: "text-base",
    },
  };

  const variants = {
    default: `
      bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-100 dark:to-gray-200
      border border-slate-700 dark:border-gray-300
      text-slate-200 dark:text-slate-800
      hover:from-slate-700 hover:to-slate-800 dark:hover:from-gray-200 dark:hover:to-gray-300
      hover:border-emerald-500/50 dark:hover:border-emerald-500/60
      shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/30
    `,
    primary: `
      bg-gradient-to-br from-emerald-500 to-emerald-600
      hover:from-emerald-600 hover:to-emerald-700
      border border-emerald-400/50
      text-white
      shadow-lg shadow-emerald-500/30
      hover:shadow-emerald-500/50
    `,
    secondary: `
      bg-gradient-to-br from-cyan-500 to-cyan-600
      hover:from-cyan-600 hover:to-cyan-700
      border border-cyan-400/50
      text-white
      shadow-lg shadow-cyan-500/30
      hover:shadow-cyan-500/50
    `,
    outline: `
      bg-transparent
      border-2 border-slate-700 dark:border-gray-300
      text-slate-300 dark:text-slate-700
      hover:bg-slate-800/50 dark:hover:bg-gray-200/50
      hover:border-emerald-500 dark:hover:border-emerald-600
    `,
    ghost: `
      bg-transparent
      border border-transparent
      text-slate-400 dark:text-slate-600
      hover:bg-slate-800/30 dark:hover:bg-gray-200/50
      hover:text-emerald-400 dark:hover:text-emerald-600
    `,
  };

  const handleClick = () => {
    if (isFullscreen) {
      closeFullscreenMode();
    } else {
      openFullscreenMode(mode);
    }
  };

  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";
  const sizeConfig = sizes[size];

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltipState(true)}
        onMouseLeave={() => setShowTooltipState(false)}
        className={`
          group relative
          inline-flex items-center justify-center gap-2
          rounded-xl
          font-semibold
          transition-all duration-300
          transform hover:scale-105 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          overflow-hidden
          ${variants[variant]}
          ${sizeConfig.button}
          ${className}
        `}
        title={label}
        aria-label={label}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Icon */}
        <Icon
          className={`${sizeConfig.icon} relative z-10 transition-transform group-hover:rotate-12`}
          strokeWidth={2.5}
        />

        {/* Label */}
        {showLabel && (
          <span
            className={`${sizeConfig.text} relative z-10 whitespace-nowrap`}
          >
            {isFullscreen ? "Exit" : "Fullscreen"}
          </span>
        )}

        {/* Ripple effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Tooltip */}
      {showTooltip && showTooltipState && !showLabel && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-gray-800 text-white dark:text-gray-100 text-xs font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-slate-900 dark:border-t-gray-800" />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(FullscreenButton);
