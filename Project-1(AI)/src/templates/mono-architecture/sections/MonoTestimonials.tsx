"use client";

import React from 'react';
import { Testimonial } from '@/api/content';

interface MonoTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function MonoTestimonials({ items }: MonoTestimonialsProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Lars Lindqvist',
      role: 'Design Director',
      company: 'Nordic Architecture Review',
      content: 'Mono Architecture creates spaces that transcend ordinary living. Their mastery over concrete proportion and light shadow is extraordinary.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 border-b border-stone-200" style={{ backgroundColor: 'var(--theme-background, #FFFFFF)', color: 'var(--theme-text, #171717)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-stone-500">
            CRITICAL PRESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900">
            Endorsements & Architectural Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item, idx) => (
            <div key={item.id || idx} className="p-8 border border-stone-300 bg-stone-50 space-y-6">
              <p className="text-sm sm:text-base italic leading-relaxed text-stone-700 font-serif">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-200 font-mono text-xs flex items-center justify-between">
                <span className="font-bold text-stone-900">{item.name}</span>
                <span className="text-stone-500">{item.role} {item.company ? `// ${item.company}` : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
