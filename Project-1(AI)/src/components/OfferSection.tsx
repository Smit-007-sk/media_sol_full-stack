"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, Gem, Rocket, Check, Lock, Menu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HalftoneReveal from "./HalftoneReveal";

const features = [
  {
    icon: Gift,
    title: "100% Development Cost Covered",
    description: "You pay nothing for the website development.",
  },
  {
    icon: Gem,
    title: "Premium Quality Assured",
    description: "Modern design, clean code & high performance.",
  },
  {
    icon: Rocket,
    title: "Built for Growth",
    description: "Scalable, fast & optimized to help your business grow.",
  },
];

const checklistItems = [
  { label: "Adding Your Logo", completed: true },
  { label: "Crafting Hero Section", completed: true },
  { label: "Adding Services", completed: true },
  { label: "Creating About Section", completed: true },
  { label: "Setting Up Contact", completed: true },
  { label: "Making It Live", completed: false },
];

export default function OfferSection() {
  return (
    <section id="offer" className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-20 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Headline, Copy, 3 Highlights */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div>
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#B88E56] uppercase">
                YOUR BUSINESS DESERVES A WEBSITE.
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-[#1C1E1B] tracking-tight mb-6">
              So we’re giving
              <br />
              <span className="italic font-normal text-[#C09A5B]">
                you one.
              </span>
            </h2>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-[#5A5F5B] leading-relaxed font-sans mb-12">
              We believe every business deserves a professional online presence.
              That’s why we&apos;re offering selected businesses the opportunity to
              receive a beautifully designed website at no development cost.
            </p>
          </div>

          {/* 3 Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E5E0D4]">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-[#EFECE5] flex items-center justify-center text-[#1C1E1B] mb-4">
                    <Icon className="w-4 h-4 text-[#1C1E1B]" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-bold text-[#1C1E1B] mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B706C] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <a
              href="#claim-website"
              onClick={(e) => {
                const target = document.getElementById("claim-website");
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-3 bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs sm:text-sm font-bold tracking-wider px-7 py-3.5 rounded-md transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              <span>CLAIM YOUR FREE WEBSITE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Full Card Web App Browser HalftoneReveal Showcase Stage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 relative w-full h-[380px] sm:h-[450px] lg:h-[480px] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-[#E5DFD3]"
        >
          <HalftoneReveal
            src="/full-browser-offer.jpg"
            inkColor="#072B1E"
            paperColor="#FAF8F4"
            mode="color"
            dotDensity={95}
            angle={28}
            revealRadius={0.42}
            edge={0.85}
            follow={0.35}
            trigger="hover"
            borderRadius="24px"
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
