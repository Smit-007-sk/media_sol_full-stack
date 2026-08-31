import { apiRequest } from './client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
  isActive?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: UserProfile;
  };
}

export async function loginApi(credentials: { email: string; password: string }) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getMeApi() {
  return apiRequest<{ success: boolean; data: UserProfile }>('/auth/me', {
    method: 'GET',
  });
}

export async function changePasswordApi(dto: { currentPassword: string; newPassword: string }) {
  return apiRequest<{ success: boolean; message: string }>('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}
