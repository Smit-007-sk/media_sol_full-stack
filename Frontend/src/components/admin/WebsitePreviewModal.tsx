"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  X,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Bug,
  Code2,
  ChevronDown,
  ChevronUp,
  Trash2,
} from 'lucide-react';
import { WebsiteRequest } from '@/api/websiteRequests';

export interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  html: string;
  css: string;
  javascript: string;
  assetMappings?: Record<string, string>;
  request?: WebsiteRequest | null;
  businessName?: string;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface RuntimeErrorInfo {
  id: string;
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  timestamp: string;
}

import { cleanCode } from '@/utils/documentAssembler';
export { cleanCode };

/**
 * Live draft placeholder resolver:
 * Replaces {{LOGO_URL}}, {{IMAGE_1_URL}}, etc. with verified in-memory mapped assets.
 * Rejects dangerous schemes (javascript:, vbscript:, data(non-image):, file:).
 * Does NOT inject fake/external placeholder images for missing mappings.
 */
export function resolvePreviewPlaceholders(
  rawHtml: string,
  assetMappings?: Record<string, string>,
  request?: WebsiteRequest | null
): {
  resolvedHtml: string;
  stats: {
    total: number;
    mapped: number;
    unmapped: number;
    placeholders: Array<{ tag: string; mappedTo?: string }>;
  };
} {
  if (!rawHtml) {
    return {
      resolvedHtml: '',
      stats: { total: 0, mapped: 0, unmapped: 0, placeholders: [] },
    };
  }

  const matches = rawHtml.match(/\{\{([A-Za-z0-9_]+_URL)\}\}/g) || [];
  const uniqueTags = Array.from(new Set(matches));

  // Build a set of verified client asset URLs from request if available
  const allowedUrls = new Set<string>();
  if (request?.assetReferences) {
    (request.assetReferences.logoAssets || []).forEach((a) => {
      if (a.url) allowedUrls.add(a.url);
    });
    (request.assetReferences.bannerAssets || []).forEach((a) => {
      if (a.url) allowedUrls.add(a.url);
    });
  }

  let resolved = rawHtml;
  const placeholders: Array<{ tag: string; mappedTo?: string }> = [];
  let mappedCount = 0;

  for (const tag of uniqueTags) {
    const targetUrl = assetMappings ? assetMappings[tag] : undefined;
    if (targetUrl && typeof targetUrl === 'string' && targetUrl.trim()) {
      const trimmedUrl = targetUrl.trim();
      // Validate that URL is safe (not javascript:, vbscript:, file:)
      const isDangerous = /^(javascript|vbscript|data(?!:image\/)|file):/i.test(trimmedUrl);
      if (!isDangerous) {
        // Strict verification: Allowed if in request assets, or matches local /media/, http/https, or relative path
        const isVerified =
          allowedUrls.size === 0 ||
          allowedUrls.has(trimmedUrl) ||
          trimmedUrl.startsWith('/media/') ||
          trimmedUrl.startsWith('http://') ||
          trimmedUrl.startsWith('https://') ||
          trimmedUrl.startsWith('/');

        if (isVerified) {
          const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          resolved = resolved.replace(new RegExp(escaped, 'g'), trimmedUrl);
          placeholders.push({ tag, mappedTo: trimmedUrl });
          mappedCount++;
          continue;
        }
      }
    }
    placeholders.push({ tag, mappedTo: undefined });
  }

  return {
    resolvedHtml: resolved,
    stats: {
      total: uniqueTags.length,
      mapped: mappedCount,
      unmapped: uniqueTags.length - mappedCount,
      placeholders,
    },
  };
}

/**
 * Combines HTML, CSS, and JS into an isolated, standalone HTML document for iframe preview.
 * - Handles both complete HTML documents and HTML fragments.
 * - Injects CSS and JavaScript without duplicating existing style/script sections.
 * - Injects a safe error bridge to report runtime errors to the diagnostics bar.
 * - Does NOT inject arbitrary typography, fonts, CSS, or CDN resources not present in the generated website.
 */
