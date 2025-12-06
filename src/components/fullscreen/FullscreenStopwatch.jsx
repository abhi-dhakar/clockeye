// src/components/fullscreen/FullscreenStopwatch.jsx
import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, Flag } from "lucide-react";
import { useStopwatch } from "../../contexts/StopwatchContext";
import { useFullscreenContext } from "../../contexts/FullscreenContext";

const formatTime = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
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
      }, fullscreenSettings.autoHideDelay);
      
      setMouseTimer(timer);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
          if (isRunning) lap();
          break;
        case "r":
        case "R":
          reset();
          break;
        case "Escape":
          closeFullscreenMode();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, start, stop, lap, reset, closeFullscreenMode]);

  const getBackground = () => {
    switch (fullscreenSettings.theme) {
      case "light": return "bg-gray-100";
      case "gradient": return "bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900";
      default: return "bg-slate-950";
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${getBackground()}`}>
      {/* Animated Background */}
      {isRunning && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={closeFullscreenMode}
        className={`absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Time Display */}
      <div className="text-center text-white">
        <div className="text-[10rem] sm:text-[14rem] font-mono font-black leading-none tracking-tight">
          {formatTime(time)}
        </div>
        <p className="text-2xl text-slate-400 mt-4">
          {isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}
        </p>
      </div>

      {/* Laps Display */}
      {laps.length > 0 && (
        <div
          className={`absolute right-8 top-1/2 -translate-y-1/2 w-64 max-h-80 overflow-y-auto bg-black/30 backdrop-blur-lg rounded-2xl p-4 transition-opacity ${
            showControls ? "opacity-100" : "opacity-50"
          }`}
        >
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
            Laps ({laps.length})
          </h3>
          <div className="space-y-2">
            {laps.slice(0, 10).map((lapData, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-lg"
              >
                <span className="text-slate-400 text-sm">
                  Lap {laps.length - index}
                </span>
                <span className="font-mono font-bold text-white">
                  {formatTime(lapData.split)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-12 flex items-center gap-6 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={reset}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
        >
          <RotateCcw className="w-8 h-8" />
        </button>

        <button
          onClick={isRunning ? stop : start}
          className={`p-8 rounded-full transition-all hover:scale-110 ${
            isRunning
              ? "bg-rose-600 hover:bg-rose-500"
              : "bg-emerald-600 hover:bg-emerald-500"
          } text-white shadow-2xl`}
        >
          {isRunning ? (
            <Pause className="w-12 h-12" />
          ) : (
            <Play className="w-12 h-12 ml-1" />
          )}
        </button>

        <button
          onClick={lap}
          disabled={!isRunning}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Flag className="w-8 h-8" />
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-sm text-slate-500 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">Space</kbd> Start/Stop</span>
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">L</kbd> Lap</span>
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">R</kbd> Reset</span>
        <span><kbd className="px-2 py-1 bg-slate-800 rounded">Esc</kbd> Exit</span>
      </div>
    </div>
  );
};

export default FullscreenStopwatch;