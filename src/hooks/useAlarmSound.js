// src/hooks/useAlarmSound.js
import { useRef, useCallback, useEffect, useState } from "react";

const ALARM_SOUND_PATH = "/alarm.mp3";

export const useAlarmSound = () => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const intervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio
  useEffect(() => {
    try {
      audioRef.current = new Audio(ALARM_SOUND_PATH);
      audioRef.current.preload = "auto";
      audioRef.current.loop = true;
    } catch (error) {
      console.warn("Could not load alarm sound:", error);
    }

    return () => {
      stopSound();
      if (audioRef.current) {
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Web Audio API fallback beep
  const playFallbackBeep = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      const ctx = audioContextRef.current;

      const playTone = () => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 880;
        oscillator.type = "sine";

        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
      };

      playTone();
      intervalRef.current = setInterval(playTone, 600);
      setIsPlaying(true);
    } catch (error) {
      console.error("Web Audio API error:", error);
    }
  }, []);

  // Play alarm sound
  const playSound = useCallback(() => {
    if (isPlaying) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1.0;
      audioRef.current.loop = true;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          console.log("🔔 Alarm sound playing");
        })
        .catch((error) => {
          console.warn("Audio play failed, using fallback:", error);
          playFallbackBeep();
        });
    } else {
      playFallbackBeep();
    }
  }, [isPlaying, playFallbackBeep]);

  // Stop alarm sound
  const stopSound = useCallback(() => {
    // Stop HTML audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.loop = false;
    }

    // Stop Web Audio fallback
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (audioContextRef.current) {
      // Don't close context, just stop
    }

    setIsPlaying(false);
    console.log("🔕 Alarm sound stopped");
  }, []);

  // Vibrate device (mobile)
  const vibrate = useCallback(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate([500, 200, 500, 200, 500]);
    }
  }, []);

  const stopVibrate = useCallback(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }
  }, []);

  return {
    playSound,
    stopSound,
    vibrate,
    stopVibrate,
    isPlaying,
  };
};

export default useAlarmSound;
