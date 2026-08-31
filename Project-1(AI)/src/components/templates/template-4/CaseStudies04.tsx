"use client";

import React from "react";
import { GalleryItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface CaseStudies04Props {
  data: GalleryItem[];
}

export function CaseStudies04({ data }: CaseStudies04Props) {
  return (
    <section id="cases" className="py-20 lg:py-28 bg-stone-950 text-emperor-white-warm border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ENTERPRISE CASE STUDIES"
          title="Proven Infrastructure Deployments"
          subtitle="Real-world system integrations across regulated industries"
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <Reveal key={item.id} delay={0.15 * (idx + 1)}>
              <div className="bg-stone-900 border border-stone-800 rounded overflow-hidden group hover:border-emperor-gold/40 transition-colors">
                <ImagePlaceholder
                  media={item.media}
                  aspectRatio="16/9"
                  className="rounded-none border-b border-stone-800"
                />
                <div className="p-6 space-y-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-semibold text-emperor-gold">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-sans font-bold text-white group-hover:text-emperor-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
