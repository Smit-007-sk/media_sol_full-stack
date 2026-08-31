"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferSection from "@/components/OfferSection";
import LeadFormSection from "@/components/LeadFormSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, CheckCircle2, ShieldCheck, Clock, Award, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const offerBreakdown = [
  {
    title: "100% Free Development",
    desc: "Zero design or development fees. We design, code, and configure your entire website at no cost.",
    icon: Gift,
  },
  {
    title: "Free Custom Slug",
    desc: "Includes a custom URL slug provided for your business website on our fast cloud infrastructure.",
    icon: Award,
  },
  {
    title: "Single Page Website",
    desc: "High-converting single page landing website layout with interactive lead generation forms.",
    icon: CheckCircle2,
  },
  {
    title: "Mobile & Tablet Responsive",
    desc: "Pixel-perfect rendering across mobile phones, iPads, laptops, and 4K desktop screens.",
    icon: Sparkles,
  },
  {
    title: "SEO Friendly & Search Ready",
    desc: "Clean structured metadata, Google Search Console indexing, and speed optimized Core Web Vitals.",
    icon: Lock,
  },
];

const steps = [
  {
    num: "01",
    title: "Submit Lead Form",
    desc: "Fill out our quick 1-minute form with your business details.",
  },
  {
    num: "02",
    title: "Initial Consultation",
    desc: "Our design team aligns on brand colors, imagery, and structure.",
  },
  {
    num: "03",
    title: "Custom Design & Build",
    desc: "We craft your website using Next.js 15 and modern photography.",
  },
  {
    num: "04",
    title: "Review & Refine",
    desc: "You review the preview link and request any fine-tuning adjustments.",
  },
  {
    num: "05",
    title: "Official Live Launch",
    desc: "Your website goes live with your custom slug and SSL security.",
  },
];

export default function OfferPage() {
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
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C09A5B] uppercase mb-3 flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#C09A5B]" />
            LIMITED TIME FREE WEBSITE OFFER
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#1C1E1B] tracking-tight leading-tight mb-6">
            Get a professional website for your business.{" "}
            <span className="italic text-[#C09A5B]">100% Free!</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#5A5F5B] leading-relaxed font-sans mb-8 break-words">
            We are helping businesses establish a world-class digital presence. No hidden costs, no surprise charges.
          </p>
          <Link
            href="/#claim-website"
            className="inline-flex items-center gap-3 bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs sm:text-sm font-bold tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>CLAIM YOUR FREE WEBSITE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Distinct Hero Mockup Display for Free Offer Page */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-6">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-[#E6E0D5]">
          <Image
            src="/free-offer-mockup.jpg"
            alt="Free website offer multi-device showcase"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Core Offer Section Component */}
      <OfferSection />

      {/* Complete Offer Breakdown */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-12">
        <div className="text-center mb-10">
          <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#C09A5B] uppercase">
            WHAT IS INCLUDED IN THE FREE OFFER
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1E1B] mt-2">
            Everything your business needs to succeed online.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {offerBreakdown.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FAF8F4] border border-[#E6E0D5] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[200px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F9F3] text-[#059669] flex items-center justify-center mb-5 shrink-0">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#1C1E1B] mb-2 leading-snug break-words">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5F5B] leading-relaxed break-words">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works 5 Steps */}
        <div className="bg-[#FAF8F4] border border-[#E6E0D5] rounded-3xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#C09A5B] uppercase">
              SIMPLE 5-STEP PROCESS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1E1B] mt-1">
              How to get your free website in 5 days
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center p-3">
                <span className="w-12 h-12 rounded-full bg-[#072B1E] text-white font-extrabold text-sm flex items-center justify-center mb-3 shadow-md shrink-0">
                  {step.num}
                </span>
                <h4 className="font-sans text-sm font-bold text-[#1C1E1B] mb-1.5 leading-snug break-words">
                  {step.title}
                </h4>
                <p className="text-xs text-[#5A5F5B] leading-relaxed break-words">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadFormSection />

      <Footer />
    </main>
  );
}
