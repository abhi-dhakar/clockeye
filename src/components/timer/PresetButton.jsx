// src/components/timer/PresetButton.jsx
import React from "react";

const PresetButton = ({ preset, isActive, onClick, disabled }) => {
  const Icon = preset.icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
        isActive
          ? `bg-gradient-to-r ${preset.color} text-white shadow-lg`
          : "bg-slate-800/60 dark:bg-gray-100 text-slate-400 dark:text-gray-500 hover:bg-slate-700 dark:hover:bg-gray-200 border border-slate-700 dark:border-gray-300"
      }`}
      aria-pressed={isActive}
      aria-label={`Set timer to ${preset.min} minutes - ${preset.label}`}
    >
      <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
      <span className="text-sm font-semibold">{preset.min}m</span>
    </button>
  );
};

export default React.memo(PresetButton);