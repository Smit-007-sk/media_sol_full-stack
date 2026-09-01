"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code,
  ShoppingCart,
  Layout,
  Compass,
  Zap,
  ArrowRight,
  CheckCircle2,
  Lock,
  RotateCw,
  Menu,
  Grid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Local Business Search & Discovery",
    icon: Code,
    color: "#059669",
    bgNode: "bg-[#059669]",
    image: "/luxury-architecture-hero.jpg",
    scoreLabel: "Search Visibility",
    scoreValue: "99/100",
    shortDesc:
      "Get your business indexed and discovered by thousands of local customers searching in your city.",
    fullDesc:
      "We index your business on Emperor Media Solutions local search directory, giving you maximum visibility, direct phone calls, and customer inquiries.",
    checklist: [
      "Instant Search Indexing",
      "Verified Business Badge",
      "Direct WhatsApp & Call Leads",
      "Google Map Location Integration",
      "Ratings & Customer Reviews",
    ],
  },
  {
    id: "02",
    title: "Free Custom Business Website",
    icon: ShoppingCart,
    color: "#10B981",
    bgNode: "bg-[#10B981]",
    image: "/ecommerce-store-hero.jpg",
    scoreLabel: "Conversion Rate",
    scoreValue: "99/100",
    shortDesc:
      "Establish a high-converting single page website with zero development cost.",
    fullDesc:
      "Get a professional, mobile-responsive single page website built with custom slug and SSL security completely free.",
    checklist: [
      "100% Free Development",
      "Free Custom Business Slug",
      "Mobile & Tablet Responsive",
      "SEO Optimized Structure",
      "Basic Support 1 Year",
    ],
  },
  {
    id: "03",
    title: "Digital Catalog & Product Showcase",
    icon: Layout,
    color: "#8B5CF6",
    bgNode: "bg-[#8B5CF6]",
    image: "/webapp-dashboard-hero.jpg",
    scoreLabel: "Uptime & Speed",
    scoreValue: "99.9%",
    shortDesc:
      "Showcase your products, pricing, and services with interactive digital menus and catalogs.",
    fullDesc:
      "Enable your customers to browse your full inventory online with high-res photos, instant inquiry buttons, and mobile download.",
    checklist: [
      "Interactive Product Cards",
      "Category Filters & Search",
      "Instant Inquiry Buttons",
      "High-Res Gallery Uploads",
      "Mobile Catalog Download",
    ],
  },
  {
    id: "04",
    title: "Lead Generation & Inquiry Connect",
    icon: Compass,
    color: "#F59E0B",
    bgNode: "bg-[#F59E0B]",
    image: "/uiux-design-hero.jpg",
    scoreLabel: "Lead Response Rate",
    scoreValue: "98/100",
    shortDesc:
      "Convert website visitors into paying customers with automated lead capture forms.",
    fullDesc:
      "Receive real-time lead alerts directly on your WhatsApp and email whenever a local customer requests a quote or service.",
    checklist: [
      "Instant WhatsApp Lead Alerts",
      "Email Notification Sync",
      "Interactive 3-Step Lead Forms",
      "Click-to-Call Quick Action",
      "Customer Feedback Forms",
    ],
  },
  {
    id: "05",
    title: "Local Business SEO & Ranking",
    icon: Zap,
    color: "#3B82F6",
    bgNode: "bg-[#3B82F6]",
    image: "/performance-speed-hero.jpg",
    scoreLabel: "Google Ranking",
    scoreValue: "100/100",
    shortDesc:
      "Rank higher on Google Search and local business maps to outshine competitors.",
    fullDesc:
      "Maximize your online visibility with Google Search Console setup, speed optimization, and local citation building.",
    checklist: [
      "Google Search Console Setup",
      "Local Citation Building",
      "PageSpeed 95+ Core Web Vitals",
      "Structured Schema Markup",
      "Social Media Integration",
    ],
  },
];

const techStack = [
  { name: "Location Search", badge: "📍", bg: "bg-[#059669]/10 text-[#059669]" },
  { name: "WhatsApp API", badge: "💬", bg: "bg-[#25D366]/15 text-[#059669]" },
  { name: "Google Maps", badge: "🗺️", bg: "bg-[#4285F4]/15 text-[#4285F4]" },
  { name: "Next.js 15", badge: "N", bg: "bg-[#000000]/10 text-[#000000]" },
  { name: "Tailwind v4", badge: "🎨", bg: "bg-[#06B6D4]/15 text-[#0891B2]" },
  { name: "SSL Secure", badge: "🔒", bg: "bg-[#10B981]/15 text-[#059669]" },
];

