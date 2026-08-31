"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';

interface MonoServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function MonoServices({ items }: MonoServicesProps) {
  const defaultServices: ServiceItem[] = [
    { id: 's1', websiteId: '', title: 'Residential Spatial Architecture', description: 'Custom unadorned concrete and glass private villas.', sortOrder: 1, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's2', websiteId: '', title: 'Civic & Cultural Institutions', description: 'Museums, galleries, and public monuments designed for permanence.', sortOrder: 2, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's3', websiteId: '', title: 'Landscape & Topography Integration', description: 'Integrating built structures into natural rock, forest, and coastal terrain.', sortOrder: 3, isActive: true, createdAt: '', updatedAt: '' },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="services" className="py-24 border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FFFFFF)', color: 'var(--theme-text, #171717)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-stone-500">
            STUDIO COMMISSIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900">
            Architectural Practice Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div key={service.id || idx} className="p-8 border border-stone-300 bg-white space-y-4">
              <span className="font-mono text-xs text-stone-400">0{idx + 1}</span>
              <h3 className="text-xl font-serif text-stone-900">{service.title}</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">{service.description || service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
