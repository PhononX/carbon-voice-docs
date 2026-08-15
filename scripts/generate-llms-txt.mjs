#!/usr/bin/env node
/**
 * Generates the agent-facing entry points to this documentation from the
 * canonical Markdown in docs/, at three granularities so an agent can fetch the
 * smallest thing that answers its question:
 *
 *   static/llms.txt          an index of every page, grouped by category
 *   static/<route>.md        one page, as Markdown, at its own URL plus `.md`
 *   static/llms/<section>.txt  one section, whole
 *   static/llms-full.txt     the complete text of the documentation
 *
 * The three coarser files exist because the complete one is around 200 KB, and
 * agent fetch tools routinely truncate well below that — which loses the
 * sections that sort last and, worse, gives no hint that anything was missed.
 * Every layer names the layer below it, so a truncated read has somewhere to go.
 *
 * All of it is generated, never hand-edited, and written into static/ so
 * Docusaurus copies it to the site root. `npm run build` runs this first.
 */

import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const NEWS_DIR = path.join(ROOT, 'whats-new');
const OUT_DIR = path.join(ROOT, 'static');

const SITE_URL = 'https://help.carbonvoice.app';
const REPO_URL = 'https://github.com/PhononX/carbon-voice-docs';
const RAW_URL = 'https://raw.githubusercontent.com/PhononX/carbon-voice-docs/main';

const SUMMARY =
  'The official documentation for Carbon Voice, voice messaging for your whole team — ' +
  'people and agents alike. This site is the canonical source: it is generated from plain ' +
  'Markdown in ' + REPO_URL + ', licensed CC BY 4.0, and free to quote or reuse with attribution.';

/**
 * Minimal frontmatter reader. The docs deliberately use a small, fixed set of
 * scalar keys (title, description, slug, sidebar_position, sidebar_label), so a
 * full YAML parser would be more dependency than this needs.
 */
function parseFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) {
    return {data: {}, body: source.trim()};
  }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!kv) continue;
    data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return {data, body: source.slice(match[0].length).trim()};
}

