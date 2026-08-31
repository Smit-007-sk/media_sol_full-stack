"use client";

import React from "react";
import { ServiceItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { Check, Server, Database, Shield } from "lucide-react";

export interface Services04Props {
  data: ServiceItem[];
}

export function Services04({ data }: Services04Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="w-6 h-6 text-[#1D4ED8]" />;
      case "Database":
        return <Database className="w-6 h-6 text-[#1D4ED8]" />;
      case "Shield":
      default:
        return <Shield className="w-6 h-6 text-[#1D4ED8]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ENTERPRISE SOLUTIONS"
          title="Core Technical Pillars & Infrastructure Services"
          subtitle="Resilient digital systems engineered for high performance and regulatory compliance"
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {data.map((service, idx) => (
            <Reveal key={service.id} delay={0.15 * (idx + 1)}>
              <div className="bg-white border border-[#E2E8F0] p-8 rounded hover:border-[#1D4ED8]/60 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="p-3 bg-[#EFF6FF] rounded w-fit mb-4 border border-[#BFDBFE]">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#1D4ED8]">
                    {service.subtitle}
                  </span>

                  <h3 className="text-xl font-sans font-bold text-[#0F172A] mt-1 mb-3 group-hover:text-[#1D4ED8] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <ImagePlaceholder
                      media={service.media}
                      aspectRatio="16/9"
                      className="rounded border border-[#E2E8F0]"
                    />
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 font-sans">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
