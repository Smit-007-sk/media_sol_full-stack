"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MaisonServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function MaisonServices({ items }: MaisonServicesProps) {
  const defaultServices: ServiceItem[] = [
    { id: 's1', websiteId: '', title: 'Custom Bridal & Evening Couture', description: 'Bespoke hand-embroidered gowns draped individually for each patron.', sortOrder: 1, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's2', websiteId: '', title: 'Private Residence Interior Architecture', description: 'Comprehensive spatial modeling, custom marble millwork, and lighting.', sortOrder: 2, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's3', websiteId: '', title: 'Editorial Art Direction & Styling', description: 'High-fashion campaign curation, set design, and publication spreads.', sortOrder: 3, isActive: true, createdAt: '', updatedAt: '' },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="services" className="py-24" style={{ backgroundColor: 'var(--theme-background, #FAFAFA)', color: 'var(--theme-text, #111111)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-serif italic text-xs uppercase tracking-[0.2em] text-[#C5A059]">
            ATELIER DISCIPLINES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">
            Bespoke Atelier Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div key={service.id || idx} className="p-8 rounded-3xl border border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all space-y-4 text-center">
              <span className="font-serif italic text-xs text-[#C5A059]">0{idx + 1}</span>
              <h3 className="text-xl font-serif font-light text-stone-900">{service.title}</h3>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">{service.description || service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
