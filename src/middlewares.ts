import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['']; // ex) /home

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needAuth = PROTECTED.some((p) => pathname.startsWith(p));

  if (!needAuth) return NextResponse.next();

  const hasToken = req.cookies.get('access_token')?.value;
  if (!hasToken) {
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
