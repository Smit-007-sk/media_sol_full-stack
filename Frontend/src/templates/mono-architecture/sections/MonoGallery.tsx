"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface MonoGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function MonoGallery({ items }: MonoGalleryProps) {
  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'The Monolith Residence', description: 'Copenhagen coastal cliff structure' },
    { id: 'g2', title: 'Berlin Concrete Pavilion', description: 'Museum of modern spatial art' },
    { id: 'g3', title: 'Kyoto Timber Void', description: 'Minimalist forest sanctuary' },
  ];

  const galleryList: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-stone-500">
            BUILT ARCHIVES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900">
            Selected Structural Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryList.map((item, idx) => (
            <div key={item.id || idx} className="group border border-stone-300 bg-white">
              <div className="h-64 bg-stone-200 overflow-hidden relative">
                <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg text-stone-900">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-500 font-mono">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
