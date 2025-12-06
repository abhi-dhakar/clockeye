// src/hooks/useWorkerTimer.js
import { useEffect, useRef, useState, useCallback } from "react";

// This hook NO LONGER plays sounds - that's handled by TimerContext
export const useWorkerTimer = (initialTime) => {
  // State
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  // Refs
  const workerRef = useRef(null);
  const isRunningRef = useRef(false);
  const timeLeftRef = useRef(initialTime);
  const onCompleteCallbackRef = useRef(null);

  // Keep refs in sync with state
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  // Initialize Web Worker
  useEffect(() => {
    let worker = null;

    try {
      worker = new Worker("/timer.worker.js");
      workerRef.current = worker;

      worker.onmessage = (e) => {
        const { type, drift } = e.data;

        switch (type) {
          case "tick":
            if (!isRunningRef.current) return;

            setTimeLeft((prev) => {
              if (prev <= 1) {
                // Timer complete
                isRunningRef.current = false;
                setIsRunning(false);

                // Stop worker
                worker.postMessage({ command: "stop" });

                // Call completion callback (TimerContext will handle sound)
                if (onCompleteCallbackRef.current) {
                  onCompleteCallbackRef.current();
                }

                return 0;
              }
              return prev - 1;
            });

            if (drift && drift > 100) {
              console.warn(`Timer drift: ${drift}ms`);
            }
            break;

          case "pong":
            console.log("✅ Worker ready");
            setIsWorkerReady(true);
            break;

          case "started":
            console.log("⏱️ Timer started");
            break;

          case "stopped":
            console.log("⏱️ Timer stopped");
            break;

          default:
            break;
        }
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error);
        setIsWorkerReady(false);
      };

      worker.postMessage({ command: "ping" });
    } catch (error) {
      console.error("Failed to create worker:", error);
      setIsWorkerReady(false);
    }

    return () => {
      if (worker) {
        worker.postMessage({ command: "stop" });
        worker.terminate();
      }
    };
  }, []);

  // Start timer
  const startTimer = useCallback(() => {
    if (isRunningRef.current) return;
    if (timeLeftRef.current <= 0) return;
    if (!workerRef.current) {
      console.error("Worker not available");
      return;
    }

    setIsRunning(true);
    isRunningRef.current = true;

    workerRef.current.postMessage({ command: "start", interval: 1000 });
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;

    if (workerRef.current) {
      workerRef.current.postMessage({ command: "stop" });
    }
  }, []);

  // Reset timer
  const resetTimer = useCallback(
    (newTime) => {
      stopTimer();

      const time =
        typeof newTime === "number" && newTime > 0
          ? newTime
          : timeLeftRef.current;
      setTimeLeft(time);
      timeLeftRef.current = time;
    },
    [stopTimer]
  );

  // Set completion callback
  const onComplete = useCallback((callback) => {
    onCompleteCallbackRef.current = callback;
  }, []);

  return {
    timeLeft,
    isRunning,
    isWorkerReady,
    startTimer,
    stopTimer,
    resetTimer,
    onComplete,
  };
};

export default useWorkerTimer;
