"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { Search, Globe, Share2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';

interface SeoEditorProps {
  content: WebsiteContent | null;
  slug: string;
  websiteName: string;
  onChangeThemeField: (field: string, value: string) => void;
  onOpenMediaPickerForSeo: (field: 'ogImage' | 'twitterImage' | 'faviconUrl') => void;
}

export function SeoEditor({
  content,
  slug,
  websiteName,
  onChangeThemeField,
  onOpenMediaPickerForSeo,
}: SeoEditorProps) {
  const theme = content?.theme;

  const seoTitle = theme?.seoTitle || `${websiteName} | Official Website`;
  const seoDescription =
    theme?.seoDescription ||
    'Professional corporate digital solutions and executive consulting services provided by Emperor Media Solution platform.';
  const faviconUrl = theme?.faviconUrl;
  const ogImage = theme?.ogImage || theme?.faviconUrl || content?.hero?.imageId;

  const descLength = seoDescription.length;
  const isDescTooLong = descLength > 160;

  return (
    <div className="space-y-5 font-sans text-stone-200">
      <div className="border-b border-stone-800 pb-2.5">
        <h3 className="text-xs font-bold text-stone-300">SEO & Metadata Optimization</h3>
        <p className="text-[11px] text-stone-400 mt-0.5">Optimize search rankings & social sharing cards</p>
      </div>

      {/* 1. GOOGLE SEARCH PREVIEW */}
      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-2 shadow-inner">
        <div className="flex items-center space-x-2 text-[#C9A45C] text-xs font-bold uppercase tracking-wider">
          <Search className="w-3.5 h-3.5" />
          <span>Google Search Snippet Preview</span>
        </div>
        <div className="p-3 bg-[#121614] rounded-lg space-y-1 font-sans">
          <p className="text-sm font-semibold text-blue-400 hover:underline truncate cursor-pointer">
            {seoTitle}
          </p>
          <p className="text-xs font-mono text-emerald-400 truncate">
            https://emperormedia.test/site/{slug || 'my-company'}
          </p>
          <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
            {seoDescription}
          </p>
        </div>
      </div>

      {/* 2. SEO PAGE TITLE */}
      <FormField label="SEO Page Title">
        <input
          type="text"
          placeholder="E.g. Acme Corp | Premium Enterprise Solutions"
          value={theme?.seoTitle || ''}
          onChange={(e) => onChangeThemeField('seoTitle', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
        />
      </FormField>

      {/* 3. META DESCRIPTION WITH COUNTER */}
      <FormField label="Meta Description">
        <div className="space-y-1">
          <textarea
            rows={3}
            placeholder="Compelling 150-160 character description of your business..."
            value={theme?.seoDescription || ''}
            onChange={(e) => onChangeThemeField('seoDescription', e.target.value)}
            className={`w-full px-3.5 py-2.5 bg-[#161C19] border rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45] ${
              isDescTooLong ? 'border-amber-500/80 focus:border-amber-400' : 'border-stone-700'
            }`}
          />
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className={isDescTooLong ? 'text-amber-400 flex items-center space-x-1' : 'text-stone-400'}>
              {isDescTooLong && <AlertTriangle className="w-3 h-3 text-amber-400" />}
              <span>{isDescTooLong ? 'Exceeds 160 characters (search engines may truncate)' : 'Recommended length: 140–160 chars'}</span>
            </span>
            <span className={`font-semibold ${isDescTooLong ? 'text-amber-400' : 'text-stone-300'}`}>
              {descLength} / 160
            </span>
          </div>
        </div>
      </FormField>

      {/* 4. KEYWORDS & CANONICAL URL */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Target Keywords">
          <input
            type="text"
            placeholder="corporate, digital, solutions"
            value={theme?.keywords || ''}
            onChange={(e) => onChangeThemeField('keywords', e.target.value)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Canonical URL">
          <input
            type="url"
            placeholder="https://mycompany.com"
            value={theme?.canonicalUrl || ''}
            onChange={(e) => onChangeThemeField('canonicalUrl', e.target.value)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs font-mono text-stone-100 outline-none"
          />
        </FormField>
      </div>

      {/* 5. FAVICON MANAGEMENT */}
      <FormField label="Website Favicon Icon">
        <div className="flex items-center space-x-3 p-3 bg-[#161C19] border border-stone-800 rounded-xl">
          {faviconUrl ? (
            <img src={faviconUrl} alt="Favicon" className="w-8 h-8 rounded-lg object-contain bg-stone-900 border border-stone-700" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-500">
              <Globe className="w-4 h-4" />
            </div>
          )}
          <div className="flex-1 truncate">
            <p className="text-xs font-semibold text-stone-200">Browser Favicon</p>
            <p className="text-[10px] text-stone-400 truncate">{faviconUrl ? 'Custom Icon Configured' : 'Default Platform Icon'}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenMediaPickerForSeo('faviconUrl')}
            className="px-3 py-1.5 bg-[#075C45] text-[#C9A45C] text-xs font-semibold rounded-lg border border-[#C9A45C]/30 shrink-0"
          >
            Select Icon
          </button>
        </div>
      </FormField>

      {/* 6. SOCIAL SHARE PREVIEW */}
      <div className="pt-3 border-t border-stone-800 space-y-3">
        <div className="flex items-center space-x-2 text-[#C9A45C] text-xs font-bold uppercase tracking-wider">
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Share Card Preview (Open Graph)</span>
        </div>

        <div className="max-w-sm bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-lg mx-auto">
          {ogImage ? (
            <img src={ogImage} alt="Social share banner" className="w-full h-36 object-cover" />
          ) : (
            <div className="w-full h-36 bg-stone-950 flex flex-col items-center justify-center text-stone-600 space-y-1">
              <ImageIcon className="w-8 h-8" />
              <span className="text-[10px]">No Open Graph Image</span>
            </div>
          )}
          <div className="p-3 space-y-1 bg-[#121614]">
            <p className="text-[10px] font-mono text-stone-400 uppercase">emperormedia.test</p>
            <h4 className="text-xs font-bold text-stone-100 truncate">{theme?.ogTitle || seoTitle}</h4>
            <p className="text-[11px] text-stone-400 line-clamp-2">{theme?.ogDescription || seoDescription}</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenMediaPickerForSeo('ogImage')}
            className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-[#C9A45C] text-xs font-semibold rounded-xl border border-stone-700 flex items-center space-x-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Select OG Share Image</span>
          </button>
        </div>
      </div>
    </div>
  );
}
