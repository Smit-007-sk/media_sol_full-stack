"use client";

import React from "react";
import { VideoSectionData } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { VideoPlaceholder } from "@/components/common/VideoPlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Video04Props {
  data: VideoSectionData;
}

export function Video04({ data }: Video04Props) {
  return (
    <section id="video" className="py-20 lg:py-28 bg-stone-900 text-emperor-white-warm border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          align="center"
          theme="dark"
        />

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
