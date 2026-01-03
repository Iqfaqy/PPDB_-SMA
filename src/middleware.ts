import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session');
    const userSession = request.cookies.get('user_session');

    const path = request.nextUrl.pathname;

    // Admin Protection
    const isLoginPage = path === '/admin';
    const isAdminDashboard = path.startsWith('/admin/dashboard');

    if (isAdminDashboard && !adminSession) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (isLoginPage && adminSession) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // User Protection
    const isUserDashboard = path.startsWith('/user/dashboard');
    const isAuthPage = path === '/login' || path === '/register';

    if (isUserDashboard && !userSession) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (isAuthPage && userSession) {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/user/:path*',
        '/login',
        '/register'
    ],
};
