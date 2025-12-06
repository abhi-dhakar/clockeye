// src/components/alarm/AlarmPresets.jsx
import React from "react";
import { Zap } from "lucide-react";
import { ALARM_PRESETS } from "../../data/alarmPresets";

const AlarmPresets = ({ onSelect, existingTimes = [] }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-slate-300 dark:text-slate-700 uppercase tracking-wider">
          Quick Presets
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ALARM_PRESETS.map((preset) => {
          const exists = existingTimes.includes(preset.time24h);

          return (
            <button
              key={preset.time24h}
              onClick={() => !exists && onSelect(preset.time24h, { label: preset.label })}
              disabled={exists}
              className={`group p-3 rounded-xl border transition-all ${
                exists
                  ? "bg-slate-900/30 dark:bg-gray-200/50 border-slate-800/50 dark:border-gray-300/50 cursor-default opacity-50"
                  : "bg-slate-800/50 dark:bg-gray-100 border-slate-700 dark:border-gray-300 hover:border-blue-500 hover:bg-slate-700/50 dark:hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{preset.icon}</span>
                <span className="text-sm font-semibold text-slate-300 dark:text-slate-700">
                  {preset.label}
                </span>
              </div>
              <p className="text-lg font-mono font-bold text-blue-400 dark:text-blue-600">
                {preset.label.includes("PM") || parseInt(preset.time24h) >= 12
                  ? `${parseInt(preset.time24h) > 12 ? parseInt(preset.time24h) - 12 : parseInt(preset.time24h)}:${preset.time24h.split(":")[1]} PM`
                  : `${parseInt(preset.time24h)}:${preset.time24h.split(":")[1]} AM`}
              </p>
              {exists && (
                <span className="text-xs text-slate-500">Already set</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(AlarmPresets);