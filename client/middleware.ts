// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (token) {
        // Clone the request headers to modify them
        const headers = new Headers(req.headers);
        headers.set('Authorization', `Bearer ${token}`);

        // Rebuild the request with the modified headers
        const requestWithAuth = new Request(req.url, {
            method: req.method,
            headers,
            body: req.body,
            redirect: req.redirect,
        });

        return NextResponse.next({ request: requestWithAuth });
    }

    return NextResponse.next();
}

// Specify routes to apply this middleware to (optional)
export const config = {
    matcher: ['/auth/:path*'],
};
