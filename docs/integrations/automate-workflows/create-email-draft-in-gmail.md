---
title: Create an email draft in Gmail
description: Speak what you want to say, run the Professional Email AI action, and find the draft waiting in Gmail.
sidebar_position: 2
---

# Create an email draft in Gmail

Say roughly what the email needs to cover, and a written draft — subject line and body —
is sitting in your Gmail drafts when you get back to your desk.

## How you use it

1. Record a voice memo or message in Carbon Voice describing what you want in the email.
2. Open **message details** and run the **Professional Email** AI action.
3. Zapier creates the draft in Gmail.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/gmail/255560626/create-drafts-in-gmail-when-new-ai-responses-are-generated-in-carbon-voice)
and Zapier fills in both steps for you. To build it by hand, use the two steps below.

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Professional Email

![The Carbon Voice trigger in Zapier, with System Prompt ID set to Professional Email](/img/integrations/automate-workflows/gmail-email-trigger.webp)

### Step 2 — Create the draft in Gmail

**Setup**

- **App** — Gmail
- **Action event** — Create Draft

**Configure**

- **Subject** — the **Ai Responses Responses Json Subject** field from step 1
- **Body type** — Plain
- **Body** — the **Ai Responses Responses Json Content** field from step 1

![Gmail's Create Draft step, with Subject and Body mapped to fields from the AI response](/img/integrations/automate-workflows/gmail-email-create-draft.webp)

That's the whole workflow: two steps, so it runs on a free Zapier plan.

## Variations

- **Want the draft in a document instead?** See
  [Add an email draft to a Google Doc](add-email-draft-to-google-doc.md).
- **Want a different trigger** — a label, or posting into a particular conversation? See
  [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
- [Transform voice memos and messages with AI](../../ai/transform-with-ai-actions.md)
