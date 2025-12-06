// src/pages/TermsPage.jsx
import React from "react";
import { FileText, Calendar, Mail } from "lucide-react";
import SEO from "../components/SEO";

const TermsPage = () => {
  const lastUpdated = "January 15, 2025";
  const websiteName = "Clockeye";
  const websiteUrl = "https://Clockeye.com";
  const contactEmail = "abhidhakar001@gmail.com";

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO title="Terms of Service" description="Terms and conditions for using ClockEye." url="/terms" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Agreement */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                By accessing or using {websiteName} ({websiteUrl}), you agree to be bound by 
                these Terms of Service and all applicable laws and regulations. If you do not 
                agree with any of these terms, you are prohibited from using or accessing this 
                site.
              </p>
            </div>
          </section>

          {/* Use License */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Use License
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                Permission is granted to temporarily use {websiteName} for personal, 
                non-commercial transitory viewing only. This is the grant of a license, 
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          {/* Service Description */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Service Description
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                {websiteName} provides the following free online tools:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Timer - Countdown timer with customizable durations</li>
                <li>Stopwatch - Precise time tracking with lap functionality</li>
                <li>Alarm - Set alarms with custom sounds</li>
                <li>World Clock - View time across multiple time zones</li>
              </ul>
              <p className="mt-4">
                These services are provided "as is" without any warranties, expressed or implied.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              User Responsibilities
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>As a user of {websiteName}, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to disrupt or interfere with the service</li>
                <li>Not upload malicious content or files</li>
                <li>Not use automated systems to access the service excessively</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Disclaimer
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                The materials on {websiteName} are provided on an 'as is' basis. We make no 
                warranties, expressed or implied, and hereby disclaim and negate all other 
                warranties including, without limitation, implied warranties or conditions of 
                merchantability, fitness for a particular purpose, or non-infringement of 
                intellectual property or other violation of rights.
              </p>
              <p>
                We do not warrant or make any representations concerning the accuracy, likely 
                results, or reliability of the use of the materials on our website or otherwise 
                relating to such materials.
              </p>
            </div>
          </section>

          {/* Limitations */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Limitations of Liability
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                In no event shall {websiteName} or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on our website, even if we or an authorized representative has been notified 
                orally or in writing of the possibility of such damage.
              </p>
            </div>
          </section>

          {/* Accuracy of Materials */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Accuracy of Materials
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                The materials appearing on {websiteName} could include technical, typographical, 
                or photographic errors. We do not warrant that any of the materials on our 
                website are accurate, complete, or current. We may make changes to the materials 
                contained on our website at any time without notice.
              </p>
            </div>
          </section>

          {/* Links */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Links
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                {websiteName} has not reviewed all of the sites linked to its website and is 
                not responsible for the contents of any such linked site. The inclusion of any 
                link does not imply endorsement by {websiteName}. Use of any such linked 
                website is at the user's own risk.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Modifications
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                {websiteName} may revise these terms of service at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version 
                of these terms of service.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Governing Law
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                These terms and conditions are governed by and construed in accordance with 
                applicable laws, and you irrevocably submit to the exclusive jurisdiction of 
                the courts in that location.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:underline">
                  {contactEmail}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;