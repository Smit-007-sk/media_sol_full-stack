"use client";

import React from "react";
import { TestimonialItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Quote } from "lucide-react";

export interface Testimonials02Props {
  data: TestimonialItem[];
}

export function Testimonials02({ data }: Testimonials02Props) {
  return (
    <section className="py-20 lg:py-28 bg-emperor-white-warm border-t border-emperor-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GUEST REFLECTIONS"
          title="Words of Appreciation"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, idx) => (
            <Reveal key={item.id} delay={0.15 * (idx + 1)}>
              <div className="bg-emperor-ivory p-8 sm:p-10 border border-emperor-border rounded-none shadow-subtle flex flex-col justify-between h-full relative">
                <Quote className="w-8 h-8 text-emperor-gold/40 mb-4" />
                <p className="font-serif text-lg sm:text-xl text-emperor-charcoal italic leading-relaxed">
                  "{item.quote}"
                </p>

                <div className="mt-8 pt-6 border-t border-emperor-border flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-emperor-charcoal">
                      {item.author}
                    </h4>
                    <p className="text-xs text-stone-500 font-sans">
                      {item.role}, {item.company}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-emperor-gold font-sans font-semibold">
                    Verified Stay
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
