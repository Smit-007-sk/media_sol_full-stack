import { apiRequest } from './client';
import { PaginatedResponse, Project } from './projects';

export interface Template {
  id: string;
  projectId: string;
  project?: Project;
  name: string;
  slug: string;
  templateKey: string;
  description?: string | null;
  previewImage?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getTemplatesApi(params: { page?: number; limit?: number; search?: string; projectId?: string; isActive?: boolean } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.projectId) query.append('projectId', params.projectId);
  if (params.isActive !== undefined) query.append('isActive', params.isActive.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<Template>>(`/templates${queryString}`, { method: 'GET' });
}

export async function getTemplateApi(id: string) {
  return apiRequest<{ success: boolean; data: Template }>(`/templates/${id}`, { method: 'GET' });
}

export async function getProjectTemplatesApi(projectId: string) {
  return apiRequest<{ success: boolean; data: Template[] }>(`/projects/${projectId}/templates`, { method: 'GET' });
}

export async function createTemplateApi(dto: {
  projectId: string;
  name: string;
  slug?: string;
  templateKey: string;
  description?: string;
  previewImage?: string;
  isActive?: boolean;
}) {
  return apiRequest<{ success: boolean; message: string; data: Template }>('/templates', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function updateTemplateApi(
  id: string,
  dto: {
    projectId?: string;
    name?: string;
    slug?: string;
    templateKey?: string;
    description?: string;
    previewImage?: string;
    isActive?: boolean;
  },
) {
  return apiRequest<{ success: boolean; message: string; data: Template }>(`/templates/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function deleteTemplateApi(id: string) {
  return apiRequest<{ success: boolean; message: string; data: Template }>(`/templates/${id}`, {
    method: 'DELETE',
  });
}
