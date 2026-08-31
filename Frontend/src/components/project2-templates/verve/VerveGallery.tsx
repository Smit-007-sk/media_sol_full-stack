"use client";

import { ArrowUpRight } from "lucide-react";

export default function VerveGallery() {
  const items = [
    {
      title: "Obsidian Monolith",
      category: "ARCHITECTURAL INSTALLATION",
      location: "TOKYO",
      year: "2026",
      gradient: "from-[#262423] via-[#3B3835] to-[#1C1A19]",
    },
    {
      title: "Velvet & Stone",
      category: "FASHION ART DIRECTION",
      location: "PARIS",
      year: "2026",
      gradient: "from-[#3D251D] via-[#4F3025] to-[#241611]",
    },
    {
      title: "Solitude Villa",
      category: "MODERNIST RESIDENCE",
      location: "KYOTO",
      year: "2025",
      gradient: "from-[#2A2D2A] via-[#3B403B] to-[#1B1D1B]",
    },
    {
      title: "Kuro Identity",
      category: "LUXURY BRAND SYSTEM",
      location: "MILAN",
      year: "2025",
      gradient: "from-[#382C25] via-[#4A3B31] to-[#211A16]",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#181717] text-[#EAE5D9] border-b border-[#2D2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-8 mb-16 border-b border-[#332F2D]">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[#D96B43] uppercase font-bold">
              ARCHIVE // 2025-2026
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal mt-2 text-[#EAE5D9]">
              Selected Works
            </h2>
          </div>
          <span className="font-mono text-xs text-[#A89F91] mt-4 sm:mt-0">
            [4 EXHIBITIONS CURATED]
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#22201F] border border-[#332F2D] hover:border-[#D96B43] transition-colors duration-300 p-8 flex flex-col justify-between h-96 text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#A89F91]">
                <span className="text-[#D96B43] font-bold tracking-widest">{item.category}</span>
                <span>{item.location} // {item.year}</span>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#EAE5D9] group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#D96B43] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
