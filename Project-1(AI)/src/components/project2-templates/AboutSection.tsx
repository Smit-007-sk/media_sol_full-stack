"use client";

import { CheckCircle2, ShieldCheck, Zap, Award, Users } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    "Over 5+ years of industry experience crafting premium websites.",
    "Data-backed UX designs engineered to maximize conversion rates.",
    "Blazing fast performance with 99+ Google PageSpeed scores.",
    "Dedicated 24/7 support & continuous maintenance for your piece of mind.",
  ];

  return (
    <section id="about" className="py-20 bg-[#FBF8F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-gradient-to-br from-[#0F382C] to-[#061C16] text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 border border-[#185343]">
              <div className="w-14 h-14 rounded-2xl bg-[#B88E44] text-white flex items-center justify-center font-serif text-2xl font-bold">
                E
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                Crafting Digital Excellence Since 2021
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                At Emperor Smart Solutions, we blend high-end aesthetic design with modern engineering. We help brands unlock their true digital potential.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1B5C4B]">
                <div>
                  <div className="font-serif text-3xl font-bold text-[#D8B775]">500+</div>
                  <div className="text-xs text-gray-300 font-medium mt-1">Completed Projects</div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-bold text-[#D8B775]">99.8%</div>
                  <div className="text-xs text-gray-300 font-medium mt-1">On-Time Delivery</div>
                </div>
              </div>
            </div>

            {/* Decorative Gold Border Backdrop */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#B88E44]/40 rounded-3xl -z-0 pointer-events-none hidden sm:block" />
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#B88E44]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans">
                ABOUT EMPEROR
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421] leading-tight">
              We Build Websites That Turn Visitors into <span className="italic font-normal text-[#B88E44]">Customers</span>
            </h2>

            <p className="text-base text-[#4A524D] leading-relaxed">
              We don&apos;t just build templates — we construct bespoke digital experiences. From strategy and UI/UX design to modern Next.js development and SEO, our end-to-end solutions are engineered for measurable business growth.
            </p>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B88E44] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#1F2421]">{item}</span>
                </div>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="glass-card p-4 rounded-xl text-left border border-[#E5DACB]">
                <ShieldCheck className="w-6 h-6 text-[#0F382C] mb-2" />
                <h4 className="font-bold text-sm text-[#1F2421]">Enterprise Security</h4>
                <p className="text-xs text-gray-600 mt-1">Built with modern compliance & data protection.</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-left border border-[#E5DACB]">
                <Zap className="w-6 h-6 text-[#0F382C] mb-2" />
                <h4 className="font-bold text-sm text-[#1F2421]">Lightning Fast</h4>
                <p className="text-xs text-gray-600 mt-1">Optimized code structure for instant load times.</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-left border border-[#E5DACB]">
                <Award className="w-6 h-6 text-[#0F382C] mb-2" />
                <h4 className="font-bold text-sm text-[#1F2421]">Award Winning</h4>
                <p className="text-xs text-gray-600 mt-1">Recognized for design excellence & innovation.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
