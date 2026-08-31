"use client";

import React from "react";
import { ContactData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";

export interface CTA02Props {
  data: ContactData;
}

export function CTA02({ data }: CTA02Props) {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-stone-900 text-emperor-white-warm text-center relative overflow-hidden border-t border-emperor-gold/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <Reveal direction="up">
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-emperor-gold">
            PRIVATE RESERVATIONS
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
            Reserve Your Sanctuary Pavilion Today
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="font-sans text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Our estate concierge is available to assist with bespoke itinerary planning, private pavilion selection, and dining reservations.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`mailto:${data.email}`} variant="gold" size="lg">
              Inquire Pavilion Stay
            </Button>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="pt-8 text-xs font-sans text-stone-400 space-y-1">
            <p>Direct Concierge Line: {data.phone}</p>
            <p>Location: {data.address}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
