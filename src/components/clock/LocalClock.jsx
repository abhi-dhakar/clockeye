// src/components/clock/LocalClock.jsx
import React from "react";
import { MapPin, Sun, Moon } from "lucide-react";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";

const LocalClock = ({ zone, info, timeData, showAnalog }) => {
  if (!timeData) return null;

  const { time, date, components, isDay } = timeData;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-50 dark:to-white rounded-3xl border border-slate-700/50 dark:border-gray-200 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${
            isDay
              ? "bg-amber-500/20"
              : "bg-indigo-500/20"
          }`}
        />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl bg-blue-500/10" />
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white dark:text-slate-900">
                {info.city}
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Your Local Time
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              isDay
                ? "bg-amber-500/20 text-amber-400"
                : "bg-indigo-500/20 text-indigo-400"
            }`}
          >
            {isDay ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm font-medium">{isDay ? "Day" : "Night"}</span>
          </div>
        </div>

        {/* Clock display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {showAnalog && (
            <AnalogClock
              hours={components.hours}
              minutes={components.minutes}
              seconds={components.seconds}
              size={160}
              isDay={isDay}
            />
          )}

          <div className="flex flex-col items-center sm:items-start">
            <DigitalClock time={time} isLarge className="mb-2" />
            <p className="text-lg text-slate-400 dark:text-slate-500">{date}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {info.offset} • {info.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LocalClock);