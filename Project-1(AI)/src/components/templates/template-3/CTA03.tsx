"use client";

import React from "react";
import { ContactData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";

export interface CTA03Props {
  data: ContactData;
}

export function CTA03({ data }: CTA03Props) {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-stone-950 text-emperor-white-warm border-t border-emperor-gold/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-4">
            <Reveal direction="up">
              <span className="text-xs uppercase tracking-[0.3em] font-sans text-emperor-gold">
                ATELIER COLLABORATION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight mt-2">
                Initiate Your Architectural Commission
              </h2>
              <p className="font-sans text-sm sm:text-base text-stone-300 max-w-xl font-light">
                We invite visionary patrons, developers, and institutions to collaborate on site-specific spatial installations and sculptural residences.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="pt-4">
                <Button href={`mailto:${data.email}`} variant="gold" size="lg">
                  Submit Project Brief
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 bg-stone-900 p-8 border border-stone-800 space-y-4 font-sans text-xs text-stone-300">
            <h4 className="font-serif text-lg text-emperor-gold font-medium">
              Atelier Contact
            </h4>
            <p>Direct: {data.phone}</p>
            <p>Email: {data.email}</p>
            <p>Location: {data.address}</p>
            <p className="pt-2 text-stone-500">{data.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
