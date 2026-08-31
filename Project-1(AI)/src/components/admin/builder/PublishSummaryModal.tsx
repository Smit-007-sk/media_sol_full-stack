"use client";

import React from 'react';
import { Website } from '@/api/websites';
import { WebsiteContent } from '@/api/content';
import { Modal } from '@/components/admin/Modal';
import { CheckCircle2, AlertTriangle, Globe, Sparkles, ShieldCheck } from 'lucide-react';

interface PublishSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPublish: () => void;
  website: Website;
  content: WebsiteContent | null;
  isPublishing: boolean;
}

export function PublishSummaryModal({
  isOpen,
  onClose,
  onConfirmPublish,
  website,
  content,
  isPublishing,
}: PublishSummaryModalProps) {
  const theme = content?.theme;
  const hero = content?.hero;

  const checks = [
    { label: 'Website Identity Name', valid: !!website.name, detail: website.name || 'Missing name' },
    { label: 'Assigned Template', valid: !!website.template?.name, detail: website.template?.name || 'Missing template' },
    { label: 'Hero Headline Title', valid: !!hero?.title, detail: hero?.title || 'Hero title recommended' },
    { label: 'SEO Metadata Configuration', valid: !!theme?.seoTitle && !!theme?.seoDescription, detail: theme?.seoTitle ? 'SEO Title configured' : 'Using fallback title' },
    { label: 'Public Route Slug', valid: !!website.slug, detail: `/site/${website.slug || website.id}` },
  ];

  const totalValid = checks.filter((c) => c.valid).length;
  const isReady = totalValid === checks.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publish Website Checklist & Summary"
      subtitle="Review website readiness before publishing to public web route"
      maxWidth="lg"
    >
      <div className="space-y-4 font-sans text-stone-100">
        {/* Readiness Status Header Banner */}
        <div
          className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
            isReady
              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-200'
              : 'bg-amber-950/60 border-amber-800/60 text-amber-200'
          }`}
        >
          {isReady ? (
            <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-7 h-7 text-amber-400 shrink-0" />
          )}
          <div>
            <h4 className="text-sm font-bold">
              {isReady ? '✓ Ready to Publish Live' : `⚠ ${checks.length - totalValid} Item(s) Need Attention`}
            </h4>
            <p className="text-xs opacity-80">
              {isReady
                ? `Website "${website.name}" passes all pre-publish readiness checks.`
                : 'Some recommended fields are missing, but you may still proceed.'}
            </p>
          </div>
        </div>

        {/* Validation Checklist Grid */}
        <div className="space-y-2 bg-[#121614] p-3.5 border border-stone-800 rounded-xl">
          <span className="text-[11px] font-bold font-mono text-[#C9A45C] uppercase tracking-wider">Pre-Publish Audit</span>
          {checks.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1.5 border-b border-stone-800/60 last:border-0 text-xs">
              <div className="flex items-center space-x-2">
                {item.valid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="font-semibold text-stone-200">{item.label}</span>
              </div>
              <span className="font-mono text-[11px] text-stone-400 truncate max-w-xs">{item.detail}</span>
            </div>
          ))}
        </div>

        {/* Public Route Confirmation */}
        <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-between text-xs font-mono">
          <span className="text-stone-400">Public Target Route:</span>
          <span className="text-[#C9A45C] font-semibold">https://emperormedia.test/site/{website.slug}</span>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-stone-800">
          <button
            type="button"
            disabled={isPublishing}
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPublishing}
            onClick={onConfirmPublish}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Website'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
