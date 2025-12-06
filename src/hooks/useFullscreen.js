// src/hooks/useFullscreen.js
import { useState, useEffect, useCallback, useRef } from "react";

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenElement, setFullscreenElement] = useState(null);
  const elementRef = useRef(null);

  // Check if fullscreen is supported
  const isSupported =
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled;

  // Update state when fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      setIsFullscreen(!!fsElement);
      setFullscreenElement(fsElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Enter fullscreen
  const enterFullscreen = useCallback(
    async (element = document.documentElement) => {
      try {
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          await element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
        return true;
      } catch (error) {
        console.error("Error entering fullscreen:", error);
        return false;
      }
    },
    []
  );

  // Exit fullscreen
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      return true;
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
      return false;
    }
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(
    async (element) => {
      if (isFullscreen) {
        return await exitFullscreen();
      } else {
        return await enterFullscreen(element || elementRef.current);
      }
    },
    [isFullscreen, enterFullscreen, exitFullscreen]
  );

  // Lock screen orientation (for mobile)
  const lockOrientation = useCallback(async (orientation = "landscape") => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock(orientation);
        return true;
      }
    } catch (error) {
      console.warn("Orientation lock not supported:", error);
    }
    return false;
  }, []);

  // Unlock screen orientation
  const unlockOrientation = useCallback(() => {
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (error) {
      console.warn("Orientation unlock error:", error);
    }
  }, []);

  return {
    isFullscreen,
    isSupported,
    fullscreenElement,
    elementRef,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    lockOrientation,
    unlockOrientation,
  };
};

export default useFullscreen;
