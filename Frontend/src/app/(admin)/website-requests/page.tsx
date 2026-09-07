"use client";

import React, { useEffect, useState, useCallback } from 'react';
import {
  getWebsiteRequestsApi,
  getWebsiteRequestApi,
  publishGeneratedWebsiteApi,
  unpublishGeneratedWebsiteApi,
  WebsiteRequest,
  WebsiteRequestStatus,
  WebsiteLifecycleStatus,
  WebsiteRequestsMetrics,
} from '@/api/websiteRequests';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { WebsiteRequestDetailsModal } from '@/components/admin/WebsiteRequestDetailsModal';
import { WebsiteCodeWorkspaceModal } from '@/components/admin/WebsiteCodeWorkspaceModal';
import {
  Search,
  Eye,
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  RefreshCw,
  Sparkles,
  Code,
  Globe,
  FileCode,
  ExternalLink,
  Layers,
  Check,
  Loader2,
  Power,
  UploadCloud,
} from 'lucide-react';

export default function WebsiteRequestsPage() {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<WebsiteRequestStatus | ''>('');
  const [websiteStatusFilter, setWebsiteStatusFilter] = useState<WebsiteLifecycleStatus | ''>('');
  const [metrics, setMetrics] = useState<WebsiteRequestsMetrics>({
    total: 0,
    noWebsite: 0,
    draft: 0,
    published: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Details Modal State
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [autoOpenPrompt, setAutoOpenPrompt] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message }]);
  };

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getWebsiteRequestsApi({
        page,
        limit,
        search: search.trim() || undefined,
        status: statusFilter || undefined,
        websiteStatus: websiteStatusFilter || undefined,
      });
      if (res.success) {
        setRequests(res.data.items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
        if (res.data.meta.metrics) {
          setMetrics(res.data.meta.metrics);
        }
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to fetch website requests');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, statusFilter, websiteStatusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleTogglePublish = async (req: WebsiteRequest) => {
    if (!req.generatedWebsite) {
      addToast('info', 'No website generated yet. Please open Workspace to generate or add website code first.');
      return;
    }

    const isCurrentlyPublished = req.generatedWebsite.status === 'PUBLISHED';
    setTogglingId(req.id);

    try {
      if (isCurrentlyPublished) {
        // Unpublish action
        const res = await unpublishGeneratedWebsiteApi(req.id);
        if (res.success) {
          addToast('info', `Website for "${req.businessName}" has been unpublished. Public access is now offline.`);
          await fetchRequests();
        }
      } else {
        // Publish action
        let targetSlug = req.generatedWebsite.slug?.trim();
        if (!targetSlug) {
          targetSlug = req.businessName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'site';
        }

        const res = await publishGeneratedWebsiteApi(req.id, targetSlug);
        if (res.success) {
          addToast('success', `Website for "${req.businessName}" is now published live at /site/${res.data.slug}!`);
          await fetchRequests();
        }
      }
    } catch (err: any) {
      addToast('error', err.message || `Failed to ${isCurrentlyPublished ? 'unpublish' : 'publish'} website.`);
    } finally {
      setTogglingId(null);
    }
  };

  const handleViewDetails = async (req: WebsiteRequest) => {
    setAutoOpenPrompt(false);
    setSelectedRequest(req);
    setIsDetailsModalOpen(true);
    // Fetch full details
    setIsLoadingDetails(true);
    try {
      const res = await getWebsiteRequestApi(req.id);
      if (res.success && res.data) {
        setSelectedRequest(res.data);
      }
    } catch (err) {
      console.error('Failed to load full request details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleOpenPrompt = async (req: WebsiteRequest) => {
    setAutoOpenPrompt(true);
    setSelectedRequest(req);
    setIsDetailsModalOpen(true);
    // Fetch full details
    setIsLoadingDetails(true);
    try {
      const res = await getWebsiteRequestApi(req.id);
      if (res.success && res.data) {
        setSelectedRequest(res.data);
      }
    } catch (err) {
      console.error('Failed to load full request details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleOpenWorkspace = async (req: WebsiteRequest) => {
    setSelectedRequest(req);
    setIsWorkspaceModalOpen(true);
    // Fetch full details
    setIsLoadingDetails(true);
    try {
      const res = await getWebsiteRequestApi(req.id);
      if (res.success && res.data) {
        setSelectedRequest(res.data);
      }
    } catch (err) {
      console.error('Failed to load full request details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Table Columns Definition
  const columns: ColumnDef<WebsiteRequest>[] = [
    {
      header: 'Business & Client',
      accessorKey: 'businessName',
      cell: (req) => (
        <div className="flex items-start space-x-3 py-1">
          <div className="w-8 h-8 rounded-lg bg-[#FA8373]/10 text-[#FA8373] border border-[#FA8373]/30 flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <button
              onClick={() => handleViewDetails(req)}
              className="font-bold text-slate-900 hover:text-[#FA8373] text-left text-xs transition-colors block truncate max-w-[200px]"
            >
              {req.businessName}
            </button>
            <p className="text-[11px] text-slate-500 font-medium truncate">{req.fullName}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (req) => (
        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 truncate max-w-[140px]">
          {req.category || 'General'}
        </span>
      ),
    },
    {
      header: 'Contact Info',
      cell: (req) => (
        <div className="space-y-0.5 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-600 truncate max-w-[170px]">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{req.email}</span>
          </div>
          {req.phone && (
            <div className="flex items-center space-x-1.5 text-slate-500 font-mono text-[11px]">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{req.phone}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Request Status',
      accessorKey: 'status',
      cell: (req) => <StatusBadge status={req.status} />,
    },
    {
      header: 'Website Status',
      cell: (req) => {
        const websiteStatus = req.generatedWebsite?.status;
        const isPublished = websiteStatus === 'PUBLISHED';
        const isDraft = websiteStatus === 'DRAFT';
        const hasWebsite = Boolean(req.generatedWebsite);
        const isToggling = togglingId === req.id;

        return (
          <div className="flex items-center space-x-2.5 py-0.5">
            {/* Status Badge */}
            {isPublished ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-emerald-950/70 text-emerald-300 border-emerald-800/50 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-emerald-400" />
                PUBLISHED
              </span>
            ) : isDraft ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-amber-950/50 text-amber-300 border-amber-800/60 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-amber-400" />
                DRAFT
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-slate-800/60 text-slate-400 border-slate-700/60 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-slate-500" />
                NO WEBSITE
              </span>
            )}

            {/* Toggle Button for Publish / Unpublish */}
            {hasWebsite ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePublish(req);
                }}
                disabled={isToggling}
                title={
                  isPublished
                    ? 'Click to Unpublish Website (take offline)'
                    : 'Click to Publish Website (make live)'
                }
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FA8373] focus:ring-offset-1 shadow-xs ${
                  isPublished
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-slate-300 hover:bg-slate-400'
                } ${isToggling ? 'opacity-70 cursor-wait' : ''}`}
                role="switch"
                aria-checked={isPublished}
              >
                <span
                  className={`pointer-events-none inline-flex h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out items-center justify-center ${
                    isPublished ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {isToggling ? (
                    <Loader2 className="w-2.5 h-2.5 text-slate-600 animate-spin" />
                  ) : isPublished ? (
                    <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  )}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenWorkspace(req);
                }}
                title="Create website code in Workspace before publishing"
                className="inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full bg-slate-100 border border-slate-200 px-0.5 opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="h-4 w-4 rounded-full bg-slate-300 inline-block" />
              </button>
            )}
          </div>
        );
      },
    },
    {
      header: 'Slug / Public URL',
      cell: (req) => {
        const slug = req.generatedWebsite?.slug;
        const isPublished = req.generatedWebsite?.status === 'PUBLISHED';
        if (slug) {
          return isPublished ? (
            <a
              href={`/site/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#FA8373] hover:underline truncate max-w-[150px]"
              title={`/site/${slug}`}
            >
              <span>/site/{slug}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="font-mono text-[11px] text-slate-500 font-medium truncate max-w-[150px]" title={`/site/${slug} (Draft)`}>
              /site/{slug}
            </span>
          );
        }
        return <span className="text-[11px] text-slate-400 font-medium">Not published</span>;
      },
    },
    {
      header: 'Updated',
      accessorKey: 'updatedAt',
      cell: (req) => {
        const dateToShow = req.generatedWebsite?.updatedAt || req.updatedAt || req.createdAt;
        return (
          <span className="text-[11px] text-slate-500 font-medium">
            {new Date(dateToShow).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (req) => {
        const isPublished = req.generatedWebsite?.status === 'PUBLISHED' && req.generatedWebsite?.slug;
        const isDraft = req.generatedWebsite?.status === 'DRAFT';
        const isToggling = togglingId === req.id;

        return (
          <div className="flex items-center justify-end space-x-1.5">
            {/* Quick Publish / Unpublish Action Button */}
            {req.generatedWebsite && (
              <button
                type="button"
                onClick={() => handleTogglePublish(req)}
                disabled={isToggling}
                className={`p-1.5 rounded-lg transition-all inline-flex items-center gap-1 text-xs font-bold border shadow-xs ${
                  isPublished
                    ? 'text-amber-700 hover:text-white bg-amber-50 hover:bg-amber-600 border-amber-200 hover:border-transparent'
                    : 'text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 border-emerald-200 hover:border-transparent'
                } ${isToggling ? 'opacity-70 cursor-wait' : ''}`}
                title={isPublished ? 'Unpublish website (take offline)' : 'Publish website (make live)'}
              >
                {isToggling ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isPublished ? (
                  <Power className="w-3.5 h-3.5" />
                ) : (
                  <UploadCloud className="w-3.5 h-3.5" />
                )}
                <span className="hidden xl:inline">
                  {isPublished ? 'Unpublish' : 'Publish'}
                </span>
              </button>
            )}

            {isPublished && (
              <a
                href={`/site/${req.generatedWebsite?.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 rounded-lg transition-all inline-flex items-center gap-1 text-xs font-bold border border-emerald-200 hover:border-transparent shadow-xs"
                title="Open Live Public Website"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Open</span>
              </a>
            )}
            <button
              onClick={() => handleOpenPrompt(req)}
              className="p-1.5 text-slate-700 hover:text-white bg-slate-100 hover:bg-gradient-to-r hover:from-[#FA8373] hover:to-[#e06858] rounded-lg transition-all inline-flex items-center gap-1 text-xs font-bold border border-slate-200 hover:border-transparent shadow-xs"
              title="Generate DeepSeek Prompt"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FA8373] hover:text-white" />
              <span className="hidden lg:inline">Prompt</span>
            </button>
            <button
              onClick={() => handleOpenWorkspace(req)}
              className="p-1.5 text-slate-600 hover:text-white hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-bold border border-slate-200 hover:border-slate-700"
              title="Open Code Workspace"
            >
              <Code className="w-3.5 h-3.5 text-[#FA8373]" />
              <span className="hidden md:inline">Workspace</span>
            </button>
            <button
              onClick={() => handleViewDetails(req)}
              className="p-1.5 text-slate-500 hover:text-[#FA8373] hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-bold"
              title="View Details"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Details</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Top Header & Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Requests */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Requests</span>
            <Inbox className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900">{metrics.total || total}</p>
        </div>

        {/* Metric 2: No Website */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">No Website</span>
            <FileCode className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-700">
            {metrics.noWebsite}
          </p>
        </div>

        {/* Metric 3: Draft Websites */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Draft Websites</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">
            {metrics.draft}
          </p>
        </div>

        {/* Metric 4: Published Websites */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Published Websites</span>
            <Globe className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600">
            {metrics.published}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search business, client, slug, email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl outline-none font-medium transition-all"
            />
          </div>

          {/* Request Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as WebsiteRequestStatus | '');
              setPage(1);
            }}
            className="w-full sm:w-40 px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl outline-none font-bold shadow-sm"
          >
            <option value="">All Request Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>

          {/* Website Status Filter */}
          <select
            value={websiteStatusFilter}
            onChange={(e) => {
              setWebsiteStatusFilter(e.target.value as WebsiteLifecycleStatus | '');
              setPage(1);
            }}
            className="w-full sm:w-40 px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#FA8373] text-xs text-slate-900 rounded-xl outline-none font-bold shadow-sm"
          >
            <option value="">All Website Statuses</option>
            <option value="NO_WEBSITE">No Website</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <button
          onClick={fetchRequests}
          disabled={isLoading}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Requests Data Table */}
      <DataTable<WebsiteRequest>
        columns={columns}
        data={requests}
        isLoading={isLoading}
        emptyTitle="No Website Requests Found"
        emptyDescription="Submitted leads from the Free Website Form will appear here."
        keyExtractor={(row) => row.id}
      />

      {/* Pagination */}
      {!isLoading && total > 0 && (
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
      )}

      {/* Website Request Details Modal */}
      <WebsiteRequestDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setAutoOpenPrompt(false);
        }}
        request={selectedRequest}
        onToast={addToast}
        autoOpenPrompt={autoOpenPrompt}
        onRefreshRequest={fetchRequests}
      />

      {/* Website Code Workspace Modal */}
      <WebsiteCodeWorkspaceModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => {
          setIsWorkspaceModalOpen(false);
          fetchRequests();
        }}
        request={selectedRequest}
        onToast={addToast}
        onOpenPrompt={() => {
          setIsWorkspaceModalOpen(false);
          setIsDetailsModalOpen(true);
        }}
      />
    </div>
  );
}
