// src/components/alarm/AlarmCard.jsx
import React from "react";
import { X, Clock, Bell, BellOff, Calendar, MoreVertical } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import { DAYS_OF_WEEK } from "../../data/alarmPresets";

const AlarmCard = ({
  alarm,
  formatTime12h,
  getTimeUntilAlarm,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const timeUntil = alarm.isSet ? getTimeUntilAlarm(alarm.time) : null;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        alarm.isSet
          ? "bg-slate-800/80 dark:bg-white border-slate-700 dark:border-gray-200 shadow-lg"
          : "bg-slate-900/40 dark:bg-gray-100/50 border-slate-800/50 dark:border-gray-300/50 opacity-60"
      }`}
    >
      {/* Accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          alarm.isSet ? "bg-blue-500" : "bg-slate-600"
        }`}
      />

      <div className="p-4 pl-5">
        <div className="flex items-center justify-between">
          {/* Left side - Time and info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl font-mono font-bold tracking-tight ${
                  alarm.isSet
                    ? "text-white dark:text-slate-900"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {formatTime12h(alarm.time)}
              </span>
              {alarm.snoozeCount > 0 && (
                <span className="text-xs font-medium text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                  Snoozed {alarm.snoozeCount}x
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span
                className={`text-sm ${
                  alarm.isSet
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {alarm.label}
              </span>

              {timeUntil && (
                <span className="flex items-center gap-1 text-xs text-blue-400 dark:text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" />
                  {timeUntil}
                </span>
              )}
            </div>

            {/* Repeat days */}
            {alarm.repeatDays && alarm.repeatDays.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                {DAYS_OF_WEEK.map((day) => (
                  <span
                    key={day.index}
                    className={`w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full ${
                      alarm.repeatDays.includes(day.index)
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-slate-700/50 dark:bg-gray-200 text-slate-500"
                    }`}
                  >
                    {day.short}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            <ToggleSwitch checked={alarm.isSet} onChange={() => onToggle(alarm.id)} />

            <button
              onClick={() => onDelete(alarm.id)}
              className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete alarm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AlarmCard);