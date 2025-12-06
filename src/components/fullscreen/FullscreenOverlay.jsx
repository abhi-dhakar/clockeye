// src/components/fullscreen/FullscreenOverlay.jsx
import React from "react";
import { useFullscreenContext } from "../../contexts/FullscreenContext";
import FullscreenTimer from "./FullscreenTimer";
import FullscreenStopwatch from "./FullscreenStopwatch";

const FullscreenOverlay = () => {
  const { isFullscreen, fullscreenMode } = useFullscreenContext();

  if (!isFullscreen || !fullscreenMode) return null;

  switch (fullscreenMode) {
    case "timer":
      return <FullscreenTimer />;
    case "stopwatch":
      return <FullscreenStopwatch />;
    default:
      return null;
  }
};

export default FullscreenOverlay;