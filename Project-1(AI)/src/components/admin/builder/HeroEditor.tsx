"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { Image as ImageIcon, RotateCcw } from 'lucide-react';

interface HeroEditorProps {
  content: WebsiteContent | null;
  onChangeField: (field: string, value: string) => void;
  onOpenMediaPicker: () => void;
  onResetSection: () => void;
}

export function HeroEditor({ content, onChangeField, onOpenMediaPicker, onResetSection }: HeroEditorProps) {
  const hero = content?.hero;
  const imageId = hero?.imageId || (hero as any)?.image?.url || (typeof (hero as any)?.image === 'string' ? (hero as any)?.image : null);

  return (
    <div className="space-y-4 font-sans text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <span className="text-xs font-bold text-white">Hero Section Content</span>
        <button
          onClick={onResetSection}
          className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 hover:text-[#FA8373] transition-colors"
          title="Reset section to saved database baseline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Section</span>
        </button>
      </div>

      <FormField label="Eyebrow Badge">
        <input
          type="text"
          placeholder="E.g. EMPEROR MEDIA SOLUTION"
          value={hero?.eyebrow || ''}
          onChange={(e) => onChangeField('eyebrow', e.target.value)}
          className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] transition-all"
        />
      </FormField>

      <FormField label="Headline Title">
        <textarea
          rows={2}
          placeholder="Main hero headline title..."
          value={hero?.title || ''}
          onChange={(e) => onChangeField('title', e.target.value)}
          className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] transition-all"
        />
      </FormField>

      <FormField label="Description Narrative">
        <textarea
          rows={3}
          placeholder="Hero section subtitle or narrative description..."
          value={hero?.description || ''}
          onChange={(e) => onChangeField('description', e.target.value)}
          className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] transition-all"
        />
      </FormField>

      {/* Primary CTA Fields - Stacked for full width and un-crammed readability */}
      <div className="space-y-3 p-3 bg-[#0F172A]/70 border border-slate-800 rounded-xl">
        <span className="text-[11px] font-bold text-[#FA8373] uppercase tracking-wider block">Primary Action Button</span>
        <FormField label="Primary CTA Label">
          <input
            type="text"
            placeholder="Explore Services"
            value={hero?.primaryButtonText || ''}
            onChange={(e) => onChangeField('primaryButtonText', e.target.value)}
            className="w-full px-3.5 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          />
        </FormField>
        <FormField label="Primary CTA URL Target">
          <input
            type="text"
            placeholder="#services"
            value={hero?.primaryButtonUrl || ''}
            onChange={(e) => onChangeField('primaryButtonUrl', e.target.value)}
            className="w-full px-3.5 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] font-mono text-slate-300"
          />
        </FormField>
      </div>

      {/* Secondary CTA Fields */}
      <div className="space-y-3 p-3 bg-[#0F172A]/70 border border-slate-800 rounded-xl">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Secondary Action Button</span>
        <FormField label="Secondary CTA Label">
          <input
            type="text"
            placeholder="Contact Us"
            value={hero?.secondaryButtonText || ''}
            onChange={(e) => onChangeField('secondaryButtonText', e.target.value)}
            className="w-full px-3.5 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          />
        </FormField>
        <FormField label="Secondary CTA URL Target">
          <input
            type="text"
            placeholder="#contact"
            value={hero?.secondaryButtonUrl || ''}
            onChange={(e) => onChangeField('secondaryButtonUrl', e.target.value)}
            className="w-full px-3.5 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] font-mono text-slate-300"
          />
        </FormField>
      </div>

      {/* Hero Image Showcase */}
      <FormField label="Hero Showcase / Background Image">
        <div className="space-y-2">
          {imageId ? (
            <div className="relative aspect-video bg-[#0F172A] border border-slate-700 rounded-xl overflow-hidden group">
              <img src={imageId} alt="Hero showcase" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={onOpenMediaPicker}
                  className="px-3 py-1.5 bg-[#FA8373] text-[#0B0F17] rounded-lg text-xs font-bold shadow-md"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeField('imageId', '');
                    onChangeField('image', '' as any);
                  }}
                  className="px-3 py-1.5 bg-rose-950 text-rose-300 rounded-lg text-xs font-bold border border-rose-800/40 shadow-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenMediaPicker}
              className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-[#FA8373] rounded-xl flex flex-col items-center justify-center space-y-1.5 text-slate-400 hover:text-white transition-all bg-[#0F172A]"
            >
              <ImageIcon className="w-6 h-6 text-[#FA8373]" />
              <span className="text-xs font-semibold">Select from Media Library</span>
            </button>
          )}
        </div>
      </FormField>

      {/* Hero Background Image Opacity */}
      {imageId && (
        <FormField label="Background Image Opacity (Text Visibility)">
          <select
            value={(hero as any)?.bgOpacity || '0.25'}
            onChange={(e) => onChangeField('bgOpacity', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          >
            <option value="0.15">15% Opacity (Ultra Low - Sharp Text)</option>
            <option value="0.25">25% Opacity (Low Opacity - Recommended)</option>
            <option value="0.40">40% Opacity (Medium Contrast)</option>
            <option value="0.60">60% Opacity (High Visibility)</option>
            <option value="1.0">100% Opacity (Full Brightness)</option>
          </select>
        </FormField>
      )}
    </div>
  );
}
