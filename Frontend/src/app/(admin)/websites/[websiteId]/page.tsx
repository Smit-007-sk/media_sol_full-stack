"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWebsiteApi, updateWebsiteApi, Website } from '@/api/websites';
import {
  getThemeApi, createThemeApi, updateThemeApi, deleteThemeApi, Theme,
  getHeroApi, createHeroApi, updateHeroApi, deleteHeroApi, Hero,
  getAboutApi, createAboutApi, updateAboutApi, deleteAboutApi, About,
  getContactApi, createContactApi, updateContactApi, deleteContactApi, Contact,
  getServicesApi, createServiceApi, updateServiceApi, deleteServiceApi, ServiceItem,
  getGalleriesApi, createGalleryApi, updateGalleryApi, deleteGalleryApi, Gallery,
  getGalleryItemsApi, createGalleryItemApi, updateGalleryItemApi, deleteGalleryItemApi, GalleryItem,
  getTestimonialsApi, createTestimonialApi, updateTestimonialApi, deleteTestimonialApi, Testimonial,
  getSocialLinksApi, createSocialLinkApi, updateSocialLinkApi, deleteSocialLinkApi, SocialLink, SocialPlatform,
  getMediaApi, createMediaApi, updateMediaApi, deleteMediaApi, MediaItem, MediaType,
  fetchWebsiteFullContent, WebsiteContent,
} from '@/api/content';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormField } from '@/components/admin/FormField';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import {
  Palette,
  Sparkles,
  Info,
  PhoneCall,
  Briefcase,
  Images,
  MessageSquareQuote,
  Share2,
  Image as ImageIcon,
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  Edit2,
  Loader2,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

type TabType =
  | 'overview'
  | 'theme'
  | 'hero'
  | 'about'
  | 'contact'
  | 'services'
  | 'gallery'
  | 'testimonials'
  | 'social-links'
  | 'media';

export default function WebsiteWorkspacePage() {
  const params = useParams();
  const websiteId = params.websiteId as string;
  const router = useRouter();
  const { isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [website, setWebsite] = useState<Website | null>(null);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message, title }]);
  };

  const fetchWebsiteData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [res, fullContent] = await Promise.all([
        getWebsiteApi(websiteId),
        fetchWebsiteFullContent(websiteId),
      ]);
      if (res.success) {
        setWebsite(res.data);
      }
      setWebsiteContent(fullContent);
    } catch (err: any) {
      setError(err.message || 'Failed to load website details');
    } finally {
      setIsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchWebsiteData();
  }, [fetchWebsiteData]);

  const refreshContent = async () => {
    try {
      const fullContent = await fetchWebsiteFullContent(websiteId);
      setWebsiteContent(fullContent);
    } catch (err) {
      console.error('Failed to refresh website content:', err);
    }
  };

  const [isPublishingModalOpen, setIsPublishingModalOpen] = useState(false);
  const [isUnpublishingModalOpen, setIsUnpublishingModalOpen] = useState(false);
  const [isTogglePublishing, setIsTogglePublishing] = useState(false);

  const handleTogglePublish = async (shouldPublish: boolean) => {
    setIsTogglePublishing(true);
    try {
      const res = await updateWebsiteApi(websiteId, {
        isPublished: shouldPublish,
        status: shouldPublish ? 'PUBLISHED' : 'DRAFT',
      });
      if (res.success && res.data) {
        setWebsite(res.data);
        addToast(
          shouldPublish ? 'success' : 'info',
          shouldPublish ? 'Website published successfully!' : 'Website set to draft mode.',
        );
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to update website publish status');
    } finally {
      setIsTogglePublishing(false);
      setIsPublishingModalOpen(false);
      setIsUnpublishingModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#C9A45C] animate-spin" />
        <p className="text-xs text-stone-400">Loading website content workspace...</p>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="p-8 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-center space-y-4 max-w-xl mx-auto my-12">
        <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
        <h3 className="text-lg font-bold text-stone-100">Website Not Found</h3>
        <p className="text-xs text-stone-400">{error || 'The requested website does not exist or has been archived.'}</p>
        <Link
          href="/websites"
          className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Websites Registry</span>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'hero', label: 'Hero', icon: Sparkles },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'gallery', label: 'Galleries', icon: Images },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'social-links', label: 'Social Links', icon: Share2 },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-[#161C19] border border-stone-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/websites"
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold font-serif text-stone-100">{website.name}</h2>
              <StatusBadge status={website.status} />
              <StatusBadge status={website.isPublished ? 'PUBLISHED' : 'DRAFT'} />
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Client: <span className="text-stone-200 font-semibold">{website.client?.businessName || '—'}</span> &bull; Slug: <span className="font-mono text-[#C9A45C]">/{website.slug}</span> &bull; Template: <span className="text-amber-300/90 font-mono">{website.template?.name || '—'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-wrap">
          {/* View Live Website Link */}
          <Link
            href={`/site/${website.slug || website.id}`}
            target="_blank"
            className="px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-xl flex items-center space-x-1.5 transition-all shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Website</span>
          </Link>

          {/* Publish / Unpublish Toggle */}
          {isAdmin && (
            website.isPublished ? (
              <button
                onClick={() => setIsUnpublishingModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/40 rounded-xl transition-all shadow-md"
              >
                Unpublish
              </button>
            ) : (
              <button
                onClick={() => setIsPublishingModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-700/50 rounded-xl transition-all shadow-md"
              >
                Publish Website
              </button>
            )
          )}

          {/* Open Interactive Builder Button */}
          <Link
            href={`/websites/${websiteId}/builder`}
            className="px-4 py-2 text-xs font-bold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] border border-[#C9A45C]/30 rounded-xl flex items-center space-x-2 transition-all shadow-lg shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span>Open Website Builder</span>
          </Link>

          {/* Live Preview Button */}
          <Link
            href={`/websites/${websiteId}/preview`}
            target="_blank"
            className="px-3.5 py-2 text-xs font-semibold text-stone-300 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center space-x-1.5 transition-all shadow-md shrink-0"
          >
            <Globe className="w-4 h-4 text-[#C9A45C]" />
            <span>Live Preview</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 border-b border-stone-800 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center space-x-2 px-4 py-3 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-t border-x ${
                isActive
                  ? 'bg-[#161C19] text-[#C9A45C] border-stone-800 border-b-transparent shadow-lg'
                  : 'bg-transparent text-stone-400 hover:text-stone-200 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A45C]' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-[#161C19] border border-stone-800 rounded-b-2xl p-6 shadow-xl min-h-[400px]">
        {activeTab === 'overview' && <OverviewTab website={website} content={websiteContent} onNavigate={setActiveTab} />}
        {activeTab === 'theme' && <ThemeTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} initialData={websiteContent?.theme} />}
        {activeTab === 'hero' && <HeroTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} initialData={websiteContent?.hero} />}
        {activeTab === 'about' && <AboutTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} initialData={websiteContent?.about} />}
        {activeTab === 'contact' && <ContactTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} initialData={websiteContent?.contact} />}
        {activeTab === 'services' && <ServicesTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} />}
        {activeTab === 'gallery' && <GalleriesTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} />}
        {activeTab === 'testimonials' && <TestimonialsTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} />}
        {activeTab === 'social-links' && <SocialLinksTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} />}
        {activeTab === 'media' && <MediaTab websiteId={websiteId} isAdmin={isAdmin} addToast={addToast} onRefresh={refreshContent} />}
      </div>

      {/* Confirm Publish Dialog */}
      <ConfirmDialog
        isOpen={isPublishingModalOpen}
        onClose={() => setIsPublishingModalOpen(false)}
        onConfirm={() => handleTogglePublish(true)}
        title="Publish Website to Public Internet"
        message={`Are you sure you want to publish "${website?.name}"? It will immediately become live at /site/${website?.slug || website?.id}.`}
        confirmText="Publish Website"
        isLoading={isTogglePublishing}
      />

      {/* Confirm Unpublish Dialog */}
      <ConfirmDialog
        isOpen={isUnpublishingModalOpen}
        onClose={() => setIsUnpublishingModalOpen(false)}
        onConfirm={() => handleTogglePublish(false)}
        title="Unpublish Website"
        message={`Are you sure you want to unpublish "${website?.name}"? It will be taken offline and set back to draft mode.`}
        confirmText="Unpublish (Set Draft)"
        isLoading={isTogglePublishing}
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}

