"use client";

import React, { useEffect, useState, useCallback } from 'react';
import {
  getProjectsApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  Project,
} from '@/api/projects';
import { useAuth } from '@/context/AuthContext';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { FullScreenForm } from '@/components/admin/FullScreenForm';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormField } from '@/components/admin/FormField';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { Plus, Search, Edit2, Trash2, CheckCircle2, Power } from 'lucide-react';

export default function ProjectsPage() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', isActive: true });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirm Delete State
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message, title }]);
  };

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProjectsApi({ page, limit, search: search.trim() || undefined });
      if (res.success) {
        let items = res.data.items;
        if (statusFilter === 'ACTIVE') {
          items = items.filter((p) => p.isActive);
        } else if (statusFilter === 'INACTIVE') {
          items = items.filter((p) => !p.isActive);
        }
        setProjects(items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({ name: '', slug: '', description: '', isActive: true });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      slug: project.slug,
      description: project.description || '',
      isActive: project.isActive,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleToggleActivate = async (project: Project) => {
    const nextState = !project.isActive;
    try {
      await updateProjectApi(project.id, { isActive: nextState });
      addToast(
        'success',
        `Project "${project.name}" ${nextState ? 'activated' : 'deactivated'} successfully!`
      );
      fetchProjects();
    } catch (err: any) {
      addToast('error', err.message || 'Failed to toggle project status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    if (!formData.name.trim()) {
      setFormErrors({ name: 'Project name is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingProject) {
        await updateProjectApi(editingProject.id, {
          name: formData.name.trim(),
          slug: formData.slug.trim() || undefined,
          description: formData.description.trim() || undefined,
          isActive: formData.isActive,
        });
        addToast('success', 'Project updated successfully');
      } else {
        await createProjectApi({
          name: formData.name.trim(),
          slug: formData.slug.trim() || undefined,
          description: formData.description.trim() || undefined,
          isActive: formData.isActive,
        });
        addToast('success', 'Project created successfully');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      addToast('error', err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    try {
      await deleteProjectApi(deletingProject.id);
      addToast('success', 'Project deactivated successfully');
      setDeletingProject(null);
      if (projects.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchProjects();
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to deactivate project');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Project>[] = [
    {
      header: 'Project Name',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.name}</p>
          {row.description && <p className="text-[11px] text-slate-500 max-w-xs truncate">{row.description}</p>}
        </div>
      ),
    },
    {
      header: 'Slug',
      accessorKey: 'slug',
      cell: (row) => <span className="font-mono text-slate-700 font-medium">/{row.slug}</span>,
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.isActive ? 'ACTIVE' : 'INACTIVE'} />,
    },
    {
      header: 'Created At',
      cell: (row) => <span className="text-slate-600 font-medium">{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end space-x-2">
          {isAdmin ? (
            <>
              {/* Quick Activate / Deactivate Toggle Button */}
              {row.isActive ? (
                <button
                  onClick={() => handleToggleActivate(row)}
                  title="Deactivate Project"
                  className="px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>Deactivate</span>
                </button>
              ) : (
                <button
                  onClick={() => handleToggleActivate(row)}
                  title="Activate Project"
                  className="px-2.5 py-1 text-[11px] font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Activate</span>
                </button>
              )}

              {/* Edit */}
              <button
                onClick={() => handleOpenEdit(row)}
                title="Edit Project Parameters"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {/* Delete / Deactivate */}
              <button
                onClick={() => setDeletingProject(row)}
                title="Delete Project Record"
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
      {/* Top Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] rounded-xl text-xs text-slate-900 placeholder-slate-400 shadow-sm transition-all outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl outline-none font-bold shadow-sm"
          >
            <option value="">All Statuses (Active & Inactive)</option>
            <option value="ACTIVE">ACTIVE Only</option>
            <option value="INACTIVE">INACTIVE Only</option>
          </select>
        </div>

        {/* Create Button */}
        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Create New Project</span>
          </button>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={projects}
        isLoading={isLoading}
        emptyTitle="No Projects Found"
        emptyDescription="Start by creating a core project for templates."
        emptyActionLabel={isAdmin ? 'Create First Project' : undefined}
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
        title={editingProject ? 'Edit Project Profile' : 'Create New Project'}
        subtitle="Manage top-level project container parameters and status"
        categoryBadge="Projects"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText={editingProject ? 'Save Changes' : 'Create Project'}
      >
        {/* Section 1: Project Identity */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            1. Project Identity & Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Project Name" required error={formErrors.name}>
              <input
                type="text"
                required
                placeholder="AI Solutions Project"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>

            <FormField label="URL Slug" helpText="Leave empty to auto-generate from project name">
              <input
                type="text"
                placeholder="ai-solutions-project"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-[#FA8373] font-mono font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <FormField label="Project Status (Active / Inactive)">
              <select
                value={formData.isActive ? 'ACTIVE' : 'INACTIVE'}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'ACTIVE' })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              >
                <option value="ACTIVE">ACTIVE (Project Live & Enabled)</option>
                <option value="INACTIVE">INACTIVE (Project Disabled)</option>
              </select>
            </FormField>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-slate-300 text-[#FA8373] focus:ring-[#FA8373] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="isActive" className="text-xs text-slate-900 font-extrabold cursor-pointer">
                Mark as Active Project
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Description & Overview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            2. Project Overview & Description
          </h3>

          <FormField label="Project Description">
            <textarea
              rows={4}
              placeholder="Provide an architectural overview or description for this project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-medium outline-none transition-all shadow-sm"
            />
          </FormField>
        </div>
      </FullScreenForm>

      {/* Delete / Deactivate Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDelete}
        title="Deactivate Project"
        message={`Are you sure you want to deactivate project "${deletingProject?.name}"?`}
        confirmText="Deactivate"
        isLoading={isDeleting}
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
