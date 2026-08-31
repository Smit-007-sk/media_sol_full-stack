"use client";

import React from "react";
import { AboutData } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Process03Props {
  data: AboutData;
}

export function Process03({ data }: Process03Props) {
  return (
    <section id="about" className="py-24 lg:py-36 bg-stone-950 text-emperor-white-warm border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <ImagePlaceholder
                media={data.media}
                aspectRatio="3/4"
                className="rounded-none border-2 border-emperor-gold/40 shadow-gold"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="left">
              <SectionHeading
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                description={data.description}
                align="left"
                theme="dark"
              />

              <div className="space-y-6 mt-8">
                {data.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-stone-900 border border-stone-800 rounded-none flex items-start space-x-4"
                  >
                    <span className="font-mono text-emperor-gold text-lg font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-serif text-xl text-emperor-white-warm font-light">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
                        {item.detail}
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
