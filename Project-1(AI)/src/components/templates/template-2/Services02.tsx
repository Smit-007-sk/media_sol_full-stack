"use client";

import React from "react";
import { ServiceItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { Check } from "lucide-react";

export interface Services02Props {
  data: ServiceItem[];
}

export function Services02({ data }: Services02Props) {
  return (
    <section id="services" className="py-24 lg:py-32 bg-stone-900 text-emperor-white-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SANCTUARY COLLECTION"
          title="Curated Living Pavilions & Botanical Experiences"
          subtitle="Designed for deep restoration, privacy, and natural luxury"
          align="center"
          theme="dark"
        />

        <div className="space-y-16 lg:space-y-24 mt-12">
          {data.map((service, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <Reveal key={service.id} delay={0.2}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Media Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <ImagePlaceholder
                      media={service.media}
                      aspectRatio="16/9"
                      className="rounded-none border border-emperor-gold/30 shadow-gold"
                    />
                  </div>

                  {/* Text Column */}
                  <div
                    className={`lg:col-span-5 space-y-4 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-[0.25em] font-sans text-emperor-gold">
                      {service.subtitle}
                    </span>

                    <h3 className="font-serif text-3xl sm:text-4xl text-emperor-white-warm font-light">
                      {service.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed font-light">
                      {service.description}
                    </p>

                    <div className="pt-4 space-y-2.5 text-xs text-stone-300 font-sans border-t border-stone-800">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emperor-gold flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
