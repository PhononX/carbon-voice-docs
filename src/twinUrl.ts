/**
 * The URL of a page's Markdown twin: the same page as plain Markdown, served at
 * its own URL plus `.md` by scripts/generate-llms-txt.mjs.
 *
 * This mirrors markdownRoute() in that script, and is shared by the two theme
 * wrappers that advertise it — doc pages and announcement pages — so the rule
 * lives in one place on this side of the build.
 *
 * A category's own index page has a permalink that ends in a slash — `/ai/` for
 * docs/ai/index.md — even with `trailingSlash: false`, so that has to come off
 * first or the URL comes out as `/ai/.md`.
 */
export function twinUrl(permalink: string): string {
  const route = permalink.replace(/\/+$/, '');
  return route === '' ? '/index.md' : `${route}.md`;
}
