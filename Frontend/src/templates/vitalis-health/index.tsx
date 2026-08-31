"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { VitalisHero } from './sections/VitalisHero';
import { VitalisServices } from './sections/VitalisServices';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { HeartPulse, Stethoscope, Star, Calendar, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export interface VitalisHealthProps {
  content?: WebsiteContent | null;
}

export function VitalisHealth({ content }: VitalisHealthProps) {
  const testimonials = content?.testimonials && content.testimonials.length > 0 ? content.testimonials : [
    { id: 't1', name: 'Dr. Sarah Jenkins', role: 'Patient & Clinical Researcher', company: 'Stanford Health', content: 'Vitalis Health simplified my cardiac monitoring. The telehealth interface is intuitive and response time was under 10 minutes.' },
    { id: 't2', name: 'Robert Chen', role: 'Executive Vice President', company: 'Apex BioTech', content: 'Outstanding preventative care. Their team managed my entire executive health assessment seamlessly.' }
  ];

  const contactData = content?.contact;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#0D9488] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #071311)', color: 'var(--theme-text, #E0F2FE)' }}>
      <main className="flex-grow">
        <VitalisHero data={content?.hero} design={content?.theme} theme={content?.theme} />
        <VitalisServices items={content?.services} design={content?.theme} theme={content?.theme} />

        {/* Clinical Facilities Gallery */}
        {content?.galleries?.[0]?.items && content.galleries[0].items.length > 0 && (
          <section className="py-20 border-b border-teal-900/40 bg-[#050D0B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">// CLINICAL FACILITIES</span>
                <h2 className="text-3xl font-bold font-sans text-white mt-1">State-of-the-Art Care Centers</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.galleries[0].items.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-2xl bg-[#0A1A17] border border-teal-900/40 space-y-3">
                    <ImagePlaceholder media={item.media as any} aspectRatio="16/9" className="rounded-xl overflow-hidden" />
                    <h4 className="font-bold text-sm text-white font-sans">{item.title}</h4>
                    {item.description && <p className="text-xs text-stone-400 font-sans">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Patient Testimonials */}
        <section id="testimonials" className="py-20 border-b border-teal-900/40 bg-[#071311]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">// PATIENT REVIEWS</span>
              <h2 className="text-3xl font-bold font-sans text-white mt-1">Trusted Patient Experiences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={t.id || idx} className="p-8 rounded-3xl bg-[#0A1A17] border border-teal-900/40 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-teal-400" />
                    ))}
                  </div>
                  <p className="text-sm italic text-stone-300 font-sans leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                  <div className="pt-4 border-t border-teal-900/30 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white font-sans">{t.name}</div>
                      <div className="text-stone-500">{t.role} {t.company ? `// ${t.company}` : ''}</div>
                    </div>
                    <span className="text-teal-400 font-mono">VERIFIED PATIENT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical Contact & Appointment Intake */}
        <section id="contact" className="py-20 bg-[#050D0B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">// APPOINTMENT BOOKING</span>
                <h2 className="text-3xl font-bold font-sans text-white">Schedule Your Clinical Consultation</h2>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Our telehealth coordination desk is available 24/7. Connect with a specialist today.
                </p>
                <div className="space-y-3 text-xs text-stone-300 pt-2 font-mono">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0A1A17] border border-teal-900/40">
                    <Mail className="w-4 h-4 text-teal-400" />
                    <span>{contactData?.email || 'care@vitalis-health.com'}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0A1A17] border border-teal-900/40">
                    <Phone className="w-4 h-4 text-teal-400" />
                    <span>{contactData?.phone || '+1 (800) 555-CARE'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0A1A17] border border-teal-900/40 space-y-4 font-sans">
                <h3 className="text-lg font-bold text-white">Digital Appointment Request</h3>
                <form className="space-y-3 text-xs" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-stone-400 mb-1">Full Patient Name</label>
                    <input type="text" placeholder="e.g. Dr. Arthur Dent" className="w-full px-4 py-2.5 rounded-xl bg-[#050D0B] border border-teal-900/50 text-white outline-none focus:border-teal-400" />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Patient Contact Email</label>
                    <input type="email" placeholder="patient@example.com" className="w-full px-4 py-2.5 rounded-xl bg-[#050D0B] border border-teal-900/50 text-white outline-none focus:border-teal-400" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-teal-500 text-black font-bold uppercase tracking-wider hover:bg-teal-400 transition-colors">
                    Submit Care Intake
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-teal-900/40 bg-[#020706] text-xs text-stone-500 font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} VITALIS HEALTH MEDICAL PORTAL.</span>
          <span className="text-teal-400">// HIPAA & HITECH ACT COMPLIANT</span>
        </div>
      </footer>
    </div>
  );
}

export { vitalisHealthConfig } from './template.config';
export default VitalisHealth;
