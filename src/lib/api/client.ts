// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiClient = async (path: string, options?: RequestInit) => {
  const res = await fetch(`/api/_/proxy${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok)
    throw new Error(`API ${path} ${res.status}: ${await res.text()}`);
  return res.json();
};
