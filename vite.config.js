import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // CRITICAL: This ensures your icons AND audio files are cached for offline use
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "sounds/**/*.mp3", // Cache all alarm/timer sounds
        "*.png",
        "*.svg",
      ],
      manifest: {
        name: "ClockEye - Time Management Tools",
        short_name: "ClockEye",
        description:
          "Free online Timer, Stopwatch, Alarm, and World Clock. Works offline.",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "android-chrome-192x192.png", // Make sure this file exists in /public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png", // Make sure this file exists in /public
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png", // For Android adaptive icons
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      // Workbox handles the actual caching logic
      workbox: {
        // Increase limit to 5MB so larger custom sound files don't break the cache
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        // Explicitly tell it to grab these file types
        globPatterns: ["**/*.{js,css,html,ico,png,svg,mp3}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
