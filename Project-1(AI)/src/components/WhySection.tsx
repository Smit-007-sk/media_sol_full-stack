"use client";

import React from "react";
import Image from "next/image";
import { Heart, Handshake, Users, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Handshake,
    title: "Build long-term relationships",
  },
  {
    icon: Users,
    title: "Help businesses grow online",
  },
  {
    icon: TrendingUp,
    title: "Deliver value first, always",
  },
  {
    icon: Award,
    title: "Establish trust through quality",
  },
];

export default function WhySection() {
  return (
    <section id="why-us" className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-12 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Photo card with laptop + Floating Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Photo Card Container */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-[#E5DFD3]">
            <Image
              src="/laptop-mission.jpg"
              alt="Laptop presenting Emperor Media Solutions website on bright desk"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </motion.div>

        {/* Right Column: Headline, Copy, 4 Value Badges */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#B88E56] uppercase">
              TRANSPARENT. HONEST. STRAIGHTFORWARD.
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-[#1C1E1B] tracking-tight mb-6">
            Why are we doing{" "}
            <span className="italic font-normal text-[#C09A5B]">
              this?
            </span>
          </h2>

          {/* Description Paragraphs */}
          <div className="flex flex-col gap-4 text-base sm:text-lg text-[#5A5F5B] leading-relaxed font-sans mb-10 max-w-2xl">
            <p className="font-semibold text-[#1C1E1B]">
              Because great businesses deserve great digital experiences.
            </p>
            <p>
              We’re using our expertise to help businesses establish a stronger
              online presence while introducing them to the quality, creativity
              and technology behind Emperor Media Solutions.
            </p>
          </div>

          {/* 4 Value Badges Horizontal Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pt-2">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-start justify-between gap-2.5 bg-[#FAF8F4] border border-[#E6E0D5] p-3.5 sm:p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 min-h-[115px]"
                >
                  <div className="w-9 h-9 rounded-full bg-[#EFECE5] flex items-center justify-center shrink-0 text-[#1C1E1B]">
                    <Icon className="w-4 h-4 text-[#1C1E1B]" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-bold text-[#1C1E1B] leading-snug break-words w-full">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
