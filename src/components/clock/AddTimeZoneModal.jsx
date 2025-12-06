// src/components/clock/AddTimeZoneModal.jsx
import React, { useState, useMemo } from "react";
import { X, Search, Plus, Check, Globe } from "lucide-react";

const AddTimeZoneModal = ({ isOpen, onClose, availableZones, selectedZones, onAdd }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredZones = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return availableZones.filter(
      (tz) =>
        tz.city.toLowerCase().includes(query) ||
        tz.country.toLowerCase().includes(query) ||
        tz.zone.toLowerCase().includes(query)
    );
  }, [availableZones, searchQuery]);

  const handleAdd = (zone) => {
    onAdd(zone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 dark:bg-white rounded-2xl border border-slate-700 dark:border-gray-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 dark:border-gray-200">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white dark:text-slate-900">
              Add Time Zone
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 dark:border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Timezone list */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredZones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
              <Globe className="w-10 h-10 mb-3 opacity-30" />
              <p>No timezones found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredZones.map((tz) => {
                const isSelected = selectedZones.includes(tz.zone);

                return (
                  <button
                    key={tz.zone}
                    onClick={() => !isSelected && handleAdd(tz.zone)}
                    disabled={isSelected}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-blue-500/10 cursor-default"
                        : "hover:bg-slate-800/50 dark:hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tz.emoji}</span>
                      <div className="text-left">
                        <p className="font-semibold text-white dark:text-slate-900">
                          {tz.city}
                        </p>
                        <p className="text-xs text-slate-500">{tz.country}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{tz.offset}</span>
                      {isSelected ? (
                        <div className="p-1 bg-blue-500/20 rounded-lg">
                          <Check className="w-4 h-4 text-blue-400" />
                        </div>
                      ) : (
                        <div className="p-1 bg-slate-700/50 dark:bg-gray-200 rounded-lg group-hover:bg-blue-500/20">
                          <Plus className="w-4 h-4 text-slate-400" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 dark:border-gray-200 bg-slate-800/30 dark:bg-gray-50">
          <p className="text-xs text-slate-500 text-center">
            {selectedZones.length} timezone{selectedZones.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddTimeZoneModal);