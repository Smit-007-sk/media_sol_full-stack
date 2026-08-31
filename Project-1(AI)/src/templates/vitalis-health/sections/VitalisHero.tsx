"use client";

import React from 'react';
import { Hero } from '@/api/content';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { HeartPulse, Calendar, Clock, ShieldCheck, Search, UserCheck } from 'lucide-react';

interface VitalisHeroProps {
  data?: Hero | null;
  design?: any;
  theme?: any;
}

export function VitalisHero({ data, design, theme }: VitalisHeroProps) {
  const heroMedia = (data as any)?.image?.url || (data as any)?.image || (data as any)?.imageId;
  const heroLayout = design?.heroLayout || theme?.heroLayout || 'split';

  const eyebrow = data?.eyebrow || 'INTEGRATIVE TELEHEALTH & CLINICAL PORTAL';
  const title = data?.title || 'Personalized Medical Excellence & Precision Health Management';
  const description =
    data?.description ||
    'Connecting patients with board-certified clinical specialists, 24/7 telehealth consultations, and advanced diagnostic monitoring.';
  const primaryText = data?.primaryButtonText || 'Book Appointment';
  const primaryUrl = data?.primaryButtonUrl || '#contact';

  const healthMetrics = [
    { label: 'Patients Cared For', value: '45,000+' },
    { label: 'Patient Satisfaction', value: '99.4%' },
    { label: 'Board Specialists', value: '120+' },
    { label: 'Avg Wait Time', value: '15 Mins' },
  ];

  if (heroLayout === 'centered') {
    return (
      <section className="relative pt-20 pb-16 border-b border-teal-900/40 text-center font-sans" style={{ backgroundColor: 'var(--theme-background, #071311)', color: 'var(--theme-text, #E0F2FE)' }}>
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-950/50 text-teal-300 mx-auto">
            <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-sans">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto font-sans leading-relaxed">
            {description}
          </p>

          <div className="flex justify-center pt-2">
            <a
              href={primaryUrl}
              className="px-8 py-4 rounded-xl text-xs font-bold uppercase text-white bg-teal-600 hover:bg-teal-500 flex items-center space-x-2 shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span>{primaryText}</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-20 pb-16 border-b border-teal-900/40 overflow-hidden font-sans" style={{ backgroundColor: 'var(--theme-background, #071311)', color: 'var(--theme-text, #E0F2FE)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-950/50 text-teal-300">
              <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
              <span>{eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-white font-sans"
              style={{ fontFamily: 'var(--theme-heading-font, Inter, sans-serif)' }}
            >
              {title}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-sans" style={{ fontFamily: 'var(--theme-body-font, Inter, sans-serif)' }}>
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={primaryUrl}
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-500 shadow-xl transition-all flex items-center space-x-2"
                style={{ backgroundColor: 'var(--theme-primary, #0D9488)', color: '#FFFFFF' }}
              >
                <Calendar className="w-4 h-4" />
                <span>{primaryText}</span>
              </a>
            </div>

            <div className="pt-6 border-t border-teal-900/40 grid grid-cols-3 gap-4 text-xs font-sans text-stone-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>24/7 Virtual Clinic</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>Board Certified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {heroMedia ? (
              <ImagePlaceholder media={heroMedia} aspectRatio="4/3" className="rounded-3xl border border-teal-900/40 shadow-2xl" />
            ) : (
              <div className="p-8 rounded-3xl border border-teal-900/50 bg-[#0A1A17] shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">// INSTANT APPOINTMENT SEARCH</span>
                  <h3 className="text-2xl font-bold font-sans text-white">Find a Clinical Specialist</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-400 font-mono mb-1">Medical Specialty</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#06100E] border border-teal-900/60 text-stone-200 outline-none">
                      <option>Cardiovascular & Heart Health</option>
                      <option>Neurology & Brain Care</option>
                      <option>Integrative Telehealth</option>
                      <option>Pediatric & Family Medicine</option>
                    </select>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Available Doctors</span>
                </a>
              </div>
            )}
          </div>

        </div>

        <div className="pt-10 border-t border-teal-900/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {healthMetrics.map((hm, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0A1A17] border border-teal-900/40 space-y-1">
                <div className="text-3xl font-bold text-teal-400 font-mono">{hm.value}</div>
                <div className="text-xs font-bold text-stone-300 font-sans uppercase">{hm.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
