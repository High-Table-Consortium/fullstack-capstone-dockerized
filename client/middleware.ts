// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const isAuthPage = pathname.startsWith('/auth')
  const isApiRoute = pathname.startsWith('/api')

  // For API routes, we don't need to do anything here now
  if (isApiRoute) {
    return NextResponse.next()
  }

  // We can't check for authentication here anymore since the token is in localStorage
  // You might want to handle this check client-side in your components or pages

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
