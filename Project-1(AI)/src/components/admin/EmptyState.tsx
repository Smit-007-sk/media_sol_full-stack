"use client";

import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No records found',
  description = 'There are no items matching your criteria or non exist yet.',
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-stone-800 rounded-xl bg-[#121614]/50 my-4">
      <div className="p-3 bg-stone-900 border border-stone-800 text-[#C9A45C] rounded-xl mb-4">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-base font-semibold text-stone-200 mb-1">{title}</h3>
      <p className="text-xs text-stone-400 max-w-sm leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#075C45] hover:bg-[#064e3b] text-[#C9A45C] border border-[#C9A45C]/30 transition-all shadow-md"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
