import { API_BASE_URL } from '@/constants/api';
import { ApiError, type ApiResponse } from './apiTypes';
import {
  accessTokenStorage,
  refreshTokenStorage,
  removeAuthTokens,
} from './tokenStorage';

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  auth?: boolean;
  body?: unknown;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

let reissuePromise: Promise<AuthTokens> | null = null;

export async function apiRequest<T>(
  path: string,
  {
    auth = true,
    body,
    headers: requestHeaders,
    ...options
  }: ApiRequestOptions = {},
): Promise<T | null> {
  const executeRequest = (accessToken: string | null) => {
    const headers = new Headers(requestHeaders);

    headers.set('Accept', 'application/json');

    if (body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return fetchApi(path, {
      ...options,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  };

  let response = await executeRequest(auth ? accessTokenStorage.get() : null);

  if (auth && response.status === 401) {
    try {
      const tokens = await reissueAuthTokens();
      response = await executeRequest(tokens.accessToken);
    } catch (error) {
      removeAuthTokens();
      redirectToLogin();
      throw error;
    }
  }

  return parseApiResponse<T>(response);
}

async function reissueAuthTokens() {
  if (reissuePromise) {
    return reissuePromise;
  }

  const refreshToken = refreshTokenStorage.get();

  if (!refreshToken) {
    throw new ApiError({
      code: 'REFRESH_TOKEN_NOT_FOUND',
      message: '로그인이 필요합니다.',
      status: 401,
    });
  }

  reissuePromise = performTokenReissue(refreshToken).finally(() => {
    reissuePromise = null;
  });

  return reissuePromise;
}

async function performTokenReissue(refreshToken: string) {
  const response = await fetchApi('/api/auth/reissue', {
    body: JSON.stringify({ refreshToken }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const tokens = await parseApiResponse<AuthTokens>(response);

  if (!tokens?.accessToken || !tokens.refreshToken) {
    throw new ApiError({
      code: 'INVALID_TOKEN_RESPONSE',
      message: '토큰 재발급 응답을 확인할 수 없습니다.',
      status: response.status,
    });
  }

  accessTokenStorage.set(tokens.accessToken);
  refreshTokenStorage.set(tokens.refreshToken);

  return tokens;
}

async function fetchApi(path: string, options: RequestInit) {
  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: 'include',
    });
  } catch {
    throw new ApiError({
      code: 'NETWORK_ERROR',
      message: '서버에 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.',
      status: 0,
    });
  }
}

async function parseApiResponse<T>(response: Response): Promise<T | null> {
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

function redirectToLogin() {
  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
}
