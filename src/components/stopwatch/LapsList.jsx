// src/components/stopwatch/LapsList.jsx
import React from "react";
import {
  Trophy,
  TrendingDown,
  TrendingUp,
  Clock,
  Trash2,
  Award,
  Timer,
  Zap,
} from "lucide-react";

const formatLapTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${seconds}.${milliseconds.toString().padStart(2, "0")}`;
};

const LapItem = React.memo(
  ({ lap, index, totalLaps, isFastest, isSlowest, isLatest }) => {
    const lapNumber = totalLaps - index;

    return (
      <div
        className={`
        group relative overflow-hidden
        rounded-2xl transition-all duration-300
        ${
          isLatest
            ? "bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 border-2 border-emerald-500/40 dark:border-emerald-500/50 shadow-lg shadow-emerald-500/20 scale-[1.02]"
            : isFastest
            ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 dark:border-green-500/40"
            : isSlowest
            ? "bg-gradient-to-br from-rose-500/10 to-red-500/10 border border-rose-500/30 dark:border-rose-500/40"
            : "bg-slate-800/40 dark:bg-gray-100 border border-slate-700/50 dark:border-gray-300 hover:bg-slate-800/60 dark:hover:bg-gray-200"
        }
      `}
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Content */}
        <div className="relative p-4">
          <div className="flex items-center justify-between mb-3">
            {/* Left: Lap Number & Badges */}
            <div className="flex items-center gap-3">
              {/* Lap Number Badge */}
              <div
                className={`
              flex items-center justify-center
              w-10 h-10 rounded-xl font-bold text-sm
              transition-all duration-300
              ${
                isLatest
                  ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                  : isFastest
                  ? "bg-gradient-to-br from-green-500/30 to-emerald-500/30 text-green-300 dark:text-green-600"
                  : isSlowest
                  ? "bg-gradient-to-br from-rose-500/30 to-red-500/30 text-rose-300 dark:text-rose-600"
                  : "bg-slate-700/50 dark:bg-gray-200 text-slate-400 dark:text-slate-600"
              }
            `}
              >
                #{lapNumber}
              </div>

              {/* Status Badges */}
              <div className="flex flex-col gap-1">
                {isLatest && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/30 dark:bg-emerald-500/40 rounded-lg">
                    <Zap className="w-3 h-3 text-emerald-300 dark:text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-300 dark:text-emerald-600 uppercase tracking-wide">
                      Latest
                    </span>
                  </div>
                )}
                {isFastest && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 dark:bg-green-500/30 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-green-400 dark:text-green-600" />
                    <span className="text-[10px] font-bold text-green-400 dark:text-green-600 uppercase tracking-wide">
                      Fastest
                    </span>
                  </div>
                )}
                {isSlowest && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/20 dark:bg-rose-500/30 rounded-lg">
                    <TrendingDown className="w-3 h-3 text-rose-400 dark:text-rose-600" />
                    <span className="text-[10px] font-bold text-rose-400 dark:text-rose-600 uppercase tracking-wide">
                      Slowest
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div className="grid grid-cols-2 gap-4">
            {/* Split Time */}
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-1">
                <Timer className="w-3 h-3 text-slate-500 dark:text-slate-600" />
                <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-wider font-semibold">
                  Split Time
                </p>
              </div>
              <p
                className={`
              font-mono font-bold text-lg
              ${
                isLatest
                  ? "text-emerald-400 dark:text-emerald-600"
                  : isFastest
                  ? "text-green-400 dark:text-green-600"
                  : isSlowest
                  ? "text-rose-400 dark:text-rose-600"
                  : "text-slate-200 dark:text-slate-800"
              }
            `}
              >
                {formatLapTime(lap.split)}
              </p>
            </div>

            {/* Total Time */}
            <div className="relative text-right">
              <div className="flex items-center justify-end gap-1.5 mb-1">
                <Clock className="w-3 h-3 text-slate-500 dark:text-slate-600" />
                <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-wider font-semibold">
                  Total Time
                </p>
              </div>
              <p className="font-mono font-semibold text-lg text-cyan-400 dark:text-cyan-600">
                {formatLapTime(lap.total)}
              </p>
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        {isLatest && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 animate-pulse pointer-events-none"></div>
        )}
      </div>
    );
  }
);

LapItem.displayName = "LapItem";

const LapsList = ({ laps, lapStats, onClear }) => {
  const fastestIndex = lapStats?.fastestIndex ?? -1;
  const slowestIndex = lapStats?.slowestIndex ?? -1;
  const hasLaps = laps && laps.length > 0;

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 dark:from-white dark:to-gray-50 backdrop-blur-xl border border-slate-700/50 dark:border-gray-200 shadow-2xl">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 dark:from-emerald-500/10 dark:to-cyan-500/10"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-700/50 dark:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 dark:from-emerald-500/30 dark:to-cyan-500/30">
              <Award className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-200 dark:text-slate-800 uppercase tracking-wider">
                Lap Records
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-600 font-mono">
                {laps.length} {laps.length === 1 ? "lap" : "laps"} recorded
              </p>
            </div>
          </div>

          {hasLaps && onClear && (
            <button
              onClick={onClear}
              className="group p-2.5 rounded-xl bg-slate-800/50 dark:bg-gray-200 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 border border-slate-700/50 dark:border-gray-300 transition-all duration-300 hover:scale-110"
              title="Clear all laps"
            >
              <Trash2 className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-rose-400 dark:group-hover:text-rose-600 transition-colors" />
            </button>
          )}
        </div>

        {/* Stats Bar */}
        {lapStats && hasLaps && (
          <div className="relative z-10 px-6 py-4 bg-slate-800/50 dark:bg-gray-50 border-b border-slate-700/50 dark:border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              {/* Fastest */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-3 rounded-xl bg-slate-900/30 dark:bg-white/50 text-center transition-transform group-hover:scale-105">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-green-400 dark:text-green-600" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-wider font-semibold">
                      Fastest
                    </p>
                  </div>
                  <p className="font-mono font-bold text-green-400 dark:text-green-600 text-base">
                    {formatLapTime(lapStats.fastest)}
                  </p>
                </div>
              </div>

              {/* Average */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-3 rounded-xl bg-slate-900/30 dark:bg-white/50 text-center transition-transform group-hover:scale-105">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Timer className="w-3 h-3 text-cyan-400 dark:text-cyan-600" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-wider font-semibold">
                      Average
                    </p>
                  </div>
                  <p className="font-mono font-bold text-cyan-400 dark:text-cyan-600 text-base">
                    {formatLapTime(lapStats.average)}
                  </p>
                </div>
              </div>

              {/* Slowest */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-3 rounded-xl bg-slate-900/30 dark:bg-white/50 text-center transition-transform group-hover:scale-105">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingDown className="w-3 h-3 text-rose-400 dark:text-rose-600" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-wider font-semibold">
                      Slowest
                    </p>
                  </div>
                  <p className="font-mono font-bold text-rose-400 dark:text-rose-600 text-base">
                    {formatLapTime(lapStats.slowest)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Laps List */}
        <div className="relative z-10 max-h-[500px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {!hasLaps ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"></div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-200 dark:to-gray-300 flex items-center justify-center border border-slate-700 dark:border-gray-400">
                  <Clock className="w-10 h-10 text-slate-600 dark:text-slate-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-400 dark:text-slate-600 mb-2">
                No Laps Yet
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 text-center max-w-xs">
                Start the timer and press{" "}
                <span className="inline-flex items-center px-2 py-0.5 bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-400 dark:text-emerald-600 rounded font-semibold text-xs mx-1">
                  LAP
                </span>{" "}
                to record your first split time
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
                isLatest={index === 0}
              />
            ))
          )}
        </div>

        {/* Footer with total count */}
        {hasLaps && (
          <div className="relative z-10 px-6 py-3 bg-slate-800/50 dark:bg-gray-50 border-t border-slate-700/50 dark:border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-600">
              <Trophy className="w-4 h-4" />
              <span className="font-semibold">
                Total: {laps.length} {laps.length === 1 ? "Lap" : "Laps"}
              </span>
              <span className="mx-2">•</span>
              <span>
                Combined Time:{" "}
                <span className="font-mono font-semibold text-emerald-400 dark:text-emerald-600">
                  {formatLapTime(laps[0]?.total || 0)}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LapsList);
