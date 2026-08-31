"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { Key, Shield, ChevronRight } from 'lucide-react';

interface TerraServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function TerraServices({ items }: TerraServicesProps) {
  const defaultServices: ServiceItem[] = [
    { id: 's1', websiteId: '', title: 'Private Acquisition Advisory', description: 'Off-market luxury estate sourcing and discrete negotiation.', sortOrder: 1, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's2', websiteId: '', title: 'Architectural Portfolio Management', description: 'Global estate asset management and structural preservation.', sortOrder: 2, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's3', websiteId: '', title: 'Private Island & Estate Concierge', description: 'Full-turnkey residency management and luxury staff placement.', sortOrder: 3, isActive: true, createdAt: '', updatedAt: '' },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--theme-background, #F5EFE6)', color: 'var(--theme-text, #231B18)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B85B35]">
            CONCIERGE SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Tailored Real Estate Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div key={service.id || idx} className="p-8 rounded-3xl border border-stone-300/80 bg-white shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B85B35]/10 flex items-center justify-center text-[#B85B35]">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900">{service.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{service.description || service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
