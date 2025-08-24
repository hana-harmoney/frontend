const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiClient = (path: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${path}`, options);
};
