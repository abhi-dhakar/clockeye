// src/contexts/FullscreenContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import useFullscreen from "../hooks/useFullscreen";

const FullscreenContext = createContext(null);

export const useFullscreenContext = () => {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error("useFullscreenContext must be used within FullscreenProvider");
  }
  return context;
};

export const FullscreenProvider = ({ children }) => {
  const fullscreen = useFullscreen();
  const [fullscreenMode, setFullscreenMode] = useState(null); // 'timer', 'stopwatch', 'clock', null
  const [fullscreenSettings, setFullscreenSettings] = useState({
    showControls: true,
    showProgress: true,
    autoHideControls: true,
    autoHideDelay: 3000,
    theme: "dark", // dark, light, gradient
    backgroundColor: "#0f172a",
  });

  const openFullscreenMode = useCallback(async (mode) => {
    const success = await fullscreen.enterFullscreen();
    if (success) {
      setFullscreenMode(mode);
      // Lock to landscape on mobile
      fullscreen.lockOrientation("landscape");
    }
    return success;
  }, [fullscreen]);

  const closeFullscreenMode = useCallback(async () => {
    await fullscreen.exitFullscreen();
    setFullscreenMode(null);
    fullscreen.unlockOrientation();
  }, [fullscreen]);

  const updateSettings = useCallback((updates) => {
    setFullscreenSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const value = {
    ...fullscreen,
    fullscreenMode,
    fullscreenSettings,
    openFullscreenMode,
    closeFullscreenMode,
    updateSettings,
  };

  return (
    <FullscreenContext.Provider value={value}>
      {children}
    </FullscreenContext.Provider>
  );
};

export default FullscreenProvider;