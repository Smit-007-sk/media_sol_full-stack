"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  WebsiteRequest,
  GeneratedWebsite,
  GeneratedWebsiteStatus,
  getGeneratedWebsiteApi,
  saveGeneratedWebsiteApi,
  checkSlugApi,
  publishGeneratedWebsiteApi,
  unpublishGeneratedWebsiteApi,
} from '@/api/websiteRequests';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';
import { WebsitePreviewModal } from './WebsitePreviewModal';
import {
  Code,
  FileCode,
  Sparkles,
  Save,
  Play,
  X,
  FileText,
  Layers,
  Clock,
  Check,
  AlertTriangle,
  Loader2,
  Terminal,
  ClipboardPaste,
  Trash2,
  ExternalLink,
  Globe,
  GlobeLock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Images,
  ImageIcon,
  Link2,
  Unlink,
  Copy,
  CheckCheck,
} from 'lucide-react';

interface WebsiteCodeWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: WebsiteRequest | null;
  onToast?: (type: 'success' | 'error' | 'info', message: string) => void;
  onOpenPrompt?: () => void;
}

type TabType = 'html' | 'css' | 'javascript' | 'assets';

/**
 * Transforms a human business name into a standard lowercase kebab-case slug.
 * e.g., "Royal Moments Photography" -> "royal-moments-photography"
 * e.g., "Shree Ganesh & Sons" -> "shree-ganesh-sons"
 */
function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
}

