import { z } from 'zod';

/**
 * Every value is length-capped before it reaches the mail API. The previous
 * implementation interpolated an unvalidated name and address straight into the
 * message subject, which is a header-injection surface.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(160),
  message: z.string().trim().min(10).max(4000),
  turnstileToken: z.string().min(1).max(2048),
  formToken: z.string().min(1).max(4000),
  /** Honeypot. Real users never see this field, so any value is a bot. */
  company: z.string().max(200).optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Strip anything that could terminate or forge a header line. Applied to every
 * value that ends up in a header position (subject, display name, reply-to).
 */
export function headerSafe(value: string): string {
  // CR/LF terminate a header; the wider control range also covers smuggling
  // via NUL and friends. Collapse rather than drop so words don't fuse.
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
}
