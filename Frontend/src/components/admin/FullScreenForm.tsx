"use client";

import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface FullScreenFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
  categoryBadge?: string;
}

export function FullScreenForm({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSubmit,
  isSubmitting = false,
  submitText = 'Save Changes',
  cancelText = 'Cancel',
  categoryBadge,
}: FullScreenFormProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] w-screen h-screen min-h-screen bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans overflow-hidden animate-fadeIn">
      {/* Dark Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Full-Screen Centered Card Container */}
      <div className="relative w-full max-w-4xl h-[88vh] max-h-[90vh] flex flex-col bg-white border border-slate-200 rounded-3xl shadow-2xl z-10 overflow-hidden transform transition-all text-slate-900">
        {/* Header Bar */}
        <header className="shrink-0 h-16 bg-[#0F172A] border-b border-slate-800 px-6 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3.5">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-[#FA8373] text-xs font-bold transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#FA8373]" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div>
              <div className="flex items-center space-x-2.5">
                <h2 className="text-base sm:text-lg font-black font-sans text-white">{title}</h2>
                {categoryBadge && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FA8373] bg-[#FA8373]/10 px-2.5 py-0.5 rounded-md border border-[#FA8373]/30">
                    {categoryBadge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Form"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Form Body Container */}
        <form onSubmit={onSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50/60">
          <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-900">
            {children}
          </div>

          {/* Sticky Bottom Action Footer */}
          <footer className="shrink-0 h-16 bg-white border-t border-slate-200 px-6 flex items-center justify-end space-x-3 z-20">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{submitText}</span>
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body
  );
}
