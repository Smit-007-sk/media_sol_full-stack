"use client";

import React from 'react';
import { About } from '@/api/content';
import { Wine, Flame, Sparkles } from 'lucide-react';

interface EmberAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function EmberAbout({ data }: EmberAboutProps) {
  const eyebrow = data?.eyebrow || 'OUR HEARTH PHILOSOPHY';
  const title = data?.title || 'Elemental Fire & Artisanal Gastronomy';
  const description =
    data?.description ||
    'At Ember Hospitality, every dish is forged over indigenous white oak embers. We source ingredients directly from neighboring bio-farms to create unforgettable sensory dining.';

  return (
    <section id="about" className="py-24 border-b border-stone-800 bg-[#121216] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest font-mono text-red-400">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
                <div className="text-2xl font-bold text-red-400 font-serif">1,200+</div>
                <div className="text-stone-500 font-sans">Vintage Cellar Labels</div>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
                <div className="text-2xl font-bold text-amber-500 font-serif">100%</div>
                <div className="text-stone-500 font-sans">Organic Local Sourcing</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl border border-stone-800 bg-[#16161A] space-y-3">
              <Flame className="w-8 h-8 text-red-500" />
              <h4 className="font-bold text-sm font-serif">Wood-Fired Hearth</h4>
              <p className="text-xs text-stone-400">High-heat searing over oak and applewood embers.</p>
            </div>
            <div className="p-6 rounded-3xl border border-stone-800 bg-[#16161A] space-y-3">
              <Wine className="w-8 h-8 text-amber-500" />
              <h4 className="font-bold text-sm font-serif">Sommelier Pairings</h4>
              <p className="text-xs text-stone-400">Rare biodynamic vintages curated for every course.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
