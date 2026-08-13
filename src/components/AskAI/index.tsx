import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

/**
 * "Ask AI" — a navbar dropdown that hands the reader's question to the
 * assistant of their choice, framed against this site's content.
 *
 * There is no service behind this and no key to manage. Each assistant accepts
 * a pre-filled prompt as a query parameter, and the prompt points at
 * /llms-full.txt — the whole help center as plain text, regenerated on every
 * build — so the answer is grounded in these pages rather than in whatever the
 * model remembers about Carbon Voice.
 *
 * Nothing is sent anywhere until the reader picks an assistant.
 */

type Assistant = {
  readonly name: string;
  readonly href: (encodedPrompt: string) => string;
};

// These `q` parameters are conventional rather than documented. If one stops
// pre-filling, the link still opens that assistant with an empty composer, so
// the failure is mild.
const ASSISTANTS: readonly Assistant[] = [
  {name: 'Claude', href: (q) => `https://claude.ai/new?q=${q}`},
  {name: 'ChatGPT', href: (q) => `https://chatgpt.com/?q=${q}`},
  {name: 'Gemini', href: (q) => `https://gemini.google.com/app?q=${q}`},
  {name: 'Perplexity', href: (q) => `https://www.perplexity.ai/search?q=${q}`},
];

function buildPrompt(siteUrl: string, pathname: string): string {
  const lines = [
    `Read ${siteUrl}/llms-full.txt — the complete Carbon Voice help center — and`,
    'answer using only what it says. Cite the page each answer comes from.',
  ];

  // On an article, name it: most questions are about the page in front of the
  // reader, and the full text stays available for everything else.
  if (pathname && pathname !== '/') {
    lines.push(`I am reading ${siteUrl}${pathname}.`);
  }

  lines.push('', 'My question: ');
  return lines.join(' ').replace(/ {2,}/g, ' ');
}

export default function AskAI(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!container.current?.contains(event.target as Node)) {
        close();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  // Close when navigating, so the menu does not linger over the next page.
  useEffect(close, [pathname, close]);

  const encodedPrompt = encodeURIComponent(
    buildPrompt(siteConfig.url, pathname),
  );

  return (
    <div
      ref={container}
      className={clsx('navbar__item', 'dropdown', 'dropdown--right', {
        'dropdown--show': open,
      })}>
      {/* Deliberately not `navbar__link`: Infima sets `pointer-events: none`
          on an href-less `.navbar__link` inside a dropdown, since its own
          dropdowns open on hover. This one opens on click, so it carries its
          own styling instead. */}
      <button
        type="button"
        className="askAI__button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((wasOpen) => !wasOpen)}>
        Ask AI
      </button>
      <ul className="dropdown__menu askAI__menu" role="menu">
        <li className="askAI__intro">
          Ask a question about these docs in:
        </li>
        {ASSISTANTS.map((assistant) => (
          <li key={assistant.name} role="none">
            <a
              className="dropdown__link"
              role="menuitem"
              href={assistant.href(encodedPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}>
              {assistant.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
