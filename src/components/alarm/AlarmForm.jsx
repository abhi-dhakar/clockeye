// src/components/alarm/AlarmForm.jsx
import React, { useState, useMemo } from "react";
import { Plus, Clock, Calendar } from "lucide-react";
import { DAYS_OF_WEEK } from "../../data/alarmPresets";

const AlarmForm = ({ onAdd }) => {
  // Default to next hour
  const defaultTime = useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0);
    return `${now.getHours().toString().padStart(2, "0")}:00`;
  }, []);

  const [time, setTime] = useState(defaultTime);
  const [label, setLabel] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const toggleDay = (dayIndex) => {
    setRepeatDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex].sort()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time) return;

    onAdd(time, {
      label: label.trim() || undefined,
      repeatDays: repeatDays.length > 0 ? repeatDays : undefined,
    });

    // Reset form
    setLabel("");
    setRepeatDays([]);
    setShowOptions(false);
  };

  const selectWeekdays = () => setRepeatDays([1, 2, 3, 4, 5]);
  const selectWeekends = () => setRepeatDays([0, 6]);
  const selectEveryday = () => setRepeatDays([0, 1, 2, 3, 4, 5, 6]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Time input */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="text-5xl sm:text-6xl font-mono font-bold p-4 rounded-2xl border-2 border-slate-700 dark:border-gray-300 bg-slate-800/50 dark:bg-white text-white dark:text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          ADD ALARM
        </button>
      </div>

      {/* Options toggle */}
      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 dark:text-slate-500 dark:hover:text-slate-600 transition-colors"
      >
        <Calendar className="w-4 h-4" />
        {showOptions ? "Hide options" : "Add label & repeat"}
      </button>

      {/* Additional options */}
      {showOptions && (
        <div className="space-y-4 p-4 bg-slate-800/30 dark:bg-gray-100/50 rounded-xl border border-slate-700/50 dark:border-gray-300/50">
          {/* Label input */}
          <div>
            <label className="block text-sm font-medium text-slate-400 dark:text-slate-500 mb-2">
              Label (optional)
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Wake up, Meeting, Workout..."
              className="w-full px-4 py-3 bg-slate-900/50 dark:bg-white border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              maxLength={50}
            />
          </div>

          {/* Repeat days */}
          <div>
            <label className="block text-sm font-medium text-slate-400 dark:text-slate-500 mb-2">
              Repeat
            </label>

            {/* Quick select */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={selectWeekdays}
                className="text-xs px-3 py-1.5 bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-slate-600 rounded-lg hover:bg-slate-600 dark:hover:bg-gray-300 transition-colors"
              >
                Weekdays
              </button>
              <button
                type="button"
                onClick={selectWeekends}
                className="text-xs px-3 py-1.5 bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-slate-600 rounded-lg hover:bg-slate-600 dark:hover:bg-gray-300 transition-colors"
              >
                Weekends
              </button>
              <button
                type="button"
                onClick={selectEveryday}
                className="text-xs px-3 py-1.5 bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-slate-600 rounded-lg hover:bg-slate-600 dark:hover:bg-gray-300 transition-colors"
              >
                Everyday
              </button>
              {repeatDays.length > 0 && (
                <button
                  type="button"
                  onClick={() => setRepeatDays([])}
                  className="text-xs px-3 py-1.5 text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Day buttons */}
            <div className="flex gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day.index}
                  type="button"
                  onClick={() => toggleDay(day.index)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all ${
                    repeatDays.includes(day.index)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-slate-700 dark:bg-gray-200 text-slate-400 dark:text-slate-500 hover:bg-slate-600 dark:hover:bg-gray-300"
                  }`}
                  title={day.full}
                >
                  {day.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default React.memo(AlarmForm);