import 'server-only';
import { unstable_cache, updateTag } from 'next/cache';
import { head, put } from '@vercel/blob';
import seed from '@/content/seed.json';
import { siteContentSchema, type SiteContent } from './schemas';

export const CONTENT_TAG = 'site-content';
const BLOB_PATH = 'content/site.json';

/**
 * The committed seed is the floor: if Blob is unset, unreachable, or holds a
 * document that no longer matches the schema, the site still renders. This is
 * what lets a fresh clone build with no environment at all.
 */
function seedContent(): SiteContent {
  const parsed = siteContentSchema.safeParse(seed);
  if (!parsed.success) {
    // A broken seed is a build-time authoring error, not a runtime condition.
    throw new Error(`content/seed.json does not match the schema: ${parsed.error.message}`);
  }
  return parsed.data;
}

async function fetchFromBlob(): Promise<SiteContent | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    const meta = await head(BLOB_PATH).catch(() => null);
    if (!meta) return null;

    const res = await fetch(meta.url, { cache: 'no-store' });
    if (!res.ok) return null;

    const parsed = siteContentSchema.safeParse(await res.json());
    if (!parsed.success) {
      console.error('[content] stored document failed validation, using seed', parsed.error.issues);
      return null;
    }
    return parsed.data;
  } catch (err) {
    console.error('[content] blob read failed, using seed', err);
    return null;
  }
}

const cachedContent = unstable_cache(
  async () => (await fetchFromBlob()) ?? seedContent(),
  ['site-content'],
  { tags: [CONTENT_TAG], revalidate: 3600 },
);

export async function getContent(): Promise<SiteContent> {
  return cachedContent();
}

/** Read past the cache — the admin editor must never show a stale document. */
export async function getContentUncached(): Promise<SiteContent> {
  return (await fetchFromBlob()) ?? seedContent();
}

export async function saveContent(content: SiteContent): Promise<void> {
  const validated = siteContentSchema.parse({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await put(BLOB_PATH, JSON.stringify(validated, null, 2), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });

  // `updateTag` rather than `revalidateTag`: this runs inside a Server Action,
  // and it gives read-your-own-writes so the editor reloads what it just saved.
  updateTag(CONTENT_TAG);
}
