---
title: About this documentation
description: How the Carbon Voice help center is published, licensed, and read by machines.
sidebar_position: 99
sidebar_label: About this documentation
---

# About this documentation

This site is the canonical source of Carbon Voice documentation. It is published from
the [`PhononX/carbon-voice-docs`](https://github.com/PhononX/carbon-voice-docs)
repository under a [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/),
so you are free to quote, translate, and reuse it with attribution.

Every article is plain Markdown, so the whole help center is readable in the
repository without running anything — the file layout under `docs/` matches the site's
URLs.

Found something wrong?
[Open an issue](https://github.com/PhononX/carbon-voice-docs/issues) and tell us which
page — a sentence is plenty.

## For AI agents

Machine-readable entry points to this documentation:

- [`/llms.txt`](pathname:///llms.txt) — an index of every page with its description.
- [`/llms-full.txt`](pathname:///llms-full.txt) — the full text in one file.
- [`/sitemap.xml`](pathname:///sitemap.xml) — every canonical URL on this site.

Both `llms.txt` files are regenerated from `docs/` on every build, so they never drift
from the pages above.

Building against the Carbon Voice API is documented separately at
[developer.carbonvoice.app](https://developer.carbonvoice.app).
