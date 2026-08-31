"use client";

import React from "react";
import { VideoSectionData } from "@/types/template";
import { VideoPlaceholder } from "@/components/common/VideoPlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Craftsmanship05Props {
  data: VideoSectionData;
}

export function Craftsmanship05({ data }: Craftsmanship05Props) {
  return (
    <section id="craft" className="py-24 lg:py-36 bg-emperor-charcoal text-emperor-white-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Reveal direction="up">
            <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emperor-gold">
              {data.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light">
              {data.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-400 font-light">
              {data.description}
            </p>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.2}>
          <VideoPlaceholder
            media={data.media}
            title={data.title}
            description={data.description}
            aspectRatio="16/9"
          />
        </Reveal>
      </div>
    </section>
  );
}
