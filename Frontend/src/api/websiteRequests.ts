import { apiRequest } from './client';
import { PaginatedResponse } from './projects';

export type WebsiteRequestStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface AssetReference {
  url: string;
  fileName: string;
  fileSize?: number;
  mimeType?: string;
}

export type GeneratedWebsiteStatus = 'DRAFT' | 'PUBLISHED';

export interface GeneratedWebsite {
  id: string;
  requestId: string;
  slug?: string | null;
  html: string;
  css: string;
  javascript: string;
  assetMappings?: Record<string, string> | null;
  publishedSnapshot?: {
    html?: string;
    css?: string;
    javascript?: string;
    assetMappings?: Record<string, string>;
    slug?: string;
    publishedAt?: string;
  } | null;
  status: GeneratedWebsiteStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface WebsiteRequest {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  alternatePhone?: string | null;
  businessName: string;
  category: string;
  description?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  specialInstructions?: string | null;
  selectedFeatures?: string[] | null;
  assetReferences?: {
    logoAssets?: AssetReference[];
    bannerAssets?: AssetReference[];
  } | null;
  status: WebsiteRequestStatus;
  generatedWebsite?: GeneratedWebsite | null;
  job?: {
    id: string;
    status: string;
    selectedTemplateId?: string | null;
    selectedTemplate?: {
      id: string;
      name: string;
      slug: string;
      templateKey: string;
    } | null;
    clientId?: string | null;
    client?: {
      id: string;
      businessName: string;
      slug: string;
    } | null;
    websiteId?: string | null;
    website?: {
      id: string;
      name: string;
      slug: string;
      status: string;
      isPublished: boolean;
    } | null;
    createdAt?: string;
    completedAt?: string | null;
    errorMessage?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export type WebsiteLifecycleStatus = 'NO_WEBSITE' | 'DRAFT' | 'PUBLISHED';

export interface WebsiteRequestsMetrics {
  total: number;
  noWebsite: number;
  draft: number;
  published: number;
}

export interface WebsiteRequestsResponse {
  success: boolean;
  data: {
    items: WebsiteRequest[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      metrics?: WebsiteRequestsMetrics;
    };
  };
}

export async function getWebsiteRequestsApi(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: WebsiteRequestStatus;
  websiteStatus?: WebsiteLifecycleStatus;
} = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.status) query.append('status', params.status);
  if (params.websiteStatus) query.append('websiteStatus', params.websiteStatus);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<WebsiteRequestsResponse>(`/website-requests${queryString}`, {
    method: 'GET',
  });
}

export async function getWebsiteRequestApi(id: string) {
  return apiRequest<{ success: boolean; data: WebsiteRequest }>(`/website-requests/${id}`, {
    method: 'GET',
  });
}

export async function submitWebsiteRequestApi(payload: {
  fullName: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  businessName: string;
  category?: string;
  description?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  specialInstructions?: string;
  selectedFeatures?: string[];
  logoAssets?: AssetReference[];
  bannerAssets?: AssetReference[];
}) {
  return apiRequest<{ success: boolean; message: string; data: any }>('/website-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface DesignBlueprintMetadata {
  direction: string;
  personality: string;
  layoutPhilosophy: string;
  navigationStyle: string;
  heroComposition: string;
  sectionArchitecture: {
    name: string;
    sequence: string[];
    description: string;
  };
  gridStrategy: string;
  typographyDirection: string;
  colorPhilosophy: {
    name: string;
    primaryBg: string;
    secondaryBg: string;
    textColor: string;
    mutedText: string;
    accent: string;
    secondaryAccent: string;
    border: string;
    cta: string;
    description: string;
  };
  cardLanguage: string;
  buttonLanguage: string;
  imageTreatment: string;
  footerStrategy: string;
  interactionStyle: string;
  responsiveStrategy: string;
  visualFingerprint: string[];
}

export async function generateDeepseekPromptApi(
  id: string,
  options?: { variation?: number; action?: 'next' | 'reset' },
) {
  return apiRequest<{
    success: boolean;
    prompt: string;
    variation?: number;
    designBlueprint?: DesignBlueprintMetadata;
  }>(`/website-requests/${id}/deepseek-prompt`, {
    method: 'POST',
    body: options ? JSON.stringify(options) : undefined,
  });
}


export async function getGeneratedWebsiteApi(requestId: string) {
  return apiRequest<{ success: boolean; data: GeneratedWebsite }>(`/website-requests/${requestId}/generated-website`, {
    method: 'GET',
  });
}

export async function saveGeneratedWebsiteApi(
  requestId: string,
  payload: {
    html?: string;
    css?: string;
    javascript?: string;
    status?: GeneratedWebsiteStatus;
    slug?: string;
    assetMappings?: Record<string, string>;
  },
) {
  return apiRequest<{ success: boolean; message: string; data: GeneratedWebsite }>(
    `/website-requests/${requestId}/generated-website`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export async function checkSlugApi(slug: string, excludeRequestId?: string) {
  const query = new URLSearchParams({ slug });
  if (excludeRequestId) query.append('excludeRequestId', excludeRequestId);
  return apiRequest<{ success: boolean; data: { available: boolean; slug: string } }>(
    `/website-requests/check-slug?${query.toString()}`,
    {
      method: 'GET',
    },
  );
}

export async function publishGeneratedWebsiteApi(requestId: string, slug: string) {
  return apiRequest<{
    success: boolean;
    message: string;
    data: {
      success: boolean;
      slug: string;
      url: string;
      status: GeneratedWebsiteStatus;
      publishedAt: string;
    };
  }>(`/website-requests/${requestId}/generated-website/publish`, {
    method: 'POST',
    body: JSON.stringify({ slug }),
  });
}

export async function unpublishGeneratedWebsiteApi(requestId: string) {
  return apiRequest<{
    success: boolean;
    message: string;
    data: {
      success: boolean;
      message: string;
      status: GeneratedWebsiteStatus;
      slug?: string;
    };
  }>(`/website-requests/${requestId}/generated-website/unpublish`, {
    method: 'POST',
  });
}

export async function getPublicGeneratedWebsiteApi(slug: string) {
  return apiRequest<{
    success: boolean;
    data: {
      slug: string;
      businessName: string;
      category: string;
      html: string;
      css: string;
      javascript: string;
      publishedAt?: string | null;
    };
  }>(`/website-requests/public-site/${slug}`, {
    method: 'GET',
  });
}



