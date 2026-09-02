'use client';

import { useActionState, useCallback, useEffect, useState } from 'react';
import { logout, saveSiteContent, type ActionState } from '@/app/(admin)/admin/actions';
import { Mark } from '@/components/ui/Mark';
import type { Locale, SiteContent } from '@/lib/schemas';
import { Field, ImageField, LocaleTabs, LocalizedField, ListRow, Panel } from './fields';

const empty = { en: '' };

export default function Editor({ initial }: { initial: SiteContent }) {
  const [doc, setDoc] = useState<SiteContent>(initial);
  const [locale, setLocale] = useState<Locale>('en');
  const [dirty, setDirty] = useState(false);
  const [state, action, pending] = useActionState<ActionState, FormData>(saveSiteContent, {});

  /** Structured clone keeps the update sites readable without an immer dependency. */
  const update = useCallback((fn: (draft: SiteContent) => void) => {
    setDoc((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
  }, []);

  // Clearing the dirty flag on a successful save is derived state, not a side
  // effect. Adjusting during render is React's documented pattern for this and
  // avoids the extra commit an effect would cost.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.ok) setDirty(false);
  }

  // Losing an edit to a stray navigation is the one unrecoverable mistake here.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const move = <T,>(list: T[], from: number, to: number) => {
    if (to < 0 || to >= list.length) return;
    const [item] = list.splice(from, 1);
    if (item) list.splice(to, 0, item);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32 pt-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mark size={18} className="text-text" />
          <span className="label text-text">
            Content <span className="label-dim">— —</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="label text-dim hover:text-text">
            View site ↗
          </a>
          <form action={logout}>
            <button type="submit" className="label text-dim hover:text-text">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mb-6">
        <LocaleTabs locale={locale} onChange={setLocale} />
        <p className="label label-dim mt-2">
          Localised fields edit the {locale.toUpperCase()} version. Empty translations fall back to English.
        </p>
      </div>

      <div className="space-y-3">
        <Panel title="Profile" defaultOpen>
          <Field label="Name (used in metadata and the footer)" value={doc.profile.name} onChange={(v) => update((d) => { d.profile.name = v; })} />
          <Field label="Handle (the wordmark)" value={doc.profile.handle} onChange={(v) => update((d) => { d.profile.handle = v; })} />
          <Field label="Role" value={doc.profile.role} onChange={(v) => update((d) => { d.profile.role = v; })} />
          <Field label="Location" value={doc.profile.location} onChange={(v) => update((d) => { d.profile.location = v; })} />
          <LocalizedField label="Status line" locale={locale} value={doc.profile.status} onChange={(v) => update((d) => { d.profile.status = v; })} />
          <ImageField label="Avatar" value={doc.profile.avatar} onChange={(v) => update((d) => { d.profile.avatar = v; })} />
        </Panel>

        <Panel title="Hero">
          <LocalizedField label="Headline (wrap a phrase in *asterisks* to recess it)" locale={locale} value={doc.hero.headline} onChange={(v) => update((d) => { d.hero.headline = v; })} textarea rows={3} />
          <LocalizedField label="Sub-headline" locale={locale} value={doc.hero.sub} onChange={(v) => update((d) => { d.hero.sub = v; })} textarea rows={3} />
        </Panel>

        <Panel title="Core logic">
          <LocalizedField label="Body (blank line between paragraphs)" locale={locale} value={doc.core.body} onChange={(v) => update((d) => { d.core.body = v; })} textarea rows={12} />
        </Panel>

        <Panel title="Trajectory" count={doc.trajectory.length}>
          <div className="space-y-2">
            {doc.trajectory.map((entry, i) => (
              <ListRow
                key={entry.id}
                index={i}
                total={doc.trajectory.length}
                title={`${entry.period} · ${entry.org}`}
                onMove={(from, to) => update((d) => move(d.trajectory, from, to))}
                onRemove={(idx) => update((d) => { d.trajectory.splice(idx, 1); })}
              >
                <Field label="Organisation" value={entry.org} onChange={(v) => update((d) => { d.trajectory[i]!.org = v; })} />
                <Field label="Organisation URL" value={entry.orgUrl ?? ''} onChange={(v) => update((d) => { d.trajectory[i]!.orgUrl = v; })} mono />
                <Field label="Period" value={entry.period} onChange={(v) => update((d) => { d.trajectory[i]!.period = v; })} />
                <Field label="Sort key (higher shows first)" value={String(entry.sortKey)} onChange={(v) => update((d) => { d.trajectory[i]!.sortKey = Number(v) || 0; })} mono />
                <label className="label flex items-center gap-2">
                  <input type="checkbox" checked={entry.kind === 'education'} onChange={(e) => update((d) => { d.trajectory[i]!.kind = e.target.checked ? 'education' : 'work'; })} />
                  Education (rather than work)
                </label>
                <LocalizedField label="Role" locale={locale} value={entry.role} onChange={(v) => update((d) => { d.trajectory[i]!.role = v; })} />
                <LocalizedField label="Description" locale={locale} value={entry.body} onChange={(v) => update((d) => { d.trajectory[i]!.body = v; })} textarea rows={4} />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            className="pill w-full justify-center"
            onClick={() => update((d) => {
              d.trajectory.push({ id: crypto.randomUUID().slice(0, 8), kind: 'work', org: 'New entry', orgUrl: '', role: { ...empty }, period: '', sortKey: 0, body: { ...empty } });
            })}
          >
            Add entry ⊕
          </button>
        </Panel>

        <Panel title="Vector" count={doc.vector.modes.length}>
          <LocalizedField label="Intro" locale={locale} value={doc.vector.intro} onChange={(v) => update((d) => { d.vector.intro = v; })} textarea rows={3} />
          <div className="space-y-2">
            {doc.vector.modes.map((mode, i) => (
              <ListRow
                key={mode.id}
                index={i}
                total={doc.vector.modes.length}
                title={mode.label}
                onMove={(from, to) => update((d) => move(d.vector.modes, from, to))}
                onRemove={(idx) => update((d) => { d.vector.modes.splice(idx, 1); })}
              >
                <Field label="Label" value={mode.label} onChange={(v) => update((d) => { d.vector.modes[i]!.label = v; })} />
                <LocalizedField label="Title" locale={locale} value={mode.title} onChange={(v) => update((d) => { d.vector.modes[i]!.title = v; })} />
                <LocalizedField label="Body" locale={locale} value={mode.body} onChange={(v) => update((d) => { d.vector.modes[i]!.body = v; })} textarea rows={5} />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            className="pill w-full justify-center"
            onClick={() => update((d) => {
              d.vector.modes.push({ id: crypto.randomUUID().slice(0, 8), label: 'New mode', title: { ...empty }, body: { ...empty } });
            })}
          >
            Add mode ⊕
          </button>
        </Panel>

        <Panel title="Work" count={doc.work.length}>
          <div className="space-y-2">
            {doc.work.map((entry, i) => (
              <ListRow
                key={entry.slug}
                index={i}
                total={doc.work.length}
                title={entry.title}
                onMove={(from, to) => update((d) => move(d.work, from, to))}
                onRemove={(idx) => update((d) => { d.work.splice(idx, 1); })}
              >
                <Field label="Title" value={entry.title} onChange={(v) => update((d) => { d.work[i]!.title = v; })} />
                <Field label="Slug (URL segment — changing it breaks existing links)" value={entry.slug} onChange={(v) => update((d) => { d.work[i]!.slug = v; })} mono />
                <Field label="Year" value={entry.year} onChange={(v) => update((d) => { d.work[i]!.year = v; })} />
                <label className="label flex items-center gap-2">
                  <input type="checkbox" checked={entry.featured} onChange={(e) => update((d) => { d.work[i]!.featured = e.target.checked; })} />
                  Featured (large card)
                </label>
                <LocalizedField label="Kind" locale={locale} value={entry.kind} onChange={(v) => update((d) => { d.work[i]!.kind = v; })} />
                <LocalizedField label="Summary" locale={locale} value={entry.summary} onChange={(v) => update((d) => { d.work[i]!.summary = v; })} textarea rows={3} />
                <LocalizedField label="Body" locale={locale} value={entry.body} onChange={(v) => update((d) => { d.work[i]!.body = v; })} textarea rows={10} />
                <ImageField label="Logo / image" value={entry.image ?? ''} onChange={(v) => update((d) => { d.work[i]!.image = v; })} />
                <Field label="External link" value={entry.link ?? ''} onChange={(v) => update((d) => { d.work[i]!.link = v; })} mono />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            className="pill w-full justify-center"
            onClick={() => update((d) => {
              d.work.push({ slug: `project-${crypto.randomUUID().slice(0, 6)}`, title: 'New project', year: String(new Date().getFullYear()), kind: { ...empty }, summary: { ...empty }, body: { ...empty }, image: '', link: '', featured: false });
            })}
          >
            Add project ⊕
          </button>
        </Panel>

        <Panel title="Signals" count={doc.signals.items.length}>
          <LocalizedField label="Intro" locale={locale} value={doc.signals.intro} onChange={(v) => update((d) => { d.signals.intro = v; })} textarea rows={3} />
          <div className="space-y-2">
            {doc.signals.items.map((item, i) => (
              <ListRow
                key={item.id}
                index={i}
                total={doc.signals.items.length}
                title={`${item.category} · ${item.label}`}
                onMove={(from, to) => update((d) => move(d.signals.items, from, to))}
                onRemove={(idx) => update((d) => { d.signals.items.splice(idx, 1); })}
              >
                <Field label="Category (groups rows; reuse exactly to group)" value={item.category} onChange={(v) => update((d) => { d.signals.items[i]!.category = v; })} />
                <Field label="Label" value={item.label} onChange={(v) => update((d) => { d.signals.items[i]!.label = v; })} />
                <Field label="URL" value={item.url ?? ''} onChange={(v) => update((d) => { d.signals.items[i]!.url = v; })} mono />
                <LocalizedField label="Note" locale={locale} value={item.note} onChange={(v) => update((d) => { d.signals.items[i]!.note = v; })} textarea rows={2} />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            className="pill w-full justify-center"
            onClick={() => update((d) => {
              d.signals.items.push({ id: crypto.randomUUID().slice(0, 8), category: 'Security', label: 'New signal', note: { ...empty }, url: '' });
            })}
          >
            Add signal ⊕
          </button>
        </Panel>

        <Panel title="Off-screen note">
          {doc.personal ? (
            <>
              <LocalizedField label="Label" locale={locale} value={doc.personal.label} onChange={(v) => update((d) => { if (d.personal) d.personal.label = v; })} />
              <LocalizedField label="Note" locale={locale} value={doc.personal.note} onChange={(v) => update((d) => { if (d.personal) d.personal.note = v; })} textarea rows={5} />
              <ImageField label="Image" value={doc.personal.image ?? ''} onChange={(v) => update((d) => { if (d.personal) d.personal.image = v; })} />
              <button
                type="button"
                className="pill w-full justify-center"
                onClick={() => update((d) => { d.personal = undefined; })}
              >
                Remove note
              </button>
            </>
          ) : (
            <button
              type="button"
              className="pill w-full justify-center"
              onClick={() => update((d) => {
                d.personal = { label: { ...empty }, note: { ...empty }, image: '' };
              })}
            >
              Add an off-screen note ⊕
            </button>
          )}
        </Panel>

        <Panel title="Contact & links">
          <LocalizedField label="Intro" locale={locale} value={doc.contact.intro} onChange={(v) => update((d) => { d.contact.intro = v; })} textarea rows={3} />
          <Field label="Public email" value={doc.contact.email} onChange={(v) => update((d) => { d.contact.email = v; })} mono />
          <Field label="GitHub" value={doc.social.github} onChange={(v) => update((d) => { d.social.github = v; })} mono />
          <Field label="LinkedIn" value={doc.social.linkedin} onChange={(v) => update((d) => { d.social.linkedin = v; })} mono />
          <Field label="Telegram" value={doc.social.telegram ?? ''} onChange={(v) => update((d) => { d.social.telegram = v; })} mono />
        </Panel>
      </div>

      <form
        action={action}
        className="fixed inset-x-0 bottom-0 border-t border-hairline bg-panel/95 backdrop-blur-sm"
      >
        <input type="hidden" name="document" value={JSON.stringify(doc)} />
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <span className="label label-dim truncate">
            {state.error ? (
              <span className="text-sodium">{state.error}</span>
            ) : state.ok && !dirty ? (
              'Saved — live on the site'
            ) : dirty ? (
              'Unsaved changes'
            ) : (
              'No changes'
            )}
          </span>
          <button type="submit" disabled={pending || !dirty} className="pill shrink-0">
            {pending ? 'Saving' : 'Publish'} <span aria-hidden="true">⊕</span>
          </button>
        </div>
      </form>
    </div>
  );
}
