"use client";

import React from 'react';
import { About } from '@/api/content';

interface MonoAboutProps {
  data?: About | null;
  design?: any;
  theme?: any;
}

export function MonoAbout({ data }: MonoAboutProps) {
  const eyebrow = data?.eyebrow || 'ARCHITECTURAL ETHOS';
  const title = data?.title || 'Reduction to Essential Volume';
  const description =
    data?.description ||
    'Mono Architecture strips away extraneous ornament to highlight unadorned material truth. We believe spatial dignity stems from proportion, shadow rhythm, and natural light.';

  return (
    <section id="about" className="py-24 bg-stone-50 border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 font-bold">
              {eyebrow}
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-light">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 font-mono text-xs">
              <div className="p-6 border border-stone-300 bg-white space-y-1">
                <div className="text-3xl font-serif">40+</div>
                <div className="text-stone-500 font-sans">International Awards</div>
              </div>
              <div className="p-6 border border-stone-300 bg-white space-y-1">
                <div className="text-3xl font-serif">00</div>
                <div className="text-stone-500 font-sans">Superfluous Elements</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="p-8 border border-stone-300 bg-white space-y-2">
              <div className="font-mono text-xs text-stone-400">PRINCIPLE 01</div>
              <h4 className="font-serif text-xl">Structural Honesty</h4>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">Exposing structural steel and board-formed concrete as primary aesthetic finishes.</p>
            </div>
            <div className="p-8 border border-stone-300 bg-white space-y-2">
              <div className="font-mono text-xs text-stone-400">PRINCIPLE 02</div>
              <h4 className="font-serif text-xl">Spatial Choreography</h4>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">Sequencing compression and expansion as visitors navigate through interior voids.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
