"use client";

import { useState } from "react";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function ApexProperties() {
  const [activeTab, setActiveTab] = useState("All Estates");

  const tabs = ["All Estates", "Beverly Hills", "Manhattan Penthouses", "Miami Waterfronts"];

  const properties = [
    {
      title: "The Glass Pavilion Mansion",
      location: "Beverly Hills, CA",
      price: "$24,500,000",
      tag: "FEATURED ESTATE",
      span: "md:col-span-8 h-96",
      gradient: "from-[#1E293B] via-[#0F172A] to-[#0B1320]",
    },
    {
      title: "Skyline Triplex Penthouse",
      location: "Central Park South, NYC",
      price: "$38,000,000",
      tag: "SKYLINE PENTHOUSE",
      span: "md:col-span-4 h-96",
      gradient: "from-[#331E11] via-[#1E293B] to-[#0B1320]",
    },
    {
      title: "Oceanfront Horizon Villa",
      location: "Miami Beach, FL",
      price: "$19,800,000",
      tag: "WATERFRONT VILLA",
      span: "md:col-span-4 h-80",
      gradient: "from-[#0F2D38] via-[#0F172A] to-[#0B1320]",
    },
    {
      title: "Château de Riviera",
      location: "Monaco Coast",
      price: "$42,000,000",
      tag: "PRIVATE ESTATE",
      span: "md:col-span-8 h-80",
      gradient: "from-[#2A1F3D] via-[#1E293B] to-[#0B1320]",
    },
  ];

  return (
    <section className="py-20 bg-[#0B1320] text-white border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800/60">
            ASYMMETRIC MASONRY ARCHIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Exclusive Estate Gallery
          </h2>
        </div>

        {/* Location Explorer Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#D97706] text-white shadow-lg shadow-amber-900/40"
                  : "bg-[#1E293B] text-slate-400 hover:text-white border border-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ASYMMETRIC MASONRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          {properties.map((item, idx) => (
            <div
              key={idx}
              className={`${item.span} group relative bg-gradient-to-br ${item.gradient} rounded-3xl p-8 border border-slate-700/60 shadow-xl flex flex-col justify-between overflow-hidden hover:border-amber-500 transition-colors`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-bold bg-amber-500 text-black px-3 py-1 rounded-full uppercase">
                  {item.tag}
                </span>
                <span className="font-serif text-xl font-bold text-amber-300">{item.price}</span>
              </div>

              <div className="z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-[#0F172A] border border-slate-700 flex items-center justify-center text-amber-400 group-hover:bg-[#D97706] group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
