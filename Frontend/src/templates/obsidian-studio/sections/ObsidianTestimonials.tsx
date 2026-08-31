"use client";

import React from 'react';
import { Testimonial } from '@/api/content';

interface ObsidianTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function ObsidianTestimonials({ items, design, theme }: ObsidianTestimonialsProps) {
  const testimonialsStyle = design?.testimonialsStyle || theme?.testimonialsStyle || 'cards';

  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Kaelen Thorne',
      role: 'Creative Director',
      company: 'Thorne Architecture Paris',
      content: 'Obsidian Studio crafted a digital identity that commands respect. Their spatial layout principles redefined our entire international presence.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 border-b border-stone-800" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase font-bold tracking-[0.2em]" style={{ color: 'var(--theme-primary, #E5B842)' }}>
            MANIFESTO ENDORSEMENTS
          </span>
          <h2 className="text-4xl font-bold font-serif">Client Reflections</h2>
        </div>

        {testimonialsStyle === 'quote' || testimonialsStyle === 'largeQuote' ? (
          <div className="max-w-4xl mx-auto p-10 rounded-3xl border border-stone-800 bg-[#141416] text-center space-y-6">
            <p className="text-2xl sm:text-3xl italic font-serif text-[#E5B842] leading-relaxed">
              &ldquo;{list[0]?.content}&rdquo;
            </p>
            <div className="font-mono text-xs text-stone-400">
              <span className="text-white font-bold">{list[0]?.name}</span> — {list[0]?.role} {list[0]?.company ? `// ${list[0]?.company}` : ''}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {list.map((item, idx) => (
              <div key={item.id || idx} className="p-8 rounded-3xl border border-stone-800 bg-[#141416] space-y-6">
                <p className="text-lg italic font-serif text-stone-300 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="text-stone-500">{item.role} {item.company ? `// ${item.company}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
