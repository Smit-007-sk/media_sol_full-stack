"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Crown, Eye, EyeOff, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { FormField } from '@/components/admin/FormField';

export default function LoginPage() {
  const { login, isLoading: isAuthLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#F97316] selection:text-white">
      <div className="w-full max-w-md space-y-8">
        {/* Header Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F97316] text-[#0B0F17] border border-orange-400/40 shadow-xl shadow-orange-950/40">
            <Crown className="w-8 h-8 font-bold" />
          </div>
          <div>
            <h1 className="font-sans text-2xl sm:text-3xl font-black text-white tracking-wide">
              EMPEROR ADMIN
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#F97316] font-bold mt-1">
              Central Management Portal
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800/50 flex items-start space-x-3 text-rose-200 text-xs">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField label="Email Address" required>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@example.test"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] rounded-xl text-xs text-white placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </FormField>

            <FormField label="Password" required>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] rounded-xl text-xs text-white placeholder-slate-500 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FormField>

            <button
              type="submit"
              disabled={isSubmitting || isAuthLoading}
              className="w-full py-3 px-4 rounded-xl text-xs font-black text-[#0B0F17] bg-[#F97316] hover:bg-[#EA580C] border border-orange-400/40 shadow-lg shadow-orange-950/40 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {(isSubmitting || isAuthLoading) && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Sign In to Dashboard</span>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500">
          Protected System &bull; Emperor Media Solution &copy; 2026
        </p>
      </div>
    </div>
  );
}
