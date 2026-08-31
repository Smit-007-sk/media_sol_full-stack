"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FramefolioHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function FramefolioHero({ data, design, theme }: FramefolioHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'CREATIVE DESIGN STUDIO & BRAND ARCHITECTURE';
  const title = data?.title || 'Sculpting Bold Digital Artifacts & Iconic Visual Identities';
  const description =
    data?.description ||
    'We are a brutalist design studio crafting award-winning brand identities, physical exhibition graphics, and high-frequency digital platforms for visionary clients worldwide.';
  const primaryText = data?.primaryButtonText || 'View Selected Work';
  const primaryUrl = data?.primaryButtonUrl || '#projects';

  const studioStats = [
    { value: '85+', label: 'Design Awards' },
    { value: '140+', label: 'Projects Delivered' },
    { value: '12 Yrs', label: 'Studio Heritage' },
  ];

  const isFullBleedBg = heroLayout === 'fullBleedBg' || heroLayout === 'fullBleed' || heroLayout === 'full-bleed';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof heroMedia === 'string' ? heroMedia : heroMedia?.url;

  if (isFullBleedBg) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center py-24 text-white overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/40 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-pink-400">
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
              className="px-8 py-3.5 bg-pink-600 text-white rounded-full font-mono text-sm font-semibold shadow-2xl hover:bg-pink-500 transition-all"
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
      <section className="relative py-20 border-b border-stone-800 text-center font-sans" style={{ backgroundColor: 'var(--theme-background, #0D0D0D)', color: 'var(--theme-text, #E5E5E5)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 text-pink-400 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black uppercase text-white font-sans">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-400 max-w-xl mx-auto font-sans leading-relaxed">
            {description}
          </p>

          <div className="flex justify-center pt-2">
            <a
              href={primaryUrl}
              className="px-8 py-4 rounded-xl text-xs font-mono uppercase font-bold tracking-widest text-white bg-pink-500 hover:bg-pink-400 flex items-center space-x-2 shadow-xl"
            >
              <span>{primaryText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-20 pb-16 border-b border-stone-800 font-sans overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #0D0D0D)', color: 'var(--theme-text, #E5E5E5)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 text-pink-400">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-7xl font-black leading-[0.95] tracking-tight uppercase text-white font-sans whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontFamily: 'var(--theme-heading-font, Inter, sans-serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-400 max-w-xl leading-relaxed font-sans whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={primaryUrl}
                className="px-8 py-4 rounded-xl text-xs font-mono uppercase font-bold tracking-widest text-black bg-pink-500 hover:bg-pink-400 shadow-xl transition-all flex items-center space-x-2"
                style={{ backgroundColor: 'var(--theme-primary, #FF3366)', color: '#FFFFFF' }}
              >
                <span>{primaryText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-800 shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border border-stone-800 bg-[#161618] space-y-6 shadow-2xl font-mono">
                <div className="flex justify-between items-center text-xs text-pink-500 font-bold">
                  <span>// FEATURED PORTFOLIO ENTRY</span>
                  <span>ISSUE 2026</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-white uppercase">Verve Kinetic Manifesto</h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  High-frequency motion graphics, brutalist typography, and interactive WebGL canvas.
                </p>
                <div className="pt-4 border-t border-stone-800 flex justify-between text-xs text-stone-400">
                  <span>CLIENT: VERVE LABS</span>
                  <span className="text-pink-400 font-bold">AWWWARDS SOTD</span>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono">
            {studioStats.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#161618] border border-stone-800 space-y-1">
                <div className="text-3xl font-black text-pink-500">{st.value}</div>
                <div className="text-xs font-bold text-stone-300 uppercase">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
