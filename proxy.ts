import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Content-Security-Policy.
 *
 * `script-src` uses a per-request nonce with `strict-dynamic`, so the scripts
 * Next injects at runtime inherit trust from the nonced bootstrap while an
 * injected inline script does not. Turnstile needs its own origin for the
 * challenge script and frame. `style-src` keeps 'unsafe-inline' because Next
 * emits inline style attributes that a nonce cannot cover.
 */
function contentSecurityPolicy(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com${
      isDev ? " 'unsafe-eval'" : ''
    }`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
    "font-src 'self' data:",
    `connect-src 'self' https://challenges.cloudflare.com${isDev ? ' ws: http://localhost:*' : ''}`,
    'frame-src https://challenges.cloudflare.com',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

function applySecurityHeaders(response: NextResponse, csp: string, isDev: boolean): NextResponse {
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  if (!isDev) {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  return response;
}

export default function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const nonce = btoa(crypto.randomUUID());
  const csp = contentSecurityPolicy(nonce, isDev);

  // Next derives the nonce for its own script tags by reading the CSP from the
  // *request* headers, so both of these have to travel inbound, not just on the
  // response.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const { pathname } = request.nextUrl;

  // The admin sits outside locale routing and must never be indexed.
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return applySecurityHeaders(response, csp, isDev);
  }

  // next-intl copies the incoming request headers onto its rewrite, so the
  // nonce reaches the render through it.
  const response = intlMiddleware(new NextRequest(request, { headers: requestHeaders }));
  return applySecurityHeaders(response, csp, isDev);
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/admin/:path*'],
};
