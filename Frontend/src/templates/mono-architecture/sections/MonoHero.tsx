"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface MonoHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function MonoHero({ data, design, theme }: MonoHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'SPATIAL & ARCHITECTURAL PRACTICE // EST. 2014';
  const title = data?.title || 'Monochromatic Precision & Built Spatial Environments';
  const description =
    data?.description ||
    'Designing minimalist reinforced concrete structures, cantilevered residences, and public spatial monuments defined by light, shadow, and void.';
  const primaryText = data?.primaryButtonText || 'View Built Archives';
  const primaryUrl = data?.primaryButtonUrl || '#gallery';

  const archMetrics = [
    { value: '14', label: 'Global Design Awards' },
    { value: '65', label: 'Built Spatial Mandates' },
    { value: '100%', label: 'On-Budget Execution' },
  ];

  if (heroLayout === 'centered') {
    return (
      <section className="relative py-28 border-b border-stone-200 text-center" style={{ backgroundColor: 'var(--theme-background, #FFFFFF)', color: 'var(--theme-text, #171717)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-stone-500">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-7xl font-normal leading-[0.95] tracking-tight font-serif text-stone-900">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-xl mx-auto">
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
    <section className="relative py-28 border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FFFFFF)', color: 'var(--theme-text, #171717)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-stone-500">
              {eyebrow}
            </span>

            <h1
              className="text-5xl sm:text-7xl font-normal leading-[0.95] tracking-tight font-serif text-stone-900"
              style={{ fontFamily: 'var(--theme-heading-font, Playfair Display, serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-xl" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="pt-4">
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
            </div>

            <div className="pt-12 border-t border-stone-200 grid grid-cols-3 gap-4 text-xs font-mono text-stone-400 uppercase">
              <div>01 / CANTILEVER</div>
              <div>02 / RAW CONCRETE</div>
              <div>03 / LIGHT VOID</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-none border border-stone-900 shadow-2xl" />
            ) : (
              <div className="p-8 rounded-none border border-stone-900 bg-stone-950 text-white space-y-6">
                <span className="font-mono text-xs text-stone-400">// STRUCTURE N° 404</span>
                <h3 className="text-2xl font-serif font-light">The Mono Baltic Pavilion</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-mono">
                  Minimalist reinforced raw concrete residence overlooking the Baltic sea.
                </p>
                <div className="pt-4 border-t border-stone-800 font-mono text-xs flex justify-between text-stone-400">
                  <span>LOCATION</span>
                  <span className="text-white">COPENHAGEN, DENMARK</span>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono">
            {archMetrics.map((am, idx) => (
              <div key={idx} className="p-6 border border-stone-200 bg-stone-50 space-y-1">
                <div className="text-3xl font-serif text-stone-900">{am.value}</div>
                <div className="text-xs font-bold text-stone-500 uppercase">{am.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
