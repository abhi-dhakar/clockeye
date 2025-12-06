// src/components/alarm/RingingScreen.jsx
import React, { useEffect, useState } from "react";
import { Bell, BellOff, Clock } from "lucide-react";
import { SNOOZE_OPTIONS } from "../../data/alarmPresets";

const RingingScreen = ({ alarm, formatTime12h, onStop, onSnooze }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format current time
  const formattedCurrentTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onStop();
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        onSnooze();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStop, onSnooze]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-orange-900 p-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/10 animate-ping"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto text-center">
        {/* Bell icon */}
        <div className="mb-6 animate-bounce">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
            <Bell className="w-20 h-20 text-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
          WAKE UP!
        </h1>

        {/* Alarm info */}
        <div className="mb-4">
          <p className="text-2xl sm:text-3xl font-bold text-white/90 mb-2">
            {alarm?.label || "Alarm"}
          </p>
          <p className="text-4xl sm:text-5xl font-mono font-bold text-white">
            {formatTime12h(alarm?.time)}
          </p>
        </div>

        {/* Current time */}
        <div className="flex items-center gap-2 text-white/70 mb-8">
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg">{formattedCurrentTime}</span>
        </div>

        {/* Snooze count */}
        {alarm?.snoozeCount > 0 && (
          <p className="text-amber-300 text-sm mb-4">
            Snoozed {alarm.snoozeCount} time{alarm.snoozeCount > 1 ? "s" : ""}
          </p>
        )}

        {/* Main actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-6">
          <button
            onClick={onStop}
            autoFocus
            className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-red-700 rounded-2xl font-black text-xl shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <BellOff className="w-7 h-7" />
            STOP
          </button>
        </div>

        {/* Snooze options */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-white/60 text-sm self-center mr-2">Snooze:</span>
          {SNOOZE_OPTIONS.map((option) => (
            <button
              key={option.minutes}
              onClick={() => onSnooze(option.minutes)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Keyboard hint */}
        <p className="mt-8 text-sm text-white/40">
          Press <kbd className="px-2 py-1 bg-white/10 rounded">Space</kbd> to stop •{" "}
          <kbd className="px-2 py-1 bg-white/10 rounded">S</kbd> to snooze
        </p>
      </div>
    </div>
  );
};

export default React.memo(RingingScreen);