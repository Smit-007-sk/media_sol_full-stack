"use client";

import React from "react";
import { ServiceItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { Check, ArrowUpRight, TrendingUp, ShieldCheck, Briefcase } from "lucide-react";

export interface Services01Props {
  data: ServiceItem[];
}

export function Services01({ data }: Services01Props) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-emperor-gold" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emperor-gold" />;
      case "Briefcase":
      default:
        return <Briefcase className="w-6 h-6 text-emperor-gold" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-emperor-white-warm border-t border-emperor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="OUR PRACTICE AREAS"
          title="Structured Advisory Solutions Designed for Enterprise Scale"
          subtitle="Specialized guidance across strategic planning, operational execution, and capital readiness"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((service, idx) => (
            <Reveal key={service.id} delay={0.1 * (idx + 1)}>
              <div className="bg-emperor-ivory border border-emperor-border hover:border-emperor-gold/60 p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 shadow-subtle hover:shadow-card flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-sm bg-emperor-emerald flex items-center justify-center shadow-emerald">
                      {getIconComponent(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-widest font-sans font-semibold text-emperor-emerald">
                    {service.subtitle}
                  </span>

                  <h3 className="text-xl font-serif text-emperor-charcoal font-medium mt-1 mb-3 group-hover:text-emperor-emerald transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-stone-600 font-sans leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <ImagePlaceholder
                      media={service.media}
                      aspectRatio="16/9"
                      className="rounded-sm"
                    />
                  </div>

                  <ul className="space-y-2 mb-6 text-xs text-stone-700 font-sans">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emperor-emerald flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-emperor-border flex items-center justify-between text-xs font-sans font-semibold text-emperor-emerald group-hover:text-emperor-gold transition-colors">
                  <span>Learn Practice Details</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
