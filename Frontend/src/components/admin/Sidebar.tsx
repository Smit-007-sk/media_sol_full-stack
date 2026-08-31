"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  Users,
  Globe,
  Image as ImageIcon,
  Settings,
  Crown,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge } from './StatusBadge';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Template Gallery', href: '/templates', icon: LayoutTemplate },
    { name: 'Template Management', href: '/admin-templates', icon: Settings },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Websites', href: '/websites', icon: Globe },
    { name: 'Media Library', href: '/media', icon: ImageIcon },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container - Navy Black & Coral #FA8373 Theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B0F17] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-20 flex items-center space-x-3 px-6 border-b border-slate-800 bg-[#0F172A]">
            <div className="w-9 h-9 rounded-xl bg-[#FA8373] flex items-center justify-center text-[#0B0F17] border border-[#FA8373]/40 shrink-0 shadow-lg shadow-coral-950/40">
              <Crown className="w-5 h-5 font-bold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-sm font-black tracking-wider text-white truncate">
                EMPEROR ADMIN
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#FA8373] font-bold truncate">
                MEDIA SOLUTION
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1E293B] text-[#FA8373] border border-[#FA8373]/50 shadow-md shadow-rose-950/20'
                      : 'text-slate-300 hover:bg-[#1E293B]/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FA8373]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#FA8373]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-800 bg-[#0F172A]/90 space-y-3">
          {user && (
            <div className="flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-bold text-white truncate">{user.name || user.email}</p>
                <p className="text-[10px] text-slate-400 truncate mb-1">{user.email}</p>
                <StatusBadge status={user.role} />
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-[#FA8373] hover:bg-slate-800 border border-transparent hover:border-[#FA8373]/30 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
