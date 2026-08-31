"use client";

import React from "react";
import { TestimonialItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ShieldCheck } from "lucide-react";

export interface Testimonials04Props {
  data: TestimonialItem[];
}

export function Testimonials04({ data }: Testimonials04Props) {
  return (
    <section className="py-20 lg:py-28 bg-stone-950 text-emperor-white-warm border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="LEADERSHIP FEEDBACK"
          title="Board & Executive Testimonials"
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, idx) => (
            <Reveal key={item.id} delay={0.15 * (idx + 1)}>
              <div className="bg-stone-900 p-8 border border-stone-800 rounded shadow-subtle flex flex-col justify-between h-full">
                <p className="font-sans text-base text-stone-200 leading-relaxed italic">
                  "{item.quote}"
                </p>

                <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white">
                      {item.author}
                    </h4>
                    <p className="text-xs text-stone-400 font-sans">
                      {item.role}, {item.company}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-emperor-gold font-sans font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Executive</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
