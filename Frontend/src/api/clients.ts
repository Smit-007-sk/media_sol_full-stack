import { apiRequest } from './client';
import { PaginatedResponse } from './projects';

export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface ClientMedia {
  id: string;
  url: string;
  fileName: string;
  mimeType?: string;
  fileSize?: number;
  type?: string;
  altText?: string;
}

export interface Client {
  id: string;
  businessName: string;
  slug: string;
  description?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  logoMediaId?: string | null;
  logoMedia?: ClientMedia | null;
  status: ClientStatus;
  websites?: Array<{
    id: string;
    name: string;
    slug: string;
    status: string;
    isPublished: boolean;
    media?: ClientMedia[];
  }>;
  createdAt: string;
  updatedAt: string;
}

export async function getClientsApi(params: { page?: number; limit?: number; search?: string; status?: ClientStatus } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.status) query.append('status', params.status);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<Client>>(`/clients${queryString}`, { method: 'GET' });
}

export async function getClientApi(id: string) {
  return apiRequest<{ success: boolean; data: Client }>(`/clients/${id}`, { method: 'GET' });
}

export async function createClientApi(dto: Partial<Client>) {
  return apiRequest<{ success: boolean; message: string; data: Client }>('/clients', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function updateClientApi(id: string, dto: Partial<Client>) {
  return apiRequest<{ success: boolean; message: string; data: Client }>(`/clients/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function deleteClientApi(id: string) {
  return apiRequest<{ success: boolean; message: string; data: Client }>(`/clients/${id}`, {
    method: 'DELETE',
  });
}
