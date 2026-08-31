"use client";

import React, { useEffect, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  allowFullscreenToggle?: boolean;
  initialFullscreen?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'xl',
  allowFullscreenToggle = true,
  initialFullscreen = false,
}: ModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(initialFullscreen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsFullscreen(initialFullscreen);
  }, [isOpen, initialFullscreen]);

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

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    full: 'max-w-full',
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Content Container Card - Dead Center */}
      <div
        className={`relative w-full ${
          isFullscreen
            ? 'h-screen max-h-screen rounded-none border-none'
            : `${maxWidthClasses[maxWidth]} ${maxWidth === 'sm' || maxWidth === 'md' ? 'h-auto max-h-[85vh]' : 'h-[88vh] max-h-[92vh]'} rounded-3xl border border-slate-200 shadow-2xl`
        } flex flex-col bg-white text-slate-900 text-left align-middle transform transition-all animate-fadeIn z-10 overflow-hidden`}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0F172A]">
          <div>
            <h3 className="text-base sm:text-lg font-black font-sans text-white">{title}</h3>
            {subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2">
            {allowFullscreenToggle && (
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen Form'}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#FA8373]" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 text-slate-900 space-y-4 bg-slate-50/50">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
