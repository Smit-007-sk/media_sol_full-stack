"use client";

import React from 'react';
import { GalleryItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface ObsidianGalleryProps {
  items?: GalleryItem[];
  design?: any;
  theme?: any;
}

export function ObsidianGallery({ items, design, theme }: ObsidianGalleryProps) {
  const galleryLayout = design?.galleryLayout || design?.galleryStyle || theme?.galleryLayout || theme?.galleryStyle || 'grid';

  const defaultItems: Partial<GalleryItem>[] = [
    { id: 'g1', title: 'The Obsidian Monolith', description: 'Architectural exhibition pavilion design' },
    { id: 'g2', title: 'Vanguard Cybernetics Identity', description: 'Generative brand language & digital launch' },
    { id: 'g3', title: 'Solstice Luxury Editorial', description: 'Spatial magazine spread & typography direction' },
  ];

  const list: Partial<GalleryItem>[] = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="gallery" className="py-24 border-b border-stone-800" style={{ backgroundColor: '#0F0F12', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase font-bold tracking-[0.2em]" style={{ color: 'var(--theme-primary, #E5B842)' }}>
            EXHIBITION SPREADS
          </span>
          <h2 className="text-4xl font-bold font-serif">Selected Archives</h2>
        </div>

        {galleryLayout === 'masonry' ? (
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {list.map((item, idx) => (
              <div key={item.id || idx} className="break-inside-avoid rounded-3xl border border-stone-800 bg-[#141416] p-4 space-y-3">
                <ImagePlaceholder media={item.media as any} aspectRatio={idx % 2 === 0 ? '4/3' : '3/4'} className="rounded-2xl overflow-hidden" />
                <h3 className="font-bold font-serif text-xl text-white">{item.title}</h3>
                {item.description && <p className="text-xs text-stone-400 font-sans">{item.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {list.map((item, idx) => (
              <div key={item.id || idx} className="group rounded-3xl border border-stone-800 bg-[#141416] overflow-hidden">
                <div className="h-60 bg-stone-900 relative overflow-hidden">
                  <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold font-serif text-xl text-white group-hover:text-[#E5B842] transition-colors">{item.title}</h3>
                  {item.description && <p className="text-xs text-stone-400 font-sans">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
