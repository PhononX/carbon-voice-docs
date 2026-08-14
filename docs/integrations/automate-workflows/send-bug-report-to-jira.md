---
title: Send a bug report to Jira
description: Describe a bug out loud, run the Bug Report AI action, and have the issue filed in Jira with steps to reproduce.
sidebar_position: 10
---

# Send a bug report to Jira

Describe a bug while you're still looking at it. The **Bug Report** AI action turns what
you said into steps to reproduce, actual result and expected result, and Zapier files it
as a Jira issue.

## How you use it

1. Record a voice memo or message in Carbon Voice describing the bug.
2. Open **message details** and run the **Bug Report** AI action.
3. Zapier files the issue in Jira.

## Build the Zap

[Get the Zap template](https://zapier.com/app/editor/template/255560581), or build it
with the steps below.

Steps 1 and 2 are the workflow. Steps 3 to 7 attach the Jira link back to the original
Carbon Voice message, which needs a paid Zapier plan — see
[Link the issue back to the message](#link-the-issue-back-to-the-message).

![The finished Zap: the trigger, Jira, then a path split that links the issue back](/img/integrations/automate-workflows/jira-zap-overview.webp)

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Bug Report

![The Carbon Voice trigger in Zapier, with System Prompt ID set to Bug Report](/img/integrations/automate-workflows/jira-trigger.webp)

### Step 2 — Create the issue in Jira

**Setup**

- **App** — Jira Software Cloud
- **Event** — Create Issue

**Configure**

- **Project** — the project you want bugs filed in
- **Issue Type** — Bug
- **Reporter** — usually yourself
- **Environment** — the **Ai Response Responses Json Environment** field from step 1
- **Summary** — `DRAFT:` followed by the **Ai Response Responses Json Summary** field
  from step 1
- **Description** — paste the block below, replacing each `<FIELD>` with the matching
  output from step 1

```text
Steps to Reproduce: <"Ai Response Responses Json Steps to Reproduce" from Step 1>

Actual Result: <"Ai Response Responses Json Actual Results" from Step 1>

Expected Result: <"Ai Response Responses Json Expected Results" from Step 1>

Link to original message: <"Messages Message Link" from Step 1>

DONE BY CARBON VOICE
```

![Jira's Create Issue step, with the project, issue type and assignee set](/img/integrations/automate-workflows/jira-create-issue.webp)

![The rest of the same form: the description, environment, reporter and summary](/img/integrations/automate-workflows/jira-create-issue-fields.webp)

Stop here and the workflow is complete — and short enough to run on a free Zapier plan.

## Link the issue back to the message

These steps need a paid Zapier plan. They put the Jira link on the Carbon Voice message
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

![Path A's custom rule: continue only when the message type contains voicememo](/img/integrations/automate-workflows/jira-path-a-conditions.webp)

### Step 5 — Path A: attach the Jira link to the voice memo

**Setup**

- **App** — Carbon Voice
- **Action event** — Add Link Attachments to Message

**Configure**

- **Link Attachment URL** — the **Issue Url** field from step 2
- **Message ID** — the **Messages Message ID** field from step 1

![Carbon Voice's Add Link Attachments to Message step, with the Jira issue URL](/img/integrations/automate-workflows/jira-path-a-attach-link.webp)

### Step 6 — Fallback path conditions

- **Choose the type of rules to use for this path branch** — Fallback

![The fallback branch, which runs when Path A's rule doesn't match](/img/integrations/automate-workflows/jira-fallback-conditions.webp)

### Step 7 — Fallback: forward the message with the link attached

**Setup**

- **App** — Carbon Voice
- **Action event** — Send Message to Conversation

**Configure**

- **Conversation** — the **Messages Conversation ID** field from step 1
- **Type** — Forward
- **Message ID** — the **Messages Message ID** field from step 1
- **Message Text** — `Bug created in Jira from Carbon Voice + Zapier`
- **Link Attachment URL** — the **Issue Url** field from step 2

![Carbon Voice's Send Message to Conversation step, forwarding the message with the issue link](/img/integrations/automate-workflows/jira-fallback-forward.webp)

## Variations

- **Using Asana instead?** See [Send a bug report to Asana](send-bug-report-to-asana.md).
- **Want a different trigger** — a **Bug Report** label, or posting into a particular
  conversation? See [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
- [Playlists and labels](../../conversations/your-conversation-list/playlists-and-labels.md)
