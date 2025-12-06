// src/components/stopwatch/StopwatchDisplay.jsx
import React from "react";

const StopwatchDisplay = ({ time, isRunning }) => {
  // Format time
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      milliseconds: String(milliseconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);
  const showHours = time >= 3600000;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Time Display */}
      <div className="relative flex items-center justify-center gap-1 lg:gap-2">
        {/* Hours (conditional) */}
        {showHours && (
          <>
            <TimeUnit value={hours} isRunning={isRunning} />
            <Separator isRunning={isRunning} />
          </>
        )}

        {/* Minutes */}
        <TimeUnit value={minutes} isRunning={isRunning} />
        <Separator isRunning={isRunning} />

        {/* Seconds */}
        <TimeUnit value={seconds} isRunning={isRunning} />
        <Separator isRunning={isRunning} small />

        {/* Milliseconds */}
        <TimeUnit value={milliseconds} isRunning={isRunning} small />
      </div>

      {/* Labels */}
      <div className="flex items-center justify-center gap-4 lg:gap-8 mt-4">
        {showHours && (
          <span className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-600 uppercase tracking-widest font-semibold">
            Hours
          </span>
        )}
        <span className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-600 uppercase tracking-widest font-semibold">
          {showHours ? "Min" : "Minutes"}
        </span>
        <span className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-600 uppercase tracking-widest font-semibold">
          {showHours ? "Sec" : "Seconds"}
        </span>
        <span className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-600 uppercase tracking-widest font-semibold">
          MS
        </span>
      </div>
    </div>
  );
};

// Time Unit Component with digital style
const TimeUnit = ({ value, isRunning, small }) => (
  <div
    className={`
    relative flex items-center justify-center
    ${small ? "w-16 lg:w-20" : "w-20 lg:w-28"}
    ${small ? "h-16 lg:h-20" : "h-20 lg:h-28"}
    rounded-2xl
    bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-gray-100 dark:to-gray-200
    border border-slate-700/50 dark:border-gray-300
    shadow-xl
    transition-all duration-300
    ${isRunning ? "shadow-emerald-500/20" : ""}
  `}
  >
    {/* Inner glow */}
    {isRunning && (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl"></div>
    )}

    {/* Digital number */}
    <span
      className={`
      relative z-10
      ${small ? "text-3xl lg:text-4xl" : "text-5xl lg:text-7xl"}
      font-bold
      tracking-wider
      transition-all duration-300
      digital-font
      ${
        isRunning
          ? "text-emerald-400 dark:text-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          : "text-slate-400 dark:text-slate-600"
      }
    `}
    >
      {value}
    </span>
  </div>
);

// Separator Component
const Separator = ({ isRunning, small }) => (
  <span
    className={`
    ${small ? "text-2xl lg:text-3xl mx-0" : "text-4xl lg:text-6xl mx-1"}
    font-bold
    transition-all duration-300
    digital-font
    ${
      isRunning
        ? "text-emerald-400 dark:text-emerald-600 animate-pulse"
        : "text-slate-600 dark:text-slate-400"
    }
  `}
  >
    {small ? "." : ":"}
  </span>
);

export default StopwatchDisplay;
