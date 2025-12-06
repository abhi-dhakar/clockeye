// src/components/stopwatch/StopwatchDisplay.jsx
import React, { useMemo } from "react";

const formatTime = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  return {
    h: hours.toString().padStart(2, "0"),
    m: minutes.toString().padStart(2, "0"),
    s: seconds.toString().padStart(2, "0"),
    ms: milliseconds.toString().padStart(2, "0"),
    hasHours: hours > 0,
  };
};

const StopwatchDisplay = ({ time, isRunning, size = "large" }) => {
  const { h, m, s, ms, hasHours } = useMemo(() => formatTime(time), [time]);

  const sizeClasses = {
    large: {
      container: "w-72 h-72 sm:w-80 sm:h-80",
      mainTime: "text-6xl sm:text-7xl",
      milliseconds: "text-3xl sm:text-4xl",
      hours: "text-4xl sm:text-5xl",
    },
    medium: {
      container: "w-56 h-56",
      mainTime: "text-4xl sm:text-5xl",
      milliseconds: "text-xl sm:text-2xl",
      hours: "text-3xl",
    },
    small: {
      container: "w-40 h-40",
      mainTime: "text-3xl",
      milliseconds: "text-lg",
      hours: "text-2xl",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div
        className={`absolute -inset-3 bg-gradient-to-tr from-emerald-500 via-cyan-400 to-blue-600 rounded-full blur-2xl transition-opacity duration-700 ${
          isRunning ? "opacity-40 animate-pulse" : "opacity-20 group-hover:opacity-40"
        }`}
      />

      {/* Main circle */}
      <div
        className={`relative ${classes.container} bg-slate-950/90 dark:bg-white/95 rounded-full border-2 border-slate-800/60 dark:border-gray-200 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl`}
      >
        {/* Running indicator ring */}
        {isRunning && (
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-ping" />
        )}

        {/* Time display */}
        <div className="flex flex-col items-center">
          {/* Hours (if applicable) */}
          {hasHours && (
            <div className="flex items-center mb-1">
              <span className={`${classes.hours} font-mono font-bold text-emerald-400 dark:text-emerald-600`}>
                {h}
              </span>
              <span className={`${classes.hours} font-mono font-bold text-slate-500 dark:text-slate-400 mx-1`}>
                :
              </span>
            </div>
          )}

          {/* Main time (minutes:seconds) */}
          <div className="flex items-end font-mono leading-none">
            <span className={`${classes.mainTime} font-bold text-slate-50 dark:text-slate-900 tracking-tight`}>
              {hasHours ? `${m}:${s}` : `${m}:${s}`}
            </span>
            <span className={`${classes.milliseconds} font-semibold text-emerald-400 dark:text-emerald-600 mb-1 ml-1`}>
              .{ms}
            </span>
          </div>

          {/* Labels */}
          <div className="mt-3 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {hasHours && <span>Hours</span>}
            <span>Min</span>
            <span>Sec</span>
            <span>Ms</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute bottom-6 flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              isRunning ? "bg-emerald-500 animate-pulse" : time > 0 ? "bg-yellow-500" : "bg-slate-600"
            }`}
          />
          <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StopwatchDisplay);