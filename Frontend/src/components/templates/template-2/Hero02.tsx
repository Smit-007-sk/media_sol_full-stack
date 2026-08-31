"use client";

import React from "react";
import { HeroData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { ChevronDown } from "lucide-react";

export interface Hero02Props {
  data: HeroData;
}

export function Hero02({ data }: Hero02Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#1A120F] text-[#F5EFE6] overflow-hidden">
      {/* Background Photographic Container */}
      <div className="absolute inset-0 z-0">
        <ImagePlaceholder
          media={data.media}
          aspectRatio="auto"
          className="w-full h-full rounded-none border-none opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A120F] via-[#1A120F]/50 to-[#1A120F]/70" />
      </div>

      {/* Hero Copy */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <Reveal direction="up" delay={0.1}>
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#F5EFE6] bg-[#B85B35] border border-[#B85B35]/50 px-4 py-1.5 rounded-full inline-block mb-6 shadow-md">
            {data.eyebrow}
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] font-light text-[#F5EFE6] tracking-wide max-w-4xl mx-auto">
            {data.title}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="font-sans text-base sm:text-xl text-[#E6DDD3] font-light mt-6 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button href={data.primaryURL} variant="primary" size="lg" className="bg-[#B85B35] text-[#F5EFE6] hover:bg-[#8C3B1A]">
              {data.primaryCTA}
            </Button>
            {data.secondaryCTA && (
              <Button href={data.secondaryURL} variant="ghost" size="lg" className="text-[#F5EFE6] border-[#B85B35]/40 hover:bg-[#B85B35]/20">
                {data.secondaryCTA}
              </Button>
            )}
          </div>
        </Reveal>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-[#B85B35] opacity-90 hover:opacity-100 cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.2em] font-sans mb-1 text-[#F5EFE6]">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
