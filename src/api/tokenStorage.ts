const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const accessTokenStorage = {
  get() {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(accessToken: string) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  remove() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export const refreshTokenStorage = {
  get() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },
  set(refreshToken: string) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  remove() {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
