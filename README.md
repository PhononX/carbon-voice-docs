# Carbon Voice Docs

The official help center for [Carbon Voice](https://getcarbon.app) — voice messaging for
your whole team, people and agents alike.

### 📖 Read the documentation at [help.carbonvoice.app](https://help.carbonvoice.app)

That's the friendly version, with navigation and search. This repository is where that
documentation is written and kept — public, so anyone can read the source, suggest a
fix, or reuse it.

## Found a mistake?

Both of these help, and neither needs permission:

- **Tell us.** [Open an issue](https://github.com/PhononX/carbon-voice-docs/issues)
  saying which page and what's wrong. A sentence is plenty.
- **Fix it yourself.** Find the page under [`docs/`](docs/) — the file layout matches
  the site's URLs — and edit the Markdown right here on GitHub. Describe the change,
  submit.

You do not need to know how any of the rest of this works to do either one.

## What's here

Every article is plain Markdown, so you can read the whole help center on GitHub
without running anything:

| Folder | What's in it |
| --- | --- |
| [`docs/conversations/`](docs/conversations/) | Creating conversations, organizing your list, who can take part |
| [`docs/messages/`](docs/messages/) | Recording, sending, listening, transcripts |
| [`docs/voice-memos/`](docs/voice-memos/) | Capturing, organizing, and sharing your own recordings |
| [`docs/meeting-notes/`](docs/meeting-notes/) | Replacing a meeting with an async discussion, then turning it into notes |
| [`docs/voice-and-language/`](docs/voice-and-language/) | Typed-message voice, voice cloning, talking across languages |
| [`docs/quick-capture/`](docs/quick-capture/) | Recording without opening the app: shortcuts, widgets, Siri, watch |
| [`docs/ai/`](docs/ai/) | Summaries, catch-up, AI Actions, custom prompts |
| [`docs/ai-chat/`](docs/ai-chat/) | Asking questions across everything you've stored |
| [`docs/ai-agents/`](docs/ai-agents/) | Giving an AI agent its own Carbon Voice account |
| [`docs/ai-assistants/`](docs/ai-assistants/) | Connecting Claude, ChatGPT, and other MCP clients |
| [`docs/workspaces/`](docs/workspaces/) | Setting up a workspace and managing access |
| [`docs/account-and-settings/`](docs/account-and-settings/) | Profile, notifications, devices, plan |
| [`docs/integrations/`](docs/integrations/) | Slack, Google Workspace, Zapier, Obsidian, the API |
| [`docs/troubleshooting/`](docs/troubleshooting/) | When something isn't working |

A handful of pages sit loose at the top of [`docs/`](docs/) rather than in a
section — the [home page](docs/index.md), [a tour of the app](docs/a-tour-of-the-app.md),
[desktop](docs/desktop.md), [search](docs/searching.md), [videos](docs/videos.md), and
[about this documentation](docs/about.md). Product announcements are dated, so they live
apart from the evergreen articles, in [`whats-new/`](whats-new/).

## Working on the docs

```bash
npm install
npm start     # preview at http://localhost:3000
```

Adding an article is one file: drop a `.md` into the right folder with a `title` and
`description`, and it appears in the navigation. No configuration to update.

[**CONTRIBUTING.md**](CONTRIBUTING.md) covers the rest — writing conventions, how
navigation is generated, how the site deploys, and the choices that make this
documentation readable by AI agents as well as people.

## License

Copyright (c) 2026 Phonon X, Inc.

This documentation is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — you are free to share and
adapt it, including commercially, as long as you give credit and indicate any changes.
See [LICENSE](LICENSE). Suggested attribution:

> "Carbon Voice Docs" by Phonon X, Inc., licensed under
> [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

The Carbon Voice and Phonon X names and logos are trademarks of Phonon X, Inc. and are
not covered by that license.

---

Carbon Voice is built by [Phonon X](https://phononx.com), a team betting that voice
plus AI is the future of how we work — where every conversation becomes insight,
action, and knowledge, right from your pocket.
