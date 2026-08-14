---
title: Add tasks from a to-do list to Todoist
description: Speak your tasks, run the To-do List AI action, and get one Todoist task per item without typing.
sidebar_position: 8
---

# Add tasks from a to-do list to Todoist

Typing out to-do lists is slow. Speak the tasks instead, run the **To-do List** AI
action, and each item becomes its own Todoist task — with a link back to the recording
it came from.

## How you use it

1. Record a voice memo or message in Carbon Voice with your to-do list.
2. Open **message details** and run the **To-do List** AI action.
3. Zapier creates one Todoist task per item.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/todoist/255565085/create-tasks-in-todoist-when-new-to-do-list-ai-prompt-responses-are-generated-on-carbon-voice),
or build it with the steps below.

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

### Step 3 — Create the task

**Setup**

- **App** — Todoist
- **Action event** — Create Task

**Configure**

- **Project** — the project you want tasks created in
- **Title** — the **Todoitem** field from step 2
- **Note** — `Created with Carbon Voice + Zapier.` followed by the **Message Link** field
  from step 1
- **Priority** — 1

## Variations

- **Using Things instead?** See [Add tasks from a to-do list to Things](add-to-do-list-to-things.md)
  — same shape, different last step.
- **Just want the list emailed to you?** See
  [Send your to-do list in Gmail](send-to-do-list-in-gmail.md).
- **Want a different trigger** — a label, or posting into a particular conversation? See
  [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
