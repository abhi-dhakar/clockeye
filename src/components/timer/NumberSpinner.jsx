// src/components/timer/NumberSpinner.jsx
import React, { useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const NumberSpinner = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 59, 
  label,
  disabled = false,
}) => {
  const increment = useCallback(() => {
    onChange(Math.min(max, Number(value) + 1));
  }, [value, max, onChange]);

  const decrement = useCallback(() => {
    onChange(Math.max(min, Number(value) - 1));
  }, [value, min, onChange]);

  const handleChange = useCallback((e) => {
    const newValue = Number(e.target.value) || 0;
    onChange(Math.min(max, Math.max(min, newValue)));
  }, [min, max, onChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  }, [increment, decrement]);

  return (
    <div className="flex flex-col items-center">
      <label 
        className="text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-2"
        htmlFor={`spinner-${label}`}
      >
        {label}
      </label>
      <div className="flex flex-col items-center bg-slate-800/60 dark:bg-gray-100 rounded-2xl p-2 border border-slate-700 dark:border-gray-300 shadow-inner">
        <button
          onClick={increment}
          disabled={disabled || value >= max}
          className="p-2 hover:bg-slate-700 dark:hover:bg-gray-200 rounded-xl transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          aria-label={`Increase ${label}`}
        >
          <ChevronUp className="w-5 h-5 text-blue-400 dark:text-blue-600" />
        </button>
        <input
          id={`spinner-${label}`}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-14 h-12 text-center text-2xl font-mono font-bold bg-transparent text-white dark:text-gray-900 outline-none border-y border-slate-700 dark:border-gray-300 disabled:opacity-50"
          aria-label={label}
        />
        <button
          onClick={decrement}
          disabled={disabled || value <= min}
          className="p-2 hover:bg-slate-700 dark:hover:bg-gray-200 rounded-xl transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          aria-label={`Decrease ${label}`}
        >
          <ChevronDown className="w-5 h-5 text-blue-400 dark:text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(NumberSpinner);