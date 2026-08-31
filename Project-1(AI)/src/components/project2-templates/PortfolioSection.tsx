"use client";

import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Web Apps", "E-Commerce", "Mobile UI"];

  const projects = [
    {
      title: "Nexus Financial Suite",
      category: "Web Apps",
      description: "Enterprise fintech dashboard with real-time analytics, secure transactions, and dark mode UI.",
      gradient: "from-[#0F382C] via-[#1E4D3E] to-[#0A261E]",
      tag: "Next.js & TypeScript",
      metrics: "+145% User Engagement",
    },
    {
      title: "Aura Luxury Real Estate",
      category: "Web Apps",
      description: "High-end property showcase platform featuring virtual 3D tours and interactive maps.",
      gradient: "from-[#B88E44] via-[#966F2C] to-[#594015]",
      tag: "Serif Luxury UI",
      metrics: "3.2x Lead Conversion",
    },
    {
      title: "Solstice Fashion E-Shop",
      category: "E-Commerce",
      description: "Modern lifestyle fashion storefront with instant search, headless Shopify checkout, and currency converter.",
      gradient: "from-[#1A202C] via-[#2D3748] to-[#111827]",
      tag: "Shopify & React",
      metrics: "$1.2M Sales in Q1",
    },
    {
      title: "HealthSync Telehealth",
      category: "Mobile UI",
      description: "HIPAA-compliant mobile healthcare app with live video consultations and prescription tracking.",
      gradient: "from-[#155E75] via-[#0E7490] to-[#164E63]",
      tag: "iOS & Android",
      metrics: "50k+ Active Users",
    },
    {
      title: "Vanguard Global Logistics",
      category: "Web Apps",
      description: "Real-time supply chain tracking platform with AI route optimization and live telemetry.",
      gradient: "from-[#1E3A8A] via-[#1D4ED8] to-[#172554]",
      tag: "SaaS Dashboard",
      metrics: "40% Ops Speedup",
    },
    {
      title: "Apex Architectural Studio",
      category: "Mobile UI",
      description: "Interactive architectural portfolio site showcasing sustainable building projects and blueprint downloads.",
      gradient: "from-[#3F6212] via-[#4D7C0F] to-[#1A2E05]",
      tag: "Portfolio & Booking",
      metrics: "200+ New Inquiries",
    },
  ];

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-20 bg-[#F6F1E6]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#B88E44]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans">
              OUR PORTFOLIO
            </span>
            <span className="w-8 h-px bg-[#B88E44]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421]">
            Featured Success Stories
          </h2>

          <p className="text-base text-[#5C645E]">
            Explore our recent client transformations and award-winning digital solutions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#0F382C] text-white shadow-lg shadow-[#0F382C]/20 scale-105"
                  : "bg-white text-[#4A524D] hover:bg-[#F3ECE0] border border-[#E5DACB]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E5DACB] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              {/* Project Card Graphic Cover */}
              <div className={`h-52 w-full bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                    {project.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0F382C] transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Metric Overlay */}
                <div className="z-10">
                  <span className="text-xs font-semibold text-[#D8B775] block">Impact Metric</span>
                  <span className="font-serif text-xl font-bold text-white">{project.metrics}</span>
                </div>

                {/* Abstract Line Graphics */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />
              </div>

              {/* Card Body Details */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2421] group-hover:text-[#B88E44] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#5C645E] mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B88E44]">{project.category}</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F382C] group-hover:text-[#B88E44] transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
