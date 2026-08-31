"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Heart, Activity, Stethoscope, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';

interface VitalisServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function VitalisServices({ items, design, theme }: VitalisServicesProps) {
  const servicesStyle = design?.servicesStyle || theme?.servicesStyle || 'cards';

  const defaultServices: ServiceItem[] = [
    {
      id: 's1',
      websiteId: '',
      title: 'Cardiovascular Care & Heart Health',
      description: 'Advanced electrocardiogram diagnostics, preventative cardiology, and continuous remote blood pressure monitoring.',
      shortDescription: 'Advanced diagnostics and remote cardiac monitoring.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's2',
      websiteId: '',
      title: 'Neurological & Brain Wellness',
      description: 'Comprehensive neurological evaluations, cognitive health assessments, and specialized migraine management.',
      shortDescription: 'Comprehensive neurological & cognitive evaluations.',
      sortOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's3',
      websiteId: '',
      title: '24/7 Virtual Telehealth Consultations',
      description: 'Instant HD video consultations with board-certified physicians for acute prescriptions and preventative advice.',
      shortDescription: 'Instant HD video consultations with licensed doctors.',
      sortOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 's4',
      websiteId: '',
      title: 'Integrative Oncology & Clinical Nutrition',
      description: 'Personalized cancer care support, metabolic nutrition plans, and holistic recovery therapies.',
      shortDescription: 'Personalized oncology support and clinical nutrition.',
      sortOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;
  const icons = [Heart, Brain, Stethoscope, Activity];

  return (
    <section id="services" className="py-20 border-b border-teal-900/40 font-sans" style={{ backgroundColor: '#050D0B', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-teal-400">
            // CLINICAL SPECIALTIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white">
            Comprehensive Medical & Telehealth Services
          </h2>
          <p className="text-xs text-stone-400 font-sans">
            Delivering evidence-based clinical treatments supported by modern diagnostic technology.
          </p>
        </div>

        {servicesStyle === 'bento' || servicesStyle === 'icon-grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceList.map((service, idx) => {
              const isLarge = idx === 0 || idx === 3;
              const IconComp = icons[idx % icons.length] || Activity;
              return (
                <div key={service.id || idx} className={`p-6 rounded-2xl bg-[#0A1A17] border border-teal-900/40 space-y-3 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}>
                  <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800/40 flex items-center justify-center text-teal-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">{service.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">{service.description || service.shortDescription}</p>
                </div>
              );
            })}
          </div>
        ) : servicesStyle === 'minimal' || servicesStyle === 'minimal-list' ? (
          <div className="divide-y divide-teal-900/40">
            {serviceList.map((service, idx) => (
              <div key={service.id || idx} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center group">
                <div className="lg:col-span-1 text-teal-400 font-mono font-bold text-xs">0{idx + 1}</div>
                <div className="lg:col-span-4 font-bold text-white text-base">{service.title}</div>
                <div className="lg:col-span-6 text-xs text-stone-400">{service.description || service.shortDescription}</div>
                <div className="lg:col-span-1 flex justify-end">
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceList.map((service, idx) => {
              const IconComp = icons[idx % icons.length] || Activity;
              return (
                <div
                  key={service.id || idx}
                  className="p-6 rounded-2xl bg-[#0A1A17] border border-teal-900/40 space-y-4 hover:border-teal-500/60 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {((service as any)?.image?.url || (service as any)?.image || (service as any)?.imageId) ? (
                      <ImagePlaceholder media={(service as any)?.image?.url || (service as any)?.image || (service as any)?.imageId} aspectRatio="16/9" className="rounded-xl overflow-hidden mb-3" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800/40 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                    )}

                    <h3 className="text-base font-bold text-white font-sans">{service.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">{service.description || service.shortDescription}</p>

                    <div className="pt-2 space-y-1 text-[11px] text-stone-400 font-sans">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        <span>Board-Certified Specialists</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-teal-900/30 flex items-center justify-between text-[11px] text-teal-400 font-mono">
                    <span>SPECIALTY DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
