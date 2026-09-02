import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { authSecret } from './secret';

/**
 * A short-lived signed token minted when the contact form renders and returned
 * with the submission. It pins how long the form was actually on screen, which
 * catches the two bot shapes a captcha alone does not: instant POSTs, and
 * harvested forms replayed hours later.
 */
const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 30 * 60 * 1000;

export async function issueFormToken(): Promise<string> {
  return new SignJWT({ k: 'contact' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30m')
    .sign(authSecret());
}

export type FormTokenResult = { ok: true } | { ok: false; reason: string };

export async function verifyFormToken(token: string): Promise<FormTokenResult> {
  if (!token) return { ok: false, reason: 'missing' };

  try {
    const { payload } = await jwtVerify(token, authSecret(), { algorithms: ['HS256'] });
    if (payload.k !== 'contact') return { ok: false, reason: 'wrong-kind' };

    const issuedAtMs = (payload.iat ?? 0) * 1000;
    const elapsed = Date.now() - issuedAtMs;

    if (elapsed < MIN_FILL_MS) return { ok: false, reason: 'too-fast' };
    if (elapsed > MAX_FILL_MS) return { ok: false, reason: 'too-old' };

    return { ok: true };
  } catch {
    return { ok: false, reason: 'invalid-signature' };
  }
}
