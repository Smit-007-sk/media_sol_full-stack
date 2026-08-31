"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { Button } from '@/components/common/Button';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { MapPin, Bed, Bath, Maximize2, Sparkles } from 'lucide-react';

interface TerraHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function TerraHero({ data, design, theme }: TerraHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'PRIVATE ESTATE COLLECTION & ARCHITECTURAL HOMES';
  const title = data?.title || 'Architectural Masterpieces in Prime Global Destinations';
  const description =
    data?.description ||
    'Curated sanctuary residences engineered with organic terracotta, rammed earth, floor-to-ceiling glass, and breathtaking natural vistas.';
  const primaryText = data?.primaryButtonText || 'View Estate Catalog';
  const primaryUrl = data?.primaryButtonUrl || '#services';

  const propertyStats = [
    { label: 'Active Portfolio Value', value: '$1.8B+' },
    { label: 'Prime Occupancy Rate', value: '99.2%' },
    { label: 'Global Destinations', value: '14 Locations' },
  ];

  const isFullBleedBg = heroLayout === 'fullBleedBg' || heroLayout === 'fullBleed' || heroLayout === 'full-bleed';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof heroMedia === 'string' ? heroMedia : heroMedia?.url;

  if (isFullBleedBg) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center py-24 text-stone-900 overflow-hidden" style={{ backgroundColor: '#F5EFE6' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE6] via-[#F5EFE6]/70 to-[#F5EFE6]/30 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#B85B35]">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold font-serif leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-stone-700 font-sans leading-relaxed font-medium">
            {description}
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <a
              href={primaryUrl}
              className="px-8 py-3.5 bg-[#B85B35] text-white rounded-full font-serif text-sm font-semibold shadow-xl hover:bg-[#a04e2c] transition-all"
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
      <section className="relative py-24 text-center overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #F5EFE6)', color: 'var(--theme-text, #231B18)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-[#B85B35]/30 bg-[#B85B35]/10 text-[#B85B35] mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-[#231B18]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto font-sans leading-relaxed">
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
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: 'var(--theme-background, #F5EFE6)', color: 'var(--theme-text, #231B18)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-[#B85B35]/30 bg-[#B85B35]/10 text-[#B85B35]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl font-bold leading-tight font-serif text-[#231B18] whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontFamily: 'var(--theme-heading-font, Playfair Display, serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href={primaryUrl} variant="primary" size="lg">
                {primaryText}
              </Button>
            </div>

            <div className="pt-6 border-t border-stone-300/70 grid grid-cols-3 gap-4 text-xs font-sans">
              <div className="flex items-center space-x-2">
                <Bed className="w-4 h-4 text-[#B85B35]" />
                <span className="font-semibold">5-7 En-Suite Beds</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="w-4 h-4 text-[#B85B35]" />
                <span className="font-semibold">8 Spa Bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Maximize2 className="w-4 h-4 text-[#B85B35]" />
                <span className="font-semibold">12,500+ Sq Ft</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-stone-300 shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border border-stone-300/80 bg-white/90 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B85B35] font-bold">// FEATURED RESIDENCE</span>
                  <h3 className="text-2xl font-bold font-serif text-stone-900">Villa Terracotta Sanctuary</h3>
                  <div className="flex items-center space-x-2 text-xs text-stone-500 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#B85B35]" />
                    <span>Malibu Coastline, California</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-500">OFFERED AT</span>
                  <span className="font-bold text-lg text-[#B85B35]">$24,500,000</span>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-stone-300/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {propertyStats.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/80 border border-stone-300/60 shadow-xs space-y-1">
                <div className="text-3xl font-serif font-bold text-[#B85B35]">{st.value}</div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
