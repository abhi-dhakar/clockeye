// src/pages/AlarmPage.jsx
import React, { useMemo } from "react";
import { useAlarm } from "../contexts/AlarmContext";
import { Bell, Clock, Trash2, Volume2 } from "lucide-react";

// Components
import AlarmCard from "../components/alarm/AlarmCard";
import AlarmForm from "../components/alarm/AlarmForm";
import AlarmPresets from "../components/alarm/AlarmPresets";
import RingingScreen from "../components/alarm/RingingScreen";
import SEO from "../components/SEO";

const AlarmPage = () => {
  const {
    alarms,
    ringingAlarm,
    isRinging,
    nextAlarm,
    addAlarm,
    deleteAlarm,
    toggleAlarm,
    stopRinging,
    snooze,
    formatTime12h,
    getTimeUntilAlarm,
  } = useAlarm();

  // Sorted alarms
  const sortedAlarms = useMemo(() => {
    return [...alarms].sort((a, b) => {
      // Active alarms first
      if (a.isSet !== b.isSet) return b.isSet ? 1 : -1;
      // Then by time
      return a.time.localeCompare(b.time);
    });
  }, [alarms]);

  // Existing alarm times (for preset validation)
  const existingTimes = useMemo(() => alarms.map((a) => a.time), [alarms]);

  // Count active alarms
  const activeCount = alarms.filter((a) => a.isSet).length;

  // Clear all alarms
  const clearAllAlarms = () => {
    if (window.confirm("Are you sure you want to delete all alarms?")) {
      alarms.forEach((alarm) => deleteAlarm(alarm.id));
    }
  };

  // Ringing state
  if (isRinging) {
    return (
      <RingingScreen
        alarm={ringingAlarm}
        formatTime12h={formatTime12h}
        onStop={stopRinging}
        onSnooze={snooze}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">

       <SEO 
        title="Set Alarm Clock Online" 
        description="Free online alarm clock with custom sounds and snooze functionality. Set multiple alarms for waking up, meetings, or reminders directly in your browser."
        keywords="online alarm clock, set alarm, wake up alarm, alarm clock, multiple alarms, snooze alarm, browser alarm"
        url="/alarm"
      />
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Bell className="w-7 h-7 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white dark:text-slate-900">
              Alarms
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Set alarms to stay on schedule
          </p>
        </div>

        {/* Next alarm banner */}
        {nextAlarm && (
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-blue-300">Next alarm</p>
                <p className="text-lg font-bold text-white dark:text-slate-900">
                  {formatTime12h(nextAlarm.time)}{" "}
                  <span className="text-sm font-normal text-slate-400">
                    ({getTimeUntilAlarm(nextAlarm.time)})
                  </span>
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400">{nextAlarm.label}</p>
          </div>
        )}

        {/* Add alarm form */}
        <div className="p-6 bg-slate-900/50 dark:bg-gray-50 rounded-2xl border border-slate-800 dark:border-gray-200 shadow-xl">
          <h2 className="text-lg font-bold text-white dark:text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Set a New Alarm
          </h2>
          <AlarmForm onAdd={addAlarm} />
        </div>

        {/* Quick presets */}
        <div className="p-6 bg-slate-900/50 dark:bg-gray-50 rounded-2xl border border-slate-800 dark:border-gray-200 shadow-xl">
          <AlarmPresets onSelect={addAlarm} existingTimes={existingTimes} />
        </div>

        {/* Alarms list */}
        <div className="p-6 bg-slate-900/50 dark:bg-gray-50 rounded-2xl border border-slate-800 dark:border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white dark:text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Your Alarms
              <span className="text-sm font-normal text-slate-500">
                ({activeCount} active)
              </span>
            </h2>

            {alarms.length > 0 && (
              <button
                onClick={clearAllAlarms}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>

          {alarms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <Bell className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg mb-2">No alarms set</p>
              <p className="text-sm">Add an alarm using the form above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedAlarms.map((alarm) => (
                <AlarmCard
                  key={alarm.id}
                  alarm={alarm}
                  formatTime12h={formatTime12h}
                  getTimeUntilAlarm={getTimeUntilAlarm}
                  onToggle={toggleAlarm}
                  onDelete={deleteAlarm}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sound test button */}
        <div className="text-center">
          <button
            onClick={() => {
              const audio = new Audio("/alarm.mp3");
              audio.volume = 0.3;
              audio.play().catch(() => {
                alert("Please add an alarm.mp3 file to the public folder");
              });
              setTimeout(() => audio.pause(), 2000);
            }}
            className="flex items-center gap-2 mx-auto text-sm text-slate-500 hover:text-slate-300 dark:hover:text-slate-600 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            Test alarm sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmPage;