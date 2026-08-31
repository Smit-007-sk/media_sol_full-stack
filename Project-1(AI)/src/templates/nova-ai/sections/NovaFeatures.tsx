"use client";

import React from 'react';
import { ServiceItem } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Cpu, ShieldCheck, Database, GitBranch, Zap, ArrowRight } from 'lucide-react';

interface NovaFeaturesProps {
  items?: ServiceItem[];
  design?: any;
  theme?: any;
}

export function NovaFeatures({ items, design, theme }: NovaFeaturesProps) {
  const servicesStyle = design?.servicesStyle || theme?.servicesStyle || 'cards';

  const defaultServices: ServiceItem[] = [
    {
      id: 'f1',
      websiteId: '',
      title: 'Self-Healing Agentic Workflows',
      description: 'Autonomous multi-agent orchestration with automatic fallback execution and self-correcting error handling loops.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'f2',
      websiteId: '',
      title: 'Zero-Trust Vector Database Pipeline',
      description: 'Sub-millisecond semantic search index with row-level encryption and private VPC data isolation.',
      sortOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'f3',
      websiteId: '',
      title: 'Custom LLM Quantization & Fine-Tuning',
      description: 'Train and deploy domain-specific open weights models on dedicated H100 tensor clusters with zero data leakage.',
      sortOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'f4',
      websiteId: '',
      title: 'Real-Time Telemetry & Audit Logs',
      description: 'Comprehensive token usage monitoring, cost optimization algorithms, and SOC2 Type II compliance tracking.',
      sortOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const featureList = items && items.length > 0 ? items.filter((s) => s.isActive) : defaultServices;
  const icons = [GitBranch, Database, Cpu, ShieldCheck];

  return (
    <section id="features" className="py-20 border-b border-purple-900/30 font-mono" style={{ backgroundColor: '#0A0B12', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-purple-400">
            // PLATFORM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white">
            Engineered for Mission-Critical AI Scale
          </h2>
        </div>

        {servicesStyle === 'bento' || servicesStyle === 'icon-grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureList.map((feature, idx) => {
              const isLarge = idx === 0 || idx === 3;
              const IconComp = icons[idx % icons.length] || Zap;
              return (
                <div key={feature.id || idx} className={`p-6 rounded-2xl bg-[#0E0F17] border border-purple-900/40 space-y-3 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}>
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">{feature.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">{feature.description}</p>
                </div>
              );
            })}
          </div>
        ) : servicesStyle === 'minimal' || servicesStyle === 'minimal-list' ? (
          <div className="divide-y divide-purple-900/40">
            {featureList.map((feature, idx) => (
              <div key={feature.id || idx} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center group">
                <div className="lg:col-span-1 text-purple-400 font-bold">0{idx + 1}</div>
                <div className="lg:col-span-4 font-bold text-white font-sans text-base">{feature.title}</div>
                <div className="lg:col-span-6 text-xs text-stone-400 font-sans">{feature.description}</div>
                <div className="lg:col-span-1 flex justify-end">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureList.map((feature, idx) => {
              const IconComp = icons[idx % icons.length] || Zap;
              return (
                <div
                  key={feature.id || idx}
                  className="p-6 rounded-2xl bg-[#0E0F17] border border-purple-900/40 space-y-4 hover:border-purple-500/60 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {((feature as any)?.image?.url || (feature as any)?.image || (feature as any)?.imageId) ? (
                      <ImagePlaceholder media={(feature as any)?.image?.url || (feature as any)?.image || (feature as any)?.imageId} aspectRatio="16/9" className="rounded-xl overflow-hidden mb-3" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                    )}

                    <h3 className="text-sm font-bold text-white font-sans">{feature.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">{feature.description}</p>
                  </div>

                  <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between text-[11px] text-purple-400 font-mono">
                    <span>SPEC // v4.2</span>
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
