"use client";
import React, { useState } from 'react';
import {
  WebsiteRequest,
  DesignBlueprintMetadata,
  generateDeepseekPromptApi,
  unpublishGeneratedWebsiteApi,
} from '@/api/websiteRequests';
import { Modal } from './Modal';

import { StatusBadge } from './StatusBadge';
import { WebsiteCodeWorkspaceModal } from './WebsiteCodeWorkspaceModal';
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  Tag,
  CheckCircle2,
  FileText,
  Sparkles,
  ExternalLink,
  Images,
  ZoomIn,
  X,
  Eye,
  ImageIcon,
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Layers,
  Clock,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Loader2,
  Terminal,
  Code,
  Globe,
  GlobeLock,
  Shuffle,
  Palette,
} from 'lucide-react';

interface WebsiteRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: WebsiteRequest | null;
  onToast?: (type: 'success' | 'error' | 'info', message: string) => void;
  autoOpenPrompt?: boolean;
  onRefreshRequest?: () => void;
}

export function WebsiteRequestDetailsModal({
  isOpen,
  onClose,
  request,
  onToast,
  autoOpenPrompt = false,
  onRefreshRequest,
}: WebsiteRequestDetailsModalProps) {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // DeepSeek Prompt Generator State
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [promptContent, setPromptContent] = useState('');
  const [designBlueprint, setDesignBlueprint] = useState<DesignBlueprintMetadata | null>(null);
  const [promptVariation, setPromptVariation] = useState<number>(0);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [promptError, setPromptError] = useState<string | null>(null);

  // Code Workspace State
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  // Unpublish State
  const [isUnpublishConfirmOpen, setIsUnpublishConfirmOpen] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  // Auto trigger prompt if requested directly from action button
  React.useEffect(() => {
    if (isOpen && autoOpenPrompt && request) {
      handleGeneratePrompt();
    }
  }, [isOpen, autoOpenPrompt, request?.id]);


  if (!request) return null;

  const logoAssets = request.assetReferences?.logoAssets || [];
  const bannerAssets = request.assetReferences?.bannerAssets || [];
  const allAssets = [
    ...logoAssets.map((a) => ({ ...a, tag: 'LOGO', placeholder: '{{LOGO_URL}}' })),
    ...bannerAssets.map((a, idx) => ({ ...a, tag: `IMAGE ${idx + 1}`, placeholder: `{{IMAGE_${idx + 1}_URL}}` })),
  ];

  const features = Array.isArray(request.selectedFeatures) ? request.selectedFeatures : [];

  const handleGeneratePrompt = async (options?: { action?: 'next' | 'reset'; variation?: number }) => {
    if (!request) return;
    setIsLoadingPrompt(true);
    setPromptError(null);
    setIsPromptModalOpen(true);
    try {
      const res = await generateDeepseekPromptApi(request.id, options);
      if (res.success && res.prompt) {
        setPromptContent(res.prompt);
        if (res.designBlueprint) {
          setDesignBlueprint(res.designBlueprint);
        }
        if (typeof res.variation === 'number') {
          setPromptVariation(res.variation);
        }
        if (onToast) {
          if (options?.action === 'next') {
            onToast('success', `Switched to Design Direction: "${res.designBlueprint?.direction || 'Alternative Design'}"`);
          } else {
            onToast('success', 'DeepSeek prompt generated successfully.');
          }
        }
        if (onRefreshRequest) {
          onRefreshRequest();
        }
      } else {
        setPromptError('Failed to generate prompt from server.');
        if (onToast) {
          onToast('error', 'Failed to generate prompt.');
        }
      }
    } catch (err: any) {
      const msg = err.message || 'An error occurred while generating prompt.';
      setPromptError(msg);
      if (onToast) {
        onToast('error', msg);
      }
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const handleCopyPrompt = async () => {
    if (!promptContent) return;
    try {
      await navigator.clipboard.writeText(promptContent);
      setIsCopied(true);
      if (onToast) {
        onToast('success', 'Prompt copied to clipboard.');
      }
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      if (onToast) {
        onToast('error', 'Failed to copy prompt to clipboard.');
      }
    }
  };

  const handleUnpublish = async () => {
    if (!request?.id) return;
    setIsUnpublishing(true);
    try {
      const res = await unpublishGeneratedWebsiteApi(request.id);
      if (res.success) {
        setIsUnpublishConfirmOpen(false);
        if (onToast) {
          onToast('info', 'Website unpublished. Public access is now offline.');
        }
        if (onRefreshRequest) {
          onRefreshRequest();
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={request.businessName || 'Website Request Details'}
        subtitle={`Submitted by ${request.fullName} on ${new Date(request.createdAt).toLocaleString()}`}
        maxWidth="4xl"
      >
        <div className="space-y-6 font-sans">
          {/* Top Overview Banner */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg border border-slate-800">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#FA8373]" />
                <h2 className="text-lg font-black text-white">{request.businessName}</h2>
              </div>
              <p className="text-xs text-slate-300">
                Contact: <strong className="text-white">{request.fullName}</strong> •{' '}
                <span className="text-slate-400">{request.email}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleGeneratePrompt()}
                className="px-4 py-2 bg-gradient-to-r from-[#FA8373] to-[#e06858] hover:from-[#f97361] hover:to-[#d0594a] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Generate DeepSeek Prompt</span>
              </button>


              <button
                type="button"
                onClick={() => setIsWorkspaceOpen(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl shadow-md border border-slate-700 hover:border-slate-600 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Code className="w-4 h-4 text-[#FA8373]" />
                <span>Code Workspace</span>
              </button>

              <div className="text-right pl-2 border-l border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Request Status
                </span>
                <StatusBadge status={request.status} className="mt-0.5" />
              </div>
            </div>

          </div>

          {/* Section 1: Client & Contact Info */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
              <Phone className="w-4 h-4 text-[#FA8373]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                1. Client & Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                  Full Name
                </span>
                <p className="font-bold text-slate-900">{request.fullName}</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                  Email Address
                </span>
                <a
                  href={`mailto:${request.email}`}
                  className="font-bold text-[#FA8373] hover:underline truncate block"
                >
                  {request.email}
                </a>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                  Phone Number
                </span>
                {request.phone ? (
                  <a
                    href={`tel:${request.phone}`}
                    className="font-mono font-bold text-slate-900 hover:text-[#FA8373]"
                  >
                    {request.phone}
                  </a>
                ) : (
                  <p className="text-slate-400 font-medium">Not provided</p>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                  WhatsApp Number
                </span>
                {request.alternatePhone ? (
                  <a
                    href={`https://wa.me/${request.alternatePhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
                  >
                    {request.alternatePhone}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <p className="text-slate-400 font-medium">Not provided</p>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                  Category / Industry
                </span>
                <p className="font-bold text-slate-900">{request.category || 'Corporate / Business'}</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                  Submitted At
                </span>
                <p className="font-medium text-slate-700">
                  {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Social Links */}
            {(request.instagram || request.facebook || request.linkedin) && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold mr-1">Social Profiles:</span>
                {request.instagram && (
                  <a
                    href={request.instagram.startsWith('http') ? request.instagram : `https://instagram.com/${request.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-700 border border-pink-200 rounded-lg font-bold hover:bg-pink-100"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{request.instagram}</span>
                  </a>
                )}
                {request.facebook && (
                  <a
                    href={request.facebook.startsWith('http') ? request.facebook : `https://facebook.com/${request.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold hover:bg-blue-100"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>{request.facebook}</span>
                  </a>
                )}
                {request.linkedin && (
                  <a
                    href={request.linkedin.startsWith('http') ? request.linkedin : `https://linkedin.com/in/${request.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg font-bold hover:bg-sky-100"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>{request.linkedin}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Requirements, Description & Features */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
              <FileText className="w-4 h-4 text-[#FA8373]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                2. Business Details & Requested Features
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {request.description && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                    Services / Business Description
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed whitespace-pre-wrap">
                    {request.description}
                  </p>
                </div>
              )}

              {request.specialInstructions && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                  <span className="text-[11px] text-amber-900 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Special Instructions / Notes
                  </span>
                  <p className="text-amber-900 font-medium leading-relaxed whitespace-pre-wrap">
                    {request.specialInstructions}
                  </p>
                </div>
              )}

              {features.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                    Selected Features ({features.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-[11px]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Uploaded Logo & Visual Assets */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center space-x-2">
                <Images className="w-4 h-4 text-[#FA8373]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  3. Uploaded Logo & Media Assets ({allAssets.length})
                </h3>
              </div>
            </div>

            {allAssets.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-2">
                <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No media assets uploaded</p>
                <p className="text-[11px] text-slate-400">
                  The client did not attach any logo or banner files with this request.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {allAssets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-[#FA8373] transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => setLightboxImage({ url: asset.url, title: asset.fileName })}
                    >
                      {asset.url.startsWith('data:image') || asset.url.startsWith('http') || asset.url.startsWith('/') ? (
                        <img
                          src={asset.url}
                          alt={asset.fileName}
                          className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-slate-500" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 text-white rounded text-[9px] font-black uppercase tracking-wider">
                        {asset.tag}
                      </span>
                    </div>

                    <div className="p-2 space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[11px] font-bold text-slate-900 truncate" title={asset.fileName}>
                          {asset.fileName}
                        </p>
                        <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded">
                          {asset.placeholder}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 border-t border-slate-200/60">
                        <span>{asset.fileSize ? `${(asset.fileSize / 1024).toFixed(0)} KB` : 'Attached'}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(asset.placeholder);
                                if (onToast) onToast('success', `Copied "${asset.placeholder}" to clipboard`);
                              } catch (e) {
                                if (onToast) onToast('error', 'Failed to copy tag');
                              }
                            }}
                            className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                            title="Copy placeholder tag"
                          >
                            Copy Tag
                          </button>
                          <button
                            type="button"
                            onClick={() => setLightboxImage({ url: asset.url, title: asset.fileName })}
                            className="text-[#FA8373] font-bold hover:underline"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Generated Website Lifecycle & Status */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#FA8373]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  4. Generated Website Lifecycle
                </h3>
              </div>
              <div>
                {request.generatedWebsite ? (
                  request.generatedWebsite.status === 'PUBLISHED' ? (
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full text-xs font-bold flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      PUBLISHED
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-300 rounded-full text-xs font-bold">
                      DRAFT
                    </span>
                  )
                ) : (
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-full text-xs font-bold">
                    NO WEBSITE
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Website Status</span>
                <p className="font-bold text-slate-900">
                  {request.generatedWebsite
                    ? request.generatedWebsite.status === 'PUBLISHED'
                      ? 'PUBLISHED'
                      : 'DRAFT'
                    : 'NO WEBSITE'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Public Slug</span>
                {request.generatedWebsite?.slug ? (
                  <a
                    href={`/site/${request.generatedWebsite.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-[#FA8373] hover:underline truncate block"
                  >
                    /site/{request.generatedWebsite.slug}
                  </a>
                ) : (
                  <p className="text-slate-400 font-medium">Not published</p>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Last Saved</span>
                <p className="font-medium text-slate-700">
                  {request.generatedWebsite?.updatedAt
                    ? new Date(request.generatedWebsite.updatedAt).toLocaleString()
                    : 'Never'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Published At</span>
                <p className="font-medium text-slate-700">
                  {request.generatedWebsite?.publishedAt
                    ? new Date(request.generatedWebsite.publishedAt).toLocaleString()
                    : 'Not published'}
                </p>
              </div>
            </div>

            {/* Actions for Website */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsWorkspaceOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Code className="w-3.5 h-3.5 text-[#FA8373]" />
                <span>Open Code Workspace</span>
              </button>

              {request.generatedWebsite?.status === 'PUBLISHED' && request.generatedWebsite?.slug && (
                <>
                  <a
                    href={`/site/${request.generatedWebsite.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Public Website</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsUnpublishConfirmOpen(true)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <GlobeLock className="w-3.5 h-3.5" />
                    <span>Unpublish</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Section 5: Associated Generation Job (if present) */}
          {request.job && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <Layers className="w-4 h-4 text-slate-700" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  5. Automated Generation Job
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Job ID
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-800 truncate block">
                    {request.job.id}
                  </span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Job Status
                  </span>
                  <StatusBadge status={request.job.status} className="mt-0.5" />
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Template Assigned
                  </span>
                  <span className="font-bold text-slate-800">
                    {request.job.selectedTemplate?.name || request.job.selectedTemplateId || 'Not assigned'}
                  </span>
                </div>
              </div>

              {request.job.errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Error details:</span>
                    <p className="font-mono text-[11px]">{request.job.errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* Unpublish Confirmation Modal */}
      {isUnpublishConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
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
                <strong className="text-slate-300 font-mono">/site/{request.generatedWebsite?.slug}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Visitors will no longer be able to access this public URL. Your website code will remain saved as a draft in the workspace.
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
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <span className="text-xs font-bold truncate max-w-md">{lightboxImage.title}</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* DeepSeek Website Generation Prompt Modal */}
      <Modal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        title="DeepSeek Website Generation Prompt"
        subtitle={`Deterministic website creation prompt tailored for "${request.businessName}"`}
        maxWidth="4xl"
      >
        <div className="space-y-4 font-sans">
          {/* Prompt Header Action Bar */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FA8373] to-[#e06858] flex items-center justify-center text-white shadow-md">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Bespoke Design Diversity Engine</h4>
                  <p className="text-[11px] text-slate-400">
                    Copy this prompt and paste directly into DeepSeek chat. Zero AI API calls required.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleGeneratePrompt({ action: 'next' })}
                  disabled={isLoadingPrompt}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                  title="Cycle to another distinct Design Direction & Architecture"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Generate New Design</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGeneratePrompt()}
                  disabled={isLoadingPrompt}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
                  title="Regenerate Current Prompt"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPrompt ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  disabled={isLoadingPrompt || !promptContent}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#FA8373] hover:bg-[#f97361] disabled:opacity-50 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Design Blueprint Highlights Bar */}
            {designBlueprint && (
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FA8373]/15 text-[#FA8373] border border-[#FA8373]/30 rounded-lg font-bold">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Design Direction: <strong>{designBlueprint.direction}</strong></span>
                  <span className="opacity-70 text-[10px] ml-0.5">#{promptVariation}</span>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800/90 text-slate-300 border border-slate-700 rounded-lg font-medium">
                  <span className="text-slate-400">Structure:</span>
                  <span className="text-slate-200 font-bold truncate max-w-xs">{designBlueprint.sectionArchitecture?.name}</span>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800/90 text-slate-300 border border-slate-700 rounded-lg font-medium">
                  <span className="text-slate-400">Palette:</span>
                  <span className="text-slate-200 font-bold">{designBlueprint.colorPhilosophy?.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Content Area */}
          {isLoadingPrompt ? (
            <div className="h-96 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-3 text-slate-400">
              <Loader2 className="w-8 h-8 text-[#FA8373] animate-spin" />
              <p className="text-xs font-bold text-slate-300">
                Constructing bespoke prompt with Design Diversity Blueprint...
              </p>
            </div>
          ) : promptError ? (
            <div className="p-6 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3 text-rose-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h5 className="text-xs font-bold text-rose-100">Failed to Generate Prompt</h5>
              </div>
              <p className="text-xs text-rose-300">{promptError}</p>
              <button
                type="button"
                onClick={() => handleGeneratePrompt()}
                className="px-3.5 py-1.5 bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="relative">
              <textarea
                readOnly
                value={promptContent}
                className="w-full h-96 p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed rounded-2xl border border-slate-800 focus:outline-none focus:border-[#FA8373] resize-none selection:bg-[#FA8373]/30 selection:text-white"
                placeholder="Generated prompt will appear here..."
              />
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
                {promptContent.length} characters • {promptContent.split('\n').length} lines
              </div>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              Paste the copied prompt into DeepSeek to generate <code className="font-mono text-slate-700">index.html</code>, <code className="font-mono text-slate-700">style.css</code>, and <code className="font-mono text-slate-700">script.js</code>.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPromptModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>


      {/* Website Code Workspace Modal */}
      <WebsiteCodeWorkspaceModal
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
        request={request}
        onToast={onToast}
        onOpenPrompt={() => {
          setIsWorkspaceOpen(false);
          handleGeneratePrompt();
        }}
      />
    </>
  );
}


