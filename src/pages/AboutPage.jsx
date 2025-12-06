// src/pages/AboutPage.jsx
import React from "react";
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Clock, 
  Timer, 
  Bell, 
  Globe,
  CheckCircle,
  Star
} from "lucide-react";
import SEO from "../components/SEO";

const AboutPage = () => {
  const features = [
    {
      icon: Timer,
      title: "Timer",
      description: "Customizable countdown timer with presets and fullscreen mode"
    },
    {
      icon: Clock,
      title: "Stopwatch",
      description: "Precise stopwatch with lap recording and statistics"
    },
    {
      icon: Bell,
      title: "Alarm",
      description: "Multiple alarms with custom sounds and repeat options"
    },
    {
      icon: Globe,
      title: "World Clock",
      description: "Track time across multiple time zones simultaneously"
    },
  ];

  const values = [
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Built for speed and accuracy you can depend on"
    },
    {
      icon: Heart,
      title: "User-Focused",
      description: "Designed with your needs in mind"
    },
    {
      icon: CheckCircle,
      title: "Free Forever",
      description: "All features available at no cost"
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <SEO title="About Us" description="Learn about the mission and features of ClockEye time management tools." url="/about" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            About Clockeye
          </h1>
          <p className="text-xl text-slate-400 dark:text-gray-500 max-w-2xl mx-auto">
            Your all-in-one time management solution designed to help you stay 
            productive and organized.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-3xl border border-blue-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-3">
                  Our Mission
                </h2>
                <p className="text-slate-300 dark:text-gray-600 leading-relaxed">
                  We believe that effective time management should be accessible to everyone. 
                  Clockeye was created to provide simple, powerful, and beautiful tools that help 
                  you make the most of every moment. Whether you're focusing on work, timing 
                  your workout, or managing your daily schedule, we're here to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-8 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white dark:text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 dark:text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-900/50 dark:bg-gray-50 p-6 rounded-2xl border border-slate-800 dark:border-gray-200 text-center"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white dark:text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 dark:text-gray-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="bg-slate-900/50 dark:bg-gray-50 p-8 rounded-3xl border border-slate-800 dark:border-gray-200">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-6 text-center">
              Why Choose Clockeye?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "100% Free - No hidden costs or subscriptions",
                "Works Offline - Use without internet connection",
                "No Sign-up Required - Start using immediately",
                "Privacy Focused - Your data stays on your device",
                "Cross-Platform - Works on any device with a browser",
                "Regular Updates - Constantly improving",
                "Custom Sounds - Upload your own alarm sounds",
                "Beautiful Design - Modern and intuitive interface",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-slate-300 dark:text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-400 dark:text-gray-500 mb-6">
            Start managing your time more effectively today.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-colors"
          >
            <Timer className="w-5 h-5" />
            Start Using Clockeye
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;