"use client";

import React from 'react';
import { Client } from '@/api/clients';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Tag,
  CheckCircle2,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function ClientDetailsModal({ isOpen, onClose, client }: ClientDetailsModalProps) {
  if (!client) return null;

  // Parse description lines for structured lead details
  const descLines = (client.description || '').split('\n').filter(Boolean);
  const parsedData: Record<string, string> = {};

  descLines.forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      parsedData[key] = val;
    }
  });

  const leadContactName = parsedData['Lead Contact'] || client.businessName;
  const category = parsedData['Category'] || 'Corporate / Business';
  const services = parsedData['Services/Requirements'];
  const featuresRaw = parsedData['Features Requested'];
  const features = featuresRaw ? featuresRaw.split(',').map((f) => f.trim()).filter(Boolean) : [];
  const socialMedia = parsedData['Social Media'];
  const altPhone = parsedData['Alt Phone'];
  const notes = parsedData['Notes'];
  const otherDescription = !descLines.some((l) => l.includes(':')) ? client.description : null;

  const locationParts = [client.city, client.state, client.country].filter(Boolean);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={client.businessName}
      subtitle={`Client Account & Website Request Details (/${client.slug})`}
      maxWidth="3xl"
    >
      <div className="space-y-5 font-sans text-slate-900">
        
        {/* Top Header Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-[#FA8373]/10 text-[#FA8373] border border-[#FA8373]/30 rounded-2xl shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h2 className="text-lg font-black text-slate-900">{client.businessName}</h2>
                <StatusBadge status={client.status} />
              </div>
              <p className="text-xs font-mono text-[#FA8373] font-bold mt-0.5">/{client.slug}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Registered: {new Date(client.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Section 1: Contact Information */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
            <Mail className="w-4 h-4 text-[#FA8373]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              1. Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Contact Person</span>
              <p className="font-extrabold text-slate-900">{leadContactName}</p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Email Address</span>
              {client.email ? (
                <a href={`mailto:${client.email}`} className="font-bold text-[#FA8373] hover:underline block truncate">
                  {client.email}
                </a>
              ) : (
                <p className="text-slate-400 font-medium">Not provided</p>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Primary Phone / WhatsApp</span>
              {client.phone ? (
                <p className="font-mono font-bold text-slate-900">{client.phone}</p>
              ) : (
                <p className="text-slate-400 font-medium">Not provided</p>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Alternate Mobile</span>
              {altPhone ? (
                <p className="font-mono font-bold text-slate-900">{altPhone}</p>
              ) : (
                <p className="text-slate-400 font-medium">Not provided</p>
              )}
            </div>
          </div>

          {locationParts.length > 0 && (
            <div className="flex items-center space-x-2 pt-2 text-xs text-slate-700 font-semibold">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Location: {locationParts.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Section 2: Website Requirements & Lead Brief */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
            <FileText className="w-4 h-4 text-[#FA8373]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              2. Website Requirements & Brief
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 font-bold">Category / Industry:</span>
              <span className="font-extrabold text-[#FA8373] bg-[#FA8373]/10 px-2.5 py-0.5 rounded-lg border border-[#FA8373]/30">
                {category}
              </span>
            </div>

            {services && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Services / Business Description</span>
                <p className="text-slate-800 font-medium leading-relaxed">{services}</p>
              </div>
            )}

            {features.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Requested Website Features</span>
                <div className="flex flex-wrap gap-2">
                  {features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-[11px]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {socialMedia && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Social Media Handles</span>
                <p className="font-mono text-slate-800 font-bold">{socialMedia}</p>
              </div>
            )}

            {notes && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Additional Client Notes</span>
                <p className="text-slate-800 font-medium leading-relaxed italic">{notes}</p>
              </div>
            )}

            {otherDescription && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Overview / Description</span>
                <p className="text-slate-800 font-medium whitespace-pre-wrap">{otherDescription}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Associated Websites */}
        {client.websites && client.websites.length > 0 && (
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
              <Globe className="w-4 h-4 text-[#FA8373]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                3. Associated Client Websites ({client.websites.length})
              </h3>
            </div>

            <div className="space-y-2">
              {client.websites.map((w: any) => (
                <div
                  key={w.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900">{w.name}</p>
                    <p className="text-[11px] font-mono text-[#FA8373] font-semibold">/{w.slug}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <StatusBadge status={w.isPublished ? 'PUBLISHED' : 'DRAFT'} />
                    <Link
                      href={`/websites/${w.id}/builder`}
                      className="px-3 py-1.5 bg-[#FA8373] hover:bg-[#E86B5A] text-[#0B0F17] text-xs font-black rounded-xl border border-[#FA8373]/40 shadow-sm flex items-center space-x-1 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Open Builder</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Action Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </Modal>
  );
}
