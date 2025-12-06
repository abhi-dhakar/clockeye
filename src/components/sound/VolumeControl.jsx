// src/components/sound/VolumeControl.jsx
import React from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

const VolumeControl = ({ 
  value, 
  onChange, 
  label = "Volume",
  min = 0,
  max = 100,
  step = 1,
  showPercentage = true,
  className = "",
}) => {
  const getVolumeIcon = () => {
    if (value === 0) return VolumeX;
    if (value < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  const handleClick = () => {
    // Toggle mute
    onChange(value === 0 ? 50 : 0);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-400 dark:text-gray-500">
            {label}
          </label>
          {showPercentage && (
            <span className="text-sm font-mono text-slate-500">{value}%</span>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleClick}
          className="p-2 rounded-lg bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-600 hover:bg-slate-600 dark:hover:bg-gray-300 transition-colors"
        >
          <VolumeIcon className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 dark:bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #334155 ${value}%, #334155 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(VolumeControl);