import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND = process.env.BACKEND_API_BASE!;
const SKIP = new Set(['/auth/login', '/auth/signup']);

async function handler(
  req: NextRequest,
  { params }: { params: { path?: string[] } },
) {
  const path = `/${(params.path ?? []).join('/')}`;
  const url = new URL(path, BACKEND);

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');

  if (!SKIP.has(path)) {
    const token = (await cookies()).get('access_token')?.value;
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  let body: BodyInit | undefined;
  if (!['GET', 'HEAD'].includes(req.method)) {
    const ct = req.headers.get('content-type') ?? '';
    body = ct.includes('json')
      ? await req.text()
      : ct.includes('multipart/form-data')
        ? await req.formData()
        : await req.blob();
  }

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
    redirect: 'manual',
  });
  const resheaders = new Headers(res.headers);
  resheaders.delete('content-encoding');
  resheaders.delete('transfer-encoding');
  return new NextResponse(res.body, {
    status: res.status,
    headers: resheaders,
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
