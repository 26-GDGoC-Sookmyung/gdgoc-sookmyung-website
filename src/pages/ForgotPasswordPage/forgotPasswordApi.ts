import { apiRequest } from '@/api/apiClient';
import { ApiError } from '@/api/apiTypes';

export type ResetPasswordRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export function sendPasswordResetVerificationCode(email: string) {
  return apiRequest<string>('/api/auth/password/email/send', {
    auth: false,
    body: { email },
    method: 'POST',
  });
}

export function resetPassword(request: ResetPasswordRequest) {
  return apiRequest<string>('/api/auth/password/reset', {
    auth: false,
    body: request,
    method: 'POST',
  });
}

export function getForgotPasswordErrorMessage(
  error: unknown,
  fallbackMessage: string,
) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return fallbackMessage;
}
