"use client";

import React from 'react';
import { About } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Building2, Globe2, ShieldCheck, FileCheck2, Compass, ArrowRight } from 'lucide-react';

interface AuroraAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function AuroraAbout({ data, design, theme }: AuroraAboutProps) {
  const aboutLayout = design?.aboutLayout || theme?.aboutLayout || 'text-image';
  const aboutMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;

  const eyebrow = data?.eyebrow || 'OUR HERITAGE & EXECUTIVE MISSION';
  const title = data?.title || 'Fostering Enterprise Resilience Across Global Corporate Markets';
  const description =
    data?.description ||
    'Established to serve multinational leadership teams, board of directors, and institutional investors with impartial advisory, risk-mitigating governance frameworks, and long-term sustainable growth strategy execution.';

  const stats = [
    { label: 'Advised Transaction Capital', value: '$4.2B+', note: 'Across 180+ global transactions' },
    { label: 'Board Governance Rating', value: '98.4%', note: 'Audit & risk compliance score' },
    { label: 'International Jurisdictions', value: '45+', note: 'Active advisory footprint' },
    { label: 'Retention Rate', value: '99.1%', note: 'Long-term client partnerships' },
  ];

  const isImageLeft = aboutLayout === 'image-text' || aboutLayout === 'imageLeft';
  const isCentered = aboutLayout === 'centered' || aboutLayout === 'full-width';
  const isFullBleedBg = aboutLayout === 'fullBleedBg' || aboutLayout === 'fullBleed' || aboutLayout === 'full-bleed-bg';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof aboutMedia === 'string' ? aboutMedia : aboutMedia?.url;

  if (isFullBleedBg) {
    return (
      <section id="about" className="relative py-24 text-white overflow-hidden" style={{ backgroundColor: '#071813' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="About background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071813] via-[#071813]/80 to-[#071813]/40 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-8">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#C9A45C]">
            {eyebrow}
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-serif leading-tight drop-shadow-2xl">
            {title}
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-stone-200 font-sans leading-relaxed drop-shadow font-medium">
            {description}
          </p>
          <div className="pt-8 border-t border-stone-700/60 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0F2922]/90 border border-stone-700 shadow-xl backdrop-blur-sm space-y-1">
                <div className="text-3xl font-serif font-bold text-[#C9A45C]">{st.value}</div>
                <div className="text-xs font-bold uppercase text-stone-200">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 border-t border-stone-200/50" style={{ backgroundColor: '#FFFFFF', color: 'var(--theme-text, #1F2937)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Story Split / Centered */}
        {isCentered ? (
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.2em] inline-block font-mono text-[#C9A45C]">
              {eyebrow}
            </span>
            <h2 className="text-4xl font-bold font-serif text-[#075C45]">{title}</h2>
            <p className="text-base text-stone-600 font-sans leading-relaxed">{description}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={`lg:col-span-6 space-y-6 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
              <span className="text-xs uppercase font-bold tracking-[0.2em] inline-block font-mono" style={{ color: 'var(--theme-secondary, #C9A45C)' }}>
                {eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--theme-heading-font, Cormorant Garamond, serif)', color: 'var(--theme-primary, #075C45)' }}>
                {title}
              </h2>
              <p className="text-base text-stone-600 leading-relaxed font-sans" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
                {description}
              </p>
            </div>

            <div className={`lg:col-span-6 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
              {aboutMedia ? (
                <ImagePlaceholder media={aboutMedia} aspectRatio="4/3" className="rounded-3xl border shadow-xl" />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl border shadow-sm space-y-3" style={{ borderColor: 'rgba(201, 164, 92, 0.3)', backgroundColor: '#FBF8F1' }}>
                    <Building2 className="w-8 h-8" style={{ color: 'var(--theme-primary, #075C45)' }} />
                    <h4 className="font-bold text-sm">Institutional Restructuring</h4>
                    <p className="text-xs text-stone-600">Deep structural clarity for complex corporate holdings and syndicates.</p>
                  </div>
                  <div className="p-6 rounded-3xl border shadow-sm space-y-3" style={{ borderColor: 'rgba(201, 164, 92, 0.3)', backgroundColor: '#FBF8F1' }}>
                    <Compass className="w-8 h-8" style={{ color: 'var(--theme-primary, #075C45)' }} />
                    <h4 className="font-bold text-sm">Capital Allocation</h4>
                    <p className="text-xs text-stone-600">Strategic deployment to maximize risk-adjusted equity returns.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Executive Statistics Grid */}
        <div className="pt-10 border-t border-stone-200/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FBF8F1] border border-[#C9A45C]/30 text-center space-y-2 shadow-xs">
                <div className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: 'var(--theme-primary, #075C45)' }}>{item.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-800 font-sans">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
