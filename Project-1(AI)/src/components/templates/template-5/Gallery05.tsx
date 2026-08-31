"use client";

import React from "react";
import { GalleryItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Gallery05Props {
  data: GalleryItem[];
}

export function Gallery05({ data }: Gallery05Props) {
  return (
    <section id="gallery" className="py-24 lg:py-36 bg-emperor-white-warm text-emperor-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PRIVATE COLLECTION"
          title="Masterpiece Timepieces & Bespoke Editions"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {data.map((item, idx) => (
            <Reveal key={item.id} delay={0.15 * (idx + 1)}>
              <div className="group space-y-4 text-center">
                <ImagePlaceholder
                  media={item.media}
                  aspectRatio="4/3"
                  className="rounded-none border border-emperor-gold/20 group-hover:scale-102 transition-transform duration-500"
                />
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-emperor-gold font-medium">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-light text-emperor-charcoal mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans font-light mt-1">
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
