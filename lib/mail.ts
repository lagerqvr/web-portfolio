import 'server-only';
import { headerSafe } from './contact-schema';

/**
 * Resend transport, provisioned through the Vercel Marketplace.
 *
 * Called over the REST API rather than the SDK: it is one request, and this
 * site just shed a dependency tree carrying sixteen advisories — adding a
 * package to build a JSON body would be a poor trade.
 */
const ENDPOINT = 'https://api.resend.com/emails';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  ip: string;
  locale: string;
}

export type SendResult = { ok: true; id: string } | { ok: false; reason: string };

export async function sendContactMessage(input: ContactMessage): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: 'transport-unconfigured' };

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) return { ok: false, reason: 'recipient-unconfigured' };

  // The sender must be a domain verified in Resend — never the visitor's
  // address, which would be a spoof and would fail DMARC. The visitor goes in
  // reply_to so hitting reply still works.
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

  const name = headerSafe(input.name);
  const email = headerSafe(input.email);

  const body = {
    from,
    to: [to],
    // Fixed subject: nothing visitor-controlled reaches a header position.
    subject: 'Portfolio contact form',
    reply_to: [email],
    text: [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Locale:  ${headerSafe(input.locale)}`,
      `IP:      ${headerSafe(input.ip)}`,
      '',
      '---',
      '',
      input.message,
    ].join('\n'),
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[mail] resend rejected the message', res.status, detail.slice(0, 500));
      return { ok: false, reason: `resend-${res.status}` };
    }

    const json = (await res.json()) as { id?: string };
    return { ok: true, id: json.id ?? 'unknown' };
  } catch (err) {
    console.error('[mail] resend request failed', err);
    return { ok: false, reason: 'transport-error' };
  }
}
