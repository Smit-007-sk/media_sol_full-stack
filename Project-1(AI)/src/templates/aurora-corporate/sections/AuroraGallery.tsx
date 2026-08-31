"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface AuroraGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function AuroraGallery({ items, design, theme }: AuroraGalleryProps) {
  const galleryLayout = design?.galleryLayout || design?.galleryStyle || theme?.galleryLayout || theme?.galleryStyle || 'grid';

  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'Global Corporate Summit 2026', description: 'Executive roundtable on ESG governance' },
    { id: 'g2', title: 'Capital Advisory Mandate', description: 'Structuring cross-border infrastructure financing' },
    { id: 'g3', title: 'Digital Operations Transformation', description: 'Enterprise AI deployment and compliance audit' },
  ];

  const galleryList: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-20 bg-white border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest inline-block font-mono text-[#C9A45C]">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#075C45]">
            Featured Executive Mandates
          </h2>
        </div>

        {/* 1. MASONRY LAYOUT */}
        {galleryLayout === 'masonry' ? (
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {galleryList.map((item, idx) => (
              <div key={item.id || idx} className="break-inside-avoid rounded-3xl overflow-hidden border bg-stone-50 p-4 space-y-3 shadow-xs hover:shadow-lg transition-all" style={{ borderColor: 'rgba(201, 164, 92, 0.25)' }}>
                <ImagePlaceholder media={item.media as any} aspectRatio={idx % 2 === 0 ? '4/3' : '3/4'} className="rounded-2xl overflow-hidden" />
                <h3 className="font-bold font-serif text-lg text-stone-900">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-600 font-sans">{item.description}</p>}
              </div>
            ))}
          </div>
        ) : galleryLayout === 'feature' || galleryLayout === 'asymmetric' || galleryLayout === 'editorial' ? (
          /* 2. FEATURED HERO IMAGE LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4">
              <ImagePlaceholder media={galleryList[0]?.media as any} aspectRatio="16/9" className="rounded-2xl overflow-hidden" />
              <h3 className="text-2xl font-serif font-bold text-[#075C45]">{galleryList[0]?.title}</h3>
              {galleryList[0]?.description && <p className="text-xs text-stone-600">{galleryList[0]?.description}</p>}
            </div>

            <div className="lg:col-span-4 space-y-6">
              {galleryList.slice(1).map((item, idx) => (
                <div key={item.id || idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="rounded-xl overflow-hidden" />
                  <h4 className="font-bold font-serif text-sm text-stone-900">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        ) : galleryLayout === 'horizontal' || galleryLayout === 'showcase' || galleryLayout === 'horizontal-scroll' ? (
          /* 3. HORIZONTAL SHOWCASE SLIDER */
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none">
            {galleryList.map((item, idx) => (
              <div key={item.id || idx} className="min-w-[320px] max-w-[380px] p-4 rounded-3xl bg-stone-50 border border-stone-200 flex-shrink-0 space-y-3">
                <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="rounded-2xl overflow-hidden" />
                <h3 className="font-bold font-serif text-lg text-stone-900">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-600">{item.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          /* 4. DEFAULT EQUAL GRID */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryList.map((item, idx) => (
              <div key={item.id || idx} className="group rounded-3xl overflow-hidden border bg-stone-50 transition-all hover:shadow-lg" style={{ borderColor: 'rgba(201, 164, 92, 0.25)' }}>
                <div className="h-48 bg-stone-200 overflow-hidden relative">
                  <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold font-serif text-lg text-stone-900">{item.title}</h3>
                  {item.description && <p className="text-xs text-stone-600 font-sans">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
