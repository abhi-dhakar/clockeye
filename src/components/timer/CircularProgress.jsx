// src/components/timer/CircularProgress.jsx
import React, { useMemo } from "react";
import { Timer } from "lucide-react";

const CircularProgress = ({ 
  progress, 
  isRunning, 
  showTimeInside, 
  timeDisplay,
  size = 260,
  strokeWidth = 10,
}) => {
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const strokeDashoffset = useMemo(() => {
    const clampedProgress = Math.min(100, Math.max(0, progress));
    return circumference - (clampedProgress / 100) * circumference;
  }, [progress, circumference]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl transition-opacity duration-1000 ${
          isRunning ? "opacity-100 animate-pulse" : "opacity-40"
        }`}
        style={{ width: size, height: size }}
      />

      {/* SVG Progress Ring */}
      <svg
        height={size}
        width={size}
        className="transform -rotate-90 drop-shadow-2xl"
        role="progressbar"
        aria-valuenow={Math.round(100 - progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Background circle */}
        <circle
          stroke="currentColor"
          className="text-slate-800 dark:text-gray-200"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        {/* Progress circle */}
        <circle
          stroke="url(#timerGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ 
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease-out",
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showTimeInside ? (
          <div className="flex flex-col items-center">
            <span 
              className="text-5xl font-mono font-black text-white dark:text-gray-900 tracking-tight"
              aria-live="polite"
              aria-atomic="true"
            >
              {timeDisplay}
            </span>
            <span className="text-xs text-slate-400 dark:text-gray-500 mt-2 uppercase tracking-widest">
              {isRunning ? "Running" : "Ready"}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Timer 
              className={`w-14 h-14 text-blue-400 dark:text-blue-600 ${
                isRunning ? "animate-pulse" : ""
              }`} 
            />
            <span className="text-xs text-slate-400 dark:text-gray-500 mt-2 uppercase tracking-widest">
              {isRunning ? "Running" : "Ready"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CircularProgress);