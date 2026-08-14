---
title: Automate workflows
description: Connect Carbon Voice to the tools you already use, so a voice memo can become a task, an email draft, or a CRM update.
sidebar_position: 1
---

# Automate workflows

Carbon Voice integrates with workflow automation platforms, so what you say can drive
what happens next in the tools you already use.

A voice memo can become a blog post draft in Google Docs, or a bug report logged in
Jira, without extra effort. Add a label, send a message, or choose an AI Magic output,
and the result flows into the tool where you need it.

## Why this works well with voice

Voice is a good way to capture ideas on the go, and creativity thrives when thoughts
don't have to be structured as you go. The hard part has always been turning wandering
thoughts into structured, actionable information.

Carbon Voice covers that path: capture on the go, automatic upload, transcription a tap
away, and AI that shapes what you said into an output suited to the task.

## Examples

- **File a bug report** — add a **Bug Report** label to a message and a Jira issue is
  created automatically.
- **Create emails** — post a message into a conversation named **Email Drafts** and a
  structured email lands in your Gmail drafts.
- **Draft blog posts** — post into a conversation named **Blog Posts** and a draft
  appears in Google Docs or Notion.
- **Update your CRM** — add a **CRM Update** label and a note is created in Salesforce
  or Pipedrive.

Speaking notes after a meeting can produce a to-do list in your task app; talking
through a customer conversation can update the CRM.

## Set up a workflow

Each guide below builds one workflow end to end, with a screenshot of every step. Find
the row whose [AI action](../../ai/transform-with-ai-actions.md) produces the content you
want and whose destination is the app you want it in. All of them run on Zapier.

| Workflow | AI action | Lands in | What you get |
|---|---|---|---|
| [Create an email draft in Gmail](create-email-draft-in-gmail.md) | Professional Email | Gmail | A draft waiting in Gmail, subject line and all |
| [Add an email draft to a Google Doc](add-email-draft-to-google-doc.md) | Professional Email | Google Docs | Each draft appended to a running document, dated and linked back |
| [Add a blog post to a Google Doc](add-blog-post-to-google-doc.md) | Blog Post | Google Docs | Title, summary, body, hashtags and pull quotes in a document you choose |
| [Send a blog post to Notion](send-blog-post-to-notion.md) | Blog Post | Notion | A new page per draft, under a parent page |
| [Send a blog post to yourself in Gmail](send-blog-post-in-gmail.md) | Blog Post | Gmail | The draft as an email you can forward or edit |
| [Send your to-do list in Gmail](send-to-do-list-in-gmail.md) | To-do List | Gmail | The whole list, emailed to you as one message |
| [Add tasks from a to-do list to Todoist](add-to-do-list-to-todoist.md) | To-do List | Todoist | One Todoist task per item |
| [Add tasks from a to-do list to Things](add-to-do-list-to-things.md) | To-do List | Things | One Things to-do per item |
| [Send a bug report to Jira](send-bug-report-to-jira.md) | Bug Report | Jira | Steps to reproduce, actual and expected results, filed as an issue |
| [Send a bug report to Asana](send-bug-report-to-asana.md) | Bug Report | Asana | The same report, as a task in your project |

## What every workflow has in common

All of these guides start the same way, and the parts they share are worth understanding
once:

- **The trigger is an AI result.** Zapier's **New AI Prompt Response Generated** trigger
  fires when an AI action finishes on one of your messages. **System Prompt ID** is what
  narrows it to a single action, so a Zap watching **Bug Report** ignores your email
  drafts.
- **The fields come from the trigger.** Each step maps values from step 1 — the response
  JSON, the message link, who sent it, when it was created. Field names are shown in
  each guide as they appear in Zapier.
- **Formatting is often a step of its own.** Google Docs handles HTML better than
  Markdown, and a task app needs one item at a time, which is why several guides pass
  the output through **Formatter by Zapier** or **Looping by Zapier** before it lands.

### Using a different trigger

An AI result isn't the only way to start. Carbon Voice also offers:

- **Label Added to Message** — press and hold a message, add a label, and the workflow
  runs. See [Playlists and labels](../../conversations/your-conversation-list/playlists-and-labels.md).
- **New Message Posted to Conversation** — anything posted into a chosen conversation
  runs the workflow.
- **New Voice Memo**, optionally filtered by folder.

To swap the trigger in any of these guides, replace step 1, then add Carbon Voice's
**Create AI Prompt Response** action as the new step 2 so the content still gets
generated. Everything after it maps to that step's fields instead of the trigger's.

### On a free Zapier account

A free Zapier plan runs two-step Zaps. Every guide here is built so the first two steps
are the useful ones — trigger, then the app you're sending to — and the later steps only
improve the formatting or link the result back to the original message. Stop after step
2 and the workflow still works.

## Other ways to connect

For a direct integration rather than an automation platform, there's an API. See
[Build with the Carbon Voice API](../build-with-the-api.md). Either way you'll need a
token: see [Integration credentials](../integration-credentials.md).

Running into trouble, or want a trigger, action or AI transformation that doesn't exist
yet? [Message support](https://cv.chat/support).

## Related

- [Zapier](../zapier.md)
- [Transform voice memos and messages with AI](../../ai/transform-with-ai-actions.md)
- [Playlists and labels](../../conversations/your-conversation-list/playlists-and-labels.md)
  — labels are what trigger many of these workflows.
