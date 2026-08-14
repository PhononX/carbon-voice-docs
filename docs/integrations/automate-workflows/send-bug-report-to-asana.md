---
title: Send a bug report to Asana
description: Describe a bug out loud, run the Bug Report AI action, and have it created as a task in your Asana project.
sidebar_position: 11
---

# Send a bug report to Asana

Describe a bug while you're still looking at it. The **Bug Report** AI action turns what
you said into steps to reproduce, actual result and expected result, and Zapier creates
the task in Asana.

## How you use it

1. Record a voice memo or message in Carbon Voice describing the bug.
2. Open **message details** and run the **Bug Report** AI action.
3. Zapier creates the task in Asana.

## Build the Zap

[Get the Zap template](https://zapier.com/apps/carbon-voice/integrations/carbon-voice/1823797/create-bug-report-tasks-in-asana-when-ai-system-bug-report-prompts-get-responses-in-carbon-voice),
or build it with the steps below.

Steps 1 and 2 are the workflow. Steps 3 to 8 attach the Asana link back to the original
Carbon Voice message, which needs a paid Zapier plan — see
[Link the task back to the message](#link-the-task-back-to-the-message).

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Bug Report

### Step 2 — Create the task in Asana

**Setup**

- **App** — Asana
- **Event** — Create Task

**Configure**

- **Project** — the project you want bugs filed in
- **Name** — the **Ai Response Responses Json Summary** field from step 1
- **Assignee** — who should pick the bug up
- **Description** — paste the block below, replacing each `<FIELD>` with the matching
  output from step 1

```text
Steps to Reproduce: <"Ai Response Responses Json Steps to Reproduce" from Step 1>

Actual Result: <"Ai Response Responses Json Actual Results" from Step 1>

Expected Result: <"Ai Response Responses Json Expected Results" from Step 1>

Link to original message: <"Messages Message Link" from Step 1>

Created from Carbon Voice message sent by: <"Messages Creator Full Name" from Step 1>

DONE BY CARBON VOICE
```

Stop here and the workflow is complete — and short enough to run on a free Zapier plan.

## Link the task back to the message

These steps need a paid Zapier plan. They put the Asana link on the Carbon Voice message
the report came from, so the conversation shows which bugs were filed and nothing gets
lost.

You can only add attachments to your own voice memos and messages. So the workflow
branches: your own voice memos get the link attached directly, and anything else —
including a teammate's message you generated a report from — is forwarded back into the
conversation with the link attached.

### Step 3 — Add a path split

**Setup**

- **App** — Paths by Zapier

### Step 4 — Path A conditions: your own voice memos

- **Type of Rule** — Custom rules
- **Only continue if** — the **Messages Message Type** field from step 1 **(Text)
  Contains** `voicememo`

### Step 5 — Path A: attach the Asana link to the voice memo

**Setup**

- **App** — Carbon Voice
- **Action event** — Add Link Attachments to Message

**Configure**

- **Link Attachment URL** — the **Permalink Url** field from step 2
- **Message ID** — the **Messages Message ID** field from step 1

### Step 6 — Fallback path conditions

- **Choose the type of rules to use for this path branch** — Fallback

### Step 7 — Fallback: forward the message back to the conversation

**Setup**

- **App** — Carbon Voice
- **Action event** — Send Message to Conversation

**Configure**

- **Conversation** — the **Messages Conversation ID** field from step 1
- **Type** — Forward
- **Message ID** — the **Messages Message ID** field from step 1
- **Message Text** — `Bug created in Asana from Carbon Voice + Zapier`

### Step 8 — Add the Asana link to the forwarded message

**Setup**

- **App** — Carbon Voice
- **Action event** — Add Link Attachments to Message

**Configure**

- **Link Attachment URL** — the **Permalink Url** field from step 2
- **Message ID** — the **Messages Message ID** field from **step 7**, the forwarded
  message

## Variations

- **Using Jira instead?** See [Send a bug report to Jira](send-bug-report-to-jira.md).
- **Want a different trigger** — a **Bug Report** label, or posting into a particular
  conversation? See [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
- [Playlists and labels](../../conversations/your-conversation-list/playlists-and-labels.md)
