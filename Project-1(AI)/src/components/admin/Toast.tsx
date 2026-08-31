"use client";

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  const borderStyles = {
    success: 'border-emerald-500/30 bg-stone-900/95 text-emerald-200',
    error: 'border-rose-500/30 bg-stone-900/95 text-rose-200',
    info: 'border-sky-500/30 bg-stone-900/95 text-sky-200',
  };

  return (
    <div
      className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 animate-fadeIn ${borderStyles[toast.type]}`}
    >
      {icons[toast.type]}
      <div className="flex-1 text-sm">
        {toast.title && <h4 className="font-semibold text-stone-100 mb-0.5">{toast.title}</h4>}
        <p className="text-stone-300 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-stone-400 hover:text-stone-200 p-1 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
