import { apiRequest } from './client';
import { PaginatedResponse } from './projects';
import { Client } from './clients';
import { Template } from './templates';

export type WebsiteStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Website {
  id: string;
  clientId: string;
  client?: Partial<Client>;
  templateId: string;
  template?: Partial<Template>;
  name: string;
  slug: string;
  status: WebsiteStatus;
  isPublished: boolean;
  publishedAt?: string | null;
  theme?: any;
  hero?: any;
  about?: any;
  contact?: any;
  services?: any[];
  galleries?: any[];
  testimonials?: any[];
  socialLinks?: any[];
  media?: any[];
  createdAt: string;
  updatedAt: string;
}

export async function getWebsitesApi(params: {
  page?: number;
  limit?: number;
  search?: string;
  clientId?: string;
  templateId?: string;
  status?: WebsiteStatus;
  isPublished?: boolean;
} = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.clientId) query.append('clientId', params.clientId);
  if (params.templateId) query.append('templateId', params.templateId);
  if (params.status) query.append('status', params.status);
  if (params.isPublished !== undefined) query.append('isPublished', params.isPublished.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<Website>>(`/websites${queryString}`, { method: 'GET' });
}

export async function getWebsiteApi(id: string) {
  return apiRequest<{ success: boolean; data: Website }>(`/websites/${id}`, { method: 'GET' });
}

export async function createWebsiteApi(dto: {
  clientId: string;
  templateId: string;
  name: string;
  slug?: string;
  status?: WebsiteStatus;
  isPublished?: boolean;
}) {
  return apiRequest<{ success: boolean; message: string; data: Website }>('/websites', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function updateWebsiteApi(
  id: string,
  dto: {
    clientId?: string;
    templateId?: string;
    name?: string;
    slug?: string;
    status?: WebsiteStatus;
    isPublished?: boolean;
  },
) {
  return apiRequest<{ success: boolean; message: string; data: Website }>(`/websites/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function deleteWebsiteApi(id: string) {
  return apiRequest<{ success: boolean; message: string; data: Website }>(`/websites/${id}`, {
    method: 'DELETE',
  });
}
