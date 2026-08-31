"use client";

import React from "react";
import { VideoSectionData } from "@/types/template";
import { VideoPlaceholder } from "@/components/common/VideoPlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Video03Props {
  data: VideoSectionData;
}

export function Video03({ data }: Video03Props) {
  return (
    <section id="video" className="py-24 lg:py-36 bg-emperor-noir text-emperor-white-warm border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-emperor-gold">
              {data.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-emperor-white-warm mt-3">
              {data.title}
            </h2>
            <p className="font-sans text-sm text-stone-400 mt-2 max-w-2xl">
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
