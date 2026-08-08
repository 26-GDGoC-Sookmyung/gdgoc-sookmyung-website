import { apiRequest } from '@/api/apiClient';
import { ApiError } from '@/api/apiTypes';

export type LoginRequest = {
  email: string;
  password: string;
};

export type TokenResponse = {
  accessToken: string;
};

const INVALID_CREDENTIALS_MESSAGE = '이메일 또는 비밀번호가 올바르지 않습니다.';

export function login(request: LoginRequest) {
  return apiRequest<TokenResponse>('/api/auth/login', {
    auth: false,
    body: request,
    method: 'POST',
  });
}

export function getLoginErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.';
}

export function isInvalidCredentialsError(error: unknown) {
  return (
    error instanceof ApiError &&
    (error.status === 401 || error.message === INVALID_CREDENTIALS_MESSAGE)
  );
}
