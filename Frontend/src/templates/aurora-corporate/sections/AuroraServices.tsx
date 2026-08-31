"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Briefcase, ChevronRight, BarChart3, ShieldAlert, Cpu, Landmark, ArrowRight, CheckCircle } from 'lucide-react';

interface AuroraServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function AuroraServices({ items, design, theme }: AuroraServicesProps) {
  const servicesStyle = design?.servicesStyle || theme?.servicesStyle || 'cards';

  const defaultServices: ServiceItem[] = [
    {
      id: 's1',
      websiteId: '',
      title: 'Corporate Restructuring & Capital Governance',
      description: 'Comprehensive capital structure optimization, balance-sheet re-engineering, and strategic entity restructuring for corporate resilience.',
      shortDescription: 'Capital optimization and balance-sheet re-engineering.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's2',
      websiteId: '',
      title: 'Cross-Border M&A & Syndicate Advisory',
      description: 'End-to-end transactional counsel, syndicate negotiation, valuation diagnostics, and post-merger governance integration.',
      shortDescription: 'Transactional advisory and post-merger governance.',
      sortOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's3',
      websiteId: '',
      title: 'Regulatory Audit & Risk Compliance',
      description: 'Systematic audit frameworks to navigate international legislative policies, antitrust regulations, and ESG disclosure requirements.',
      shortDescription: 'Systematic compliance and ESG disclosure frameworks.',
      sortOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's4',
      websiteId: '',
      title: 'Executive Digital Governance & Cyber Ethics',
      description: 'Integrating secure cloud architectures, board-level AI oversight protocols, and zero-trust enterprise risk assessments.',
      shortDescription: 'Board-level AI oversight and digital risk management.',
      sortOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;
  const icons = [Landmark, BarChart3, ShieldAlert, Cpu];

  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--theme-background, #FBF8F1)', color: 'var(--theme-text, #1F2937)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.2em] font-mono inline-block" style={{ color: 'var(--theme-secondary, #C9A45C)' }}>
            EXECUTIVE PRACTICE AREAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--theme-heading-font, Cormorant Garamond, serif)', color: 'var(--theme-heading-color, var(--theme-text, #FFFFFF))' }}>
            Tailored Governance & Strategic Solutions
          </h2>
          <p className="text-sm font-sans" style={{ color: 'var(--theme-text-muted, rgba(243, 244, 246, 0.85))' }}>
            Methodical frameworks designed to optimize executive decision-making, mitigate fiduciary liability, and enhance investor confidence.
          </p>
        </div>

        {/* 1. MINIMAL LIST */}
        {servicesStyle === 'minimal' || servicesStyle === 'minimal-list' ? (
          <div className="divide-y divide-stone-300">
            {serviceList.map((service, idx) => (
              <div key={service.id || idx} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center group cursor-pointer hover:bg-white/80 px-4 rounded-xl transition-all">
                <div className="lg:col-span-1 font-mono text-xs text-stone-400 font-bold">0{idx + 1}</div>
                <div className="lg:col-span-4 font-serif text-xl font-bold text-[#075C45]">
                  {service.title}
                </div>
                <div className="lg:col-span-6 font-sans text-xs text-stone-600 leading-relaxed">
                  {service.description || service.shortDescription}
                </div>
                <div className="lg:col-span-1 flex justify-end">
                  <ArrowRight className="w-5 h-5 text-[#C9A45C] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : servicesStyle === 'bento' || servicesStyle === 'icon-grid' ? (
          /* 2. BENTO GRID LAYOUT */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceList.map((service, idx) => {
              const isLarge = idx === 0 || idx === 3;
              const IconComp = icons[idx % icons.length] || Briefcase;
              return (
                <div
                  key={service.id || idx}
                  className={`p-8 rounded-3xl border bg-white shadow-sm hover:shadow-xl transition-all ${
                    isLarge ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                  style={{ borderColor: 'rgba(201, 164, 92, 0.25)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#075C45] text-white flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#075C45] mb-2">{service.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{service.description || service.shortDescription}</p>
                </div>
              );
            })}
          </div>
        ) : servicesStyle === 'numbered' || servicesStyle === 'numbered-list' ? (
          /* 3. NUMBERED EXECUTIVE LIST */
          <div className="space-y-6">
            {serviceList.map((service, idx) => (
              <div key={service.id || idx} className="p-8 rounded-3xl border bg-white shadow-sm flex flex-col md:flex-row md:items-center gap-6" style={{ borderColor: 'rgba(201, 164, 92, 0.25)' }}>
                <div className="text-4xl font-serif font-black text-[#C9A45C]">0{idx + 1}</div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-bold font-serif text-[#075C45]">{service.title}</h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">{service.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#075C45]" />
              </div>
            ))}
          </div>
        ) : servicesStyle === 'carousel' || servicesStyle === 'horizontal-scroll' ? (
          /* 4. HORIZONTAL SCROLLER */
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none">
            {serviceList.map((service, idx) => (
              <div key={service.id || idx} className="min-w-[320px] max-w-[360px] p-8 rounded-3xl border bg-white shadow-sm flex-shrink-0 space-y-4" style={{ borderColor: 'rgba(201, 164, 92, 0.25)' }}>
                <div className="text-xs font-mono font-bold text-[#C9A45C]">MANDATE 0{idx + 1}</div>
                <h3 className="text-lg font-bold font-serif text-[#075C45]">{service.title}</h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        ) : (
          /* 5. DEFAULT ELEVATED FEATURE CARDS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceList.map((service, idx) => {
              const IconComp = icons[idx % icons.length] || Briefcase;
              return (
                <div
                  key={service.id || idx}
                  className="p-8 rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
                  style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(201, 164, 92, 0.25)' }}
                >
                  <div className="space-y-4">
                    {((service as any)?.image?.url || (service as any)?.image || (service as any)?.imageId) ? (
                      <ImagePlaceholder media={(service as any)?.image?.url || (service as any)?.image || (service as any)?.imageId} aspectRatio="16/9" className="rounded-xl overflow-hidden mb-3" />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}>
                        <IconComp className="w-6 h-6" />
                      </div>
                    )}

                    <h3 className="text-lg font-bold font-serif leading-snug" style={{ color: 'var(--theme-primary, #075C45)' }}>
                      {service.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {service.description || service.shortDescription}
                    </p>

                    <div className="pt-3 space-y-1.5 border-t border-stone-100 text-[11px] text-stone-500 font-sans">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#075C45]" />
                        <span>Executive Board Approved</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A45C]" />
                        <span>Full Regulatory Compliance</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--theme-secondary, #C9A45C)' }}>
                    <span>Practice Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
