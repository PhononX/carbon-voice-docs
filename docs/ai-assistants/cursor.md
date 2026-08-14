---
title: Connecting Cursor
description: Connect Carbon Voice to Cursor so it can work with your conversations and voice memos.
sidebar_position: 4
---

# Connecting Cursor

## Remote connection

1. Open Cursor.
2. Go to **Cursor Settings → Features → Model Context Protocol**.
3. Add a new MCP server entry named `Carbon Voice`, pointing at the URL
   `https://mcp.carbonvoice.app`.
4. Save and restart Cursor.

The first time you use it, Cursor walks you through OAuth2 authentication.

## Local installation

Only needed if you specifically want to run the MCP server locally. The remote server is
the preferred route.

You'll need a **Carbon Voice API key** from
[developer.carbonvoice.app](https://developer.carbonvoice.app), and **npx**, which comes
with Node.js 14.8.0 or later. Check with `npx --version`.

Then add an MCP server entry in the same settings screen that runs
`@carbonvoice/cv-mcp-server` through `npx`, with your API key set as the
`CARBON_VOICE_API_KEY` environment variable, and restart Cursor.

The exact configuration snippet is in the
[cv-mcp-server repository](https://github.com/PhononX/cv-mcp-server).

## Related

- [MCP tips and tricks](tips-and-tricks.md)
- [Learn more about Carbon Voice MCP](https://www.getcarbon.app/mcp)
