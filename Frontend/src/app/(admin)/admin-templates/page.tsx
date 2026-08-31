"use client";

import React, { useEffect, useState, useCallback } from 'react';
import {
  getTemplatesApi,
  createTemplateApi,
  updateTemplateApi,
  deleteTemplateApi,
  Template,
} from '@/api/templates';
import { getProjectsApi, Project } from '@/api/projects';
import { useAuth } from '@/context/AuthContext';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { FullScreenForm } from '@/components/admin/FullScreenForm';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormField } from '@/components/admin/FormField';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminTemplatesPage() {
  const { isAdmin } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    slug: '',
    templateKey: '',
    description: '',
    previewImage: '',
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete State
  const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message, title }]);
  };

  const fetchProjectsList = async () => {
    try {
      const res = await getProjectsApi({ limit: 100 });
      if (res.success) {
        setProjectsList(res.data.items);
      }
    } catch (err) {
      console.error('Failed to fetch projects list:', err);
    }
  };

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getTemplatesApi({
        page,
        limit,
        search: search.trim() || undefined,
        projectId: selectedProjectId || undefined,
      });
      if (res.success) {
        setTemplates(res.data.items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch templates');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, selectedProjectId]);

  useEffect(() => {
    fetchProjectsList();
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleOpenCreate = () => {
    setEditingTemplate(null);
    setFormData({
      projectId: projectsList[0]?.id || '',
      name: '',
      slug: '',
      templateKey: '',
      description: '',
      previewImage: '',
      isActive: true,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      projectId: template.projectId,
      name: template.name,
      slug: template.slug,
      templateKey: template.templateKey,
      description: template.description || '',
      previewImage: template.previewImage || '',
      isActive: template.isActive,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const errors: Record<string, string> = {};
    if (!formData.projectId) errors.projectId = 'Project selection is required';
    if (!formData.name.trim()) errors.name = 'Template name is required';
    if (!formData.templateKey.trim()) errors.templateKey = 'Template Key is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingTemplate) {
        await updateTemplateApi(editingTemplate.id, {
          projectId: formData.projectId,
          name: formData.name.trim(),
          slug: formData.slug.trim() || undefined,
          templateKey: formData.templateKey.trim(),
          description: formData.description.trim() || undefined,
          previewImage: formData.previewImage.trim() || undefined,
          isActive: formData.isActive,
        });
        addToast('success', 'Template updated successfully');
      } else {
        await createTemplateApi({
          projectId: formData.projectId,
          name: formData.name.trim(),
          slug: formData.slug.trim() || undefined,
          templateKey: formData.templateKey.trim(),
          description: formData.description.trim() || undefined,
          previewImage: formData.previewImage.trim() || undefined,
          isActive: formData.isActive,
        });
        addToast('success', 'Template created successfully');
      }
      setIsModalOpen(false);
      fetchTemplates();
    } catch (err: any) {
      if (err.statusCode === 409) {
        addToast('error', err.message || 'Template key or slug already exists', 'Conflict Error (409)');
      } else {
        addToast('error', err.message || 'Operation failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTemplate) return;
    setIsDeleting(true);
    try {
      await deleteTemplateApi(deletingTemplate.id);
      addToast('success', 'Template deactivated successfully');
      setDeletingTemplate(null);
      if (templates.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchTemplates();
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to deactivate template');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Template>[] = [
    {
      header: 'Template Name',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.name}</p>
          {row.description && <p className="text-[11px] text-slate-500 max-w-xs truncate">{row.description}</p>}
        </div>
      ),
    },
    {
      header: 'Template Key',
      cell: (row) => <span className="font-mono text-[#FA8373] text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#FA8373]/10 border border-[#FA8373]/30">{row.templateKey}</span>,
    },
    {
      header: 'Slug',
      cell: (row) => <span className="font-mono text-slate-700 font-medium">/{row.slug}</span>,
    },
    {
      header: 'Project',
      cell: (row) => <span className="text-slate-800 font-semibold">{row.project?.name || '—'}</span>,
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.isActive ? 'ACTIVE' : 'INACTIVE'} />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end space-x-2">
          <Link
            href={`/templates/${row.slug || row.id}`}
            target="_blank"
            title={`Preview ${row.name}`}
            className="p-1.5 rounded-lg text-[#FA8373] hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          {isAdmin ? (
            <>
              <button
                onClick={() => handleOpenEdit(row)}
                title="Edit Template"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeletingTemplate(row)}
                title="Deactivate Template"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 placeholder-slate-400 shadow-sm transition-all outline-none"
            />
          </div>

          {/* Project Filter */}
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-56 px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-800 rounded-xl shadow-sm outline-none font-medium"
          >
            <option value="">All Projects</option>
            {projectsList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Create Button */}
        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Create New Template</span>
          </button>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={templates}
        isLoading={isLoading}
        emptyTitle="No Templates Found"
        emptyDescription="Create reusable website templates under a project."
        emptyActionLabel={isAdmin ? 'Create First Template' : undefined}
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
        title={editingTemplate ? 'Edit Template Specification' : 'Create New Template'}
        subtitle="Manage marketing-friendly name, description, parent project, and technical key"
        categoryBadge="Template CRUD"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText={editingTemplate ? 'Save Changes' : 'Create Template'}
      >
        {/* Section 1: Template Identity */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-bold text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            1. Template Identity & Project Association
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Parent Project" required error={formErrors.projectId}>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 outline-none transition-all"
              >
                <option value="">-- Select Parent Project --</option>
                {projectsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Marketing Template Name" required error={formErrors.name}>
              <input
                type="text"
                required
                placeholder="Emerald Prestige"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 outline-none transition-all"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Template Key" required error={formErrors.templateKey} helpText="Technical key e.g. template-01">
              <input
                type="text"
                required
                placeholder="template-01"
                value={formData.templateKey}
                onChange={(e) => setFormData({ ...formData, templateKey: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 outline-none font-mono text-[#FA8373] font-bold transition-all"
              />
            </FormField>

            <FormField label="URL Slug" helpText="Leave empty to auto-generate from name">
              <input
                type="text"
                placeholder="emerald-prestige"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 outline-none font-mono transition-all"
              />
            </FormField>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="isTemplateActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-slate-300 text-[#FA8373] focus:ring-0 w-4 h-4"
            />
            <label htmlFor="isTemplateActive" className="text-xs text-slate-800 font-bold cursor-pointer">
              Active Template Status
            </label>
          </div>
        </div>

        {/* Section 2: Marketing Overview & Preview Image */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-bold text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            2. Marketing Overview & Preview Image
          </h3>

          <FormField label="Descriptive Overview">
            <textarea
              rows={3}
              placeholder="Provide a marketing description of layout features, industry focus, and theme..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 outline-none transition-all"
            />
          </FormField>

          <FormField label="Preview Image URL">
            <input
              type="text"
              placeholder="/previews/project-1-ai-template-01.jpg"
              value={formData.previewImage}
              onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 outline-none font-mono text-slate-600 transition-all"
            />
          </FormField>
        </div>
      </FullScreenForm>

      {/* Delete / Deactivate Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deletingTemplate}
        onClose={() => setDeletingTemplate(null)}
        onConfirm={handleDelete}
        title="Deactivate Template"
        message={`Are you sure you want to deactivate template "${deletingTemplate?.name}"?`}
        confirmText="Deactivate"
        isLoading={isDeleting}
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
