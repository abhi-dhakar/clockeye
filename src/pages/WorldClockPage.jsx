// src/pages/WorldClockPage.jsx
import React, { useState, useCallback } from "react";
import { useClock } from "../contexts/ClockContext";
import {
  Globe,
  Plus,
  Settings2,
  RotateCcw,
  Clock,
  LayoutGrid,
  List,
} from "lucide-react";

// Components
import LocalClock from "../components/clock/LocalClock";
import TimeZoneCard from "../components/clock/TimeZoneCard";
import AddTimeZoneModal from "../components/clock/AddTimeZoneModal";
import SEO from "../components/SEO";

const WorldClockPage = () => {
  const {
    selectedZones,
    times,
    hour12,
    showAnalog,
    localZone,
    availableZones,
    getTimeZoneInfo,
    addTimeZone,
    removeTimeZone,
    resetToDefaults,
    toggleHourFormat,
    toggleClockStyle,
  } = useClock();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const handleAddZone = useCallback(
    (zone) => {
      addTimeZone(zone);
    },
    [addTimeZone]
  );

  const localInfo = getTimeZoneInfo(localZone);

  return (
    <div className="min-h-screen px-4 py-8">
          <SEO
        title="World Clock - Current Time Worldwide" 
        description="Check current local time in cities worldwide. Add multiple time zones, compare time differences, and view day/night status instantly."
        keywords="world clock, current time, time zones, local time, time difference, utc time, gmt time, global clock"
        url="/clock"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500">
              World Clock
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Track time across multiple timezones in real-time
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {/* Add timezone */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Add Timezone
          </button>

          {/* Toggle clock style */}
          <button
            onClick={toggleClockStyle}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-gray-200 text-slate-300 dark:text-slate-700 rounded-xl font-medium hover:bg-slate-700 dark:hover:bg-gray-300 transition-all"
            title={showAnalog ? "Hide analog clocks" : "Show analog clocks"}
          >
            <Clock className="w-4 h-4" />
            {showAnalog ? "Digital Only" : "Show Analog"}
          </button>

          {/* Toggle 12/24 hour */}
          <button
            onClick={toggleHourFormat}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-gray-200 text-slate-300 dark:text-slate-700 rounded-xl font-medium hover:bg-slate-700 dark:hover:bg-gray-300 transition-all"
          >
            <Settings2 className="w-4 h-4" />
            {hour12 ? "24-Hour" : "12-Hour"}
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-slate-800 dark:bg-gray-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white dark:hover:text-slate-900"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white dark:hover:text-slate-900"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 dark:bg-gray-100 text-slate-400 dark:text-slate-600 rounded-xl font-medium hover:bg-slate-700 dark:hover:bg-gray-200 transition-all"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Local Clock - Featured */}
        <div className="mb-8">
          <LocalClock
            zone={localZone}
            info={localInfo}
            timeData={times[localZone]}
            showAnalog={showAnalog}
          />
        </div>

        {/* World Clocks Grid */}
        {selectedZones.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-300 dark:text-slate-700">
                World Timezones
              </h2>
              <span className="text-sm text-slate-500">
                ({selectedZones.length})
              </span>
            </div>

            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-2xl mx-auto"
              }`}
            >
              {selectedZones.map((zone) => {
                const info = getTimeZoneInfo(zone);
                return (
                  <TimeZoneCard
                    key={zone}
                    zone={zone}
                    info={info}
                    timeData={times[zone]}
                    showAnalog={showAnalog}
                    onRemove={removeTimeZone}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <Globe className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg mb-2">No world clocks added</p>
            <p className="text-sm mb-4">Add timezones to track time around the world</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Your First Timezone
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {selectedZones.length > 0 && (
          <div className="mt-8 p-4 bg-slate-900/50 dark:bg-gray-50 rounded-2xl border border-slate-800/50 dark:border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Tracking:</span>
                <span className="font-semibold text-slate-300 dark:text-slate-700">
                  {selectedZones.length + 1} timezones
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-slate-300 dark:text-slate-700">
                  {hour12 ? "12-hour" : "24-hour"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Display:</span>
                <span className="font-semibold text-slate-300 dark:text-slate-700">
                  {showAnalog ? "Analog + Digital" : "Digital only"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Timezone Modal */}
      <AddTimeZoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableZones={availableZones}
        selectedZones={selectedZones}
        onAdd={handleAddZone}
      />
    </div>
  );
};

export default WorldClockPage;