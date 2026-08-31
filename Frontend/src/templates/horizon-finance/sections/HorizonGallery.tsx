"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface HorizonGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function HorizonGallery({ items }: HorizonGalleryProps) {
  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'Cross-Border Capital Syndication', description: 'Infrastructure financing deal closed in Zurich' },
    { id: 'g2', title: 'Tech Private Equity Mandate', description: 'Silicon Valley growth capital allocation' },
    { id: 'g3', title: 'Institutional Real Estate Trust', description: 'Commercial asset portfolio restructuring' },
  ];

  const galleryList: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#1D4ED8]">
            DEAL FLOW ARCHIVES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-900">
            Featured Investment Mandates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryList.map((item, idx) => (
            <div key={item.id || idx} className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 transition-all hover:shadow-lg">
              <div className="h-48 bg-slate-200 overflow-hidden relative">
                <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-bold font-sans text-lg text-slate-900">{item.title}</h3>
                {item.description && <p className="text-xs text-slate-500 font-sans">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
