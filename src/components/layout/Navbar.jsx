// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Timer,
  Watch,
  AlarmClock,
  Clock,
  Menu,
  Sparkles,
  Volume2,
  Maximize,
  Settings,
  ChevronDown,
} from "lucide-react";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import SoundSettings from "../sound/SoundSettings";
import { useFullscreenContext } from "../../contexts/FullscreenContext";
import { useSound } from "../../contexts/SoundContext";

const NAV_ITEMS = [
  { to: "/", icon: Timer, label: "TIMER" },
  { to: "/stopwatch", icon: Watch, label: "STOPWATCH" },
  { to: "/alarm", icon: AlarmClock, label: "ALARM" },
  { to: "/clock", icon: Clock, label: "CLOCK" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSoundSettings, setShowSoundSettings] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  const location = useLocation();
  const {
    isFullscreen,
    openFullscreenMode,
    isSupported: isFullscreenSupported,
  } = useFullscreenContext();
const { activeAmbientSounds, settings, updateSettings } = useSound();


  // Determine current page for fullscreen mode
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowQuickSettings(false);
  }, [location.pathname]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close quick settings on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showQuickSettings && !e.target.closest(".quick-settings-container")) {
        setShowQuickSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showQuickSettings]);

  // Keyboard shortcut to open sound settings
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S for sound settings (when not typing)
      if ((e.ctrlKey || e.metaKey) && e.key === "m") {
        e.preventDefault();
        setShowSoundSettings((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-40 w-full h-16 sm:h-20 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 dark:bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-slate-900/80 dark:bg-white/80 backdrop-blur-md"
        } border-b border-slate-800/50 dark:border-gray-200/50`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ClockEye logo"
              loading="lazy"
              className="
      w-28 h-28        /* default (mobile) */
      sm:w-32 sm:h-32  /* small screens */
      md:w-36 md:h-36  /* medium screens */
      lg:w-40 lg:h-40  /* large screens */
      xl:w-44 xl:h-44  /* extra large */
      object-contain
    "
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/50 dark:bg-gray-100/50 p-1.5 rounded-2xl border border-slate-700/50 dark:border-gray-300/50">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Fullscreen Button (only on timer/stopwatch pages) */}
            {isFullscreenSupported && currentMode && !isFullscreen && (
              <button
                onClick={() => openFullscreenMode(currentMode)}
                className="hidden sm:flex items-center justify-center p-2.5 rounded-xl bg-slate-800 dark:bg-gray-200 border border-slate-700 dark:border-gray-300 hover:border-blue-500 hover:bg-slate-700 dark:hover:bg-gray-300 transition-all group"
                title="Enter fullscreen mode"
              >
                <Maximize className="w-5 h-5 text-slate-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" />
              </button>
            )}

            {/* Sound Settings Button */}
            <button
              onClick={() => setShowSoundSettings(true)}
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-800 dark:bg-gray-200 border border-slate-700 dark:border-gray-300 hover:border-blue-500 hover:bg-slate-700 dark:hover:bg-gray-300 transition-all group"
              title="Sound settings (Ctrl+M)"
            >
              <Volume2 className="w-5 h-5 text-slate-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" />

              {/* Active indicator for ambient sounds */}
              {activeAmbientSounds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 dark:border-white animate-pulse" />
              )}

              {/* Muted indicator */}
              {settings.alarmVolume === 0 && settings.timerVolume === 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-900 dark:border-white" />
              )}
            </button>

            {/* Quick Settings Dropdown */}
            <div className="relative quick-settings-container hidden sm:block">
              <button
                onClick={() => setShowQuickSettings(!showQuickSettings)}
                className="flex items-center justify-center gap-1 p-2.5 rounded-xl bg-slate-800 dark:bg-gray-200 border border-slate-700 dark:border-gray-300 hover:border-blue-500 hover:bg-slate-700 dark:hover:bg-gray-300 transition-all group"
                title="Quick settings"
              >
                <Settings className="w-5 h-5 text-slate-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" />
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform ${
                    showQuickSettings ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Quick Settings Dropdown Menu */}
              {showQuickSettings && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 dark:bg-white rounded-xl border border-slate-700 dark:border-gray-200 shadow-2xl overflow-hidden animate-fade-in">
                  <div className="p-3 border-b border-slate-700 dark:border-gray-200">
                    <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                      Quick Settings
                    </p>
                  </div>

                  <div className="p-2">
                    {/* Volume Quick Control */}
                    <div className="p-3 rounded-lg hover:bg-slate-700/50 dark:hover:bg-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300 dark:text-gray-700">
                          Alarm Volume
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {settings.alarmVolume}%
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.alarmVolume}
                        onChange={(e) =>
                          updateSettings({
                            alarmVolume: Number(e.target.value),
                          })
                        }
                        className="w-full cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Fullscreen Option */}
                    {isFullscreenSupported && currentMode && (
                      <button
                        onClick={() => {
                          openFullscreenMode(currentMode);
                          setShowQuickSettings(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-300 dark:text-gray-700 hover:bg-slate-700/50 dark:hover:bg-gray-100 transition-colors"
                      >
                        <Maximize className="w-4 h-4" />
                        <span className="text-sm">Enter Fullscreen</span>
                      </button>
                    )}

                    {/* Sound Settings Link */}
                    <button
                      onClick={() => {
                        setShowSoundSettings(true);
                        setShowQuickSettings(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-300 dark:text-gray-700 hover:bg-slate-700/50 dark:hover:bg-gray-100 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">Sound Settings</span>
                    </button>
                  </div>

                  {/* Keyboard Shortcuts Hint */}
                  <div className="p-3 bg-slate-700/30 dark:bg-gray-50 border-t border-slate-700 dark:border-gray-200">
                    <p className="text-xs text-slate-500 dark:text-gray-400">
                      <kbd className="px-1.5 py-0.5 bg-slate-600 dark:bg-gray-200 rounded text-[10px]">
                        Ctrl
                      </kbd>
                      {" + "}
                      <kbd className="px-1.5 py-0.5 bg-slate-600 dark:bg-gray-200 rounded text-[10px]">
                        M
                      </kbd>
                      {" for sound settings"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle - Desktop */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-slate-800 dark:bg-gray-200 border border-slate-700 dark:border-gray-300 hover:border-blue-500 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-slate-300 dark:text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSoundSettings={() => {
          setIsMobileMenuOpen(false);
          setShowSoundSettings(true);
        }}
      />

      {/* Sound Settings Modal */}
      <SoundSettings
        isOpen={showSoundSettings}
        onClose={() => setShowSoundSettings(false)}
      />
    </>
  );
};

export default React.memo(Navbar);
