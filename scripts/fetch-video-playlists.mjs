/**
 * Fills in video strips anywhere in docs/, from YouTube.
 *
 * Write a block wherever a strip belongs. Either a playlist:
 *
 *   <!-- videos: PLM_p2mhoTkcApu2QYJODXJK8w9-PUiCVh -->
 *   <!-- /videos -->
 *
 * or a hand-picked list, one video per line, with an optional title after a
 * pipe when YouTube's own is too long or too keyword-stuffed for a docs page:
 *
 *   <!-- videos:
 *   rk3YgSnx4vU | Recording and sharing a voice memo
 *   https://youtube.com/shorts/2o-fajim-wI | iPhone widgets
 *   -->
 *   <!-- /videos -->
 *
 * Then run `npm run fetch:videos`, which replaces everything between each pair
 * of markers and leaves the markers in place, so it is safe to re-run.
 *
 * Deliberately NOT part of `npm run build`: the build stays hermetic, so a
 * YouTube outage or a feed change can never break a deploy. What ships is the
 * generated Markdown and the downloaded thumbnails, both committed, both
 * visible in a diff.
 *
 * No API key anywhere. Playlists come from YouTube's RSS feed, single titles
 * from its oEmbed endpoint, and thumbnails from i.ytimg.com — copied into
 * static/img/videos/ rather than hotlinked, so reading a page makes no request
 * to YouTube until someone opens a video. A title given after a pipe skips the
 * oEmbed lookup entirely.
 *
 * The RSS feed returns at most 15 entries, so a longer playlist is truncated
 * and the script says so.
 */

import {existsSync} from 'node:fs';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {glob} from 'node:fs/promises';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'docs');
const THUMB_DIR = join(ROOT, 'static', 'img', 'videos');

const BLOCK = /<!--\s*videos:\s*([\s\S]*?)-->\s*[\s\S]*?<!--\s*\/videos\s*-->/g;
const XML_ENTITIES = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'"};

const decodeXml = (value) =>
  value.replace(/&(amp|lt|gt|quot|apos|#39);/g, (_, name) => XML_ENTITIES[name]);

const escapeHtml = (value) =>
  value.replace(
    /[&<>"]/g,
    (char) => `&${{'&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot'}[char]};`,
  );

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

/** A bare id, or any of the YouTube URL shapes people paste. */
function parseVideoId(token) {
  const url = token.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
  if (url) {
    return url[1];
  }
  return /^[\w-]{11}$/.test(token) ? token : null;
}

/** One `{id, title}` per line of a block's spec, or per playlist entry. */
async function resolveSpec(spec) {
  const lines = spec
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const playlist = lines.length === 1 && lines[0].match(/(?:list=)?(PL[\w-]{16,})/);
  if (playlist) {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist[1]}`,
    );
    if (!response.ok) {
      throw new Error(`${response.status} fetching playlist ${playlist[1]}`);
    }
    const xml = await response.text();
    const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) => ({
        id: entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1],
        title: decodeXml(entry.match(/<media:title>([^<]*)<\/media:title>/)?.[1] ?? ''),
      }))
      .filter((video) => video.id && video.title);
    if (videos.length === 0) {
      throw new Error(`Playlist ${playlist[1]} returned no videos`);
    }
    return {videos, truncated: videos.length === 15};
  }

  const videos = [];
  for (const line of lines) {
    const [reference, ...rest] = line.split('|');
    const id = parseVideoId(reference.trim());
    if (!id) {
      throw new Error(`Not a video id or URL: ${line}`);
    }
    const override = rest.join('|').trim();
    // An explicit title is also one fewer request.
    const title =
      override ||
      (await fetchJson(
        'https://www.youtube.com/oembed?format=json&url=' +
          encodeURIComponent(`https://www.youtube.com/watch?v=${id}`),
      )).title;
    videos.push({id, title});
  }
  return {videos, truncated: false};
}

/** Copies a thumbnail into static/, skipping anything already downloaded. */
async function fetchThumbnail(videoId) {
  const file = join(THUMB_DIR, `${videoId}.jpg`);
  if (existsSync(file)) {
    return false;
  }
  const response = await fetch(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
  if (!response.ok) {
    throw new Error(`${response.status} fetching thumbnail for ${videoId}`);
  }
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
  return true;
}

function renderStrip(videos) {
  const cards = videos
    .map(({id, title}) =>
      [
        `  <a class="videoStrip__item" href="https://www.youtube.com/watch?v=${id}"`,
        `     target="_blank" rel="noopener noreferrer">`,
        `    <img src="/img/videos/${id}.jpg" alt="" loading="lazy" width="320" height="180" />`,
        `    <span>${escapeHtml(title)}</span>`,
        `  </a>`,
      ].join('\n'),
    )
    .join('\n');
  return `<div class="videoStrip">\n${cards}\n</div>`;
}

async function main() {
  await mkdir(THUMB_DIR, {recursive: true});
  let blocks = 0;
  let downloaded = 0;
  const changed = [];
  const notes = [];

  for await (const path of glob(join(DOCS, '**/*.md'))) {
    const original = await readFile(path, 'utf8');
    if (!original.includes('<!-- videos:')) {
      continue;
    }

    let page = original;
    // Collected first, since replacements are awaited and String.replace is not.
    // Spliced back by index, and in reverse, so earlier offsets stay valid and
    // two blocks with identical specs cannot overwrite each other.
    const matches = [...original.matchAll(BLOCK)];
    for (const match of matches.reverse()) {
      const {videos, truncated} = await resolveSpec(match[1]);
      for (const video of videos) {
        if (await fetchThumbnail(video.id)) {
          downloaded += 1;
        }
      }
      const spec = match[1].trim().includes('\n') ? `\n${match[1].trim()}\n` : ` ${match[1].trim()} `;
      const replacement = `<!-- videos:${spec}-->\n\n${renderStrip(videos)}\n\n<!-- /videos -->`;
      page =
        page.slice(0, match.index) + replacement + page.slice(match.index + match[0].length);
      blocks += 1;
      notes.push(
        `${relative(ROOT, path)}: ${videos.length} video${videos.length === 1 ? '' : 's'}` +
          (truncated ? ' (feed limit — the playlist may hold more)' : ''),
      );
    }
    // Reversed back, so the report reads in document order.
    notes.reverse().forEach((note) => console.log(note));
    notes.length = 0;

    if (page !== original) {
      await writeFile(path, page);
      changed.push(relative(ROOT, path));
    }
  }

  console.log(
    `\n${blocks} block${blocks === 1 ? '' : 's'} across ${changed.length} file${
      changed.length === 1 ? '' : 's'
    }; ${downloaded} new thumbnail${downloaded === 1 ? '' : 's'}.`,
  );
}

await main();
