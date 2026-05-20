import { NextResponse } from 'next/server';

export function middleware(request) {
const token = request.cookies.get('bioguard_token');
const isLoginPage = request.nextUrl.pathname === '/login';

if (token && isLoginPage) {
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isAdmin = request.nextUrl.pathname.startsWith('/admin');

  if (!token && (isDashboard || isAdmin)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};