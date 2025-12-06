// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { 
  Mail, 
  MessageSquare, 
  Send, 
  User, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb
} from "lucide-react";
import SEO from "../components/SEO";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [loading, setLoading] = useState(false);

  const subjects = [
    { value: "general", label: "General Inquiry", icon: HelpCircle },
    { value: "bug", label: "Bug Report", icon: Bug },
    { value: "feature", label: "Feature Request", icon: Lightbulb },
    { value: "feedback", label: "Feedback", icon: MessageSquare },
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Simulate form submission
    // Replace with actual form submission logic (e.g., EmailJS, Formspree, etc.)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - in production, send to your backend or service
      console.log("Form submitted:", formData);
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "general", message: "" });
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO title="Contact Us" description="Get in touch with the ClockEye team for support or feedback." url="/contact" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/20 rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-400 dark:text-gray-500 max-w-2xl mx-auto">
            Have a question, suggestion, or found a bug? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
              <h3 className="text-lg font-bold text-white dark:text-gray-900 mb-4">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-400 dark:text-gray-500">Email</p>
                    <a 
                      href="mailto:abhidhakar001@gmail.com" 
                      className="text-white dark:text-gray-900 hover:text-blue-400"
                    >
                      abhidhakar001@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-400 dark:text-gray-500">Response Time</p>
                    <p className="text-white dark:text-gray-900">Within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
              <h3 className="text-lg font-bold text-white dark:text-gray-900 mb-2">
                Common Questions?
              </h3>
              <p className="text-slate-400 dark:text-gray-500 text-sm mb-4">
                Check our FAQ section for quick answers.
              </p>
              <a 
                href="/faq" 
                className="text-blue-400 hover:underline text-sm"
              >
                View FAQ →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-slate-900/50 dark:bg-gray-50 p-8 rounded-2xl border border-slate-800 dark:border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 dark:text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 dark:bg-white border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 dark:text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 dark:bg-white border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 dark:text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {subjects.map((subject) => {
                      const Icon = subject.icon;
                      return (
                        <button
                          key={subject.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, subject: subject.value }))}
                          className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                            formData.subject === subject.value
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-slate-800/50 dark:bg-white border-slate-700 dark:border-gray-300 text-slate-300 dark:text-gray-700 hover:border-blue-500"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{subject.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 dark:text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-white border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 p-4 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again later.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-xl transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;