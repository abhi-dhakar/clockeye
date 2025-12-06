// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Timer,
  Watch,
  AlarmClock,
  Clock,
  Github,
  Twitter,
  Heart,
  Sparkles,
  Shield,
  FileText,
  Users,
  Mail,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 dark:bg-gray-50 border-t border-slate-800 dark:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start md:items-start gap-3">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="ClockEye logo"
                loading="lazy"
                className="
        w-20 h-auto        /* mobile */
        sm:w-24            /* small screens */
        md:w-28            /* medium */
        lg:w-32            /* large */
        object-contain
        transition-transform
        hover:scale-105
      "
              />
            </Link>

            <p className="text-slate-400 dark:text-gray-500 text-sm leading-relaxed max-w-xs">
              Your all-in-one time management toolkit — timer, stopwatch,
              alarms, and world clock.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-bold text-white dark:text-gray-900 uppercase tracking-wider mb-4">
              Features
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <Timer className="w-4 h-4" /> Timer
                </Link>
              </li>
              <li>
                <Link
                  to="/stopwatch"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <Watch className="w-4 h-4" /> Stopwatch
                </Link>
              </li>
              <li>
                <Link
                  to="/alarm"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <AlarmClock className="w-4 h-4" /> Alarm
                </Link>
              </li>
              <li>
                <Link
                  to="/clock"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <Clock className="w-4 h-4" /> World Clock
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white dark:text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <Users className="w-4 h-4" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white dark:text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="flex items-center gap-2 text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-sm text-slate-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-slate-800 dark:border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            © {currentYear} Clockeye. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-gray-400">
            Made by Abhishek Nagar{" "}
            <Heart className="w-4 h-4 text-rose-500 animate-pulse" /> for
            productivity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
