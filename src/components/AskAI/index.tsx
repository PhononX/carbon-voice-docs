import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Collapsible, useCollapsible} from '@docusaurus/theme-common';
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
 *
 * Two renderings, picked by the `mobile` prop the theme passes: a click-to-open
 * dropdown in the desktop navbar, and a collapsible section in the mobile
 * sidebar. Both are required. Below 996px the navbar collapses to a hamburger
 * and Infima hides every `.navbar__item`, so the desktop markup is not merely
 * cramped on a phone — it is `display: none`, in the drawer as well as the bar.
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

function useEncodedPrompt(): string {
  const {siteConfig} = useDocusaurusContext();
  return encodeURIComponent(buildPrompt(siteConfig.url));
}

function AskAIDesktop(): React.JSX.Element {
  const encodedPrompt = useEncodedPrompt();
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

/**
 * The mobile sidebar rendering: a collapsible section, built from the same
 * `menu__*` classes and `Collapsible` the theme uses for its own dropdown items
 * and sidebar categories, so it behaves like every other row in the drawer.
 *
 * `onClick` is supplied by the theme's mobile primary menu and closes the
 * drawer. Assistant links open in a new tab, so without it the reader comes
 * back to a help center still covered by an open sidebar.
 */
function AskAIMobile({onClick}: {onClick?: () => void}): React.JSX.Element {
  const encodedPrompt = useEncodedPrompt();
  // Always starts closed: this is an action rather than a place, so it never
  // holds the current page the way a nav category can.
  const {collapsed, toggleCollapsed} = useCollapsible({initialState: true});

  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}>
      <button
        type="button"
        aria-expanded={!collapsed}
        className="clean-btn menu__link menu__link--sublist menu__link--sublist-caret askAI__mobileToggle"
        onClick={toggleCollapsed}>
        <SparkleIcon />
        {/* The label takes the slack so the caret lands on the right edge, the
            way the sidebar's own categories do. It cannot be left to the
            caret's `margin-left: auto`, which the theme overrides globally
            from DocSidebarItem/Category/styles.module.css. */}
        <span className="askAI__mobileLabel">Ask AI</span>
      </button>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <li className="askAI__intro askAI__intro--mobile">
          Ask a question about these docs in:
        </li>
        {ASSISTANTS.map((assistant) => (
          <li className="menu__list-item" key={assistant.name}>
            <a
              className="menu__link askAI__link"
              href={assistant.href(encodedPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClick}>
              <assistant.Icon className="askAI__vendorIcon" aria-hidden="true" />
              {assistant.name}
            </a>
          </li>
        ))}
      </Collapsible>
    </li>
  );
}

type AskAIProps = {
  /** Set by the theme when rendering into the mobile sidebar. */
  readonly mobile?: boolean;
  /** Supplied by the mobile sidebar to close the drawer. */
  readonly onClick?: () => void;
  /**
   * Comes from the item's `position` in docusaurus.config. Destructured and
   * dropped rather than ignored, so it cannot reach the DOM as an attribute.
   */
  readonly position?: string;
};

export default function AskAI({
  mobile = false,
  onClick,
  position: _position,
}: AskAIProps): React.JSX.Element {
  return mobile ? <AskAIMobile onClick={onClick} /> : <AskAIDesktop />;
}
