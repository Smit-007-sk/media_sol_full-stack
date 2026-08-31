"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Scissors, Crown, Compass } from 'lucide-react';

interface MaisonHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function MaisonHero({ data, design, theme }: MaisonHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'centered';

  const eyebrow = data?.eyebrow || 'HAUTE COUTURE & INTERIOR ATELIER // PARIS';
  const title = data?.title || 'Timeless Aesthetics & Spatial Artisanal Craftsmanship';
  const description =
    data?.description ||
    'Sculpting bespoke couture gowns, private residence interiors, and editorial art direction for discerning patrons across Paris, Milan, and New York.';
  const primaryText = data?.primaryButtonText || 'Explore Atelier Lookbook';
  const primaryUrl = data?.primaryButtonUrl || '#services';

  const pressLogos = [
    { title: 'VOGUE PARIS', quote: 'The Pinnacle of Modern Atelier Craftsmanship' },
    { title: "HARPER'S BAZAAR", quote: 'Sculptural Elegance Without Compromise' },
    { title: 'ELLE DECOR', quote: 'Redefining Private Interior Sanctuaries' },
    { title: 'GQ INTERNATIONAL', quote: 'Bespoke Tailoring Mastery' },
  ];

  if (heroLayout === 'split') {
    return (
      <section className="relative py-24 overflow-hidden border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FAFAFA)', color: 'var(--theme-text, #111111)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-block font-serif italic text-xs tracking-[0.3em] uppercase text-[#C5A059]">
                — {eyebrow} —
              </span>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.05] font-serif text-[#111111]">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed font-sans">
                {description}
              </p>
              <div className="pt-4 flex">
                <Button href={primaryUrl} variant="primary" size="lg">
                  {primaryText}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              {heroMedia ? (
                <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-300/80 shadow-2xl" />
              ) : (
                <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                  <Scissors className="w-6 h-6 text-[#C5A059]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">LOOKBOOK SPREAD</span>
                  <h3 className="font-serif text-xl font-bold">Haute Couture Gowns</h3>
                  <p className="text-xs text-stone-500 font-sans leading-relaxed">Hand-draped silk organza and French lace embroideries.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FAFAFA)', color: 'var(--theme-text, #111111)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <span className="inline-block font-serif italic text-xs tracking-[0.3em] uppercase text-[#C5A059]">
            — {eyebrow} —
          </span>

          <h1
            className="text-5xl sm:text-7xl font-light tracking-tight leading-[1.05] font-serif text-[#111111]"
            style={{ fontFamily: 'var(--theme-heading-font, Playfair Display, serif)' }}
          >
            {title}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-light leading-relaxed font-sans" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
            {description}
          </p>

          <div className="pt-4 flex justify-center">
            <Button href={primaryUrl} variant="primary" size="lg">
              {primaryText}
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {heroMedia ? (
            <ImagePlaceholder media={heroMedia} aspectRatio="21/9" className="rounded-3xl border border-stone-300/80 shadow-2xl" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <Scissors className="w-6 h-6 text-[#C5A059]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">LOOKBOOK SPREAD I</span>
                <h3 className="font-serif text-xl font-bold">Haute Couture Gowns</h3>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">Hand-draped silk organza and intricate French lace embroideries.</p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <Crown className="w-6 h-6 text-[#C5A059]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">LOOKBOOK SPREAD II</span>
                <h3 className="font-serif text-xl font-bold">Private Residence Interiors</h3>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">Custom alabaster lighting, carved marble hearths, and bespoke furniture.</p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <Compass className="w-6 h-6 text-[#C5A059]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">LOOKBOOK SPREAD III</span>
                <h3 className="font-serif text-xl font-bold">Heirloom Jewelry</h3>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">One-of-a-kind precious gemstone settings crafted in 18k solid gold.</p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-12 border-t border-stone-200">
          <p className="text-[11px] font-serif uppercase tracking-[0.25em] text-stone-400 mb-6">FEATURED IN EDITORIAL PUBLICATIONS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-serif">
            {pressLogos.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200/60 space-y-1">
                <div className="font-bold text-sm text-[#111111]">{p.title}</div>
                <div className="text-[10px] text-stone-500 italic font-sans">&ldquo;{p.quote}&rdquo;</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
