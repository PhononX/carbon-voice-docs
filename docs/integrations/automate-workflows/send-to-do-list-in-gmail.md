---
title: Send your to-do list in Gmail
description: Speak your follow-ups, run the To-do List AI action, and email the finished list to yourself.
sidebar_position: 7
---

# Send your to-do list in Gmail

Speak your follow-ups on the way out of a meeting and the finished list is in your inbox
by the time you sit down.

## How you use it

1. Record a voice memo or message in Carbon Voice with your to-do list.
2. Open **message details** and run the **To-do List** AI action.
3. Zapier emails the list to you.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/gmail/255562720/send-emails-in-gmail-when-new-ai-system-to-do-list-prompts-get-responses-in-carbon-voice),
or build it with the steps below. Step 2 only improves the formatting — skip it if
you're on a free Zapier plan.

![The finished three-step Zap: Carbon Voice, Formatter, then Gmail](/img/integrations/automate-workflows/gmail-todo-zap-overview.webp)

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — To-do List

![The Carbon Voice trigger in Zapier, with System Prompt ID set to To-do List](/img/integrations/automate-workflows/gmail-todo-trigger.webp)

### Step 2 — Format the date

Used in the subject line, so each email is identifiable at a glance.

**Setup**

- **App** — Formatter by Zapier
- **Action event** — Date/Time

**Configure**

- **Transform** — Format
- **Input** — the **Messages Message Created At** field from step 1
- **To Format** — `MMM DD YYYY` (Jan 22 2006)

![Formatter by Zapier formatting the message's created-at date](/img/integrations/automate-workflows/gmail-todo-format-date.webp)

### Step 3 — Send the email

**Setup**

- **App** — Gmail
- **Action event** — Send Email

**Configure**

- **To** — your own email address
- **From** — select an email address
- **Subject** — `TO DOs:` followed by the **Output** field from step 2
- **Body type** — HTML
- **Body** — the **Ai Responses Responses Html** field from step 1, then the line below

```html
<br><b>Message Link: </b> <"Messages Message Link:" from Step 1>
```

![Gmail's Send Email step, with the to-do list HTML as the body](/img/integrations/automate-workflows/gmail-todo-send-email.webp)

## Variations

- **Want real tasks rather than an email?** See
  [Todoist](add-to-do-list-to-todoist.md) or [Things](add-to-do-list-to-things.md).
- **Want a different trigger** — a label, or posting into a particular conversation? See
  [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
