import { API_BASE_URL } from '@/constants/api';
import { ApiError, type ApiResponse } from './apiTypes';
import { accessTokenStorage } from './tokenStorage';

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  auth?: boolean;
  body?: unknown;
};

export async function apiRequest<T>(
  path: string,
  {
    auth = true,
    body,
    headers: requestHeaders,
    ...options
  }: ApiRequestOptions = {},
): Promise<T | null> {
  const headers = new Headers(requestHeaders);
  const accessToken = auth ? accessTokenStorage.get() : null;

  headers.set('Accept', 'application/json');

  if (body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({
      code: 'NETWORK_ERROR',
      message: '서버에 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.',
      status: 0,
    });
  }

  let result: ApiResponse<T>;

  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError({
      code: 'INVALID_RESPONSE',
      message: '서버 응답을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.',
      status: response.status,
    });
  }

  if (!response.ok || !result.success) {
    throw new ApiError({
      code: result.code || 'UNKNOWN_ERROR',
      data: result.data,
      message: result.message || '요청 처리 중 오류가 발생했습니다.',
      status: response.status,
    });
  }

  return result.data;
}
