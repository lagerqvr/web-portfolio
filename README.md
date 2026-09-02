# lagerqvr.com

Personal site and portfolio. Next.js 16 (App Router), React 19, Tailwind v4, TypeScript.
Dark, monochrome, "industrial pixel" — available in English, Finnish and Swedish, with a
small admin UI for editing content without a redeploy.

Live: https://www.lagerqvr.com

## Running it

```bash
npm install
npm run dev
```

The site builds and runs with no environment at all: content falls back to the committed
`content/seed.json`, and the contact form uses Cloudflare's documented always-passes
Turnstile test keys.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` / `npm run typecheck` | ESLint (flat config) / `tsc --noEmit` |
| `npm run avatar` | Regenerates `public/img/avatar-pixel.png` from the source photo |
| `npm run hash-password -- '<password>'` | Prints `ADMIN_PASSWORD_HASH` and a fresh `AUTH_SECRET` |

## Environment

See `.env.local.example`. Nothing here is optional in production:

| Variable | Purpose |
| --- | --- |
| `AUTH_SECRET` | Signs the admin session and the contact form's timing token. 32+ chars. |
| `ADMIN_PASSWORD_HASH` | `scrypt:<salt>:<hash>` from `npm run hash-password`. The plaintext is never stored. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile. **Without the secret the API refuses every submission in production** rather than falling back to test keys. |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Comma-separated hostnames a token may be solved on. |
| `RESEND_API_KEY` | Set by the Resend Marketplace integration. |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Recipient, and a sender on a domain verified in Resend. |
| `BLOB_READ_WRITE_TOKEN` | Set by Vercel Blob. Stores the content document and uploaded images. |
| `GITHUB_AUTH_TOKEN` | Optional. Raises the rate limit for the repository list. |

## How content works

- `content/seed.json` is the committed floor. It is validated against `lib/schemas.ts` at
  build time, so a malformed seed fails the build rather than the page.
- The live document lives in Vercel Blob at `content/site.json`. If it is missing,
  unreachable, or no longer matches the schema, the site silently serves the seed.
- `/admin` edits the document and writes it back. Saving calls `updateTag`, so the public
  pages pick the change up immediately — **no redeploy**.
- Text is stored as plain strings and rendered as React nodes. Emphasis is `*asterisks*`,
  resolved by `lib/rich-text.tsx`. Content is never stored or rendered as HTML, because it
  is user-editable and that would be a stored-XSS surface.
- Localised fields carry `en` / `fi` / `sv`; an empty translation falls back to `en`, so
  the admin never has to fill all three to publish.

## Contact form

Five independent layers, because the previous version had one and it failed open:

1. **Turnstile**, verified server-side, with the solving hostname pinned.
2. **Honeypot** — a hidden `company` field. Any value returns `200 OK` and drops the
   message, so a bot gets no signal to adapt to.
3. **Timing** — a signed token issued when the form renders; under 3s or over 30m is refused.
4. **Rate limit** — 3 per 10 minutes per IP.
5. **Schema + sanitisation** — zod with length caps, and control characters stripped from
   everything that reaches a mail header. The subject is a fixed string; the sender only
   ever appears in `Reply-To`.

The old form checked `recaptchaResult.success` alone. With a reCAPTCHA v3 key that is true
for any well-formed token regardless of score, which is why spam was getting through.

## Layout

```
app/(site)/[locale]/   public pages — index sections, /work/[slug]
app/(admin)/admin/     login + editor (noindex, outside locale routing)
app/api/contact/       hardened contact endpoint
components/dither/     ordered-dither canvas + pointer ripples
components/sections/   the six index sections
lib/                   content store, schemas, auth, turnstile, mail, rate limit
content/seed.json      committed content floor (all three locales)
messages/*.json        UI chrome strings
proxy.ts               locale negotiation + CSP nonce + security headers
```

## Notes

- Security headers and a nonce-based CSP (`strict-dynamic`) are set in `proxy.ts`.
- The dither field runs at ~1/6 resolution and blits up with smoothing off. It pauses when
  scrolled out of view or the tab is hidden, and renders a single static frame under
  `prefers-reduced-motion: reduce`.
- Deployed on Vercel.
