"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { changePasswordApi } from '@/api/auth';
import { FormField } from '@/components/admin/FormField';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { Shield, KeyRound, Loader2, Save, UserCheck } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToasts((prev) => [...prev, { id: Math.random().toString(), type, message }]);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError('Please enter your current password');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      await changePasswordApi({ currentPassword, newPassword });
      addToast('success', 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl animate-fadeIn">
      {/* Profile Summary Card */}
      <div className="p-6 rounded-2xl bg-[#161C19] border border-stone-800 shadow-xl space-y-4">
        <div className="flex items-center space-x-3 border-b border-stone-800 pb-4">
          <div className="p-3 rounded-xl bg-[#075C45]/30 text-[#C9A45C] border border-[#C9A45C]/30">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-100">Authenticated Account Profile</h3>
            <p className="text-xs text-stone-400">Current authenticated backend session credentials</p>
          </div>
        </div>

        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Email Address
              </span>
              <span className="text-xs font-mono font-medium text-stone-200">{user.email}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Assigned Role
              </span>
              <StatusBadge status={user.role} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Account ID
              </span>
              <span className="text-xs font-mono text-stone-400">{user.id}</span>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Card */}
      <div className="p-6 rounded-2xl bg-[#161C19] border border-stone-800 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 border-b border-stone-800 pb-4">
          <div className="p-3 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-800/40">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-100">Change Account Password</h3>
            <p className="text-xs text-stone-400">Update your backend account password credentials</p>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800/50 text-rose-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <FormField label="Current Password" required>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#121614] border border-stone-700 focus:border-[#075C45] rounded-lg text-xs text-stone-100 outline-none"
            />
          </FormField>

          <FormField label="New Password" required helpText="Minimum 6 characters">
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#121614] border border-stone-700 focus:border-[#075C45] rounded-lg text-xs text-stone-100 outline-none"
            />
          </FormField>

          <FormField label="Confirm New Password" required>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#121614] border border-stone-700 focus:border-[#075C45] rounded-lg text-xs text-stone-100 outline-none"
            />
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-xl border border-[#C9A45C]/30 shadow-lg flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Update Password</span>
          </button>
        </form>
      </div>

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