async function readCategory(dir) {
  try {
    const raw = await fs.readFile(path.join(dir, '_category_.json'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** docs/ai/ai-summaries.md -> /ai/ai-summaries ; docs/ai/index.md -> /ai */
function routeFor(relPath, frontmatter) {
  if (frontmatter.slug) {
    return frontmatter.slug === '/' ? '/' : `/${frontmatter.slug.replace(/^\/+/, '')}`;
  }
  const withoutExt = relPath.replace(/\.mdx?$/, '');
  const route = withoutExt.replace(/(^|\/)index$/, '');
  return route === '' ? '/' : `/${route}`;
}

/**
 * The docs are written for the site, so a few pages carry markup that only
 * means something once rendered. This strips the two cases that cost real size
 * or leak tooling, and deliberately leaves everything else alone: a general HTML
 * scrubber would risk mangling content to save a handful of bytes.
 */
function cleanForAgents(body) {
  return (
    body
      // Video strips: a grid of thumbnails, each carrying an image path, link
      // target, rel and pixel dimensions. On docs/videos.md that markup is 17 KB
      // — 8% of the complete file — and none of it survives as meaning. The
      // titles and the YouTube links do, so they become a plain list.
      .replace(/<div class="videoStrip">([\s\S]*?)<\/div>\s*/g, (_match, inner) => {
        const items = [
          ...inner.matchAll(
            /<a[^>]*href="([^"]+)"[\s\S]*?<span>([\s\S]*?)<\/span>/g,
          ),
        ].map(([, href, title]) => `- [${decodeEntities(title.trim())}](${href})`);
        return items.length ? `${items.join('\n')}\n\n` : '';
      })
      // Directives read by scripts/fetch-video-playlists.mjs, which regenerates
      // the strips above. Internal plumbing, not content.
      .replace(/<!--\s*videos:[\s\S]*?-->\s*/g, '')
      .replace(/<!--\s*\/videos\s*-->\s*/g, '')
      // Where the blog list stops showing a post and starts showing "read more".
      // Meaningful to Docusaurus, noise in a file being read whole.
      .replace(/<!--\s*truncate\s*-->\s*/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function decodeEntities(text) {
  const named = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' '};
  return text.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith('#')) {
      return String.fromCodePoint(Number(entity.slice(1)));
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

/**
 * Rewrites every link that depends on where the file sits into an absolute site
 * URL. Two kinds need it, and both appear in the sources:
 *
 *   - Relative Markdown links, which the help articles use. In docs/ a link like
 *     `(catch-up-with-ai.md)` resolves against the file's own directory, which
 *     is right for the repository and for Docusaurus. It is wrong everywhere
 *     these generated files are read: in llms-full.txt there is no containing
 *     directory at all, and in a per-page `.md` twin the depth shifts — `/ai.md`
 *     sits at the root, so a link meant for `/ai/catch-up-with-ai` would resolve
 *     to `/catch-up-with-ai`.
 *   - Root-relative links, which the announcements use for cross-links into the
 *     help articles (`/ai-assistants`) and which every page uses for images
 *     (`/img/...`). These need an origin: a file handed to an agent as text has
 *     no document base for a leading `/` to resolve against.
 *
 * A relative target that resolves to no known page is left untouched rather than
 * guessed at; Docusaurus already fails the build on a broken Markdown link, so
 * this only fires for links it deliberately allows.
 */
function absolutizeLinks(body, page, routeBySource) {
  const dir = path.posix.dirname(page.sourceRel);
  return body
    .replace(
      /\]\((?!https?:|\/\/|\/|#|mailto:|pathname:)([^)\s#]+\.mdx?)(#[^)\s]*)?\)/g,
      (match, target, hash = '') => {
        const source = path.posix.normalize(path.posix.join(dir, target));
        const route = routeBySource.get(source);
        return route ? `](${SITE_URL}${route}${hash})` : match;
      },
    )
    .replace(/\]\((\/(?!\/)[^)\s]*)\)/g, `](${SITE_URL}$1)`);
}

/** The URL a page's Markdown twin is served at: /ai -> /ai.md, / -> /index.md */
function markdownRoute(route) {
  return route === '/' ? '/index.md' : `${route}.md`;
}

async function collect() {
  const pages = [];

  async function walk(dir) {
    for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (/\.mdx?$/.test(entry.name)) {
        const rel = path.relative(DOCS_DIR, full).split(path.sep).join('/');
        const {data, body} = parseFrontmatter(await fs.readFile(full, 'utf8'));
        const segments = rel.split('/');
        pages.push({
          rel,
          body,
          categoryDir: segments.length > 1 ? segments[0] : '',
          sourceRel: `docs/${rel}`,
          title: data.title ?? path.basename(rel, path.extname(rel)),
          description: data.description ?? '',
          position: Number(data.sidebar_position ?? 999),
          route: routeFor(rel, data),
        });
      }
    }
  }

  await walk(DOCS_DIR);

  const categories = new Map();
  for (const dirName of new Set(pages.map((p) => p.categoryDir).filter(Boolean))) {
    const meta = await readCategory(path.join(DOCS_DIR, dirName));
    categories.set(dirName, {
      label: meta?.label ?? dirName,
      position: Number(meta?.position ?? 999),
      description: meta?.customProps?.description ?? '',
    });
  }

  const rank = (page) =>
    page.categoryDir ? categories.get(page.categoryDir).position : -1;
  pages.sort((a, b) => rank(a) - rank(b) || a.position - b.position || a.rel.localeCompare(b.rel));

  return {pages, categories};
}

/**
 * The announcements in whats-new/, newest first, as the blog lists them.
 *
 * These are dated and superseded rather than evergreen, so they stay out of
 * llms-full.txt — that file is the help articles, and it already runs close to
 * what a fetch tool will return in one request. They get an index entry and a
 * bundle of their own instead, which is the right shape for the question they
 * answer: when did this ship, and what changed.
 *
 * Docusaurus builds each post's route from the filename, so this does the same:
 * whats-new/2024-11-26-carbon-voice-on-apple-watch.md is served at
 * /whats-new/2024/11/26/carbon-voice-on-apple-watch. No post overrides it with a
 * `slug`, and this throws rather than guess if one ever does.
 */
async function collectAnnouncements() {
  const posts = [];

  for (const entry of await fs.readdir(NEWS_DIR, {withFileTypes: true})) {
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;

    const {data, body} = parseFrontmatter(
      await fs.readFile(path.join(NEWS_DIR, entry.name), 'utf8'),
    );
    const named = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.mdx?$/.exec(entry.name);
    if (!named) {
      throw new Error(`Announcement not named YYYY-MM-DD-slug.md: ${entry.name}`);
    }
    if (data.slug) {
      throw new Error(
        `Announcement ${entry.name} sets a slug; routeFor() below no longer matches Docusaurus.`,
      );
    }

    const [, year, month, day, slug] = named;
    posts.push({
      rel: entry.name,
      sourceRel: `whats-new/${entry.name}`,
      body,
      categoryDir: '',
      title: data.title ?? slug,
      description: data.description ?? '',
      date: `${year}-${month}-${day}`,
      route: `/whats-new/${year}/${month}/${day}/${slug}`,
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

/**
 * Groups the pages the way llms.txt already presents them: the pages that sit at
 * the root of docs/ first, then each category in sidebar order. One group is one
 * section bundle.
 */
function sectionsOf({pages, categories}) {
  const sections = [];

  const root = pages.filter((p) => !p.categoryDir);
  if (root.length) {
    sections.push({
      slug: 'overview',
      label: 'Overview',
      description: '',
      order: 'in the same order as the site navigation',
      pages: root,
    });
  }

  for (const [dirName, category] of [...categories.entries()].sort(
    (a, b) => a[1].position - b[1].position,
  )) {
    sections.push({
      slug: dirName,
      label: category.label,
      description: category.description,
      order: 'in the same order as the site navigation',
      pages: pages.filter((p) => p.categoryDir === dirName),
    });
  }

  return sections;
}

/** `- [Title](url): description`, the one line each page gets in an index. */
function pageEntry(page) {
  const date = page.date ? ` (${page.date})` : '';
  return `- [${page.title}](${SITE_URL}${page.route})${date}${
    page.description ? `: ${page.description}` : ''
  }`;
}

/** A page's text, prefixed with where it came from and what it may be used for. */
function pageBody(page) {
  return [
    `URL: ${SITE_URL}${page.route}`,
    `Source: ${RAW_URL}/${page.sourceRel}`,
    '',
    page.text,
  ].join('\n');
}

function approxKb(text) {
  return `${Math.max(1, Math.round(Buffer.byteLength(text, 'utf8') / 1024))} KB`;
}

function buildIndex({pages}, sections, sizes) {
  const lines = [
    '# Carbon Voice Help',
    '',
    `> ${SUMMARY}`,
    '',
    'Four ways to read this documentation, coarsest last. Prefer the smallest one that',
    'covers your question — the complete file is large enough that many fetch tools',
    'truncate it silently.',
    '',
    `- One page: append \`.md\` to any page URL below, e.g. ${SITE_URL}/workspaces/create-a-workspace.md`,
    '- One section: the `.txt` bundle listed under each heading below',
    `- Every help article: ${SITE_URL}/llms-full.txt (${sizes.full}, ${pages.length} pages).`,
    "  The What's New announcements are not in it — they are dated rather than evergreen,",
    `  and have a bundle of their own at ${SITE_URL}/llms/whats-new.txt`,
    `- Canonical Markdown, with history: ${REPO_URL}`,
    '',
  ];

  for (const section of sections) {
    lines.push(`## ${section.label}`, '');
    if (section.description) {
      lines.push(section.description, '');
    }
    lines.push(
      `Whole section: ${SITE_URL}/llms/${section.slug}.txt (${sizes.sections.get(section.slug)}, ${
        section.pages.length
      } ${section.pages.length === 1 ? 'page' : 'pages'})`,
      '',
    );
    for (const page of section.pages) {
      lines.push(pageEntry(page));
    }
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

/** One section, whole: every page in it, in sidebar order. */
function buildSection(section, {pages}) {
  const parts = [
    `# Carbon Voice Help — ${section.label}`,
    '',
    `> ${section.description || SUMMARY}`,
    '',
    `Site: ${SITE_URL}`,
    `Index of every section: ${SITE_URL}/llms.txt`,
    `Complete documentation: ${SITE_URL}/llms-full.txt (all ${pages.length} pages)`,
    'License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)',
    '',
    `This file is the ${section.label} section of the Carbon Voice help center: ${
      section.pages.length
    } ${section.pages.length === 1 ? 'page' : 'pages'}, ${section.order}.`,
    'Each page is also available on its own — append `.md` to its URL.',
    '',
  ];

  for (const page of section.pages) {
    parts.push('---', '', pageBody(page), '');
  }

  return `${parts.join('\n').trimEnd()}\n`;
}

/** One page, as the Markdown twin served at its own URL plus `.md`. */
function buildPage(page) {
  return `${pageBody(page)}\n`;
}

function buildFull({pages}, sections) {
  const parts = [
    '# Carbon Voice Help — full documentation',
    '',
    `> ${SUMMARY}`,
    '',
    `Site: ${SITE_URL}`,
    `Source: ${REPO_URL}`,
    'License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)',
    '',
    `This file holds all ${pages.length} pages, in the same order as the site navigation.`,
    'It is around 200 KB, which is more than some fetch tools will return in one request.',
    'If your copy ends mid-page, nothing here is missing from the site — read the smaller',
    'files instead, each of which is a complete document on its own:',
    '',
    `  Index of every page:  ${SITE_URL}/llms.txt`,
    '  One section:          ' +
      sections.map((section) => `${SITE_URL}/llms/${section.slug}.txt`).join('\n                        '),
    '  One page:             any page URL with `.md` appended',
    '',
  ];

  for (const page of pages) {
    parts.push('---', '', pageBody(page), '');
  }

  return `${parts.join('\n').trimEnd()}\n`;
}

const collected = await collect();
const {pages} = collected;
const announcements = await collectAnnouncements();

// Every page that gets a Markdown twin: the help articles and the announcements
// alike. llms-full.txt is deliberately not one of these — see
// collectAnnouncements() for why the announcements stay out of it.
const twinned = [...pages, ...announcements];

// Resolve links only once every route is known, then reuse the cleaned text for
// every output: the per-page twins, the section bundles and the complete file all
// carry identical prose, so an agent that switches between them sees no drift.
// Keyed by path from the repository root, so a link out of whats-new/ and a link
// out of docs/ cannot resolve to each other by accident.
const routeBySource = new Map(twinned.map((page) => [page.sourceRel, page.route]));
for (const page of twinned) {
  page.text = absolutizeLinks(cleanForAgents(page.body), page, routeBySource);
}

const sections = [
  ...sectionsOf(collected),
  {
    slug: 'whats-new',
    label: "What's New",
    description:
      'Product updates and announcements, newest first. These are dated and superseded ' +
      'over time, unlike the help articles above — check the date before relying on one.',
    order: 'newest first',
    pages: announcements,
  },
];

await fs.mkdir(OUT_DIR, {recursive: true});
await fs.mkdir(path.join(OUT_DIR, 'llms'), {recursive: true});

// Section bundles first: llms.txt quotes their sizes.
const sizes = {sections: new Map(), full: ''};
for (const section of sections) {
  const text = buildSection(section, collected);
  sizes.sections.set(section.slug, approxKb(text));
  await fs.writeFile(path.join(OUT_DIR, 'llms', `${section.slug}.txt`), text, 'utf8');
}

const full = buildFull(collected, sections);
sizes.full = approxKb(full);
await fs.writeFile(path.join(OUT_DIR, 'llms-full.txt'), full, 'utf8');
await fs.writeFile(path.join(OUT_DIR, 'llms.txt'), buildIndex(collected, sections, sizes), 'utf8');

// Per-page twins, each at the page's own route plus `.md`.
for (const page of twinned) {
  const target = path.join(OUT_DIR, markdownRoute(page.route).replace(/^\//, ''));
  await fs.mkdir(path.dirname(target), {recursive: true});
  await fs.writeFile(target, buildPage(page), 'utf8');
}

console.log(
  `Generated llms.txt, llms-full.txt (${sizes.full}), ${sections.length} section bundles ` +
    `and ${twinned.length} per-page .md files from ${pages.length} pages ` +
    `and ${announcements.length} announcements.`,
);
