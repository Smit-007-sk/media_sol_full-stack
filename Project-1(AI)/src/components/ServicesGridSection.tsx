"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Monitor,
  ShoppingBag,
  Code2,
  Layers,
  Rocket,
  Search,
  ShieldCheck,
  Cloud,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Trophy,
  Headphones,
  Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import Masonry from "./Masonry";

const gridServices = [
  {
    title: "Website Design & Development",
    description:
      "Stunning, responsive websites built to represent your brand and convert visitors.",
    icon: Monitor,
    accent: "border-t-4 border-t-[#00C9A7]",
    iconBg: "bg-[#00C9A7]/10 text-[#00C9A7]",
    linkCol: "text-[#00C9A7]",
  },
  {
    title: "eCommerce Development",
    description:
      "Powerful online stores that drive sales and deliver seamless shopping.",
    icon: ShoppingBag,
    accent: "border-t-4 border-t-[#A855F7]",
    iconBg: "bg-[#A855F7]/10 text-[#A855F7]",
    linkCol: "text-[#A855F7]",
  },
  {
    title: "Custom Web Applications",
    description:
      "Scalable web applications built to solve real business challenges.",
    icon: Code2,
    accent: "border-t-4 border-t-[#F97316]",
    iconBg: "bg-[#F97316]/10 text-[#F97316]",
    linkCol: "text-[#F97316]",
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive designs that create meaningful user experiences.",
    icon: Layers,
    accent: "border-t-4 border-t-[#3B82F6]",
    iconBg: "bg-[#3B82F6]/10 text-[#3B82F6]",
    linkCol: "text-[#3B82F6]",
  },
  {
    title: "Performance Optimization",
    description:
      "Lightning-fast websites optimized for speed, SEO and conversions.",
    icon: Rocket,
    accent: "border-t-4 border-t-[#EC4899]",
    iconBg: "bg-[#EC4899]/10 text-[#EC4899]",
    linkCol: "text-[#EC4899]",
  },
  {
    title: "SEO-Friendly Development",
    description:
      "Clean, structured code that helps your website rank higher.",
    icon: Search,
    accent: "border-t-4 border-t-[#10B981]",
    iconBg: "bg-[#10B981]/10 text-[#10B981]",
    linkCol: "text-[#10B981]",
  },
  {
    title: "Maintenance & Support",
    description:
      "Reliable support and regular maintenance to keep your website secure.",
    icon: ShieldCheck,
    accent: "border-t-4 border-t-[#F59E0B]",
    iconBg: "bg-[#F59E0B]/10 text-[#F59E0B]",
    linkCol: "text-[#F59E0B]",
  },
  {
    title: "Custom Software Solutions",
    description:
      "Tailored software solutions designed to streamline your operations.",
    icon: Cloud,
    accent: "border-t-4 border-t-[#6366F1]",
    iconBg: "bg-[#6366F1]/10 text-[#6366F1]",
    linkCol: "text-[#6366F1]",
  },
  {
    title: "Branding & Digital Identity",
    description:
      "Complete branding solutions that make your business memorable.",
    icon: Sparkles,
    accent: "border-t-4 border-t-[#22C55E]",
    iconBg: "bg-[#22C55E]/10 text-[#22C55E]",
    linkCol: "text-[#22C55E]",
  },
];

const statsItems = [
  {
    icon: TrendingUp,
    value: "500+",
    label: "Projects Completed",
    iconBg: "bg-[#059669]/20 text-[#27C93F]",
    underline: "bg-[#27C93F]",
  },
  {
    icon: Users,
    value: "100%",
    label: "Client Satisfaction",
    iconBg: "bg-[#2563EB]/20 text-[#3B82F6]",
    underline: "bg-[#3B82F6]",
  },
  {
    icon: Trophy,
    value: "5+",
    label: "Years of Experience",
    iconBg: "bg-[#8B5CF6]/20 text-[#A855F7]",
    underline: "bg-[#A855F7]",
  },
  {
    icon: Code2,
    value: "50+",
    label: "Technologies Used",
    iconBg: "bg-[#F97316]/20 text-[#F97316]",
    underline: "bg-[#F97316]",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Support & Assistance",
    iconBg: "bg-[#EC4899]/20 text-[#EC4899]",
    underline: "bg-[#EC4899]",
  },
];

