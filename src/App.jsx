// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { ThemeProvider } from "./contexts/ThemeContext";
import { SoundProvider } from "./contexts/SoundContext";
import { FullscreenProvider } from "./contexts/FullscreenContext";
import { TimerProvider } from "./contexts/TimerContext";
import { StopwatchProvider } from "./contexts/StopwatchContext";
import { ClockProvider } from "./contexts/ClockContext";
import { AlarmProvider } from "./contexts/AlarmContext";

// Layout
import Layout from "./components/layout/Layout";
import FullscreenOverlay from "./components/fullscreen/FullscreenOverlay";

// Main Pages
import TimerPage from "./pages/TimerPage";
import StopwatchPage from "./pages/StopwatchPage";
import WorldClockPage from "./pages/WorldClockPage";
import AlarmPage from "./pages/AlarmPage";

// Legal/Info Pages (Required for AdSense)
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import FAQPage from "./pages/FAQPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <FullscreenProvider>
          <TimerProvider>
            <StopwatchProvider>
              <ClockProvider>
                <AlarmProvider>
                  <BrowserRouter>
                    <Layout>
                      <Routes>
                        {/* Main App Routes */}
                        <Route path="/" element={<TimerPage />} />
                        <Route path="/stopwatch" element={<StopwatchPage />} />
                        <Route path="/alarm" element={<AlarmPage />} />
                        <Route path="/clock" element={<WorldClockPage />} />

                        {/* Legal/Info Pages (Required for AdSense) */}
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/disclaimer" element={<DisclaimerPage />} />
                         <Route path="/faq" element={<FAQPage />} />
                         <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </Layout>

                    <FullscreenOverlay />
                  </BrowserRouter>
                </AlarmProvider>
              </ClockProvider>
            </StopwatchProvider>
          </TimerProvider>
        </FullscreenProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;