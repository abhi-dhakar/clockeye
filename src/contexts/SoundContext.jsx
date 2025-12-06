// src/contexts/SoundContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { 
  ALARM_SOUNDS, 
  TIMER_SOUNDS, 
  AMBIENT_SOUNDS, 
  DEFAULT_SETTINGS 
} from "../data/sounds";

const SoundContext = createContext(null);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
};

const STORAGE_KEY = "sound_settings";
const CUSTOM_SOUNDS_KEY = "custom_sounds";

export const SoundProvider = ({ children }) => {
  // Load saved settings
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  };

  // Load custom sounds
  const loadCustomSounds = () => {
    try {
      const saved = localStorage.getItem(CUSTOM_SOUNDS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log(`📂 Loaded ${parsed.length} custom sounds from storage`);
        return parsed;
      }
    } catch (error) {
      console.error("Error loading custom sounds:", error);
    }
    return [];
  };

  const [settings, setSettings] = useState(loadSettings);
  const [customSounds, setCustomSounds] = useState(loadCustomSounds);
  const [previewingSound, setPreviewingSound] = useState(null);
  const [activeAmbientSounds, setActiveAmbientSounds] = useState([]);

  const previewAudioRef = useRef(null);
  const ambientAudioRefs = useRef({});
  const gradualVolumeIntervalRef = useRef(null);

  // All available sounds - combine built-in with custom
  const allAlarmSounds = [
    ...ALARM_SOUNDS, 
    ...customSounds.filter(s => s.category === "alarm")
  ];
  const allTimerSounds = [
    ...TIMER_SOUNDS, 
    ...customSounds.filter(s => s.category === "timer")
  ];
  const allAmbientSounds = [
    ...AMBIENT_SOUNDS, 
    ...customSounds.filter(s => s.category === "ambient")
  ];

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }, [settings]);

  // Save custom sounds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_SOUNDS_KEY, JSON.stringify(customSounds));
      console.log(`💾 Saved ${customSounds.length} custom sounds to storage`);
    } catch (error) {
      console.error("Error saving custom sounds:", error);
      
      // If storage is full, try to remove old sounds
      if (error.name === 'QuotaExceededError') {
        console.warn("Storage quota exceeded. Consider removing some custom sounds.");
      }
    }
  }, [customSounds]);

  // Update settings
  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Get sound by ID
  const getSound = useCallback((id, category = null) => {
    // Search in all sounds including custom
    const allSounds = [
      ...ALARM_SOUNDS, 
      ...TIMER_SOUNDS, 
      ...AMBIENT_SOUNDS, 
      ...customSounds
    ];
    
    const sound = allSounds.find(s => s.id === id);
    
    if (!sound) {
      console.warn(`Sound not found: ${id}, using fallback`);
      if (category === "timer") {
        return TIMER_SOUNDS[0];
      }
      return ALARM_SOUNDS[0];
    }
    
    return sound;
  }, [customSounds]);

  // Create Web Audio fallback beep
  const createFallbackBeep = useCallback((loop = false) => {
    let audioContext = null;
    let intervalId = null;
    let isPlaying = true;

    const playBeep = () => {
      if (!isPlaying) return;
      
      try {
        if (!audioContext || audioContext.state === 'closed') {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 880;
        oscillator.type = "sine";

        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
      } catch (error) {
        console.error("Fallback beep error:", error);
      }
    };

    playBeep();
    
    if (loop) {
      intervalId = setInterval(playBeep, 800);
    }

    return {
      pause: () => {
        isPlaying = false;
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close().catch(() => {});
        }
      },
      currentTime: 0,
      loop: loop,
    };
  }, []);

  // Play alarm sound - NO gradual volume
  const playAlarmSound = useCallback((soundId = settings.alarmSound, options = {}) => {
    const sound = getSound(soundId, "alarm");
    
    if (!sound || !sound.url) {
      console.warn(`No valid sound URL for: ${soundId}, using fallback beep`);
      return createFallbackBeep(options.loop ?? true);
    }

    console.log(`🔊 Playing alarm sound: ${sound.name} (${sound.id})`);

    try {
      const audio = new Audio(sound.url);
      const targetVolume = (options.volume ?? settings.alarmVolume) / 100;
      
      audio.volume = targetVolume;
      audio.loop = options.loop ?? true;

      audio.onerror = (e) => {
        console.error(`Error loading alarm sound ${soundId}:`, e);
      };

      audio.play()
        .then(() => console.log(`✅ Alarm sound playing: ${sound.name}`))
        .catch((error) => {
          console.error("Alarm audio play error:", error);
        });

      return audio;
    } catch (error) {
      console.error("Error creating alarm audio:", error);
      return createFallbackBeep(options.loop ?? true);
    }
  }, [settings.alarmSound, settings.alarmVolume, getSound, createFallbackBeep]);

  // Play timer sound
  const playTimerSound = useCallback((soundId = settings.timerSound, options = {}) => {
    const sound = getSound(soundId, "timer");
    
    if (!sound || !sound.url) {
      console.warn(`No valid timer sound URL for: ${soundId}, using fallback beep`);
      return createFallbackBeep(options.loop ?? false);
    }

    console.log(`🔊 Playing timer sound: ${sound.name} (${sound.id})`);

    try {
      const audio = new Audio(sound.url);
      const targetVolume = (options.volume ?? settings.timerVolume) / 100;
      
      audio.loop = options.loop ?? false;

      // Gradual volume only for timer if enabled
      if (settings.gradualVolume && options.loop) {
        audio.volume = 0;
        
        audio.onplay = () => {
          const duration = settings.gradualDuration * 1000;
          const steps = duration / 100;
          const increment = targetVolume / steps;
          let currentVol = 0;

          if (gradualVolumeIntervalRef.current) {
            clearInterval(gradualVolumeIntervalRef.current);
          }

          gradualVolumeIntervalRef.current = setInterval(() => {
            currentVol = Math.min(currentVol + increment, targetVolume);
            if (audio && !audio.paused) {
              audio.volume = currentVol;
            }
            
            if (currentVol >= targetVolume) {
              clearInterval(gradualVolumeIntervalRef.current);
              gradualVolumeIntervalRef.current = null;
            }
          }, 100);
        };
      } else {
        audio.volume = targetVolume;
      }

      audio.onpause = () => {
        if (gradualVolumeIntervalRef.current) {
          clearInterval(gradualVolumeIntervalRef.current);
          gradualVolumeIntervalRef.current = null;
        }
      };

      audio.onerror = (e) => {
        console.error(`Error loading timer sound ${soundId}:`, e);
      };

      audio.play()
        .then(() => console.log(`✅ Timer sound playing: ${sound.name}`))
        .catch((error) => {
          console.error("Timer audio play error:", error);
        });

      return audio;
    } catch (error) {
      console.error("Error creating timer audio:", error);
      return createFallbackBeep(options.loop ?? false);
    }
  }, [settings, getSound, createFallbackBeep]);

  // Stop all sounds
  const stopAllSounds = useCallback(() => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }

    if (gradualVolumeIntervalRef.current) {
      clearInterval(gradualVolumeIntervalRef.current);
      gradualVolumeIntervalRef.current = null;
    }

    setPreviewingSound(null);
  }, []);

  // Preview sound
  const previewSound = useCallback((soundId) => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }

    if (previewingSound === soundId) {
      setPreviewingSound(null);
      return;
    }

    const sound = getSound(soundId);
    if (!sound || !sound.url) {
      console.warn("Cannot preview sound:", soundId);
      return;
    }

    try {
      const audio = new Audio(sound.url);
      audio.volume = settings.alarmVolume / 100;

      audio.onended = () => {
        setPreviewingSound(null);
        previewAudioRef.current = null;
      };

      audio.onerror = () => {
        console.error("Error playing preview");
        setPreviewingSound(null);
      };

      previewAudioRef.current = audio;
      setPreviewingSound(soundId);

      audio.play().catch(err => {
        console.error("Preview error:", err);
        setPreviewingSound(null);
      });

      setTimeout(() => {
        if (previewAudioRef.current === audio) {
          audio.pause();
          setPreviewingSound(null);
          previewAudioRef.current = null;
        }
      }, 5000);
    } catch (error) {
      console.error("Error creating preview audio:", error);
    }
  }, [previewingSound, getSound, settings.alarmVolume]);

  // Stop preview
  const stopPreview = useCallback(() => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    setPreviewingSound(null);
  }, []);

  // Toggle ambient sound
  const toggleAmbientSound = useCallback((soundId) => {
    const isActive = activeAmbientSounds.includes(soundId);

    if (isActive) {
      if (ambientAudioRefs.current[soundId]) {
        ambientAudioRefs.current[soundId].pause();
        delete ambientAudioRefs.current[soundId];
      }
      setActiveAmbientSounds(prev => prev.filter(id => id !== soundId));
    } else {
      const sound = getSound(soundId);
      if (!sound || !sound.url) return;

      try {
        const audio = new Audio(sound.url);
        audio.volume = settings.ambientVolume / 100;
        audio.loop = true;

        audio.play().catch(console.error);
        ambientAudioRefs.current[soundId] = audio;
        setActiveAmbientSounds(prev => [...prev, soundId]);
      } catch (error) {
        console.error("Error playing ambient sound:", error);
      }
    }
  }, [activeAmbientSounds, settings.ambientVolume, getSound]);

  // Set ambient volume
  const setAmbientVolume = useCallback((volume) => {
    updateSettings({ ambientVolume: volume });

    Object.values(ambientAudioRefs.current).forEach(audio => {
      audio.volume = volume / 100;
    });
  }, [updateSettings]);

  // Stop all ambient sounds
  const stopAllAmbient = useCallback(() => {
    Object.values(ambientAudioRefs.current).forEach(audio => {
      audio.pause();
    });
    ambientAudioRefs.current = {};
    setActiveAmbientSounds([]);
  }, []);

  // Add custom sound - FIXED: Properly adds to existing array
  const addCustomSound = useCallback(async (file, category = "alarm", name) => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith("audio/")) {
        reject(new Error("Invalid file type. Please upload an audio file."));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error("File too large. Maximum size is 5MB."));
        return;
      }

      // Check for duplicate names
      const soundName = name || file.name.replace(/\.[^/.]+$/, "");
      const existingSound = customSounds.find(
        s => s.name.toLowerCase() === soundName.toLowerCase() && s.category === category
      );

      if (existingSound) {
        reject(new Error(`A ${category} sound with name "${soundName}" already exists.`));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const customSound = {
          id: `custom_${category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: soundName,
          description: `Custom ${category} sound`,
          url: reader.result, // Base64 data URL
          category,
          isCustom: true,
          createdAt: Date.now(),
          fileSize: file.size,
          fileType: file.type,
        };

        console.log(`📤 Adding custom sound: ${customSound.name} (${category})`);

        // Add to existing custom sounds
        setCustomSounds(prevSounds => {
          const newSounds = [...prevSounds, customSound];
          console.log(`📂 Total custom sounds: ${newSounds.length}`);
          return newSounds;
        });

        resolve(customSound);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file. Please try again."));
      };

      reader.readAsDataURL(file);
    });
  }, [customSounds]);

  // Delete custom sound
  const deleteCustomSound = useCallback((soundId) => {
    console.log(`🗑️ Deleting custom sound: ${soundId}`);
    
    setCustomSounds(prevSounds => {
      const newSounds = prevSounds.filter(s => s.id !== soundId);
      console.log(`📂 Remaining custom sounds: ${newSounds.length}`);
      return newSounds;
    });

    // Reset to default if deleted sound was selected
    if (settings.alarmSound === soundId) {
      updateSettings({ alarmSound: "classic" });
    }
    if (settings.timerSound === soundId) {
      updateSettings({ timerSound: "ding" });
    }
  }, [settings.alarmSound, settings.timerSound, updateSettings]);

  // Delete all custom sounds
  const deleteAllCustomSounds = useCallback((category = null) => {
    if (category) {
      console.log(`🗑️ Deleting all custom ${category} sounds`);
      setCustomSounds(prevSounds => prevSounds.filter(s => s.category !== category));
    } else {
      console.log(`🗑️ Deleting all custom sounds`);
      setCustomSounds([]);
    }

    // Reset to defaults
    updateSettings({ 
      alarmSound: "classic", 
      timerSound: "ding" 
    });
  }, [updateSettings]);

  // Get custom sounds count
  const getCustomSoundsCount = useCallback((category = null) => {
    if (category) {
      return customSounds.filter(s => s.category === category).length;
    }
    return customSounds.length;
  }, [customSounds]);

  // Vibrate
  const vibrate = useCallback((pattern = [200, 100, 200]) => {
    if (settings.vibrationEnabled && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }, [settings.vibrationEnabled]);

  // Stop vibration
  const stopVibrate = useCallback(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPreview();
      stopAllAmbient();
      stopAllSounds();
    };
  }, [stopPreview, stopAllAmbient, stopAllSounds]);

  const value = {
    // Settings
    settings,
    updateSettings,

    // Built-in sounds
    alarmSounds: allAlarmSounds,
    timerSounds: allTimerSounds,
    ambientSounds: allAmbientSounds,

    // Custom sounds
    customSounds,
    addCustomSound,
    deleteCustomSound,
    deleteAllCustomSounds,
    getCustomSoundsCount,

    // Preview
    previewingSound,
    previewSound,
    stopPreview,

    // Play sounds
    playAlarmSound,
    playTimerSound,
    stopAllSounds,

    // Ambient
    activeAmbientSounds,
    toggleAmbientSound,
    setAmbientVolume,
    stopAllAmbient,

    // Utils
    getSound,
    vibrate,
    stopVibrate,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundProvider;