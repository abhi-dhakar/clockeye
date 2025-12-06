// src/components/fullscreen/FullscreenStopwatch.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Trophy,
  Zap,
  Timer,
  Clock,
} from "lucide-react";
import { useStopwatch } from "../../contexts/StopwatchContext";
import { useFullscreenContext } from "../../contexts/FullscreenContext";

const formatTime = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    milliseconds: milliseconds.toString().padStart(2, "0"),
    showHours: hours > 0,
  };
};

const formatLapTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
};

const FullscreenStopwatch = () => {
  const { time, isRunning, laps, start, stop, reset, lap } = useStopwatch();
  const { closeFullscreenMode, fullscreenSettings } = useFullscreenContext();

  const [showControls, setShowControls] = useState(true);
  const [mouseTimer, setMouseTimer] = useState(null);

  // Auto-hide controls
  useEffect(() => {
    if (!fullscreenSettings.autoHideControls) return;

    const handleMouseMove = () => {
      setShowControls(true);
      if (mouseTimer) clearTimeout(mouseTimer);

      const timer = setTimeout(() => {
        if (isRunning) setShowControls(false);
      }, fullscreenSettings.autoHideDelay || 3000);

      setMouseTimer(timer);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseMove);
      if (mouseTimer) clearTimeout(mouseTimer);
    };
  }, [isRunning, fullscreenSettings, mouseTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          isRunning ? stop() : start();
          break;
        case "l":
        case "L":
          e.preventDefault();
          if (isRunning) lap();
          break;
        case "r":
        case "R":
          e.preventDefault();
          reset();
          break;
        case "Escape":
          e.preventDefault();
          closeFullscreenMode();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, start, stop, lap, reset, closeFullscreenMode]);

  const getBackground = () => {
    switch (fullscreenSettings?.theme) {
      case "light":
        return "bg-gradient-to-br from-gray-50 via-white to-gray-100";
      case "gradient":
        return "bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900";
      default:
        return "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";
    }
  };

  const timeData = formatTime(time);
  const isLight = fullscreenSettings?.theme === "light";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${getBackground()} overflow-hidden`}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${
                isLight ? "#000" : "#fff"
              } 1px, transparent 1px), linear-gradient(90deg, ${
                isLight ? "#000" : "#fff"
              } 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Glow Effects */}
        {isRunning && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse animation-delay-1000" />
            <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
          </>
        )}
      </div>

      {/* Header Bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl border border-emerald-500/30">
            <Timer
              className={`w-6 h-6 ${
                isLight ? "text-emerald-600" : "text-emerald-400"
              }`}
            />
          </div>
          <div>
            <h1
              className={`text-xl font-bold ${
                isLight ? "text-slate-800" : "text-white"
              }`}
            >
              Fullscreen Stopwatch
            </h1>
            <p
              className={`text-xs ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Press ESC to exit
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeFullscreenMode}
          className={`group p-3 rounded-xl backdrop-blur-xl border transition-all hover:scale-110 ${
            isLight
              ? "bg-white/80 border-gray-200 hover:bg-white text-slate-800"
              : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
          }`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Status Badge */}
      <div
        className={`absolute top-32 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border transition-all ${
            isRunning
              ? "bg-emerald-500/20 border-emerald-500/40 shadow-lg shadow-emerald-500/30"
              : time > 0
              ? "bg-amber-500/20 border-amber-500/40"
              : isLight
              ? "bg-white/80 border-gray-200"
              : "bg-white/10 border-white/20"
          }`}
        >
          <span
            className={`w-3 h-3 rounded-full ${
              isRunning
                ? "bg-emerald-400 animate-pulse"
                : time > 0
                ? "bg-amber-400"
                : "bg-slate-500"
            }`}
          />
          <span
            className={`text-sm font-bold uppercase tracking-wider ${
              isRunning
                ? isLight
                  ? "text-emerald-700"
                  : "text-emerald-400"
                : time > 0
                ? isLight
                  ? "text-amber-700"
                  : "text-amber-400"
                : isLight
                ? "text-slate-700"
                : "text-slate-300"
            }`}
          >
            {isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}
          </span>
        </div>
      </div>

      {/* Main Time Display */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Digital Display */}
        <div className="flex items-center gap-4">
          {/* Hours (if needed) */}
          {timeData.showHours && (
            <>
              <TimeUnit
                value={timeData.hours}
                isRunning={isRunning}
                isLight={isLight}
              />
              <Separator isRunning={isRunning} isLight={isLight} />
            </>
          )}

          {/* Minutes */}
          <TimeUnit
            value={timeData.minutes}
            isRunning={isRunning}
            isLight={isLight}
          />
          <Separator isRunning={isRunning} isLight={isLight} />

          {/* Seconds */}
          <TimeUnit
            value={timeData.seconds}
            isRunning={isRunning}
            isLight={isLight}
          />
          <Separator isRunning={isRunning} isLight={isLight} small />

          {/* Milliseconds */}
          <TimeUnit
            value={timeData.milliseconds}
            isRunning={isRunning}
            isLight={isLight}
            small
          />
        </div>

        {/* Labels */}
        <div className="flex items-center gap-12 mt-8">
          {timeData.showHours && (
            <span
              className={`text-sm uppercase tracking-widest font-semibold ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Hours
            </span>
          )}
          <span
            className={`text-sm uppercase tracking-widest font-semibold ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Minutes
          </span>
          <span
            className={`text-sm uppercase tracking-widest font-semibold ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Seconds
          </span>
          <span
            className={`text-sm uppercase tracking-widest font-semibold ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            MS
          </span>
        </div>
      </div>

      {/* Laps Display */}
      {laps.length > 0 && (
        <div
          className={`absolute right-8 top-1/2 -translate-y-1/2 w-80 max-h-[600px] rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-300 ${
            showControls
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          } ${
            isLight
              ? "bg-white/90 border-gray-200 shadow-2xl"
              : "bg-black/40 border-white/10 shadow-2xl shadow-black/20"
          }`}
        >
          {/* Laps Header */}
          <div
            className={`px-6 py-4 border-b ${
              isLight
                ? "bg-gray-50 border-gray-200"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy
                  className={`w-5 h-5 ${
                    isLight ? "text-emerald-600" : "text-emerald-400"
                  }`}
                />
                <h3
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isLight ? "text-slate-800" : "text-white"
                  }`}
                >
                  Lap Times
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isLight
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {laps.length}
              </span>
            </div>
          </div>

          {/* Laps List */}
          <div className="max-h-[500px] overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {laps
              .slice()
              .reverse()
              .map((lapData, index) => {
                const lapNumber = laps.length - index;
                const isLatest = index === 0;

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all ${
                      isLatest
                        ? isLight
                          ? "bg-gradient-to-r from-emerald-100 to-cyan-100 border-2 border-emerald-300"
                          : "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40"
                        : isLight
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs ${
                            isLatest
                              ? isLight
                                ? "bg-emerald-200 text-emerald-700"
                                : "bg-emerald-500/30 text-emerald-400"
                              : isLight
                              ? "bg-gray-200 text-slate-700"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          #{lapNumber}
                        </div>
                        {isLatest && (
                          <span
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                              isLight
                                ? "bg-emerald-200 text-emerald-700"
                                : "bg-emerald-500/30 text-emerald-400"
                            }`}
                          >
                            <Zap className="w-3 h-3" />
                            Latest
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-[10px] uppercase tracking-wider mb-1 ${
                            isLight ? "text-slate-600" : "text-slate-500"
                          }`}
                        >
                          Split Time
                        </p>
                        <p
                          className={`font-mono font-bold text-lg ${
                            isLatest
                              ? isLight
                                ? "text-emerald-700"
                                : "text-emerald-400"
                              : isLight
                              ? "text-slate-800"
                              : "text-white"
                          }`}
                        >
                          {formatLapTime(lapData.split)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-[10px] uppercase tracking-wider mb-1 ${
                            isLight ? "text-slate-600" : "text-slate-500"
                          }`}
                        >
                          Total
                        </p>
                        <p
                          className={`font-mono font-semibold ${
                            isLight ? "text-cyan-700" : "text-cyan-400"
                          }`}
                        >
                          {formatLapTime(lapData.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-16 flex items-center gap-6 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Reset Button */}
        <button
          onClick={reset}
          disabled={time === 0}
          className={`group p-5 rounded-2xl backdrop-blur-xl border transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
            isLight
              ? "bg-white/80 border-gray-300 hover:bg-white text-slate-800"
              : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
          }`}
        >
          <RotateCcw className="w-8 h-8" />
        </button>

        {/* Start/Stop Button */}
        <button
          onClick={isRunning ? stop : start}
          className={`group p-8 rounded-3xl transition-all hover:scale-110 active:scale-95 shadow-2xl ${
            isRunning
              ? "bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-500/50"
              : "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/50"
          } text-white`}
        >
          {isRunning ? (
            <Pause className="w-12 h-12" strokeWidth={2.5} />
          ) : (
            <Play className="w-12 h-12 ml-1" strokeWidth={2.5} />
          )}
        </button>

        {/* Lap Button */}
        <button
          onClick={lap}
          disabled={!isRunning}
          className={`group p-5 rounded-2xl backdrop-blur-xl border transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
            isLight
              ? "bg-white/80 border-gray-300 hover:bg-white text-slate-800"
              : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
          }`}
        >
          <Flag className="w-8 h-8" />
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-4 text-sm transition-all duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        } ${isLight ? "text-slate-600" : "text-slate-400"}`}
      >
        <ShortcutHint
          keyName="Space"
          action={isRunning ? "Pause" : "Start"}
          isLight={isLight}
        />
        <ShortcutHint keyName="L" action="Lap" isLight={isLight} />
        <ShortcutHint keyName="R" action="Reset" isLight={isLight} />
        <ShortcutHint keyName="Esc" action="Exit" isLight={isLight} />
      </div>
    </div>
  );
};

// Time Unit Component
const TimeUnit = ({ value, isRunning, isLight, small }) => (
  <div
    className={`
    relative flex items-center justify-center
    ${small ? "w-24 h-24 sm:w-32 sm:h-32" : "w-32 h-32 sm:w-40 sm:h-40"}
    rounded-3xl backdrop-blur-xl border transition-all
    ${
      isLight
        ? "bg-white/80 border-gray-200 shadow-xl"
        : "bg-white/5 border-white/10 shadow-2xl shadow-black/20"
    }
    ${isRunning ? "shadow-emerald-500/20" : ""}
  `}
  >
    {isRunning && (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl" />
    )}
    <span
      className={`
      relative z-10 digital-font font-black
      ${small ? "text-5xl sm:text-7xl" : "text-7xl sm:text-9xl"}
      transition-all duration-300
      ${
        isRunning
          ? isLight
            ? "text-emerald-600 drop-shadow-[0_0_20px_rgba(5,150,105,0.3)]"
            : "text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          : isLight
          ? "text-slate-800"
          : "text-white"
      }
    `}
    >
      {value}
    </span>
  </div>
);

// Separator Component
const Separator = ({ isRunning, isLight, small }) => (
  <span
    className={`
    digital-font font-black
    ${small ? "text-4xl sm:text-5xl mx-2" : "text-6xl sm:text-8xl mx-3"}
    transition-all duration-300
    ${
      isRunning
        ? isLight
          ? "text-emerald-600 animate-pulse"
          : "text-emerald-400 animate-pulse"
        : isLight
        ? "text-slate-600"
        : "text-slate-500"
    }
  `}
  >
    {small ? "." : ":"}
  </span>
);

// Shortcut Hint Component
const ShortcutHint = ({ keyName, action, isLight }) => (
  <div className="flex items-center gap-2">
    <kbd
      className={`px-3 py-1.5 rounded-lg font-mono font-semibold text-xs shadow-md ${
        isLight
          ? "bg-white border border-gray-300 text-slate-800"
          : "bg-slate-800 border border-slate-700 text-slate-300"
      }`}
    >
      {keyName}
    </kbd>
    <span className="text-sm">{action}</span>
  </div>
);

export default FullscreenStopwatch;
