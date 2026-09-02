'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/app/(admin)/admin/actions';
import { LOCALES, type Locale, type Localized } from '@/lib/schemas';

export function Panel({
  title,
  count,
  children,
  defaultOpen = false,
}: {
  title: string;
  count?: number;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="border border-hairline bg-panel">
      <summary className="label flex cursor-pointer items-center justify-between px-4 py-3 text-text select-none">
        <span>{title}</span>
        {count !== undefined ? <span className="label-dim tabular">{count}</span> : null}
      </summary>
      <div className="space-y-5 border-t border-hairline p-4">{children}</div>
    </details>
  );
}

export function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  mono?: boolean;
}) {
  const cls = `field ${mono ? 'font-mono text-sm' : ''}`;
  return (
    <label className="block">
      <span className="label mb-1.5 block">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

/**
 * Localized field bound to the editor's active locale. Non-English locales show
 * the English source above the input, because translating without the original
 * in view is how drift starts.
 */
export function LocalizedField({
  label,
  value,
  locale,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  value: Localized;
  locale: Locale;
  onChange: (next: Localized) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const current = value[locale] ?? '';
  const untranslated = locale !== 'en' && current.trim().length === 0;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="label">{label}</span>
        {untranslated ? <span className="label text-sodium">falls back to EN</span> : null}
      </div>

      {locale !== 'en' ? (
        <p className="mb-2 border-l border-hairline-hi pl-3 text-xs leading-relaxed whitespace-pre-line text-dim">
          {value.en || '—'}
        </p>
      ) : null}

      {textarea ? (
        <textarea
          value={current}
          rows={rows}
          onChange={(e) => onChange({ ...value, [locale]: e.target.value })}
          className="field resize-y"
        />
      ) : (
        <input
          type="text"
          value={current}
          onChange={(e) => onChange({ ...value, [locale]: e.target.value })}
          className="field"
        />
      )}
    </div>
  );
}

export function LocaleTabs({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (l: Locale) => void;
}) {
  return (
    <div className="flex gap-px bg-hairline">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={`label flex-1 px-4 py-2.5 transition-colors duration-100 ${
            l === locale ? 'bg-panel-2 text-text' : 'bg-panel text-dim hover:text-muted'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function ListRow({
  index,
  total,
  title,
  onMove,
  onRemove,
  children,
}: {
  index: number;
  total: number;
  title: string;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  children: ReactNode;
}) {
  return (
    <details className="border border-hairline bg-ground">
      <summary className="label flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 select-none">
        <span className="truncate text-text">{title || '(untitled)'}</span>
        <span className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            disabled={index === 0}
            onClick={(e) => {
              e.preventDefault();
              onMove(index, index - 1);
            }}
            className="px-1 text-dim hover:text-text disabled:opacity-30"
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={(e) => {
              e.preventDefault();
              onMove(index, index + 1);
            }}
            className="px-1 text-dim hover:text-text disabled:opacity-30"
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (confirm(`Remove "${title}"?`)) onRemove(index);
            }}
            className="px-1 text-dim hover:text-sodium"
            aria-label="Remove"
          >
            ✕
          </button>
        </span>
      </summary>
      <div className="space-y-4 border-t border-hairline p-3">{children}</div>
    </details>
  );
}

/** Uploads through the server action, which re-encodes and dithers the file. */
export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The action is awaited in the event handler rather than driven through
  // `useActionState`, so the resulting URL reaches the parent directly instead
  // of via an effect that fires setState during render.
  async function onUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setError(null);
    try {
      const result = await uploadImage({}, new FormData(form));
      if (result.ok && result.url) {
        onChange(result.url);
        form.reset();
      } else {
        setError(result.error ?? 'Upload failed.');
      }
    } catch {
      setError('Upload failed.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <span className="label mb-1.5 block">{label}</span>
      <div className="flex items-start gap-4">
        {value ? (
          <Image
            src={value}
            alt=""
            width={56}
            height={56}
            unoptimized
            className="pixelated h-14 w-14 shrink-0 border border-hairline"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-hairline-hi text-dim">
            —
          </div>
        )}

        <div className="min-w-0 grow space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/img/… or https://…"
            className="field font-mono text-xs"
          />
          <form onSubmit={onUpload} className="flex items-center gap-3">
            <input
              type="file"
              name="file"
              accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
              required
              className="label w-full text-dim file:mr-3 file:border file:border-hairline-hi file:bg-panel-2 file:px-3 file:py-1.5 file:text-text"
            />
            <button type="submit" disabled={pending} className="pill shrink-0 !px-3 !py-1.5">
              {pending ? '…' : 'Upload'}
            </button>
          </form>
          {error ? <p className="label text-sodium">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
