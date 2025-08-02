// Located at: /nextjs-app/middleware.ts (or /src/middleware.ts)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Check authentication (adjust based on your auth system)
  const isAuthenticated = request.cookies.get('auth-token')?.value
  
  // 2. Define protected routes
  const protectedRoutes = ['/profile', '/dashboard'] // Add your protected paths
  const authRoutes = ['/login', '/signup']
  
  // 3. Handle route protection
  if (!isAuthenticated && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // 4. Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - static files
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}