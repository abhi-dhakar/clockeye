// src/components/clock/AnalogClock.jsx
import React, { useMemo } from "react";

const AnalogClock = ({ hours, minutes, seconds, size = 120, isDay = true, showSeconds = true }) => {
  const center = size / 2;
  const strokeWidth = size * 0.02;

  // Calculate hand positions
  const hands = useMemo(() => {
    const secondAngle = (seconds / 60) * 360 - 90;
    const minuteAngle = ((minutes + seconds / 60) / 60) * 360 - 90;
    const hourAngle = ((hours % 12 + minutes / 60) / 12) * 360 - 90;

    const hourLength = size * 0.25;
    const minuteLength = size * 0.35;
    const secondLength = size * 0.38;

    const toRadians = (angle) => (angle * Math.PI) / 180;

    return {
      hour: {
        x2: center + hourLength * Math.cos(toRadians(hourAngle)),
        y2: center + hourLength * Math.sin(toRadians(hourAngle)),
      },
      minute: {
        x2: center + minuteLength * Math.cos(toRadians(minuteAngle)),
        y2: center + minuteLength * Math.sin(toRadians(minuteAngle)),
      },
      second: {
        x2: center + secondLength * Math.cos(toRadians(secondAngle)),
        y2: center + secondLength * Math.sin(toRadians(secondAngle)),
      },
    };
  }, [hours, minutes, seconds, size, center]);

  // Generate hour markers
  const hourMarkers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = ((i * 30 - 90) * Math.PI) / 180;
      const outerRadius = size * 0.42;
      const innerRadius = size * (i % 3 === 0 ? 0.35 : 0.38);

      return {
        x1: center + innerRadius * Math.cos(angle),
        y1: center + innerRadius * Math.sin(angle),
        x2: center + outerRadius * Math.cos(angle),
        y2: center + outerRadius * Math.sin(angle),
        isMajor: i % 3 === 0,
      };
    });
  }, [size, center]);

  return (
    <svg width={size} height={size} className="drop-shadow-lg">
      {/* Background gradient based on day/night */}
      <defs>
        <linearGradient id={`clockBg-${isDay}`} x1="0%" y1="0%" x2="100%" y2="100%">
          {isDay ? (
            <>
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </>
          )}
        </linearGradient>
        <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Clock face */}
      <circle
        cx={center}
        cy={center}
        r={size * 0.45}
        fill={`url(#clockBg-${isDay})`}
        stroke={isDay ? "#cbd5e1" : "#334155"}
        strokeWidth={strokeWidth}
      />

      {/* Hour markers */}
      {hourMarkers.map((marker, i) => (
        <line
          key={i}
          x1={marker.x1}
          y1={marker.y1}
          x2={marker.x2}
          y2={marker.y2}
          stroke={isDay ? "#64748b" : "#94a3b8"}
          strokeWidth={marker.isMajor ? strokeWidth * 1.5 : strokeWidth}
          strokeLinecap="round"
        />
      ))}

      {/* Hour hand */}
      <line
        x1={center}
        y1={center}
        x2={hands.hour.x2}
        y2={hands.hour.y2}
        stroke={isDay ? "#1e293b" : "#f1f5f9"}
        strokeWidth={strokeWidth * 3}
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={center}
        y1={center}
        x2={hands.minute.x2}
        y2={hands.minute.y2}
        stroke={isDay ? "#334155" : "#e2e8f0"}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
      />

      {/* Second hand */}
      {showSeconds && (
        <line
          x1={center}
          y1={center}
          x2={hands.second.x2}
          y2={hands.second.y2}
          stroke="#ef4444"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )}

      {/* Center dot */}
      <circle
        cx={center}
        cy={center}
        r={size * 0.03}
        fill="url(#handGradient)"
      />
    </svg>
  );
};

export default React.memo(AnalogClock);