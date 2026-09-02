'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { put } from '@vercel/blob';
import { createSession, destroySession, requireAdmin, verifyPassword } from '@/lib/auth';
import { clientIp, rateLimit } from '@/lib/ratelimit';
import { saveContent } from '@/lib/content';
import { siteContentSchema } from '@/lib/schemas';
import { pixelate } from '@/lib/pixelate';

export type ActionState = { error?: string; ok?: boolean; url?: string };

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = clientIp(await headers());

  // Throttle before touching the KDF: scrypt is deliberately expensive, which
  // makes an unthrottled login endpoint a CPU exhaustion target as well as a
  // guessing one.
  const limit = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return { error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} min.` };
  }

  const password = formData.get('password');
  if (typeof password !== 'string' || password.length === 0) {
    return { error: 'Password required.' };
  }

  if (!(await verifyPassword(password))) {
    return { error: 'Incorrect password.' };
  }

  await createSession();
  redirect('/admin');
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}

export async function saveSiteContent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const raw = formData.get('document');
  if (typeof raw !== 'string') return { error: 'Missing document.' };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: 'Document is not valid JSON.' };
  }

  // Validated server-side regardless of what the editor believes it sent.
  const result = siteContentSchema.safeParse(parsed);
  if (!result.success) {
    const first = result.error.issues[0];
    return { error: `${first?.path.join('.') ?? 'document'}: ${first?.message ?? 'invalid'}` };
  }

  try {
    await saveContent(result.data);
    return { ok: true };
  } catch (err) {
    console.error('[admin] save failed', err);
    return { error: 'Could not write to storage. Check BLOB_READ_WRITE_TOKEN.' };
  }
}

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export async function uploadImage(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { error: 'No file selected.' };
  if (file.size > MAX_UPLOAD_BYTES) return { error: 'File is larger than 8 MB.' };
  if (!ALLOWED_TYPES.has(file.type)) return { error: `Unsupported type: ${file.type || 'unknown'}` };

  try {
    const input = Buffer.from(await file.arrayBuffer());
    // Re-encoded through sharp, which both applies the house dither and strips
    // whatever the original container held — an uploaded file is never served back verbatim.
    const png = await pixelate(input, { size: 96 });

    const blob = await put(`media/${crypto.randomUUID()}.png`, png, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
    });

    return { ok: true, url: blob.url };
  } catch (err) {
    console.error('[admin] upload failed', err);
    return { error: 'Upload failed.' };
  }
}
