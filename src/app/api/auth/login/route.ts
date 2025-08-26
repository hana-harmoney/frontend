import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${BACKEND}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  // 백엔드 응답 키에 맞게 수정
  const {
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    profile_registered,
  } = data.result;

  const cookie = await cookies();
  cookie.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: accessTokenExpiresIn ?? 3600,
  });
  if (refreshToken) {
    cookie.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    });
  }
  return NextResponse.json({ ok: true, profile_registered });
}
