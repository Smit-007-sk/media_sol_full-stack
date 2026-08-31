"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { CheckCircle2, ShieldCheck, Award, TrendingUp, Building2, Globe, Scale } from 'lucide-react';

interface AuroraHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function AuroraHero({ data, design, theme }: AuroraHeroProps) {
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'LUXURY EXECUTIVE ADVISORY & GOVERNANCE';
  const title = data?.title || 'Architecting Sustainable Enterprise Growth & Capital Governance';
  const description =
    data?.description ||
    'Delivering structured corporate governance, cross-border M&A advisory, and strategic capital optimization for Fortune 500 leadership teams and sovereign funds.';
  const primaryText = data?.primaryButtonText || 'Explore Advisory Practices';
  const primaryUrl = data?.primaryButtonUrl || '#services';
  const secondaryText = data?.secondaryButtonText || 'Schedule Executive Consultation';
  const secondaryUrl = data?.secondaryButtonUrl || '#contact';

  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const isFullBleedBg = heroLayout === 'fullBleedBg' || heroLayout === 'fullBleed' || heroLayout === 'full-bleed';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof heroMedia === 'string' ? heroMedia : heroMedia?.url;

  // 1. FULL-BLEED BACKGROUND IMAGE HERO
  if (isFullBleedBg) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center py-24 text-white overflow-hidden" style={{ backgroundColor: '#071813' }}>
        {bgImageUrl ? (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071813] via-[#071813]/80 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-[#071813] via-[#071813]/80 to-transparent z-10" />
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-20 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#C9A45C]">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold font-serif leading-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-stone-200 font-sans leading-relaxed drop-shadow font-medium">
            {description}
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <Button href={primaryUrl} variant="primary" size="lg">
              {primaryText}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const clientLogos = [
    { name: 'Vanguard Capital', role: 'Institutional Partner' },
    { name: 'Aegis Sovereign Fund', role: 'Global Assets' },
    { name: 'Rothschild & Co.', role: 'Strategic Syndicate' },
    { name: 'Meridian Holdings', role: 'Private Equity' },
    { name: 'Apex Governance', role: 'Audit Council' },
  ];

  // 1. CENTERED HERO LAYOUT
  if (heroLayout === 'centered') {
    return (
      <section className="relative py-24 border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FBF8F1)', color: 'var(--theme-text, #1F2937)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <span
            className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border shadow-sm mx-auto"
            style={{
              color: 'var(--theme-primary, #075C45)',
              borderColor: 'var(--theme-secondary, #C9A45C)',
              backgroundColor: 'rgba(7, 92, 69, 0.06)',
            }}
          >
            {eyebrow}
          </span>

          <h1
            className="text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight font-serif"
            style={{ fontFamily: 'var(--theme-heading-font, Cormorant Garamond, serif)', color: 'var(--theme-primary, #075C45)' }}
          >
            {title}
          </h1>

          <p className="text-base sm:text-lg max-w-3xl mx-auto opacity-90 font-sans leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button href={primaryUrl} variant="primary" size="lg">
              {primaryText}
            </Button>
            {secondaryText && (
              <Button href={secondaryUrl} variant="gold-outline" size="lg">
                {secondaryText}
              </Button>
            )}
          </div>

          <div className="pt-8 max-w-4xl mx-auto">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="21/9" className="rounded-3xl border shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border shadow-2xl bg-white space-y-4" style={{ borderColor: 'rgba(201, 164, 92, 0.3)' }}>
                <span className="text-xs uppercase tracking-widest font-bold text-[#C9A45C]">// EXECUTIVE BOARD COUNCIL</span>
                <p className="text-sm text-stone-600">Cross-border capital stewardship for multinational corporate entities.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. FULL-BLEED CINEMATIC HERO LAYOUT
  if (heroLayout === 'fullBleed' || heroLayout === 'full-bleed') {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center py-24 text-white overflow-hidden" style={{ backgroundColor: '#071813' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071813] via-[#071813]/80 to-transparent z-10" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-20 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#C9A45C]">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold font-serif leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-stone-300 font-sans">
            {description}
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <Button href={primaryUrl} variant="primary" size="lg">
              {primaryText}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // 3. EDITORIAL ASYMMETRIC HERO LAYOUT
  if (heroLayout === 'editorial') {
    return (
      <section className="relative py-20 border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FBF8F1)', color: 'var(--theme-text, #1F2937)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex justify-between items-center border-b border-stone-300 pb-4">
            <span className="text-xs font-mono uppercase font-bold text-[#075C45]">{eyebrow}</span>
            <span className="text-xs font-mono text-stone-500">VOL 2026 // ADVISORY MANDATE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-5xl sm:text-7xl font-serif font-bold leading-none text-[#075C45]">
                {title}
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-4 font-sans text-sm text-stone-600">
              <p>{description}</p>
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. DEFAULT SPLIT TWO-COLUMN HERO LAYOUT
  return (
    <section className="relative pt-16 pb-20 overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #FBF8F1)', color: 'var(--theme-text, #1F2937)' }}>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, var(--theme-primary, #075C45) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <span
              className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border shadow-sm whitespace-pre-line break-words [overflow-wrap:anywhere]"
              style={{
                color: 'var(--theme-primary, #075C45)',
                borderColor: 'var(--theme-secondary, #C9A45C)',
                backgroundColor: 'rgba(7, 92, 69, 0.06)',
              }}
            >
              {eyebrow}
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontFamily: 'var(--theme-heading-font, Cormorant Garamond, serif)', color: 'var(--theme-primary, #075C45)' }}
            >
              {title}
            </h1>

            <p
              className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-xl whitespace-pre-line break-words [overflow-wrap:anywhere]"
              style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}
            >
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
              {secondaryText && (
                <Button href={secondaryUrl} variant="gold-outline" size="lg">
                  {secondaryText}
                </Button>
              )}
            </div>

            <div className="pt-8 border-t border-stone-300/60 grid grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--theme-primary, #075C45)' }} />
                <span className="font-semibold">Strategic Counsel</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--theme-primary, #075C45)' }} />
                <span className="font-semibold">Board Governance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--theme-primary, #075C45)' }} />
                <span className="font-semibold">ESG Frameworks</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border shadow-2xl space-y-6 relative overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(201, 164, 92, 0.3)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--theme-secondary, #C9A45C)' }}>
                    Active Governance Index
                  </div>
                  <h3 className="text-2xl font-bold font-serif" style={{ color: 'var(--theme-primary, #075C45)' }}>
                    Institutional Executive Practice
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Systematic operational modeling, board-level advisory, and capital allocation across corporate entities globally.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-stone-300/50">
          <p className="text-xs text-center uppercase tracking-[0.25em] font-semibold text-stone-500 mb-6 font-mono">
            Trusted By Institutional Leadership & Sovereign Funds
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {clientLogos.map((client, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/60 border border-stone-200/80 shadow-xs flex flex-col items-center justify-center">
                <span className="text-sm font-bold font-serif" style={{ color: 'var(--theme-primary, #075C45)' }}>{client.name}</span>
                <span className="text-[10px] text-stone-400 uppercase font-mono">{client.role}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
