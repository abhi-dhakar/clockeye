// src/pages/DisclaimerPage.jsx
import React from "react";
import { AlertTriangle, Calendar } from "lucide-react";
import SEO from "../components/SEO";

const DisclaimerPage = () => {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO title="Disclaimer" description="Disclaimer for ClockEye application." url="/disclaimer" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-2xl mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Disclaimer
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              General Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                The information provided by Clockeye ("we," "us," or "our") on our website is 
                for general informational purposes only. All information on the site is 
                provided in good faith, however, we make no representation or warranty of any 
                kind, express or implied, regarding the accuracy, adequacy, validity, 
                reliability, availability, or completeness of any information on the site.
              </p>
            </div>
          </section>

          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              No Responsibility Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                The site cannot and does not contain professional advice. The timer, stopwatch, 
                alarm, and world clock features are provided for convenience only. Any reliance 
                you place on such information is strictly at your own risk.
              </p>
              <p>
                We are not responsible for any missed alarms, incorrect timings, or any 
                consequences that may arise from the use of this application.
              </p>
            </div>
          </section>

          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              External Links Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                The site may contain links to external websites that are not provided or 
                maintained by or in any way affiliated with us. Please note that we do not 
                guarantee the accuracy, relevance, timeliness, or completeness of any 
                information on these external websites.
              </p>
            </div>
          </section>

          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Errors and Omissions Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                While we strive to provide accurate timekeeping functionality, we cannot 
                guarantee that the website is free from errors. Time accuracy may vary based 
                on device settings, browser capabilities, and internet connectivity.
              </p>
            </div>
          </section>

          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Fair Use Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                This site may contain copyrighted material the use of which has not always 
                been specifically authorized by the copyright owner. Such material is made 
                available in an effort to provide useful tools and educational content.
              </p>
            </div>
          </section>

          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Advertising Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                This website may display advertisements. The advertisements are served by 
                third-party advertising companies and may use cookies. We do not endorse or 
                make any representations about third-party products or services advertised 
                on our website.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;