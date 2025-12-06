// src/pages/TimerPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTimer } from "../contexts/TimerContext";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Zap,
  Coffee,
  BookOpen,
  Dumbbell,
  Moon,
  Target,
  AlertCircle,
  Maximize,
} from "lucide-react";

// Components
import CircularProgress from "../components/timer/CircularProgress";
import LargeTimeDisplay from "../components/timer/LargeTimeDisplay";
import NumberSpinner from "../components/timer/NumberSpinner";
import PresetButton from "../components/timer/PresetButton";
import ControlButton from "../components/timer/ControlButton";
import RingingScreen from "../components/timer/RingingScreen";
import FullscreenButton from "../components/fullscreen/FullscreenButton";
import SEO from "../components/SEO";
// Utility function
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return { h, m, s, formatted: h > 0 ? `${h}:${m}:${s}` : `${m}:${s}` };
};

// Preset configurations
const PRESETS = [
  { min: 5, label: "Quick", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { min: 15, label: "Break", icon: Coffee, color: "from-amber-500 to-yellow-500" },
  { min: 25, label: "Focus", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { min: 45, label: "Deep", icon: Dumbbell, color: "from-purple-500 to-pink-500" },
  { min: 60, label: "1 Hour", icon: Clock, color: "from-green-500 to-emerald-500" },
  { min: 90, label: "Flow", icon: Moon, color: "from-indigo-500 to-purple-500" },
];

const TimerPage = () => {
  const {
    timeLeft,
    totalSetTime,
    progress,
    isRunning,
    isRinging,
    isWorkerReady,
    sessionCount,
    startTimer,
    stopTimer,
    applyNewTimerTime,
    stopAlarm,
    resetTimer,
  } = useTimer();

  // Local state for inputs
  const [hoursInput, setHoursInput] = useState(() => Math.floor(totalSetTime / 3600));
  const [minutesInput, setMinutesInput] = useState(() => Math.floor((totalSetTime % 3600) / 60));
  const [secondsInput, setSecondsInput] = useState(() => totalSetTime % 60);
  const [activePreset, setActivePreset] = useState(() => {
    const minutes = totalSetTime / 60;
    return PRESETS.find((p) => p.min === minutes)?.min || null;
  });

  // Sync inputs when totalSetTime changes
  useEffect(() => {
    if (!isRunning && !isRinging) {
      setHoursInput(Math.floor(totalSetTime / 3600));
      setMinutesInput(Math.floor((totalSetTime % 3600) / 60));
      setSecondsInput(totalSetTime % 60);

      const minutes = totalSetTime / 60;
      const matchingPreset = PRESETS.find((p) => p.min === minutes);
      setActivePreset(matchingPreset?.min || null);
    }
  }, [totalSetTime, isRunning, isRinging]);

  // Parse time for display
  const time = useMemo(() => formatTime(timeLeft), [timeLeft]);
  const hasHours = time.h > 0;

  // Handlers
  const applyCustomTime = useCallback(() => {
    const h = Number(hoursInput) || 0;
    const m = Number(minutesInput) || 0;
    const s = Number(secondsInput) || 0;
    const totalSeconds = h * 3600 + m * 60 + s;

    if (totalSeconds <= 0) return;

    setActivePreset(null);
    applyNewTimerTime(totalSeconds);
  }, [hoursInput, minutesInput, secondsInput, applyNewTimerTime]);

  const handlePresetClick = useCallback((min) => {
    const totalSeconds = min * 60;
    setActivePreset(min);
    setHoursInput(Math.floor(min / 60));
    setMinutesInput(min % 60);
    setSecondsInput(0);
    applyNewTimerTime(totalSeconds);
  }, [applyNewTimerTime]);

  const handleReset = useCallback(() => {
    console.log("🔄 Reset clicked");
    resetTimer();
    setActivePreset(25);
    setHoursInput(0);
    setMinutesInput(25);
    setSecondsInput(0);
  }, [resetTimer]);

  // Handle stop alarm - this is the key fix!
  const handleStopAlarm = useCallback(() => {
    console.log("🛑 Stop alarm clicked");
    stopAlarm();
  }, [stopAlarm]);

  // Handle reset from ringing screen
  const handleResetFromRinging = useCallback(() => {
    console.log("🔄 Reset from ringing screen");
    stopAlarm();
    resetTimer();
    setActivePreset(25);
    setHoursInput(0);
    setMinutesInput(25);
    setSecondsInput(0);
  }, [stopAlarm, resetTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT") return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          if (isRinging) {
            handleStopAlarm();
          } else if (isRunning) {
            stopTimer();
          } else {
            startTimer();
          }
          break;
        case "r":
        case "R":
          if (e.ctrlKey || e.metaKey) return;
          e.preventDefault();
          if (isRinging) {
            handleResetFromRinging();
          } else {
            handleReset();
          }
          break;
        case "Escape":
          if (isRinging) {
            handleStopAlarm();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, isRinging, startTimer, stopTimer, handleStopAlarm, handleReset, handleResetFromRinging]);

  // Ringing state - show full screen
  if (isRinging) {
    return (
      <RingingScreen
        onStop={handleStopAlarm}
        onReset={handleResetFromRinging}
        sessionCount={sessionCount}
      />
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">

      <SEO 
        title="Online Timer" 
        description="Set a free online countdown timer with custom sounds. Perfect for cooking, studying, or workouts."
        keywords="online timer, countdown timer, kitchen timer, study timer, pomodoro timer"
        url="/"
      />
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* LEFT SIDE - Timer Circle & Controls */}
        <div className="flex flex-col items-center justify-center order-2 lg:order-1">
          {/* Worker status warning */}
          {!isWorkerReady && (
            <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Timer worker not ready. Timing may be inaccurate.</span>
            </div>
          )}

          {/* Large Time Display - Outside circle when hours > 0 */}
          {hasHours && <LargeTimeDisplay time={time} isRunning={isRunning} />}

          {/* Timer Circle */}
          <CircularProgress
            progress={progress}
            isRunning={isRunning}
            showTimeInside={!hasHours}
            timeDisplay={time.formatted}
          />

          {/* Progress Info */}
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 dark:bg-gray-100 rounded-full border border-slate-700 dark:border-gray-300">
              <Target className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span className="text-slate-300 dark:text-gray-600 font-medium">
                {Math.round(100 - progress)}% Complete
              </span>
            </div>
            {sessionCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 dark:bg-gray-100 rounded-full border border-slate-700 dark:border-gray-300">
                <span className="text-slate-300 dark:text-gray-600 font-medium">
                  🎯 {sessionCount} sessions
                </span>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="mt-8 flex items-center gap-4">
            {!isRunning ? (
              <ControlButton
                onClick={startTimer}
                variant="primary"
                icon={Play}
                disabled={timeLeft <= 0}
                ariaLabel="Start timer"
              >
                START
              </ControlButton>
            ) : (
              <ControlButton
                onClick={stopTimer}
                variant="danger"
                icon={Pause}
                ariaLabel="Pause timer"
              >
                PAUSE
              </ControlButton>
            )}

            <ControlButton
              onClick={handleReset}
              variant="secondary"
              icon={RotateCcw}
              ariaLabel="Reset timer"
            >
              RESET
            </ControlButton>

            <FullscreenButton mode="timer" />
          </div>

          {/* Status Indicator */}
          <div className="mt-6 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isRunning ? "bg-green-500 animate-pulse" : "bg-slate-500"
              }`}
            />
            <span className="text-sm text-slate-400 dark:text-gray-500">
              {isRunning ? "Timer is running..." : "Timer paused"}
            </span>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="mt-4 text-xs text-slate-500 dark:text-gray-400">
            <kbd className="px-1.5 py-0.5 bg-slate-700 dark:bg-gray-200 rounded">Space</kbd>
            {" "}to {isRunning ? "pause" : "start"} •{" "}
            <kbd className="px-1.5 py-0.5 bg-slate-700 dark:bg-gray-200 rounded">R</kbd>
            {" "}to reset
          </div>
        </div>

        {/* RIGHT SIDE - Custom Time Input */}
        <div className="flex flex-col justify-center order-1 lg:order-2">
          <div className="bg-slate-900/60 dark:bg-gray-50 backdrop-blur-sm rounded-3xl border border-slate-800 dark:border-gray-200 p-6 lg:p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
                Set Timer
              </h2>
              <p className="text-sm text-slate-400 dark:text-gray-500">
                Choose a preset or set custom time
              </p>
            </div>

            {/* Time Spinners */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <NumberSpinner
                label="Hours"
                value={hoursInput}
                onChange={setHoursInput}
                min={0}
                max={23}
                disabled={isRunning}
              />

              <span className="text-3xl font-bold text-slate-600 dark:text-gray-400 mt-6">
                :
              </span>

              <NumberSpinner
                label="Minutes"
                value={minutesInput}
                onChange={setMinutesInput}
                min={0}
                max={59}
                disabled={isRunning}
              />

              <span className="text-3xl font-bold text-slate-600 dark:text-gray-400 mt-6">
                :
              </span>

              <NumberSpinner
                label="Seconds"
                value={secondsInput}
                onChange={setSecondsInput}
                min={0}
                max={59}
                disabled={isRunning}
              />
            </div>

            {/* Set Button */}
            <button
              onClick={applyCustomTime}
              disabled={isRunning}
              type="button"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              SET TIME
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-700 dark:bg-gray-300" />
              <span className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                Quick Presets
              </span>
              <div className="flex-1 h-px bg-slate-700 dark:bg-gray-300" />
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {PRESETS.map((preset) => (
                <PresetButton
                  key={preset.min}
                  preset={preset}
                  isActive={activePreset === preset.min}
                  onClick={() => handlePresetClick(preset.min)}
                  disabled={isRunning}
                />
              ))}
            </div>

            {/* Timer Info */}
            <div className="mt-6 pt-6 border-t border-slate-700 dark:border-gray-300 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-gray-500">
                  Total Duration:
                </span>
                <span className="font-mono font-bold text-white dark:text-gray-900">
                  {formatTime(totalSetTime).formatted}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 dark:text-gray-500">
                  Remaining:
                </span>
                <span className="font-mono font-bold text-blue-400 dark:text-blue-600">
                  {formatTime(timeLeft).formatted}
                </span>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 dark:text-gray-400">
              💡 Timer continues running even when you switch tabs
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TimerPage;