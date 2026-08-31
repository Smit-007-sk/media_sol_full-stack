"use client";

import React from 'react';
import { About } from '@/api/content';
import { BarChart3, Globe, Shield } from 'lucide-react';

interface HorizonAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function HorizonAbout({ data }: HorizonAboutProps) {
  const eyebrow = data?.eyebrow || 'INSTITUTIONAL GOVERNANCE';
  const title = data?.title || 'Fiduciary Discipline for Global Wealth';
  const description =
    data?.description ||
    'Horizon Finance delivers independent private wealth management and corporate strategy execution. We align capital preservation with long-term intergenerational growth.';

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#1D4ED8]">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans leading-tight text-slate-900">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 font-mono">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-2xl font-bold text-[#1D4ED8]">30+</div>
                <div className="text-xs text-slate-500 font-sans">Years Fiduciary Excellence</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-2xl font-bold text-[#1D4ED8]">100%</div>
                <div className="text-xs text-slate-500 font-sans">Independent Ownership</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <BarChart3 className="w-8 h-8 text-[#1D4ED8]" />
              <h4 className="font-bold text-sm">Capital Structuring</h4>
              <p className="text-xs text-slate-500">Optimizing tax efficiency and cross-border holding vehicles.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <Globe className="w-8 h-8 text-[#1D4ED8]" />
              <h4 className="font-bold text-sm">Cross-Border Banking</h4>
              <p className="text-xs text-slate-500">Multi-currency liquidity and international asset custody.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
