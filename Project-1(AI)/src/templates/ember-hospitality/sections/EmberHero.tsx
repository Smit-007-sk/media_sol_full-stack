"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Flame, UtensilsCrossed, Wine } from 'lucide-react';

interface EmberHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function EmberHero({ data, design, theme }: EmberHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'BOUTIQUE HOSPITALITY & WOOD-FIRED HEARTH';
  const title = data?.title || 'Artisanal Gastronomy & Atmospheric Luxury Stays';
  const description =
    data?.description ||
    'Immerse in open-fire hearth gastronomy, sommelier-curated cellars, and tranquil highland villa suites.';
  const primaryText = data?.primaryButtonText || 'Reserve Table & Suite';
  const primaryUrl = data?.primaryButtonUrl || '#contact';

  const accolades = [
    { title: 'MICHELIN GUIDE', detail: 'Recommended Partner 2026' },
    { title: 'WINE SPECTATOR', detail: 'Grand Award Cellar' },
    { title: 'LUXURY RETREATS', detail: '5-Star Villa Gold Rating' },
  ];

  const isFullBleedBg = heroLayout === 'fullBleedBg' || heroLayout === 'fullBleed' || heroLayout === 'full-bleed';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof heroMedia === 'string' ? heroMedia : heroMedia?.url;

  if (isFullBleedBg) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center py-24 text-stone-100 overflow-hidden" style={{ backgroundColor: '#0F0F12' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/80 to-[#0F0F12]/40 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-red-400">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold font-serif leading-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-stone-300 font-sans leading-relaxed drop-shadow font-medium">
            {description}
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <a
              href={primaryUrl}
              className="px-8 py-3.5 bg-red-800 text-white rounded-full font-serif text-sm font-semibold shadow-2xl hover:bg-red-700 transition-all"
            >
              {primaryText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (heroLayout === 'centered') {
    return (
      <section className="relative py-24 border-b border-stone-800 text-center" style={{ backgroundColor: 'var(--theme-background, #0F0F12)', color: 'var(--theme-text, #F5F5F4)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-red-900/50 bg-red-950/40 text-red-400 mx-auto">
            <Flame className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-white">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed">
            {description}
          </p>

          <div className="flex justify-center pt-2">
            <Button href={primaryUrl} variant="primary" size="lg">
              {primaryText}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden border-b border-stone-800" style={{ backgroundColor: 'var(--theme-background, #0F0F12)', color: 'var(--theme-text, #F5F5F4)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-red-900/50 bg-red-950/40 text-red-400">
              <Flame className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl font-bold leading-tight font-serif text-white tracking-tight whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontFamily: 'var(--theme-heading-font, Playfair Display, serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
            </div>

            <div className="pt-8 border-t border-stone-800 grid grid-cols-3 gap-4 text-xs font-mono text-stone-400">
              <div className="flex items-center space-x-2">
                <UtensilsCrossed className="w-4 h-4 text-red-500" />
                <span>Wood-Fired Hearth</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wine className="w-4 h-4 text-red-500" />
                <span>Sommelier Cellar</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span>12 Villa Suites</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-800 shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border border-stone-800 bg-[#16161A] shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-red-400">// MICHELIN GUIDE RECOGNIZED</span>
                  <h3 className="text-2xl font-bold font-serif text-white">The Ember Hearth Salon</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    8-course seasonal wood-fired tasting menu paired with rare biodynamic vintages.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-500">HEARTH SERVICE</span>
                  <span className="font-bold text-red-400">TUESDAY – SUNDAY</span>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono">
            {accolades.map((ac, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#16161A] border border-stone-800 space-y-1">
                <div className="text-sm font-bold text-red-400">{ac.title}</div>
                <div className="text-xs text-stone-400">{ac.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
