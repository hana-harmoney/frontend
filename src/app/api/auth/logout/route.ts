import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const jar = await cookies();
  jar.set('access_token', '', { path: '/', maxAge: 0 });
  jar.set('refresh_token', '', { path: '/', maxAge: 0 });

  return NextResponse.json({ ok: true });
}
