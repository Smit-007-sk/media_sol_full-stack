"use client";

import React, { useEffect, useState } from 'react';
import { getClientsApi, Client } from '@/api/clients';
import { getWebsitesApi, Website } from '@/api/websites';
import { getProjectsApi, Project } from '@/api/projects';
import { getTemplatesApi, Template } from '@/api/templates';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ClientDetailsModal } from '@/components/admin/ClientDetailsModal';
import {
  Users,
  Globe,
  FolderKanban,
  FileCode2,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Client Details Modal State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [cliRes, webRes, prjRes, tplRes] = await Promise.all([
        getClientsApi({ limit: 100 }),
        getWebsitesApi({ limit: 100 }),
        getProjectsApi({ limit: 100 }),
        getTemplatesApi({ limit: 100 }),
      ]);

      if (cliRes.success) setClients(cliRes.data.items);
      if (webRes.success) setWebsites(webRes.data.items);
      if (prjRes.success) setProjects(prjRes.data.items);
      if (tplRes.success) setTemplates(tplRes.data.items);
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalProjects = projects.length;
  const totalTemplates = templates.length;
  const totalClients = clients.length;
  const activeClientsCount = clients.filter((c) => c.status === 'ACTIVE').length;
  const totalWebsites = websites.length;
  const publishedWebsitesCount = websites.filter((w) => w.isPublished).length;
  const draftWebsitesCount = websites.filter((w) => !w.isPublished && w.status !== 'ARCHIVED').length;
  const archivedWebsitesCount = websites.filter((w) => w.status === 'ARCHIVED').length;

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-slate-900">
      {/* Welcome Banner Card */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Welcome to Emperor Media Solution
            </h1>
            <ShieldCheck className="w-5 h-5 text-[#FA8373]" />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time status overview of Emperor Media Solution CMS platform
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={isLoading}
          className="px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center space-x-2 transition-all shadow-sm shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FA8373] ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Projects</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalProjects}</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Templates</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <FileCode2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalTemplates}</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Clients</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalClients}</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Websites</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalWebsites}</p>
        </div>

        {/* Metric 5 */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Active Clients</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{activeClientsCount}</p>
        </div>

        {/* Metric 6 */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Published Sites</span>
            <div className="p-2 bg-[#FA8373]/10 text-[#FA8373] rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{publishedWebsitesCount}</p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Recent Clients & Leads</span>
            </h3>
            <Link
              href="/clients"
              className="text-xs font-bold text-[#FA8373] hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {clients.slice(0, 5).map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 hover:border-[#FA8373] cursor-pointer transition-all shadow-xs"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#FA8373] transition-colors">
                      {client.businessName}
                    </p>
                    <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{client.email || 'Click to view full lead details'}</p>
                </div>
                <StatusBadge status={client.status} />
              </div>
            ))}
            {clients.length === 0 && !isLoading && (
              <p className="text-xs text-slate-400 text-center py-6">No clients or lead requests submitted yet.</p>
            )}
          </div>
        </div>

        {/* Recent Websites */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Globe className="w-4 h-4 text-purple-600" />
              <span>Recent Websites</span>
            </h3>
            <Link
              href="/websites"
              className="text-xs font-bold text-[#FA8373] hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {websites.slice(0, 5).map((site) => (
              <Link
                key={site.id}
                href={`/websites/${site.id}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-slate-900 truncate">{site.name}</p>
                  <p className="text-[11px] font-mono text-[#FA8373] font-semibold">/{site.slug}</p>
                </div>
                <StatusBadge status={site.isPublished ? 'PUBLISHED' : site.status} />
              </Link>
            ))}
            {websites.length === 0 && !isLoading && (
              <p className="text-xs text-slate-400 text-center py-6">No websites created yet.</p>
            )}
          </div>
        </div>

        {/* Status Distribution Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Website Status Distribution
            </h3>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Published Sites</span>
                <span className="text-emerald-600 font-bold">{publishedWebsitesCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalWebsites ? (publishedWebsitesCount / totalWebsites) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Draft Sites</span>
                <span className="text-amber-600 font-bold">{draftWebsitesCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalWebsites ? (draftWebsitesCount / totalWebsites) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Archived Sites</span>
                <span className="text-slate-500 font-bold">{archivedWebsitesCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full transition-all duration-500"
                  style={{ width: `${totalWebsites ? (archivedWebsitesCount / totalWebsites) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Details Modal */}
      <ClientDetailsModal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        client={selectedClient}
      />
    </div>
  );
}
