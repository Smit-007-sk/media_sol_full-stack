"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 min-h-screen w-full bg-[#0B0F17] text-white flex flex-col items-center justify-center space-y-3 font-sans">
        <Loader2 className="w-8 h-8 text-[#F97316] animate-spin" />
        <p className="text-xs text-slate-400 font-mono tracking-wider">Authenticating User Session...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getPageTitle = (path: string) => {
    if (path.startsWith('/dashboard')) return { title: 'Dashboard Overview', subtitle: 'System metrics and summary overview' };
    if (path.startsWith('/projects')) return { title: 'Projects Management', subtitle: 'Organize and manage core system projects' };
    if (path.startsWith('/admin-templates')) return { title: 'Templates Management', subtitle: 'Manage reusable agency website templates' };
    if (path.startsWith('/clients')) return { title: 'Clients Directory', subtitle: 'Manage active and archived client accounts' };
    if (path.startsWith('/websites/')) return { title: 'Website Content Workspace', subtitle: 'Scoped website content, media, and theme manager' };
    if (path.startsWith('/websites')) return { title: 'Websites Registry', subtitle: 'Manage client published and draft websites' };
    if (path.startsWith('/media')) return { title: 'Global Media Library', subtitle: 'View and manage uploaded media assets' };
    if (path.startsWith('/settings')) return { title: 'Account & System Settings', subtitle: 'Manage credentials and account preferences' };
    return { title: 'Admin Console', subtitle: 'Emperor Media Solution' };
  };

  const { title, subtitle } = getPageTitle(pathname);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 bg-[#F8FAFC]">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
