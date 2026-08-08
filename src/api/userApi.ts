import { apiRequest } from './apiClient';

export type CurrentUser = {
  id: number;
  email: string;
  name: string;
};

export function getCurrentUser() {
  return apiRequest<CurrentUser>('/api/v1/users/me');
}
