"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhySection from "@/components/WhySection";
import LeadFormSection from "@/components/LeadFormSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Award, Users, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% Transparent & Honest",
    description:
      "No hidden fees, no surprise invoices. We state everything clearly before writing a single line of code.",
  },
  {
    icon: Award,
    title: "Enterprise Quality Standards",
    description:
      "Every site is engineered with Next.js 15, Tailwind v4, and Google PageSpeed 95+ performance optimization.",
  },
  {
    icon: Users,
    title: "Client First Philosophy",
    description:
      "We build long-term relationships. Your business success online is our ultimate benchmark.",
  },
  {
    icon: Heart,
    title: "Passionate Craftsmanship",
    description:
      "We design custom digital experiences that wows your visitors and elevates your brand perception.",
  },
];

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-[#F4F1EA] flex flex-col justify-between overflow-x-clip relative selection:bg-[#C09A5B]/30">
      <Header />

      {/* Hero Header Banner */}
      <section className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-10 sm:pt-14 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C09A5B] uppercase mb-3">
            ABOUT EMPEROR MEDIA SOLUTIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#1C1E1B] tracking-tight leading-tight mb-6">
            Why businesses trust us with{" "}
            <span className="italic text-[#C09A5B]">their digital presence.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#5A5F5B] leading-relaxed font-sans mb-8 break-words">
            We combine high-end design, modern engineering, and a client-first mission to help ambitious businesses thrive online.
          </p>
          <Link
            href="/#claim-website"
            className="inline-flex items-center gap-3 bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs sm:text-sm font-bold tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>CLAIM YOUR FREE WEBSITE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Dedicated Why Us Distinct Photo Showcase */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F4] border border-[#E6E0D5] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-6 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/why-us-office.jpg"
              alt="Emperor Media Solutions modern design studio office"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C09A5B] uppercase">
              OUR MISSION &amp; VISION
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1E1B] leading-snug">
              Empowering businesses through design &amp; technology.
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5F5B] leading-relaxed break-words">
              At Emperor Media Solutions, we believe that great businesses deserve powerful, high-performance websites. That’s why we invest our creative expertise into building digital experiences that convert visitors into lifelong clients.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C1E1B] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Zero design or development fees for eligible businesses</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C1E1B] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Built on Next.js 15, Tailwind v4 &amp; TypeScript</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C1E1B] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Google PageSpeed 95+ Core Web Vitals optimization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Why Section Component */}
      <WhySection />

      {/* Trust Pillars Grid */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#C09A5B] uppercase">
            OUR CORE VALUES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1E1B] mt-2">
            The principles that guide everything we build.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FAF8F4] border border-[#E6E0D5] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EFECE5] flex items-center justify-center text-[#072B1E] mb-5 shrink-0">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#1C1E1B] mb-2 leading-snug break-words">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5F5B] leading-relaxed break-words">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadFormSection />

      <Footer />
    </main>
  );
}
