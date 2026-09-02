import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { clientIp, rateLimit } from '@/lib/ratelimit';
import { verifyTurnstile } from '@/lib/turnstile';
import { verifyFormToken } from '@/lib/form-token';
import { sendContactMessage } from '@/lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Deliberately coarse: never tell a prober which layer stopped them. */
function reject(code: 'invalid' | 'rate_limited' | 'captcha' | 'error', status: number) {
  return NextResponse.json({ error: code }, { status });
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  // 1. Rate limit first — it is the cheapest check and shields the rest.
  const limit = rateLimit(`contact:${ip}`, 3, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Shape and length validation.
  let parsed;
  try {
    parsed = contactSchema.safeParse(await request.json());
  } catch {
    return reject('invalid', 400);
  }
  if (!parsed.success) return reject('invalid', 400);

  const { name, email, message, company, turnstileToken, formToken } = parsed.data;

  // 3. Honeypot. Report success so the bot records a win and moves on —
  //    a 400 here just teaches the next attempt to leave the field empty.
  if (company.trim().length > 0) {
    console.warn('[contact] honeypot triggered', { ip });
    return NextResponse.json({ ok: true });
  }

  // 4. Form must have been on screen for a plausible interval.
  const timing = await verifyFormToken(formToken);
  if (!timing.ok) {
    console.warn('[contact] form token rejected', { ip, reason: timing.reason });
    return reject('invalid', 400);
  }

  // 5. Turnstile, verified server-side and pinned to our hostname.
  const captcha = await verifyTurnstile(turnstileToken, ip);
  if (!captcha.ok) {
    console.warn('[contact] turnstile rejected', { ip, reason: captcha.reason });
    return reject('captcha', 400);
  }

  const sent = await sendContactMessage({
    name,
    email,
    message,
    ip,
    locale: request.headers.get('x-site-locale') ?? 'en',
  });

  if (!sent.ok) {
    console.error('[contact] send failed', { ip, reason: sent.reason });
    return reject('error', 502);
  }

  return NextResponse.json({ ok: true });
}
