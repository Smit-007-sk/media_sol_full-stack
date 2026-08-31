"use client";

import React from 'react';

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-stone-800 bg-[#161C19] animate-pulse space-y-3">
      <div className="h-4 bg-stone-800 rounded w-1/3" />
      <div className="h-8 bg-stone-800 rounded w-1/2" />
      <div className="h-3 bg-stone-800 rounded w-2/3" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse border-b border-stone-800/60">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-stone-800 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}
