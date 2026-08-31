"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { RotateCcw, Palette, Image as ImageIcon, Menu, Link2 } from 'lucide-react';

interface ThemeEditorProps {
  content: WebsiteContent | null;
  onChangeField: (field: string, value: string) => void;
  onOpenMediaPicker: () => void;
  onResetSection: () => void;
}

export function ThemeEditor({ content, onChangeField, onOpenMediaPicker, onResetSection }: ThemeEditorProps) {
  const theme = content?.theme;

  const fontOptions = [
    { label: 'Inter (Clean Modern Sans)', value: 'Inter, sans-serif' },
    { label: 'Playfair Display (Executive Serif)', value: 'Playfair Display, serif' },
    { label: 'Outfit (SaaS Geometry)', value: 'Outfit, sans-serif' },
    { label: 'Cinzel (Luxury Classical)', value: 'Cinzel, serif' },
    { label: 'Roboto (Universal Sans)', value: 'Roboto, sans-serif' },
    { label: 'Fira Code (Developer Mono)', value: 'Fira Code, monospace' },
  ];

  return (
    <div className="space-y-5 font-sans text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-[#FA8373]" />
          <span className="text-xs font-bold text-white">Theme & Navbar Settings</span>
        </div>
        <button
          onClick={onResetSection}
          className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 hover:text-[#FA8373] transition-colors"
          title="Reset theme styling to saved database baseline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Theme</span>
        </button>
      </div>

      {/* Brand Logo & Header Setup */}
      <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <ImageIcon className="w-4 h-4 text-[#FA8373]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Navbar Logo & Brand Setup</span>
        </div>

        <FormField label="Brand / Company Name (Navbar Text)">
          <input
            type="text"
            placeholder="e.g. Apex Luxury Estate"
            value={theme?.brandName || ''}
            onChange={(e) => onChangeField('brandName', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          />
        </FormField>

        <FormField label="Navbar Brand Logo Image">
          <div className="space-y-2">
            {theme?.logoUrl ? (
              <div className="relative h-20 bg-[#0B0F17] border border-slate-700 rounded-xl overflow-hidden group flex items-center justify-center p-3">
                <img src={theme.logoUrl} alt="Brand Logo" className="max-h-full object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    onClick={onOpenMediaPicker}
                    className="px-3 py-1 bg-[#FA8373] text-[#0B0F17] rounded-lg text-xs font-bold shadow-md"
                  >
                    Replace Logo
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeField('logoUrl', '')}
                    className="px-3 py-1 bg-rose-950 text-rose-300 rounded-lg text-xs font-bold border border-rose-800/40 shadow-md"
                  >
                    Remove Logo
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenMediaPicker}
                className="w-full py-3.5 border-2 border-dashed border-slate-700 hover:border-[#FA8373] rounded-xl flex items-center justify-center space-x-2 text-slate-400 hover:text-white transition-all bg-[#0B0F17]"
              >
                <ImageIcon className="w-4 h-4 text-[#FA8373]" />
                <span className="text-xs font-semibold">Upload / Select Brand Logo</span>
              </button>
            )}
          </div>
        </FormField>
      </div>

      {/* Editable Navbar Navigation Link Texts */}
      <div className="p-4 bg-[#0F172A] border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <Menu className="w-4 h-4 text-[#FA8373]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Navbar Navigation Menu Links</span>
        </div>

        <div className="space-y-3">
          <FormField label="Navbar Link 1 Text (Hero)">
            <input
              type="text"
              placeholder="Home"
              value={theme?.navLink1Text || ''}
              onChange={(e) => onChangeField('navLink1Text', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>

          <FormField label="Navbar Link 2 Text (About)">
            <input
              type="text"
              placeholder="About Us"
              value={theme?.navLink2Text || ''}
              onChange={(e) => onChangeField('navLink2Text', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>

          <FormField label="Navbar Link 3 Text (Services)">
            <input
              type="text"
              placeholder="Services"
              value={theme?.navLink3Text || ''}
              onChange={(e) => onChangeField('navLink3Text', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>

          <FormField label="Navbar Link 4 Text (Gallery / Portfolio)">
            <input
              type="text"
              placeholder="Portfolio"
              value={theme?.navLink4Text || ''}
              onChange={(e) => onChangeField('navLink4Text', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>

          <FormField label="Navbar Link 5 Text (Testimonials / Reviews)">
            <input
              type="text"
              placeholder="Reviews"
              value={theme?.navLink5Text || ''}
              onChange={(e) => onChangeField('navLink5Text', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>

          <FormField label="Navbar Link 6 Text (Contact)">
            <input
              type="text"
              placeholder="Contact Us"
              value={theme?.navLink6Text || ''}
              onChange={(e) => onChangeField('navLink6Text', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-3">
          <FormField label="Navbar Action Button CTA Text">
            <input
              type="text"
              placeholder="e.g. GET STARTED"
              value={theme?.navCtaText || ''}
              onChange={(e) => onChangeField('navCtaText', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
            />
          </FormField>

          <FormField label="Navbar Action Button URL Target">
            <input
              type="text"
              placeholder="#contact"
              value={theme?.navCtaUrl || ''}
              onChange={(e) => onChangeField('navCtaUrl', e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] font-mono text-slate-300"
            />
          </FormField>
        </div>
      </div>

      {/* 1. Primary Brand Color */}
      <FormField label="Primary Brand Color">
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={theme?.primaryColor || '#075C45'}
            onChange={(e) => onChangeField('primaryColor', e.target.value)}
            className="w-10 h-10 rounded-xl border border-slate-700 bg-[#0F172A] cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={theme?.primaryColor || '#075C45'}
            onChange={(e) => onChangeField('primaryColor', e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-[#FA8373]"
          />
        </div>
      </FormField>

      {/* 2. Secondary Color */}
      <FormField label="Secondary Accent Color">
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={theme?.secondaryColor || '#FA8373'}
            onChange={(e) => onChangeField('secondaryColor', e.target.value)}
            className="w-10 h-10 rounded-xl border border-slate-700 bg-[#0F172A] cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={theme?.secondaryColor || '#FA8373'}
            onChange={(e) => onChangeField('secondaryColor', e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-[#FA8373]"
          />
        </div>
      </FormField>

      {/* 3. Background Color */}
      <FormField label="Canvas Background Color">
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={theme?.backgroundColor || '#0F1412'}
            onChange={(e) => onChangeField('backgroundColor', e.target.value)}
            className="w-10 h-10 rounded-xl border border-slate-700 bg-[#0F172A] cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={theme?.backgroundColor || '#0F1412'}
            onChange={(e) => onChangeField('backgroundColor', e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-[#FA8373]"
          />
        </div>
      </FormField>

      {/* 4. Text Color */}
      <FormField label="Text Typography Color">
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={theme?.textColor || '#F3F4F6'}
            onChange={(e) => onChangeField('textColor', e.target.value)}
            className="w-10 h-10 rounded-xl border border-slate-700 bg-[#0F172A] cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={theme?.textColor || '#F3F4F6'}
            onChange={(e) => onChangeField('textColor', e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-[#FA8373]"
          />
        </div>
      </FormField>

      {/* 5. Heading Typography Selection */}
      <FormField label="Heading Typography Font">
        <select
          value={theme?.headingFont || 'Playfair Display, serif'}
          onChange={(e) => onChangeField('headingFont', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
        >
          {fontOptions.map((f) => (
            <option key={`heading-${f.value}`} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </FormField>

      {/* 6. Body Typography Selection */}
      <FormField label="Body Text Typography Font">
        <select
          value={theme?.bodyFont || 'Inter, sans-serif'}
          onChange={(e) => onChangeField('bodyFont', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
        >
          {fontOptions.map((f) => (
            <option key={`body-${f.value}`} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}
