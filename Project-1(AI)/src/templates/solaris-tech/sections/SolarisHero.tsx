"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Sun, Zap, Shield, BatteryCharging, ArrowRight } from 'lucide-react';

interface SolarisHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function SolarisHero({ data, design, theme }: SolarisHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'QUANTUM CLEAN-TECH & SOLAR GRID ENGINE';
  const title = data?.title || 'Next-Generation Solar Array Telemetry & High-Yield Storage';
  const description =
    data?.description ||
    'Powering industrial energy microgrids with autonomous solar tracking, solid-state battery storage, and real-time AI grid load balancing.';
  const primaryText = data?.primaryButtonText || 'Initiate Energy Audit';
  const primaryUrl = data?.primaryButtonUrl || '#contact';

  if (heroLayout === 'centered') {
    return (
      <section className="relative py-24 border-b border-amber-900/30 text-center font-sans" style={{ backgroundColor: 'var(--theme-background, #060913)', color: 'var(--theme-text, #F3F4F6)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 mx-auto">
            <Sun className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-white">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto font-sans leading-relaxed">
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
    <section className="relative py-24 overflow-hidden border-b border-amber-900/30 font-sans" style={{ backgroundColor: 'var(--theme-background, #060913)', color: 'var(--theme-text, #F3F4F6)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{eyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-white font-sans">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-sans">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
            </div>

            <div className="pt-8 border-t border-amber-900/30 grid grid-cols-3 gap-4 text-xs font-mono text-stone-400">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>99.8% Grid Yield</span>
              </div>
              <div className="flex items-center space-x-2">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                <span>Solid-State Tech</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>IEEE Certified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-amber-900/40 shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border border-amber-900/40 bg-[#0C1222]/80 backdrop-blur-md shadow-2xl space-y-6 font-mono">
                <div className="flex justify-between items-center text-xs text-amber-400 font-bold">
                  <span>// SOLARIS GRID MATRIX</span>
                  <span>v1.0 ENGINE</span>
                </div>
                <h3 className="text-2xl font-bold text-white uppercase">Quantum Photovoltaic Cell</h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Dual-junction perovskite silicon cells operating at 32.4% efficiency rating.
                </p>
                <div className="pt-4 border-t border-amber-900/30 flex justify-between text-xs text-stone-400">
                  <span>CAPACITY</span>
                  <span className="text-emerald-400 font-bold">1.2 GIGAWATTS</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
