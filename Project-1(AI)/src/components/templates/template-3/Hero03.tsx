"use client";

import React from "react";
import { HeroData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { ArrowUpRight } from "lucide-react";

export interface Hero03Props {
  data: HeroData;
}

export function Hero03({ data }: Hero03Props) {
  return (
    <section className="relative pt-16 lg:pt-24 pb-20 lg:pb-32 bg-emperor-noir text-emperor-white-warm overflow-hidden">
      {/* Decorative Diagonal Geometry Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 border border-emperor-gold/40 rounded-full" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] border border-emperor-emerald/30 rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.3em] font-sans text-emperor-gold">
                <span className="w-2 h-2 rounded-full bg-emperor-gold animate-ping" />
                <span>{data.eyebrow}</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] font-light text-emperor-white-warm tracking-tight">
                {data.title}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="font-sans text-base sm:text-lg text-stone-300 font-light max-w-xl leading-relaxed">
                {data.description}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Button href={data.primaryURL} variant="gold" size="lg">
                  {data.primaryCTA}
                </Button>
                {data.secondaryCTA && (
                  <Button href={data.secondaryURL} variant="gold-outline" size="lg">
                    {data.secondaryCTA}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Asymmetric Overlapping Image Container */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="left" delay={0.3}>
              <div className="relative">
                <ImagePlaceholder
                  media={data.media}
                  aspectRatio="3/4"
                  className="rounded-none border-2 border-emperor-gold/40 shadow-gold"
                />

                {/* Overlapping Floating Tag */}
                <div className="absolute -bottom-6 -left-8 bg-emperor-emerald text-emperor-white-warm p-6 rounded-none border border-emperor-gold/50 shadow-card max-w-xs hidden sm:block">
                  <span className="text-[10px] uppercase tracking-widest text-emperor-gold font-sans font-semibold block">
                    Spatial Philosophy
                  </span>
                  <p className="text-xs font-serif italic mt-1 text-stone-200">
                    "Tension between monumental concrete form and ambient daylight."
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
