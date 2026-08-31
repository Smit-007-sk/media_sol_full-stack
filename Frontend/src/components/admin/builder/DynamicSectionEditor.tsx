"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { SectionConfigSchema, FieldSchema } from '@/templates/types';
import { FormField } from '@/components/admin/FormField';
import { RotateCcw, Image as ImageIcon, Plus, Trash2, Sliders } from 'lucide-react';

interface DynamicSectionEditorProps {
  sectionConfig: SectionConfigSchema;
  content: WebsiteContent | null;
  onUpdateSectionContent: (sectionKey: string, fieldKey: string, value: any) => void;
  onOpenMediaPicker?: (fieldKey: string) => void;
  onResetSection?: () => void;
}

export function DynamicSectionEditor({
  sectionConfig,
  content,
  onUpdateSectionContent,
  onOpenMediaPicker,
  onResetSection,
}: DynamicSectionEditorProps) {
  // Extract content object for this specific section key from content
  const sectionData = (content as any)?.[sectionConfig.key] || {};

  const handleFieldChange = (fieldKey: string, value: any) => {
    onUpdateSectionContent(sectionConfig.key, fieldKey, value);
  };

  const renderFieldInput = (field: FieldSchema) => {
    const value = sectionData[field.key] !== undefined ? sectionData[field.key] : field.defaultValue || '';

    switch (field.type) {
      case 'textarea':
      case 'richText':
        return (
          <textarea
            rows={3}
            placeholder={field.placeholder || `Enter ${field.label}...`}
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
          />
        );

      case 'image':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={field.placeholder || 'Image URL or Asset ID'}
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="flex-1 px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none font-mono"
            />
            {onOpenMediaPicker && (
              <button
                type="button"
                onClick={() => onOpenMediaPicker(field.key)}
                className="p-2 bg-stone-800 hover:bg-stone-700 text-[#C9A45C] rounded-xl border border-stone-700 transition-colors"
                title="Select from Media Library"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full px-3 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
          >
            {(field.options || []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleFieldChange(field.key, e.target.checked)}
              className="w-4 h-4 rounded bg-stone-900 border-stone-700 text-[#075C45] focus:ring-0"
            />
            <span className="text-xs text-stone-300">Enable {field.label}</span>
          </label>
        );

      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder || '0'}
            value={value}
            onChange={(e) => handleFieldChange(field.key, parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none font-mono"
          />
        );

      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="flex-1 px-3 py-1.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs font-mono text-stone-100 outline-none"
            />
          </div>
        );

      case 'text':
      case 'url':
      case 'font':
      default:
        return (
          <input
            type="text"
            placeholder={field.placeholder || `Enter ${field.label}...`}
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#161C19] border border-stone-700 rounded-xl text-xs text-stone-100 outline-none focus:border-[#075C45]"
          />
        );
    }
  };

  const fieldsList = sectionConfig.fields || [
    { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Enter main headline...' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: 'Enter brief subtitle...' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed description text...' },
  ];

  return (
    <div className="space-y-5 font-sans text-stone-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <div>
          <h3 className="text-xs font-bold text-stone-300">{sectionConfig.name} Editor</h3>
          {sectionConfig.description && (
            <p className="text-[11px] text-stone-400 mt-0.5">{sectionConfig.description}</p>
          )}
        </div>
        {onResetSection && (
          <button
            onClick={onResetSection}
            className="flex items-center space-x-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
            title="Reset section to database baseline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Dynamic Fields */}
      <div className="space-y-4">
        {fieldsList.map((field) => (
          <FormField key={field.key} label={field.label}>
            {renderFieldInput(field)}
          </FormField>
        ))}
      </div>
    </div>
  );
}
