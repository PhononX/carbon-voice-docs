---
title: About this documentation
description: How the Carbon Voice help center is published, licensed, and read by machines.
sidebar_position: 99
sidebar_label: About this documentation
sidebar_class_name: navIcon navIcon--info
---

# About this documentation

This site is the canonical source of Carbon Voice documentation. It is published from
the [`PhononX/carbon-voice-docs`](https://github.com/PhononX/carbon-voice-docs)
repository under a [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/),
so you are free to quote, translate, and reuse it with attribution.

Every article is plain Markdown, so the whole help center is readable in the
repository without running anything, and the file layout under `docs/` matches the site's
URLs.

Found something wrong?
[Open an issue](https://github.com/PhononX/carbon-voice-docs/issues) and tell us which
page. A sentence is plenty.

## For AI agents

Machine-readable entry points to this documentation, smallest first. Prefer the
smallest one that covers the question — the complete file is large enough that many
fetch tools truncate it.

- **One page** — append `.md` to any page URL. This page is at
  [`/about.md`](pathname:///about.md), and it works for the
  [What's New](/whats-new) announcements too.
- **One section** — [`/llms/workspaces.txt`](pathname:///llms/workspaces.txt) and one
  per section besides, each listed in `llms.txt`.
- [`/llms.txt`](pathname:///llms.txt) — an index of every page with its description,
  and of the section bundles.
- [`/llms-full.txt`](pathname:///llms-full.txt) — every help article in one file,
  around 200 KB. The announcements are not in it: they are dated rather than
  evergreen, and adding them would push a file that some fetch tools already
  truncate further past the limit. They have their own bundle at
  [`/llms/whats-new.txt`](pathname:///llms/whats-new.txt).
- [`/sitemap.xml`](pathname:///sitemap.xml) — every canonical URL on this site.

All of these are regenerated from `docs/` on every build, so they never drift from the
pages above. Links inside them are absolute, so they can be followed from anywhere.

Every rendered page also names its Markdown twin in the `<head>`, as
`<link rel="alternate" type="text/markdown">`, so a crawler that arrives on a page
without having read this one can still find it.

One thing this site cannot offer: it is published on GitHub Pages, which serves static
files and cannot set response headers or vary a response by `Accept`. So there is no
`Link:` header advertising the twin, and no `Accept: text/markdown` content
negotiation — appending `.md` is how you ask for Markdown here.

Building against the Carbon Voice API is documented separately at
[developer.carbonvoice.app](https://developer.carbonvoice.app).
