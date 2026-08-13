---
title: Connecting Claude
description: Connect your Carbon Voice conversations and voice memos to Claude using the MCP server.
sidebar_position: 2
---

# Connecting Claude

You can connect your Carbon Voice account to Claude in a few clicks, with no technical
setup. You'll need to be logged into your Carbon Voice account in your browser to
complete the connection.

## Remote connection

1. Open Claude in your browser and go to **Settings → Connectors**.
2. Click **Add custom connector**.
3. In the pop-up:
   - **Name** — `Carbon Voice`
   - **Remote MCP server URL** — `https://mcp.carbonvoice.app`
4. Click **Add**.
5. Click **Connect** next to the Carbon Voice connector.
6. Log into your Carbon Voice account when prompted. This links Claude to your messages
   and conversations.

![Claude Settings Connectors panel](/img/integrations/claude-connectors.webp)

## Local installation

If you'd rather run the MCP server locally with API key authentication, you'll need:

- **A Carbon Voice API key.** Request one from
  [devsupport@phononx.com](mailto:devsupport@phononx.com) with the subject "Request API
  key for MCP Server".
- **npx**, which comes bundled with Node.js 14.8.0 or later. Check with
  `npx --version`, and install Node from [nodejs.org](https://nodejs.org/) if needed.

Then:

1. Open your Claude Desktop configuration file:
   - **macOS** — `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows** — `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the Carbon Voice MCP server under `mcpServers`, using the `npx` command with the
   `@carbonvoice/cv-mcp-server` package and your API key in the
   `CARBON_VOICE_API_KEY` environment variable.
3. Save the file and restart Claude Desktop.

The exact configuration snippet and other connection methods are in the
[cv-mcp-server repository](https://github.com/PhononX/cv-mcp-server).

## Related

- [MCP tips and tricks](tips-and-tricks.md)
- [Learn more about Carbon Voice MCP](https://www.getcarbon.app/mcp)
