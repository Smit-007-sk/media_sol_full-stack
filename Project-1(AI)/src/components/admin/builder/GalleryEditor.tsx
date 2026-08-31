"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { Image as ImageIcon, Plus, Trash2, RotateCcw } from 'lucide-react';

interface GalleryEditorProps {
  content: WebsiteContent | null;
  onOpenMediaPickerForGallery: (index?: number) => void;
  onRemoveGalleryItem: (index: number) => void;
  onResetSection: () => void;
}

export function GalleryEditor({
  content,
  onOpenMediaPickerForGallery,
  onRemoveGalleryItem,
  onResetSection,
}: GalleryEditorProps) {
  const galleries = content?.galleries || [];
  const primaryGallery = galleries[0];
  const items = primaryGallery?.items || [];

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <span className="text-xs font-bold text-stone-300">Media Showcase Gallery ({items.length})</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenMediaPickerForGallery()}
            className="px-2.5 py-1 text-[11px] font-bold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-lg border border-[#C9A45C]/30 flex items-center space-x-1 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Image</span>
          </button>
          <button
            onClick={onResetSection}
            className="p-1 text-stone-400 hover:text-amber-300 transition-colors"
            title="Reset section to saved database baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="col-span-2 p-6 bg-[#161C19] border border-stone-800 rounded-xl text-center space-y-2">
            <ImageIcon className="w-8 h-8 text-[#C9A45C] mx-auto opacity-80" />
            <p className="text-xs text-stone-300">No media items in gallery yet.</p>
            <button
              onClick={() => onOpenMediaPickerForGallery()}
              className="px-3 py-1.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl"
            >
              Select Image from Media Library
            </button>
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={item.id || idx} className="relative aspect-square bg-stone-900 border border-stone-800 rounded-xl overflow-hidden group shadow-md">
              <img
                src={item.mediaId || item.media?.url || '/placeholder.jpg'}
                alt={item.title || `Gallery Item ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-2">
                <span className="text-[10px] font-mono text-[#C9A45C] truncate max-w-full">Item #{idx + 1}</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => onOpenMediaPickerForGallery(idx)}
                    className="px-2.5 py-1 bg-[#075C45] text-[#C9A45C] text-[10px] font-bold rounded-lg border border-[#C9A45C]/30"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveGalleryItem(idx)}
                    className="p-1 bg-rose-950 text-rose-300 rounded-lg text-[10px]"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
