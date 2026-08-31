"use client";

import { useState } from "react";
import { Search, HeartPulse, Video, Pill, TestTube, Ambulance, ArrowRight, CheckCircle2 } from "lucide-react";
import VitalisWidget from "./VitalisWidget";

export default function VitalisHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setTimeout(() => setSearched(false), 3000);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#E6FFFA] via-[#F0FDFA] to-white py-16 lg:py-24 text-[#0F172A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* RADICAL CENTERED SEARCH PORTAL HERO */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-bold uppercase tracking-wider border border-[#99F6E4] mx-auto">
            <HeartPulse className="w-4 h-4 text-[#0D9488] fill-current animate-pulse" />
            <span>24/7 Virtual Telehealth Portal</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-[#0F2942] leading-tight tracking-tight">
            Find Your Specialist &amp; <br />
            <span className="bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] bg-clip-text text-transparent">
              Book Instant Care
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#475569] max-w-xl mx-auto leading-relaxed">
            Connect with board-certified doctors in under 5 minutes. Real-time video visits, e-prescriptions, and AI symptom matching.
          </p>

          {/* Centered Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full p-2 border-2 border-teal-200 shadow-xl focus-within:border-[#0284C7] transition-all">
              <Search className="w-6 h-6 text-gray-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symptoms, conditions, or doctor name..."
                className="w-full px-4 py-2 text-sm sm:text-base text-[#0F172A] focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>Find Care</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {searched && (
              <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold shadow-lg animate-in fade-in">
                Found 28 Certified Specialists matching &ldquo;{searchQuery || "General Practice"}&rdquo;
              </div>
            )}
          </form>

          {/* 4 Quick Action Hub Pill Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto">
            <div className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-2.5 hover:border-[#0284C7] hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div className="text-left text-xs font-bold text-[#0F172A]">Telehealth</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-2.5 hover:border-[#059669] hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                <Pill className="w-4 h-4" />
              </div>
              <div className="text-left text-xs font-bold text-[#0F172A]">E-Prescription</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-2.5 hover:border-[#0D9488] hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                <TestTube className="w-4 h-4" />
              </div>
              <div className="text-left text-xs font-bold text-[#0F172A]">Lab Tests</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-2.5 hover:border-rose-500 hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Ambulance className="w-4 h-4" />
              </div>
              <div className="text-left text-xs font-bold text-[#0F172A]">Urgent Care</div>
            </div>
          </div>

        </div>

        {/* Embedded Health Metric Calculator Below */}
        <div className="mt-16 max-w-2xl mx-auto">
          <VitalisWidget />
        </div>

      </div>
    </section>
  );
}
