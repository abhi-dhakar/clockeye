// src/components/clock/DigitalClock.jsx
import React from "react";

const DigitalClock = ({ time, isLarge = false, className = "" }) => {
  const parts = time.split(/[:\s]/);
  const hasAmPm = parts.length > 3;

  return (
    <div className={`font-mono flex items-baseline ${className}`}>
      <span
        className={`font-bold tracking-tight ${
          isLarge ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"
        } text-blue-400 dark:text-blue-600`}
      >
        {parts[0]}:{parts[1]}
      </span>
      <span
        className={`font-semibold ${
          isLarge ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        } text-slate-400 dark:text-slate-500 ml-1`}
      >
        :{parts[2]}
      </span>
      {hasAmPm && (
        <span
          className={`font-semibold ${
            isLarge ? "text-xl" : "text-sm"
          } text-slate-500 dark:text-slate-400 ml-2 uppercase`}
        >
          {parts[3]}
        </span>
      )}
    </div>
  );
};

export default React.memo(DigitalClock);