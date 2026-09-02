import { getTranslations } from 'next-intl/server';
import ContactForm from './ContactForm';
import { issueFormToken } from '@/lib/form-token';
import { turnstileSiteKey } from '@/lib/turnstile';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default async function Contact({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const tr = await getTranslations('contact');
  // Minted per render: this is what pins how long the form was on screen.
  const formToken = await issueFormToken();

  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <p className="max-w-md text-lg leading-[1.5] tracking-[-0.01em] text-text md:text-2xl">
          {t(content.contact.intro, locale)}
        </p>

        <div className="mt-10 space-y-3">
          <div>
            <span className="label label-dim block">{tr('directEmail')}</span>
            <a
              href={`mailto:${content.contact.email}`}
              className="mt-1 inline-block text-[0.9375rem] text-text transition-colors duration-150 ease-[steps(4,end)] hover:text-sodium"
            >
              {content.contact.email}
            </a>
          </div>
        </div>
      </div>

      <ContactForm siteKey={turnstileSiteKey()} formToken={formToken} locale={locale} />
    </div>
  );
}
