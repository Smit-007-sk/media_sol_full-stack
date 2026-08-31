"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getWebsiteApi, Website } from '@/api/websites';
import { fetchWebsiteFullContent, WebsiteContent } from '@/api/content';
import { TemplateRenderer } from '@/components/TemplateRenderer';
import { StatusBadge } from '@/components/admin/StatusBadge';
import {
  ArrowLeft,
  Loader2,
  Globe,
  RefreshCw,
  AlertTriangle,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export default function WebsiteLivePreviewPage() {
  const params = useParams();
  const websiteId = params.websiteId as string;

  const [website, setWebsite] = useState<Website | null>(null);
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);
    try {
      const [siteRes, fullContent] = await Promise.all([
        getWebsiteApi(websiteId),
        fetchWebsiteFullContent(websiteId),
      ]);
      if (siteRes.success) {
        setWebsite(siteRes.data);
      }
      setContent(fullContent);
    } catch (err: any) {
      setError(err.message || 'Failed to load website preview');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [websiteId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1412] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[#C9A45C] animate-spin" />
        <p className="text-xs text-stone-300 font-mono">Fetching latest website content & template...</p>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen bg-[#0F1412] flex items-center justify-center p-6">
        <div className="p-8 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-center space-y-4 max-w-lg">
          <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-stone-100">Preview Failed to Load</h3>
          <p className="text-xs text-stone-400">{error || 'Website not found'}</p>
          <Link
            href={`/websites/${websiteId}`}
            className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Content Workspace</span>
          </Link>
        </div>
      </div>
    );
  }

  const getViewportContainerClass = () => {
    switch (deviceMode) {
      case 'tablet':
        return 'w-[768px] mx-auto my-6 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden bg-black transition-all duration-300 min-h-[900px]';
      case 'mobile':
        return 'w-[375px] mx-auto my-6 border-8 border-stone-800 rounded-[40px] shadow-2xl overflow-hidden bg-black transition-all duration-300 min-h-[750px]';
      case 'desktop':
      default:
        return 'w-full min-h-screen transition-all duration-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#090C0B] flex flex-col">
      {/* Sticky Top Admin Live Preview Toolbar */}
      <div className="sticky top-0 z-50 h-14 bg-[#0F1412]/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        {/* Left: Back Link & Site Name */}
        <div className="flex items-center space-x-3">
          <Link
            href={`/websites/${websiteId}`}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Workspace</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 border-l border-stone-800 pl-3">
            <Globe className="w-4 h-4 text-[#C9A45C]" />
            <span className="text-xs font-bold text-stone-100">{website.name}</span>
            <span className="text-[10px] font-mono text-[#C9A45C]">/{website.slug}</span>
          </div>
        </div>

        {/* Center: Device Viewport Controls */}
        <div className="flex items-center bg-stone-900 border border-stone-800 p-1 rounded-xl space-x-1">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              deviceMode === 'desktop'
                ? 'bg-[#075C45] text-[#C9A45C] font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              deviceMode === 'tablet'
                ? 'bg-[#075C45] text-[#C9A45C] font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              deviceMode === 'mobile'
                ? 'bg-[#075C45] text-[#C9A45C] font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex items-center space-x-2 mr-2">
            <StatusBadge status={website.status} />
            <StatusBadge status={website.isPublished ? 'PUBLISHED' : 'DRAFT'} />
          </div>

          <Link
            href={`/site/${website.slug || website.id}`}
            target="_blank"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 text-emerald-300 text-xs font-semibold transition-colors"
            title="Open Live Website in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 text-xs font-semibold transition-colors disabled:opacity-50"
            title="Re-fetch latest content from backend"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#C9A45C] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto p-0 sm:p-4 flex items-start justify-center">
        <div className={getViewportContainerClass()}>
          <TemplateRenderer website={website} template={website.template} content={content} />
        </div>
      </div>
    </div>
  );
}
