"use client";

import React, { useState } from 'react';
import { Testimonial } from '@/api/content';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface AuroraTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function AuroraTestimonials({ items, design, theme }: AuroraTestimonialsProps) {
  const testimonialsStyle = design?.testimonialsStyle || theme?.testimonialsStyle || 'cards';
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Victoria Sterling',
      role: 'Chief Risk Officer',
      company: 'Sterling Capital Group',
      content: 'Aurora Corporate provided exceptional governance counsel during our cross-border restructuring. Their clarity and precision are unmatched.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 't2',
      websiteId: '',
      name: 'Marcus Vance',
      role: 'Managing Director',
      company: 'Vance & Partners Global',
      content: 'Their strategic advisory team transformed our organizational compliance framework, establishing long-term investor confidence.',
      sortOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: 'var(--theme-background, #FBF8F1)', color: 'var(--theme-text, #1F2937)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest inline-block font-mono text-[#C9A45C]">
            EXECUTIVE ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#075C45]">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* 1. LARGE QUOTE SPOTLIGHT */}
        {testimonialsStyle === 'quote' || testimonialsStyle === 'largeQuote' ? (
          <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-white border border-[#C9A45C]/40 text-center space-y-6 shadow-xl relative">
            <Quote className="w-12 h-12 text-[#C9A45C]/30 mx-auto" />
            <p className="text-2xl sm:text-3xl font-serif italic text-[#075C45] leading-relaxed">
              &ldquo;{list[0]?.content}&rdquo;
            </p>
            <div className="pt-4 border-t border-stone-100">
              <h4 className="font-bold text-base text-stone-900 font-sans">{list[0]?.name}</h4>
              <p className="text-xs font-mono text-[#C9A45C]">{list[0]?.role} {list[0]?.company ? `• ${list[0]?.company}` : ''}</p>
            </div>
          </div>
        ) : testimonialsStyle === 'slider' || testimonialsStyle === 'carousel' ? (
          /* 2. INTERACTIVE CAROUSEL */
          <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-white border border-[#C9A45C]/40 space-y-6 shadow-xl relative">
            <div className="flex justify-between items-center text-xs font-mono text-stone-400">
              <span>TESTIMONIAL {activeIndex + 1} OF {list.length}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1))}
                  className="p-2 rounded-full border hover:bg-stone-100"
                >
                  <ChevronLeft className="w-4 h-4 text-stone-700" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0))}
                  className="p-2 rounded-full border hover:bg-stone-100"
                >
                  <ChevronRight className="w-4 h-4 text-stone-700" />
                </button>
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-serif italic text-[#075C45] leading-relaxed">
              &ldquo;{list[activeIndex]?.content}&rdquo;
            </p>
            <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-stone-900">{list[activeIndex]?.name}</h4>
                <p className="text-xs text-stone-500">{list[activeIndex]?.role} {list[activeIndex]?.company ? `• ${list[activeIndex]?.company}` : ''}</p>
              </div>
            </div>
          </div>
        ) : (
          /* 3. DEFAULT INDIVIDUAL CLIENT CARDS */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {list.map((item, idx) => (
              <div key={item.id || idx} className="p-8 rounded-3xl border bg-white shadow-sm space-y-6 relative" style={{ borderColor: 'rgba(201, 164, 92, 0.3)' }}>
                <Quote className="w-8 h-8 opacity-20 absolute top-6 right-6" style={{ color: 'var(--theme-primary, #075C45)' }} />
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base italic leading-relaxed text-stone-700 font-serif">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 font-sans">{item.name}</h4>
                    <p className="text-xs text-stone-500">{item.role} {item.company ? `• ${item.company}` : ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
