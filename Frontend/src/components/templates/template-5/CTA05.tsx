"use client";

import React from "react";
import { ContactData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";

export interface CTA05Props {
  data: ContactData;
}

export function CTA05({ data }: CTA05Props) {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-emperor-white-warm text-emperor-charcoal text-center border-t border-emperor-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Reveal direction="up">
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emperor-gold">
            PRIVATE SALON APPOINTMENTS
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-emperor-charcoal">
            Schedule a Private Consultation in Geneva
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="font-sans text-xs sm:text-sm text-stone-600 font-light max-w-lg mx-auto">
            We welcome patrons to our Geneva atelier to view rare calibres and discuss private horological commissions.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="pt-4">
            <Button href={`mailto:${data.email}`} variant="minimal" size="lg">
              Request Private Salon Reservation →
            </Button>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="pt-6 text-[11px] font-sans text-stone-500 space-y-1">
            <p>Atelier Geneva: {data.address}</p>
            <p>Direct Salon Line: {data.phone}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
