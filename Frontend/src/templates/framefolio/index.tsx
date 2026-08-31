"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { FramefolioNavbar } from './sections/FramefolioNavbar';
import { FramefolioHero } from './sections/FramefolioHero';
import { FramefolioProjects } from './sections/FramefolioProjects';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { Grid, Star, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export interface FramefolioProps {
  content?: WebsiteContent | null;
}

export function Framefolio({ content }: FramefolioProps) {
  const testimonials = content?.testimonials && content.testimonials.length > 0 ? content.testimonials : [
    { id: 't1', name: 'Julian Vance', role: 'Creative Director', company: 'Vance Spatial', content: 'Framefolio delivered a stark, unforgettable portfolio identity that elevated our agency credibility instantly.' },
    { id: 't2', name: 'Sora Takahashi', role: 'Founder', company: 'Tokyo Design Guild', content: 'The brutalist layout and instant page speed are unrivaled. Best portfolio architecture we have used.' }
  ];

  const contactData = content?.contact;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#FF3366] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #0D0D0D)', color: 'var(--theme-text, #E5E5E5)' }}>
      <FramefolioNavbar theme={content?.theme} heroData={content?.hero} />
      <main className="flex-grow">
        <FramefolioHero data={content?.hero} design={content?.theme} theme={content?.theme} />
        <FramefolioProjects items={content?.services} design={content?.theme} theme={content?.theme} />

        {/* Portfolio Showcase Gallery */}
        {content?.galleries?.[0]?.items && content.galleries[0].items.length > 0 && (
          <section className="py-20 border-b border-stone-800 bg-[#09090B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-pink-500 uppercase tracking-widest">// VISUAL ARCHIVE</span>
                <h2 className="text-3xl font-bold font-serif text-white mt-1">Featured Creative Spreads</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.galleries[0].items.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-2xl bg-[#161618] border border-stone-800 space-y-3">
                    <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="rounded-xl overflow-hidden" />
                    <h4 className="font-bold text-sm text-white font-sans">{item.title}</h4>
                    {item.description && <p className="text-xs text-stone-400 font-sans">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section id="testimonials" className="py-20 border-b border-stone-800 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-mono font-bold text-pink-500 uppercase tracking-widest">// CLIENT ENDORSEMENTS</span>
              <h2 className="text-3xl font-bold font-serif text-white mt-1">What Creative Leaders Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={t.id || idx} className="p-8 rounded-3xl bg-[#161618] border border-stone-800 space-y-4">
                  <p className="text-sm italic text-stone-300 font-sans leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                  <div className="pt-4 border-t border-stone-800 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white font-sans">{t.name}</div>
                      <div className="text-stone-500">{t.role} {t.company ? `// ${t.company}` : ''}</div>
                    </div>
                    <span className="text-pink-500 font-mono">VERIFIED COMMISSION</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Contact Intake */}
        <section id="contact" className="py-20 bg-[#09090B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold text-pink-500 uppercase tracking-widest">// COMMISSION INQUIRY</span>
                <h2 className="text-3xl font-bold font-serif text-white">Start Your Studio Commission</h2>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  We accept a limited number of studio commissions per quarter to ensure uncompromised quality.
                </p>
                <div className="space-y-3 text-xs text-stone-300 pt-2 font-mono">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#161618] border border-stone-800">
                    <Mail className="w-4 h-4 text-pink-500" />
                    <span>{contactData?.email || 'studio@framefolio.design'}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#161618] border border-stone-800">
                    <Phone className="w-4 h-4 text-pink-500" />
                    <span>{contactData?.phone || '+1 (800) 902-FRAME'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 rounded-3xl bg-[#161618] border border-stone-800 space-y-4 font-mono">
                <h3 className="text-lg font-bold text-white uppercase">Project Intake Form</h3>
                <form className="space-y-3 text-xs" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-stone-400 mb-1">Your Name</label>
                    <input type="text" placeholder="e.g. Elena Rostova" className="w-full px-4 py-2.5 rounded-xl bg-black border border-stone-800 text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Project Scope</label>
                    <input type="text" placeholder="e.g. Brand Identity & Flagship Site" className="w-full px-4 py-2.5 rounded-xl bg-black border border-stone-800 text-white outline-none focus:border-pink-500" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-400 transition-colors">
                    Send Project Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-stone-800 bg-black text-xs text-stone-500 font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} FRAMEFOLIO CREATIVE STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="text-pink-500">// BRUTALIST GRID SYSTEM</span>
        </div>
      </footer>
    </div>
  );
}

export { framefolioConfig } from './template.config';
export default Framefolio;
