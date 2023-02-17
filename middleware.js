import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/',
};

export async function middleware(req) {
  console.log('middleware');
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests if the following is true...
  // 1. it's a request for for next-auth session &  provider fetching
  // 2. the token exists
  if (pathname.includes('/api/auth') || token) {
    console.log('auth route accessed');
    return NextResponse.next();
  }

  // redirect the user on token fail && request of protected route
  if (!token && pathname !== '/login') {
    console.log('no user token, access denied');
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}
