import { z } from 'zod';

/**
 * Locales. `en` is the source of truth; `fi` and `sv` are optional per field so
 * the admin can publish without having filled in every translation.
 */
export const LOCALES = ['en', 'fi', 'sv'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Text is stored as plain strings, never HTML — content is editable through the
 * admin UI, so storing markup would be a stored-XSS surface. Emphasis is marked
 * with *asterisks* and resolved into React nodes by `lib/rich-text.tsx`.
 */
const localized = (max = 4000) =>
  z.object({
    en: z.string().max(max),
    fi: z.string().max(max).optional(),
    sv: z.string().max(max).optional(),
  });

export type Localized = z.infer<ReturnType<typeof localized>>;

const url = z.string().url().max(500);

/**
 * Images come from two places: files committed under `public/` (root-relative)
 * and admin uploads living in Blob (absolute). Both are valid.
 */
const imageRef = z.union([url, z.string().regex(/^\/[^\s]*$/, 'must be an absolute URL or a /-rooted path').max(500), z.literal('')]);
const slug = z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, digits and dashes only').max(80);

export const trajectoryEntrySchema = z.object({
  id: z.string().max(40),
  kind: z.enum(['work', 'education']),
  org: z.string().max(120),
  orgUrl: url.optional().or(z.literal('')),
  role: localized(160),
  period: z.string().max(60),
  sortKey: z.number().int(),
  body: localized(1200),
});

export const workEntrySchema = z.object({
  slug,
  title: z.string().max(120),
  year: z.string().max(20),
  kind: localized(60),
  summary: localized(600),
  body: localized(6000),
  image: imageRef.optional(),
  link: url.optional().or(z.literal('')),
  linkLabel: localized(60).optional(),
  featured: z.boolean(),
});

export const vectorModeSchema = z.object({
  id: z.string().max(40),
  label: z.string().max(60),
  title: localized(120),
  body: localized(1200),
});

export const signalSchema = z.object({
  id: z.string().max(40),
  category: z.string().max(40),
  label: z.string().max(120),
  note: localized(300),
  url: url.optional().or(z.literal('')),
});

export const siteContentSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string(),
  profile: z.object({
    name: z.string().max(80),
    /** Used as the wordmark and on-page identity; the legal name stays for metadata. */
    handle: z.string().max(40),
    role: z.string().max(120),
    location: z.string().max(80),
    avatar: z.string().max(500),
    status: localized(120),
  }),
  hero: z.object({
    headline: localized(400),
    sub: localized(400),
  }),
  core: z.object({
    body: localized(3000),
  }),
  trajectory: z.array(trajectoryEntrySchema).max(30),
  vector: z.object({
    intro: localized(600),
    modes: z.array(vectorModeSchema).max(8),
  }),
  work: z.array(workEntrySchema).max(30),
  signals: z.object({
    intro: localized(600),
    items: z.array(signalSchema).max(40),
  }),
  /**
   * A short off-screen note, so the site isn't only about work. Optional so a
   * document saved before this field existed still validates — otherwise an
   * older stored document would fail parsing and silently revert to the seed,
   * quietly discarding real edits.
   */
  personal: z
    .object({
      label: localized(40),
      note: localized(800),
      image: imageRef.optional(),
    })
    .optional(),
  contact: z.object({
    intro: localized(600),
    email: z.string().email().max(160),
  }),
  social: z.object({
    github: url,
    linkedin: url,
    telegram: url.optional().or(z.literal('')),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type TrajectoryEntry = z.infer<typeof trajectoryEntrySchema>;
export type WorkEntry = z.infer<typeof workEntrySchema>;
export type VectorMode = z.infer<typeof vectorModeSchema>;
export type Signal = z.infer<typeof signalSchema>;

/** Resolve a localized field, falling back to English when untranslated. */
export function t(field: Localized | undefined, locale: Locale): string {
  if (!field) return '';
  const value = field[locale];
  return value && value.trim().length > 0 ? value : field.en;
}
