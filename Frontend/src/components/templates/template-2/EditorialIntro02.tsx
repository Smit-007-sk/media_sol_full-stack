"use client";

import React from "react";
import { AboutData } from "@/types/template";
import { Reveal } from "@/components/common/Reveal";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

export interface EditorialIntro02Props {
  data: AboutData;
}

export function EditorialIntro02({ data }: EditorialIntro02Props) {
  return (
    <section id="about" className="py-24 lg:py-36 bg-[#F5EFE6] text-[#231B18]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-16 lg:mb-24">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#B85B35] font-semibold bg-[#B85B35]/10 px-3 py-1 rounded">
              {data.eyebrow}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.12] text-[#231B18] font-normal">
              "{data.title}"
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="font-serif text-lg sm:text-2xl text-[#8C3B1A] italic font-light">
              {data.subtitle}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <p className="font-sans text-base sm:text-lg text-[#6E5B54] leading-relaxed font-light">
              {data.description}
            </p>
          </Reveal>
        </div>

        {/* Large Editorial Media Feature */}
        <Reveal direction="up" delay={0.5}>
          <div className="relative">
            <ImagePlaceholder
              media={data.media}
              aspectRatio="21/9"
              className="rounded-none shadow-card border-t border-b border-[#B85B35]/40"
            />
          </div>
        </Reveal>

        {/* Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-[#DBC8B5]">
          {data.highlights.map((item, idx) => (
            <Reveal key={idx} delay={0.1 * (idx + 1)}>
              <div className="space-y-2 bg-[#FAF6F0] p-6 border border-[#DBC8B5]">
                <span className="text-xs font-mono uppercase text-[#B85B35] font-bold">
                  0{idx + 1}
                </span>
                <h4 className="font-serif text-xl text-[#231B18] font-medium">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#6E5B54] font-sans leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
