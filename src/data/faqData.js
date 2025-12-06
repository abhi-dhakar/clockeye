// src/data/faqData.js - Plain JS version (No JSX)

export const FAQ_DATA = [
  // General Questions
  {
    category: "General",
    question: "Is Clockeye completely free to use?",
    answer:
      "Yes, Clockeye is 100% free. All features, including custom sounds, are available to all users at no cost. We are supported by non-intrusive advertisements to keep the service free.",
  },
  {
    category: "General",
    question: "Do I need to create an account?",
    answer:
      "No, an account is not required. Clockeye is designed for immediate use. All your settings, alarms, and custom sounds are stored locally in your browser's storage.",
  },
  {
    category: "General",
    question: "How is my data stored?",
    answer:
      "We prioritize your privacy. All your data, including settings, alarms, stopwatch laps, and custom sounds, is stored locally on your device using your browser's localStorage. This data is never sent to our servers.",
  },
  {
    category: "General",
    question: "Does Clockeye work offline?",
    answer:
      "Yes! Clockeye is a Progressive Web App (PWA). After your first visit, the app is cached and will work offline. You can even 'install' it to your home screen on most mobile devices for an app-like experience.",
  },

  // Timer & Stopwatch
  {
    category: "Timer & Stopwatch",
    question: "Will the timer or stopwatch continue if I switch tabs?",
    answer:
      "Yes. We use a Web Worker for our timer and a high-precision method for our stopwatch, which allows them to run accurately in the background even if you switch to another browser tab or application.",
  },
  {
    category: "Timer & Stopwatch",
    question: "Why does my stopwatch keep running after I refresh the page?",
    answer:
      "This is a feature! We save the stopwatch's state (time and laps) to your browser's local storage. This ensures that you don't lose your progress if you accidentally close or refresh the tab. You can stop and reset it manually.",
  },

  // Alarm
  {
    category: "Alarm",
    question:
      "Will my alarm go off if my computer is asleep or the browser is closed?",
    answer:
      "No. As a web-based application, Clockeye requires the browser tab to be open and the computer to be awake for the alarm to trigger. We recommend using your device's native alarm clock for critical alarms.",
  },
  {
    category: "Alarm",
    question: "How do I change the snooze duration?",
    answer:
      "When an alarm rings, you will see multiple snooze options (e.g., 5 min, 10 min, 15 min). Simply click the duration you prefer. The default snooze time can be set in the main settings in a future update.",
  },

  // Custom Sounds
  {
    category: "Custom Sounds",
    question: "Why did my custom sound upload fail?",
    answer:
      "Uploads can fail for a few reasons: 1) The file may be larger than the 5MB limit. 2) The file type is not supported (we support MP3, WAV, and OGG). 3) Your browser's local storage may be full.",
  },
  {
    category: "Custom Sounds",
    question: "Can I use my custom sounds on other devices?",
    answer:
      "No. Since all data is stored locally on your device, custom sounds you upload on one device will not be available on another. We do not have a cloud sync feature at this time.",
  },
];
