import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND = process.env.NEXT_PUBLIC_API_URL!;
const SKIP = new Set(['/auth/login', '/auth/signup']);

async function handler(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const params = await ctx.params;
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

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
