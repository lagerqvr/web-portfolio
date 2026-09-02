'use client';

import { useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm({
  siteKey,
  formToken,
  locale,
}: {
  siteKey: string;
  formToken: string;
  locale: string;
}) {
  const t = useTranslations('contact');
  const turnstile = useRef<TurnstileInstance>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const turnstileToken = turnstile.current?.getResponse();
    if (!turnstileToken) {
      setStatus('error');
      setError(t('captchaFailed'));
      return;
    }

    setStatus('sending');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-site-locale': locale },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          company: data.get('company') ?? '',
          turnstileToken,
          formToken,
        }),
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
        return;
      }

      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus('error');
      setError(
        payload.error === 'rate_limited'
          ? t('rateLimited')
          : payload.error === 'invalid'
            ? t('invalid')
            : payload.error === 'captcha'
              ? t('captchaFailed')
              : t('error'),
      );
      // Tokens are single-use; a retry needs a fresh one.
      turnstile.current?.reset();
    } catch {
      setStatus('error');
      setError(t('error'));
      turnstile.current?.reset();
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-hairline bg-panel p-8">
        <p className="label text-sodium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            disabled={status === 'sending'}
            className="field"
          />
        </div>

        <div>
          <label htmlFor="email" className="label mb-2 block">
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            disabled={status === 'sending'}
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          maxLength={4000}
          placeholder={t('messagePlaceholder')}
          disabled={status === 'sending'}
          className="field resize-y"
        />
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, but present in
          the DOM so naive form-fillers populate it. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)] [clip-path:inset(50%)]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile
        ref={turnstile}
        siteKey={siteKey}
        options={{ theme: 'dark', size: 'flexible', language: locale }}
        className="[color-scheme:dark]"
      />

      {error ? (
        <p role="alert" className="label text-sodium">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <span className="label label-dim">{t('protected')}</span>
        <button type="submit" disabled={status === 'sending'} className="pill">
          {status === 'sending' ? t('sending') : t('send')} <span aria-hidden="true">⊕</span>
        </button>
      </div>
    </form>
  );
}
