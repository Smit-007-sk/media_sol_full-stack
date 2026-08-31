"use client";

import React from 'react';
import { Menu, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge } from './StatusBadge';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, onMenuToggle, actions }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between font-sans shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl font-extrabold font-sans text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {actions}

        {/* Public Template Site Preview Link */}
        <Link
          href="/templates"
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-[#FA8373] bg-[#FA8373]/10 hover:bg-[#FA8373]/20 border border-[#FA8373]/30 rounded-xl transition-all shadow-sm"
        >
          <span>View Templates</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {user && (
          <div className="hidden md:flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">{user.email}</p>
              <div className="mt-0.5">
                <StatusBadge status={user.role} />
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
