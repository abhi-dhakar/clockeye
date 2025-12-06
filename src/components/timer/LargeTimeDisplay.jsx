// src/components/timer/LargeTimeDisplay.jsx
import React from "react";

const TimeBlock = React.memo(({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-slate-800/80 dark:bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-700 dark:border-gray-300 shadow-lg">
      <span className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 dark:from-gray-900 dark:to-gray-600">
        {value}
      </span>
    </div>
    <span className="text-[10px] text-slate-500 dark:text-gray-400 mt-1 font-semibold tracking-wider">
      {label}
    </span>
  </div>
));

TimeBlock.displayName = "TimeBlock";

const LargeTimeDisplay = ({ time, isRunning }) => {
  const { h, m, s } = time;

  return (
    <div 
      className="flex items-center justify-center gap-1 mb-4"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <TimeBlock value={h} label="HR" />
      <span 
        className={`text-4xl font-bold text-blue-500 ${
          isRunning ? "animate-pulse" : ""
        }`}
      >
        :
      </span>
      <TimeBlock value={m} label="MIN" />
      <span 
        className={`text-4xl font-bold text-blue-500 ${
          isRunning ? "animate-pulse" : ""
        }`}
      >
        :
      </span>
      <TimeBlock value={s} label="SEC" />
    </div>
  );
};

export default React.memo(LargeTimeDisplay);