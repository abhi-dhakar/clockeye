// src/components/layout/ThemeToggle.jsx
import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = ({ showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all duration-300 ${
        isDark
          ? "bg-slate-800 border-slate-700 hover:border-yellow-500 text-yellow-400"
          : "bg-gray-100 border-gray-300 hover:border-blue-500 text-blue-600"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark
              ? "opacity-0 rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
      </div>

      {showLabel && (
        <span className="font-medium text-sm">
          {isDark ? "Light" : "Dark"}
        </span>
      )}

      {/* Tooltip */}
      <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 px-2 py-1 bg-slate-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {isDark ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
};

export default React.memo(ThemeToggle);