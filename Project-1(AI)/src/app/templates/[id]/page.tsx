"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TemplateRenderer } from '@/components/TemplateRenderer';
import { resolveTemplateDefinition } from '@/templates';
import { createWebsiteApi } from '@/api/websites';
import { getClientsApi } from '@/api/clients';
import {
  ArrowLeft,
  Crown,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Loader2,
  Sparkles,
  Palette,
  Layers,
} from 'lucide-react';

export default function SingleTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const targetId = params.id.toLowerCase();
  const mockTemplateObj = { id: targetId, slug: targetId, templateKey: targetId };

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isCreating, setIsCreating] = useState(false);

  const definition = resolveTemplateDefinition(undefined, mockTemplateObj);

  if (!definition) {
    return (
      <div className="min-h-screen bg-[#0F1412] flex items-center justify-center p-6 text-stone-100 font-sans">
        <div className="max-w-md w-full bg-[#161C19] border border-stone-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-[#C9A45C]">Template Not Found</h2>
          <p className="text-xs text-stone-400">The template key &apos;{targetId}&apos; could not be resolved in the Template Registry.</p>
          <Link href="/templates" className="inline-block px-4 py-2 bg-[#075C45] text-stone-100 text-xs font-semibold rounded-xl">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const { config } = definition;

  const handleCreateWebsiteFromTemplate = async () => {
    setIsCreating(true);
    try {
      let targetClientId = '';
      const clientsRes = await getClientsApi({ limit: 1 });
      if (clientsRes.success && clientsRes.data?.items?.[0]) {
        targetClientId = clientsRes.data.items[0].id;
      }

      const siteName = `${config.name} Site`;
      const slug = siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'my-website';
      const webRes = await createWebsiteApi({
        clientId: targetClientId,
        name: siteName,
        slug,
        templateId: config.id || config.slug,
        isPublished: false,
        status: 'DRAFT',
      });

      if (webRes && webRes.data) {
        router.push(`/websites/${webRes.data.id}/builder`);
      }
    } catch (err) {
      console.error('Failed to create website:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const viewportContainerClasses = {
    desktop: 'w-full min-h-screen',
    tablet: 'max-w-[768px] my-8 rounded-3xl overflow-hidden shadow-2xl border border-stone-800',
    mobile: 'max-w-[375px] my-8 rounded-3xl overflow-hidden shadow-2xl border border-stone-800',
  };

  return (
    <div className="min-h-screen bg-[#0F1412] flex flex-col font-sans">
      {/* Top Interactive Toolbar */}
      <header className="sticky top-0 z-50 h-16 bg-[#0F1412]/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between font-sans">
        <div className="flex items-center space-x-3">
          <Link
            href="/templates"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A45C]" />
            <span className="hidden sm:inline">Templates Marketplace</span>
          </Link>
          <div className="hidden sm:block border-r border-stone-800 h-5" />
          <span className="text-xs font-bold text-white font-serif">{config.name}</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#075C45]/40 text-[#C9A45C] border border-[#C9A45C]/30 hidden md:inline">
            {config.category}
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="hidden sm:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1 space-x-1 shadow-inner">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'desktop' ? 'bg-[#075C45] text-[#C9A45C]' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'tablet' ? 'bg-[#075C45] text-[#C9A45C]' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile' ? 'bg-[#075C45] text-[#C9A45C]' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* CTA Use Template */}
        <button
          disabled={isCreating}
          onClick={handleCreateWebsiteFromTemplate}
          className="px-4 py-2 rounded-xl bg-[#075C45] hover:bg-[#064e3b] text-white text-xs font-bold transition-all shadow-lg flex items-center space-x-1.5 disabled:opacity-50"
          style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}
        >
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>{isCreating ? 'Creating Site...' : 'Use This Template'}</span>
        </button>
      </header>

      {/* Main Canvas Viewport Container */}
      <main className="flex-1 flex justify-center bg-[#090C0B] overflow-y-auto">
        <div className={viewportContainerClasses[viewport]}>
          <TemplateRenderer template={mockTemplateObj} content={config.defaultContent as any} />
        </div>
      </main>
    </div>
  );
}
