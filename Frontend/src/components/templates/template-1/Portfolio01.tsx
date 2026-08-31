"use client";

import React from "react";
import { GalleryItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Portfolio01Props {
  data: GalleryItem[];
}

export function Portfolio01({ data }: Portfolio01Props) {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-emperor-white-warm border-t border-emperor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="WORK SHOWCASE"
          title="Recent Strategic Engagements & Case Highlights"
          subtitle="Demonstrating leadership alignment, operational design, and enterprise governance"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <Reveal key={item.id} delay={0.1 * (idx + 1)}>
              <div className="group bg-emperor-ivory border border-emperor-border rounded-sm overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300">
                <ImagePlaceholder
                  media={item.media}
                  aspectRatio="16/9"
                  className="rounded-none border-b border-emperor-border group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest font-sans font-semibold text-emperor-emerald">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-serif font-medium text-emperor-charcoal mt-1 mb-2 group-hover:text-emperor-emerald transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
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
