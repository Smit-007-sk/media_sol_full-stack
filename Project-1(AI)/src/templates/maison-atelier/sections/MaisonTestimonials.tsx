"use client";

import React from 'react';
import { Testimonial } from '@/api/content';
import { Quote } from 'lucide-react';

interface MaisonTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function MaisonTestimonials({ items }: MaisonTestimonialsProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Comtesse Hélène de Beauvoir',
      role: 'Patron of the Arts',
      company: 'Paris',
      content: 'Maison Atelier created a gown of incomparable grace for my daughter’s wedding. Their attention to silk movement and embroidery is poetic.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24" style={{ backgroundColor: 'var(--theme-background, #FAFAFA)', color: 'var(--theme-text, #111111)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-serif italic text-xs uppercase tracking-[0.2em] text-[#C5A059]">
            PATRON ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">
            Reflections from Our Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item, idx) => (
            <div key={item.id || idx} className="p-8 rounded-3xl border border-stone-200 bg-white shadow-sm space-y-6 relative text-center">
              <Quote className="w-8 h-8 opacity-20 text-[#C5A059] mx-auto" />
              <p className="text-base italic leading-relaxed text-stone-700 font-serif">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-100 font-serif text-xs">
                <div className="font-light text-stone-900">{item.name}</div>
                <div className="text-stone-500 font-sans text-[11px]">{item.role} {item.company ? `• ${item.company}` : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
