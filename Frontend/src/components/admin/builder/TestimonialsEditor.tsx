"use client";

import React from 'react';
import { WebsiteContent, Testimonial } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { Plus, Trash2, RotateCcw, MessageSquareQuote, Image as ImageIcon } from 'lucide-react';

interface TestimonialsEditorProps {
  content: WebsiteContent | null;
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  onResetSection: () => void;
  onOpenMediaPickerForAvatar: (index: number) => void;
  websiteId: string;
}

export function TestimonialsEditor({
  content,
  onUpdateTestimonials,
  onResetSection,
  onOpenMediaPickerForAvatar,
  websiteId,
}: TestimonialsEditorProps) {
  const testimonials = content?.testimonials || [];

  const handleAddReview = () => {
    const newReview: Testimonial = {
      id: 'temp-' + Date.now(),
      websiteId,
      name: 'Executive Partner ' + (testimonials.length + 1),
      company: 'Global Enterprise Corp',
      role: 'Chief Strategy Officer',
      content: 'Outstanding strategic leadership, impeccable brand execution, and exceptional results.',
      sortOrder: testimonials.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onUpdateTestimonials([...testimonials, newReview]);
  };

  const handleRemoveReview = (index: number) => {
    const updated = [...testimonials];
    updated.splice(index, 1);
    onUpdateTestimonials(updated);
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateTestimonials(updated);
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <span className="text-xs font-bold text-stone-300">Client Endorsements ({testimonials.length})</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddReview}
            className="px-2.5 py-1 text-[11px] font-bold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-lg border border-[#C9A45C]/30 flex items-center space-x-1 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review</span>
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

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {testimonials.length === 0 ? (
          <div className="p-6 bg-[#161C19] border border-stone-800 rounded-xl text-center space-y-2">
            <MessageSquareQuote className="w-8 h-8 text-[#C9A45C] mx-auto opacity-80" />
            <p className="text-xs text-stone-300">No testimonials added yet.</p>
            <button
              onClick={handleAddReview}
              className="px-3 py-1.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl"
            >
              Add First Review
            </button>
          </div>
        ) : (
          testimonials.map((tst, idx) => (
            <div key={tst.id || idx} className="p-3.5 bg-[#161C19] border border-stone-800 rounded-xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#C9A45C] uppercase">
                  Review #{idx + 1}
                </span>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-1 text-[10px] font-semibold text-stone-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tst.isActive !== false}
                      onChange={(e) => handleUpdateItem(idx, 'isActive', e.target.checked)}
                      className="rounded border-stone-700 text-[#075C45] focus:ring-0"
                    />
                    <span>Active</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveReview(idx)}
                    className="p-1 rounded text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={tst.name}
                  onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none focus:border-[#075C45]"
                  placeholder="Author / Client Name"
                />
                <input
                  type="text"
                  value={tst.company || tst.role || ''}
                  onChange={(e) => {
                    handleUpdateItem(idx, 'company', e.target.value);
                    handleUpdateItem(idx, 'role', e.target.value);
                  }}
                  className="w-full px-3 py-1.5 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none focus:border-[#075C45]"
                  placeholder="Role / Organization"
                />
              </div>

              <textarea
                rows={2}
                value={tst.content}
                onChange={(e) => handleUpdateItem(idx, 'content', e.target.value)}
                className="w-full px-3 py-1.5 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none focus:border-[#075C45]"
                placeholder="Testimonial Quote / Endorsement..."
              />

              {/* Avatar Selection */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-800/80">
                <span className="text-[11px] text-stone-400">Avatar Image</span>
                <button
                  type="button"
                  onClick={() => onOpenMediaPickerForAvatar(idx)}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-[#C9A45C] text-[10px] font-semibold rounded-lg border border-stone-700 flex items-center space-x-1"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>{tst.avatarMediaId ? 'Change Avatar' : 'Select Avatar'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
