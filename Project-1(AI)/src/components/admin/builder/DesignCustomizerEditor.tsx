"use client";

import React, { useState } from 'react';
import { WebsiteContent } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import {
  Palette,
  Layout,
  Maximize2,
  Box,
  MousePointer,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface DesignCustomizerEditorProps {
  content: WebsiteContent | null;
  onChangeThemeField: (field: string, value: string) => void;
  onApplyPreset: (presetName: string) => void;
  onResetDesignOnly: () => void;
}

export function DesignCustomizerEditor({
  content,
  onChangeThemeField,
  onApplyPreset,
  onResetDesignOnly,
}: DesignCustomizerEditorProps) {
  const theme = content?.theme;

  const [presetToApply, setPresetToApply] = useState<string | null>(null);
  const [isResetDesignModalOpen, setIsResetDesignModalOpen] = useState(false);

  const presetsList = [
    { id: 'luxury', name: 'Luxury Editorial', desc: 'Emerald luxury split hero, editorial typography, and spacious layout' },
    { id: 'modern', name: 'Modern Minimal', desc: 'Clean centered hero, minimal lists, and sharp geometric cards' },
    { id: 'corporate', name: 'Corporate Trust', desc: 'Structured left-aligned layout, bento grid services, and medium radius' },
    { id: 'creative', name: 'Creative Studio', desc: 'Vibrant asymmetric hero, masonry gallery, pill buttons, and large radius' },
    { id: 'hospitality', name: 'Cinematic Hospitality', desc: 'Full-bleed cinematic hero, large quote spotlight, and luxury spacing' },
    { id: 'executive', name: 'Executive Advisory', desc: 'Editorial hero, numbered lists, wide container, and formal solid buttons' },
  ];

  return (
    <div className="space-y-5 font-sans text-stone-200">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <span className="text-xs font-bold text-stone-300">Design System & Layout Variations</span>
        <button
          onClick={() => setIsResetDesignModalOpen(true)}
          className="flex items-center space-x-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
          title="Reset design styling without deleting section content"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Design</span>
        </button>
      </div>

      {/* 1. HERO LAYOUT VARIATION */}
      <FormField label="Hero Section Layout">
        <select
          value={theme?.heroLayout || 'split'}
          onChange={(e) => onChangeThemeField('heroLayout', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        >
          <option value="split">Split Two-Column (Text + Image)</option>
          <option value="centered">Centered Headline & Media</option>
          <option value="fullBleed">Full-Bleed Cinematic Hero</option>
          <option value="fullBleedBg">Full-Bleed Background Image (Low Opacity + Text Overlay)</option>
          <option value="editorial">Editorial Asymmetric</option>
          <option value="asymmetric">Asymmetric Layout</option>
        </select>
      </FormField>

      {/* 2. ABOUT LAYOUT VARIATION */}
      <FormField label="About Section Layout">
        <select
          value={theme?.aboutLayout || 'text-image'}
          onChange={(e) => onChangeThemeField('aboutLayout', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        >
          <option value="text-image">Text Left + Image Right</option>
          <option value="image-text">Image Left + Text Right</option>
          <option value="centered">Centered Editorial</option>
          <option value="fullBleedBg">Full-Bleed Background Image (Low Opacity + Text Overlay)</option>
          <option value="asymmetric">Split Asymmetric</option>
        </select>
      </FormField>

      {/* 3. SERVICES SECTION STYLING */}
      <FormField label="Services Presentation Style">
        <select
          value={theme?.servicesStyle || 'cards'}
          onChange={(e) => onChangeThemeField('servicesStyle', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        >
          <option value="cards">Elevated Feature Cards</option>
          <option value="minimal">Minimal List</option>
          <option value="bento">Bento Grid</option>
          <option value="carousel">Horizontal Scroller</option>
          <option value="numbered">Numbered Editorial</option>
        </select>
      </FormField>

      {/* 4. GALLERY PRESENTATION STYLE */}
      <FormField label="Gallery Layout Style">
        <select
          value={theme?.galleryStyle || (theme as any)?.galleryLayout || 'grid'}
          onChange={(e) => {
            onChangeThemeField('galleryStyle', e.target.value);
            onChangeThemeField('galleryLayout', e.target.value);
          }}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        >
          <option value="grid">Responsive Equal Grid</option>
          <option value="masonry">Dynamic Masonry Layout</option>
          <option value="asymmetric">Editorial Asymmetric</option>
          <option value="fullBleed">Full Bleed Edge-to-Edge</option>
          <option value="horizontal">Horizontal Showcase</option>
        </select>
      </FormField>

      {/* 5. TESTIMONIALS STYLE */}
      <FormField label="Testimonials Presentation">
        <select
          value={theme?.testimonialsStyle || 'cards'}
          onChange={(e) => onChangeThemeField('testimonialsStyle', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        >
          <option value="cards">Individual Client Cards</option>
          <option value="quote">Large Quote Spotlight</option>
          <option value="editorial">Editorial Quotes</option>
          <option value="carousel">Interactive Carousel</option>
          <option value="split">Split Testimonial</option>
        </select>
      </FormField>

      {/* 6. GLOBAL SPACING & CONTAINER WIDTH */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Section Spacing">
          <select
            value={theme?.sectionSpacing || 'comfortable'}
            onChange={(e) => onChangeThemeField('sectionSpacing', e.target.value)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none"
          >
            <option value="compact">Compact (py-12)</option>
            <option value="comfortable">Comfortable (py-20)</option>
            <option value="spacious">Spacious (py-28)</option>
            <option value="luxury">Luxury (py-36)</option>
          </select>
        </FormField>

        <FormField label="Container Width">
          <select
            value={theme?.containerWidth || 'standard'}
            onChange={(e) => onChangeThemeField('containerWidth', e.target.value)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none"
          >
            <option value="compact">Compact (max-w-4xl)</option>
            <option value="standard">Standard (max-w-6xl)</option>
            <option value="wide">Wide (max-w-7xl)</option>
            <option value="full">Full Width (100%)</option>
          </select>
        </FormField>
      </div>

      {/* 7. GLOBAL BORDER RADIUS */}
      <FormField label="Global Corner Radius">
        <select
          value={theme?.borderRadius || (theme as any)?.cornerRadius || 'medium'}
          onChange={(e) => {
            onChangeThemeField('borderRadius', e.target.value);
            onChangeThemeField('cornerRadius', e.target.value);
          }}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        >
          <option value="none">Square / Sharp Corners (0px)</option>
          <option value="small">Small Radius (4px)</option>
          <option value="medium">Medium Rounded (8px)</option>
          <option value="large">Large Curved (16px)</option>
          <option value="pill">Full Pill Radius (9999px)</option>
        </select>
      </FormField>

      {/* 8. BUTTON STYLING */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Button Style">
          <select
            value={theme?.buttonStyle || 'solid'}
            onChange={(e) => onChangeThemeField('buttonStyle', e.target.value)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none"
          >
            <option value="solid">Solid Filled</option>
            <option value="outline">Outline Border</option>
            <option value="ghost">Ghost Glass</option>
            <option value="pill">Pill Shape</option>
            <option value="editorial">Editorial CTA</option>
          </select>
        </FormField>

        <FormField label="Button Size">
          <select
            value={theme?.buttonSize || 'medium'}
            onChange={(e) => onChangeThemeField('buttonSize', e.target.value)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none"
          >
            <option value="small">Small (sm)</option>
            <option value="medium">Medium (md)</option>
            <option value="large">Large (lg)</option>
          </select>
        </FormField>
      </div>

      {/* 9. DESIGN PRESETS */}
      <div className="pt-3 border-t border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#C9A45C] uppercase tracking-wider">Curated Design Presets</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presetsList.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setPresetToApply(preset.id)}
              className="p-3 bg-[#161C19] hover:bg-[#1c2420] border border-stone-800 hover:border-[#075C45] rounded-xl text-left transition-all group"
            >
              <h4 className="text-xs font-bold text-stone-200 group-hover:text-[#C9A45C]">{preset.name}</h4>
              <p className="text-[10px] text-stone-400 mt-0.5">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* PRESET CONFIRMATION MODAL */}
      <ConfirmDialog
        isOpen={!!presetToApply}
        onClose={() => setPresetToApply(null)}
        onConfirm={() => {
          if (presetToApply) {
            onApplyPreset(presetToApply);
            setPresetToApply(null);
          }
        }}
        title="Apply Design Preset?"
        message={`Applying the "${presetsList.find((p) => p.id === presetToApply)?.name}" preset will update your colors, typography, border radius, and spacing controls. Your section content will remain intact.`}
        confirmText="Apply Preset"
        isDanger={false}
      />

      {/* RESET DESIGN CONFIRMATION MODAL */}
      <ConfirmDialog
        isOpen={isResetDesignModalOpen}
        onClose={() => setIsResetDesignModalOpen(false)}
        onConfirm={() => {
          onResetDesignOnly();
          setIsResetDesignModalOpen(false);
        }}
        title="Reset Design Configuration?"
        message="Are you sure you want to reset all styling, layout variations, fonts, colors, and button styles to default template settings? Your content data (Services, Hero text, Testimonials, Media) will NOT be deleted."
        confirmText="Reset Design"
        isDanger={true}
      />
    </div>
  );
}
