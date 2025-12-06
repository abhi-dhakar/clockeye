// src/components/layout/MobileNav.jsx
import React, { useEffect } from "react";
import { 
  X, 
  Timer, 
  Watch, 
  AlarmClock, 
  Clock, 
  Github, 
  Heart, 
  Volume2,
  Maximize,
  Settings
} from "lucide-react";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { useFullscreenContext } from "../../contexts/FullscreenContext";
import { useSound } from "../../contexts/SoundContext";
import { useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", icon: Timer, label: "Timer" },
  { to: "/stopwatch", icon: Watch, label: "Stopwatch" },
  { to: "/alarm", icon: AlarmClock, label: "Alarm" },
  { to: "/clock", icon: Clock, label: "World Clock" },
];

const MobileNav = ({ isOpen, onClose, onOpenSoundSettings }) => {
  const location = useLocation();
  const { isSupported: isFullscreenSupported, openFullscreenMode } = useFullscreenContext();
  const { activeAmbientSounds, settings } = useSound();

  // Get current mode for fullscreen
  const getCurrentMode = () => {
    switch (location.pathname) {
      case "/":
        return "timer";
      case "/stopwatch":
        return "stopwatch";
      default:
        return null;
    }
  };

  const currentMode = getCurrentMode();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 dark:bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 dark:border-gray-200">
          <div className="text-xl font-black tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Clock
            </span>
            <span className="text-white dark:text-gray-900">eye</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-slate-400 dark:text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isMobile
              onClick={onClose}
            />
          ))}

          {/* Divider */}
          <div className="my-4 border-t border-slate-800 dark:border-gray-200" />

          {/* Fullscreen Button (if supported and on timer/stopwatch) */}
          {isFullscreenSupported && currentMode && (
            <button
              onClick={() => {
                onClose();
                openFullscreenMode(currentMode);
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-300 dark:text-gray-600 hover:bg-slate-800/50 dark:hover:bg-gray-100 transition-colors"
            >
              <Maximize className="w-6 h-6" />
              <span className="font-semibold text-lg">Fullscreen Mode</span>
            </button>
          )}

          {/* Sound Settings Button */}
          <button
            onClick={onOpenSoundSettings}
            className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-slate-300 dark:text-gray-600 hover:bg-slate-800/50 dark:hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Volume2 className="w-6 h-6" />
                {activeAmbientSounds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
              <span className="font-semibold text-lg">Sound Settings</span>
            </div>
            <span className="text-xs text-slate-500 bg-slate-800 dark:bg-gray-200 px-2 py-1 rounded">
              {settings.alarmVolume}%
            </span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 dark:border-gray-200 space-y-4">
          {/* Theme toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400 dark:text-gray-500">
              Theme
            </span>
            <ThemeToggle showLabel />
          </div>

          {/* Ambient sounds indicator */}
          {activeAmbientSounds.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">
                {activeAmbientSounds.length} ambient sound{activeAmbientSounds.length > 1 ? 's' : ''} playing
              </span>
            </div>
          )}

          {/* Links */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/abhi-dhakar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              Made by Abhishek Nagar <Heart className="w-3 h-3 text-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileNav);