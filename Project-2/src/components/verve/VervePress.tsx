"use client";

import { Award } from "lucide-react";

export default function VervePress() {
  const awards = [
    { year: "2026", publication: "Architectural Digest", title: "Global Top 10 Studio of the Year" },
    { year: "2026", publication: "Vogue International", title: "Best Fashion Art Direction Award" },
    { year: "2025", publication: "Wallpaper* Design Awards", title: "Winner - Best Spatial Pavilion" },
    { year: "2025", publication: "Milan Design Triennale", title: "Gold Medal for Raw Materials" },
  ];

  return (
    <section className="py-24 bg-[#141313] text-[#EAE5D9] font-mono border-b border-[#2D2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        <div className="pb-8 mb-12 border-b border-[#332F2D] flex items-center justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#D96B43] uppercase font-bold">
              RECOGNITION // PRESS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal mt-2 text-[#EAE5D9]">
              Awards &amp; Features
            </h2>
          </div>
          <Award className="w-8 h-8 text-[#D96B43]" />
        </div>

        <div className="divide-y divide-[#332F2D]">
          {awards.map((item, idx) => (
            <div key={idx} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-[#D96B43]">{item.year}</span>
                <span className="font-serif text-xl text-[#EAE5D9] group-hover:text-white transition-colors">{item.publication}</span>
              </div>
              <span className="font-sans text-xs text-[#A89F91] uppercase tracking-wider">{item.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
