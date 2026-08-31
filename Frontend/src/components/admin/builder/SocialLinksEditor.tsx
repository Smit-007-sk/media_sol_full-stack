"use client";

import React from 'react';
import { WebsiteContent, SocialLink, SocialPlatform } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { Plus, Trash2, RotateCcw, Share2 } from 'lucide-react';

interface SocialLinksEditorProps {
  content: WebsiteContent | null;
  onUpdateSocialLinks: (socialLinks: SocialLink[]) => void;
  onResetSection: () => void;
  websiteId: string;
}

export function SocialLinksEditor({
  content,
  onUpdateSocialLinks,
  onResetSection,
  websiteId,
}: SocialLinksEditorProps) {
  const socialLinks = content?.socialLinks || [];

  const platformOptions: SocialPlatform[] = [
    'LINKEDIN',
    'TWITTER',
    'FACEBOOK',
    'INSTAGRAM',
    'YOUTUBE',
    'WHATSAPP',
    'OTHER',
  ];

  const handleAddLink = () => {
    const newLink: SocialLink = {
      id: 'temp-' + Date.now(),
      websiteId,
      platform: 'LINKEDIN',
      url: 'https://linkedin.com/company/emperormedia',
      sortOrder: socialLinks.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onUpdateSocialLinks([...socialLinks, newLink]);
  };

  const handleRemoveLink = (index: number) => {
    const updated = [...socialLinks];
    updated.splice(index, 1);
    onUpdateSocialLinks(updated);
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateSocialLinks(updated);
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <span className="text-xs font-bold text-stone-300">Social Profiles ({socialLinks.length})</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddLink}
            className="px-2.5 py-1 text-[11px] font-bold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-lg border border-[#C9A45C]/30 flex items-center space-x-1 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Social Link</span>
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
        {socialLinks.length === 0 ? (
          <div className="p-6 bg-[#161C19] border border-stone-800 rounded-xl text-center space-y-2">
            <Share2 className="w-8 h-8 text-[#C9A45C] mx-auto opacity-80" />
            <p className="text-xs text-stone-300">No social profiles added yet.</p>
            <button
              onClick={handleAddLink}
              className="px-3 py-1.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl"
            >
              Add First Profile
            </button>
          </div>
        ) : (
          socialLinks.map((link, idx) => (
            <div key={link.id || idx} className="p-3.5 bg-[#161C19] border border-stone-800 rounded-xl space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#C9A45C] uppercase">
                  Profile #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(idx)}
                  className="p-1 rounded text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                  title="Remove Social Profile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={link.platform}
                  onChange={(e) => handleUpdateItem(idx, 'platform', e.target.value)}
                  className="px-2.5 py-1.5 bg-[#121614] border border-stone-700 rounded-lg text-xs font-semibold text-[#C9A45C] outline-none"
                >
                  {platformOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleUpdateItem(idx, 'url', e.target.value)}
                  className="col-span-2 px-3 py-1.5 bg-[#121614] border border-stone-700 rounded-lg text-xs font-mono text-stone-100 outline-none focus:border-[#075C45]"
                  placeholder="https://social.com/username"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
