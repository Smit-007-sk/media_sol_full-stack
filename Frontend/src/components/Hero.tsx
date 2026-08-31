"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Scanner from "./Scanner";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-6 lg:pt-10 pb-4 overflow-hidden">
      {/* Soft Leaf Shadow Background Effect */}
      <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D5CEBF]/40 via-transparent to-transparent z-0" />

      {/* WebGL Scanner Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-35 z-0">
        <Scanner
          color1="#059669"
          color2="#B88E56"
          color3="#FFFFFF"
          speed={0.4}
          sweepSpeed={0.5}
          sweepWidth={1.8}
          sweepFalloff={5}
          scale={1.4}
          frequency={1.8}
          ripple={0.18}
          bandDensity={10}
          lineSharpness={5.0}
          glow={0.25}
          scanDirection="diagonal"
          colorSpread={0.6}
          brightness={1.0}
          contrast={1.1}
          softness={1.5}
          vignette={0.4}
          scanline={true}
          grain={true}
          grainIntensity={0.04}
          opacity={0.7}
          mouseInteraction={true}
          mouseRadius={0.6}
          mouseStrength={0.6}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center relative z-10">
        {/* Left Column - Copy & Call To Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          {/* Subhead Tagline */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#B88E56] uppercase">
              PREMIUM WEBSITES. POWERFUL SOLUTIONS.
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-medium leading-[1.05] text-[#1C1E1B] tracking-tight mb-6">
            Websites that
            <br />
            elevate brands.
            <br />
            <span className="italic font-normal text-[#C09A5B]">
              Built to perform.
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-base sm:text-lg text-[#5A5F5B] leading-relaxed max-w-xl font-sans mb-9">
            We design and develop high-performance websites and digital
            solutions that help businesses stand out, attract more customers and
            grow faster.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary CTA */}
            <a
              href="#claim-website"
              onClick={(e) => {
                const target = document.getElementById("claim-website");
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-3 bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs sm:text-sm font-bold tracking-wider px-6 sm:px-7 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-xl hover:translate-y-[-2px] cursor-pointer"
            >
              <span>CLAIM YOUR FREE WEBSITE</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Secondary CTA */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2.5 bg-[#FAF8F4] hover:bg-[#EFECE5] text-[#1C1E1B] border border-[#D5CFBE] text-xs sm:text-sm font-bold tracking-wider px-6 sm:px-7 py-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-md hover:translate-y-[-1px]"
            >
              <div className="w-5 h-5 rounded-full border border-[#1C1E1B] flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-[#1C1E1B] text-[#1C1E1B] ml-0.5" />
              </div>
              <span>EXPLORE OUR WORK</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Photorealistic Laptop Mockup & Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0"
        >
          <div className="relative w-full aspect-[4/3] max-w-[620px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
            <Image
              src="/laptop-hero.jpg"
              alt="MacBook Pro presenting KARSTEN Timeless Furniture website on marble surface"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
            />

            {/* Subtle gloss shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