export default function ServicesGridSection() {
  // Track scroll direction ("down" vs "up") to dictate card animation entrance direction
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current + 5) {
        setScrollDirection("down");
      } else if (currentY < lastScrollY.current - 5) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="solutions" className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-16 pb-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Headline, Copy, Free Offer Card, CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div>
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#059669] uppercase">
                OUR SERVICES
              </span>
            </div>

            {/* Gradient Title */}
            <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1E1B] leading-[1.08] mb-5">
              Digital solutions
              <br />
              that <span className="text-[#00B4D8]">drive</span>
              <br />
              <span className="bg-gradient-to-r from-[#00C9A7] via-[#FF758C] to-[#FF7EB3] bg-clip-text text-transparent">
                real growth
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-[#5A5F5B] leading-relaxed max-w-md font-sans mb-8">
              We combine creativity, technology and strategy to build powerful
              digital experiences that help businesses connect, convert and scale.
            </p>

            {/* Curved Green Line Accent */}
            <div className="w-16 h-1 bg-[#059669] rounded-full mb-8" />

            {/* Free Website Offer Card */}
            <div className="space-y-4">
              <Link
                href="/#claim-website"
                className="block bg-[#FAF8F4] border border-[#E2DDD3] hover:border-[#072B1E] p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E6F9F3] text-[#059669] flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5 text-[#059669]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-[#059669] uppercase">
                        FREE WEBSITE OFFER
                      </h4>
                      <p className="text-xs font-extrabold text-[#1C1E1B] leading-tight">
                        Free Website For Your Business
                      </p>
                      <p className="text-[11px] text-[#5A5F5B] leading-snug mt-0.5 max-w-[240px]">
                        We design and develop your website at zero development cost.
                        You focus on your business, we&apos;ll handle your online presence.
                      </p>
                    </div>
                  </div>

                  {/* Arrow Circle Button */}
                  <div className="w-9 h-9 rounded-full bg-[#072B1E] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Handwritten Text & CTA Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-sm text-[#5A5F5B]">
                    Explore what we can do for you!
                  </span>
                  <svg
                    className="w-5 h-4 text-[#059669] rotate-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12c4 0 7 2 9 6 2-4 5-6 9-6" />
                  </svg>
                </div>

                {/* VIEW ALL SERVICES Button */}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2.5 bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs font-bold tracking-wider px-5 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <span>VIEW ALL SERVICES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3x3 Grid of 9 Service Cards with Ultra-Smooth Stagger Animation */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {gridServices.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 45,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 3) * 0.05 + Math.floor(idx / 3) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`bg-white border border-[#E5DFD3] rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-[#059669]/10 transition-shadow duration-300 min-h-[250px] overflow-hidden ${card.accent}`}
              >
                <div>
                  {/* Icon Circle */}
                  <div
                    className={`w-10 h-10 rounded-2xl ${card.iconBg} flex items-center justify-center mb-3.5 shrink-0 shadow-sm`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-[#1C1E1B] leading-snug mb-2 font-sans">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#5A5F5B] leading-relaxed mb-4 font-sans line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Explore Link Button - Always Secured inside Bottom Padding */}
                <Link
                  href="/services"
                  className={`flex items-center gap-1.5 text-xs font-extrabold tracking-widest ${card.linkCol} group cursor-pointer w-fit uppercase pt-2 pb-1`}
                >
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dark Green Stats Counter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 w-full bg-[#031B11] border border-[#0A3323] text-white rounded-3xl p-6 shadow-2xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#0E4A34]">
          {statsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3.5 ${
                  idx !== 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>

                {/* Text & Accent Line */}
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
                    {item.value}
                  </span>
                  <span className="text-[11px] text-[#A3C4B6] font-medium mt-1">
                    {item.label}
                  </span>
                  <div className={`w-8 h-0.5 ${item.underline} rounded-full mt-1.5`} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
