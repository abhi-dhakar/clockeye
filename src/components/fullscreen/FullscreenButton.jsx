// src/components/fullscreen/FullscreenButton.jsx
import React from "react";
import { Maximize, Minimize } from "lucide-react";
import { useFullscreenContext } from "../../contexts/FullscreenContext";

const FullscreenButton = ({ 
  mode, 
  className = "",
  size = "md",
  showLabel = false,
}) => {
  const { isFullscreen, isSupported, openFullscreenMode, closeFullscreenMode } = useFullscreenContext();

  if (!isSupported) return null;

  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = () => {
    if (isFullscreen) {
      closeFullscreenMode();
    } else {
      openFullscreenMode(mode);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2 rounded-xl
        bg-slate-800 dark:bg-gray-200 
        border border-slate-700 dark:border-gray-300
        text-slate-300 dark:text-gray-700
        hover:bg-slate-700 dark:hover:bg-gray-300
        hover:border-blue-500
        transition-all duration-300
        ${sizes[size]}
        ${className}
      `}
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize className={iconSizes[size]} />
      ) : (
        <Maximize className={iconSizes[size]} />
      )}
      {showLabel && (
        <span className="text-sm font-medium">
          {isFullscreen ? "Exit" : "Fullscreen"}
        </span>
      )}
    </button>
  );
};

export default React.memo(FullscreenButton);