---
title: Slack
description: Send and catch up on Carbon Voice messages from Slack, and start async meetings and retros with a slash command.
sidebar_position: 3
---

# Slack

The Carbon Voice Slack app puts voice into the channels your team already sits in. People
who live in Carbon Voice can start conversations and share them into Slack; people who
rarely open it can listen and reply without leaving Slack at all.

That split is the point. A team rarely adopts a new tool all at once, and this lets the
people who haven't adopted it still take part.

## Installing it

1. Start from [the Slack app page](https://www.getcarbon.app/carbonvoice-for-slack).
2. Sign in to your Slack workspace.
3. Grant the Carbon Voice app its permissions.
4. Log in to your Carbon Voice account to link the two.

If the app is already installed in your workspace, type `/cv` or `/cv login` in any channel
to connect your own account to it.

## Slash commands

| Command | Does |
|---|---|
| `/cv new` | Record a new voice message |
| `/cv meeting` | Start an [async meeting](../meeting-notes/run-an-async-meeting.md) |
| `/cv retro` | Start a retro |
| `/cv login` | Link your Carbon Voice account |

## What you can do from Slack

- **Get notified** in Slack when there are new messages.
- **Listen and reply in one tap**, without opening Carbon Voice.
- **Preview a shared message** in the channel, and read or reply to it there.
- **Adjust permissions** on a message you've shared.
- **Link a conversation to a channel**, so messages and AI summaries post into Slack
  automatically as the discussion goes.

## Retros

`/cv retro` runs a retrospective the async way: everyone records their thoughts at the same
time rather than taking turns in a meeting, covering what went well, what didn't, and what
to change. AI then organizes the responses and posts the summary back into Slack for
discussion.

Because everyone answers at once instead of in sequence, a retro takes as long as the
longest single answer rather than the sum of everyone's.

## What comes back

Anything recorded through Slack behaves like any other Carbon Voice message. It's
transcribed, it can be summarized, and it can be turned into
[action items or a document](../meeting-notes/get-the-notes.md).

## Related

- [Automate workflows](automate-workflows.md)
- [Meeting Notes](../meeting-notes/index.md)
