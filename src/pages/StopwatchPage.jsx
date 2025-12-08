// src/pages/StopwatchPage.jsx
import React, { useEffect, useCallback } from "react";
import { useStopwatch } from "../contexts/StopwatchContext";
import { Play, Pause, Flag, RotateCcw, Timer, Zap } from "lucide-react";

// Components
import StopwatchDisplay from "../components/stopwatch/StopwatchDisplay";
import LapsList from "../components/stopwatch/LapsList";
import ControlButton from "../components/stopwatch/ControlButton";
import SEO from "../components/SEO";
import FullscreenButton from "../components/fullscreen/FullscreenButton";
export const StopwatchPage = () => {
  const {
    time,
    isRunning,
    laps,
    lapStats,
    lapCount,
    start,
    stop,
    toggle,
    reset,
    lap,
  } = useStopwatch();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          toggle();
          break;
        case "l":
        case "L":
          e.preventDefault();
          if (isRunning) lap();
          break;
        case "r":
        case "R":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            reset();
          }
          break;
        case "Escape":
          e.preventDefault();
          stop();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, lap, reset, stop, isRunning]);

  return (
    <div className="min-h-screen px-4 py-8 lg:py-12">
      <SEO
        title="Free Online Stopwatch"
        description="Precise online stopwatch with split/lap time recording. Ideal for sports, games, and measuring time intervals. Tracks laps and saves progress."
        keywords="online stopwatch, stopwatch with laps, timer, split timer, chronometer, sports timer, race timer"
        url="/stopwatch"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3 px-6 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20 rounded-full border border-emerald-500/20 dark:border-emerald-500/30">
            <Timer className="w-5 h-5 text-emerald-400 dark:text-emerald-600 animate-pulse" />
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-emerald-600 dark:to-cyan-600 bg-clip-text text-transparent">
              Precision Stopwatch
            </h1>
          </div>
          <p className="text-sm lg:text-base text-slate-400 dark:text-slate-600">
            Track time with millisecond precision • Record unlimited laps
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Stopwatch Display & Controls */}
          <div className="lg:col-span-7">
            {/* Stopwatch Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 dark:from-white dark:to-gray-50 backdrop-blur-xl border border-slate-700/50 dark:border-gray-200 shadow-2xl">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 dark:from-emerald-500/10 dark:to-cyan-500/10"></div>

              {/* Glow effect when running */}
              {isRunning && (
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-emerald-500/20 blur-3xl rounded-full"></div>
                </div>
              )}

              <div className="relative p-8 lg:p-12">
                {/* Status Badge */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      isRunning
                        ? "bg-emerald-500/20 text-emerald-400 dark:bg-emerald-500/30 dark:text-emerald-600 shadow-lg shadow-emerald-500/20"
                        : "bg-slate-700/50 text-slate-400 dark:bg-gray-200 dark:text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isRunning
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-slate-500"
                      }`}
                    ></span>
                    {isRunning ? "RUNNING" : "STOPPED"}
                  </div>
                </div>

                {/* Display */}
                <StopwatchDisplay time={time} isRunning={isRunning} />

                {/* Controls */}
                <div className="flex flex-wrap gap-3 justify-center mt-10">
                  {!isRunning ? (
                    <ControlButton
                      onClick={start}
                      variant="start"
                      icon={Play}
                      disabled={false}
                    >
                      Start
                    </ControlButton>
                  ) : (
                    <ControlButton onClick={stop} variant="stop" icon={Pause}>
                      Pause
                    </ControlButton>
                  )}

                  <ControlButton
                    onClick={lap}
                    variant="lap"
                    icon={Flag}
                    disabled={!isRunning}
                  >
                    Lap
                  </ControlButton>

                  <ControlButton
                    onClick={reset}
                    variant="reset"
                    icon={RotateCcw}
                    disabled={time === 0}
                  >
                    Reset
                  </ControlButton>
                  {/* Fullscreen button */}
                  <FullscreenButton
                    mode="stopwatch"
                    variant="outline"
                    size="md"
                    showLabel={true}
                  />
                </div>

                {/* Quick Stats */}
                {(lapCount > 0 || time > 0) && (
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-700/50 dark:border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-600 mb-1 uppercase tracking-wider">
                        Total Laps
                      </p>
                      <p className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 font-mono">
                        {lapCount}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-600 mb-1 uppercase tracking-wider">
                        Elapsed
                      </p>
                      <p className="text-2xl font-bold text-cyan-400 dark:text-cyan-600 font-mono">
                        {formatTotalTime(time)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/50 dark:bg-gray-50 border border-slate-800/50 dark:border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-400 dark:text-amber-600" />
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                  Keyboard Shortcuts
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <ShortcutKey
                  keyName="Space"
                  action={isRunning ? "Pause" : "Start"}
                />
                <ShortcutKey keyName="L" action="Lap" />
                <ShortcutKey keyName="R" action="Reset" />
                <ShortcutKey keyName="Esc" action="Stop" />
              </div>
            </div>
          </div>

          {/* Right Column - Laps */}
          <div className="lg:col-span-5">
            <LapsList laps={laps} lapStats={lapStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Shortcut Key Component
const ShortcutKey = ({ keyName, action }) => (
  <div className="flex items-center gap-2">
    <kbd className="px-2 py-1 bg-slate-800 dark:bg-gray-200 text-slate-300 dark:text-slate-700 rounded-lg text-[10px] font-mono font-semibold shadow-md border border-slate-700 dark:border-gray-300">
      {keyName}
    </kbd>
    <span className="text-slate-500 dark:text-slate-600">{action}</span>
  </div>
);

// Helper function
const formatTotalTime = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

export default StopwatchPage;