// 1. Overview Tab
function OverviewTab({ website, content, onNavigate }: { website: Website; content: WebsiteContent | null; onNavigate: (tab: TabType) => void }) {
  const cards = [
    { title: 'Theme Colors & Fonts', icon: Palette, tab: 'theme' as TabType, status: content?.theme ? 'Configured' : 'Default' },
    { title: 'Hero Section Headline & CTAs', icon: Sparkles, tab: 'hero' as TabType, status: content?.hero ? 'Configured' : 'Default' },
    { title: 'About Section Story', icon: Info, tab: 'about' as TabType, status: content?.about ? 'Configured' : 'Default' },
    { title: 'Contact Information & Location', icon: PhoneCall, tab: 'contact' as TabType, status: content?.contact ? 'Configured' : 'Default' },
    { title: 'Services & Capabilities', icon: Briefcase, tab: 'services' as TabType, status: `${content?.services?.length || 0} Items` },
    { title: 'Galleries & Portfolio Showcase', icon: Images, tab: 'gallery' as TabType, status: `${content?.galleries?.length || 0} Items` },
    { title: 'Client Testimonials', icon: MessageSquareQuote, tab: 'testimonials' as TabType, status: `${content?.testimonials?.length || 0} Items` },
    { title: 'Social Profile Links', icon: Share2, tab: 'social-links' as TabType, status: `${content?.socialLinks?.length || 0} Items` },
    { title: 'Uploaded Media Assets', icon: ImageIcon, tab: 'media' as TabType, status: `${content?.media?.length || 0} Assets` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider">
          Configured Website Content Modules
        </h3>
        <Link
          href={`/websites/${website.id}/preview`}
          target="_blank"
          className="text-xs font-semibold text-[#C9A45C] hover:underline flex items-center space-x-1"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Template Preview</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.tab}
              onClick={() => onNavigate(card.tab)}
              className="p-5 rounded-xl border border-stone-800 bg-[#121614] hover:border-[#075C45] text-left transition-all group flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-[#C9A45C]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-200 group-hover:text-[#C9A45C] transition-colors block">
                    {card.title}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">{card.status}</span>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-stone-600 group-hover:text-emerald-400 transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 2. Theme Tab
function ThemeTab({ websiteId, isAdmin, addToast, onRefresh, initialData }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void; initialData?: Theme | null }) {
  const [theme, setTheme] = useState<Partial<Theme>>(initialData || {});
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTheme(initialData);
      setIsLoading(false);
      return;
    }
    getThemeApi(websiteId)
      .then((res) => {
        if (res.success && res.data) setTheme(res.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [websiteId, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (theme.id) {
        await updateThemeApi(websiteId, theme);
        addToast('success', 'Theme updated successfully');
      } else {
        const res = await createThemeApi(websiteId, theme);
        setTheme(res.data);
        addToast('success', 'Theme created successfully');
      }
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save theme');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader2 className="w-6 h-6 text-[#C9A45C] animate-spin mx-auto my-12" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider border-b border-stone-800 pb-3">
        Theme Colors & Styling Tokens
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Primary Color">
          <input
            type="text"
            placeholder="#075C45"
            value={theme.primaryColor || ''}
            onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Secondary Color">
          <input
            type="text"
            placeholder="#C9A45C"
            value={theme.secondaryColor || ''}
            onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Accent Color">
          <input
            type="text"
            placeholder="#E5B842"
            value={theme.accentColor || ''}
            onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Background Color">
          <input
            type="text"
            placeholder="#0F1412"
            value={theme.backgroundColor || ''}
            onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>

        <FormField label="Heading Font">
          <input
            type="text"
            placeholder="Cormorant Garamond"
            value={theme.headingFont || ''}
            onChange={(e) => setTheme({ ...theme, headingFont: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Body Font">
          <input
            type="text"
            placeholder="Inter"
            value={theme.bodyFont || ''}
            onChange={(e) => setTheme({ ...theme, bodyFont: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
      </div>

      {isAdmin && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-xl border border-[#C9A45C]/30 shadow-lg flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Theme Settings</span>
        </button>
      )}
    </form>
  );
}

// 3. Hero Tab
function HeroTab({ websiteId, isAdmin, addToast, onRefresh, initialData }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void; initialData?: Hero | null }) {
  const [hero, setHero] = useState<Partial<Hero>>(initialData || {});
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setHero(initialData);
      setIsLoading(false);
      return;
    }
    getHeroApi(websiteId)
      .then((res) => {
        if (res.success && res.data) setHero(res.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [websiteId, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (hero.id) {
        await updateHeroApi(websiteId, hero);
        addToast('success', 'Hero section updated successfully');
      } else {
        const res = await createHeroApi(websiteId, hero);
        setHero(res.data);
        addToast('success', 'Hero section created successfully');
      }
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save hero section');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader2 className="w-6 h-6 text-[#C9A45C] animate-spin mx-auto my-12" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider border-b border-stone-800 pb-3">
        Hero Section Configuration
      </h3>
      <FormField label="Eyebrow Tagline">
        <input
          type="text"
          placeholder="WELCOME TO OUR PLATFORM"
          value={hero.eyebrow || ''}
          onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      <FormField label="Main Headline Title">
        <input
          type="text"
          placeholder="Empowering Businesses with Next-Gen Solutions"
          value={hero.title || ''}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      <FormField label="Subtitle / Description">
        <textarea
          rows={3}
          placeholder="Detailed subtitle description for the hero section..."
          value={hero.description || ''}
          onChange={(e) => setHero({ ...hero, description: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Primary CTA Button Label">
          <input
            type="text"
            placeholder="Get Started"
            value={hero.primaryButtonText || ''}
            onChange={(e) => setHero({ ...hero, primaryButtonText: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Primary CTA URL">
          <input
            type="text"
            placeholder="https://example.test/start"
            value={hero.primaryButtonUrl || ''}
            onChange={(e) => setHero({ ...hero, primaryButtonUrl: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
      </div>

      {isAdmin && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-xl border border-[#C9A45C]/30 shadow-lg flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Hero Section</span>
        </button>
      )}
    </form>
  );
}

// 4. About Tab
function AboutTab({ websiteId, isAdmin, addToast, onRefresh, initialData }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void; initialData?: About | null }) {
  const [about, setAbout] = useState<Partial<About>>(initialData || {});
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setAbout(initialData);
      setIsLoading(false);
      return;
    }
    getAboutApi(websiteId)
      .then((res) => {
        if (res.success && res.data) setAbout(res.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [websiteId, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (about.id) {
        await updateAboutApi(websiteId, about);
        addToast('success', 'About section updated successfully');
      } else {
        const res = await createAboutApi(websiteId, about);
        setAbout(res.data);
        addToast('success', 'About section created successfully');
      }
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save about section');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader2 className="w-6 h-6 text-[#C9A45C] animate-spin mx-auto my-12" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider border-b border-stone-800 pb-3">
        About Section Configuration
      </h3>
      <FormField label="Eyebrow Tagline">
        <input
          type="text"
          placeholder="OUR STORY"
          value={about.eyebrow || ''}
          onChange={(e) => setAbout({ ...about, eyebrow: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      <FormField label="Section Title">
        <input
          type="text"
          placeholder="Pioneering Digital Solutions Since 2020"
          value={about.title || ''}
          onChange={(e) => setAbout({ ...about, title: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      <FormField label="Full Description">
        <textarea
          rows={5}
          placeholder="Comprehensive story and about details..."
          value={about.description || ''}
          onChange={(e) => setAbout({ ...about, description: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      {isAdmin && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-xl border border-[#C9A45C]/30 shadow-lg flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save About Section</span>
        </button>
      )}
    </form>
  );
}

// 5. Contact Tab
function ContactTab({ websiteId, isAdmin, addToast, onRefresh, initialData }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void; initialData?: Contact | null }) {
  const [contact, setContact] = useState<Partial<Contact>>(initialData || {});
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setContact(initialData);
      setIsLoading(false);
      return;
    }
    getContactApi(websiteId)
      .then((res) => {
        if (res.success && res.data) setContact(res.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [websiteId, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (contact.id) {
        await updateContactApi(websiteId, contact);
        addToast('success', 'Contact info updated successfully');
      } else {
        const res = await createContactApi(websiteId, contact);
        setContact(res.data);
        addToast('success', 'Contact info created successfully');
      }
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to save contact info');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader2 className="w-6 h-6 text-[#C9A45C] animate-spin mx-auto my-12" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider border-b border-stone-800 pb-3">
        Contact Information & Location
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Contact Email">
          <input
            type="email"
            placeholder="contact@website.test"
            value={contact.email || ''}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Phone Number">
          <input
            type="text"
            placeholder="+1-555-0100"
            value={contact.phone || ''}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="WhatsApp Number">
          <input
            type="text"
            placeholder="+1-555-0101"
            value={contact.whatsapp || ''}
            onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="Street Address">
          <input
            type="text"
            placeholder="100 Innovation Way"
            value={contact.address || ''}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="City">
          <input
            type="text"
            placeholder="San Francisco"
            value={contact.city || ''}
            onChange={(e) => setContact({ ...contact, city: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
        <FormField label="State">
          <input
            type="text"
            placeholder="California"
            value={contact.state || ''}
            onChange={(e) => setContact({ ...contact, state: e.target.value })}
            className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
          />
        </FormField>
      </div>

      <FormField label="Google Maps URL">
        <input
          type="text"
          placeholder="https://maps.google.com/?q=San+Francisco"
          value={contact.mapUrl || ''}
          onChange={(e) => setContact({ ...contact, mapUrl: e.target.value })}
          className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none"
        />
      </FormField>

      {isAdmin && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-xl border border-[#C9A45C]/30 shadow-lg flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Contact Info</span>
        </button>
      )}
    </form>
  );
}

// 6. Services Tab
function ServicesTab({ websiteId, isAdmin, addToast, onRefresh }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void }) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ title: '', shortDescription: '', description: '', icon: '', sortOrder: 0, isActive: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getServicesApi(websiteId, { limit: 100 });
      if (res.success) setServices(res.data.items);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateServiceApi(websiteId, editingItem.id, formData);
        addToast('success', 'Service updated successfully');
      } else {
        await createServiceApi(websiteId, formData);
        addToast('success', 'Service created successfully');
      }
      setIsModalOpen(false);
      fetchServices();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      await deleteServiceApi(websiteId, deletingItem.id);
      addToast('success', 'Service deactivated successfully');
      setDeletingItem(null);
      fetchServices();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to deactivate service');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<ServiceItem>[] = [
    { header: 'Title', accessorKey: 'title', cell: (row) => <span className="font-semibold text-stone-100">{row.title}</span> },
    { header: 'Short Description', cell: (row) => <span className="text-stone-300 max-w-xs truncate block">{row.shortDescription || '—'}</span> },
    { header: 'Status', cell: (row) => <StatusBadge status={row.isActive ? 'ACTIVE' : 'INACTIVE'} /> },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end space-x-2">
          {isAdmin && (
            <>
              <button
                onClick={() => {
                  setEditingItem(row);
                  setFormData({
                    title: row.title,
                    shortDescription: row.shortDescription || '',
                    description: row.description || '',
                    icon: row.icon || '',
                    sortOrder: row.sortOrder || 0,
                    isActive: row.isActive,
                  });
                  setIsModalOpen(true);
                }}
                className="p-1.5 text-stone-300 hover:text-stone-100"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => setDeletingItem(row)} className="p-1.5 text-stone-400 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider">Services List</h3>
        {isAdmin && (
          <button onClick={() => { setEditingItem(null); setFormData({ title: '', shortDescription: '', description: '', icon: '', sortOrder: 0, isActive: true }); setIsModalOpen(true); }} className="px-3 py-2 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        )}
      </div>

      <DataTable columns={columns} data={services} isLoading={isLoading} emptyTitle="No Services Configured" keyExtractor={(row) => row.id} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Service' : 'Add New Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Service Title" required>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none" />
          </FormField>
          <FormField label="Short Description">
            <input type="text" value={formData.shortDescription || ''} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none" />
          </FormField>
          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs bg-stone-800 text-stone-300 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-xs font-semibold bg-[#075C45] text-[#C9A45C] rounded-lg flex items-center space-x-2">
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Service</span>
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        title="Deactivate Service"
        message={`Are you sure you want to deactivate service "${deletingItem?.title}"?`}
        confirmText="Deactivate"
        isLoading={isDeleting}
      />
    </div>
  );
}

// 7. Galleries Tab
function GalleriesTab({ websiteId, isAdmin, addToast, onRefresh }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void }) {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingGallery, setDeletingGallery] = useState<Gallery | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGalleries = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getGalleriesApi(websiteId, { limit: 100 });
      if (res.success) setGalleries(res.data.items);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch galleries');
    } finally {
      setIsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const handleDelete = async () => {
    if (!deletingGallery) return;
    setIsDeleting(true);
    try {
      await deleteGalleryApi(websiteId, deletingGallery.id);
      addToast('success', 'Gallery deleted successfully');
      setDeletingGallery(null);
      fetchGalleries();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to delete gallery');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider">Galleries List</h3>
      <p className="text-xs text-stone-400">Total Galleries Configured: {galleries.length}</p>
      {galleries.map((g) => (
        <div key={g.id} className="p-4 rounded-xl bg-[#121614] border border-stone-800 flex justify-between items-center">
          <div>
            <p className="font-semibold text-stone-200">{g.title}</p>
            {g.description && <p className="text-xs text-stone-400">{g.description}</p>}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-[#C9A45C]">{g.items?.length || 0} Items</span>
            {isAdmin && (
              <button onClick={() => setDeletingGallery(g)} className="text-stone-400 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
      {galleries.length === 0 && !isLoading && <p className="text-xs text-stone-500">No galleries created yet.</p>}

      <ConfirmDialog
        isOpen={!!deletingGallery}
        onClose={() => setDeletingGallery(null)}
        onConfirm={handleDelete}
        title="Delete Gallery"
        message={`Are you sure you want to delete gallery "${deletingGallery?.title}"?`}
        confirmText="Delete Gallery"
        isLoading={isDeleting}
      />
    </div>
  );
}

// 8. Testimonials Tab
function TestimonialsTab({ websiteId, isAdmin, addToast, onRefresh }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getTestimonialsApi(websiteId, { limit: 100 });
      if (res.success) setTestimonials(res.data.items);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleDelete = async () => {
    if (!deletingTestimonial) return;
    setIsDeleting(true);
    try {
      await deleteTestimonialApi(websiteId, deletingTestimonial.id);
      addToast('success', 'Testimonial deactivated successfully');
      setDeletingTestimonial(null);
      fetchTestimonials();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to deactivate testimonial');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider">Testimonials List</h3>
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="p-4 rounded-xl bg-[#121614] border border-stone-800 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-stone-200">{t.name} ({t.role || 'Client'})</span>
                <StatusBadge status={t.isActive ? 'ACTIVE' : 'INACTIVE'} />
              </div>
              <p className="text-xs text-stone-400 italic">"{t.content}"</p>
            </div>
            {isAdmin && (
              <button onClick={() => setDeletingTestimonial(t)} className="text-stone-400 hover:text-rose-400 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {testimonials.length === 0 && !isLoading && <p className="text-xs text-stone-500">No testimonials created yet.</p>}
      </div>

      <ConfirmDialog
        isOpen={!!deletingTestimonial}
        onClose={() => setDeletingTestimonial(null)}
        onConfirm={handleDelete}
        title="Deactivate Testimonial"
        message={`Are you sure you want to deactivate testimonial by "${deletingTestimonial?.name}"?`}
        confirmText="Deactivate"
        isLoading={isDeleting}
      />
    </div>
  );
}

// 9. Social Links Tab
function SocialLinksTab({ websiteId, isAdmin, addToast, onRefresh }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void }) {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingLink, setDeletingLink] = useState<SocialLink | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ platform: 'INSTAGRAM' as SocialPlatform, url: '' });

  const fetchLinks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getSocialLinksApi(websiteId);
      if (res.success) setLinks(res.data);
    } finally {
      setIsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim()) return;
    try {
      await createSocialLinkApi(websiteId, formData);
      addToast('success', 'Social link added successfully');
      setIsModalOpen(false);
      fetchLinks();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to add social link');
    }
  };

  const handleDelete = async () => {
    if (!deletingLink) return;
    setIsDeleting(true);
    try {
      await deleteSocialLinkApi(websiteId, deletingLink.id);
      addToast('success', 'Social link deleted successfully');
      setDeletingLink(null);
      fetchLinks();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to delete social link');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider">Social Profile Links</h3>
        {isAdmin && (
          <button onClick={() => setIsModalOpen(true)} className="px-3 py-2 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <div key={link.id} className="p-3 rounded-xl bg-[#121614] border border-stone-800 flex justify-between items-center">
            <div>
              <span className="font-bold text-xs text-[#C9A45C] uppercase">{link.platform}</span>
              <p className="text-xs text-stone-300 font-mono truncate max-w-xs">{link.url}</p>
            </div>
            {isAdmin && (
              <button onClick={() => setDeletingLink(link)} className="text-stone-400 hover:text-rose-400 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Social Link">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Platform Enum">
            <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value as SocialPlatform })} className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none">
              <option value="INSTAGRAM">INSTAGRAM</option>
              <option value="FACEBOOK">FACEBOOK</option>
              <option value="YOUTUBE">YOUTUBE</option>
              <option value="LINKEDIN">LINKEDIN</option>
              <option value="TWITTER">TWITTER</option>
              <option value="WHATSAPP">WHATSAPP</option>
              <option value="OTHER">OTHER</option>
            </select>
          </FormField>
          <FormField label="Profile URL" required>
            <input type="text" required placeholder="https://instagram.com/profile" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none" />
          </FormField>
          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs bg-stone-800 text-stone-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold bg-[#075C45] text-[#C9A45C] rounded-lg">Save</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingLink}
        onClose={() => setDeletingLink(null)}
        onConfirm={handleDelete}
        title="Delete Social Link"
        message={`Are you sure you want to delete social link for "${deletingLink?.platform}"?`}
        confirmText="Delete Link"
        isLoading={isDeleting}
      />
    </div>
  );
}

// 10. Media Tab
function MediaTab({ websiteId, isAdmin, addToast, onRefresh }: { websiteId: string; isAdmin: boolean; addToast: any; onRefresh: () => void }) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingMedia, setDeletingMedia] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMediaApi(websiteId, { limit: 100 });
      if (res.success) setMedia(res.data.items);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch media');
    } finally {
      setIsLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleDelete = async () => {
    if (!deletingMedia) return;
    setIsDeleting(true);
    try {
      await deleteMediaApi(websiteId, deletingMedia.id);
      addToast('success', 'Media record deleted successfully');
      setDeletingMedia(null);
      fetchMedia();
      onRefresh();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to delete media record');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-stone-100 uppercase tracking-wider">Scoped Media Library</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="p-3 rounded-xl bg-[#121614] border border-stone-800 space-y-2 relative group">
            <div className="h-28 rounded-lg bg-stone-900 flex items-center justify-center overflow-hidden border border-stone-800">
              {item.type === 'IMAGE' ? (
                <img src={item.url} alt={item.altText || item.fileName} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-stone-500" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-semibold text-stone-200 truncate">{item.fileName}</p>
                <p className="text-[10px] text-stone-400 font-mono">{(item.fileSize / 1024).toFixed(1)} KB</p>
              </div>
              {isAdmin && (
                <button onClick={() => setDeletingMedia(item)} className="p-1 text-stone-400 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {media.length === 0 && !isLoading && <p className="text-xs text-stone-500">No media assets uploaded for this website.</p>}

      <ConfirmDialog
        isOpen={!!deletingMedia}
        onClose={() => setDeletingMedia(null)}
        onConfirm={handleDelete}
        title="Delete Media Record"
        message={`Are you sure you want to delete media record "${deletingMedia?.fileName}"?`}
        confirmText="Delete Record"
        isLoading={isDeleting}
      />
    </div>
  );
}
