import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Content-Security-Policy.
 *
 * Deliberately *not* nonce-based. A per-request nonce cannot work here: these
 * pages are statically prerendered, so their script tags are emitted at build
 * time when no request — and therefore no nonce — exists. Pairing a runtime
 * nonce with `strict-dynamic` (which makes 'self' be ignored) blocked every
 * Next.js chunk and shipped a page with no JavaScript at all. The alternative,
 * forcing dynamic rendering site-wide, would trade away the static delivery
 * that keeps this fast on mobile.
 *
 * So `script-src` allows self-hosted and inline scripts. The trade is narrow
 * because there is no HTML injection path into these pages: content is
 * admin-editable but is stored as plain text and rendered as React nodes, and
 * the only `dangerouslySetInnerHTML` is JSON-LD built server-side and escaped
 * (lib/json-ld.ts). Every other directive stays locked down.
 */
function contentSecurityPolicy(isDev: boolean, isLocalhost: boolean): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
    "font-src 'self' data:",
    `connect-src 'self' https://challenges.cloudflare.com${isDev ? ' ws: http://localhost:*' : ''}`,
    // 'self' is required alongside Cloudflare's origin: Turnstile creates a
    // same-origin frame before navigating it to the challenge. This is the
    // policy Cloudflare documents for Turnstile.
    "frame-src 'self' https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    // Never upgrade on a local host: it rewrites http://localhost to https and
    // breaks production-mode preview runs. Harmless to omit — there is nothing
    // to upgrade on a loopback origin.
    ...(isDev || isLocalhost ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

function applySecurityHeaders(
  response: NextResponse,
  csp: string,
  isDev: boolean,
  isLocalhost: boolean,
): NextResponse {
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  if (!isDev && !isLocalhost) {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  return response;
}

export default function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const host = request.headers.get('host') ?? '';
  const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\]|192\.168\.|10\.)/.test(host);
  const csp = contentSecurityPolicy(isDev, isLocalhost);
  const { pathname } = request.nextUrl;

  // The admin sits outside locale routing and must never be indexed.
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return applySecurityHeaders(response, csp, isDev, isLocalhost);
  }

  return applySecurityHeaders(intlMiddleware(request), csp, isDev, isLocalhost);
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/admin/:path*'],
};
