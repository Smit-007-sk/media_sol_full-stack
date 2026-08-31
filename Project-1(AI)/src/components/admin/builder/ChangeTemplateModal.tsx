"use client";

import React, { useState } from 'react';
import { TemplateConfig } from '@/templates/types';
import { getAllTemplateConfigs } from '@/templates/registry';
import { RefreshCw, Check, AlertTriangle, X, Sparkles, Layers } from 'lucide-react';

interface ChangeTemplateModalProps {
  isOpen: boolean;
  currentTemplateId?: string;
  onClose: () => void;
  onConfirmSwitch: (newTemplateConfig: TemplateConfig) => Promise<void>;
}

export function ChangeTemplateModal({
  isOpen,
  currentTemplateId,
  onClose,
  onConfirmSwitch,
}: ChangeTemplateModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  if (!isOpen) return null;

  const allTemplates = getAllTemplateConfigs().filter((t) => t.status !== 'ARCHIVED');

  const handleConfirm = async () => {
    if (!selectedTemplate) return;
    setIsSwitching(true);
    try {
      await onConfirmSwitch(selectedTemplate);
      onClose();
    } catch (err) {
      console.error('Template switch error:', err);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-[#121614] border border-stone-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-stone-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#075C45]/40 border border-[#C9A45C]/30 text-[#C9A45C] flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Switch Website Template Engine</h2>
              <p className="text-xs text-stone-400">Change presentation layer without losing canonical database content</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Notice */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Content Preservation Guarantee:</span> Switching templates changes the visual layout, card treatments, and typography hierarchy. All existing text, images, SEO, services, gallery items, and contact data remain 100% intact in your database.
          </div>
        </div>

        {/* Template Selector Grid */}
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTemplates.map((template) => {
            const isCurrent = template.id === currentTemplateId || template.slug === currentTemplateId;
            const isSelected = selectedTemplate?.id === template.id;

            return (
              <div
                key={template.id || template.slug}
                onClick={() => !isCurrent && setSelectedTemplate(template)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                  isCurrent
                    ? 'border-stone-800 bg-stone-900/50 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'border-[#C9A45C] bg-[#075C45]/20 shadow-lg ring-1 ring-[#C9A45C]'
                    : 'border-stone-800 bg-[#161C19] hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono uppercase font-bold text-[#C9A45C] px-2.5 py-0.5 rounded bg-[#075C45]/40 border border-[#C9A45C]/20">
                      {template.category}
                    </span>
                    {template.isFeatured && (
                      <span className="text-[10px] font-mono uppercase text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                  {isCurrent ? (
                    <span className="text-[11px] font-mono text-stone-400">ACTIVE TEMPLATE</span>
                  ) : isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#C9A45C] text-black flex items-center justify-center">
                      <Check className="w-4 h-4 font-bold" />
                    </div>
                  ) : null}
                </div>

                <h3 className="text-lg font-bold font-serif text-white">{template.name}</h3>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">{template.description}</p>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>STYLE: {template.designStyle || 'Custom'}</span>
                  <span>{template.supportedSections?.length || 10} MODULES</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400 font-mono">
            Selected: <span className="text-white font-bold">{selectedTemplate ? selectedTemplate.name : 'None'}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:bg-stone-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              disabled={!selectedTemplate || isSwitching}
              onClick={handleConfirm}
              className="px-6 py-2.5 rounded-xl bg-[#075C45] hover:bg-[#097356] text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 flex items-center space-x-2"
              style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}
            >
              {isSwitching && <RefreshCw className="w-4 h-4 animate-spin" />}
              <span>{isSwitching ? 'Switching Template...' : 'Confirm Template Switch'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
