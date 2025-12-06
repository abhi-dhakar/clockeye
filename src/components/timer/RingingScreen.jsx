// src/components/timer/RingingScreen.jsx
import React, { useEffect } from "react";
import { Bell, BellOff, RotateCcw } from "lucide-react";

const RingingScreen = ({ onStop, onReset, sessionCount }) => {
  // Vibrate on mount (mobile devices)
  useEffect(() => {
    if ("vibrate" in navigator) {
      const pattern = [500, 200, 500, 200, 500];
      navigator.vibrate(pattern);
    }

    return () => {
      if ("vibrate" in navigator) {
        navigator.vibrate(0);
      }
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        console.log("⌨️ Keyboard stop triggered");
        onStop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStop]);

  const handleStopClick = () => {
    console.log("🖱️ Stop button clicked");
    onStop();
  };

  const handleResetClick = () => {
    console.log("🖱️ Reset button clicked");
    onReset();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-8"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="ringing-title"
    >
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

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto text-center">
        {/* Bell Icon */}
        <div className="mb-8 animate-bounce">
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
            <Bell className="w-20 h-20 text-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h2
          id="ringing-title"
          className="text-5xl md:text-7xl font-black mb-4 text-white tracking-tight drop-shadow-2xl"
        >
          TIME'S UP!
        </h2>

        {/* Description */}
        <p className="text-xl text-white/80 mb-2">
          Great job! You completed a focus session.
        </p>

        {/* Session count */}
        {sessionCount > 0 && (
          <p className="text-lg text-white/60 mb-8">
            Sessions completed today: {sessionCount}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={handleStopClick}
            autoFocus
            className="group flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-700 rounded-2xl font-black text-xl shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <BellOff className="w-7 h-7 group-hover:animate-pulse" />
            STOP
          </button>
          <button
            onClick={handleResetClick}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-black text-xl hover:bg-white/30 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            <RotateCcw className="w-7 h-7" />
            RESTART
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="mt-6 text-sm text-white/50">
          Press <kbd className="px-2 py-1 bg-white/20 rounded">Space</kbd> or{" "}
          <kbd className="px-2 py-1 bg-white/20 rounded">Esc</kbd> to stop
        </p>
      </div>
    </div>
  );
};

export default React.memo(RingingScreen);