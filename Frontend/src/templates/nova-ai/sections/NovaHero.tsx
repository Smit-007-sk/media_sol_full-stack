"use client";

import React, { useState } from 'react';
import { Hero } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Terminal, Cpu, Zap, ShieldCheck, Play, Copy, Check, ChevronRight } from 'lucide-react';

interface NovaHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function NovaHero({ data, design, theme }: NovaHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'NEURAL INFERENCE ENGINE // v4.2 RELEASED';
  const title = data?.title || 'Autonomous Agentic AI Infrastructure for Enterprise Workflows';
  const description =
    data?.description ||
    'Deploy self-healing AI agents, fine-tuned LLMs, and zero-trust vector pipelines with sub-4ms latency at scale.';
  const primaryText = data?.primaryButtonText || 'Deploy Neural Cluster';
  const primaryUrl = data?.primaryButtonUrl || '#features';

  const [copied, setCopied] = useState(false);
  const command = 'npm install @nova-ai/sdk --save';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFullBleedBg = heroLayout === 'fullBleedBg' || heroLayout === 'fullBleed' || heroLayout === 'full-bleed';
  const rawOpacity = (data as any)?.bgOpacity;
  const bgOpacity = rawOpacity ? parseFloat(rawOpacity) : 0.25;
  const bgImageUrl = typeof heroMedia === 'string' ? heroMedia : heroMedia?.url;

  if (isFullBleedBg) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center py-24 text-white overflow-hidden" style={{ backgroundColor: '#0B0C10' }}>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/80 to-[#0B0C10]/40 pointer-events-none" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-purple-400">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-stone-300 font-sans leading-relaxed drop-shadow font-medium">
            {description}
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <a
              href={primaryUrl}
              className="px-8 py-3.5 bg-purple-600 text-white rounded-xl font-mono text-sm font-semibold shadow-2xl hover:bg-purple-500 transition-all"
            >
              {primaryText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  const partnerLogos = [
    { name: 'NVIDIA CLOUD', detail: 'H100 Tensor Clusters' },
    { name: 'SNOWFLAKE', detail: 'Native Data Pipeline' },
    { name: 'AWS BEDROCK', detail: 'Enterprise Syndicate' },
    { name: 'DATABRICKS', detail: 'Delta Lake Sync' },
  ];

  // 1. CENTERED HERO LAYOUT
  if (heroLayout === 'centered') {
    return (
      <section className="relative pt-20 pb-16 border-b border-purple-900/30 font-mono text-center" style={{ backgroundColor: 'var(--theme-background, #07080D)', color: 'var(--theme-text, #FFFFFF)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-400 mx-auto">
            <Zap className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase font-sans">
            {title}
          </h1>

          <p className="text-base text-stone-300 max-w-xl mx-auto leading-relaxed font-sans">
            {description}
          </p>

          <div className="p-4 rounded-xl bg-black/80 border border-purple-900/50 flex items-center justify-between font-mono text-xs max-w-md mx-auto shadow-2xl">
            <div className="flex items-center space-x-3 text-stone-300">
              <span className="text-purple-400">$</span>
              <span>{command}</span>
            </div>
            <button onClick={handleCopy} className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-purple-400">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex justify-center">
            <a href={primaryUrl} className="px-8 py-4 rounded-xl text-xs font-bold uppercase text-black bg-purple-400 hover:bg-purple-300">
              {primaryText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 2. DEFAULT SPLIT HERO LAYOUT
  return (
    <section className="relative pt-20 pb-16 border-b border-purple-900/30 overflow-hidden font-mono" style={{ backgroundColor: 'var(--theme-background, #07080D)', color: 'var(--theme-text, #FFFFFF)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-400">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-white uppercase font-sans whitespace-pre-line break-words [overflow-wrap:anywhere] max-w-full"
              style={{ fontFamily: 'var(--theme-heading-font, Inter, sans-serif)' }}
            >
              {title}
            </h1>

            <p className="text-base text-stone-300 max-w-xl leading-relaxed font-sans whitespace-pre-line break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="p-4 rounded-xl bg-black/80 border border-purple-900/50 flex items-center justify-between font-mono text-xs max-w-md shadow-2xl">
              <div className="flex items-center space-x-3 text-stone-300">
                <span className="text-purple-400">$</span>
                <span>{command}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-purple-400 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={primaryUrl}
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-purple-400 hover:bg-purple-300 shadow-xl transition-all flex items-center space-x-2"
                style={{ backgroundColor: 'var(--theme-primary, #A855F7)', color: '#000000' }}
              >
                <span>{primaryText}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-purple-900/40 shadow-2xl" />
            ) : (
              <div className="rounded-3xl border border-purple-900/50 bg-[#0E0F17] p-6 shadow-2xl space-y-4 relative font-mono text-xs">
                <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-stone-400 text-[11px] ml-2">// nova-cluster-01.local</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">ONLINE // 99.999%</span>
                </div>

                <div className="space-y-2 text-stone-300 py-2">
                  <div className="text-stone-500">&gt; INITIALIZING NEURAL INFERENCE ENGINE...</div>
                  <div className="text-purple-400">&gt; LOADING 70B PARAMETER QUANTIZED WEIGHTS [DONE]</div>
                  <div className="text-stone-300">&gt; VECTOR RETRIEVAL LATENCY: <span className="text-emerald-400 font-bold">2.8ms</span></div>
                  <div className="text-stone-300">&gt; ACTIVE AGENT WORKFLOWS: <span className="text-purple-400 font-bold">14,280/sec</span></div>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="pt-10 border-t border-purple-900/30">
          <p className="text-xs text-center uppercase tracking-[0.25em] font-mono text-stone-500 mb-6">
            NATIVE ENTERPRISE INTEGRATIONS & CLOUD PARTNERS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {partnerLogos.map((pt, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0E0F17] border border-purple-900/30 space-y-1">
                <div className="text-sm font-bold text-white font-mono">{pt.name}</div>
                <div className="text-[10px] text-stone-400">{pt.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
