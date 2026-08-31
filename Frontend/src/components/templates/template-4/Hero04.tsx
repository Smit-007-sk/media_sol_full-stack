"use client";

import React from "react";
import { HeroData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { ShieldCheck, Lock, Server } from "lucide-react";

export interface Hero04Props {
  data: HeroData;
}

export function Hero04({ data }: Hero04Props) {
  return (
    <section className="relative pt-12 lg:pt-20 pb-20 lg:pb-28 bg-[#0F172A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="up" delay={0.1}>
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#38BDF8] bg-[#1E293B] border border-[#38BDF8]/30 px-3.5 py-1.5 rounded">
                {data.eyebrow}
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                {data.title}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                {data.description}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href={data.primaryURL} variant="primary" size="lg" className="bg-[#1D4ED8] text-white hover:bg-[#1E40AF]">
                  {data.primaryCTA}
                </Button>
                {data.secondaryCTA && (
                  <Button href={data.secondaryURL} variant="ghost" size="lg" className="text-white border-[#38BDF8]/40 hover:bg-[#1E293B]">
                    {data.secondaryCTA}
                  </Button>
                )}
              </div>
            </Reveal>

            {/* Corporate Assurance Strip */}
            <Reveal direction="up" delay={0.5}>
              <div className="pt-8 border-t border-[#1E293B] grid grid-cols-3 gap-4 text-xs font-sans text-slate-300">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>Zero-Trust Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>High-Availability Cloud</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>Enterprise Audit Ready</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column Corporate Visual */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.3}>
              <div className="relative">
                <ImagePlaceholder
                  media={data.media}
                  aspectRatio="4/3"
                  className="rounded border border-[#38BDF8]/30 shadow-card"
                />

                <div className="absolute -bottom-6 -right-6 bg-[#1E293B] p-5 rounded border border-[#38BDF8]/40 shadow-xl max-w-xs hidden sm:block">
                  <span className="text-[10px] uppercase tracking-widest text-[#38BDF8] font-sans font-semibold block">
                    Enterprise Standards
                  </span>
                  <p className="text-xs text-slate-200 font-sans mt-1">
                    Continuous telemetry monitoring & regulatory compliance frameworks.
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
