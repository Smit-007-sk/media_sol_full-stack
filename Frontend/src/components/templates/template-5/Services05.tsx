"use client";

import React from "react";
import { ServiceItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Services05Props {
  data: ServiceItem[];
}

export function Services05({ data }: Services05Props) {
  return (
    <section className="py-24 lg:py-36 bg-emperor-ivory text-emperor-charcoal border-t border-emperor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="BESPOKE SERVICES"
          title="Atelier Horological Services"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {data.map((service, idx) => (
            <Reveal key={service.id} delay={0.15 * (idx + 1)}>
              <div className="bg-emperor-white-warm border border-emperor-border p-8 rounded-none text-center space-y-4 hover:border-emperor-gold/60 transition-colors">
                <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-emperor-gold font-medium">
                  {service.subtitle}
                </span>

                <h3 className="font-serif text-xl font-light text-emperor-charcoal">
                  {service.title}
                </h3>

                <p className="text-xs text-stone-600 font-sans font-light leading-relaxed">
                  {service.description}
                </p>

                <ImagePlaceholder
                  media={service.media}
                  aspectRatio="16/9"
                  className="rounded-none border border-emperor-border my-4"
                />

                <ul className="text-[11px] text-stone-500 font-sans space-y-1">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx}>• {feat}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
