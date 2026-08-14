---
title: Add an email draft to a Google Doc
description: Append every Professional Email AI result to a running Google Doc, dated and linked back to the original message.
sidebar_position: 3
---

# Add an email draft to a Google Doc

Each email draft you generate is appended to a document you choose, with the date it was
recorded and a link back to the message it came from. Useful when you want drafts
collected somewhere you can edit or hand over, rather than scattered through Gmail.

## How you use it

1. Record a voice memo or message in Carbon Voice describing what you want in the email.
2. Open **message details** and run the **Professional Email** AI action.
3. Zapier appends the draft to your Google Doc.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/google-docs/255560622/append-email-drafts-to-google-docs-when-new-ai-responses-are-generated-in-carbon-voice),
or build it with the steps below. Steps 2 and 3 exist only to improve the formatting —
skip them if you're on a free Zapier plan.

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Professional Email

![The Carbon Voice trigger in Zapier, with System Prompt ID set to Professional Email](/img/integrations/automate-workflows/gdoc-email-trigger.webp)

### Step 2 — Format the date

Turns the message timestamp into something readable, for use in step 4.

**Setup**

- **App** — Formatter by Zapier
- **Action event** — Date/Time

**Configure**

- **Transform** — Format
- **Input** — the **Messages Message Created At** field from step 1
- **To Format** — `MMM DD YYYY` (Jan 22 2006)

![Formatter by Zapier formatting the message's created-at date](/img/integrations/automate-workflows/gdoc-email-format-date.webp)

### Step 3 — Convert the draft to HTML

Google Docs handles HTML better than Markdown, so the body is converted before it's
appended.

**Setup**

- **App** — Formatter by Zapier
- **Action event** — Text

**Configure**

- **Transform** — Convert Markdown to HTML
- **Input** — the **Ai Responses Responses Markdown** field from step 1

![Formatter by Zapier converting the draft from Markdown to HTML](/img/integrations/automate-workflows/gdoc-email-format-text.webp)

### Step 4 — Append the draft to the document

**Setup**

- **App** — Google Docs
- **Action event** — Append Text to Document

**Configure**

- **Document Name** — the Google Doc you want your email drafts collected in
- **Text to Append** — paste the block below, replacing each `<FIELD>` with the matching
  output from the earlier steps

```html
<hr> <H2>EMAIL DRAFT:
<"Output:" from Step 2 Format Date>
</h2>

<"Output:" from Step 3 Format Text>

<br>Link to message:<"Messages
Message Link" from Step 1>
```

![Google Docs' Append Text to Document step, with the pasted HTML block](/img/integrations/automate-workflows/gdoc-email-append.webp)

## Variations

- **Want it in Gmail instead?** See
  [Create an email draft in Gmail](create-email-draft-in-gmail.md).
- **Want a different trigger** — a label, or posting into a particular conversation? See
  [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
- [Google Workspace](../google-workspace.md)
