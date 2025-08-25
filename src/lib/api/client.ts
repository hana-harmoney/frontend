// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiClient = async (path: string, options?: RequestInit) => {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  const url = `/api/proxy${safePath}`;

  const isFormData =
    typeof window !== 'undefined' && options?.body instanceof FormData;

  const headers = new Headers(options?.headers);
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store',
  });
  if (!res.ok)
    throw new Error(`API ${path} ${res.status}: ${await res.text()}`);
  return res.json();
};
