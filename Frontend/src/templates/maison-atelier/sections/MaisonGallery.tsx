"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface MaisonGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function MaisonGallery({ items }: MaisonGalleryProps) {
  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'L’Ombre Silk Organza Gown', description: 'Paris Haute Couture Week Spring/Summer' },
    { id: 'g2', title: 'The Marble & Brass Salon', description: 'Private residence, Avenue Montaigne Paris' },
    { id: 'g3', title: 'Lumière Editorial Spread', description: 'Vogue Italia Fall Exhibition' },
  ];

  const galleryList: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-serif italic text-xs uppercase tracking-[0.2em] text-[#C5A059]">
            EDITORIAL LOOKBOOK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">
            Selected Atelier Commissions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryList.map((item, idx) => (
            <div key={item.id || idx} className="group rounded-3xl overflow-hidden border border-stone-200 bg-stone-50 transition-all hover:shadow-lg">
              <div className="h-64 bg-stone-200 overflow-hidden relative">
                <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2 text-center">
                <h3 className="font-serif text-lg font-light text-stone-900">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-500 font-sans">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
