"use client";

import React from "react";
import { ContactData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export interface CTA01Props {
  data: ContactData;
  title?: string;
  description?: string;
}

export function CTA01({
  data,
  title = "Ready to Elevate Your Strategic Direction?",
  description = "Connect with our senior advisory team to discuss your organizational priorities, strategic benchmarks, and transformation roadmap.",
}: CTA01Props) {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-emperor-ivory border-t border-emperor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emperor-emerald text-emperor-white-warm rounded-sm p-8 lg:p-14 border-2 border-emperor-gold/40 shadow-emerald relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emperor-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <Reveal direction="up">
                <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-emperor-gold bg-emperor-gold/10 px-3 py-1 rounded border border-emperor-gold/30">
                  CONSULTATION ENGAGEMENT
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mt-3 leading-snug">
                  {title}
                </h2>
                <p className="text-sm sm:text-base text-stone-200 font-sans leading-relaxed max-w-xl">
                  {description}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button href={`mailto:${data.email}`} variant="gold" size="lg">
                    Schedule Initial Briefing
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 bg-emperor-emerald-dark/80 p-6 rounded-sm border border-emperor-gold/30 space-y-4 text-xs font-sans text-stone-200">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-emperor-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Telephone Inquiry</span>
                  <span>{data.phone}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-emperor-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Direct Email</span>
                  <span>{data.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emperor-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Advisory Headquarters</span>
                  <span>{data.address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-emperor-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Hours of Operation</span>
                  <span>{data.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
