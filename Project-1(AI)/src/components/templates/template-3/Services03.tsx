"use client";

import React from "react";
import { ServiceItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { Check } from "lucide-react";

export interface Services03Props {
  data: ServiceItem[];
}

export function Services03({ data }: Services03Props) {
  return (
    <section id="services" className="py-24 lg:py-36 bg-emperor-noir text-emperor-white-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ATELIER CAPABILITIES"
          title="Spatial Disciplines & Experimental Craft"
          subtitle="Merging monolithic architectural form with tactile interior craftsmanship"
          align="left"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {data.map((service, idx) => (
            <Reveal key={service.id} delay={0.15 * (idx + 1)}>
              <div className="bg-stone-900/80 border border-stone-800 hover:border-emperor-gold/60 p-8 rounded-none transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-emperor-gold font-bold">
                    0{idx + 1} / PRACTICE
                  </span>

                  <h3 className="font-serif text-2xl text-emperor-white-warm font-light mt-2 mb-3 group-hover:text-emperor-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <ImagePlaceholder
                      media={service.media}
                      aspectRatio="16/9"
                      className="rounded-none border border-stone-800"
                    />
                  </div>

                  <ul className="space-y-2 text-xs text-stone-300 font-sans">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emperor-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
