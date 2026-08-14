---
title: Add tasks from a to-do list to Things
description: Speak your tasks, run the To-do List AI action, and get one Things to-do per item without typing.
sidebar_position: 9
---

# Add tasks from a to-do list to Things

Speak the tasks, run the **To-do List** AI action, and each item lands in Things as its
own to-do, with a link back to the recording it came from.

📺 [Watch the how-to video](https://www.youtube.com/watch?v=bW7xZpJDtA0&list=PLM_p2mhoTkcA0Zb-S1Mta0jdf0tHZ2mEF)

## How you use it

1. Record a voice memo or message in Carbon Voice with your to-do list.
2. Open **message details** and run the **To-do List** AI action.
3. Zapier creates one Things to-do per item.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/things/255563115/create-to-dos-in-things-when-new-to-do-ai-responses-are-generated-in-carbon-voice),
or build it with the steps below. It's the same Zap as the
[Todoist version](add-to-do-list-to-todoist.md) apart from the last step, so use that
guide's screenshots if you want to see each step configured.

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — To-do List

### Step 2 — Loop over the list items

The AI action returns the whole list at once. Looping splits it so the next step runs
once per item.

**Setup**

- **App** — Looping by Zapier
- **Action event** — Create Loop From Line Items

**Configure**

- **Values to Loop** — name the variable `Todoitem`, and set its value to the **Ai
  Response Response Json Todo List** field from step 1
- **Trim Whitespace** — true
- **Loop iteration counter start** — 1
- **Maximum number of Loop iterations** — 500

### Step 3 — Create the to-do

**Setup**

- **App** — Things
- **Action event** — Create To-Do

**Configure**

- **Project** — the project you want to-dos created in
- **Title** — the **Todoitem** field from step 2
- **Note** — `Created with Carbon Voice + Zapier.` followed by the **Message Link** field
  from step 1
- **Priority** — 1

## Variations

- **Using Todoist instead?** See [Add tasks from a to-do list to Todoist](add-to-do-list-to-todoist.md)
  — same shape, different last step.
- **Just want the list emailed to you?** See
  [Send your to-do list in Gmail](send-to-do-list-in-gmail.md).
- **Want a different trigger** — a label, or posting into a particular conversation? See
  [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
