"use client";

import React from 'react';
import { About } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { ArrowRight, Layers, ShieldCheck, Cpu, Terminal } from 'lucide-react';

interface ObsidianAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function ObsidianAbout({ data, design, theme }: ObsidianAboutProps) {
  const aboutMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const aboutLayout = design?.aboutLayout || theme?.aboutLayout || 'text-image';

  const eyebrow = data?.eyebrow || 'PHILOSOPHY & MANIFESTO';
  const title = data?.title || 'Radical Simplicity Meets Sculptural Rigor';
  const description =
    data?.description ||
    'We reject generic templates. Every commission is sculpted as a unique digital monument built on brutalist typography, spatial choreography, and relentless technical precision.';

  const stats = [
    { number: '120+', label: 'GLOBAL DESIGN AWARDS', detail: 'Red Dot, Awwwards, FWA' },
    { number: '15 YRS', label: 'PURSUING PERFECTION', detail: 'Established in Paris 2011' },
    { number: '4 HUBS', label: 'GLOBAL STUDIO NETWORK', detail: 'Paris, Tokyo, NY, Milan' },
    { number: '100%', label: 'CUSTOM CODED ENGINE', detail: 'Zero bloat architecture' },
  ];

  const executionPhases = [
    { phase: 'PHASE 01', name: 'Raw Conceptual Framework', desc: 'Distilling brand essence into stark typographic hierarchies and spatial layouts.' },
    { phase: 'PHASE 02', name: 'Interactive Motion Prototyping', desc: 'Crafting fluid web transitions and 60fps micro-animations.' },
    { phase: 'PHASE 03', name: 'Architectural Sculpting', desc: 'Building custom React components with zero third-party UI dependencies.' },
    { phase: 'PHASE 04', name: 'Global Network Deployment', desc: 'Deploying edge-cached assets with instantaneous client load speeds.' },
  ];

  const isImageLeft = aboutLayout === 'image-text' || aboutLayout === 'imageLeft';
  const isCentered = aboutLayout === 'centered' || aboutLayout === 'full-width';
  const isFullBleedBg = aboutLayout === 'fullBleedBg' || aboutLayout === 'fullBleed' || aboutLayout === 'full-bleed-bg';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof aboutMedia === 'string' ? aboutMedia : aboutMedia?.url;

  // 1. FULL-BLEED BACKGROUND IMAGE ABOUT SECTION
  if (isFullBleedBg) {
    return (
      <section id="about" className="relative py-28 border-b border-stone-800 font-sans overflow-hidden" style={{ backgroundColor: '#0F0F12', color: '#FFFFFF' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="About background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/80 to-[#0F0F12]/40 pointer-events-none" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="font-mono text-xs uppercase font-bold tracking-[0.3em] whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ color: 'var(--theme-primary, #E5B842)' }}>
              {eyebrow}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase font-serif text-white drop-shadow-2xl whitespace-pre-line break-words [overflow-wrap:anywhere]">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed drop-shadow font-medium whitespace-pre-line break-words [overflow-wrap:anywhere]">
              {description}
            </p>
            <div className="pt-4 flex justify-center space-x-4 font-mono text-xs text-stone-300">
              <span className="px-4 py-1.5 rounded-full bg-stone-900/80 border border-stone-700 shadow-lg">// BRUTALIST</span>
              <span className="px-4 py-1.5 rounded-full bg-stone-900/80 border border-stone-700 shadow-lg">// HIGH-FASHION</span>
              <span className="px-4 py-1.5 rounded-full bg-stone-900/80 border border-stone-700 shadow-lg">// EXPERIMENTAL</span>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((st, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#141416]/90 border border-stone-800 space-y-2 font-mono shadow-xl backdrop-blur-sm">
                  <div className="text-4xl font-black text-white" style={{ color: 'var(--theme-primary, #E5B842)' }}>{st.number}</div>
                  <div className="text-xs font-bold uppercase text-stone-300">{st.label}</div>
                  <div className="text-[10px] text-stone-500">{st.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 border-b border-stone-800 font-sans" style={{ backgroundColor: '#0F0F12', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Top Story & Disciplines */}
        {isCentered ? (
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="font-mono text-xs uppercase font-bold tracking-[0.3em] text-[#E5B842] whitespace-pre-line break-words [overflow-wrap:anywhere]">{eyebrow}</span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-serif text-white whitespace-pre-line break-words [overflow-wrap:anywhere]">{title}</h2>
            <p className="text-base text-stone-400 font-sans leading-relaxed whitespace-pre-line break-words [overflow-wrap:anywhere]">{description}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={`lg:col-span-6 space-y-6 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
              <span className="font-mono text-xs uppercase font-bold tracking-[0.3em] whitespace-pre-line break-words [overflow-wrap:anywhere] inline-block" style={{ color: 'var(--theme-primary, #E5B842)' }}>
                {eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase font-serif whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full">
                {title}
              </h2>
              <p className="text-base text-stone-400 leading-relaxed font-sans whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
                {description}
              </p>

              <div className="pt-4 flex items-center space-x-4 font-mono text-xs text-stone-400">
                <span className="px-3 py-1 rounded bg-stone-900 border border-stone-800">// BRUTALIST</span>
                <span className="px-3 py-1 rounded bg-stone-900 border border-stone-800">// HIGH-FASHION</span>
                <span className="px-3 py-1 rounded bg-stone-900 border border-stone-800">// EXPERIMENTAL</span>
              </div>
            </div>

            <div className={`lg:col-span-6 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
              {aboutMedia ? (
                <ImagePlaceholder media={aboutMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-800 shadow-2xl" />
              ) : (
                <div className="space-y-4">
                  <div className="p-8 rounded-3xl border border-stone-800 bg-[#141416] space-y-2 group hover:border-[#E5B842] transition-colors">
                    <div className="font-mono text-xs text-stone-500 uppercase">// DISCIPLINE 01</div>
                    <h4 className="text-xl font-bold font-serif text-white group-hover:text-[#E5B842] transition-colors">Spatial Digital Art Direction</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">Designing web environments that behave like sculptural gallery installations.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Studio Telemetry Metrics */}
        <div className="pt-12 border-t border-stone-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#141416] border border-stone-800 space-y-2 font-mono">
                <div className="text-4xl font-black text-white" style={{ color: 'var(--theme-primary, #E5B842)' }}>{st.number}</div>
                <div className="text-xs font-bold uppercase text-stone-300">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
