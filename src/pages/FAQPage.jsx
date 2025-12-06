// src/pages/FAQPage.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Search, ChevronDown, Mail } from "lucide-react";
import { FAQ_DATA } from "../data/faqData";
import SEO from "../components/SEO";

// Accordion Item Component
const AccordionItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-800 dark:border-gray-200">
      <SEO title="FAQ - Frequently Asked Questions" description="Find answers to common questions about ClockEye." url="/faq" />
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white dark:text-gray-900">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 dark:text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-slate-400 dark:text-gray-600 space-y-4">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main FAQ Page Component
const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState(null);

  // Filter FAQs based on search term
  const filteredFAQs = useMemo(() => {
    const query = searchTerm.toLowerCase();
    if (!query) return FAQ_DATA;
    return FAQ_DATA.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(query))
    );
  }, [searchTerm]);

  // Group filtered FAQs by category
  const groupedFAQs = useMemo(() => {
    return filteredFAQs.reduce((acc, faq) => {
      const category = faq.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {});
  }, [filteredFAQs]);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/20 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-400 dark:text-gray-500">
            Find answers to common questions about MyTime.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/50 dark:bg-gray-50 border border-slate-800 dark:border-gray-200 rounded-2xl text-white dark:text-gray-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* FAQ List */}
        {Object.keys(groupedFAQs).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(groupedFAQs).map(([category, faqs]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-blue-400 dark:text-blue-600 mb-4">
                  {category}
                </h2>
                <div className="bg-slate-900/50 dark:bg-gray-50 p-4 sm:p-6 rounded-2xl border border-slate-800 dark:border-gray-200">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.question}
                      faq={faq}
                      isOpen={openId === `${category}-${index}`}
                      onToggle={() => handleToggle(`${category}-${index}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white dark:text-gray-900">
              No results found
            </h3>
            <p className="text-slate-500">
              Try searching with different keywords.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-slate-900/50 dark:bg-gray-50 p-8 rounded-2xl border border-slate-800 dark:border-gray-200">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
            Can't find your answer?
          </h2>
          <p className="text-slate-400 dark:text-gray-500 mb-6">
            Our team is here to help. Reach out to us for any further questions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;