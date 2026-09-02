/**
 * Shared between the client widget and the server verifier. Kept out of
 * `lib/turnstile.ts` because that module is `server-only` and the form is a
 * client component — but both must agree on this value or every token is
 * rejected as `action:<mismatch>`.
 */
export const TURNSTILE_ACTION = 'contact';
