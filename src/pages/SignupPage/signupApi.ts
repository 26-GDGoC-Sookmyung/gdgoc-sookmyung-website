import { apiRequest } from '@/api/apiClient';
import { ApiError } from '@/api/apiTypes';

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
};

export function sendVerificationCode(email: string) {
  return apiRequest<string>('/api/auth/email/send', {
    auth: false,
    body: { email },
    method: 'POST',
  });
}

export function verifyEmailCode(email: string, code: string) {
  return apiRequest<string>('/api/auth/email/verify', {
    auth: false,
    body: { email, code },
    method: 'POST',
  });
}

export function signup(request: SignupRequest) {
  return apiRequest<number>('/api/auth/signup', {
    auth: false,
    body: request,
    method: 'POST',
  });
}

export function getSignupErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return fallbackMessage;
}
