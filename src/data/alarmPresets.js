// src/data/alarmPresets.js
export const ALARM_PRESETS = [
  {
    label: "Early Bird",
    time24h: "05:00",
    icon: "🌅",
    description: "Rise with the sun",
  },
  {
    label: "Morning",
    time24h: "07:00",
    icon: "☀️",
    description: "Standard wake up",
  },
  {
    label: "Work Start",
    time24h: "09:00",
    icon: "💼",
    description: "Office hours begin",
  },
  { label: "Lunch", time24h: "12:30", icon: "🍽️", description: "Midday break" },
  {
    label: "Afternoon",
    time24h: "15:00",
    icon: "☕",
    description: "Coffee break",
  },
  {
    label: "Evening",
    time24h: "18:00",
    icon: "🌆",
    description: "End of work day",
  },
  { label: "Dinner", time24h: "19:30", icon: "🍝", description: "Dinner time" },
  {
    label: "Night",
    time24h: "22:00",
    icon: "🌙",
    description: "Wind down time",
  },
];

export const SNOOZE_OPTIONS = [
  { minutes: 5, label: "5 min" },
  { minutes: 10, label: "10 min" },
  { minutes: 15, label: "15 min" },
  { minutes: 30, label: "30 min" },
];

export const DAYS_OF_WEEK = [
  { short: "S", full: "Sunday", index: 0 },
  { short: "M", full: "Monday", index: 1 },
  { short: "T", full: "Tuesday", index: 2 },
  { short: "W", full: "Wednesday", index: 3 },
  { short: "T", full: "Thursday", index: 4 },
  { short: "F", full: "Friday", index: 5 },
  { short: "S", full: "Saturday", index: 6 },
];
