"use client";

import React from 'react';
import { Website } from '@/api/websites';
import { WebsiteContent } from '@/api/content';
import { TemplateRenderer } from '@/components/TemplateRenderer';
import { ViewportType } from './BuilderToolbar';
import { Minimize2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface LivePreviewProps {
  website: Website;
  content: WebsiteContent | null;
  viewport: ViewportType;
  isFullscreen: boolean;
  onExitFullscreen: () => void;
}

export function LivePreview({
  website,
  content,
  viewport,
  isFullscreen,
  onExitFullscreen,
}: LivePreviewProps) {
  const frameBg = content?.theme?.backgroundColor || '#0F1412';

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[200] w-screen h-screen bg-black flex flex-col font-sans overflow-hidden animate-fadeIn">
        {/* Floating Exit Bar */}
        <div className="fixed top-4 right-6 z-50 flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 shadow-2xl">
          <span className="text-xs font-bold text-white">{website.name} (Fullscreen Preview)</span>
          <button
            onClick={onExitFullscreen}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FA8373] hover:bg-[#E86B5A] text-[#0B0F17] text-xs font-black rounded-xl border border-[#FA8373]/30 shadow-md transition-all"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Fullscreen</span>
          </button>
        </div>

        {/* Fullscreen Canvas */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: frameBg }}>
          <TemplateRenderer
            website={website}
            template={website.template}
            content={content}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 bg-stone-950 flex flex-col items-center justify-start p-2 sm:p-3 overflow-y-auto relative min-h-0 font-sans">
      {/* Viewport Frame Container */}
      <div
        style={{ backgroundColor: frameBg }}
        className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-slate-800 flex flex-col my-auto ${
          viewport === 'desktop'
            ? 'w-full max-w-7xl min-h-[750px]'
            : viewport === 'tablet'
            ? 'w-[768px] min-h-[800px]'
            : 'w-[375px] min-h-[667px]'
        }`}
      >
        {/* Viewport Header Bar */}
        <div className="bg-[#0F172A] text-slate-300 text-[11px] font-mono px-3.5 py-1.5 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-400 text-[10px] truncate max-w-xs">
              https://emperormedia.test/site/{website.slug}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[#FA8373] text-[10px] font-bold">LIVE SYNC ACTIVE</span>
            <Link
              href={`/site/${website.slug || website.id}`}
              target="_blank"
              className="text-slate-400 hover:text-white transition-colors"
              title="Open Public Route"
            >
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Live Template Renderer Canvas */}
        <div className="flex-1 overflow-y-auto">
          <TemplateRenderer
            website={website}
            template={website.template}
            content={content}
          />
        </div>
      </div>
    </main>
  );
}
