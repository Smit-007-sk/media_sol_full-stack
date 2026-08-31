"use client";

import React, { useEffect, useState } from 'react';
import { getMediaApi, createMediaApi, MediaItem } from '@/api/content';
import { Modal } from './Modal';
import { Search, Loader2, Image as ImageIcon, Check, Plus, ExternalLink, Upload, AlertCircle } from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (url: string) => void;
  title?: string;
  websiteId?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const fallbackSampleMedia: Partial<MediaItem>[] = [
  { id: 'f1', fileName: 'corporate-hero.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', altText: 'Corporate Skyscraper' },
  { id: 'f2', fileName: 'creative-studio.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', altText: 'Minimal Studio Space' },
  { id: 'f3', fileName: 'luxury-estate.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', altText: 'Luxury Real Estate Villa' },
  { id: 'f4', fileName: 'tech-platform.jpg', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', altText: 'Cyber Artificial Intelligence' },
  { id: 'f5', fileName: 'fashion-atelier.jpg', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', altText: 'Editorial Fashion Atelier' },
  { id: 'f6', fileName: 'medical-care.jpg', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', altText: 'Clinical Health Facility' },
  { id: 'f7', fileName: 'hospitality-dining.jpg', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', altText: 'Luxury Fine Dining Restaurant' },
  { id: 'f8', fileName: 'modern-architecture.jpg', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', altText: 'Modern Interior Architecture' },
];

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelectMedia,
  title = 'Select Media Asset',
  websiteId,
}: MediaPickerModalProps) {
  const [assets, setAssets] = useState<Partial<MediaItem>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  // Add Custom Media Panel State
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [localFileName, setLocalFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fetchMedia = () => {
    if (!isOpen) return;
    setIsLoading(true);
    if (websiteId) {
      getMediaApi(websiteId, { limit: 100, search })
        .then((res) => {
          const dbItems = res?.data?.items || [];
          const dbUrls = new Set(dbItems.map((item) => item.url));
          const presetsToAdd = fallbackSampleMedia.filter((preset) => preset.url && !dbUrls.has(preset.url));
          setAssets([...dbItems, ...presetsToAdd]);
        })
        .catch(() => {
          setAssets(fallbackSampleMedia);
        })
        .finally(() => setIsLoading(false));
    } else {
      setAssets(fallbackSampleMedia);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [isOpen, search, websiteId]);

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check 10 MB maximum size limit
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadError(`File "${file.name}" (${fileSizeMB} MB) exceeds maximum allowed size of 10 MB.`);
      e.target.value = '';
      return;
    }

    setLocalFileName(file.name);
    setNewName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setNewUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!newUrl.trim()) return;

    setIsAdding(true);
    const targetUrl = newUrl.trim();
    const targetName = newName.trim() || localFileName || 'Custom Media Asset';

    if (websiteId) {
      try {
        const res = await createMediaApi(websiteId, {
          type: 'IMAGE',
          fileName: targetName,
          url: targetUrl,
          storageKey: `uploads/${Date.now()}-${targetName}`,
          mimeType: 'image/jpeg',
          fileSize: 0,
        });
        if (res && res.data) {
          const newAsset = res.data;
          setAssets((prev) => [newAsset, ...prev]);
          setSelectedUrl(newAsset.url);
        } else {
          setSelectedUrl(targetUrl);
        }
      } catch {
        setSelectedUrl(targetUrl);
      }
    } else {
      setSelectedUrl(targetUrl);
    }

    setIsAdding(false);
    setNewUrl('');
    setNewName('');
    setLocalFileName(null);
    setShowAddPanel(false);
  };

  const filteredAssets = assets.filter((asset) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      (asset.fileName && asset.fileName.toLowerCase().includes(q)) ||
      (asset.altText && asset.altText.toLowerCase().includes(q)) ||
      (asset.url && asset.url.toLowerCase().includes(q))
    );
  });

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelectMedia(selectedUrl);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} subtitle="Choose an image from your library or upload directly from local computer storage (Max 10 MB)" maxWidth="4xl">
      <div className="space-y-4 font-sans text-slate-900">
        
        {/* Top Controls: Search Bar + Add/Upload Media Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search media by filename, alt text, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 font-semibold outline-none transition-all shadow-sm"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setUploadError(null);
              setShowAddPanel(!showAddPanel);
            }}
            className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-[#FA8373] hover:bg-[#E86B5A] text-[#0B0F17] text-xs font-black rounded-xl border border-[#FA8373]/40 shadow-md transition-all whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span>{showAddPanel ? 'Close Upload Form' : 'Upload Local File / URL'}</span>
          </button>
        </div>

        {/* Upload Local File or Paste URL Form */}
        {showAddPanel && (
          <form onSubmit={handleAddCustomUrl} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
            <div className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              Upload from Local Storage (Max 10 MB) or Paste Image URL
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Direct Local File Dropzone */}
            <div className="border-2 border-dashed border-slate-300 hover:border-[#FA8373] bg-slate-50 hover:bg-slate-100/80 rounded-xl p-4 transition-all text-center group cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center justify-center space-x-3 pointer-events-none">
                <div className="p-2 rounded-xl bg-[#FA8373]/10 text-[#FA8373] border border-[#FA8373]/30">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900">
                    {localFileName ? `Selected: ${localFileName}` : 'Choose File from Local Computer Storage (Max 10 MB)'}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Click to browse local files or drop image directly
                  </p>
                </div>
              </div>
            </div>

            {/* Manual Image URL & Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Image URL / File Data</label>
                <input
                  type="text"
                  required
                  placeholder="Paste Image URL or select local file above..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:border-[#FA8373] font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Image Title / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Hero Banner Asset"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:border-[#FA8373] font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddPanel(false)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAdding || !newUrl.trim()}
                className="px-4 py-1.5 bg-[#FA8373] text-[#0B0F17] text-xs font-black rounded-xl border border-[#FA8373]/40 shadow-md disabled:opacity-50"
              >
                {isAdding ? 'Saving Asset...' : 'Save & Select Image'}
              </button>
            </div>
          </form>
        )}

        {/* Media Grid */}
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 text-[#FA8373] animate-spin" />
            <p className="text-xs text-slate-500 font-mono">Loading Media Library...</p>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-2 text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <ImageIcon className="w-10 h-10 text-slate-400" />
            <p className="text-sm font-extrabold text-slate-900">No Media Assets Found</p>
            <p className="text-xs text-slate-500 max-w-xs">Click "Upload Local File / URL" above to upload image files from your computer (Max 10 MB).</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-1">
            {filteredAssets.map((asset, idx) => {
              const isSelected = selectedUrl === asset.url;
              return (
                <div
                  key={asset.id || idx}
                  onClick={() => setSelectedUrl(asset.url || '')}
                  className={`group relative aspect-video bg-slate-100 border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    isSelected ? 'border-[#FA8373] ring-4 ring-[#FA8373]/30 shadow-lg scale-[1.02]' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.fileName || 'Media Asset'}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#FA8373] text-[#0B0F17] p-1 rounded-full border border-white shadow-md">
                      <Check className="w-3.5 h-3.5 font-black" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-[10px] text-white truncate font-mono font-bold">{asset.fileName || 'Image Asset'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-slate-600 truncate max-w-xs font-bold">
              {selectedUrl ? `Selected: ...${selectedUrl.slice(-30)}` : 'Click an image to select'}
            </span>
            <a
              href="/media"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center space-x-1 text-[11px] text-[#FA8373] hover:underline font-bold"
            >
              <span>Full Media Gallery</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedUrl}
              onClick={handleConfirmSelect}
              className="px-5 py-2 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md transition-all disabled:opacity-50"
            >
              Use Selected Image
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
