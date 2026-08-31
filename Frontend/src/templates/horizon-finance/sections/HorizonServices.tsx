"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { Landmark, ArrowUpRight } from 'lucide-react';

interface HorizonServicesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function HorizonServices({ items }: HorizonServicesProps) {
  const defaultServices: ServiceItem[] = [
    { id: 's1', websiteId: '', title: 'Private Wealth Management', description: 'Comprehensive portfolio management, fixed income, and private equity allocation.', sortOrder: 1, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's2', websiteId: '', title: 'Family Office Governance', description: 'Intergenerational wealth transfer, estate planning, and philanthropic trusts.', sortOrder: 2, isActive: true, createdAt: '', updatedAt: '' },
    { id: 's3', websiteId: '', title: 'Corporate Risk & Treasury', description: 'Liquidity hedging, currency risk management, and capital optimization.', sortOrder: 3, isActive: true, createdAt: '', updatedAt: '' },
  ];

  const serviceList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;

  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--theme-background, #F8FAFC)', color: 'var(--theme-text, #0F172A)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#1D4ED8]">
            FINANCIAL PRACTICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-900">
            Advisory & Wealth Practice Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div key={service.id || idx} className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center text-[#1D4ED8]">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">{service.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{service.description || service.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
