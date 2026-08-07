const DEFAULT_API_BASE_URL = 'https://gdgoc-sookmyung-server.onrender.com';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? '' : DEFAULT_API_BASE_URL);
