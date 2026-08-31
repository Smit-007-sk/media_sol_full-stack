"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Landmark, TrendingUp, ShieldCheck, Lock } from 'lucide-react';

interface HorizonHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function HorizonHero({ data, design, theme }: HorizonHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'WEALTH MANAGEMENT & INSTITUTIONAL ADVISORY';
  const title = data?.title || 'Institutional Capital Preservation & Multi-Family Office Governance';
  const description =
    data?.description ||
    'Navigating global wealth preservation, cross-border corporate structure, and high-yield capital allocation for family offices and institutional endowments.';
  const primaryText = data?.primaryButtonText || 'Explore Advisory Practices';
  const primaryUrl = data?.primaryButtonUrl || '#services';

  const finStats = [
    { label: 'ASSETS UNDER ADVISORY', value: '$12.5B+' },
    { label: 'INSTITUTIONAL EXPERIENCE', value: '35+ YRS' },
    { label: 'GLOBAL FINANCIAL HUBS', value: 'NYC • ZURICH • SG' },
  ];

  if (heroLayout === 'centered') {
    return (
      <section className="relative py-20 border-b border-stone-200 text-center" style={{ backgroundColor: 'var(--theme-background, #F8FAFC)', color: 'var(--theme-text, #0F172A)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-md bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/20 mx-auto">
            <Landmark className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight font-sans tracking-tight text-[#0F172A]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
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
    <section className="relative py-20 border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #F8FAFC)', color: 'var(--theme-text, #0F172A)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-md bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/20">
              <Landmark className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl font-bold leading-tight font-sans tracking-tight text-[#0F172A]"
              style={{ fontFamily: 'var(--theme-heading-font, Inter, sans-serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
            </div>

            <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs font-sans">
              <div className="flex items-center space-x-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
                <span className="font-semibold">Risk Hedging</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <TrendingUp className="w-4 h-4 text-[#1D4ED8]" />
                <span className="font-semibold">Alpha Yield</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <Lock className="w-4 h-4 text-[#1D4ED8]" />
                <span className="font-semibold">Tier-1 Custody</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-2xl border border-slate-200 shadow-xl" />
            ) : (
              <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xl space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#1D4ED8]">// GLOBAL CAPITAL MANDATE</span>
                  <h3 className="text-2xl font-bold text-slate-900 font-sans">Family Office Advisory</h3>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <div className="text-slate-400">AUM COUNSEL</div>
                    <div className="font-bold text-slate-900 text-base">$12.5 Billion</div>
                  </div>
                  <div>
                    <div className="text-slate-400">JURISDICTIONS</div>
                    <div className="font-bold text-slate-900 text-base">ZURICH • NYC</div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {finStats.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 font-mono">
                <div className="text-3xl font-bold text-[#1D4ED8]">{st.value}</div>
                <div className="text-xs font-bold text-slate-700">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
