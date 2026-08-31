"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

export default function VerveServices() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      num: "01",
      title: "SPATIAL & RESIDENTIAL ARCHITECTURE",
      summary: "Bespoke residential villas, flagship showrooms, and gallery installations with raw stone textures.",
      details: "We construct minimalist physical environments that elevate light, shadow, and tactile stone materials.",
    },
    {
      num: "02",
      title: "HIGH-FASHION CAMPAIGN ART DIRECTION",
      summary: "Runway show concepts, editorial fashion direction, and luxury campaign photography.",
      details: "End-to-end visual leadership for Paris and Milan fashion houses seeking avant-garde brand positioning.",
    },
    {
      num: "03",
      title: "BRAND IDENTITY & SYSTEM DESIGN",
      summary: "Bespoke typography, physical print artifacts, luxury packaging, and digital manifestos.",
      details: "Crafting distinct visual codes that render your brand instantly recognizable in high-end global markets.",
    },
    {
      num: "04",
      title: "EXPERIMENTAL DIGITAL ARTIFACTS",
      summary: "High-contrast web applications, interactive 3D portfolios, and immersive digital manifestos.",
      details: "Translating physical architecture into fluid, motion-rich digital web experiences.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#141313] text-[#EAE5D9] font-mono border-b border-[#2D2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pb-8 mb-12 border-b border-[#332F2D]">
          <span className="text-xs tracking-[0.3em] text-[#D96B43] uppercase font-bold">
            STUDIO ACCORDION // SERVICES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal mt-2 text-[#EAE5D9]">
            Discipline &amp; Capabilities
          </h2>
        </div>

        {/* INTERACTIVE EXPANDING ACCORDION */}
        <div className="divide-y divide-[#332F2D]">
          {services.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 transition-colors duration-200">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-serif text-3xl text-[#D96B43] font-light">{item.num}</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#EAE5D9] group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#453E3A] flex items-center justify-center text-[#D96B43] group-hover:border-[#D96B43] transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-14 max-w-3xl space-y-3 font-sans text-sm text-[#A89F91] leading-relaxed animate-in fade-in duration-200">
                    <p className="font-semibold text-white">{item.summary}</p>
                    <p>{item.details}</p>
                    <div className="pt-2">
                      <a
                        href="#gallery"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D96B43] uppercase tracking-wider hover:underline"
                      >
                        <span>View Portfolio Archive</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
