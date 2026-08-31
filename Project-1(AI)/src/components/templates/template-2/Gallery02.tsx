"use client";

import React from "react";
import { GalleryItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Gallery02Props {
  data: GalleryItem[];
}

export function Gallery02({ data }: Gallery02Props) {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-emperor-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="VISUAL ESSENCE"
          title="Sanctuary Moments & Architectural Details"
          subtitle="A visual celebration of light, atmosphere, and quiet luxury"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <Reveal key={item.id} delay={0.15 * (idx + 1)}>
              <div className="group space-y-3">
                <ImagePlaceholder
                  media={item.media}
                  aspectRatio="4/3"
                  className="rounded-none border border-emperor-gold/20 shadow-subtle group-hover:scale-102 transition-transform duration-500"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-sans text-emperor-emerald font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg text-emperor-charcoal font-medium">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans mt-1">
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
