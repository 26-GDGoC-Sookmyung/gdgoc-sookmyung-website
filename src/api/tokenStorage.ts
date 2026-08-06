const ACCESS_TOKEN_KEY = 'accessToken';

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
