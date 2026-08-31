"use client";

import React, { useEffect, useState, useCallback } from 'react';
import {
  getWebsitesApi,
  createWebsiteApi,
  updateWebsiteApi,
  deleteWebsiteApi,
  Website,
  WebsiteStatus,
} from '@/api/websites';
import { getClientsApi, Client } from '@/api/clients';
import { getTemplatesApi, Template } from '@/api/templates';
import { useAuth } from '@/context/AuthContext';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { FullScreenForm } from '@/components/admin/FullScreenForm';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormField } from '@/components/admin/FormField';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { Plus, Search, Edit2, Archive, Settings2, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function WebsitesPage() {
  const { isAdmin } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [templatesList, setTemplatesList] = useState<Template[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<WebsiteStatus | ''>('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [formData, setFormData] = useState({
    clientId: '',
    templateId: '',
    name: '',
    slug: '',
    status: 'DRAFT' as WebsiteStatus,
    isPublished: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Publish / Unpublish Dialog State
  const [publishingWebsite, setPublishingWebsite] = useState<Website | null>(null);
  const [unpublishingWebsite, setUnpublishingWebsite] = useState<Website | null>(null);
  const [isPublishingToggle, setIsPublishingToggle] = useState(false);

  // Archive State
  const [archivingWebsite, setArchivingWebsite] = useState<Website | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message, title }]);
  };

  const fetchDropdowns = async () => {
    try {
      const [cliRes, tplRes] = await Promise.all([
        getClientsApi({ limit: 100 }),
        getTemplatesApi({ limit: 100 }),
      ]);
      if (cliRes.success) setClientsList(cliRes.data.items);
      if (tplRes.success) setTemplatesList(tplRes.data.items);
    } catch (err) {
      console.error('Failed to load dropdown options:', err);
    }
  };

  const fetchWebsites = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getWebsitesApi({
        page,
        limit,
        search: search.trim() || undefined,
        clientId: selectedClientId || undefined,
        templateId: selectedTemplateId || undefined,
        status: selectedStatus || undefined,
      });
      if (res.success) {
        setWebsites(res.data.items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch websites');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, selectedClientId, selectedTemplateId, selectedStatus]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const handleOpenCreate = () => {
    setEditingWebsite(null);
    setFormData({
      clientId: clientsList[0]?.id || '',
      templateId: templatesList[0]?.id || '',
      name: '',
      slug: '',
      status: 'DRAFT',
      isPublished: false,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (website: Website) => {
    setEditingWebsite(website);
    setFormData({
      clientId: website.clientId,
      templateId: website.templateId,
      name: website.name,
      slug: website.slug,
      status: website.status,
      isPublished: website.isPublished,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const errors: Record<string, string> = {};
    if (!formData.clientId) errors.clientId = 'Client selection is required';
    if (!formData.templateId) errors.templateId = 'Template selection is required';
    if (!formData.name.trim()) errors.name = 'Website name is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingWebsite) {
        await updateWebsiteApi(editingWebsite.id, {
          clientId: formData.clientId,
          templateId: formData.templateId,
          name: formData.name.trim(),
          slug: formData.slug.trim() || undefined,
          status: formData.status,
          isPublished: formData.isPublished,
        });
        addToast('success', 'Website updated successfully');
      } else {
        await createWebsiteApi({
          clientId: formData.clientId,
          templateId: formData.templateId,
          name: formData.name.trim(),
          slug: formData.slug.trim() || undefined,
          status: formData.status,
          isPublished: formData.isPublished,
        });
        addToast('success', 'Website created successfully');
      }
      setIsModalOpen(false);
      fetchWebsites();
    } catch (err: any) {
      addToast('error', err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPublish = async () => {
    if (!publishingWebsite) return;
    setIsPublishingToggle(true);
    try {
      await updateWebsiteApi(publishingWebsite.id, { isPublished: true, status: 'PUBLISHED' });
      addToast('success', `Website "${publishingWebsite.name}" published successfully!`);
      setPublishingWebsite(null);
      fetchWebsites();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to publish website');
    } finally {
      setIsPublishingToggle(false);
    }
  };

  const handleConfirmUnpublish = async () => {
    if (!unpublishingWebsite) return;
    setIsPublishingToggle(true);
    try {
      await updateWebsiteApi(unpublishingWebsite.id, { isPublished: false, status: 'DRAFT' });
      addToast('info', `Website "${unpublishingWebsite.name}" set to draft mode.`);
      setUnpublishingWebsite(null);
      fetchWebsites();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to unpublish website');
    } finally {
      setIsPublishingToggle(false);
    }
  };

  const handleArchive = async () => {
    if (!archivingWebsite) return;
    setIsArchiving(true);
    try {
      await deleteWebsiteApi(archivingWebsite.id);
      addToast('success', 'Website archived successfully');
      setArchivingWebsite(null);
      if (websites.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchWebsites();
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to archive website');
    } finally {
      setIsArchiving(false);
    }
  };

  const columns: ColumnDef<Website>[] = [
    {
      header: 'Website Name',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.name}</p>
          <p className="text-[11px] font-mono text-[#FA8373] font-semibold">/{row.slug}</p>
        </div>
      ),
    },
    {
      header: 'Client',
      cell: (row) => (
        <span className="text-slate-800 font-semibold">{row.client?.businessName || '—'}</span>
      ),
    },
    {
      header: 'Template',
      cell: (row) => (
        <span className="text-slate-700 text-xs font-mono font-medium">{row.template?.name || '—'}</span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Published',
      cell: (row) => (
        <StatusBadge status={row.isPublished ? 'PUBLISHED' : 'DRAFT'} />
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end space-x-2">
          {/* View Live Website Link */}
          <Link
            href={`/site/${row.slug || row.id}`}
            target="_blank"
            title="Open Public Website in New Tab"
            className="p-1.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          {/* Open Website Builder */}
          <Link
            href={`/websites/${row.id}/builder`}
            title="Open Interactive Website Builder"
            className="px-2.5 py-1 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] border border-[#FA8373]/40 rounded-lg flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B0F17]" />
            <span>Builder</span>
          </Link>

          {/* Manage Content Workspace */}
          <Link
            href={`/websites/${row.id}`}
            title="Content Workspace"
            className="px-2 py-1 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg flex items-center space-x-1 transition-colors"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Manage</span>
          </Link>

          {isAdmin ? (
            <>
              {/* Publish / Unpublish Toggle */}
              {row.isPublished ? (
                <button
                  onClick={() => setUnpublishingWebsite(row)}
                  title="Unpublish (Set to Draft)"
                  className="px-2.5 py-1 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                >
                  Unpublish
                </button>
              ) : (
                <button
                  onClick={() => setPublishingWebsite(row)}
                  title="Publish Website"
                  className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  Publish
                </button>
              )}

              {/* Edit Modal */}
              <button
                onClick={() => handleOpenEdit(row)}
                title="Edit Website Parameters"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {/* Archive */}
              {row.status !== 'ARCHIVED' && (
                <button
                  onClick={() => setArchivingWebsite(row)}
                  title="Archive Website"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <span className="text-[11px] text-slate-400 italic">Read-only (Staff)</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search websites..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 font-semibold placeholder-slate-400 shadow-sm transition-all outline-none"
            />
          </div>

          {/* Client Filter */}
          <select
            value={selectedClientId}
            onChange={(e) => {
              setSelectedClientId(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl shadow-sm outline-none font-bold"
          >
            <option value="">All Clients</option>
            {clientsList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.businessName}
              </option>
            ))}
          </select>

          {/* Template Filter */}
          <select
            value={selectedTemplateId}
            onChange={(e) => {
              setSelectedTemplateId(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl shadow-sm outline-none font-bold"
          >
            <option value="">All Templates</option>
            {templatesList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as WebsiteStatus | '');
              setPage(1);
            }}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl shadow-sm outline-none font-bold"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>

        {/* Create Button */}
        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="w-full lg:w-auto px-4 py-2.5 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center justify-center space-x-2 transition-all shrink-0"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Create New Website</span>
          </button>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={websites}
        isLoading={isLoading}
        emptyTitle="No Websites Found"
        emptyDescription="Create websites for active clients using available templates."
        emptyActionLabel={isAdmin ? 'Create First Website' : undefined}
        onEmptyAction={isAdmin ? handleOpenCreate : undefined}
        keyExtractor={(row) => row.id}
      />

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

      {/* Create / Edit Modal */}
      <FullScreenForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingWebsite ? 'Edit Website Profile' : 'Create New Website'}
        subtitle="Associate client account with website template and status"
        categoryBadge="Websites Registry"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText={editingWebsite ? 'Save Changes' : 'Create Website'}
      >
        {/* Section 1: Association Parameters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            1. Client & Template Association
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Target Client Organization" required error={formErrors.clientId}>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              >
                <option value="">-- Select Client --</option>
                {clientsList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.businessName} ({c.status})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Base Website Template" required error={formErrors.templateId}>
              <select
                value={formData.templateId}
                onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              >
                <option value="">-- Select Template --</option>
                {templatesList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.templateKey})
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Section 2: Website Identity */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            2. Website Identity & Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Website Name" required error={formErrors.name}>
              <input
                type="text"
                required
                placeholder="Acme Corporate Portal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>

            <FormField label="Public URL Slug" helpText="Leave empty to auto-generate from website name">
              <input
                type="text"
                placeholder="acme-corporate-portal"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-[#FA8373] font-bold outline-none font-mono transition-all shadow-sm"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Website Status">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as WebsiteStatus })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </FormField>

            <div className="flex items-center space-x-2 pt-5">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded border-slate-300 text-[#FA8373] focus:ring-[#FA8373] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="isPublished" className="text-xs text-slate-900 font-extrabold cursor-pointer">
                Mark as Published Live
              </label>
            </div>
          </div>
        </div>
      </FullScreenForm>

      {/* Confirm Publish Dialog */}
      <ConfirmDialog
        isOpen={!!publishingWebsite}
        onClose={() => setPublishingWebsite(null)}
        onConfirm={handleConfirmPublish}
        title="Publish Website to Public Internet"
        message={`Are you sure you want to publish "${publishingWebsite?.name}"? It will immediately become accessible to the public at /site/${publishingWebsite?.slug || publishingWebsite?.id}.`}
        confirmText="Publish Website"
        isLoading={isPublishingToggle}
      />

      {/* Confirm Unpublish Dialog */}
      <ConfirmDialog
        isOpen={!!unpublishingWebsite}
        onClose={() => setUnpublishingWebsite(null)}
        onConfirm={handleConfirmUnpublish}
        title="Unpublish Website"
        message={`Are you sure you want to unpublish "${unpublishingWebsite?.name}"? It will be removed from public access and placed back in draft mode.`}
        confirmText="Unpublish (Set Draft)"
        isLoading={isPublishingToggle}
      />

      {/* Confirm Archive Dialog */}
      <ConfirmDialog
        isOpen={!!archivingWebsite}
        onClose={() => setArchivingWebsite(null)}
        onConfirm={handleArchive}
        title="Archive Website"
        message={`Are you sure you want to archive website "${archivingWebsite?.name}"?`}
        confirmText="Archive Website"
        isLoading={isArchiving}
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
