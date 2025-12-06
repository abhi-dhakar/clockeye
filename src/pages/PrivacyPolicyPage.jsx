// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import { Shield, Mail, Calendar } from "lucide-react";
import SEO from "../components/SEO";

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 15, 2025";
  const websiteName = "Clockeye";
  const websiteUrl = "https://Clockeye.com";
  const contactEmail = "abhidhakar001@gmail.com";

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO title="Privacy Policy" description="Privacy Policy for ClockEye application." url="/privacy" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert dark:prose max-w-none space-y-8">
          {/* Introduction */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-slate-300 dark:text-gray-600 leading-relaxed">
              Welcome to {websiteName} ("{websiteUrl}"). We respect your privacy and are 
              committed to protecting your personal data. This privacy policy will inform you 
              about how we look after your personal data when you visit our website and tell 
              you about your privacy rights and how the law protects you.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-slate-300 dark:text-gray-600">
              <p>We may collect the following types of information:</p>
              
              <h3 className="text-lg font-semibold text-white dark:text-gray-900 mt-4">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Device information</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>

              <h3 className="text-lg font-semibold text-white dark:text-gray-900 mt-4">
                Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Timer and alarm settings (stored locally on your device)</li>
                <li>Custom sounds (stored locally on your device)</li>
                <li>Contact information if you reach out to us</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our service</li>
                <li>To improve user experience</li>
                <li>To analyze usage patterns and optimize performance</li>
                <li>To detect and prevent technical issues</li>
                <li>To serve relevant advertisements</li>
              </ul>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                We use cookies and similar tracking technologies to track activity on our 
                website and store certain information. Cookies are files with a small amount 
                of data which may include an anonymous unique identifier.
              </p>
              
              <h3 className="text-lg font-semibold text-white dark:text-gray-900 mt-4">
                Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>

              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a 
                cookie is being sent. However, if you do not accept cookies, you may not be 
                able to use some portions of our website.
              </p>
            </div>
          </section>

          {/* Google AdSense */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Third-Party Advertising
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                We use Google AdSense to display advertisements on our website. Google AdSense 
                uses cookies to serve ads based on your prior visits to our website or other 
                websites. Google's use of advertising cookies enables it and its partners to 
                serve ads based on your visit to our site and/or other sites on the Internet.
              </p>
              <p>
                You may opt out of personalized advertising by visiting{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Google Ads Settings
                </a>.
              </p>
              <p>
                For more information about how Google uses data, please visit{" "}
                <a 
                  href="https://policies.google.com/technologies/partner-sites" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Google's Privacy & Terms
                </a>.
              </p>
            </div>
          </section>

          {/* Data Storage */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Data Storage and Security
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>
                Most of your data (timer settings, alarms, custom sounds) is stored locally 
                on your device using browser storage technologies (localStorage). This data 
                never leaves your device and is not transmitted to our servers.
              </p>
              <p>
                We implement appropriate security measures to protect against unauthorized 
                access, alteration, disclosure, or destruction of your information.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Your Rights
            </h2>
            <div className="text-slate-300 dark:text-gray-600 space-y-4">
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure of your data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:underline">
                  {contactEmail}
                </a>.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                Our service is not intended for children under the age of 13. We do not 
                knowingly collect personal information from children under 13. If you are a 
                parent or guardian and you are aware that your child has provided us with 
                personal information, please contact us.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
              Changes to This Privacy Policy
            </h2>
            <div className="text-slate-300 dark:text-gray-600">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last 
                updated" date at the top of this page. You are advised to review this Privacy 
                Policy periodically for any changes.
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
                If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicyPage;