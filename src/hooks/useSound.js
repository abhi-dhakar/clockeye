// src/hooks/useSound.js
import { useRef, useState, useCallback, useEffect } from "react";

export const useSound = (url, options = {}) => {
  const {
    volume = 1,
    loop = false,
    autoplay = false,
    onEnd,
    onError,
    gradualVolume = false,
    gradualDuration = 30,
  } = options;

  const audioRef = useRef(null);
  const gradualIntervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Initialize audio
  useEffect(() => {
    if (!url) return;

    const audio = new Audio();
    audioRef.current = audio;

    audio.volume = gradualVolume ? 0 : volume;
    audio.loop = loop;
    audio.preload = "auto";

    const handleCanPlayThrough = () => {
      setIsLoading(false);
      setDuration(audio.duration);
      if (autoplay) play();
    };

    const handleError = (e) => {
      setIsLoading(false);
      setError(e);
      onError?.(e);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnd?.();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio.src = url;

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audio.src = "";

      if (gradualIntervalRef.current) {
        clearInterval(gradualIntervalRef.current);
      }
    };
  }, [url]);

  // Update volume
  useEffect(() => {
    if (audioRef.current && !gradualVolume) {
      audioRef.current.volume = volume;
      setCurrentVolume(volume);
    }
  }, [volume, gradualVolume]);

  // Update loop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
    }
  }, [loop]);

  // Gradual volume increase
  const startGradualVolume = useCallback(() => {
    if (!gradualVolume || !audioRef.current) return;

    const targetVolume = volume;
    const steps = gradualDuration * 10; // 10 updates per second
    const increment = targetVolume / steps;
    let currentVol = 0;

    audioRef.current.volume = 0;

    gradualIntervalRef.current = setInterval(() => {
      currentVol = Math.min(currentVol + increment, targetVolume);
      if (audioRef.current) {
        audioRef.current.volume = currentVol;
        setCurrentVolume(currentVol);
      }

      if (currentVol >= targetVolume) {
        clearInterval(gradualIntervalRef.current);
      }
    }, 100);
  }, [volume, gradualVolume, gradualDuration]);

  // Play
  const play = useCallback(async () => {
    if (!audioRef.current) return false;

    try {
      if (gradualVolume) {
        startGradualVolume();
      }

      await audioRef.current.play();
      setIsPlaying(true);
      return true;
    } catch (error) {
      console.error("Error playing sound:", error);
      setError(error);
      return false;
    }
  }, [gradualVolume, startGradualVolume]);

  // Pause
  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);

    if (gradualIntervalRef.current) {
      clearInterval(gradualIntervalRef.current);
    }
  }, []);

  // Stop
  const stop = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);

    if (gradualIntervalRef.current) {
      clearInterval(gradualIntervalRef.current);
    }
  }, []);

  // Toggle
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Set volume
  const setVolume = useCallback((newVolume) => {
    if (!audioRef.current) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
    setCurrentVolume(clampedVolume);
  }, []);

  // Seek
  const seek = useCallback(
    (time) => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
    },
    [duration]
  );

  // Fade out
  const fadeOut = useCallback(
    (duration = 1000) => {
      if (!audioRef.current) return;

      const startVolume = audioRef.current.volume;
      const steps = duration / 50;
      const decrement = startVolume / steps;
      let currentVol = startVolume;

      const fadeInterval = setInterval(() => {
        currentVol = Math.max(0, currentVol - decrement);
        if (audioRef.current) {
          audioRef.current.volume = currentVol;
        }

        if (currentVol <= 0) {
          clearInterval(fadeInterval);
          stop();
        }
      }, 50);
    },
    [stop]
  );

  return {
    play,
    pause,
    stop,
    toggle,
    setVolume,
    seek,
    fadeOut,
    isPlaying,
    isLoading,
    error,
    duration,
    currentTime,
    currentVolume,
  };
};

export default useSound;
