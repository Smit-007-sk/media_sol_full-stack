"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getWebsitesApi, getWebsiteApi, Website } from '@/api/websites';
import { fetchWebsiteFullContent, WebsiteContent } from '@/api/content';
import { getPublicGeneratedWebsiteApi } from '@/api/websiteRequests';
import { TemplateRenderer } from '@/components/TemplateRenderer';
import { Loader2, AlertCircle, Lock, ArchiveX, ShieldAlert } from 'lucide-react';

interface GeneratedSiteData {
  slug: string;
  businessName: string;
  category: string;
  html: string;
  css: string;
  javascript: string;
  publishedAt?: string | null;
}

import { assemblePublishedDocument } from '@/utils/documentAssembler';

export default function PublicWebsitePage() {
  const params = useParams();
  const slugOrId = (params.slug as string) || '';

  const [generatedSite, setGeneratedSite] = useState<GeneratedSiteData | null>(null);
  const [website, setWebsite] = useState<Website | null>(null);
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPublicWebsite = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedSite(null);
    setWebsite(null);

    try {
      // 1. Check if there is a published GeneratedWebsite with this slug
      try {
        const genRes = await getPublicGeneratedWebsiteApi(slugOrId);
        if (genRes.success && genRes.data) {
          setGeneratedSite(genRes.data);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to legacy website CMS lookup
      }

      let targetWebsite: Website | null = null;

      // 2. Try fetching legacy website directly by ID
      try {
        const directRes = await getWebsiteApi(slugOrId);
        if (directRes.success && directRes.data) {
          targetWebsite = directRes.data;
        }
      } catch (e) {
        // Ignore direct ID lookup failure and fallback to slug search
      }

      // 3. Search legacy website by slug or ID if direct fetch didn't return
      if (!targetWebsite) {
        const listRes = await getWebsitesApi({ limit: 100 });
        if (listRes.success && listRes.data?.items) {
          const matched = listRes.data.items.find(
            (w) =>
              w.slug?.toLowerCase() === slugOrId.toLowerCase() ||
              w.id?.toLowerCase() === slugOrId.toLowerCase(),
          );
          if (matched) {
            targetWebsite = matched;
          }
        }
      }

      if (!targetWebsite) {
        setError('404');
        setIsLoading(false);
        return;
      }

      setWebsite(targetWebsite);

      // 4. Fetch Full Website Content if published
      if (targetWebsite.isPublished && targetWebsite.status === 'PUBLISHED') {
        const fullContent = await fetchWebsiteFullContent(targetWebsite.id);
        setContent(fullContent);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load public website');
    } finally {
      setIsLoading(false);
    }
  }, [slugOrId]);

  useEffect(() => {
    loadPublicWebsite();
  }, [loadPublicWebsite]);

  useEffect(() => {
    if (generatedSite?.businessName) {
      document.title = `${generatedSite.businessName} | Official Website`;
    } else if (content?.theme?.seoTitle || website?.name) {
      document.title = content?.theme?.seoTitle || `${website?.name} | Official Website`;
    }
  }, [generatedSite, content, website]);

  const compiledGeneratedDoc = useMemo(() => {
    if (!generatedSite) return '';
    return assemblePublishedDocument(
      generatedSite.html,
      generatedSite.css,
      generatedSite.javascript,
      generatedSite.businessName
    );
  }, [generatedSite]);


  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090C0B] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[#C9A45C] animate-spin" />
        <p className="text-xs text-stone-400 font-mono tracking-wide">Loading Website Experience...</p>
      </div>
    );
  }

  // 1. Render Published Generated Static Website
  if (generatedSite) {
    return (
      <div className="w-full min-h-screen bg-white">
        <iframe
          title={generatedSite.businessName}
          sandbox="allow-scripts allow-forms"
          srcDoc={compiledGeneratedDoc}
          className="fixed inset-0 w-full h-full border-0 bg-white"
        />
      </div>
    );
  }

  // 404 Not Found State
  if (error === '404' || !website) {
    return (
      <div className="min-h-screen bg-[#0F1412] flex items-center justify-center p-6 text-stone-100 font-sans">
        <div className="max-w-md w-full bg-[#161C19] border border-stone-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/50 border border-rose-800/40 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold font-serif text-stone-100">404 — Website Not Found</h1>
            <p className="text-xs text-stone-400">
              The requested website identifier <span className="font-mono text-[#C9A45C]">/{slugOrId}</span> does not exist or has been removed.
            </p>
          </div>
          <div className="pt-2 border-t border-stone-800 text-[11px] font-mono text-stone-500">
            Emperor Media Solution Public Engine
          </div>
        </div>
      </div>
    );
  }

  // Archived Website State
  if (website.status === 'ARCHIVED') {
    return (
      <div className="min-h-screen bg-[#0F1412] flex items-center justify-center p-6 text-stone-100 font-sans">
        <div className="max-w-md w-full bg-[#161C19] border border-stone-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/50 border border-amber-800/40 text-amber-400 flex items-center justify-center mx-auto">
            <ArchiveX className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold font-serif text-stone-100">Website Offline</h1>
            <p className="text-xs text-stone-400">
              <strong className="text-stone-200">{website.name}</strong> has been archived and is currently offline.
            </p>
          </div>
          <div className="pt-2 border-t border-stone-800 text-[11px] font-mono text-stone-500">
            Emperor Media Solution Public Engine
          </div>
        </div>
      </div>
    );
  }

  // Draft / Unpublished Website State
  if (!website.isPublished || website.status === 'DRAFT') {
    return (
      <div className="min-h-screen bg-[#0F1412] flex items-center justify-center p-6 text-stone-100 font-sans">
        <div className="max-w-md w-full bg-[#161C19] border border-stone-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#075C45]/30 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A45C] bg-[#075C45]/40 px-2.5 py-1 rounded-full border border-[#C9A45C]/20 inline-block">
              Draft Mode
            </span>
            <h1 className="text-xl font-bold font-serif text-stone-100">{website.name}</h1>
            <p className="text-xs text-stone-400 leading-relaxed">
              This website is currently under construction and has not been published yet. Please check back later.
            </p>
          </div>
          <div className="pt-3 border-t border-stone-800 text-[11px] font-mono text-stone-500">
            Emperor Media Solution Public Engine
          </div>
        </div>
      </div>
    );
  }

  // Fully Published Public Website UI (Pure Template, No Admin Wrappers)
  return (
    <main className="w-full min-h-screen">
      <TemplateRenderer website={website} template={website.template} content={content} />
    </main>
  );
}

