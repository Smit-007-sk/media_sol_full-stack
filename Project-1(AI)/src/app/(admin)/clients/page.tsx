"use client";

import React, { useEffect, useState, useCallback } from 'react';
import {
  getClientsApi,
  createClientApi,
  updateClientApi,
  deleteClientApi,
  Client,
  ClientStatus,
} from '@/api/clients';
import { useAuth } from '@/context/AuthContext';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { FullScreenForm } from '@/components/admin/FullScreenForm';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormField } from '@/components/admin/FormField';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { ClientDetailsModal } from '@/components/admin/ClientDetailsModal';
import { sanitizeNumeric10Digits, isValidEmail, isValid10DigitPhone } from '@/utils/validation';
import { Plus, Search, Edit2, Archive, Eye } from 'lucide-react';

export default function ClientsPage() {
  const { isAdmin } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | ''>('');
  const [isLoading, setIsLoading] = useState(true);

  // Client Details Modal State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    slug: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    status: 'ACTIVE' as ClientStatus,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Archive State
  const [archivingClient, setArchivingClient] = useState<Client | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message, title }]);
  };

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getClientsApi({
        page,
        limit,
        search: search.trim() || undefined,
        status: statusFilter || undefined,
      });
      if (res.success) {
        setClients(res.data.items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch clients');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenCreate = () => {
    setEditingClient(null);
    setFormData({
      businessName: '',
      slug: '',
      description: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      status: 'ACTIVE',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      businessName: client.businessName,
      slug: client.slug,
      description: client.description || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      country: client.country || '',
      postalCode: client.postalCode || '',
      status: client.status,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const errors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      errors.businessName = 'Business name is required';
    }

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address (e.g. contact@domain.com)';
    }

    if (formData.phone.trim() && !isValid10DigitPhone(formData.phone)) {
      errors.phone = 'Phone number must be exactly 10 numeric digits';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingClient) {
        await updateClientApi(editingClient.id, {
          businessName: formData.businessName.trim(),
          slug: formData.slug.trim() || undefined,
          description: formData.description.trim() || undefined,
          email: formData.email.trim() || undefined,
          phone: formData.phone.trim() || undefined,
          address: formData.address.trim() || undefined,
          city: formData.city.trim() || undefined,
          state: formData.state.trim() || undefined,
          country: formData.country.trim() || undefined,
          postalCode: formData.postalCode.trim() || undefined,
          status: formData.status,
        });
        addToast('success', 'Client updated successfully');
      } else {
        await createClientApi({
          businessName: formData.businessName.trim(),
          slug: formData.slug.trim() || undefined,
          description: formData.description.trim() || undefined,
          email: formData.email.trim() || undefined,
          phone: formData.phone.trim() || undefined,
          address: formData.address.trim() || undefined,
          city: formData.city.trim() || undefined,
          state: formData.state.trim() || undefined,
          country: formData.country.trim() || undefined,
          postalCode: formData.postalCode.trim() || undefined,
          status: formData.status,
        });
        addToast('success', 'Client created successfully');
      }
      setIsModalOpen(false);
      fetchClients();
    } catch (err: any) {
      addToast('error', err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArchive = async () => {
    if (!archivingClient) return;
    setIsArchiving(true);
    try {
      await deleteClientApi(archivingClient.id);
      addToast('success', 'Client archived successfully');
      setArchivingClient(null);
      if (clients.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchClients();
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to archive client');
    } finally {
      setIsArchiving(false);
    }
  };

  const columns: ColumnDef<Client>[] = [
    {
      header: 'Business Name',
      accessorKey: 'businessName',
      cell: (row) => (
        <div
          onClick={() => setSelectedClient(row)}
          className="cursor-pointer group select-none"
          title="Click to view full client lead details"
        >
          <div className="flex items-center space-x-1.5">
            <p className="font-bold text-slate-900 group-hover:text-[#FA8373] transition-colors">{row.businessName}</p>
            <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] font-mono text-[#FA8373] font-semibold">/{row.slug}</p>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      cell: (row) => (
        <div className="text-xs space-y-0.5">
          {row.email && <p className="text-slate-800 font-semibold">{row.email}</p>}
          {row.phone && <p className="text-slate-600 font-mono text-[11px]">{row.phone}</p>}
          {!row.email && !row.phone && <span className="text-slate-400">—</span>}
        </div>
      ),
    },
    {
      header: 'Location',
      cell: (row) => {
        const parts = [row.city, row.state, row.country].filter(Boolean);
        return parts.length > 0 ? (
          <span className="text-slate-700 font-medium">{parts.join(', ')}</span>
        ) : (
          <span className="text-slate-400">—</span>
        );
      },
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end space-x-2">
          {/* View Details Button */}
          <button
            onClick={() => setSelectedClient(row)}
            title="View Full Client Lead Details"
            className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg flex items-center space-x-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#FA8373]" />
            <span>Details</span>
          </button>

          {isAdmin ? (
            <>
              <button
                onClick={() => handleOpenEdit(row)}
                title="Edit Client"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              {row.status !== 'ARCHIVED' && (
                <button
                  onClick={() => setArchivingClient(row)}
                  title="Archive Client"
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
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
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
              setStatusFilter(e.target.value as ClientStatus | '');
              setPage(1);
            }}
            className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] text-xs text-slate-800 rounded-xl shadow-sm outline-none font-medium"
          >
            <option value="">Active & Inactive (Exclude Archived)</option>
            <option value="ACTIVE">ACTIVE Only</option>
            <option value="INACTIVE">INACTIVE Only</option>
            <option value="ARCHIVED">ARCHIVED Only</option>
          </select>
        </div>

        {/* Create Button */}
        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-black text-[#0B0F17] bg-[#FA8373] hover:bg-[#E86B5A] rounded-xl border border-[#FA8373]/40 shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4 font-bold" />
            <span>Create New Client</span>
          </button>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={clients}
        isLoading={isLoading}
        emptyTitle="No Clients Found"
        emptyDescription="Create client accounts to associate websites."
        emptyActionLabel={isAdmin ? 'Create First Client' : undefined}
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

      {/* View Full Client Details Modal */}
      <ClientDetailsModal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        client={selectedClient}
      />

      {/* Create / Edit Modal */}
      <FullScreenForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? 'Edit Client Profile' : 'Create New Client'}
        subtitle="Manage organization parameters, contact details, and location"
        categoryBadge="Client Registry"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText={editingClient ? 'Save Changes' : 'Create Client'}
      >
        {/* Section 1: Basic Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            1. Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Client Business Name" required error={formErrors.businessName}>
              <input
                type="text"
                required
                placeholder="Acme Corporation"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>

            <FormField label="Account Status">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ClientStatus })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Email Address" error={formErrors.email} helpText="Standard format (e.g. contact@acme.test)">
              <input
                type="email"
                placeholder="contact@acme.test"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>

            <FormField label="Phone Number" error={formErrors.phone} helpText="Only numeric digits, exactly 10 digits">
              <input
                type="text"
                placeholder="9876543210"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: sanitizeNumeric10Digits(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-mono font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
          </div>
        </div>

        {/* Section 2: Business Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            2. Business & URL Profile
          </h3>

          <FormField label="URL Slug" helpText="Leave empty to auto-generate from business name">
            <input
              type="text"
              placeholder="acme-corporation"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-[#FA8373] font-bold outline-none transition-all font-mono shadow-sm"
            />
          </FormField>

          <FormField label="Business Overview / Description">
            <textarea
              rows={3}
              placeholder="Provide a short business description or internal notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-medium outline-none transition-all shadow-sm"
            />
          </FormField>
        </div>

        {/* Section 3: Location Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900">
          <h3 className="text-xs font-black text-[#FA8373] uppercase tracking-wider border-b border-slate-200 pb-2.5">
            3. Location Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FormField label="City">
              <input
                type="text"
                placeholder="Austin"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
            <FormField label="State">
              <input
                type="text"
                placeholder="Texas"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
            <FormField label="Country">
              <input
                type="text"
                placeholder="USA"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:border-[#FA8373] focus:ring-2 focus:ring-[#FA8373]/20 rounded-xl text-xs text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </FormField>
          </div>
        </div>
      </FullScreenForm>

      {/* Confirm Archive Dialog */}
      <ConfirmDialog
        isOpen={!!archivingClient}
        onClose={() => setArchivingClient(null)}
        onConfirm={handleArchive}
        title="Archive Client Account"
        message={`Are you sure you want to archive client "${archivingClient?.businessName}"? Archived clients will be hidden from default lists.`}
        confirmText="Archive Client"
        isLoading={isArchiving}
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
