"use client";

import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = true,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="md" allowFullscreenToggle={false}>
      <div className="space-y-4 pb-1">
        <div className="flex items-start space-x-3.5">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isDanger ? 'bg-rose-950/80 text-rose-400 border border-rose-800/40' : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-sm text-stone-300 leading-relaxed pt-0.5">{message}</p>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-stone-800/60">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors disabled:opacity-50 ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-[#075C45] hover:bg-[#064e3b] text-[#C9A45C]'
            }`}
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
