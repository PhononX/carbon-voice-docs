/**
 * Regenerates the video strips in docs/videos.md from YouTube.
 *
 * Run with `npm run fetch:videos`. Deliberately NOT part of `npm run build`:
 * the build stays hermetic, so a YouTube outage or a feed format change can
 * never break a deploy. What ships is the generated Markdown and the
 * downloaded thumbnails, both committed, both reviewable in a diff.
 *
 * Everything here is key-free. YouTube serves a per-playlist RSS feed at
 * /feeds/videos.xml?playlist_id=..., and thumbnails at a stable i.ytimg.com
 * path. Thumbnails are copied into static/img/videos/ rather than hotlinked,
 * so reading the page makes no request to YouTube until someone opens a video.
 *
 * The feed returns at most 15 entries. A longer playlist is truncated, and the
 * script says so — the "watch them all" link below each strip is the way to
 * the rest.
 */

import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = join(ROOT, 'docs', 'videos.md');
const THUMB_DIR = join(ROOT, 'static', 'img', 'videos');

/** Playlists rendered as a strip, keyed by the marker pair in docs/videos.md. */
const PLAYLISTS = [
  {marker: 'how-to', id: 'PLM_p2mhoTkcApu2QYJODXJK8w9-PUiCVh'},
  {marker: 'voice-ai', id: 'PLM_p2mhoTkcBCm-ZCVO_TjzBfg7kxnbQF'},
  {marker: 'zapier', id: 'PLM_p2mhoTkcA0Zb-S1Mta0jdf0tHZ2mEF'},
];

const XML_ENTITIES = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'"};

function decodeXml(value) {
  return value.replace(/&(amp|lt|gt|quot|apos|#39);/g, (_, name) => XML_ENTITIES[name]);
}

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (char) => `&${{'&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot'}[char]};`);
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.text();
}

/** Video id and title for each entry in a playlist's RSS feed, in feed order. */
async function fetchPlaylist(playlistId) {
  const xml = await fetchText(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`,
  );
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => ({
      id: entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1],
      title: decodeXml(entry.match(/<media:title>([^<]*)<\/media:title>/)?.[1] ?? ''),
    }))
    .filter((video) => video.id && video.title);
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
    .map(({id, title}) => {
      const safeTitle = escapeHtml(title);
      return [
        `  <a class="videoStrip__item" href="https://www.youtube.com/watch?v=${id}"`,
        `     target="_blank" rel="noopener noreferrer">`,
        `    <img src="/img/videos/${id}.jpg" alt="" loading="lazy" width="320" height="180" />`,
        `    <span>${safeTitle}</span>`,
        `  </a>`,
      ].join('\n');
    })
    .join('\n');
  return `<div class="videoStrip">\n${cards}\n</div>`;
}

async function main() {
  await mkdir(THUMB_DIR, {recursive: true});
  let page = await readFile(PAGE, 'utf8');
  const before = createHash('sha1').update(page).digest('hex');
  let downloaded = 0;

  for (const {marker, id} of PLAYLISTS) {
    const start = `<!-- playlist:${marker}:start -->`;
    const end = `<!-- playlist:${marker}:end -->`;
    if (!page.includes(start) || !page.includes(end)) {
      throw new Error(`docs/videos.md has no ${start} … ${end} block`);
    }

    const videos = await fetchPlaylist(id);
    if (videos.length === 0) {
      throw new Error(`Playlist ${id} returned no videos`);
    }
    for (const video of videos) {
      if (await fetchThumbnail(video.id)) {
        downloaded += 1;
      }
    }

    const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
    page = page.replace(pattern, `${start}\n\n${renderStrip(videos)}\n\n${end}`);
    console.log(
      `${marker}: ${videos.length} videos` +
        (videos.length === 15 ? ' (feed limit — the playlist may hold more)' : ''),
    );
  }

  await writeFile(PAGE, page);
  const changed = createHash('sha1').update(page).digest('hex') !== before;
  console.log(
    `${changed ? 'Updated' : 'No change to'} docs/videos.md; ` +
      `${downloaded} new thumbnail${downloaded === 1 ? '' : 's'} in static/img/videos/.`,
  );
}

await main();
