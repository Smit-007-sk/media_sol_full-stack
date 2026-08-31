"use client";

import React from "react";
import { HeroData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { CheckCircle2 } from "lucide-react";

export interface Hero01Props {
  data: HeroData;
}

export function Hero01({ data }: Hero01Props) {
  return (
    <section className="relative pt-12 lg:pt-20 pb-16 lg:pb-24 overflow-hidden bg-emperor-ivory">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emperor-emerald/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="up" delay={0.1}>
              <span className="inline-flex items-center text-xs uppercase tracking-[0.25em] font-sans font-semibold text-emperor-emerald bg-emperor-emerald/10 border border-emperor-emerald/20 px-3.5 py-1.5 rounded-full">
                {data.eyebrow}
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.12] text-emperor-charcoal font-medium tracking-tight">
                {data.title}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                {data.description}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href={data.primaryURL} variant="primary" size="lg">
                  {data.primaryCTA}
                </Button>
                {data.secondaryCTA && (
                  <Button href={data.secondaryURL} variant="ghost" size="lg">
                    {data.secondaryCTA}
                  </Button>
                )}
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.5}>
              <div className="pt-6 border-t border-emperor-border/80 grid grid-cols-3 gap-4 text-left">
                <div className="flex items-center space-x-2 text-stone-700 text-xs sm:text-sm font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emperor-emerald flex-shrink-0" />
                  <span>Strategic Counsel</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-700 text-xs sm:text-sm font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emperor-emerald flex-shrink-0" />
                  <span>Operational Governance</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-700 text-xs sm:text-sm font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emperor-emerald flex-shrink-0" />
                  <span>Tailored Frameworks</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column Visual Placement */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="left" delay={0.3}>
              <div className="relative">
                <ImagePlaceholder
                  media={data.media}
                  aspectRatio="4/3"
                  className="rounded-sm shadow-emerald border-2 border-emperor-emerald/30"
                />

                {/* Floating Detail Card */}
                <div className="absolute -bottom-6 -left-6 bg-emperor-white-warm p-5 rounded-sm border border-emperor-gold/40 shadow-card max-w-xs hidden sm:block">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emperor-gold animate-pulse" />
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-emperor-emerald">
                      Active Advisory Practice
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-sans mt-2">
                    Delivering structured guidance across organizational pillars.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
