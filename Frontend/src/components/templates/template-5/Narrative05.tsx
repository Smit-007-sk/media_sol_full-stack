"use client";

import React from "react";
import { AboutData } from "@/types/template";
import { Reveal } from "@/components/common/Reveal";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

export interface Narrative05Props {
  data: AboutData;
}

export function Narrative05({ data }: Narrative05Props) {
  return (
    <section id="narrative" className="py-24 lg:py-36 bg-emperor-ivory text-emperor-charcoal border-t border-emperor-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Reveal direction="up">
            <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emperor-gold font-medium">
              {data.eyebrow}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-emperor-charcoal leading-snug">
              {data.title}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="font-serif italic text-emperor-gold text-lg">
              {data.subtitle}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <p className="font-sans text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              {data.description}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal direction="right">
              <ImagePlaceholder
                media={data.media}
                aspectRatio="4/3"
                className="rounded-none border border-emperor-gold/30"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {data.highlights.map((item, idx) => (
              <Reveal key={idx} delay={0.15 * (idx + 1)}>
                <div className="space-y-1 pb-6 border-b border-emperor-border">
                  <h4 className="font-serif text-xl font-normal text-emperor-charcoal">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans font-light">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
