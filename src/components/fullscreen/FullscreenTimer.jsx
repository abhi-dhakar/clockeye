// src/components/fullscreen/FullscreenTimer.jsx
import React, { useState, useEffect, useCallback } from "react";
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Bell,
  BellOff,
} from "lucide-react";
import { useTimer } from "../../contexts/TimerContext";
import { useFullscreenContext } from "../../contexts/FullscreenContext";

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};

const FullscreenTimer = () => {
  const {
    timeLeft,
    totalSetTime,
    progress,
    isRunning,
    isRinging,
    startTimer,
    stopTimer,
    resetTimer,
    stopAlarm,
  } = useTimer();

  const { 
    closeFullscreenMode, 
    fullscreenSettings, 
    updateSettings 
  } = useFullscreenContext();

  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [mouseTimer, setMouseTimer] = useState(null);

  // Handle stop alarm
  const handleStopAlarm = useCallback(() => {
    console.log("🛑 Fullscreen stop alarm clicked");
    stopAlarm();
  }, [stopAlarm]);

  // Handle reset
  const handleReset = useCallback(() => {
    console.log("🔄 Fullscreen reset clicked");
    stopAlarm();
    resetTimer();
  }, [stopAlarm, resetTimer]);

  // Auto-hide controls
  useEffect(() => {
    if (!fullscreenSettings.autoHideControls || isRinging) {
      setShowControls(true);
      return;
    }

    const handleMouseMove = () => {
      setShowControls(true);
      
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }

      const timer = setTimeout(() => {
        if (isRunning && !isRinging) {
          setShowControls(false);
        }
      }, fullscreenSettings.autoHideDelay);

      setMouseTimer(timer);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseMove);
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
    };
  }, [isRunning, isRinging, fullscreenSettings.autoHideControls, fullscreenSettings.autoHideDelay, mouseTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
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
        case "Escape":
          if (isRinging) {
            handleStopAlarm();
          }
          closeFullscreenMode();
          break;
        case "r":
        case "R":
          handleReset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, isRinging, startTimer, stopTimer, handleStopAlarm, handleReset, closeFullscreenMode]);

  // Calculate circle progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Theme backgrounds
  const getBackground = () => {
    if (isRinging) {
      return "bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900";
    }
    switch (fullscreenSettings.theme) {
      case "light":
        return "bg-gray-100";
      case "gradient":
        return "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900";
      default:
        return "bg-slate-950";
    }
  };

  const getTextColor = () => {
    return fullscreenSettings.theme === "light" && !isRinging ? "text-gray-900" : "text-white";
  };

  // Ringing state in fullscreen
  if (isRinging) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${getBackground()}`}>
        {/* Animated rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/20 animate-ping"
              style={{
                width: `${250 + i * 120}px`,
                height: `${250 + i * 120}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 animate-bounce">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Bell className="w-20 h-20 text-white animate-pulse" />
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-4 text-white">
            TIME'S UP!
          </h2>

          <p className="text-3xl font-mono text-white/80 mb-8">
            {formatTime(timeLeft)}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleStopAlarm}
              autoFocus
              className="flex items-center gap-3 px-10 py-5 bg-white text-blue-700 rounded-2xl font-black text-xl shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <BellOff className="w-7 h-7" />
              STOP
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-3 px-10 py-5 bg-white/20 text-white border-2 border-white/30 rounded-2xl font-black text-xl hover:bg-white/30 transition-all transform hover:scale-105"
            >
              <RotateCcw className="w-7 h-7" />
              RESTART
            </button>
          </div>

          <button
            onClick={() => {
              handleStopAlarm();
              closeFullscreenMode();
            }}
            className="mt-8 text-white/50 hover:text-white transition-colors"
          >
            Exit Fullscreen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${getBackground()} transition-colors duration-500`}
    >
      {/* Background Animation */}
      {isRunning && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={closeFullscreenMode}
        className={`absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 ${getTextColor()} transition-all ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`absolute top-6 left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 ${getTextColor()} transition-all ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-20 left-6 w-72 p-4 bg-slate-800/90 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Display Settings</h3>
          
          <div className="space-y-3">
            <label className="text-sm text-slate-400">Theme</label>
            <div className="flex gap-2">
              {["dark", "light", "gradient"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateSettings({ theme })}
                  className={`flex-1 py-2 rounded-lg capitalize text-sm font-medium transition-all ${
                    fullscreenSettings.theme === theme
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <label className="text-sm text-slate-400">Auto-hide controls</label>
            <button
              onClick={() => updateSettings({ autoHideControls: !fullscreenSettings.autoHideControls })}
              className={`w-12 h-6 rounded-full transition-colors ${
                fullscreenSettings.autoHideControls ? "bg-blue-600" : "bg-slate-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  fullscreenSettings.autoHideControls ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Main Timer Display */}
      <div className="relative flex flex-col items-center">
        {/* Progress Ring */}
        {fullscreenSettings.showProgress && (
          <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius + "%"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-800"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius + "%"}
              fill="none"
              stroke="url(#timerFullscreenGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="timerFullscreenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Time Display */}
        <div className={`text-center ${getTextColor()}`}>
          <div className="text-[12rem] sm:text-[16rem] font-mono font-black leading-none tracking-tight">
            {formatTime(timeLeft)}
          </div>
          <p className="text-2xl text-slate-400 mt-4">
            {isRunning ? "Focus Time" : timeLeft === 0 ? "Complete!" : "Paused"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div
        className={`absolute bottom-12 flex items-center gap-6 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={handleReset}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
        >
          <RotateCcw className="w-8 h-8" />
        </button>

        <button
          onClick={isRunning ? stopTimer : startTimer}
          className={`p-8 rounded-full transition-all hover:scale-110 ${
            isRunning
              ? "bg-red-600 hover:bg-red-500"
              : "bg-blue-600 hover:bg-blue-500"
          } text-white shadow-2xl`}
        >
          {isRunning ? (
            <Pause className="w-12 h-12" />
          ) : (
            <Play className="w-12 h-12 ml-1" />
          )}
        </button>

        <button
          onClick={closeFullscreenMode}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-sm text-slate-500 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">Space</kbd> Play/Pause</span>
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">R</kbd> Reset</span>
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">Esc</kbd> Exit</span>
      </div>
    </div>
  );
};

export default FullscreenTimer;