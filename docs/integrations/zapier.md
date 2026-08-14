---
title: Zapier
description: Trigger workflows in thousands of other apps by sending or labeling a message in Carbon Voice.
sidebar_position: 2
---

# Zapier

The [Carbon Voice Zapier integration](https://zapier.com/apps/carbon-voice/integrations#zap-template-list)
means that sending or labeling a message can kick off a workflow in any of the
thousands of apps Zapier connects to.

📺 [Watch: getting started with Zapier](https://www.loom.com/share/d6715b19aa634e40813cc3c2b44b5269)

## What people build with it

- **Create emails** — post into a conversation named **Email Drafts** and a structured
  email lands in your Gmail drafts.
- **Draft blog posts** — post into a conversation named **Blog Posts** and a draft
  appears in Google Docs or Notion.
- **File bug reports** — add a **Bug Report** label and a Jira issue is created.
- **Update your CRM** — add a **CRM Update** label and a note is created in Salesforce
  or Pipedrive.

## How Zapier works

Zapier is a no-code automation tool built around a simple shape: when a **trigger**
happens in one app, take an **action** in another.

Two things are worth knowing when building one:

- **Triggers start the workflow** — for example, a message being posted into a
  particular conversation in Carbon Voice.
- **Formatting matters.** Some destination apps handle text better in a particular
  form. Google Docs does better with text converted to HTML, while a to-do app usually
  prefers a looped JSON response.

## What can start a workflow

Carbon Voice offers four triggers:

- **A new message** posted in a conversation.
- **A new AI result**, so an AI action's output can go straight somewhere else.
- **A new label** on a message, which makes press-and-hold labelling a manual trigger you
  control. See [Playlists and labels](../conversations/your-conversation-list/playlists-and-labels.md).
- **A new voice memo**, optionally **filtered by folder** — so a memo recorded into "Email
  drafts" runs a different workflow from one recorded into "Blog post ideas".

A [custom AI prompt](../ai/custom-prompts.md) can be a trigger too: choose **User** as the
type and your own prompts appear in the list.

The current list of supported triggers and actions is on
[Zapier](https://zapier.com/apps/carbon-voice/integrations#triggers-and-actions).

## Setting one up

[Automate workflows](automate-workflows/index.md) has a step-by-step guide for each
workflow — email drafts into Gmail or Google Docs, blog posts into Google Docs or Notion,
to-do lists into Todoist or Things, bug reports into Jira or Asana. Most start from a Zap
template, and each lists the fields to map.

Running into trouble? [Message support](https://cv.chat/support). To request new
triggers, actions, or AI transformations, send [feedback](https://cv.chat/feedback).

## Other automation platforms

Carbon Voice works the same way with **n8n** and similar tools. Create a personal access
token, point the workflow at the API, and trigger on the same events. See
[Integration credentials](integration-credentials.md) for the token, and
[Build with the Carbon Voice API](build-with-the-api.md) for the endpoints.

## Related

- [Automate workflows](automate-workflows/index.md)
- [Playlists and labels](../conversations/your-conversation-list/playlists-and-labels.md)
