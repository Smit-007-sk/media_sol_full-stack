"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface EmberGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function EmberGallery({ items }: EmberGalleryProps) {
  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'The Open Hearth Kitchen', description: 'Wood-fired dining room and chef counter' },
    { id: 'g2', title: 'The Highland Villa Suite', description: 'Private fireplace and panoramic valley balcony' },
    { id: 'g3', title: 'Sommelier Wine Vault', description: '1,200 bottle vintage bio-reserve cellar' },
  ];

  const galleryList: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-24 border-b border-stone-800 bg-[#121216] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest font-mono text-red-400">
            ATMOSPHERE GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">
            Hearth & Villa Showcase
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryList.map((item, idx) => (
            <div key={item.id || idx} className="group rounded-3xl overflow-hidden border border-stone-800 bg-[#16161A] transition-all hover:shadow-lg">
              <div className="h-56 bg-stone-900 overflow-hidden relative">
                <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-bold font-serif text-lg text-white">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-400 font-sans">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
