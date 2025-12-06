// src/contexts/ClockContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { DEFAULT_ZONES, POPULAR_TIME_ZONES, getTimeZoneInfo } from "../data/timezones";

const ClockContext = createContext(null);

export const useClock = () => {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
};

const STORAGE_KEY = "world_clock_zones";

// Time formatting utilities
const formatTime = (zone, hour12 = true) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12,
      timeZone: zone,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
};

const formatDate = (zone) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: zone,
    }).format(new Date());
  } catch {
    return "---";
  }
};

const getTimeComponents = (zone) => {
  try {
    const now = new Date();
    const options = { timeZone: zone };
    
    const hours = parseInt(
      new Intl.DateTimeFormat("en-US", { ...options, hour: "numeric", hour12: false }).format(now)
    );
    const minutes = parseInt(
      new Intl.DateTimeFormat("en-US", { ...options, minute: "numeric" }).format(now)
    );
    const seconds = now.getSeconds();

    return { hours, minutes, seconds };
  } catch {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
};

const isDayTime = (zone) => {
  const { hours } = getTimeComponents(zone);
  return hours >= 6 && hours < 18;
};

const getTimeDifference = (zone) => {
  try {
    const now = new Date();
    const localOffset = now.getTimezoneOffset();
    
    // Get the target timezone offset
    const targetDate = new Date(now.toLocaleString("en-US", { timeZone: zone }));
    const localDate = new Date(now.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
    
    const diffMs = targetDate - localDate;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    
    if (diffHours === 0) return "Same time";
    if (diffHours > 0) return `+${diffHours}h`;
    return `${diffHours}h`;
  } catch {
    return "";
  }
};

export const ClockProvider = ({ children }) => {
  // Load saved zones
  const loadSavedZones = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Error loading saved zones:", error);
    }
    return DEFAULT_ZONES;
  };

  const [selectedZones, setSelectedZones] = useState(loadSavedZones);
  const [times, setTimes] = useState({});
  const [hour12, setHour12] = useState(true);
  const [showAnalog, setShowAnalog] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const intervalRef = useRef(null);

  // Get local timezone
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Update all times
  const updateTimes = useCallback(() => {
    const now = new Date();
    setCurrentTime(now);

    const newTimes = {};
    const allZones = [localZone, ...selectedZones];

    allZones.forEach((zone) => {
      newTimes[zone] = {
        time: formatTime(zone, hour12),
        date: formatDate(zone),
        components: getTimeComponents(zone),
        isDay: isDayTime(zone),
        diff: zone === localZone ? "Local" : getTimeDifference(zone),
      };
    });

    setTimes(newTimes);
  }, [selectedZones, hour12, localZone]);

  // Set up interval
  useEffect(() => {
    updateTimes();
    intervalRef.current = setInterval(updateTimes, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateTimes]);

  // Save zones to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedZones));
    } catch (error) {
      console.error("Error saving zones:", error);
    }
  }, [selectedZones]);

  // Add timezone
  const addTimeZone = useCallback((zone) => {
    if (!selectedZones.includes(zone)) {
      setSelectedZones((prev) => [...prev, zone]);
    }
  }, [selectedZones]);

  // Remove timezone
  const removeTimeZone = useCallback((zone) => {
    setSelectedZones((prev) => prev.filter((z) => z !== zone));
  }, []);

  // Reorder timezones
  const reorderZones = useCallback((fromIndex, toIndex) => {
    setSelectedZones((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setSelectedZones(DEFAULT_ZONES);
  }, []);

  // Toggle 12/24 hour format
  const toggleHourFormat = useCallback(() => {
    setHour12((prev) => !prev);
  }, []);

  // Toggle analog/digital
  const toggleClockStyle = useCallback(() => {
    setShowAnalog((prev) => !prev);
  }, []);

  const value = {
    // State
    selectedZones,
    times,
    currentTime,
    hour12,
    showAnalog,
    localZone,
    
    // Data
    availableZones: POPULAR_TIME_ZONES,
    getTimeZoneInfo,
    
    // Actions
    addTimeZone,
    removeTimeZone,
    reorderZones,
    resetToDefaults,
    toggleHourFormat,
    toggleClockStyle,
  };

  return (
    <ClockContext.Provider value={value}>
      {children}
    </ClockContext.Provider>
  );
};

export default ClockProvider;