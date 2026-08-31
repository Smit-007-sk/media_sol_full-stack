"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ObsidianHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function ObsidianHero({ data, design, theme }: ObsidianHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'STUDIO OBSIDIAN // CREATIVE MANIFESTO';
  const title = data?.title || 'RAW SCULPTURAL DIGITAL ARCHITECTURE';
  const description =
    data?.description ||
    'We synthesize spatial architecture, high-fashion campaign art direction, and brutalist digital brand identities into uncompromising visual experiences.';
  const primaryText = data?.primaryButtonText || 'EXPLORE DISCIPLINE';
  const primaryUrl = data?.primaryButtonUrl || '#services';

  const tickerItems = [
    'PARIS', 'TOKYO', 'NEW YORK', 'MILAN', 'SPATIAL ARCHITECTURE', 'BRUTALIST BRANDING', 'HAUTE COUTURE', 'HIGH-END CGI'
  ];

  const isFullBleedBg = heroLayout === 'fullBleedBg' || heroLayout === 'fullBleed' || heroLayout === 'full-bleed';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof heroMedia === 'string' ? heroMedia : heroMedia?.url;

  // 1. FULL-BLEED BACKGROUND IMAGE HERO
  if (isFullBleedBg) {
    return (
      <section className="relative min-h-[90vh] py-28 flex flex-col justify-between border-b border-stone-800 font-sans overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #0A0A0A)', color: 'var(--theme-text, #FFFFFF)' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40 pointer-events-none" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 text-center my-auto">
          <div className="font-mono text-xs tracking-[0.3em] uppercase font-bold justify-center flex items-center space-x-2" style={{ color: 'var(--theme-primary, #E5B842)' }}>
            <Sparkles className="w-4 h-4" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black leading-none uppercase font-serif drop-shadow-2xl">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans font-medium drop-shadow">
            {description}
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href={primaryUrl}
              className="inline-flex items-center space-x-3 px-8 py-4 font-mono text-xs uppercase font-bold tracking-widest text-black rounded-lg shadow-2xl transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--theme-primary, #E5B842)' }}
            >
              <span>{primaryText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800/80 overflow-hidden select-none relative z-10">
          <div className="flex items-center space-x-8 font-mono text-xs font-bold uppercase tracking-[0.3em] text-stone-400 whitespace-nowrap animate-pulse">
            {tickerItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-[#E5B842] transition-colors">{item}</span>
                <span className="text-[#E5B842]">//</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. CENTERED BRUTALIST HERO
  if (heroLayout === 'centered') {
    return (
      <section className="relative py-24 border-b border-stone-800 font-sans text-center overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #0A0A0A)', color: 'var(--theme-text, #FFFFFF)' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
          <div className="font-mono text-xs tracking-[0.3em] uppercase font-bold text-[#E5B842] justify-center flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black leading-none uppercase font-serif">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href={primaryUrl}
              className="inline-flex items-center space-x-3 px-8 py-4 font-mono text-xs uppercase font-bold tracking-widest text-black bg-[#E5B842] rounded-lg shadow-xl"
            >
              <span>{primaryText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 2. DEFAULT BRUTALIST SPLIT HERO
  return (
    <section className="relative min-h-[85vh] pt-20 pb-16 border-b border-stone-800 font-sans overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #0A0A0A)', color: 'var(--theme-text, #FFFFFF)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[65vh] items-center gap-12">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="font-mono text-xs tracking-[0.3em] uppercase font-bold flex items-center space-x-2" style={{ color: 'var(--theme-primary, #E5B842)' }}>
              <Sparkles className="w-4 h-4" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight uppercase whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontFamily: 'var(--theme-heading-font, Playfair Display, serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-400 max-w-xl leading-relaxed font-sans whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <a
                href={primaryUrl}
                className="inline-flex items-center space-x-3 px-8 py-4 font-mono text-xs uppercase font-bold tracking-widest text-black rounded-lg transition-all hover:scale-105 shadow-xl"
                style={{ backgroundColor: 'var(--theme-primary, #E5B842)' }}
              >
                <span>{primaryText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                PARIS • TOKYO • NEW YORK
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-800 shadow-2xl" />
            ) : (
              <div className="space-y-4">
                <div className="h-64 rounded-3xl border border-stone-800 p-8 flex flex-col justify-between relative overflow-hidden group" style={{ backgroundColor: '#141416' }}>
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--theme-primary, #E5B842)' }}>SPREAD 01 // SPATIAL MONOLITH</span>
                  <h3 className="font-serif text-3xl font-bold text-white group-hover:text-[#E5B842] transition-colors">
                    The Obsidian Pavilion
                  </h3>
                  <div className="font-mono text-xs text-stone-500">MILAN DESIGN WEEK MANDATE</div>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800/80 overflow-hidden select-none">
          <div className="flex items-center space-x-8 font-mono text-xs font-bold uppercase tracking-[0.3em] text-stone-500 whitespace-nowrap animate-pulse">
            {tickerItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-[#E5B842] transition-colors">{item}</span>
                <span className="text-[#E5B842]">//</span>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
