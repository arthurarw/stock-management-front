import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get('access_token');
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
  const isLoginPage = req.nextUrl.pathname === '/';

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
