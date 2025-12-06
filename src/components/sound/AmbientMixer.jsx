// src/components/sound/AmbientMixer.jsx
import React from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { useSound } from "../../contexts/SoundContext";
import VolumeControl from "./VolumeControl";

const AmbientMixer = ({ className = "" }) => {
  const {
    ambientSounds,
    activeAmbientSounds,
    toggleAmbientSound,
    setAmbientVolume,
    stopAllAmbient,
    settings,
  } = useSound();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white dark:text-gray-900">
          Ambient Sounds
        </h3>
        {activeAmbientSounds.length > 0 && (
          <button
            onClick={stopAllAmbient}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-rose-400 transition-colors"
          >
            <X className="w-4 h-4" />
            Stop All
          </button>
        )}
      </div>

      {/* Master Volume */}
      <VolumeControl
        value={settings.ambientVolume}
        onChange={setAmbientVolume}
        label="Master Volume"
      />

      {/* Sound Grid */}
      <div className="grid grid-cols-4 gap-3">
        {ambientSounds.map((sound) => {
          const isActive = activeAmbientSounds.includes(sound.id);

          return (
            <button
              key={sound.id}
              onClick={() => toggleAmbientSound(sound.id)}
              className={`group relative p-4 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-slate-800/50 dark:bg-gray-100 text-slate-400 dark:text-gray-600 hover:bg-slate-700 dark:hover:bg-gray-200"
              }`}
            >
              {/* Animated rings when active */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                </div>
              )}

              <div className="relative flex flex-col items-center gap-2">
                <span className="text-2xl">{sound.icon}</span>
                <span className="text-xs font-medium">{sound.name}</span>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active sounds count */}
      {activeAmbientSounds.length > 0 && (
        <p className="text-sm text-slate-500 text-center">
          {activeAmbientSounds.length} sound{activeAmbientSounds.length > 1 ? "s" : ""} playing
        </p>
      )}
    </div>
  );
};

export default React.memo(AmbientMixer);