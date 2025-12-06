// src/components/sound/SoundSettings.jsx
import React, { useState } from "react";
import { 
  X, 
  Bell, 
  Timer, 
  Music, 
  Vibrate, 
  Settings, 
  Volume2, 
  TestTube,
  Info
} from "lucide-react";
import { useSound } from "../../contexts/SoundContext";
import SoundPicker from "./SoundPicker";
import AmbientMixer from "./AmbientMixer";
import VolumeControl from "./VolumeControl";

const SoundSettings = ({ isOpen, onClose }) => {
  const { 
    settings, 
    updateSettings, 
    playAlarmSound, 
    playTimerSound,
    vibrate 
  } = useSound();
  
  const [activeTab, setActiveTab] = useState("alarm");
  const [testingSound, setTestingSound] = useState(null);
  const [testAudioRef, setTestAudioRef] = useState(null);

  if (!isOpen) return null;

  const tabs = [
    { id: "alarm", label: "Alarm", icon: Bell },
    { id: "timer", label: "Timer", icon: Timer },
    { id: "ambient", label: "Ambient", icon: Music },
    { id: "general", label: "General", icon: Settings },
  ];

  // Test alarm sound
  const testAlarm = () => {
    if (testAudioRef) {
      testAudioRef.pause();
      testAudioRef.currentTime = 0;
    }

    if (testingSound === "alarm") {
      setTestingSound(null);
      return;
    }

    const audio = playAlarmSound(settings.alarmSound, { loop: false });
    if (audio) {
      setTestAudioRef(audio);
      setTestingSound("alarm");
      
      if (settings.vibrationEnabled) {
        vibrate([200, 100, 200]);
      }

      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setTestingSound(null);
      }, 3000);

      audio.onended = () => setTestingSound(null);
    }
  };

  // Test timer sound
  const testTimer = () => {
    if (testAudioRef) {
      testAudioRef.pause();
      testAudioRef.currentTime = 0;
    }

    if (testingSound === "timer") {
      setTestingSound(null);
      return;
    }

    const audio = playTimerSound(settings.timerSound, { loop: false });
    if (audio) {
      setTestAudioRef(audio);
      setTestingSound("timer");
      audio.onended = () => setTestingSound(null);
      
      setTimeout(() => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        setTestingSound(null);
      }, 3000);
    }
  };

  // Test vibration
  const testVibration = () => {
    vibrate([200, 100, 200, 100, 200]);
  };

  // Cleanup on close
  const handleClose = () => {
    if (testAudioRef) {
      testAudioRef.pause();
      testAudioRef.currentTime = 0;
    }
    setTestingSound(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 dark:bg-white rounded-2xl border border-slate-700 dark:border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 dark:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Volume2 className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white dark:text-gray-900">
              Sound Settings
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-2 border-b border-slate-800 dark:border-gray-200 bg-slate-800/50 dark:bg-gray-50">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white dark:hover:text-gray-900 hover:bg-slate-700 dark:hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Alarm Tab - NO gradual volume */}
          {activeTab === "alarm" && (
            <div className="space-y-6">
              {/* Volume Control */}
              <VolumeControl
                value={settings.alarmVolume}
                onChange={(value) => updateSettings({ alarmVolume: value })}
                label="Alarm Volume"
              />

              {/* Info about immediate volume */}
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-300 dark:text-blue-600">
                  Alarm sounds play at full volume immediately to ensure you don't miss them.
                </p>
              </div>

              {/* Sound Picker */}
              <SoundPicker
                type="alarm"
                selectedSound={settings.alarmSound}
                onSelect={(id) => updateSettings({ alarmSound: id })}
                showVolumeControl={false}
              />
            </div>
          )}

          {/* Timer Tab - WITH gradual volume option */}
          {activeTab === "timer" && (
            <div className="space-y-6">
              {/* Volume Control */}
              <VolumeControl
                value={settings.timerVolume}
                onChange={(value) => updateSettings({ timerVolume: value })}
                label="Timer Volume"
              />

              {/* Gradual Volume Toggle - ONLY for Timer */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 dark:bg-gray-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Volume2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white dark:text-gray-900">
                      Gradual Volume
                    </p>
                    <p className="text-xs text-slate-400 dark:text-gray-500">
                      Slowly increase timer sound volume
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSettings({ gradualVolume: !settings.gradualVolume })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.gradualVolume ? "bg-blue-600" : "bg-slate-600 dark:bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.gradualVolume ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Gradual Volume Duration - Only show if enabled */}
              {settings.gradualVolume && (
                <div className="p-4 bg-slate-800/50 dark:bg-gray-100 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white dark:text-gray-900">
                      Gradual Duration
                    </p>
                    <span className="text-sm font-mono text-blue-400">
                      {settings.gradualDuration}s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="5"
                    value={settings.gradualDuration}
                    onChange={(e) => updateSettings({ gradualDuration: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-700 dark:bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>10s</span>
                    <span>Quick rise</span>
                    <span>120s</span>
                  </div>
                </div>
              )}

              {/* Sound Picker */}
              <SoundPicker
                type="timer"
                selectedSound={settings.timerSound}
                onSelect={(id) => updateSettings({ timerSound: id })}
                showVolumeControl={false}
              />
            </div>
          )}

          {/* Ambient Tab */}
          {activeTab === "ambient" && <AmbientMixer />}

          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Vibration Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 dark:bg-gray-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Vibrate className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white dark:text-gray-900">
                      Vibration
                    </p>
                    <p className="text-xs text-slate-400 dark:text-gray-500">
                      Vibrate device for alarms and timers
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.vibrationEnabled ? "bg-blue-600" : "bg-slate-600 dark:bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings.vibrationEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Test Sounds Section */}
              <div className="p-4 bg-slate-800/50 dark:bg-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <TestTube className="w-5 h-5 text-amber-400" />
                  <p className="font-medium text-white dark:text-gray-900">
                    Test Sounds
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Test Alarm */}
                  <button
                    onClick={testAlarm}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                      testingSound === "alarm"
                        ? "bg-blue-600 text-white animate-pulse"
                        : "bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-700 hover:bg-slate-600 dark:hover:bg-gray-300"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    {testingSound === "alarm" ? "Playing..." : "Test Alarm"}
                  </button>

                  {/* Test Timer */}
                  <button
                    onClick={testTimer}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                      testingSound === "timer"
                        ? "bg-green-600 text-white animate-pulse"
                        : "bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-700 hover:bg-slate-600 dark:hover:bg-gray-300"
                    }`}
                  >
                    <Timer className="w-4 h-4" />
                    {testingSound === "timer" ? "Playing..." : "Test Timer"}
                  </button>

                  {/* Test Vibration */}
                  <button
                    onClick={testVibration}
                    disabled={!settings.vibrationEnabled}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                      settings.vibrationEnabled
                        ? "bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-700 hover:bg-slate-600 dark:hover:bg-gray-300"
                        : "bg-slate-800 dark:bg-gray-100 text-slate-500 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Vibrate className="w-4 h-4" />
                    Test Vibrate
                  </button>
                </div>
              </div>

              {/* Volume Presets */}
              <div className="p-4 bg-slate-800/50 dark:bg-gray-100 rounded-xl">
                <p className="font-medium text-white dark:text-gray-900 mb-4">
                  Quick Volume Presets
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Silent", alarm: 0, timer: 0 },
                    { label: "Low", alarm: 30, timer: 30 },
                    { label: "Medium", alarm: 60, timer: 50 },
                    { label: "High", alarm: 100, timer: 80 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() =>
                        updateSettings({
                          alarmVolume: preset.alarm,
                          timerVolume: preset.timer,
                        })
                      }
                      className="py-2 px-3 bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-700 rounded-lg text-sm font-medium hover:bg-slate-600 dark:hover:bg-gray-300 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset to Defaults */}
              <button
                onClick={() => {
                  if (confirm("Reset all sound settings to defaults?")) {
                    updateSettings({
                      alarmSound: "classic",
                      timerSound: "ding",
                      alarmVolume: 80,
                      timerVolume: 70,
                      ambientVolume: 50,
                      vibrationEnabled: true,
                      gradualVolume: false, // Default to false
                      gradualDuration: 30,
                    });
                  }
                }}
                className="w-full py-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl font-medium transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 dark:border-gray-200 bg-slate-800/30 dark:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Changes are saved automatically
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SoundSettings);