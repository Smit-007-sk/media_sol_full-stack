"use client";

import React from 'react';

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, required = false, helpText, labelClassName, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5 font-sans">
      <label className={`block text-[11px] font-extrabold uppercase tracking-wider text-slate-200 [aside_&]:text-slate-200 [form_&]:text-slate-200 ${labelClassName || ''}`}>
        {label} {required && <span className="text-rose-400 font-bold">*</span>}
      </label>
      {children}
      {helpText && !error && <p className="text-[11px] text-slate-400 font-medium mt-1">{helpText}</p>}
      {error && <p className="text-[11px] text-rose-400 font-bold mt-1">{error}</p>}
    </div>
  );
}

