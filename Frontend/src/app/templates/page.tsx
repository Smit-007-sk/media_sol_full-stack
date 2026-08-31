"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTemplatesApi, Template } from '@/api/templates';
import { getWebsitesApi, createWebsiteApi } from '@/api/websites';
import { getClientsApi } from '@/api/clients';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge } from '@/components/admin/StatusBadge';
import {
  getAllTemplateConfigs,
  resolveTemplateDefinition,
  duplicateTemplate,
  setTemplateStatus,
  toggleTemplateFeatured,
} from '@/templates';
import { TemplateConfig, TemplateStatus } from '@/templates/types';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import {
  Crown,
  Search,
  ArrowRight,
  Settings2,
  Loader2,
  LayoutTemplate,
  Sparkles,
  Eye,
  RefreshCw,
  Copy,
  Plus,
  X,
  CheckCircle2,
  Star,
} from 'lucide-react';

export default function UnifiedTemplateGalleryPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: 'toast-' + Date.now() + '-' + Math.random(), type, message, title }]);
  };

  // Use Template Modal State
  const [useTemplateModalOpen, setUseTemplateModalOpen] = useState(false);
  const [targetTemplate, setTargetTemplate] = useState<TemplateConfig | null>(null);
  const [newWebsiteName, setNewWebsiteName] = useState('');
  const [isCreatingWebsite, setIsCreatingWebsite] = useState(false);

  // Advanced Filters State
  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<'ALL' | 'Project-1' | 'Project-2'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [styleFilter, setStyleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'DRAFT'>('ALL');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [registeredConfigs, setRegisteredConfigs] = useState<TemplateConfig[]>([]);

  const refreshRegistryState = useCallback(() => {
    setRegisteredConfigs(getAllTemplateConfigs());
  }, []);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getTemplatesApi({ limit: 100 });
      if (res.success) {
        setTemplates(res.data.items);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load templates gallery');
    } finally {
      setIsLoading(false);
      refreshRegistryState();
    }
  }, [refreshRegistryState]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Combine backend items with catalog registeredConfigs
  const catalogTemplates = React.useMemo(() => {
    return registeredConfigs;
  }, [registeredConfigs]);

  // Filtered Templates
  const filteredCatalog = catalogTemplates.filter((config) => {
    // Project filter
    if (projectFilter === 'Project-1' && !config.project.includes('Project-1')) return false;
    if (projectFilter === 'Project-2' && !config.project.includes('Project-2')) return false;

    // Status filter
    if (statusFilter !== 'ALL' && (config.status || 'ACTIVE') !== statusFilter) return false;

    // Category filter
    if (categoryFilter !== 'ALL' && config.category !== categoryFilter) return false;

    // Style filter
    if (styleFilter !== 'ALL' && config.designStyle !== styleFilter) return false;

    // Featured filter
    if (featuredOnly && !config.isFeatured) return false;

    // Search query
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      const matchName = config.name.toLowerCase().includes(query);
      const matchKey = config.componentKey.toLowerCase().includes(query);
      const matchSlug = config.slug.toLowerCase().includes(query);
      const matchDesc = (config.description || '').toLowerCase().includes(query);
      const matchTags = config.tags?.some((t) => t.toLowerCase().includes(query));

      return matchName || matchKey || matchSlug || matchDesc || matchTags;
    }

    return true;
  });

  // Action: Duplicate Template
  const handleDuplicateTemplate = (config: TemplateConfig) => {
    const duplicated = duplicateTemplate(config.id || config.slug, `${config.name} (Cloned)`);
    if (duplicated) {
      refreshRegistryState();
      addToast('success', `Duplicated ${config.name} into ${duplicated.name}. Assigned independent catalog definition.`, 'Template Duplicated');
    } else {
      addToast('error', 'Failed to duplicate template definition.', 'Duplication Error');
    }
  };

  // Action: Toggle Status
  const handleToggleStatus = (config: TemplateConfig) => {
    const newStatus: TemplateStatus = (config.status || 'ACTIVE') === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setTemplateStatus(config.id || config.slug, newStatus);
    refreshRegistryState();
    addToast('info', `Updated ${config.name} lifecycle status to ${newStatus}.`, 'Status Updated');
  };

  // Action: Toggle Featured
  const handleToggleFeatured = (config: TemplateConfig) => {
    toggleTemplateFeatured(config.id || config.slug);
    refreshRegistryState();
    addToast('info', `Updated featured status for ${config.name}.`, 'Featured Status');
  };

  // Action: Open Use Template Modal
  const handleOpenUseTemplate = (config: TemplateConfig) => {
    setTargetTemplate(config);
    setNewWebsiteName(`${config.name} Site`);
    setUseTemplateModalOpen(true);
  };

  // Action: Execute Website Creation from Template
  const handleConfirmCreateWebsite = async () => {
    if (!targetTemplate || !newWebsiteName.trim()) return;
    setIsCreatingWebsite(true);
    try {
      let targetClientId = '';
      const clientsRes = await getClientsApi({ limit: 1 });
      if (clientsRes.success && clientsRes.data?.items?.[0]) {
        targetClientId = clientsRes.data.items[0].id;
      }

      const slug = newWebsiteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'my-website';
      const webRes = await createWebsiteApi({
        clientId: targetClientId,
        name: newWebsiteName,
        slug,
        templateId: targetTemplate.id || targetTemplate.slug,
        isPublished: false,
        status: 'DRAFT',
      });

      if (webRes && webRes.data) {
        addToast('success', `Website "${newWebsiteName}" created successfully. Loading Website Builder...`, 'Website Created');
        router.push(`/websites/${webRes.data.id}/builder`);
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to create website from template.', 'Creation Error');
    } finally {
      setIsCreatingWebsite(false);
      setUseTemplateModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1412] text-stone-100 font-sans selection:bg-[#075C45] selection:text-[#C9A45C]">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0F1412]/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#075C45] flex items-center justify-center text-[#C9A45C] border border-[#C9A45C]/30 shadow-lg">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-widest text-white">
                EMPEROR MEDIA SOLUTION
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-sans font-semibold">
                SCALABLE TEMPLATE MARKETPLACE & REGISTRY
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#C9A45C] border border-[#C9A45C]/30 px-3 py-1.5 rounded-xl bg-[#075C45]/30">
              <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-pulse" />
              <span>{registeredConfigs.length} CATALOG TEMPLATES</span>
            </div>
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 text-xs font-semibold text-stone-100 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-[#0F1412] via-[#075C45]/20 to-[#0F1412] border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#C9A45C] bg-[#C9A45C]/10 px-4 py-1.5 rounded-full border border-[#C9A45C]/30">
              SCALABLE TEMPLATE CATALOG FOR 100+ UNIQUE DESIGNS
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
              Template Marketplace & Catalog
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
              Browse, preview, duplicate, and create websites using self-contained templates. Every template features custom section structures, dynamic design tokens, and industry-matched copy.
            </p>
          </div>

          {/* Search & Advanced Filters Controls */}
          <div className="p-4 rounded-2xl bg-[#161C19] border border-stone-800 shadow-xl max-w-5xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, key, category, style..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#121614] border border-stone-700 focus:border-[#075C45] rounded-xl text-xs text-stone-100 placeholder-stone-500 transition-all outline-none"
                />
              </div>

              {/* Project Filter */}
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value as any)}
                className="w-full sm:w-40 px-3 py-2 bg-[#121614] border border-stone-700 text-xs text-stone-200 rounded-xl outline-none"
              >
                <option value="ALL">All Projects</option>
                <option value="Project-1">Project-1(AI)</option>
                <option value="Project-2">Project-2</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 bg-[#121614] border border-stone-700 text-xs text-stone-200 rounded-xl outline-none"
              >
                <option value="ALL">All Categories</option>
                <option value="business">Business</option>
                <option value="saas">SaaS / AI</option>
                <option value="real-estate">Real Estate</option>
                <option value="portfolio">Portfolio</option>
                <option value="healthcare">Healthcare</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full sm:w-36 px-3 py-2 bg-[#121614] border border-stone-700 text-xs text-stone-200 rounded-xl outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Inactive Only</option>
              </select>

              {/* Featured Toggle */}
              <button
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition-colors ${
                  featuredOnly ? 'bg-purple-950/80 border-purple-700 text-purple-300' : 'bg-[#121614] border-stone-700 text-stone-400 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${featuredOnly ? 'fill-current text-purple-400' : ''}`} />
                <span>Featured Only</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Templates Display */}
      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {isLoading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#C9A45C] animate-spin" />
            <p className="text-xs text-stone-400 font-mono">Loading template catalog registry...</p>
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-stone-800 rounded-2xl bg-[#161C19] space-y-2">
            <LayoutTemplate className="w-10 h-10 text-stone-500 mx-auto" />
            <p className="text-sm font-bold text-stone-200">No Catalog Templates Matched Criteria</p>
            <p className="text-xs text-stone-400">Try clearing your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCatalog.map((config) => (
              <TemplateCatalogCard
                key={config.id || config.slug}
                config={config}
                isAdmin={isAdmin}
                onDuplicate={() => handleDuplicateTemplate(config)}
                onToggleStatus={() => handleToggleStatus(config)}
                onToggleFeatured={() => handleToggleFeatured(config)}
                onUseTemplate={() => handleOpenUseTemplate(config)}
              />
            ))}
          </div>
        )}
      </main>

      {/* USE TEMPLATE CREATION MODAL */}
      {useTemplateModalOpen && targetTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#121614] border border-stone-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#C9A45C]" />
                <h3 className="text-lg font-bold font-serif text-white">Create Website from Template</h3>
              </div>
              <button onClick={() => setUseTemplateModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#161C19] border border-stone-800 space-y-2">
                <span className="text-[10px] font-mono text-[#C9A45C] uppercase">{targetTemplate.category}</span>
                <h4 className="text-base font-bold text-white font-serif">{targetTemplate.name}</h4>
                <p className="text-stone-400">{targetTemplate.description}</p>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">New Website Name</label>
                <input
                  type="text"
                  value={newWebsiteName}
                  onChange={(e) => setNewWebsiteName(e.target.value)}
                  placeholder="e.g. Apex Global Consulting"
                  className="w-full px-4 py-3 rounded-xl bg-[#090C0B] border border-stone-700 text-white outline-none focus:border-[#075C45]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setUseTemplateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  disabled={isCreatingWebsite || !newWebsiteName.trim()}
                  onClick={handleConfirmCreateWebsite}
                  className="px-6 py-2.5 rounded-xl bg-[#075C45] hover:bg-[#064e3b] text-white font-bold flex items-center space-x-2 shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}
                >
                  {isCreatingWebsite && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isCreatingWebsite ? 'Creating Site...' : 'Create & Open Builder'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-stone-800 text-center text-xs text-stone-500 font-mono">
        <p>© {new Date().getFullYear()} Emperor Media Solution. Scalable 100+ Template Catalog Architecture.</p>
      </footer>
    </div>
  );
}

// Catalog Card Component
function TemplateCatalogCard({
  config,
  isAdmin,
  onDuplicate,
  onToggleStatus,
  onToggleFeatured,
  onUseTemplate,
}: {
  config: TemplateConfig;
  isAdmin: boolean;
  onDuplicate: () => void;
  onToggleStatus: () => void;
  onToggleFeatured: () => void;
  onUseTemplate: () => void;
}) {
  const status = config.status || 'ACTIVE';

  return (
    <div className="group bg-[#161C19] border border-stone-800 hover:border-[#075C45] rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header Preview Banner */}
        <div className="relative h-48 bg-stone-900 border-b border-stone-800 p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#075C45]/80 text-[#C9A45C] border border-[#C9A45C]/40 backdrop-blur-sm">
              {config.category}
            </span>
            <div className="flex items-center space-x-2">
              {config.isFeatured && (
                <span className="text-[10px] font-mono uppercase bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-700/60 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current text-purple-400" />
                  <span>Featured</span>
                </span>
              )}
              <StatusBadge status={status === 'ACTIVE' ? 'PUBLISHED' : 'DRAFT'} />
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">
              KEY: {config.componentKey}
            </span>
            <h3 className="font-serif text-xl font-bold text-white truncate group-hover:text-[#C9A45C] transition-colors">
              {config.name}
            </h3>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
            {config.description}
          </p>

          {/* Tags */}
          {config.tags && config.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {config.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-[9px] font-mono bg-stone-900 text-stone-400 px-2 py-0.5 rounded border border-stone-800">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-[11px] font-mono text-stone-400 pt-3 border-t border-stone-800/80 flex items-center justify-between">
            <span>STYLE: {config.designStyle || 'Custom'}</span>
            <span className="text-[#C9A45C] font-semibold">{config.supportedSections?.length || 10} Modules</span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/templates/${config.slug || config.id}`}
            className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </Link>

          <button
            onClick={onUseTemplate}
            className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-[#075C45] hover:bg-[#064e3b] text-white text-xs font-bold rounded-xl border border-[#C9A45C]/30 shadow-md transition-all"
            style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Use Template</span>
          </button>
        </div>

        {/* Management Controls for Admin */}
        {isAdmin && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/60 font-mono text-[10px]">
            <button
              onClick={onDuplicate}
              className="py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg border border-stone-800 flex items-center justify-center space-x-1"
              title="Duplicate catalog template definition"
            >
              <Copy className="w-3 h-3" />
              <span>Clone</span>
            </button>
            <button
              onClick={onToggleStatus}
              className="py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg border border-stone-800 flex items-center justify-center space-x-1"
              title="Toggle active/inactive lifecycle state"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{status === 'ACTIVE' ? 'Deactivate' : 'Activate'}</span>
            </button>
            <button
              onClick={onToggleFeatured}
              className="py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-purple-300 rounded-lg border border-purple-900/40 flex items-center justify-center space-x-1"
              title="Toggle featured showcase status"
            >
              <Star className="w-3 h-3" />
              <span>{config.isFeatured ? 'Unfeature' : 'Feature'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
