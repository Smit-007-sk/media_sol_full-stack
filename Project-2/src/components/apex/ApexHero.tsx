"use client";

import { useState } from "react";
import { MapPin, Bed, Bath, Maximize2, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import ApexSearch from "./ApexSearch";

export default function ApexHero() {
  const slides = [
    {
      title: "The Glass Pavilion Mansion",
      location: "Beverly Hills, CA",
      price: "$24,500,000",
      beds: 7,
      baths: 9,
      sqft: "12,400 sq ft",
      bgGradient: "from-[#0F172A] via-[#1E293B] to-[#0B1320]",
    },
    {
      title: "Skyline Triplex Penthouse",
      location: "Central Park South, NYC",
      price: "$38,000,000",
      beds: 5,
      baths: 6,
      sqft: "8,900 sq ft",
      bgGradient: "from-[#331E11] via-[#1E293B] to-[#0B1320]",
    },
    {
      title: "Oceanfront Horizon Villa",
      location: "Miami Beach, FL",
      price: "$19,800,000",
      beds: 6,
      baths: 8,
      sqft: "10,200 sq ft",
      bgGradient: "from-[#0F2D38] via-[#0F172A] to-[#0B1320]",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[currentSlide];

  return (
    <section className="relative min-h-[85vh] bg-[#0B1320] text-white overflow-hidden border-b border-amber-900/30 flex flex-col justify-between">
      {/* FULL-BLEED LUXURY BACKDROP SLIDER */}
      <div className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient} transition-colors duration-700 pointer-events-none`} />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Hero Header & Search Bar Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10 text-center w-full">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-800/60 inline-block">
            FULL-BLEED PRIVATE LUXURY COLLECTION
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            Architectural Masterpieces <br />
            <span className="italic text-[#F59E0B]">in Prime Destinations</span>
          </h1>
        </div>

        {/* Search Bar Overlay */}
        <div className="mt-8">
          <ApexSearch />
        </div>
      </div>

      {/* FLOATING BOTTOM OVERLAY BAR FOR ACTIVE PROPERTY */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full pt-10">
        <div className="bg-[#1E293B]/95 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          
          {/* Active Property Stats */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{active.location}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">{active.title}</h3>
            <div className="text-xl font-bold text-[#F59E0B]">{active.price}</div>
          </div>

          {/* Specs Pill List */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 bg-[#0F172A] px-3.5 py-2 rounded-xl border border-slate-800">
              <Bed className="w-4 h-4 text-amber-500" />
              <span>{active.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0F172A] px-3.5 py-2 rounded-xl border border-slate-800">
              <Bath className="w-4 h-4 text-amber-500" />
              <span>{active.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0F172A] px-3.5 py-2 rounded-xl border border-slate-800">
              <Maximize2 className="w-4 h-4 text-amber-500" />
              <span>{active.sqft}</span>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-2xl bg-[#0F172A] hover:bg-amber-600 text-white transition-colors border border-slate-700"
              title="Previous property"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-2xl bg-[#0F172A] hover:bg-amber-600 text-white transition-colors border border-slate-700"
              title="Next property"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
