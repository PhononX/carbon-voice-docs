#!/usr/bin/env node
/**
 * Generates the agent-facing entry points to this documentation from the
 * canonical Markdown in docs/:
 *
 *   static/llms.txt       an index of every page, grouped by category
 *   static/llms-full.txt  the complete text of the documentation in one file
 *
 * Both are generated, never hand-edited, and are written into static/ so
 * Docusaurus copies them to the site root. `npm run build` runs this first.
 */

import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_DIR = path.join(ROOT, 'docs');
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

function buildIndex({pages, categories}) {
  const lines = [
    '# Carbon Voice Help',
    '',
    `> ${SUMMARY}`,
    '',
    'Every page below is also available as raw Markdown: replace the site origin with',
    `\`${RAW_URL}/docs\` and append \`.md\`. The complete text of this documentation in a`,
    `single file is at ${SITE_URL}/llms-full.txt.`,
    '',
  ];

  const root = pages.filter((p) => !p.categoryDir);
  if (root.length) {
    lines.push('## Overview', '');
    for (const page of root) {
      lines.push(`- [${page.title}](${SITE_URL}${page.route})${page.description ? `: ${page.description}` : ''}`);
    }
    lines.push('');
  }

  for (const [dirName, category] of [...categories.entries()].sort(
    (a, b) => a[1].position - b[1].position,
  )) {
    lines.push(`## ${category.label}`, '');
    if (category.description) {
      lines.push(category.description, '');
    }
    for (const page of pages.filter((p) => p.categoryDir === dirName)) {
      lines.push(`- [${page.title}](${SITE_URL}${page.route})${page.description ? `: ${page.description}` : ''}`);
    }
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function buildFull({pages}) {
  const parts = [
    '# Carbon Voice Help — full documentation',
    '',
    `> ${SUMMARY}`,
    '',
    `Site: ${SITE_URL}`,
    `Source: ${REPO_URL}`,
    'License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)',
    '',
    'This file is generated from the Markdown in docs/. Each section below is one page,',
    'in the same order as the site navigation.',
    '',
  ];

  for (const page of pages) {
    parts.push(
      '---',
      '',
      `URL: ${SITE_URL}${page.route}`,
      `Source: ${RAW_URL}/docs/${page.rel}`,
      '',
      page.body,
      '',
    );
  }

  return `${parts.join('\n').trimEnd()}\n`;
}

const collected = await collect();
await fs.mkdir(OUT_DIR, {recursive: true});
await fs.writeFile(path.join(OUT_DIR, 'llms.txt'), buildIndex(collected), 'utf8');
await fs.writeFile(path.join(OUT_DIR, 'llms-full.txt'), buildFull(collected), 'utf8');

console.log(
  `Generated static/llms.txt and static/llms-full.txt from ${collected.pages.length} pages.`,
);
