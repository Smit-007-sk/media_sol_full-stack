"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { ArrowUpRight } from 'lucide-react';

interface ObsidianServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function ObsidianServices({ items, design, theme }: ObsidianServicesProps) {
  const servicesStyle = design?.servicesStyle || theme?.servicesStyle || 'cards';

  const defaultServices: ServiceItem[] = [
    {
      id: 's1',
      websiteId: '',
      title: 'Architectural Brand Identity Systems',
      description: 'Comprehensive visual direction, bespoke typographic design, physical collateral, and brutalist brand guidelines.',
      shortDescription: 'Visual direction and custom brutalist typography.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's2',
      websiteId: '',
      title: 'Spatial WebGL & 3D Web Installations',
      description: 'Immersive WebGL environments, real-time 3D shaders, and high-performance digital flagship applications.',
      shortDescription: 'Immersive WebGL and high-performance flagships.',
      sortOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's3',
      websiteId: '',
      title: 'High-Fashion Editorial Art Direction',
      description: 'Runway campaign art direction, photography curation, spatial exhibition design, and publication layouts.',
      shortDescription: 'Runway art direction and spatial exhibition design.',
      sortOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's4',
      websiteId: '',
      title: 'CGI Motion & Generative Audio Visuals',
      description: 'Generative audio-reactive visuals, 60fps CGI motion graphics, and luxury product launch teasers.',
      shortDescription: 'Generative visuals and luxury product launch teasers.',
      sortOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="services" className="py-24 border-b border-stone-800" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-stone-800 pb-8">
          <div>
            <span className="font-mono text-xs uppercase font-bold tracking-[0.3em]" style={{ color: 'var(--theme-primary, #E5B842)' }}>
              STUDIO DISCIPLINES
            </span>
            <h2 className="text-4xl font-black font-serif uppercase mt-1">Creative Capabilities</h2>
          </div>
          <div className="font-mono text-xs text-stone-500 uppercase tracking-widest">LIMITED CAPACITY // Q3-Q4 COMMISSIONS</div>
        </div>

        {/* 1. CARDS LAYOUT */}
        {servicesStyle === 'cards' || servicesStyle === 'elevated' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceList.map((service, idx) => (
              <div key={service.id || idx} className="p-8 rounded-3xl border border-stone-800 bg-[#121215] space-y-4 group hover:border-[#E5B842] transition-colors">
                <div className="font-mono text-xs text-[#E5B842]">// DISCIPLINE 0{idx + 1}</div>
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E5B842] transition-colors">{service.title}</h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">{service.description || service.shortDescription}</p>
              </div>
            ))}
          </div>
        ) : servicesStyle === 'bento' || servicesStyle === 'icon-grid' ? (
          /* 2. BENTO LAYOUT */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceList.map((service, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <div key={service.id || idx} className={`p-8 rounded-3xl border border-stone-800 bg-[#121215] space-y-3 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}>
                  <div className="font-mono text-xs text-[#E5B842]">0{idx + 1} // BENTO</div>
                  <h3 className="text-xl font-bold font-serif text-white">{service.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">{service.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          /* 3. DEFAULT MINIMAL LIST ROWS */
          <div className="divide-y divide-stone-800">
            {serviceList.map((service, idx) => (
              <div key={service.id || idx} className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group cursor-pointer hover:bg-stone-900/50 px-6 rounded-2xl transition-all">
                <div className="lg:col-span-1 font-mono text-xs text-stone-600 font-bold">0{idx + 1} //</div>
                <div className="lg:col-span-4 font-serif text-2xl font-bold group-hover:text-[#E5B842] transition-colors">
                  {service.title}
                </div>
                <div className="lg:col-span-6 font-sans text-xs text-stone-400 leading-relaxed">
                  {service.description || service.shortDescription}
                </div>
                <div className="lg:col-span-1 flex justify-end">
                  <ArrowUpRight className="w-5 h-5 text-stone-600 group-hover:text-[#E5B842] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
