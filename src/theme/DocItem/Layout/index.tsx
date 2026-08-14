import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';

/**
 * Wraps the doc page layout to point at the page's Markdown twin — the same
 * page as plain Markdown, served at its own URL plus `.md`, written by
 * scripts/generate-llms-txt.mjs on every build.
 *
 * Two pointers, because the two consumers look in different places:
 *
 *   - `<link rel="alternate" type="text/markdown">`, for anything that parses
 *     the head. The theme already advertises the blog's RSS, Atom and JSON
 *     feeds this way; the Markdown twin is the same idea for the doc pages.
 *   - A line of body text, visually hidden, for the far more common case of a
 *     reader pasting this page's URL into an assistant. What arrives there is
 *     the rendered HTML — navigation, sidebar and all — so the sentence has to
 *     be in the document itself to be seen at all.
 *
 * Only doc pages are wrapped, which is deliberate: `.md` twins are generated
 * from docs/, so the announcements under /whats-new have none to point at.
 *
 * The theme is only wrapped here, never replaced — an upgrade brings the new
 * DocItem/Layout with it.
 */

type Props = WrapperProps<typeof LayoutType>;

/**
 * The twin's URL: /ai -> /ai.md, and the home page -> /index.md.
 *
 * A category's own index page has a permalink that ends in a slash — `/ai/`
 * for docs/ai/index.md — even with `trailingSlash: false`, so that has to come
 * off first or the URL comes out as `/ai/.md`.
 */
function markdownRoute(permalink: string): string {
  const route = permalink.replace(/\/+$/, '');
  return route === '' ? '/index.md' : `${route}.md`;
}

export default function LayoutWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const route = markdownRoute(metadata.permalink);

  return (
    <>
      <Head>
        <link rel="alternate" type="text/markdown" href={route} />
      </Head>
      {/* aria-hidden as well as visually hidden: this is a note for machines
          reading the page, and a screen reader announcing it before every
          article would be noise. Assistive tech users get the same content
          either way — this points at a copy, not at anything extra. */}
      {/* One interpolation, not three: React separates adjacent expressions
          with `<!-- -->` markers in the server-rendered HTML, and this sentence
          is written to be read as text. */}
      <div className="visually-hidden" aria-hidden="true">
        {`A Markdown version of this page is available at ${siteConfig.url}${route}`}
      </div>
      <Layout {...props} />
    </>
  );
}
