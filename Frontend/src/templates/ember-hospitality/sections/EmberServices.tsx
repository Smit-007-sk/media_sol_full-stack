"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { UtensilsCrossed, ChevronRight } from 'lucide-react';

interface EmberServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function EmberServices({ items }: EmberServicesProps) {
  const defaultServices: ServiceItem[] = [
    { id: 's1', websiteId: '', title: 'The Hearth Chef Tasting Menu', description: '8-course culinary voyage over white oak fire with sommelier wine pairing.', sortOrder: 1, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's2', websiteId: '', title: 'Private Highland Suite Stays', description: 'Luxury villa suites with private wood-burning fireplaces and mountain views.', sortOrder: 2, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's3', websiteId: '', title: 'Private Event & Dining Buyouts', description: 'Exclusive restaurant buyout for private celebrations and corporate summits.', sortOrder: 3, isActive: true, createdAt: '', updatedAt: '' },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="services" className="py-24 border-b border-stone-800" style={{ backgroundColor: 'var(--theme-background, #0F0F12)', color: 'var(--theme-text, #F5F5F4)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest font-mono text-red-400">
            DINING & STAY EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Curated Hospitality Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div key={service.id || idx} className="p-8 rounded-3xl border border-stone-800 bg-[#16161A] shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-900/40 flex items-center justify-center text-red-400">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">{service.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">{service.description || service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
