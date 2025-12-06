// src/contexts/AlarmContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useSound } from "./SoundContext"; // Import SoundContext

const AlarmContext = createContext(null);

export const useAlarm = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error("useAlarm must be used within an AlarmProvider");
  }
  return context;
};

const STORAGE_KEY = "alarms_data";

// Generate unique ID
const generateId = () => `alarm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Format time for display
export const formatTime12h = (time24h) => {
  if (!time24h) return "Not Set";
  const [h, m] = time24h.split(":");
  const hours = parseInt(h);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${m} ${period}`;
};

// Get time until alarm
export const getTimeUntilAlarm = (time24h) => {
  if (!time24h) return null;

  const now = new Date();
  const [hours, minutes] = time24h.split(":").map(Number);

  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);

  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  const diff = alarmTime - now;
  const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
  const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hoursUntil === 0) {
    return `${minutesUntil}m`;
  }
  return `${hoursUntil}h ${minutesUntil}m`;
};

export const AlarmProvider = ({ children }) => {
  // Get sound functions from SoundContext
  const { 
    playAlarmSound, 
    stopAllSounds,
    vibrate, 
    stopVibrate,
    settings: soundSettings 
  } = useSound();

  // Load saved alarms
  const loadAlarms = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((alarm) => ({ ...alarm, hasTriggered: false }));
      }
    } catch (error) {
      console.error("Error loading alarms:", error);
    }
    return [];
  };

  const [alarms, setAlarms] = useState(loadAlarms);
  const [ringingAlarm, setRingingAlarm] = useState(null);
  const [snoozeMinutes, setSnoozeMinutes] = useState(5);

  const checkIntervalRef = useRef(null);
  const currentAudioRef = useRef(null);

  // Save alarms to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
    } catch (error) {
      console.error("Error saving alarms:", error);
    }
  }, [alarms]);

  // Add new alarm
  const addAlarm = useCallback((time24h, options = {}) => {
    const newAlarm = {
      id: generateId(),
      time: time24h,
      label: options.label || `Alarm ${formatTime12h(time24h)}`,
      isSet: true,
      hasTriggered: false,
      repeatDays: options.repeatDays || [],
      snoozeCount: 0,
      soundId: options.soundId || soundSettings.alarmSound, // Use selected sound
      volume: options.volume || soundSettings.alarmVolume, // Use selected volume
      vibration: options.vibration !== undefined ? options.vibration : soundSettings.vibrationEnabled,
      createdAt: Date.now(),
    };

    setAlarms((prev) => [...prev, newAlarm].sort((a, b) => a.time.localeCompare(b.time)));
    return newAlarm.id;
  }, [soundSettings]);

  // Delete alarm
  const deleteAlarm = useCallback((id) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));

    if (ringingAlarm?.id === id) {
      stopRinging();
    }
  }, [ringingAlarm]);

  // Toggle alarm on/off
  const toggleAlarm = useCallback((id) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id
          ? { ...alarm, isSet: !alarm.isSet, hasTriggered: false, snoozeCount: 0 }
          : alarm
      )
    );
  }, []);

  // Update alarm
  const updateAlarm = useCallback((id, updates) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, ...updates } : alarm
      )
    );
  }, []);

  // Stop ringing
  const stopRinging = useCallback(() => {
    // Stop audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }

    // Stop vibration
    stopVibrate();

    if (ringingAlarm) {
      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm.id === ringingAlarm.id
            ? {
                ...alarm,
                hasTriggered: true,
                isSet: alarm.repeatDays.length > 0,
                snoozeCount: 0,
              }
            : alarm
        )
      );
    }

    setRingingAlarm(null);
  }, [ringingAlarm, stopVibrate]);

  // Snooze alarm
  const snooze = useCallback((minutes = snoozeMinutes) => {
    // Stop audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }

    // Stop vibration
    stopVibrate();

    if (ringingAlarm) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + minutes);
      const snoozeTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm.id === ringingAlarm.id
            ? {
                ...alarm,
                time: snoozeTime,
                hasTriggered: false,
                snoozeCount: (alarm.snoozeCount || 0) + 1,
              }
            : alarm
        )
      );

      console.log(`⏰ Alarm snoozed for ${minutes} minutes until ${snoozeTime}`);
    }

    setRingingAlarm(null);
  }, [ringingAlarm, snoozeMinutes, stopVibrate]);

  // Check if any alarm should trigger
  const checkAlarms = useCallback(() => {
    if (ringingAlarm) return;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const currentDay = now.getDay();

    const triggeredAlarm = alarms.find((alarm) => {
      if (!alarm.isSet || alarm.hasTriggered) return false;
      if (alarm.time !== currentTime) return false;
      if (alarm.repeatDays.length > 0 && !alarm.repeatDays.includes(currentDay)) {
        return false;
      }
      return true;
    });

    if (triggeredAlarm) {
      console.log("🔔 Alarm triggered:", triggeredAlarm.label);
      setRingingAlarm(triggeredAlarm);

      // Play sound using the alarm's specific sound or default from settings
      const soundId = triggeredAlarm.soundId || soundSettings.alarmSound;
      const volume = triggeredAlarm.volume || soundSettings.alarmVolume;
      
      console.log(`🔊 Playing sound: ${soundId} at volume ${volume}%`);
      
      const audio = playAlarmSound(soundId, { 
        loop: true, 
        volume: volume 
      });
      
      if (audio) {
        currentAudioRef.current = audio;
      }

      // Vibrate if enabled
      if (triggeredAlarm.vibration !== false && soundSettings.vibrationEnabled) {
        vibrate([500, 200, 500, 200, 500]);
      }

      // Send notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("⏰ Alarm!", {
          body: triggeredAlarm.label,
          icon: "/alarm-icon.png",
          tag: "alarm",
          requireInteraction: true,
        });
      }
    }
  }, [alarms, ringingAlarm, playAlarmSound, vibrate, soundSettings]);

  // Set up alarm checking interval
  useEffect(() => {
    checkAlarms();
    checkIntervalRef.current = setInterval(checkAlarms, 1000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [checkAlarms]);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    };
  }, []);

  // Get next alarm
  const getNextAlarm = useCallback(() => {
    const activeAlarms = alarms.filter((a) => a.isSet && !a.hasTriggered);
    if (activeAlarms.length === 0) return null;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const futureAlarms = activeAlarms.filter((a) => a.time > currentTime);
    if (futureAlarms.length > 0) {
      return futureAlarms[0];
    }

    return activeAlarms[0];
  }, [alarms]);

  const value = {
    alarms,
    ringingAlarm,
    isRinging: !!ringingAlarm,
    snoozeMinutes,
    nextAlarm: getNextAlarm(),
    addAlarm,
    deleteAlarm,
    toggleAlarm,
    updateAlarm,
    stopRinging,
    snooze,
    setSnoozeMinutes,
    formatTime12h,
    getTimeUntilAlarm,
  };

  return (
    <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>
  );
};

export default AlarmProvider;