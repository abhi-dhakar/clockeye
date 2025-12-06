// src/components/layout/NavItem.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, icon: Icon, label, onClick, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (isMobile) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "text-slate-300 hover:bg-slate-800/50 dark:text-gray-600 dark:hover:bg-gray-100"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${isActive ? "animate-pulse" : ""}`}
        />
        <span className="font-semibold text-lg">{label}</span>
        {isActive && (
          <div className="ml-auto w-2 h-2 bg-white rounded-full" />
        )}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          : "text-slate-400 hover:bg-slate-800 dark:hover:bg-gray-200 hover:text-white dark:text-gray-600 dark:hover:text-gray-900"
      }`}
    >
      <Icon
        className={`w-5 h-5 transition-transform group-hover:scale-110 ${
          isActive ? "animate-pulse" : ""
        }`}
      />
      <span className="font-bold tracking-wider text-sm hidden lg:block">
        {label}
      </span>

      {/* Tooltip for mobile */}
      <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 px-2 py-1 bg-slate-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap lg:hidden">
        {label}
      </span>
    </Link>
  );
};

export default React.memo(NavItem);