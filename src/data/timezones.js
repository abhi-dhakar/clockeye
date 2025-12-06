// src/data/timezones.js
export const POPULAR_TIME_ZONES = [
  {
    city: "New Delhi",
    zone: "Asia/Kolkata",
    country: "India",
    offset: "UTC+5:30",
    emoji: "🇮🇳",
  },
  {
    city: "New York",
    zone: "America/New_York",
    country: "USA",
    offset: "UTC-5",
    emoji: "🇺🇸",
  },
  {
    city: "London",
    zone: "Europe/London",
    country: "UK",
    offset: "UTC+0",
    emoji: "🇬🇧",
  },
  {
    city: "Tokyo",
    zone: "Asia/Tokyo",
    country: "Japan",
    offset: "UTC+9",
    emoji: "🇯🇵",
  },
  {
    city: "Sydney",
    zone: "Australia/Sydney",
    country: "Australia",
    offset: "UTC+11",
    emoji: "🇦🇺",
  },
  {
    city: "Dubai",
    zone: "Asia/Dubai",
    country: "UAE",
    offset: "UTC+4",
    emoji: "🇦🇪",
  },
  {
    city: "Paris",
    zone: "Europe/Paris",
    country: "France",
    offset: "UTC+1",
    emoji: "🇫🇷",
  },
  {
    city: "Singapore",
    zone: "Asia/Singapore",
    country: "Singapore",
    offset: "UTC+8",
    emoji: "🇸🇬",
  },
  {
    city: "Los Angeles",
    zone: "America/Los_Angeles",
    country: "USA",
    offset: "UTC-8",
    emoji: "🇺🇸",
  },
  {
    city: "Hong Kong",
    zone: "Asia/Hong_Kong",
    country: "China",
    offset: "UTC+8",
    emoji: "🇭🇰",
  },
  {
    city: "Moscow",
    zone: "Europe/Moscow",
    country: "Russia",
    offset: "UTC+3",
    emoji: "🇷🇺",
  },
  {
    city: "São Paulo",
    zone: "America/Sao_Paulo",
    country: "Brazil",
    offset: "UTC-3",
    emoji: "🇧🇷",
  },
  {
    city: "Berlin",
    zone: "Europe/Berlin",
    country: "Germany",
    offset: "UTC+1",
    emoji: "🇩🇪",
  },
  {
    city: "Toronto",
    zone: "America/Toronto",
    country: "Canada",
    offset: "UTC-5",
    emoji: "🇨🇦",
  },
  {
    city: "Seoul",
    zone: "Asia/Seoul",
    country: "South Korea",
    offset: "UTC+9",
    emoji: "🇰🇷",
  },
  {
    city: "Bangkok",
    zone: "Asia/Bangkok",
    country: "Thailand",
    offset: "UTC+7",
    emoji: "🇹🇭",
  },
  {
    city: "Cairo",
    zone: "Africa/Cairo",
    country: "Egypt",
    offset: "UTC+2",
    emoji: "🇪🇬",
  },
  {
    city: "Jakarta",
    zone: "Asia/Jakarta",
    country: "Indonesia",
    offset: "UTC+7",
    emoji: "🇮🇩",
  },
  {
    city: "Amsterdam",
    zone: "Europe/Amsterdam",
    country: "Netherlands",
    offset: "UTC+1",
    emoji: "🇳🇱",
  },
  {
    city: "Istanbul",
    zone: "Europe/Istanbul",
    country: "Turkey",
    offset: "UTC+3",
    emoji: "🇹🇷",
  },
];

export const DEFAULT_ZONES = [
  "Asia/Kolkata",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Asia/Dubai",
];

export const getTimeZoneInfo = (zone) => {
  return (
    POPULAR_TIME_ZONES.find((tz) => tz.zone === zone) || {
      city: zone.split("/").pop().replace(/_/g, " "),
      zone,
      country: "",
      offset: "",
      emoji: "🌍",
    }
  );
};
