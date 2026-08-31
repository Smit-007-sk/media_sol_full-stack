"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadFormSection from "@/components/LeadFormSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All Projects", "Web Design", "eCommerce", "Web Apps"];

const projects = [
  {
    id: "luxury-architecture",
    category: "Web Design",
    title: "Luxury Architecture Studio",
    client: "Studio Vistas",
    description:
      "Minimalist, image-first website for a premier luxury architecture firm showcasing high-end residential portfolios.",
    image: "/luxury-architecture-hero.jpg",
    stats: "+280% Inquiry Rate",
    speedScore: "99/100 Speed",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "ecommerce-store",
    category: "eCommerce",
    title: "Aura Premium Goods",
    client: "Aura Lifestyle",
    description:
      "High-converting online store with seamless mobile cart checkout, dynamic currency switcher, and inventory sync.",
    image: "/ecommerce-store-hero.jpg",
    stats: "+340% Mobile Sales",
    speedScore: "98/100 Speed",
    tech: ["Shopify Headless", "React", "Stripe API"],
  },
  {
    id: "webapp-dashboard",
    category: "Web Apps",
    title: "Analytics & SaaS Dashboard",
    client: "MetricPulse Cloud",
    description:
      "Real-time business intelligence dashboard with custom interactive charts, user permissions, and API exports.",
    image: "/webapp-dashboard-hero.jpg",
    stats: "10k+ Active Users",
    speedScore: "97/100 Speed",
    tech: ["TypeScript", "Recharts", "Node.js"],
  },
  {
    id: "uiux-design",
    category: "Web Design",
    title: "Venture Capital & Agency Site",
    client: "Apex Capital Partners",
    description:
      "Sophisticated dark-mode agency interface featuring interactive 3D elements, typography accents, and client portals.",
    image: "/uiux-design-hero.jpg",
    stats: "1.2s Fast Load",
    speedScore: "99/100 Speed",
    tech: ["Next.js App Router", "Tailwind v4"],
  },
  {
    id: "performance-speed",
    category: "Web Apps",
    title: "Enterprise Performance Platform",
    client: "HyperSpeed Technologies",
    description:
      "Core Web Vitals optimization platform achieving sub-second load times and 100/100 Google Lighthouse scores.",
    image: "/performance-speed-hero.jpg",
    stats: "0.8s Page Load",
    speedScore: "100/100 Speed",
    tech: ["Edge Runtime", "Vercel", "WebP Assets"],
  },
  {
    id: "stacked-website",
    category: "eCommerce",
    title: "Artisan Brand Showcase",
    client: "Emperor Crafts",
    description:
      "Interactive 3D card layout featuring handcrafted products, customer reviews, and integrated WhatsApp order booking.",
    image: "/stacked-website-offer.jpg",
    stats: "+190% Lead Form CTR",
    speedScore: "98/100 Speed",
    tech: ["React 19", "Tailwind CSS"],
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F1EA] flex flex-col justify-between overflow-x-clip relative selection:bg-[#C09A5B]/30">
      <Header />

      {/* Hero Header Banner */}
      <section className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-12 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C09A5B] uppercase mb-3">
            EMPEROR MEDIA SOLUTIONS PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1C1E1B] tracking-tight leading-tight mb-6">
            Work that inspires.{" "}
            <span className="italic text-[#C09A5B]">Results that deliver.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5A5F5B] leading-relaxed font-sans mb-8">
            Explore our curated portfolio of websites, eCommerce stores, and custom web applications developed for ambitious businesses.
          </p>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-[#FAF8F4] border border-[#E6E0D5] p-2 rounded-2xl shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#072B1E] text-white shadow-md"
                    : "text-[#5A5F5B] hover:text-[#1C1E1B] hover:bg-[#EFECE5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-8">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FAF8F4] border border-[#E6E0D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#E6E0D5]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Stat Overlay Badges */}
                    <div className="absolute top-3 left-3 bg-[#072B1E] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                      {project.stats}
                    </div>
                    <div className="absolute top-3 right-3 bg-white text-[#059669] border border-[#E5DFD3] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
                      {project.speedScore}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <span className="text-[10px] font-sans font-bold tracking-wider text-[#C09A5B] uppercase block mb-1">
                      {project.client} • {project.category}
                    </span>
                    <h3 className="font-sans text-xl font-bold text-[#1C1E1B] mb-2 group-hover:text-[#072B1E] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5F5B] leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-semibold text-[#6B706C] bg-[#EFECE5] px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/#claim-website"
                    className="inline-flex items-center justify-between w-full bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs font-bold px-5 py-3.5 rounded-xl transition-all duration-300 shadow-sm"
                  >
                    <span>GET A SIMILAR WEBSITE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-12">
        <div className="bg-[#072B1E] text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 text-[#C09A5B] text-xs font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>READY TO LAUNCH YOUR PROJECT?</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Get your business online with a custom website designed for free.
            </h2>
            <p className="text-sm text-[#A2B5AD] leading-relaxed">
              No hidden costs, no commitments. We build a high-performance website tailored specifically for your brand.
            </p>
          </div>
          <Link
            href="/#claim-website"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-[#072B1E] text-sm font-extrabold tracking-wider px-8 py-4 rounded-xl transition-all duration-300 shrink-0 shadow-lg"
          >
            <span>CLAIM YOUR FREE WEBSITE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadFormSection />

      <Footer />
    </main>
  );
}
