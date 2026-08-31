"use client";

import React, { useState, useEffect } from 'react';
import { Client, getClientApi } from '@/api/clients';
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
  Images,
  ZoomIn,
  X,
  Eye,
  ImageIcon,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function ClientDetailsModal({ isOpen, onClose, client: initialClient }: ClientDetailsModalProps) {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [client, setClient] = useState<Client | null>(initialClient);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    setClient(initialClient);
    if (initialClient?.id && isOpen) {
      setIsLoadingDetails(true);
      getClientApi(initialClient.id)
        .then((res) => {
          if (res.success && res.data) {
            setClient(res.data);
          }
        })
        .catch((err) => console.error('Failed to fetch full client details:', err))
        .finally(() => setIsLoadingDetails(false));
    }
  }, [initialClient, isOpen]);

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

  // Collect all media assets from client logo and websites
  const allMediaAssets: Array<{
    id: string;
    url: string;
    fileName: string;
    tag: string;
    mimeType?: string;
    fileSize?: number;
  }> = [];

  if (client.logoMedia && client.logoMedia.url) {
    allMediaAssets.push({
      id: client.logoMedia.id || 'logo-main',
      url: client.logoMedia.url,
      fileName: client.logoMedia.fileName || 'Company Logo',
      tag: 'LOGO',
    });
  }

  if (client.websites) {
    client.websites.forEach((w) => {
      if (w.media && w.media.length > 0) {
        w.media.forEach((m) => {
          if (!allMediaAssets.some((a) => a.url === m.url)) {
            const isLogo = m.fileName?.toLowerCase().includes('logo') || m.altText?.toLowerCase().includes('logo');
            allMediaAssets.push({
              id: m.id,
              url: m.url,
              fileName: m.fileName,
              tag: isLogo ? 'LOGO' : 'BANNER / ASSET',
              mimeType: m.mimeType,
              fileSize: m.fileSize,
            });
          }
        });
      }
    });
  }

  return (
    <>
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
              {client.logoMedia?.url ? (
                <div
                  onClick={() => setLightboxImage({ url: client.logoMedia!.url, title: `${client.businessName} Logo` })}
                  className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center cursor-pointer hover:border-[#FA8373] shadow-sm relative group overflow-hidden shrink-0"
                  title="Click to view full logo"
                >
                  <img
                    src={client.logoMedia.url}
                    alt={client.businessName}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#FA8373]/10 text-[#FA8373] border border-[#FA8373]/30 rounded-2xl shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
              )}
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

          {/* Section 3: Client Uploaded Assets & Media Gallery */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center space-x-2">
                <Images className="w-4 h-4 text-[#FA8373]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  3. Client Uploaded Assets ({allMediaAssets.length})
                </h3>
              </div>
              <Link
                href="/media"
                className="text-[11px] font-bold text-[#FA8373] hover:underline flex items-center gap-1"
              >
                <span>Open Media Gallery</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {allMediaAssets.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-1.5 opacity-60" />
                <p className="text-xs font-bold text-slate-700">No Custom Logo or Banner Files Uploaded</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Assets uploaded via lead form or media gallery will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {allMediaAssets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 hover:border-[#FA8373] rounded-xl transition-all space-y-2 group shadow-sm flex flex-col justify-between"
                  >
                    <div
                      onClick={() => setLightboxImage({ url: asset.url, title: asset.fileName })}
                      className="h-28 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden relative cursor-pointer group-hover:shadow-inner"
                      title="Click to view high-res image"
                    >
                      <img
                        src={asset.url}
                        alt={asset.fileName}
                        className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FA8373]/15 text-[#FA8373]">
                          {asset.tag}
                        </span>
                        {asset.fileSize && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            {(asset.fileSize / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate" title={asset.fileName}>
                        {asset.fileName}
                      </p>
                      <div className="flex items-center justify-between pt-1 mt-1 border-t border-slate-200 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setLightboxImage({ url: asset.url, title: asset.fileName })}
                          className="font-bold text-[#FA8373] hover:underline"
                        >
                          Zoom Preview
                        </button>
                        {client.websites && client.websites.length > 0 && (
                          <Link
                            href={`/websites/${client.websites[0].id}/builder`}
                            className="font-bold text-slate-700 hover:text-black hover:underline"
                          >
                            Use in Builder →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Associated Websites */}
          {client.websites && client.websites.length > 0 && (
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
                <Globe className="w-4 h-4 text-[#FA8373]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  4. Associated Client Websites ({client.websites.length})
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

      {/* Lightbox Image Preview Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white border border-slate-300 rounded-2xl p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 max-w-[80%]">
                <Eye className="w-4 h-4 text-[#FA8373]" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {lightboxImage.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full min-h-[260px] max-h-[65vh] flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-3">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Client Uploaded Asset</span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="text-[#FA8373] font-bold hover:underline"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

