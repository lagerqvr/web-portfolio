import 'server-only';

/**
 * Cloudflare Turnstile verification.
 *
 * This replaces a reCAPTCHA integration that only checked `success`. With a v3
 * key that flag is true for any well-formed token regardless of the risk score,
 * which is why the old form let spam through. Turnstile's `success` is a real
 * pass/fail, and we additionally pin the hostname so a token minted against a
 * copy of this form on another origin is rejected.
 */

/** Cloudflare's documented always-passes test pair, for local development. */
const TEST_SITE_KEY = '1x00000000000000000000AA';
const TEST_SECRET = '1x0000000000000000000000000000000AA';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function turnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;
}

/** True when no real secret is configured and the test pair is in play. */
function usingTestKeys(): boolean {
  return !process.env.TURNSTILE_SECRET_KEY;
}

function turnstileSecret(): string {
  return process.env.TURNSTILE_SECRET_KEY || TEST_SECRET;
}

/** Hostnames a token is allowed to have been solved on. */
function allowedHostnames(): string[] {
  const configured = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  const base = configured
    ? configured.split(',').map((h) => h.trim()).filter(Boolean)
    : ['lagerqvr.com', 'www.lagerqvr.com', 'localhost'];

  // Cloudflare's test keys always report `example.com`, so local development
  // would otherwise fail the pin that protects production.
  return usingTestKeys() ? [...base, 'example.com'] : base;
}

export interface TurnstileResult {
  ok: boolean;
  reason?: string;
}

export async function verifyTurnstile(token: string, ip: string): Promise<TurnstileResult> {
  // Fail closed in production rather than silently falling back to the
  // always-passes test secret. A missing env var must not reopen the gate —
  // that class of mistake is what let the previous form through.
  if (usingTestKeys() && process.env.NODE_ENV === 'production') {
    console.error('[turnstile] TURNSTILE_SECRET_KEY is not set in production — refusing all submissions');
    return { ok: false, reason: 'unconfigured' };
  }

  if (!token) return { ok: false, reason: 'missing-token' };

  const body = new URLSearchParams({
    secret: turnstileSecret(),
    response: token,
  });
  if (ip && ip !== 'unknown') body.set('remoteip', ip);

  let payload: { success?: boolean; hostname?: string; 'error-codes'?: string[] };
  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, reason: `verify-http-${res.status}` };
    payload = await res.json();
  } catch {
    // Fail closed: an unreachable verifier must not become an open gate.
    return { ok: false, reason: 'verify-unreachable' };
  }

  if (!payload.success) {
    return { ok: false, reason: payload['error-codes']?.join(',') || 'rejected' };
  }

  // A Turnstile token is single-use and bound to the origin it was solved on;
  // pinning the hostname stops a token farmed elsewhere from being replayed.
  const hostname = payload.hostname;
  if (hostname && !allowedHostnames().includes(hostname)) {
    return { ok: false, reason: `hostname:${hostname}` };
  }

  return { ok: true };
}
