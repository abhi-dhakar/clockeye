// src/contexts/TimerContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useWorkerTimer } from "../hooks/useWorkerTimer";
import { useSound } from "./SoundContext";

const TimerContext = createContext(null);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

const DEFAULT_TIME = 25 * 60;
const STORAGE_KEY = "timer_state";

export const TimerProvider = ({ children }) => {
  const { 
    playTimerSound, 
    vibrate, 
    stopVibrate,
    settings: soundSettings 
  } = useSound();

  // --- 1. Load State ---
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Persistence Logic:
        // If running, calculate remaining time based on TARGET END TIME
        if (parsed.isRunning && parsed.targetTime) {
          const now = Date.now();
          const remaining = Math.max(0, Math.ceil((parsed.targetTime - now) / 1000));
          
          // If time has passed (<= 0), it should be finished
          // We let it load as 0, and the effect will trigger 'complete'
          return {
            ...parsed,
            timeLeft: remaining
          };
        }
        
        return parsed;
      }
    } catch (error) {
      console.error("Error loading timer state:", error);
    }
    return null;
  };

  const savedState = loadSavedState();

  const [totalSetTime, setTotalSetTime] = useState(
    savedState?.totalSetTime || DEFAULT_TIME
  );
  const [sessionCount, setSessionCount] = useState(
    savedState?.sessionCount || 0
  );
  const [isRinging, setIsRinging] = useState(false);

  // Audio Ref
  const currentAudioRef = useRef(null);
  const isRingingRef = useRef(false);

  // Use the worker timer, passing initial timeLeft
  const {
    timeLeft,
    isRunning,
    isWorkerReady,
    startTimer: workerStart,
    stopTimer: workerStop,
    resetTimer: workerReset,
    onComplete,
  } = useWorkerTimer(savedState?.timeLeft || DEFAULT_TIME);

  // --- 2. Robust Saver ---
  // We save the TARGET END TIME instead of just "timeLeft" when running.
  const saveState = useCallback(() => {
    try {
      let targetTime = null;
      
      if (isRunning && timeLeft > 0) {
        // Calculate exactly when this timer will end
        targetTime = Date.now() + (timeLeft * 1000);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        timeLeft,
        totalSetTime,
        sessionCount,
        isRunning,
        targetTime, // This is the key for persistence
        savedAt: Date.now(),
      }));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [timeLeft, totalSetTime, sessionCount, isRunning]);

  // Save periodically and on change
  useEffect(() => {
    saveState();
    // Only need interval if running to update 'savedAt' fallback
    const interval = isRunning ? setInterval(saveState, 1000) : null;
    return () => { if (interval) clearInterval(interval); };
  }, [saveState, isRunning]);

  // --- 3. Auto-Resume on Mount ---
  useEffect(() => {
    // If we loaded state saying "running" and we have time left, start immediately
    if (savedState?.isRunning && savedState?.timeLeft > 0 && !isRunning) {
      console.log("🔄 Resuming timer from refresh...");
      workerStart();
    } else if (savedState?.timeLeft === 0 && savedState?.isRunning) {
      // If we loaded 0 time but it was running, that means it finished while closed!
      // Trigger completion immediately
      onComplete(); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync isRinging ref
  useEffect(() => {
    isRingingRef.current = isRinging;
  }, [isRinging]);

  const progress = totalSetTime > 0 ? (timeLeft / totalSetTime) * 100 : 100;

  // Stop Alarm
  const stopAlarm = useCallback(() => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        if (currentAudioRef.current.remove) currentAudioRef.current.remove();
      } catch (e) { console.error(e); }
      currentAudioRef.current = null;
    }
    stopVibrate();
    setIsRinging(false);
    isRingingRef.current = false;
  }, [stopVibrate]);

  // Complete Handler
  useEffect(() => {
    onComplete(() => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      setIsRinging(true);
      isRingingRef.current = true;
      setSessionCount((prev) => prev + 1);

      // Play Sound
      const soundId = soundSettings.timerSound;
      const volume = soundSettings.timerVolume;
      const audio = playTimerSound(soundId, { loop: true, volume: volume });
      if (audio) currentAudioRef.current = audio;

      // Vibrate
      if (soundSettings.vibrationEnabled) vibrate([500, 200, 500]);

      // Notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("⏱️ Timer Complete!", {
          body: "Your focus session has ended.",
          icon: "/icon.png",
          tag: "timer-complete",
        });
      }
      
      // Update storage to show not running
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        timeLeft: 0,
        totalSetTime,
        sessionCount: sessionCount + 1,
        isRunning: false,
        targetTime: null,
        savedAt: Date.now(),
      }));
    });
  }, [onComplete, playTimerSound, vibrate, soundSettings, totalSetTime, sessionCount]);

  // Request Perms
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timeLeft > 0) {
      stopAlarm();
      workerStart();
    }
  }, [timeLeft, workerStart, stopAlarm]);

  const stopTimer = useCallback(() => {
    workerStop();
  }, [workerStop]);

  const applyNewTimerTime = useCallback((seconds) => {
    if (seconds <= 0) return;
    stopAlarm();
    setTotalSetTime(seconds);
    workerReset(seconds);
  }, [stopAlarm, workerReset]);

  const resetTimer = useCallback(() => {
    stopAlarm();
    setTotalSetTime(DEFAULT_TIME);
    workerReset(DEFAULT_TIME);
  }, [stopAlarm, workerReset]);

  const clearAllData = useCallback(() => {
    resetTimer();
    setSessionCount(0);
    localStorage.removeItem(STORAGE_KEY);
  }, [resetTimer]);

  const addTime = useCallback((seconds) => {
    if (seconds <= 0) return;
    const newTime = timeLeft + seconds;
    const newTotal = totalSetTime + seconds;
    setTotalSetTime(newTotal);
    workerReset(newTime);
    if (isRunning) setTimeout(() => workerStart(), 100);
  }, [timeLeft, totalSetTime, isRunning, workerReset, workerStart]);

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      stopVibrate();
    };
  }, [stopVibrate]);

  const value = {
    timeLeft, totalSetTime, progress, isRunning, isRinging, isWorkerReady, sessionCount,
    startTimer, stopTimer, applyNewTimerTime, stopAlarm, resetTimer, addTime, clearAllData, DEFAULT_TIME,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;