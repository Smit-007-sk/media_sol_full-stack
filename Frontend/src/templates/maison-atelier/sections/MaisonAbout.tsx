"use client";

import React from 'react';
import { About } from '@/api/content';
import { Sparkles, Scissors, Gem } from 'lucide-react';

interface MaisonAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function MaisonAbout({ data }: MaisonAboutProps) {
  const eyebrow = data?.eyebrow || 'THE ATELIER STORY';
  const title = data?.title || 'Pursuit of Uncompromising Luxury';
  const description =
    data?.description ||
    'Founded in Paris, Maison Atelier merges centuries-old French craftsmanship with minimalist architectural silhouettes. Each gown and spatial commission requires 300+ hours of hand-embroidery and architectural drafting.';

  return (
    <section id="about" className="py-24 bg-white border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-serif italic text-xs tracking-[0.2em] text-[#C5A059] uppercase">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light leading-tight">
              {title}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-sans font-light">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 font-serif">
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <div className="text-3xl font-light text-[#C5A059]">300+</div>
                <div className="text-xs text-stone-500 font-sans uppercase tracking-wider">Hours Per Atelier Commission</div>
              </div>
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <div className="text-3xl font-light text-[#C5A059]">N° 01</div>
                <div className="text-xs text-stone-500 font-sans uppercase tracking-wider">Rue de la Paix Paris</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl border border-stone-200 bg-[#FAFAFA] space-y-4 text-center">
              <Scissors className="w-8 h-8 text-[#C5A059] mx-auto" />
              <h4 className="font-serif text-lg">Haute Couture Draping</h4>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">Hand-sculpted silk organza and custom embroidery.</p>
            </div>
            <div className="p-8 rounded-3xl border border-stone-200 bg-[#FAFAFA] space-y-4 text-center">
              <Gem className="w-8 h-8 text-[#C5A059] mx-auto" />
              <h4 className="font-serif text-lg">Rare Materiality</h4>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">Ethically sourced Carrara marble, brass, and rare silks.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
