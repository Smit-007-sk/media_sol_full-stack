"use client";

import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, required = false, helpText, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5 font-sans">
      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
        {label} {required && <span className="text-rose-500 font-bold">*</span>}
      </label>
      {children}
      {helpText && !error && <p className="text-[11px] text-slate-500 font-medium mt-1">{helpText}</p>}
      {error && <p className="text-[11px] text-rose-600 font-bold mt-1">{error}</p>}
    </div>
  );
}
