"use client";

import React from "react";
import { ContactData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";

export interface CTA04Props {
  data: ContactData;
}

export function CTA04({ data }: CTA04Props) {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-emperor-emerald-dark text-emperor-white-warm border-t border-emperor-gold/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Reveal direction="up">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-emperor-gold bg-emperor-gold/10 px-3.5 py-1.5 rounded border border-emperor-gold/30">
            ENTERPRISE BRIEFING
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Schedule an Executive System Advisory Session
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
            Our principal cloud architects and security officers are available to review your infrastructure roadmap and technical compliance needs.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`mailto:${data.email}`} variant="gold" size="lg">
              Request Technical Consultation
            </Button>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="pt-6 text-xs text-stone-300 font-sans space-y-1">
            <p>Direct Line: {data.phone} | Email: {data.email}</p>
            <p>Corporate Office: {data.address}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
