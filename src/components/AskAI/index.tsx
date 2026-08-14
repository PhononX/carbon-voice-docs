import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

import ClaudeIcon from './icons/claude.svg';
import GeminiIcon from './icons/gemini.svg';
import OpenAIIcon from './icons/openai.svg';
import PerplexityIcon from './icons/perplexity.svg';

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
  readonly Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly href: (encodedPrompt: string) => string;
};

// These `q` parameters are conventional rather than documented. If one stops
// pre-filling, the link still opens that assistant with an empty composer, so
// the failure is mild.
const ASSISTANTS: readonly Assistant[] = [
  {name: 'Claude', Icon: ClaudeIcon, href: (q) => `https://claude.ai/new?q=${q}`},
  {name: 'ChatGPT', Icon: OpenAIIcon, href: (q) => `https://chatgpt.com/?q=${q}`},
  {
    name: 'Gemini',
    Icon: GeminiIcon,
    href: (q) => `https://gemini.google.com/app?q=${q}`,
  },
  {
    name: 'Perplexity',
    Icon: PerplexityIcon,
    href: (q) => `https://www.perplexity.ai/search?q=${q}`,
  },
];

/**
 * Deliberately says nothing about the page the reader is on. Someone opens
 * this menu because the page in front of them did not answer their question,
 * so that page is more likely to be the wrong context than the right one —
 * naming it would bias the answer toward it, and invite the assistant to read
 * that one page instead of the whole help center.
 */
function buildPrompt(siteUrl: string): string {
  return (
    `Read ${siteUrl}/llms-full.txt — the complete Carbon Voice help center — ` +
    'and answer my questions about Carbon Voice using only what it says. Cite ' +
    'the page each answer comes from.\n\nMy question: '
  );
}

function SparkleIcon(): React.JSX.Element {
  return (
    <svg
      className="askAI__icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true">
      <path d="M10 5c0 4.418 3.582 8 8 8-4.418 0-8 3.582-8 8 0-4.418-3.582-8-8-8 4.418 0 8-3.582 8-8Z" />
      <path
        d="M18.5 1.5c0 1.657 1.343 3 3 3-1.657 0-3 1.343-3 3 0-1.657-1.343-3-3-3 1.657 0 3-1.343 3-3Z"
        opacity="0.65"
      />
    </svg>
  );
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

  const encodedPrompt = encodeURIComponent(buildPrompt(siteConfig.url));

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
        <SparkleIcon />
        Ask AI
      </button>
      <ul className="dropdown__menu askAI__menu" role="menu">
        <li className="askAI__intro">
          Ask a question about these docs in:
        </li>
        {ASSISTANTS.map((assistant) => (
          <li key={assistant.name} role="none">
            <a
              className="dropdown__link askAI__link"
              role="menuitem"
              href={assistant.href(encodedPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}>
              {/* Inlined rather than loaded as an image so the OpenAI mark can
                  follow the menu's text colour; the label already names the
                  service, so the mark is decorative to a screen reader. */}
              <assistant.Icon className="askAI__vendorIcon" aria-hidden="true" />
              {assistant.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
