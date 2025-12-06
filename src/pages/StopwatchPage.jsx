// src/pages/StopwatchPage.jsx
import React, { useEffect, useCallback } from "react";
import { useStopwatch } from "../contexts/StopwatchContext";
import { Play, Pause, Flag, RotateCcw, Timer } from "lucide-react";

// Components
import StopwatchDisplay from "../components/stopwatch/StopwatchDisplay";
import LapsList from "../components/stopwatch/LapsList";
import ControlButton from "../components/stopwatch/ControlButton";
import SEO from "../components/SEO";

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
      // Ignore if typing in input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key) {
        case " ": // Space - Start/Stop
          e.preventDefault();
          toggle();
          break;
        case "l": // L - Lap
        case "L":
          e.preventDefault();
          if (isRunning) lap();
          break;
        case "r": // R - Reset
        case "R":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            reset();
          }
          break;
        case "Escape": // Esc - Stop
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

  // Clear laps handler
  const handleClearLaps = useCallback(() => {
    // Only clear laps, not reset entire stopwatch
    // This would need to be added to context if desired
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
          <SEO 
        title="Free Online Stopwatch" 
        description="Precise online stopwatch with split/lap time recording. Ideal for sports, games, and measuring time intervals. Tracks laps and saves progress."
        keywords="online stopwatch, stopwatch with laps, timer, split timer, chronometer, sports timer, race timer"
        url="/stopwatch"
      />
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Timer className="w-6 h-6 text-emerald-400 dark:text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-200 dark:text-slate-900 tracking-wide">
              Stopwatch
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Track time with precision and record laps
          </p>
        </div>

        {/* Main content - Two column on larger screens */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left side - Stopwatch display and controls */}
          <div className="flex flex-col items-center gap-8">
            {/* Display */}
            <StopwatchDisplay time={time} isRunning={isRunning} size="large" />

            {/* Controls */}
            <div className="flex flex-wrap gap-3 justify-center">
              {!isRunning ? (
                <ControlButton
                  onClick={start}
                  variant="start"
                  size="lg"
                  icon={Play}
                >
                  Start
                </ControlButton>
              ) : (
                <ControlButton
                  onClick={stop}
                  variant="stop"
                  size="lg"
                  icon={Pause}
                >
                  Stop
                </ControlButton>
              )}

              <ControlButton
                onClick={lap}
                variant="lap"
                size="lg"
                icon={Flag}
                disabled={!isRunning}
              >
                Lap
              </ControlButton>

              <ControlButton
                onClick={reset}
                variant="reset"
                size="lg"
                icon={RotateCcw}
                disabled={time === 0}
              >
                Reset
              </ControlButton>
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 dark:bg-gray-200 rounded text-[10px] font-mono">
                  Space
                </kbd>
                <span>{isRunning ? "Stop" : "Start"}</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 dark:bg-gray-200 rounded text-[10px] font-mono">
                  L
                </kbd>
                <span>Lap</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 dark:bg-gray-200 rounded text-[10px] font-mono">
                  R
                </kbd>
                <span>Reset</span>
              </div>
            </div>

            {/* Session info (mobile only, shows above laps) */}
            <div className="lg:hidden w-full max-w-lg">
              <LapsList laps={laps} lapStats={lapStats} />
            </div>
          </div>

          {/* Right side - Laps list (desktop only) */}
          <div className="hidden lg:flex flex-col items-center">
            <LapsList laps={laps} lapStats={lapStats} />
            
            {/* Additional stats */}
            {lapCount > 0 && (
              <div className="mt-6 w-full max-w-lg p-4 bg-slate-900/50 dark:bg-gray-50 rounded-xl border border-slate-800/60 dark:border-gray-200">
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-3">
                  Session Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Total Laps</p>
                    <p className="text-lg font-bold font-mono text-emerald-400 dark:text-emerald-600">
                      {lapCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Time</p>
                    <p className="text-lg font-bold font-mono text-slate-300 dark:text-slate-700">
                      {formatTotalTime(time)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for total time display
const formatTotalTime = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

export default StopwatchPage;