export function WebsiteCodeWorkspaceModal({
  isOpen,
  onClose,
  request,
  onToast,
  onOpenPrompt,
}: WebsiteCodeWorkspaceModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('html');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [javascript, setJavascript] = useState('');
  const [assetMappings, setAssetMappings] = useState<Record<string, string>>({});
  const [slug, setSlug] = useState('');
  const [publicationStatus, setPublicationStatus] = useState<GeneratedWebsiteStatus>('DRAFT');
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Slug checking state
  const [slugCheckStatus, setSlugCheckStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [slugCheckMessage, setSlugCheckMessage] = useState<string | null>(null);

  // Confirmation Modals
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const [isUnpublishConfirmOpen, setIsUnpublishConfirmOpen] = useState(false);

  // Extract client assets strictly from current request (Client Isolation)
  const clientLogoAssets = request?.assetReferences?.logoAssets || [];
  const clientBannerAssets = request?.assetReferences?.bannerAssets || [];

  const availableClientAssets = React.useMemo(() => {
    const list: Array<{ id: string; name: string; url: string; tag: string; type: 'LOGO' | 'BANNER'; fileSize?: number }> = [];
    clientLogoAssets.forEach((a, idx) => {
      list.push({
        id: `logo_${idx}`,
        name: a.fileName || `Client Logo ${idx + 1}`,
        url: a.url,
        tag: '{{LOGO_URL}}',
        type: 'LOGO',
        fileSize: a.fileSize,
      });
    });
    clientBannerAssets.forEach((a, idx) => {
      list.push({
        id: `banner_${idx}`,
        name: a.fileName || `Showcase Image ${idx + 1}`,
        url: a.url,
        tag: `{{IMAGE_${idx + 1}_URL}}`,
        type: 'BANNER',
        fileSize: a.fileSize,
      });
    });
    return list;
  }, [clientLogoAssets, clientBannerAssets]);

  // Detect placeholders used in the HTML code
  const detectedPlaceholders = React.useMemo(() => {
    if (!html) return [];
    const matches = html.match(/\{\{([A-Za-z0-9_]+_URL)\}\}/g);
    const unique = Array.from(new Set(matches || []));
    // Ensure standard placeholders are available if detected or if client has assets
    const basePlaceholders = ['{{LOGO_URL}}', '{{IMAGE_1_URL}}', '{{IMAGE_2_URL}}', '{{IMAGE_3_URL}}'];
    const combined = Array.from(new Set([...unique, ...basePlaceholders]));
    return combined;
  }, [html]);

  // Fetch existing draft code when modal opens
  const loadDraft = useCallback(async () => {
    if (!request?.id) return;
    setIsLoading(true);
    try {
      const res = await getGeneratedWebsiteApi(request.id);
      if (res.success && res.data) {
        setHtml(res.data.html || '');
        setCss(res.data.css || '');
        setJavascript(res.data.javascript || '');
        setPublicationStatus(res.data.status || 'DRAFT');
        setPublishedAt(res.data.publishedAt || null);
        setLastSavedAt(res.data.updatedAt || res.data.createdAt);

        if (res.data.assetMappings && typeof res.data.assetMappings === 'object') {
          setAssetMappings(res.data.assetMappings);
        } else {
          // Auto-suggest default 1-to-1 mappings from client assets
          const autoMap: Record<string, string> = {};
          if (clientLogoAssets.length > 0 && clientLogoAssets[0].url) {
            autoMap['{{LOGO_URL}}'] = clientLogoAssets[0].url;
          }
          clientBannerAssets.forEach((b, idx) => {
            if (b.url) {
              autoMap[`{{IMAGE_${idx + 1}_URL}}`] = b.url;
            }
          });
          setAssetMappings(autoMap);
        }

        // Pre-fill slug if saved, or auto-suggest
        if (res.data.slug) {
          setSlug(res.data.slug);
        } else {
          setSlug(slugify(request.businessName));
        }
      }
    } catch (err: any) {
      // 404 is normal for fresh requests without a draft yet
      setHtml('');
      setCss('');
      setJavascript('');
      setPublicationStatus('DRAFT');
      setPublishedAt(null);
      setLastSavedAt(null);
      setSlug(slugify(request?.businessName || ''));

      // Auto-suggest default mappings
      const autoMap: Record<string, string> = {};
      if (clientLogoAssets.length > 0 && clientLogoAssets[0].url) {
        autoMap['{{LOGO_URL}}'] = clientLogoAssets[0].url;
      }
      clientBannerAssets.forEach((b, idx) => {
        if (b.url) {
          autoMap[`{{IMAGE_${idx + 1}_URL}}`] = b.url;
        }
      });
      setAssetMappings(autoMap);
    } finally {
      setIsLoading(false);
      setSlugCheckStatus('idle');
      setSlugCheckMessage(null);
    }
  }, [request?.id, request?.businessName, clientLogoAssets, clientBannerAssets]);

  useEffect(() => {
    if (isOpen && request?.id) {
      loadDraft();
    }
  }, [isOpen, request?.id, loadDraft]);

  if (!request) return null;

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const res = await saveGeneratedWebsiteApi(request.id, {
        html,
        css,
        javascript,
        slug: slug.trim() ? slug.trim().toLowerCase() : undefined,
        status: publicationStatus,
        assetMappings,
      });
      if (res.success) {
        setLastSavedAt(res.data.updatedAt || new Date().toISOString());
        if (onToast) {
          onToast('success', 'Draft and asset mappings saved successfully.');
        }
      }
    } catch (err: any) {
      if (onToast) {
        onToast('error', err.message || 'Failed to save draft.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCheckSlug = async () => {
    const cleaned = slug.trim().toLowerCase();
    if (!cleaned || cleaned.length < 3) {
      setSlugCheckStatus('invalid');
      setSlugCheckMessage('Slug must be at least 3 characters long.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(cleaned)) {
      setSlugCheckStatus('invalid');
      setSlugCheckMessage('Slug can only contain lowercase letters, numbers, and hyphens.');
      return;
    }

    setSlugCheckStatus('checking');
    setSlugCheckMessage(null);
    try {
      const res = await checkSlugApi(cleaned, request.id);
      if (res.success && res.data.available) {
        setSlugCheckStatus('available');
        setSlugCheckMessage('Slug is available!');
      } else {
        setSlugCheckStatus('taken');
        setSlugCheckMessage('Slug is already in use. Please choose another.');
      }
    } catch (err: any) {
      setSlugCheckStatus('invalid');
      setSlugCheckMessage(err.message || 'Slug check failed.');
    }
  };

  const handlePublish = async () => {
    const cleaned = slug.trim().toLowerCase();
    if (!cleaned) {
      if (onToast) onToast('error', 'Please provide a valid slug before publishing.');
      return;
    }
    if (!html || !html.trim()) {
      if (onToast) onToast('error', 'Cannot publish with empty HTML. Please paste your HTML code first.');
      return;
    }

    setIsPublishing(true);
    try {
      // 1. First save any unsaved editor changes (including assetMappings)
      await saveGeneratedWebsiteApi(request.id, {
        html,
        css,
        javascript,
        slug: cleaned,
        assetMappings,
      });

      // 2. Execute publish action
      const res = await publishGeneratedWebsiteApi(request.id, cleaned);
      if (res.success) {
        setPublicationStatus('PUBLISHED');
        setPublishedAt(res.data.publishedAt);
        setSlug(res.data.slug);
        setIsPublishConfirmOpen(false);
        if (onToast) {
          onToast('success', `Website published successfully at /site/${res.data.slug}`);
        }
      }
    } catch (err: any) {
      if (onToast) {
        onToast('error', err.message || 'Failed to publish website.');
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setIsUnpublishing(true);
    try {
      const res = await unpublishGeneratedWebsiteApi(request.id);
      if (res.success) {
        setPublicationStatus('DRAFT');
        setIsUnpublishConfirmOpen(false);
        if (onToast) {
          onToast('info', 'Website unpublished. Public URL is now offline.');
        }
      }
    } catch (err: any) {
      if (onToast) {
        onToast('error', err.message || 'Failed to unpublish website.');
      }
    } finally {
      setIsUnpublishing(false);
    }
  };

  const handlePasteClipboard = async (tab: TabType) => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;
      if (tab === 'html') setHtml(text);
      if (tab === 'css') setCss(text);
      if (tab === 'javascript') setJavascript(text);
      if (onToast) {
        onToast('info', `Pasted clipboard text into ${tab.toUpperCase()} editor.`);
      }
    } catch (err) {
      if (onToast) {
        onToast('error', 'Unable to read from clipboard.');
      }
    }
  };

  const currentCode = activeTab === 'html' ? html : activeTab === 'css' ? css : javascript;
  const currentSetter = activeTab === 'html' ? setHtml : activeTab === 'css' ? setCss : setJavascript;

  const getLineCount = (str: string) => (str ? str.split('\n').length : 0);
  const getCharCount = (str: string) => (str ? str.length : 0);

  const publicUrl = slug ? `/site/${slug.trim().toLowerCase()}` : '';

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Website Code Workspace"
        subtitle={`Generate, paste, edit and publish DeepSeek static website for "${request.businessName}"`}
        maxWidth="5xl"
      >
        <div className="space-y-4 font-sans">
          {/* Top Info & Action Header */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-[#FA8373]" />
                <h3 className="text-base font-black text-white">{request.businessName}</h3>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md text-[10px] font-bold">
                  {request.category || 'Business'}
                </span>
                {publicationStatus === 'PUBLISHED' ? (
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-400" />
                    PUBLISHED
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold">
                    DRAFT
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>Client: <strong className="text-slate-200">{request.fullName}</strong></span>
                <span>•</span>
                <span>
                  {lastSavedAt ? (
                    <span className="text-emerald-400 font-medium">
                      Last saved: {new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">Draft not saved yet</span>
                  )}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onOpenPrompt && (
                <button
                  type="button"
                  onClick={onOpenPrompt}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>View Prompt</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all border border-slate-700 shadow-md"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Preview Website</span>
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving || isLoading}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md border border-slate-700 flex items-center gap-2 transition-all"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Publication Card */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#FA8373]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
                  Website Publication & Public Slug
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Status:</span>
                {publicationStatus === 'PUBLISHED' ? (
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-bold">
                    Live at /site/{slug}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-300 border border-slate-700 rounded text-[10px] font-bold">
                    Draft (Offline)
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Slug Input */}
              <div className="md:col-span-7 space-y-1">
                <label className="text-[11px] font-bold text-slate-300 block">
                  Public URL Slug <span className="text-slate-500 font-normal">(/site/your-slug)</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                      /site/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setSlugCheckStatus('idle');
                        setSlugCheckMessage(null);
                      }}
                      placeholder="business-slug"
                      className="w-full pl-14 pr-3 py-2 bg-slate-950 border border-slate-800 focus:border-[#FA8373] text-xs font-mono text-slate-100 rounded-xl outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckSlug}
                    disabled={slugCheckStatus === 'checking'}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 shrink-0 transition-colors"
                  >
                    {slugCheckStatus === 'checking' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      'Check Slug'
                    )}
                  </button>
                </div>

                {/* Slug check message */}
                {slugCheckMessage && (
                  <div
                    className={`text-[11px] font-medium flex items-center gap-1.5 pt-0.5 ${
                      slugCheckStatus === 'available'
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {slugCheckStatus === 'available' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{slugCheckMessage}</span>
                  </div>
                )}
              </div>

              {/* Publish / Unpublish Actions */}
              <div className="md:col-span-5 flex flex-wrap items-center justify-end gap-2 pt-2 md:pt-0">
                {publicationStatus === 'PUBLISHED' ? (
                  <>
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Website</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsPublishConfirmOpen(true)}
                      className="px-3.5 py-2 bg-gradient-to-r from-[#FA8373] to-[#e06858] hover:from-[#f97361] hover:to-[#d0594a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Update Published Website</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsUnpublishConfirmOpen(true)}
                      className="px-3 py-2 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800/60 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <GlobeLock className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPublishConfirmOpen(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#FA8373] to-[#e06858] hover:from-[#f97361] hover:to-[#d0594a] text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Publish Website</span>
                  </button>
                )}
              </div>
            </div>

            {publicationStatus === 'PUBLISHED' && (
              <p className="text-[10px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                💡 <strong>Notice:</strong> This website is live. If you edit HTML/CSS/JS in the editors below, click <strong>Save Draft</strong> and then click <strong>Publish Website</strong> to sync your edits to the public site.
              </p>
            )}
          </div>

          {/* Editor Tabs Navigation */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-2 pt-2 rounded-t-2xl">
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('html')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl flex items-center gap-2 transition-all border-t border-x ${
                  activeTab === 'html'
                    ? 'bg-slate-900 text-[#FA8373] border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>index.html</span>
                <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded-md text-[10px] font-mono">
                  {getLineCount(html)}L
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl flex items-center gap-2 transition-all border-t border-x ${
                  activeTab === 'css'
                    ? 'bg-slate-900 text-sky-400 border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>style.css</span>
                <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded-md text-[10px] font-mono">
                  {getLineCount(css)}L
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('javascript')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl flex items-center gap-2 transition-all border-t border-x ${
                  activeTab === 'javascript'
                    ? 'bg-slate-900 text-amber-400 border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>script.js</span>
                <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded-md text-[10px] font-mono">
                  {getLineCount(javascript)}L
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('assets')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl flex items-center gap-2 transition-all border-t border-x ${
                  activeTab === 'assets'
                    ? 'bg-slate-900 text-emerald-400 border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                <Images className="w-3.5 h-3.5" />
                <span>Website Assets</span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/80 rounded-md text-[10px] font-bold font-mono">
                  {Object.keys(assetMappings).filter((k) => !!assetMappings[k]).length} Mapped
                </span>
              </button>
            </div>

            {activeTab !== 'assets' && (
              <div className="flex items-center gap-2 pb-1.5">
                <button
                  type="button"
                  onClick={() => handlePasteClipboard(activeTab)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg border border-slate-800 flex items-center gap-1.5 transition-colors"
                  title="Paste from clipboard"
                >
                  <ClipboardPaste className="w-3 h-3 text-[#FA8373]" />
                  <span>Paste</span>
                </button>

                <button
                  type="button"
                  onClick={() => currentSetter('')}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 text-[11px] font-bold rounded-lg border border-slate-800 hover:border-rose-800/50 flex items-center gap-1.5 transition-colors"
                  title="Clear current tab"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>

          {/* Code Textarea or Assets Mapping Area */}
          {isLoading ? (
            <div className="h-96 bg-slate-950 border border-slate-800 rounded-b-2xl flex flex-col items-center justify-center space-y-3 text-slate-400">
              <Loader2 className="w-8 h-8 text-[#FA8373] animate-spin" />
              <p className="text-xs font-bold text-slate-300">Loading code workspace...</p>
            </div>
          ) : activeTab === 'assets' ? (
            /* WEBSITE ASSETS TAB CONTENT */
            <div className="bg-slate-950 border border-slate-800 rounded-b-2xl p-5 space-y-5 text-white min-h-[400px]">
              {/* Asset Header Info */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Images className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
                      Client Media & Placeholders Mapping
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Map DeepSeek HTML placeholders like <code className="text-[#FA8373] font-mono">{"{{LOGO_URL}}"}</code> to client-uploaded assets. Raw HTML remains clean and untouched.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const autoMap: Record<string, string> = {};
                      if (clientLogoAssets.length > 0 && clientLogoAssets[0].url) {
                        autoMap['{{LOGO_URL}}'] = clientLogoAssets[0].url;
                      }
                      clientBannerAssets.forEach((b, idx) => {
                        if (b.url) {
                          autoMap[`{{IMAGE_${idx + 1}_URL}}`] = b.url;
                        }
                      });
                      setAssetMappings(autoMap);
                      if (onToast) onToast('info', 'Auto-matched available client assets to placeholders.');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Auto-Match</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAssetMappings({});
                      if (onToast) onToast('info', 'All asset mappings cleared.');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                  >
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              {/* Status Mapping Summary Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mapping Status Overview
                </span>
                <div className="flex flex-wrap gap-2">
                  {detectedPlaceholders.map((ph, idx) => {
                    const mappedUrl = assetMappings[ph];
                    const matchedAsset = availableClientAssets.find((a) => a.url === mappedUrl);
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-[11px] font-bold border ${
                          mappedUrl
                            ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80'
                            : 'bg-amber-950/50 text-amber-300 border-amber-800/60'
                        }`}
                      >
                        {mappedUrl ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="font-mono">{ph}</span>
                            <span className="text-slate-400 font-normal">→</span>
                            <span className="truncate max-w-[120px]">{matchedAsset?.name || 'Mapped'}</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-mono">{ph}</span>
                            <span className="text-amber-400 font-normal">Unmapped</span>
                          </>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Client Uploaded Media Inventory Notification */}
              {availableClientAssets.length === 0 && (
                <div className="p-4 bg-slate-900 border border-dashed border-slate-700 rounded-xl text-center space-y-1">
                  <ImageIcon className="w-6 h-6 text-slate-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-300">No Client Assets Uploaded</p>
                  <p className="text-[11px] text-slate-500">
                    The client submitted this request without attaching logo or image files. Website will render safe CSS/SVG styling.
                  </p>
                </div>
              )}

              {/* Interactive Placeholder Mapping Grid */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Configure Placeholders
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {detectedPlaceholders.map((placeholder) => {
                    const currentMappedUrl = assetMappings[placeholder] || '';
                    const selectedAsset = availableClientAssets.find((a) => a.url === currentMappedUrl);

                    return (
                      <div
                        key={placeholder}
                        className={`p-4 bg-slate-900/80 border rounded-xl space-y-3 transition-all ${
                          currentMappedUrl
                            ? 'border-emerald-800/70 bg-slate-900'
                            : 'border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-[#FA8373] bg-slate-950 px-2 py-1 rounded border border-slate-800">
                              {placeholder}
                            </span>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(placeholder);
                                  if (onToast) onToast('success', `Copied "${placeholder}" to clipboard`);
                                } catch (e) {
                                  if (onToast) onToast('error', 'Failed to copy tag');
                                }
                              }}
                              className="text-slate-400 hover:text-slate-200"
                              title="Copy tag"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {currentMappedUrl ? (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              No Asset
                            </span>
                          )}
                        </div>

                        {/* Dropdown Selector - Strictly isolated to current client assets */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                            Assign Client Asset
                          </label>
                          <select
                            value={currentMappedUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAssetMappings((prev) => {
                                const next = { ...prev };
                                if (val) {
                                  next[placeholder] = val;
                                } else {
                                  delete next[placeholder];
                                }
                                return next;
                              });
                            }}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500"
                          >
                            <option value="">— None (Leave unmapped) —</option>
                            {availableClientAssets.map((asset) => (
                              <option key={asset.id} value={asset.url}>
                                {asset.type === 'LOGO' ? '🌟 [LOGO] ' : '🖼️ [IMAGE] '}
                                {asset.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Selected Thumbnail Preview */}
                        {selectedAsset && (
                          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-3">
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <div className="w-12 h-12 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex-shrink-0 flex items-center justify-center">
                                <img
                                  src={selectedAsset.url}
                                  alt={selectedAsset.name}
                                  className="w-full h-full object-contain p-0.5"
                                />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-200 truncate">{selectedAsset.name}</p>
                                <p className="text-[10px] text-slate-400">
                                  {selectedAsset.fileSize ? `${(selectedAsset.fileSize / 1024).toFixed(0)} KB` : 'Client Asset'}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setAssetMappings((prev) => {
                                  const next = { ...prev };
                                  delete next[placeholder];
                                  return next;
                                });
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                              title="Unlink asset"
                            >
                              <Unlink className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* CODE EDITORS TAB */
            <div className="relative bg-slate-950 border border-slate-800 rounded-b-2xl overflow-hidden">
              <textarea
                value={currentCode}
                onChange={(e) => currentSetter(e.target.value)}
                placeholder={`Paste your ${activeTab.toUpperCase()} code here...`}
                spellCheck={false}
                className="w-full h-96 p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed outline-none resize-none selection:bg-[#FA8373]/30 selection:text-white"
                onKeyDown={(e) => {
                  // Support tab key in textarea
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const target = e.target as HTMLTextAreaElement;
                    const start = target.selectionStart;
                    const end = target.selectionEnd;
                    const val = target.value;
                    target.value = val.substring(0, start) + '  ' + val.substring(end);
                    target.selectionStart = target.selectionEnd = start + 2;
                    currentSetter(target.value);
                  }
                }}
              />
              <div className="p-2.5 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div>
                  Editing: <span className="text-white font-bold">{activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'style.css' : 'script.js'}</span>
                </div>
                <div>
                  {getCharCount(currentCode)} characters • {getLineCount(currentCode)} lines
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <span className="text-[11px] text-slate-500">
              {publicationStatus === 'PUBLISHED' ? (
                <span>Published at <strong className="text-slate-700">{publicUrl}</strong></span>
              ) : (
                <span>Draft mode. Code & asset mappings are isolated until you click Publish Website.</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Website Preview Isolated Modal */}
      <WebsitePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        html={html}
        css={css}
        javascript={javascript}
        assetMappings={assetMappings}
        request={request}
        businessName={request?.businessName || 'Generated Website'}
      />

      {/* Publish Confirmation Modal */}
      {isPublishConfirmOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-2xl animate-fadeIn font-sans">
            <div className="flex items-center space-x-3 text-emerald-400">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {publicationStatus === 'PUBLISHED' ? 'Update Published Website?' : 'Publish This Website?'}
                </h3>
                <p className="text-xs text-slate-400">
                  {publicationStatus === 'PUBLISHED'
                    ? 'Sync your latest saved code changes to the live URL'
                    : 'Make this static website publicly accessible'}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs">
              <div>
                <span className="text-slate-500">Business:</span>{' '}
                <strong className="text-slate-200">{request?.businessName || ''}</strong>
              </div>
              <div>
                <span className="text-slate-500">Public URL:</span>{' '}
                <strong className="text-[#FA8373] font-mono">/site/{slug.trim().toLowerCase()}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {publicationStatus === 'PUBLISHED'
                ? 'This will immediately update the live public website with your latest code workspace contents.'
                : 'This will update the website status to PUBLISHED and allow public visitors to access it.'}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsPublishConfirmOpen(false)}
                disabled={isPublishing}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      {publicationStatus === 'PUBLISHED' ? 'Confirm & Update Live Site' : 'Confirm & Publish'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Unpublish Confirmation Modal */}
      {isUnpublishConfirmOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-2xl animate-fadeIn font-sans">
            <div className="flex items-center space-x-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <GlobeLock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Unpublish Website?</h3>
                <p className="text-xs text-slate-400">Take this website offline</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs">
              <div>
                <span className="text-slate-500">Public URL:</span>{' '}
                <strong className="text-slate-300 font-mono">/site/{slug}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Public visitors will no longer be able to view this website (returns 404). All saved code will remain intact in your draft workspace.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsUnpublishConfirmOpen(false)}
                disabled={isUnpublishing}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUnpublish}
                disabled={isUnpublishing}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
              >
                {isUnpublishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Unpublishing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm & Unpublish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
