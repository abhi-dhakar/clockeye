// src/components/stopwatch/LapsList.jsx
import React, { useMemo } from "react";
import { Trophy, TrendingDown, Clock, Trash2 } from "lucide-react";

const formatLapTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  }
  return `${seconds}.${milliseconds.toString().padStart(2, "0")}`;
};

const LapItem = React.memo(({ lap, index, totalLaps, isFastest, isSlowest }) => {
  const lapNumber = totalLaps - index;

  return (
    <div
      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
        isFastest
          ? "bg-emerald-500/10 border border-emerald-500/30"
          : isSlowest
          ? "bg-rose-500/10 border border-rose-500/30"
          : "bg-slate-900/40 dark:bg-gray-100/60 border border-slate-800/50 dark:border-gray-200/50"
      }`}
    >
      {/* Lap number */}
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            isFastest
              ? "text-emerald-400"
              : isSlowest
              ? "text-rose-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          Lap {lapNumber.toString().padStart(2, "0")}
        </span>

        {/* Badge */}
        {isFastest && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 rounded-full">
            <Trophy className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-400 uppercase">Fastest</span>
          </div>
        )}
        {isSlowest && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/20 rounded-full">
            <TrendingDown className="w-3 h-3 text-rose-400" />
            <span className="text-[10px] font-semibold text-rose-400 uppercase">Slowest</span>
          </div>
        )}
      </div>

      {/* Times */}
      <div className="flex items-center gap-6">
        {/* Split time */}
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
            Split
          </p>
          <p
            className={`font-mono font-bold ${
              isFastest
                ? "text-emerald-400"
                : isSlowest
                ? "text-rose-400"
                : "text-slate-200 dark:text-slate-800"
            }`}
          >
            {formatLapTime(lap.split)}
          </p>
        </div>

        {/* Total time */}
        <div className="text-right min-w-[80px]">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
            Total
          </p>
          <p className="font-mono font-semibold text-slate-400 dark:text-slate-600">
            {formatLapTime(lap.total)}
          </p>
        </div>
      </div>
    </div>
  );
});

LapItem.displayName = "LapItem";

const LapsList = ({ laps, lapStats, onClear }) => {
  // Calculate fastest/slowest indices
  const fastestIndex = lapStats?.fastestIndex ?? -1;
  const slowestIndex = lapStats?.slowestIndex ?? -1;

  return (
    <div className="w-full max-w-lg">
      <div className="bg-slate-950/70 dark:bg-white/90 border border-slate-800/60 dark:border-gray-200 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60 dark:border-gray-200">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-200 dark:text-slate-800 uppercase tracking-wider">
              Lap Times
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {laps.length} {laps.length === 1 ? "lap" : "laps"}
            </span>
            {laps.length > 0 && onClear && (
              <button
                onClick={onClear}
                className="p-1.5 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors"
                title="Clear laps"
              >
                <Trash2 className="w-4 h-4 text-slate-500 hover:text-rose-400" />
              </button>
            )}
          </div>
        </div>

        {/* Stats bar (if laps exist) */}
        {lapStats && (
          <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-slate-900/50 dark:bg-gray-50 border-b border-slate-800/60 dark:border-gray-200">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Fastest</p>
              <p className="font-mono font-bold text-emerald-400 text-sm">
                {formatLapTime(lapStats.fastest)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Average</p>
              <p className="font-mono font-bold text-slate-300 dark:text-slate-700 text-sm">
                {formatLapTime(lapStats.average)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Slowest</p>
              <p className="font-mono font-bold text-rose-400 text-sm">
                {formatLapTime(lapStats.slowest)}
              </p>
            </div>
          </div>
        )}

        {/* Laps list */}
        <div className="max-h-64 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {laps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400">
              <Clock className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No laps recorded</p>
              <p className="text-xs mt-1">
                Press <span className="font-semibold text-emerald-400">LAP</span> while running
              </p>
            </div>
          ) : (
            laps.map((lap, index) => (
              <LapItem
                key={index}
                lap={lap}
                index={index}
                totalLaps={laps.length}
                isFastest={index === fastestIndex}
                isSlowest={index === slowestIndex}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LapsList);