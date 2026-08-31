import { apiRequest } from './client';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export async function getProjectsApi(params: { page?: number; limit?: number; search?: string; isActive?: boolean } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.isActive !== undefined) query.append('isActive', params.isActive.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<Project>>(`/projects${queryString}`, { method: 'GET' });
}

export async function getProjectApi(id: string) {
  return apiRequest<{ success: boolean; data: Project }>(`/projects/${id}`, { method: 'GET' });
}

export async function createProjectApi(dto: { name: string; slug?: string; description?: string; isActive?: boolean }) {
  return apiRequest<{ success: boolean; message: string; data: Project }>('/projects', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function updateProjectApi(id: string, dto: { name?: string; slug?: string; description?: string; isActive?: boolean }) {
  return apiRequest<{ success: boolean; message: string; data: Project }>(`/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function deleteProjectApi(id: string) {
  return apiRequest<{ success: boolean; message: string; data: Project }>(`/projects/${id}`, {
    method: 'DELETE',
  });
}
