"use client";

import React, { useEffect, useState } from 'react';
import { getClientsApi, Client } from '@/api/clients';
import { getWebsitesApi, Website } from '@/api/websites';
import { getProjectsApi, Project } from '@/api/projects';
import { getTemplatesApi, Template } from '@/api/templates';
import { getWebsiteRequestsApi, WebsiteRequest } from '@/api/websiteRequests';
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
  Inbox,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [websiteRequestsCount, setWebsiteRequestsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Client Details Modal State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [cliRes, webRes, prjRes, tplRes, reqRes] = await Promise.all([
        getClientsApi({ limit: 100 }),
        getWebsitesApi({ limit: 100 }),
        getProjectsApi({ limit: 100 }),
        getTemplatesApi({ limit: 100 }),
        getWebsiteRequestsApi({ limit: 1 }),
      ]);

      if (cliRes.success) setClients(cliRes.data.items);
      if (webRes.success) setWebsites(webRes.data.items);
      if (prjRes.success) setProjects(prjRes.data.items);
      if (tplRes.success) setTemplates(tplRes.data.items);
      if (reqRes.success) setWebsiteRequestsCount(reqRes.data.meta.total);
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

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/website-requests"
            className="px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-[#FA8373] to-[#e06858] hover:from-[#f97361] hover:to-[#d0594a] rounded-xl flex items-center space-x-2 transition-all shadow-md shrink-0 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Inbox className="w-4 h-4 text-white" />
            <span>Website Requests ({websiteRequestsCount})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center space-x-2 transition-all shadow-sm shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#FA8373] ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Quick Action Feature Card: Website Requests & DeepSeek Generator */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border border-slate-800 rounded-2xl text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FA8373] to-[#e06858] flex items-center justify-center text-white shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              Website Requests & DeepSeek Generator
              <span className="px-2 py-0.5 bg-[#FA8373]/20 text-[#FA8373] border border-[#FA8373]/30 rounded-full text-[10px] font-bold">
                {websiteRequestsCount} Leads
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Review incoming client website briefs, generate customized DeepSeek prompts, and paste HTML/CSS into the code workspace.
            </p>
          </div>
        </div>

        <Link
          href="/website-requests"
          className="px-5 py-2.5 bg-[#FA8373] hover:bg-[#f97361] text-white text-xs font-black rounded-xl flex items-center space-x-2 transition-all shadow-md shrink-0 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Open Website Requests</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
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
