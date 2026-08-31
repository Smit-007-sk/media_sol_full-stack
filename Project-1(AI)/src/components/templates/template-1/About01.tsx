"use client";

import React from "react";
import { AboutData } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { Award, CheckCircle } from "lucide-react";

export interface About01Props {
  data: AboutData;
}

export function About01({ data }: About01Props) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-emperor-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Container */}
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <div className="relative">
                <ImagePlaceholder
                  media={data.media}
                  aspectRatio="3/4"
                  className="rounded-sm shadow-card border-2 border-emperor-gold/30"
                />

                <div className="absolute -top-6 -right-6 bg-emperor-emerald text-emperor-white-warm p-4 rounded-sm shadow-emerald max-w-[200px] hidden sm:block border border-emperor-gold/30">
                  <Award className="w-8 h-8 text-emperor-gold mb-2" />
                  <p className="text-xs font-serif leading-snug">
                    Structured Governance & Advisory Excellence
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <SectionHeading
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                description={data.description}
                align="left"
              />

              <div className="space-y-4 mt-8">
                {data.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded bg-emperor-white-warm border border-emperor-border flex items-start space-x-4"
                  >
                    <div className="mt-1 p-1 bg-emperor-emerald/10 rounded text-emperor-emerald flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-emperor-charcoal">
                        {highlight.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                        {highlight.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
