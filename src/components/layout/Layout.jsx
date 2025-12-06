// src/components/layout/Layout.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Page titles for accessibility
  const pageTitles = {
    "/": "Timer",
    "/stopwatch": "Stopwatch",
    "/alarm": "Alarm",
    "/clock": "World Clock",
  };

  const currentTitle = pageTitles[location.pathname] || "Clockeye";

  // Update document title
  React.useEffect(() => {
    document.title = `${currentTitle} | Clockeye`;
  }, [currentTitle]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 dark:bg-white text-white dark:text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-20 sm:pt-24 pb-8 px-4 relative z-10">
        <div className="w-full max-w-7xl">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;