"use client";

import React from "react";
import { HeroData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Reveal } from "@/components/common/Reveal";

export interface Hero05Props {
  data: HeroData;
}

export function Hero05({ data }: Hero05Props) {
  return (
    <section className="pt-16 lg:pt-24 pb-20 lg:pb-32 bg-emperor-white-warm text-emperor-charcoal text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Reveal direction="up" delay={0.1}>
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emperor-gold font-medium">
            {data.eyebrow}
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-emperor-charcoal tracking-wide max-w-4xl mx-auto leading-tight">
            {data.title}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="font-sans text-sm sm:text-base text-stone-600 font-light max-w-xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="pt-8">
            <ImagePlaceholder
              media={data.media}
              aspectRatio="21/9"
              className="max-w-5xl mx-auto rounded-none border border-emperor-gold/30 shadow-subtle"
            />
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="pt-6">
            <Button href={data.primaryURL} variant="minimal" size="md">
              {data.primaryCTA} →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
