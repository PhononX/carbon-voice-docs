---
title: "New in MCP: action items, shareable voice memos, and smarter search"
description: A batch of new Carbon Voice MCP capabilities, including pulling action items out of conversations, creating a shareable voice memo in your own voice, forwarding messages, summarizing whole conversations, and better search.
date: 2026-09-14
authors: [carbonvoice]
tags: [release, integrations, mcp, ai]
---

# New in MCP: action items, shareable voice memos, and smarter search

We've updated the Carbon Voice MCP server with a big batch of new capabilities, which
means you can use Claude and ChatGPT to do more with Carbon Voice than ever before.

If you've already connected Carbon Voice to Claude or ChatGPT, the new capabilities are
there automatically, with nothing to install or update. If you haven't connected yet,
follow the setup instructions for [Claude](/ai-assistants/claude) or
[ChatGPT](/ai-assistants/chatgpt), and you'll have all of it from the start.

<!-- truncate -->

Here's what's new.

## ✅ Turn conversations into to-dos, automatically

Claude can now pull action items straight out of your voice memos and conversations, and
manage them. They're the same [action items](/meeting-notes/action-items) you see in
**Notebook → Action Items**, so anything your assistant creates or checks off is there in
the app too.

Try:

- *"What action items came out of my last team huddle?"*
- *"Pull the to-dos from that voice memo and add them to my list."*
- *"What's still open on my plate this week?"*
- *"Mark the budget review action item as done."*

## 🎙️ Turn any text into a voice memo, in your own voice

If you've [cloned your voice](/voice-and-language/voice-cloning) in Carbon Voice, Claude
and ChatGPT can generate a voice memo from written text and hand you a link to send, so
you can fire off a personal-sounding message without recording anything.

Try:

- *"Create a Carbon Voice memo that says 'Running 10 minutes late, see you soon!' and give
  me a link I can share."*
- *"Turn this paragraph into a voice memo in my voice and share it with the sales team."*

## 🔗 Share a message with one line

Generate a shareable link to any voice memo or message: public, restricted to specific
people, or forwarded into another conversation.

Try:

- *"Create a shareable link to this voice memo."*
- *"Forward this message to the Marketing conversation."*
- *"Share this update with just Sarah and the design team."*

## 📝 Get the gist without listening to everything

Claude can summarize a whole conversation, not just one message.

Try:

- *"Summarize what I missed in the Product conversation today."*
- *"Give me the TL;DR of this thread."*
- *"What's the overall takeaway from this week's standups?"*

## 🔍 Find messages faster

New search covers listened and unlistened status, mentions, and labels, not just
keywords.

Try:

- *"Show me messages I haven't listened to yet."*
- *"Find anything where I was mentioned this week."*
- *"Pull up everything tagged 'urgent' in the last few days."*

## The tools behind it

If you like knowing what your assistant is actually calling, this is what it now has to
work with.

**Action items**

- `suggest_action_items_from_message`: pull the action items out of one message.
- `suggest_action_items_from_messages`: do the same across several messages at once,
  catching commitments that span more than one.
- `list_my_action_items`: everything assigned to you, plus what you created and haven't
  assigned.
- `list_action_items`: the items in one conversation or folder.
- `get_action_item`, `create_action_item`, `update_action_item`, `delete_action_item`.
- `set_action_item_status`: move an item between suggested, to-do, and done.

**Voice memos from text**

- `create_voicememo_message`: create a voice memo from text, spoken in your
  text-to-speech or cloned voice, or from an audio file.

**Sharing and forwarding**

- `create_message_share_link`: a public link, one restricted to specific people or a
  workspace, or a forward onto another message.
- `get_message_share_link`: look up a link you already created.

**Summaries**

- `summarize_conversation`: run a summary AI Action over a conversation's recent
  messages.

**Search and inbox**

- `search_message_ids`: filter by mention, label, sender, conversation, or whether you
  were notified.
- `search_messages_by_heard_status`: listened or unlistened, with unheard counts per
  conversation.
- `list_inbox_notifications`: your mentions, invites, and workspace activity.

For getting better answers out of any of it,
[MCP tips and tricks](/ai-assistants/tips-and-tricks) covers how to point an assistant at
the right person, conversation, or message.

---

Questions go to **Profile Menu → Help → Support**, and feedback to **Profile Menu → Help →
Feedback**.
