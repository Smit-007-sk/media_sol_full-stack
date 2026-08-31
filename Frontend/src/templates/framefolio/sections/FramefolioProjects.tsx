"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { ArrowUpRight } from 'lucide-react';

interface FramefolioProjectsProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function FramefolioProjects({ items, design, theme }: FramefolioProjectsProps) {
  const servicesStyle = design?.servicesStyle || theme?.servicesStyle || 'cards';

  const defaultServices: ServiceItem[] = [
    {
      id: 'p1',
      websiteId: '',
      title: 'Brand Identity Systems',
      description: 'Custom typographic systems, brutalist logo marks, physical stationery, and brand guidelines.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'p2',
      websiteId: '',
      title: 'Digital Flagship Platforms',
      description: 'Custom Next.js applications, high-performance WebGL motion, and interactive e-commerce flagships.',
      sortOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'p3',
      websiteId: '',
      title: 'Spatial Exhibition Design',
      description: 'Physical museum wall graphics, gallery signage, and environmental art direction.',
      sortOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'p4',
      websiteId: '',
      title: 'Creative Motion & Campaign CGI',
      description: '3D product renders, kinetic typography tickers, and social campaign video teasers.',
      sortOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const projectList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="projects" className="py-20 border-b border-stone-800 font-sans" style={{ backgroundColor: '#09090B', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-stone-800 pb-8">
          <div>
            <span className="font-mono text-xs uppercase font-bold tracking-[0.3em] text-pink-500">// STUDIO OFFERINGS</span>
            <h2 className="text-4xl font-black font-serif uppercase mt-1">Creative Disciplines</h2>
          </div>
          <span className="font-mono text-xs text-stone-500 uppercase">// 2026 CAPABILITIES</span>
        </div>

        {servicesStyle === 'bento' || servicesStyle === 'icon-grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectList.map((project, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <div key={project.id || idx} className={`p-8 rounded-3xl bg-[#161618] border border-stone-800 space-y-3 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}>
                  <div className="font-mono text-xs text-pink-500 font-bold">0{idx + 1} // BENTO</div>
                  <h3 className="text-xl font-bold font-serif text-white">{project.title}</h3>
                  <p className="text-xs text-stone-400 font-sans leading-relaxed">{project.description}</p>
                </div>
              );
            })}
          </div>
        ) : servicesStyle === 'minimal' || servicesStyle === 'minimal-list' ? (
          <div className="divide-y divide-stone-800">
            {projectList.map((project, idx) => (
              <div key={project.id || idx} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center group">
                <div className="lg:col-span-1 font-mono text-xs text-pink-500 font-bold">0{idx + 1}</div>
                <div className="lg:col-span-4 font-serif text-xl font-bold text-white">{project.title}</div>
                <div className="lg:col-span-6 font-sans text-xs text-stone-400">{project.description}</div>
                <div className="lg:col-span-1 flex justify-end">
                  <ArrowUpRight className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectList.map((project, idx) => (
              <div key={project.id || idx} className="p-8 rounded-3xl bg-[#161618] border border-stone-800 space-y-4 hover:border-pink-500/60 transition-all group">
                {((project as any)?.image?.url || (project as any)?.image || (project as any)?.imageId) ? (
                  <ImagePlaceholder media={(project as any)?.image?.url || (project as any)?.image || (project as any)?.imageId} aspectRatio="16/9" className="rounded-2xl overflow-hidden mb-4" />
                ) : (
                  <div className="font-mono text-xs text-pink-500 font-bold">0{idx + 1} // DISCIPLINE</div>
                )}
                <h3 className="text-2xl font-bold font-serif text-white group-hover:text-pink-400 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-stone-600 group-hover:text-pink-400 transition-colors" />
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
