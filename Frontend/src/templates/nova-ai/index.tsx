"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { NovaNavbar } from './sections/NovaNavbar';
import { NovaHero } from './sections/NovaHero';
import { NovaFeatures } from './sections/NovaFeatures';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Shield, Cpu, Terminal, Zap, CheckCircle2, MessageSquare, Mail, MapPin, Phone } from 'lucide-react';

export interface NovaAiProps {
  content?: WebsiteContent | null;
}

export function NovaAi({ content }: NovaAiProps) {
  const testimonials = content?.testimonials && content.testimonials.length > 0 ? content.testimonials : [
    { id: 't1', name: 'Dr. Aris Thorne', role: 'Head of AI Research', company: 'Nexus BioLab', content: 'Nova AI reduced our genomic sequence inference pipeline from 48 hours to under 12 minutes.' },
    { id: 't2', name: 'Elena Rostova', role: 'CTO', company: 'Vanguard Algorithmic', content: 'The self-healing agentic workflows allowed us to scale high-frequency trade execution with zero downtime.' }
  ];

  const contactData = content?.contact;

  return (
    <div className="w-full min-h-screen flex flex-col font-mono selection:bg-purple-600 selection:text-white" style={{ backgroundColor: 'var(--theme-background, #07080D)', color: 'var(--theme-text, #FFFFFF)' }}>
      <NovaNavbar theme={content?.theme} heroData={content?.hero} />
      <main className="flex-grow">
        <NovaHero data={content?.hero} design={content?.theme} theme={content?.theme} />
        <NovaFeatures items={content?.services} design={content?.theme} theme={content?.theme} />

        {/* Gallery / Project Showcase Section */}
        {content?.galleries?.[0]?.items && content.galleries[0].items.length > 0 && (
          <section className="py-20 border-b border-purple-900/30 bg-[#0A0B12]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">// NEURAL VISUAL DEPLOYMENTS</span>
                <h2 className="text-3xl font-bold font-sans text-white mt-1">Deployed Neural Architectures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.galleries[0].items.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-2xl bg-[#0E0F17] border border-purple-900/40 space-y-3">
                    <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="rounded-xl overflow-hidden" />
                    <h4 className="font-bold text-sm text-white font-sans">{item.title}</h4>
                    {item.description && <p className="text-xs text-stone-400 font-sans">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 border-b border-purple-900/30 bg-[#07080D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">// CUSTOMER TELEMETRY</span>
              <h2 className="text-3xl font-bold font-sans text-white mt-1">Trusted by Engineering Leaders</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={t.id || idx} className="p-8 rounded-3xl bg-[#0E0F17] border border-purple-900/40 space-y-4">
                  <p className="text-sm italic text-stone-300 font-sans leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                  <div className="pt-4 border-t border-purple-900/30 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white font-sans">{t.name}</div>
                      <div className="text-stone-500">{t.role} {t.company ? `// ${t.company}` : ''}</div>
                    </div>
                    <span className="text-purple-400 font-mono">VERIFIED USER</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#0A0B12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">// DEPLOYMENT ADVISORY</span>
                <h2 className="text-3xl font-bold font-sans text-white">Initialize Custom Enterprise Cluster</h2>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Request dedicated H100 SXM tensor node allocations and private VPC vector database deployment.
                </p>
                <div className="space-y-3 text-xs text-stone-300 pt-2 font-mono">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0E0F17] border border-purple-900/30">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>{contactData?.email || 'enterprise@nova-ai.io'}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0E0F17] border border-purple-900/30">
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span>{contactData?.phone || '+1 (888) 902-NOVA'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0E0F17] border border-purple-900/40 space-y-4">
                <h3 className="text-lg font-bold font-sans text-white">Cluster Provisioning Intake</h3>
                <form className="space-y-3 text-xs font-mono" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-stone-400 mb-1">Work Email</label>
                    <input type="email" placeholder="name@company.io" className="w-full px-4 py-2.5 rounded-xl bg-black border border-purple-900/40 text-white outline-none focus:border-purple-400" />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">GPU Node Requirements</label>
                    <input type="text" placeholder="e.g. 64x H100 SXM Nodes" className="w-full px-4 py-2.5 rounded-xl bg-black border border-purple-900/40 text-white outline-none focus:border-purple-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-purple-500 text-black font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors">
                    Provision Dedicated Cluster
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-purple-900/30 bg-black text-xs text-stone-500 font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} NOVA AI INC. NEURAL CLUSTER ARCHITECTURE.</span>
          <span className="text-purple-400">// SOC2 TYPE II & ISO 27001 COMPLIANT</span>
        </div>
      </footer>
    </div>
  );
}

export { novaAiConfig } from './template.config';
export default NovaAi;
