import 'server-only';

/**
 * Single source for the HMAC/JWT signing secret. Deliberately throws rather
 * than falling back to a constant — a predictable signing key would silently
 * void both the admin session and the form-token timing check.
 */
export function authSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be set to at least 32 characters. Run: openssl rand -base64 32');
  }
  return new TextEncoder().encode(secret);
}
