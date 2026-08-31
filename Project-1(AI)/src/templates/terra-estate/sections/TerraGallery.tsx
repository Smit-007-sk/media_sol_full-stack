"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface TerraGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function TerraGallery({ items }: TerraGalleryProps) {
  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'The Solstice Pavilion', description: 'Malibu coastal architectural masterpiece' },
    { id: 'g2', title: 'Aspen Ridge Sanctuary', description: 'Modern timber & stone alpine retreat' },
    { id: 'g3', title: 'Kyoto Zen Estate', description: 'Historic Japanese garden residence' },
  ];

  const galleryList: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-20 bg-white border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B85B35]">
            ESTATE CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Featured Architectural Residences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryList.map((item, idx) => (
            <div key={item.id || idx} className="group rounded-3xl overflow-hidden border border-stone-200 bg-stone-50 transition-all hover:shadow-lg">
              <div className="h-56 bg-stone-200 overflow-hidden relative">
                <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-bold font-serif text-lg text-stone-900">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-600 font-sans">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
