"use client";

import React from 'react';
import { Website } from '@/api/websites';
import { StatusBadge } from '@/components/admin/StatusBadge';
import {
  ArrowLeft,
  Save,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Undo2,
  Redo2,
  Maximize2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

export type ViewportType = 'desktop' | 'tablet' | 'mobile';

interface BuilderToolbarProps {
  website: Website;
  isDirty: boolean;
  isSaving: boolean;
  canUndo: boolean;
  canRedo: boolean;
  viewport: ViewportType;
  isFullscreen: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onViewportChange: (vp: ViewportType) => void;
  onToggleFullscreen: () => void;
  onSave: () => void;
  onSafeBack: (url: string) => void;
  onOpenPublishModal: () => void;
  onOpenUnpublishModal: () => void;
  onOpenChangeTemplateModal?: () => void;
  isAdmin: boolean;
}

export function BuilderToolbar({
  website,
  isDirty,
  isSaving,
  canUndo,
  canRedo,
  viewport,
  isFullscreen,
  onUndo,
  onRedo,
  onViewportChange,
  onToggleFullscreen,
  onSave,
  onSafeBack,
  onOpenPublishModal,
  onOpenUnpublishModal,
  onOpenChangeTemplateModal,
  isAdmin,
}: BuilderToolbarProps) {
  return (
    <header className="shrink-0 h-16 bg-[#0B0F17] border-b border-slate-800 px-3 sm:px-5 flex items-center justify-between z-30 shadow-xl font-sans gap-2 overflow-x-auto">
      {/* Left: Back & Website Identity */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          type="button"
          onClick={() => onSafeBack('/websites')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1E293B] border border-slate-700 text-slate-200 hover:text-white hover:border-[#FA8373] text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-[#FA8373]" />
          <span className="hidden sm:inline">Websites</span>
        </button>

        <div className="hidden md:block border-r border-slate-800 h-5" />

        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-xs sm:text-sm font-black text-white truncate max-w-[140px] sm:max-w-[200px]">{website.name}</h1>
            <StatusBadge status={website.isPublished ? 'PUBLISHED' : 'DRAFT'} />
          </div>
          <p className="text-[10px] text-slate-400 truncate hidden lg:block">
            Template: <span className="text-[#FA8373] font-bold">{website.template?.name || '—'}</span> &bull; Client: <span className="text-slate-300">{website.client?.businessName || '—'}</span>
          </p>
        </div>
      </div>

      {/* Center: Viewport & Canvas Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Undo / Redo */}
        <div className="hidden sm:flex items-center bg-[#0F172A] border border-slate-800 rounded-xl p-1 space-x-0.5 shadow-inner">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] disabled:opacity-30 transition-all"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] disabled:opacity-30 transition-all"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport Selector */}
        <div className="flex items-center bg-[#0F172A] border border-slate-800 rounded-xl p-1 space-x-1 shadow-inner">
          <button
            onClick={() => onViewportChange('desktop')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewport === 'desktop' ? 'bg-[#1E293B] text-[#FA8373] border border-[#FA8373]/50 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop Viewport"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => onViewportChange('tablet')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewport === 'tablet' ? 'bg-[#1E293B] text-[#FA8373] border border-[#FA8373]/50 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet Viewport"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => onViewportChange('mobile')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewport === 'mobile' ? 'bg-[#1E293B] text-[#FA8373] border border-[#FA8373]/50 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile Viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Fullscreen Preview Toggle */}
        <button
          onClick={onToggleFullscreen}
          className={`p-1.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition-all ${
            isFullscreen ? 'bg-[#1E293B] text-[#FA8373] border-[#FA8373]/50' : 'bg-[#0F172A] hover:bg-[#1E293B]'
          }`}
          title="Toggle Fullscreen Preview"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Unsaved Status & Action Buttons */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Save Status Pill */}
        {isDirty ? (
          <span className="hidden xl:inline-flex items-center space-x-1.5 text-[10px] font-mono text-[#FA8373] bg-[#FA8373]/10 px-2 py-1 rounded-lg border border-[#FA8373]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FA8373] animate-pulse" />
            <span>Unsaved</span>
          </span>
        ) : (
          <span className="hidden xl:inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-800/40">
            <Check className="w-3 h-3" />
            <span>Saved</span>
          </span>
        )}

        {/* Change Template Button */}
        {onOpenChangeTemplateModal && (
          <button
            onClick={onOpenChangeTemplateModal}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-200 bg-[#0F172A] hover:bg-[#1E293B] border border-slate-800 rounded-xl flex items-center space-x-1 transition-colors"
            title="Switch Template"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FA8373]" />
            <span className="hidden lg:inline">Switch</span>
          </button>
        )}

        {/* Live Preview Button */}
        <Link
          href={`/websites/${website.id}/preview`}
          target="_blank"
          className="px-2.5 py-1.5 text-xs font-bold text-slate-200 bg-[#0F172A] hover:bg-[#1E293B] border border-slate-800 rounded-xl flex items-center space-x-1 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#FA8373]" />
          <span className="hidden lg:inline">Preview</span>
        </Link>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={isSaving || !isDirty}
          className="px-3.5 py-1.5 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center space-x-1.5 transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>

        {/* Publish Toggle Button */}
        {isAdmin && (
          website.isPublished ? (
            <button
              onClick={onOpenUnpublishModal}
              className="px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/40 rounded-xl transition-all shadow-sm"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={onOpenPublishModal}
              className="px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-700/50 rounded-xl transition-all shadow-sm"
            >
              Publish
            </button>
          )
        )}
      </div>
    </header>
  );
}
