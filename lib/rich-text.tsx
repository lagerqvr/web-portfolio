import { Fragment, type ReactNode } from 'react';

/**
 * Content is stored as plain text and rendered as React nodes — never as HTML.
 * Text is admin-editable, so `dangerouslySetInnerHTML` here would be a stored
 * XSS surface. The only markup this understands is *asterisk emphasis*, which
 * renders as the recessed second tone in the display type.
 */
export function renderRich(text: string, dimClass = 'text-dim'): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <span key={i} className={dimClass}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Split stored copy into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
