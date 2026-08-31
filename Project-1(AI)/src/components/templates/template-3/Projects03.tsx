"use client";

import React from "react";
import { GalleryItem } from "@/types/template";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";
import { ArrowUpRight } from "lucide-react";

export interface Projects03Props {
  data: GalleryItem[];
}

export function Projects03({ data }: Projects03Props) {
  return (
    <section id="projects" className="py-24 lg:py-36 bg-zinc-950 text-emperor-white-warm border-t border-emperor-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SELECTED SHOWCASE"
          title="Monolithic Formwork & Spatial Commissions"
          subtitle="A curated selection of architectural structures and interior environments"
          align="left"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mt-12">
          {data.map((project, idx) => {
            const isLarge = idx === 0;

            return (
              <div
                key={project.id}
                className={isLarge ? "md:col-span-12" : "md:col-span-6"}
              >
                <Reveal delay={0.15 * (idx + 1)}>
                  <div className="group space-y-4 bg-stone-900/60 p-6 border border-stone-800 hover:border-emperor-gold/50 transition-all duration-300">
                    <ImagePlaceholder
                      media={project.media}
                      aspectRatio={isLarge ? "21/9" : "4/3"}
                      className="rounded-none group-hover:scale-102 transition-transform duration-500"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-emperor-gold font-semibold">
                          {project.category}
                        </span>
                        <h3 className="font-serif text-2xl text-emperor-white-warm font-light group-hover:text-emperor-gold transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-stone-400 font-sans mt-1">
                          {project.caption}
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-full border border-emperor-gold/40 flex items-center justify-center text-emperor-gold group-hover:bg-emperor-gold group-hover:text-emperor-noir transition-all flex-shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
