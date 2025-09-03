import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(
    `${BACKEND}/delegate/session/create?token=${encodeURIComponent(body.token)}`,
    {
      method: 'POST',
    },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  const { token } = data.result;

  const cookie = await cookies();
  cookie.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
  });

  return NextResponse.json({ ok: true });
}
