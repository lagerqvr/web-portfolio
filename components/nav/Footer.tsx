import { Mark } from '@/components/ui/Mark';
import LocaleSwitcher from './LocaleSwitcher';
import type { SiteContent } from '@/lib/schemas';

export default function Footer({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: content.social.github },
    { label: 'LinkedIn', href: content.social.linkedin },
    ...(content.social.telegram ? [{ label: 'Telegram', href: content.social.telegram }] : []),
    { label: 'Email', href: `mailto:${content.contact.email}` },
  ];

  return (
    <footer className="hairline">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <Mark size={18} className="text-dim" />
            <span className="label label-dim">
              {content.profile.handle} — {year}
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="label text-dim transition-colors duration-150 ease-[steps(4,end)] hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <LocaleSwitcher />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          <span className="label label-dim">{content.profile.name}</span>
          <span className="label label-dim">{content.profile.location}</span>
        </div>
      </div>
    </footer>
  );
}
