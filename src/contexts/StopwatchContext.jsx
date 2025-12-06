// src/contexts/StopwatchContext.jsx
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

const StopwatchContext = createContext(null);

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error("useStopwatch must be used within a StopwatchProvider");
  }
  return context;
};

const STORAGE_KEY = "stopwatch_state";

export const StopwatchProvider = ({ children }) => {
  // --- 1. Load State from LocalStorage ---
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Validate data types to prevent NaN
        return {
          isRunning: Boolean(parsed.isRunning),
          startTime: typeof parsed.startTime === 'number' ? parsed.startTime : null,
          accumulated: typeof parsed.accumulated === 'number' ? parsed.accumulated : 0,
          laps: Array.isArray(parsed.laps) ? parsed.laps : [],
          lastLapTime: typeof parsed.lastLapTime === 'number' ? parsed.lastLapTime : 0
        };
      }
    } catch (error) {
      console.error("Error loading stopwatch:", error);
    }
    // Default State
    return {
      isRunning: false,
      startTime: null,
      accumulated: 0,
      laps: [],
      lastLapTime: 0
    };
  };

  const initialState = loadSavedState();

  // --- State Initialization ---
  // We use a function here to calculate the initial time ONLY ONCE on mount
  const calculateInitialTime = () => {
    if (initialState.isRunning && initialState.startTime) {
      // Calculate elapsed time since start (Refresh Persistence)
      const elapsed = Date.now() - initialState.startTime;
      return (initialState.accumulated || 0) + elapsed;
    }
    return initialState.accumulated || 0;
  };

  const [time, setTime] = useState(calculateInitialTime);
  const [isRunning, setIsRunning] = useState(initialState.isRunning);
  const [laps, setLaps] = useState(initialState.laps);
  const [lastLapTime, setLastLapTime] = useState(initialState.lastLapTime);

  // --- Refs (Source of Truth) ---
  const stateRef = useRef({
    isRunning: initialState.isRunning,
    startTime: initialState.startTime,
    accumulated: initialState.accumulated,
    laps: initialState.laps,
    lastLapTime: initialState.lastLapTime
  });

  const animationFrameRef = useRef(null);

  // --- 2. Save Helper ---
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateRef.current));
  };

  // --- 3. Animation Loop ---
  const updateLoop = useCallback(() => {
    if (stateRef.current.isRunning && stateRef.current.startTime !== null) {
      const now = Date.now();
      const elapsed = now - stateRef.current.startTime;
      const total = (stateRef.current.accumulated || 0) + elapsed;
      
      // Prevent NaN from ever setting state
      if (!isNaN(total)) {
        setTime(total);
      }
      
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    }
  }, []);

  // --- 4. Actions ---

  const start = useCallback(() => {
    if (!stateRef.current.isRunning) {
      const now = Date.now();
      
      stateRef.current.isRunning = true;
      stateRef.current.startTime = now;
      
      setIsRunning(true);
      saveToStorage();
      
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    }
  }, [updateLoop]);

  const stop = useCallback(() => {
    if (stateRef.current.isRunning) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      
      const now = Date.now();
      const elapsed = now - (stateRef.current.startTime || now); // Fallback to 0 diff if null
      
      // Update Accumulated
      stateRef.current.accumulated = (stateRef.current.accumulated || 0) + elapsed;
      stateRef.current.startTime = null;
      stateRef.current.isRunning = false;
      
      setIsRunning(false);
      setTime(stateRef.current.accumulated);
      saveToStorage();
    }
  }, []);

  const reset = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    stateRef.current = {
      isRunning: false,
      startTime: null,
      accumulated: 0,
      laps: [],
      lastLapTime: 0
    };
    
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
    
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggle = useCallback(() => {
    if (stateRef.current.isRunning) stop();
    else start();
  }, [start, stop]);

  const lap = useCallback(() => {
    if (stateRef.current.isRunning) {
      const now = Date.now();
      // Calculate current total manually to ensure sync
      const currentTotal = (stateRef.current.accumulated || 0) + (now - stateRef.current.startTime);
      
      const lapTime = currentTotal - (stateRef.current.lastLapTime || 0);
      const newLaps = [{ total: currentTotal, split: lapTime }, ...laps];
      
      setLaps(newLaps);
      setLastLapTime(currentTotal);
      
      stateRef.current.laps = newLaps;
      stateRef.current.lastLapTime = currentTotal;
      saveToStorage();
    }
  }, [laps]);

  // --- 5. Auto-Resume on Mount ---
  useEffect(() => {
    // If saved state says running, start the loop immediately
    if (stateRef.current.isRunning) {
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    }
    
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [updateLoop]);

  const lapStats = useCallback(() => {
    if (laps.length < 2) return null;
    const splits = laps.map((l) => l.split);
    const fastest = Math.min(...splits);
    const slowest = Math.max(...splits);
    const average = splits.reduce((a, b) => a + b, 0) / splits.length;
    return { fastest, slowest, average, fastestIndex: splits.indexOf(fastest), slowestIndex: splits.indexOf(slowest) };
  }, [laps]);

  const value = {
    time: isNaN(time) ? 0 : time, // Final Safety Check
    isRunning,
    laps,
    lastLapTime,
    start,
    stop,
    toggle,
    reset,
    lap,
    lapStats: lapStats(),
    lapCount: laps.length,
  };

  return (
    <StopwatchContext.Provider value={value}>
      {children}
    </StopwatchContext.Provider>
  );
};

export default StopwatchProvider;