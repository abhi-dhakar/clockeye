// public/timer.worker.js
let intervalId = null;
let startTime = null;
let expectedTime = null;
let tickCount = 0;

// Self-correcting timer for accuracy
const startAccurateInterval = (interval) => {
  startTime = Date.now();
  expectedTime = startTime + interval;
  tickCount = 0;

  const tick = () => {
    tickCount++;
    const drift = Date.now() - expectedTime;

    // Send tick to main thread
    self.postMessage({ type: "tick", tickCount, drift });

    // Calculate next expected time
    expectedTime += interval;

    // Self-correct for drift
    const nextInterval = Math.max(0, interval - drift);
    intervalId = setTimeout(tick, nextInterval);
  };

  intervalId = setTimeout(tick, interval);
};

const stopInterval = () => {
  if (intervalId) {
    clearTimeout(intervalId);
    intervalId = null;
  }
  startTime = null;
  expectedTime = null;
  tickCount = 0;
};

self.onmessage = function (e) {
  const { command, interval } = e.data;

  switch (command) {
    case "start":
      stopInterval(); // Clear any existing
      startAccurateInterval(interval || 1000);
      self.postMessage({ type: "started" });
      break;

    case "stop":
      stopInterval();
      self.postMessage({ type: "stopped" });
      break;

    case "ping":
      self.postMessage({ type: "pong", timestamp: Date.now() });
      break;

    default:
      console.warn("Unknown command:", command);
  }
};

self.onerror = function (error) {
  self.postMessage({ type: "error", error: error.message });
};
