"use client";

import React from 'react';
import { WebsiteContent, ServiceItem } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { Plus, Trash2, RotateCcw, Briefcase } from 'lucide-react';

interface ServicesEditorProps {
  content: WebsiteContent | null;
  onUpdateServices: (services: ServiceItem[]) => void;
  onResetSection: () => void;
  websiteId: string;
}

export function ServicesEditor({ content, onUpdateServices, onResetSection, websiteId }: ServicesEditorProps) {
  const services = content?.services || [];

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: 'temp-' + Date.now(),
      websiteId,
      title: 'Executive Solution ' + (services.length + 1),
      shortDescription: 'High level business solution overview...',
      description: 'Comprehensive strategic consulting and implementation services...',
      icon: 'Briefcase',
      sortOrder: services.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onUpdateServices([...services, newService]);
  };

  const handleRemoveService = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    onUpdateServices(updated);
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateServices(updated);
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <span className="text-xs font-bold text-stone-300">Services & Solutions ({services.length})</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddService}
            className="px-2.5 py-1 text-[11px] font-bold text-[#C9A45C] bg-[#075C45] hover:bg-[#064e3b] rounded-lg border border-[#C9A45C]/30 flex items-center space-x-1 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
          <button
            onClick={onResetSection}
            className="p-1 text-stone-400 hover:text-amber-300 transition-colors"
            title="Reset section to saved database baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {services.length === 0 ? (
          <div className="p-6 bg-[#161C19] border border-stone-800 rounded-xl text-center space-y-2">
            <Briefcase className="w-8 h-8 text-[#C9A45C] mx-auto opacity-80" />
            <p className="text-xs text-stone-300">No services added yet.</p>
            <button
              onClick={handleAddService}
              className="px-3 py-1.5 text-xs font-semibold text-[#C9A45C] bg-[#075C45] rounded-xl"
            >
              Add First Service
            </button>
          </div>
        ) : (
          services.map((srv, idx) => (
            <div key={srv.id || idx} className="p-3.5 bg-[#161C19] border border-stone-800 rounded-xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#C9A45C] uppercase">
                  Service #{idx + 1}
                </span>
                <div className="flex items-center space-x-2">
                  {/* Active Toggle */}
                  <label className="flex items-center space-x-1 text-[10px] font-semibold text-stone-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={srv.isActive !== false}
                      onChange={(e) => handleUpdateItem(idx, 'isActive', e.target.checked)}
                      className="rounded border-stone-700 text-[#075C45] focus:ring-0"
                    />
                    <span>Active</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="p-1 rounded text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={srv.title}
                onChange={(e) => handleUpdateItem(idx, 'title', e.target.value)}
                className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none focus:border-[#075C45]"
                placeholder="Service Title"
              />

              <textarea
                rows={2}
                value={srv.description || srv.shortDescription || ''}
                onChange={(e) => {
                  handleUpdateItem(idx, 'description', e.target.value);
                  handleUpdateItem(idx, 'shortDescription', e.target.value);
                }}
                className="w-full px-3 py-2 bg-[#121614] border border-stone-700 rounded-lg text-xs text-stone-100 outline-none focus:border-[#075C45]"
                placeholder="Service Description"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
