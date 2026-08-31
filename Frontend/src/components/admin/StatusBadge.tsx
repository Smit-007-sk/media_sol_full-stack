"use client";

import React from 'react';

type BadgeType = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DRAFT' | 'PUBLISHED' | 'ADMIN' | 'STAFF' | string;

interface StatusBadgeProps {
  status: BadgeType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = status ? status.toUpperCase() : 'UNKNOWN';

  let colorStyle = 'bg-stone-800 text-stone-300 border-stone-700';

  switch (normalized) {
    case 'ACTIVE':
    case 'PUBLISHED':
      colorStyle = 'bg-emerald-950/70 text-emerald-300 border-emerald-800/50';
      break;
    case 'INACTIVE':
    case 'DRAFT':
      colorStyle = 'bg-amber-950/70 text-amber-300 border-amber-800/50';
      break;
    case 'ARCHIVED':
      colorStyle = 'bg-rose-950/70 text-rose-300 border-rose-800/50';
      break;
    case 'ADMIN':
      colorStyle = 'bg-purple-950/70 text-purple-300 border-purple-800/50';
      break;
    case 'STAFF':
      colorStyle = 'bg-sky-950/70 text-sky-300 border-sky-800/50';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${colorStyle} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {normalized}
    </span>
  );
}
