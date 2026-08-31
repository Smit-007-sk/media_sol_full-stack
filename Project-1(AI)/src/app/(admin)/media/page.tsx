"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { getMediaApi, createMediaApi, deleteMediaApi, MediaItem, MediaType } from '@/api/content';
import { getWebsitesApi, Website } from '@/api/websites';
import { useAuth } from '@/context/AuthContext';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { FullScreenForm } from '@/components/admin/FullScreenForm';
import { FormField } from '@/components/admin/FormField';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { Plus, Search, Image as ImageIcon, Trash2, Loader2, Upload } from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function GlobalMediaPage() {
  const { isAdmin } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string>('');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<MediaType | ''>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'IMAGE' as MediaType,
    url: '',
    storageKey: '',
    fileName: '',
    mimeType: 'image/jpeg',
    fileSize: 102400,
    width: 1920,
    height: 1080,
    altText: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localFileName, setLocalFileName] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message }]);
  };

  const fetchWebsitesList = async () => {
    try {
      const res = await getWebsitesApi({ limit: 100 });
      if (res.success && res.data.items.length > 0) {
        setWebsites(res.data.items);
        setSelectedWebsiteId(res.data.items[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch websites list:', err);
    }
  };

  const fetchMedia = useCallback(async () => {
    if (!selectedWebsiteId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await getMediaApi(selectedWebsiteId, {
        page,
        limit,
        search: search.trim() || undefined,
        type: typeFilter || undefined,
      });
      if (res.success) {
        setMediaList(res.data.items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch media assets');
    } finally {
      setIsLoading(false);
    }
  }, [selectedWebsiteId, page, limit, search, typeFilter]);

  useEffect(() => {
    fetchWebsitesList();
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check 10 MB maximum size limit
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      addToast(
        'error',
        `File "${file.name}" (${fileSizeMB} MB) exceeds maximum allowed size of 10 MB.`
      );
      e.target.value = '';
      return;
    }

    setLocalFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        url: dataUrl,
        fileName: file.name,
        storageKey: `local-uploads/${Date.now()}-${file.name}`,
        mimeType: file.type || 'image/jpeg',
        fileSize: file.size,
        altText: file.name.replace(/\.[^/.]+$/, ''),
        type: file.type.startsWith('video/') ? 'VIDEO' : file.type.startsWith('image/') ? 'IMAGE' : 'DOCUMENT',
      }));
      addToast('info', `Loaded local file (${(file.size / (1024 * 1024)).toFixed(2)} MB): ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWebsiteId || !formData.url.trim() || !formData.fileName.trim()) return;

    if (formData.fileSize > MAX_FILE_SIZE_BYTES) {
      addToast('error', 'File size exceeds maximum limit of 10 MB.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createMediaApi(selectedWebsiteId, formData);
      addToast('success', 'Media asset registered successfully');
      setIsModalOpen(false);
      setLocalFileName(null);
      fetchMedia();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to register media asset');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!selectedWebsiteId) return;
    try {
      await deleteMediaApi(selectedWebsiteId, id);
      addToast('success', 'Media record deleted successfully');
      fetchMedia();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to delete media asset');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Website Scope Selector */}
          <select
            value={selectedWebsiteId}
            onChange={(e) => {
              setSelectedWebsiteId(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-64 px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl outline-none font-bold shadow-sm"
          >
            {websites.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} (/{w.slug})
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search filename or alt text..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 font-semibold placeholder-slate-400 shadow-sm transition-all outline-none"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as MediaType | '');
              setPage(1);
            }}
            className="w-full sm:w-40 px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl outline-none font-bold shadow-sm"
          >
            <option value="">All Types</option>
            <option value="IMAGE">IMAGE</option>
            <option value="VIDEO">VIDEO</option>
            <option value="DOCUMENT">DOCUMENT</option>
          </select>
        </div>

        {isAdmin && selectedWebsiteId && (
          <button
            onClick={() => {
              setLocalFileName(null);
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Register Media Asset</span>
          </button>
        )}
      </div>

      {/* Grid Display */}
      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#FA8373] animate-spin" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-300 rounded-2xl bg-white shadow-sm">
          <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-extrabold text-slate-900">No Media Assets Found</p>
          <p className="text-xs text-slate-500 mt-1">Register media assets or upload directly from local computer storage (Max 10 MB).</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#FA8373] transition-all space-y-2 group shadow-sm"
            >
              <div className="h-32 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden relative">
                {item.type === 'IMAGE' ? (
                  <img
                    src={item.url}
                    alt={item.altText || item.fileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Delete Media"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 truncate">{item.fileName}</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {item.mimeType} &bull; {(item.fileSize / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      {/* Register Media Modal */}
      <FullScreenForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Media Asset"
        subtitle="Upload file directly from local storage (Max 10 MB) or register remote image URL"
        categoryBadge="Media Library"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText="Register Media Asset"
      >
        {/* Local Storage Upload Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            1. Direct Local Storage Upload (Max 10 MB)
          </h3>

          <div className="border-2 border-dashed border-slate-300 hover:border-[#FA8373] bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-6 transition-all text-center group cursor-pointer relative">
            <input
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={handleLocalFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-2.5 pointer-events-none">
              <div className="p-3 rounded-2xl bg-[#FA8373]/10 text-[#FA8373] border border-[#FA8373]/30 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">
                  {localFileName ? `Selected: ${localFileName}` : 'Choose File from Local Computer Storage'}
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Click to browse computer files or drag and drop image directly (Maximum file size: 10 MB)
                </p>
              </div>
              <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold text-[#FA8373] bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                <span>PNG, JPG, WEBP, GIF, SVG, MP4 (MAX 10 MB)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Live Preview Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            2. Media Asset Live Preview
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 h-36 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 relative group">
              {formData.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.url}
                  alt={formData.altText || 'Media preview'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-center p-4 text-slate-400">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <span className="text-[10px] font-bold block">No Media File Selected</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 font-medium">
                Uploaded file metadata or remote URL preview will instantly appear here before registering.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700 space-y-1">
                <div><strong className="text-slate-900">File Name:</strong> {formData.fileName || 'Not specified'}</div>
                <div><strong className="text-slate-900">Type:</strong> {formData.type} ({formData.mimeType || 'auto'})</div>
                <div><strong className="text-slate-900">Size:</strong> {(formData.fileSize / (1024 * 1024)).toFixed(2)} MB / 10.00 MB Max</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Asset Details & URLs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            3. Media Asset Details & Remote URL
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Media Type">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as MediaType })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              >
                <option value="IMAGE">IMAGE</option>
                <option value="VIDEO">VIDEO</option>
                <option value="DOCUMENT">DOCUMENT</option>
              </select>
            </FormField>

            <FormField label="Image URL / Data String" required>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/... or local upload data URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-[#FA8373] font-mono font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="File Name" required>
              <input
                type="text"
                required
                placeholder="banner.jpg"
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>

            <FormField label="Storage Key">
              <input
                type="text"
                placeholder="uploads/2026/banner.jpg"
                value={formData.storageKey || formData.fileName}
                onChange={(e) => setFormData({ ...formData, storageKey: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-700 font-mono outline-none transition-all shadow-sm"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="MIME Type">
              <input
                type="text"
                placeholder="image/jpeg"
                value={formData.mimeType}
                onChange={(e) => setFormData({ ...formData, mimeType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-mono outline-none transition-all shadow-sm"
              />
            </FormField>

            <FormField label="Alt Text / Caption">
              <input
                type="text"
                placeholder="Banner Hero Image"
                value={formData.altText}
                onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
          </div>
        </div>
      </FullScreenForm>

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