const tabIndexMap: Record<string, number> = {
  "01": 0,
  "02": 1,
  "03": 2,
  "04": 3,
  "05": 4,
};

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("01");
  const [mobileActiveTab, setMobileActiveTab] = useState<string>("01");
  const [progress, setProgress] = useState<number>(0);

  // Desktop only: Passive high-performance scroll listener for desktop pinned experience
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return; // Skip scroll calculation on mobile

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScrollable =
              containerRef.current.offsetHeight - window.innerHeight;

            if (totalScrollable > 0) {
              if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                const scrolled = -rect.top;
                const normalized = Math.max(
                  0,
                  Math.min(1, scrolled / totalScrollable)
                );
                setProgress(normalized);

                // Map progress (0.00 -> 1.00) across 5 steps
                if (normalized < 0.20) {
                  setActiveTab("01");
                } else if (normalized < 0.40) {
                  setActiveTab("02");
                } else if (normalized < 0.60) {
                  setActiveTab("03");
                } else if (normalized < 0.80) {
                  setActiveTab("04");
                } else {
                  setActiveTab("05");
                }
              } else if (rect.top > 0) {
                setProgress(0);
                setActiveTab("01");
              } else if (rect.bottom < window.innerHeight) {
                setProgress(1);
                setActiveTab("05");
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDesktopTabClick = (id: string) => {
    setActiveTab(id);
    if (containerRef.current) {
      const idx = tabIndexMap[id] ?? 0;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable > 0) {
        const stepProgress = (idx + 0.5) / 5;
        const targetY = containerTop + totalScrollable * stepProgress;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  const activeService =
    services.find((s) => s.id === activeTab) || services[0];
  const activeMobileService =
    services.find((s) => s.id === mobileActiveTab) || services[0];
  const currentIdx = tabIndexMap[activeTab] ?? 0;

  return (
    <div id="services" className="w-full">
      {/* ========================================================================= */}
      {/* 1. MOBILE STATIC VERSION (NO PINNING / NO SCROLL HIJACKING ON MOBILE)      */}
      {/* ========================================================================= */}
      <section className="block lg:hidden w-full px-4 py-12 bg-[#F4F1EA]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#059669] uppercase mb-1.5">
            WHAT WE DO FOR LOCAL BUSINESSES
          </span>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-[#1C1E1B] mb-2">
            Solutions that{" "}
            <span className="text-[#059669]">power local </span>
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] bg-clip-text text-transparent">
              business growth
            </span>
          </h2>
          <p className="text-xs text-[#5A5F5B] leading-relaxed max-w-md font-sans">
            From local search discovery to high-converting free websites, we help your business connect with customers and scale online.
          </p>
        </div>

        {/* Mobile Horizontal Pill Selector */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((item) => {
            const Icon = item.icon;
            const isSelected = mobileActiveTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMobileActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                  isSelected
                    ? "bg-[#083323] text-white border-[#0E4A34] shadow-md"
                    : "bg-[#FAF8F4] text-[#1C1E1B] border-[#E5DFD3]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#27C93F]" : "text-[#059669]"}`} />
                <span>{item.id} {item.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Active Service Card */}
        <div className="bg-[#FAF8F4] border border-[#E5DFD3] rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex flex-col space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#059669] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase mb-2">
                <span>{activeMobileService.id}</span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#1C1E1B] leading-snug mb-1.5">
                {activeMobileService.title}
              </h3>
              <p className="text-xs text-[#555A56] leading-relaxed font-sans mb-3">
                {activeMobileService.fullDesc}
              </p>
            </div>

            {/* Browser Mockup Image */}
            <div className="bg-white border border-[#E5DFD3] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#FAF8F4] px-2.5 py-1 border-b border-[#EBE6DC] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-1 bg-[#EFECE5] text-[#6B706C] text-[8px] px-2 py-0.5 rounded-full">
                  <Lock className="w-2 h-2" />
                  <span>yourbusiness.com</span>
                </div>
                <Menu className="w-2.5 h-2.5 text-[#6B706C]" />
              </div>
              <div className="relative w-full h-[160px]">
                <Image
                  src={activeMobileService.image}
                  alt={activeMobileService.title}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 pt-1">
              {activeMobileService.checklist.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-[#059669] shrink-0"
                    strokeWidth={2.2}
                  />
                  <span className="text-xs font-semibold text-[#1C1E1B]">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="bg-[#083323] hover:bg-[#0E4A34] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-between w-full transition-all shadow-md mt-2"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="mt-4 pt-3 border-t border-[#E2DDD3]/80 flex flex-wrap items-center gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="flex items-center gap-1 bg-white border border-[#E5DFD3] text-[9px] font-semibold text-[#1C1E1B] px-1.5 py-0.5 rounded-md"
              >
                <span>{tech.badge}</span>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DESKTOP SCROLL-PINNED 5-STEP VERSION                                   */}
      {/* ========================================================================= */}
      <section
        ref={containerRef}
        className="hidden lg:block services-scroll-wrapper relative w-full"
        style={{ height: "350vh" }}
      >
        {/* Viewport Pinned Sticky Container */}
        <div
          className="services-sticky sticky top-0 w-full h-screen flex flex-col justify-center items-center py-4 px-6 lg:px-12 xl:px-16 overflow-hidden z-20"
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center h-full max-h-[92vh]">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-4 sm:mb-6 shrink-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs font-sans font-bold tracking-[0.2em] text-[#059669] uppercase">
                  WHAT WE DO FOR LOCAL BUSINESSES
                </span>
              </div>
              <h2 className="font-sans text-3xl lg:text-4xl font-bold tracking-tight text-[#1C1E1B] mb-1.5">
                Solutions that{" "}
                <span className="text-[#059669]">power local </span>
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E] bg-clip-text text-transparent">
                  business growth
                </span>
              </h2>
              <p className="text-sm text-[#5A5F5B] leading-relaxed max-w-xl font-sans">
                From local search discovery to high-converting free websites, we help your business connect with customers and scale online.
              </p>
            </div>

            {/* Main Grid: Left Vertical Timeline + Right Content Showcase */}
            <div className="grid grid-cols-12 gap-8 items-center flex-grow overflow-hidden">
              {/* Left Column: Vertical Timeline & Tabs */}
              <div className="col-span-5 flex flex-col relative pl-9">
                {/* Timeline Background Track */}
                <div className="absolute left-[14px] -translate-x-1/2 top-[24px] bottom-[24px] w-[3px] bg-[#E2DDD3] rounded-full" />

                {/* Animated Progress Line */}
                <div
                  style={{ height: `${Math.max(4, progress * 100)}%` }}
                  className="absolute left-[14px] -translate-x-1/2 top-[24px] max-h-[calc(100%-48px)] w-[3px] bg-gradient-to-b from-[#10B981] via-[#8B5CF6] to-[#3B82F6] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.7)] z-10 transition-all duration-150"
                />

                <div className="flex flex-col gap-2.5">
                  {services.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isPassed = currentIdx >= idx;

                    // Distinct Node Color Schemes
                    const nodeStyles = [
                      {
                        bg: "bg-[#10B981]",
                        ring: "ring-[#10B981]/40",
                        glow: "shadow-[0_0_12px_rgba(16,185,129,0.8)]",
                      },
                      {
                        bg: "bg-[#06B6D4]",
                        ring: "ring-[#06B6D4]/40",
                        glow: "shadow-[0_0_12px_rgba(6,182,212,0.8)]",
                      },
                      {
                        bg: "bg-[#8B5CF6]",
                        ring: "ring-[#8B5CF6]/40",
                        glow: "shadow-[0_0_12px_rgba(139,92,246,0.8)]",
                      },
                      {
                        bg: "bg-[#F59E0B]",
                        ring: "ring-[#F59E0B]/40",
                        glow: "shadow-[0_0_12px_rgba(245,158,11,0.8)]",
                      },
                      {
                        bg: "bg-[#3B82F6]",
                        ring: "ring-[#3B82F6]/40",
                        glow: "shadow-[0_0_12px_rgba(59,130,246,0.8)]",
                      },
                    ];
                    const ns = nodeStyles[idx] || nodeStyles[0];

                    return (
                      <div key={item.id} className="relative flex items-center">
                        {/* Timeline Node Dot */}
                        <div
                          className={`absolute left-[-22px] -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 z-20 border-2 ${
                            isActive
                              ? `${ns.bg} border-white ring-4 ${ns.ring} scale-125 ${ns.glow}`
                              : isPassed
                              ? `${ns.bg} border-white shadow-sm`
                              : "bg-[#D0C9B8] border-white opacity-60"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => handleDesktopTabClick(item.id)}
                          className={`w-full text-left p-3 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                            isActive
                              ? "bg-[#083323] text-white border-[#0E4A34] shadow-xl translate-x-1"
                              : "bg-[#FAF8F4] text-[#1C1E1B] border-[#E5DFD3] hover:bg-white hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                isActive
                                  ? "bg-[#0E4A34] text-[#27C93F] scale-105"
                                  : "bg-[#EFECE5] text-[#1C1E1B]"
                              }`}
                            >
                              <Icon className="w-4 h-4" strokeWidth={1.8} />
                            </div>

                            <div className="flex flex-col pr-2 min-w-0 flex-1">
                              <span
                                className={`text-sm font-bold leading-snug truncate ${
                                  isActive ? "text-white" : "text-[#1C1E1B]"
                                }`}
                              >
                                {item.id} {item.title}
                              </span>
                              <span
                                className={`text-[10px] mt-0.5 leading-tight line-clamp-1 truncate ${
                                  isActive ? "text-[#A3C4B6]" : "text-[#6B706C]"
                                }`}
                              >
                                {item.shortDesc}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                              isActive
                                ? "border-[#27C93F] text-[#27C93F] bg-[#0E4A34]"
                                : "border-[#D5CFBE] text-[#6B706C]"
                            }`}
                          >
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3">
                  <Link
                    href="/services"
                    className="w-full bg-[#FAF8F4] hover:bg-white border border-[#D5CFBE] text-[#1C1E1B] font-bold text-xs tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                  >
                    <Grid className="w-3.5 h-3.5 text-[#059669]" />
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Service Detail Showcase Card */}
              <div className="col-span-7">
                <div className="bg-[#FAF8F4] border border-[#E5DFD3] rounded-3xl p-7 shadow-xl relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="grid grid-cols-12 gap-6 items-center"
                    >
                      {/* Left Info Panel */}
                      <div className="col-span-6 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="inline-flex items-center gap-1.5 bg-[#059669] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase mb-2 shadow-sm">
                            <span>{activeService.id}</span>
                          </div>

                          <h3 className="font-sans text-xl font-bold text-[#1C1E1B] leading-snug mb-2">
                            {activeService.title}
                          </h3>

                          <p className="text-xs text-[#555A56] leading-relaxed font-sans mb-4">
                            {activeService.fullDesc}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {activeService.checklist.map((point) => (
                            <div key={point} className="flex items-center gap-2">
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-[#059669] shrink-0"
                                strokeWidth={2.2}
                              />
                              <span className="text-xs font-semibold text-[#1C1E1B]">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Link
                          href="/services"
                          className="bg-[#083323] hover:bg-[#0E4A34] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-between w-fit gap-2 transition-all shadow-md"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Right Browser Mockup */}
                      <div className="col-span-6 relative">
                        <div className="bg-white border border-[#E5DFD3] rounded-2xl shadow-xl overflow-hidden relative">
                          <div className="bg-[#FAF8F4] px-3 py-1.5 border-b border-[#EBE6DC] flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                            </div>

                            <div className="flex items-center gap-1 bg-[#EFECE5] text-[#6B706C] text-[9px] px-2.5 py-0.5 rounded-full border border-[#E5E0D5]">
                              <Lock className="w-2.5 h-2.5" />
                              <span>yourbusiness.com</span>
                              <RotateCw className="w-2 h-2 ml-1" />
                            </div>

                            <Menu className="w-3 h-3 text-[#6B706C]" />
                          </div>

                          <div className="relative w-full h-[210px]">
                            <Image
                              src={activeService.image}
                              alt={activeService.title}
                              fill
                              className="object-cover object-center transition-all duration-300"
                              sizes="40vw"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Tech Stack Footer */}
                  <div className="mt-5 pt-3.5 border-t border-[#E2DDD3]/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#1C1E1B] uppercase tracking-wider">
                      Technologies We Use
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="flex items-center gap-1 bg-white border border-[#E5DFD3] text-[10px] font-semibold text-[#1C1E1B] px-2 py-0.5 rounded-lg shadow-sm"
                        >
                          <span
                            className={`w-3 h-3 rounded text-[8px] font-black flex items-center justify-center ${tech.bg}`}
                          >
                            {tech.badge}
                          </span>
                          <span>{tech.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
