// src/components/clock/TimeZoneCard.jsx
import React from "react";
import { X, Sun, Moon, GripVertical } from "lucide-react";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";

const TimeZoneCard = ({
  zone,
  info,
  timeData,
  showAnalog,
  onRemove,
  isLocal = false,
  isDragging = false,
  dragHandleProps = {},
}) => {
  if (!timeData) return null;

  const { time, date, components, isDay, diff } = timeData;

  return (
    <div
      className={`group relative bg-slate-900/60 dark:bg-white/90 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
        isLocal
          ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
          : "border-slate-800/60 dark:border-gray-200 hover:border-slate-700 dark:hover:border-gray-300"
      } ${isDragging ? "opacity-50 scale-105" : "hover:scale-[1.02]"}`}
    >
      {/* Drag handle */}
      {!isLocal && (
        <div
          {...dragHandleProps}
          className="absolute top-3 left-3 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </div>
      )}

      {/* Remove button */}
      {!isLocal && onRemove && (
        <button
          onClick={() => onRemove(zone)}
          className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/20 z-10"
          title="Remove timezone"
        >
          <X className="w-4 h-4 text-slate-500 hover:text-rose-400" />
        </button>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{info.emoji}</span>
            <div>
              <h3 className="text-lg font-bold text-white dark:text-slate-900">
                {info.city}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {info.country}
              </p>
            </div>
          </div>

          {/* Day/Night indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-full ${
                isDay
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-indigo-500/20 text-indigo-400"
              }`}
            >
              {isDay ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Clock display */}
        <div className="flex flex-col items-center gap-4">
          {showAnalog && (
            <AnalogClock
              hours={components.hours}
              minutes={components.minutes}
              seconds={components.seconds}
              size={100}
              isDay={isDay}
            />
          )}

          <DigitalClock time={time} isLarge={!showAnalog} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50 dark:border-gray-200/50">
          <p className="text-sm text-slate-400 dark:text-slate-500">{date}</p>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isLocal
                  ? "bg-blue-500/20 text-blue-400"
                  : diff.includes("+")
                  ? "bg-emerald-500/20 text-emerald-400"
                  : diff.includes("-")
                  ? "bg-rose-500/20 text-rose-400"
                  : "bg-slate-700/50 text-slate-400"
              }`}
            >
              {diff}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {info.offset}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimeZoneCard);