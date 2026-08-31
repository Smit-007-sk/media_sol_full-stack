"use client";

import React from 'react';
import { About } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Compass, ShieldCheck, Home, Key, ArrowRight } from 'lucide-react';

interface TerraAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function TerraAbout({ data, design, theme }: TerraAboutProps) {
  const aboutMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const aboutLayout = design?.aboutLayout || theme?.aboutLayout || 'text-image';
  const eyebrow = data?.eyebrow || 'OUR ARCHITECTURAL PHILOSOPHY';
  const title = data?.title || 'Harmonizing Luxury Living with Natural Landscape';
  const description =
    data?.description ||
    'Terra Estate curates rare architectural properties that celebrate raw organic materials, passive solar geometry, and seamless indoor-outdoor transition for discerning global buyers.';

  const categories = [
    { title: 'Coastal Villas', count: '12 Estates', desc: 'Oceanfront sanctuaries with private beach access and infinity pools.' },
    { title: 'Penthouses', count: '8 Sky Residences', desc: 'Metropolitan crown jewels with panoramic city skyline views.' },
    { title: 'Mountain Lodges', count: '6 Retreats', desc: 'Alpine havens constructed with timber, granite, and heated terraces.' },
    { title: 'Historic Estates', count: '4 Landmarks', desc: 'Meticulously restored architectural landmarks with private vineyards.' },
  ];

  const acquisitionSteps = [
    { step: '01', title: 'Private Portfolio Advisory', detail: 'Curating off-market property portfolios matched to lifestyle and capital objectives.' },
    { step: '02', title: 'On-Site Private Viewing', detail: 'Helicopter or chauffeur-driven private tours with architectural historians.' },
    { step: '03', title: 'Title & Environmental Audit', detail: 'Rigorous due diligence, structural inspection, and legal compliance check.' },
    { step: '04', title: 'Seamless Acquisition', detail: 'Escrow management, private concierge onboarding, and estate hand-over.' },
  ];

  const isFullBleedBg = aboutLayout === 'fullBleedBg' || aboutLayout === 'fullBleed' || aboutLayout === 'full-bleed-bg';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof aboutMedia === 'string' ? aboutMedia : aboutMedia?.url;

  if (isFullBleedBg) {
    return (
      <section id="about" className="relative py-24 text-stone-900 overflow-hidden" style={{ backgroundColor: '#F5EFE6' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="About background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE6] via-[#F5EFE6]/70 to-[#F5EFE6]/30 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-8">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#B85B35]">
            {eyebrow}
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-serif leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-stone-700 font-sans leading-relaxed font-medium">
            {description}
          </p>
          <div className="pt-8 border-t border-stone-300/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/90 border border-stone-300 shadow-xl backdrop-blur-sm space-y-2 text-left">
                <div className="text-xs font-mono font-bold uppercase text-[#B85B35]">{cat.count}</div>
                <div className="text-lg font-serif font-bold text-stone-900">{cat.title}</div>
                <div className="text-xs text-stone-600">{cat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 border-t border-stone-300/50 bg-white" style={{ color: 'var(--theme-text, #231B18)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story & Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-[#B85B35] inline-block">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight font-serif text-[#231B18]">
              {title}
            </h2>
            <p className="text-base text-stone-600 leading-relaxed font-sans" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-stone-200 space-y-1">
                <Compass className="w-5 h-5 text-[#B85B35]" />
                <h4 className="font-bold text-sm text-[#231B18]">Site Selection</h4>
                <p className="text-xs text-stone-600">Prime micro-climates and protected natural surroundings.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-stone-200 space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#B85B35]" />
                <h4 className="font-bold text-sm text-[#231B18]">Discreet Transactions</h4>
                <p className="text-xs text-stone-600">Off-market privacy protocols for high-net-worth buyers.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {aboutMedia ? (
              <ImagePlaceholder media={aboutMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-300 shadow-xl" />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#F5EFE6] border border-stone-300/70 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#B85B35]">{cat.count}</div>
                    <h4 className="font-bold font-serif text-base text-stone-900">{cat.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">{cat.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Acquisition & Investment Roadmap */}
        <div className="pt-10 border-t border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B85B35]">// THE ACQUISITION JOURNEY</span>
              <h3 className="text-2xl font-bold font-serif text-[#231B18] mt-1">Four Steps to Estate Ownership</h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm mt-2 md:mt-0 font-sans">
              Our private advisory team manages every detail of the estate acquisition cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {acquisitionSteps.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F5EFE6] border border-stone-300/70 space-y-3 relative group hover:border-[#B85B35] transition-colors">
                <div className="text-xs font-mono font-bold text-[#B85B35]">{st.step} // STAGE</div>
                <h4 className="text-sm font-bold font-serif text-stone-900">{st.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{st.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