export function buildPreviewDocument(
  rawHtml: string,
  rawCss: string,
  rawJs: string,
  assetMappings?: Record<string, string>,
  request?: WebsiteRequest | null,
  businessName?: string
): { doc: string; placeholderStats: { total: number; mapped: number; unmapped: number; placeholders: Array<{ tag: string; mappedTo?: string }> } } {
  const cleanedRawHtml = cleanCode(rawHtml, 'html');
  const css = cleanCode(rawCss, 'css');
  const js = cleanCode(rawJs, 'javascript');

  const { resolvedHtml, stats: placeholderStats } = resolvePreviewPlaceholders(cleanedRawHtml, assetMappings, request);

  // Runtime error bridge script that forwards errors safely via postMessage
  const errorBridgeScript = `<script id="__preview_error_bridge">
(function() {
  function sendError(msg, src, line, col, err) {
    try {
      window.parent.postMessage({
        type: 'PREVIEW_RUNTIME_ERROR',
        message: String(msg || (err && err.message) || 'Unknown runtime error'),
        source: src || '',
        lineno: line || 0,
        colno: col || 0
      }, '*');
    } catch (_) {}
  }
  window.addEventListener('error', function(e) {
    sendError(e.message, e.filename, e.lineno, e.colno, e.error);
  });
  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason;
    sendError(
      reason && reason.message ? reason.message : ('Unhandled Promise Rejection: ' + String(reason)),
      '', 0, 0, reason instanceof Error ? reason : null
    );
  });
})();
</script>`;

  const styleTag = css ? `<style id="__preview_injected_style">\n${css}\n</style>` : '';
  const scriptTag = js ? `<script id="__preview_injected_script">\ntry {\n${js}\n} catch (e) {\n  console.error('Runtime script error:', e);\n  if (window.parent) {\n    window.parent.postMessage({ type: 'PREVIEW_RUNTIME_ERROR', message: e.message || String(e), lineno: 0, colno: 0 }, '*');\n  }\n}\n</script>` : '';

  if (!resolvedHtml && !css && !js) {
    const emptyDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Empty Website Workspace</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #94a3b8; }
    .empty { text-align: center; }
    h2 { color: #f8fafc; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="empty">
    <h2>Empty Website Workspace</h2>
    <p>Paste HTML, CSS, and JavaScript into the Code Workspace to preview the site.</p>
  </div>
</body>
</html>`;
    return { doc: emptyDoc, placeholderStats };
  }

  // Check if html already has a full <!DOCTYPE html> or <html> structure
  const hasHtmlTag = /<html[\s>]/i.test(resolvedHtml);
  const hasHeadTag = /<head[\s>]/i.test(resolvedHtml);
  const hasBodyTag = /<body[\s>]/i.test(resolvedHtml);

  if (hasHtmlTag || (hasHeadTag && hasBodyTag)) {
    let result = resolvedHtml;

    // 1. Inject Error Bridge into <head> or at beginning
    if (hasHeadTag) {
      result = result.replace(/<head[\s>]/i, (match) => `${match}\n  ${errorBridgeScript}`);
    } else {
      result = `${errorBridgeScript}\n${result}`;
    }

    // 2. Inject CSS: Replace <link rel="stylesheet" href="style.css"> or inject before </head>
    if (css) {
      if (/<link[^>]*href=["'][^"']*style\.css["'][^>]*>/i.test(result)) {
        result = result.replace(/<link[^>]*href=["'][^"']*style\.css["'][^>]*>/i, styleTag);
      } else if (hasHeadTag && /<\/head>/i.test(result)) {
        result = result.replace(/<\/head>/i, `  ${styleTag}\n</head>`);
      } else {
        result = `${styleTag}\n${result}`;
      }
    }

    // 3. Inject JS: Replace <script src="script.js"></script> or inject before </body>
    if (js) {
      if (/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/i.test(result)) {
        result = result.replace(/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/i, scriptTag);
      } else if (hasBodyTag && /<\/body>/i.test(result)) {
        result = result.replace(/<\/body>/i, `  ${scriptTag}\n</body>`);
      } else {
        result = `${result}\n${scriptTag}`;
      }
    }

    return { doc: result, placeholderStats };
  }

  // Construct minimal standard HTML5 shell for fragments (without artificial styling/fonts)
  const fragmentDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName || 'Website Preview'}</title>
  ${errorBridgeScript}
  ${styleTag}
</head>
<body>
  ${resolvedHtml}
  ${scriptTag}
</body>
</html>`;

  return { doc: fragmentDoc, placeholderStats };
}

export function WebsitePreviewModal({
  isOpen,
  onClose,
  html,
  css,
  javascript,
  assetMappings,
  request,
  businessName = 'Generated Website',
}: WebsitePreviewModalProps) {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const [runtimeErrors, setRuntimeErrors] = useState<RuntimeErrorInfo[]>([]);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Escape key to close preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Clear runtime errors on code/refresh changes
  const handleReload = useCallback(() => {
    setRuntimeErrors([]);
    setRefreshKey((k) => k + 1);
  }, []);

  // Safe runtime error listener from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PREVIEW_RUNTIME_ERROR') {
        const errorInfo: RuntimeErrorInfo = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          message: event.data.message || 'Unknown runtime error',
          source: event.data.source || '',
          lineno: event.data.lineno || 0,
          colno: event.data.colno || 0,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
        setRuntimeErrors((prev) => [...prev.slice(-19), errorInfo]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Compute preview document and stats from active unsaved editor state
  const { previewDocument, placeholderStats } = useMemo(() => {
    const res = buildPreviewDocument(html, css, javascript, assetMappings, request, businessName);
    return {
      previewDocument: res.doc,
      placeholderStats: res.placeholderStats,
    };
  }, [html, css, javascript, assetMappings, request, businessName, refreshKey]);

  if (!isOpen || !mounted) return null;

  const viewportWidths = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[375px] max-w-full',
  };

  const viewportLabels = {
    desktop: 'Desktop (100%)',
    tablet: 'Tablet (768px)',
    mobile: 'Mobile (375px)',
  };

  const htmlLines = html ? html.split('\n').length : 0;
  const cssLines = css ? css.split('\n').length : 0;
  const jsLines = javascript ? javascript.split('\n').length : 0;

  return createPortal(
    <div className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 animate-fadeIn font-sans">
      <div className="relative w-full h-[96vh] max-w-7xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
          {/* Left: Info */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FA8373] to-[#e06858] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xs font-black text-white truncate max-w-xs">{businessName}</h3>
                <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Isolated Sandbox
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Live in-memory preview (unsaved draft) • Minimum sandbox permissions
              </p>
            </div>
          </div>

          {/* Center: Viewport Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl shadow-inner">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewport === 'desktop'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (Full Width)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => setViewport('tablet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewport === 'tablet'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>

            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewport === 'mobile'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 hidden lg:inline">
              {viewportLabels[viewport]}
            </span>

            <button
              type="button"
              onClick={handleReload}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Reload Preview"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport Sandbox Canvas */}
        <div className="flex-1 bg-slate-900/60 p-2 sm:p-4 overflow-auto flex items-center justify-center">
          <div
            className={`h-full transition-all duration-300 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-700/50 ${viewportWidths[viewport]}`}
          >
            <iframe
              key={refreshKey}
              title="Generated Website Preview"
              sandbox="allow-scripts allow-forms"
              srcDoc={previewDocument}
              className="w-full h-full border-0 bg-white"
            />
          </div>
        </div>

        {/* Expandable Diagnostics Drawer */}
        {isDiagnosticsOpen && (
          <div className="bg-slate-900 border-t border-slate-800 p-3 space-y-3 text-xs max-h-48 overflow-y-auto animate-fadeIn text-slate-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bug className="w-4 h-4 text-[#FA8373]" />
                <span className="font-bold text-white uppercase text-[10px] tracking-wider">Preview Diagnostics & Runtime Errors</span>
              </div>
              <div className="flex items-center gap-2">
                {runtimeErrors.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setRuntimeErrors([])}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Errors</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsDiagnosticsOpen(false)}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  Hide
                </button>
              </div>
            </div>

            {/* Error List */}
            {runtimeErrors.length > 0 ? (
              <div className="space-y-1.5">
                {runtimeErrors.map((err) => (
                  <div
                    key={err.id}
                    className="p-2 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-200 font-mono text-[11px] flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <p className="font-bold truncate">{err.message}</p>
                      <p className="text-[10px] text-rose-400">
                        {err.source ? `Source: ${err.source}` : 'Injected Script'}{' '}
                        {err.lineno ? `(Line: ${err.lineno}, Col: ${err.colno})` : ''}
                      </p>
                    </div>
                    <span className="text-[9px] text-slate-400 shrink-0">{err.timestamp}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 bg-emerald-950/30 border border-emerald-800/50 rounded-lg text-emerald-300 flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No JavaScript runtime errors reported.</span>
              </div>
            )}

            {/* Placeholder Details */}
            {placeholderStats.placeholders.length > 0 && (
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Detected Placeholders ({placeholderStats.mapped}/{placeholderStats.total} Mapped)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {placeholderStats.placeholders.map((p, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                        p.mappedTo
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                          : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                      }`}
                    >
                      <span>{p.tag}</span>
                      <span className="text-slate-400">→</span>
                      <span className="truncate max-w-[120px]">{p.mappedTo || 'Unmapped'}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Status & Diagnostics Bar */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 shrink-0">
          {/* Code Metrics */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <Code2 className="w-3.5 h-3.5 text-[#FA8373]" />
              <span>HTML: <strong className="text-slate-200">{html.length}c / {htmlLines}L</strong></span>
            </span>
            <span>•</span>
            <span className="font-mono">CSS: <strong className="text-slate-200">{css.length}c / {cssLines}L</strong></span>
            <span>•</span>
            <span className="font-mono">JS: <strong className="text-slate-200">{javascript.length}c / {jsLines}L</strong></span>
          </div>

          {/* Placeholders & Diagnostics Button */}
          <div className="flex items-center gap-2.5">
            {/* Placeholder Badge */}
            {placeholderStats.total > 0 && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  placeholderStats.unmapped === 0
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                    : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                }`}
              >
                {placeholderStats.unmapped === 0 ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                )}
                <span>
                  {placeholderStats.mapped}/{placeholderStats.total} Assets Mapped
                </span>
              </span>
            )}

            {/* Runtime Error Badge / Diagnostics Trigger */}
            <button
              type="button"
              onClick={() => setIsDiagnosticsOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                runtimeErrors.length > 0
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900/80'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Bug className={`w-3 h-3 ${runtimeErrors.length > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{runtimeErrors.length > 0 ? `${runtimeErrors.length} Errors` : 'Diagnostics'}</span>
              {isDiagnosticsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
