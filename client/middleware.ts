import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY, USER_ROLE_KEY } from './config';
import { UserRole } from './modules/user/types';

export async function middleware(req: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get(ACCESS_TOKEN_KEY)?.value;
  const isAdminUser = cookie.get(USER_ROLE_KEY)?.value === UserRole.ADMIN;

  // If token is not found, redirect to the signin page
  if (!token && req.nextUrl.pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (req.nextUrl.pathname === '/') {
    if (isAdminUser) {
      return NextResponse.redirect(new URL('/admin/feedbacks', req.url));
    }
    return NextResponse.redirect(new URL('/new-feedback', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
