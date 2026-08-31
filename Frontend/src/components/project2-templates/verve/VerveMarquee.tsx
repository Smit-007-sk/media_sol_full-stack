"use client";

import { Sparkles } from "lucide-react";

export default function VerveMarquee() {
  const words = [
    "ART DIRECTION",
    "LUXURY ARCHITECTURE",
    "HIGH FASHION",
    "SCULPTURAL FORM",
    "BRAND IDENTITY",
    "EDITORIAL DESIGN",
  ];

  return (
    <div className="bg-[#D96B43] text-white py-4 overflow-hidden select-none border-y border-[#B5532E]">
      <div className="flex whitespace-nowrap animate-marquee space-x-8 font-mono text-sm sm:text-base font-bold tracking-[0.3em] uppercase">
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center space-x-8 shrink-0">
            {words.map((word, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span>{word}</span>
                <Sparkles className="w-4 h-4 text-[#FDE0D5]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
