# Documentation gap analysis

A comparison of the published help center (`docs/`, 94 pages) against the Carbon Voice
Flutter app as it stands on `develop`.

Two categories, as asked:

1. **[Accuracy gaps](#1-accuracy-gaps)** — pages that describe the app as it used to be.
2. **[Coverage gaps](#2-coverage-gaps)** — features that ship in the app with no help page.

A third section, **[Desktop](#3-desktop-the-whole-platform-is-undocumented)**, is really
part of both: the desktop layout is a different app shape, and the docs are written
entirely in mobile-touch language.

**Headline:** the help center describes a phone app. The app is now a five-platform
product (iOS, Android, macOS, Windows, web) with a three-panel desktop layout, a macOS
menu-bar companion with global hotkeys, AI agents, action items, and AI chat — none of
which appear in the docs. The `whats-new/` archive stops at **2025-08-05**, which is
roughly where the drift starts.

---

## 1. Accuracy gaps

### 1.1 The profile menu is in the wrong place on almost every page

Six pages send people to the bottom of the screen. On mobile the profile avatar is at the
**top left** of Home (`home_header_top_bar.dart` — avatar leading, search and audio-output
trailing). On desktop it is the **last item in the left navigation rail** (bottom left).

| Page | Says |
|---|---|
| `account-and-settings/claim-your-username.md` | "profile picture in the bottom navigation bar" |
| `account-and-settings/personal-carbonlink.md` | "profile icon at the bottom right of Home" |
| `account-and-settings/directory-services.md` | "profile icon at the bottom right of the navigation bar" |
| `account-and-settings/typed-message-voice.md` | "profile picture at the bottom right" |
| `account-and-settings/notification-settings.md` | "Profile Menu at the bottom of the Home screen" |
| `workspaces/adding-people.md` | "profile picture in the bottom right corner" |
| `messages/playback/clearing-notified-messages.md` | "profile image at the bottom left of Home" |
| `integrations/using-your-carbonlink.md` | "profile icon at the bottom right of Home" |

Only `account-and-settings/delete-your-account.md` gets it right ("bottom left on desktop,
top left on mobile") — and it's the one page that acknowledges desktop at all.

### 1.2 "Notified" is now called "Unread" in the UI

The app renamed the term. `english.dart` has `'notified': 'Unread'` and
`'notified_desc': 'Conversations with Unread messages'` — that's the filter chip users see.

The docs build a whole conceptual page on the old word:

- `messages/playback/notified-versus-unheard.md` — the entire page.
- `messages/playback/clearing-notified-messages.md`, `play-new-messages.md`,
  `distracted-mode.md`, `messages/read-receipts.md`, `conversations/access-and-sharing/conversation-history-settings.md`.

The underlying two-state model (attention flag vs. heard progress) is still real and worth
documenting — it's the vocabulary that has moved. Note the term survives in a few places
(`Notified Cleared` in engagement detail, "Automatically Clear Notifications…" in settings),
so the doc needs to explain both words rather than just search-and-replace.

### 1.3 The action labels for clearing/setting notifications have changed

| Doc says | App shows |
|---|---|
| "Clear Notifications" (conversation menu) | **"Mark all Read"** (`conversation_clear_notifications`) |
| "Set Notifications" (same menu, to add them back) | **Not present.** The conversation long-press menu has no re-notify action |
| "Clear Notification / Set Notification" (message menu) | **"Mark as Unread"** is the only equivalent |
| "Tap 'Clear Notify' underneath the message" | No such control found in the message card |

Affects `messages/playback/clearing-notified-messages.md` (most of the page) and
`notified-versus-unheard.md`.

### 1.4 The Notified playlist is no longer on Home

`getting-started/a-tour-of-the-app.md` opens with "Home has three main sections:
1. Playlists…", and `notified-versus-unheard.md` says "Use the **Notified playlist** on
Home" with a screenshot.

Home's pinned-card section now **explicitly filters the notified playlist out**
(`sliver_home_header.dart` and `home_pinned_cards.dart` both do
`.where((card) => card.playlist?.isNotifiedPlaylist != true)`, and hide the whole section
if nothing else is pinned). The playlist still exists and still drives the per-conversation
play buttons — it just isn't a card on Home any more.

Related: the label **"Play Notified"** (used in `distracted-mode.md`) is gone. The button
now renders a count plus "new" (`play_notify_floating_button.dart`).

### 1.5 The conversation AI controls are now one menu, not several icons

This is the biggest single change and it invalidates parts of four pages. The conversation
feed's app bar now has **one summarize icon** opening a menu
(`floating_conversation_appbar_menu.dart`):

- **Bulleted Summary** (toggle)
- **AI Only**
- **AI + Message**
- **AI Chat** (mobile only — desktop has a dedicated AI Chats button in the app bar)

| Page | Stale instruction |
|---|---|
| `ai/one-tap-summaries.md` | "tap the **AI** button in the upper right corner" |
| `ai/auto-bulleted-summaries.md` | "Tap the **bulleted summary icon** at the top right, next to the AI toggle" |
| `ai/catch-up-with-ai.md` | "Tap the **AI Magic icon** at the bottom right of the screen, next to the microphone" — the conversation bottom bar is now a text field + mic + play + label button |
| `messages/transcripts/expand-transcriptions.md` | "Tap the expanding arrows icon at the top of the conversation" — the expand/collapse-all control is not in the app bar; AI Only / AI + Message is how display mode is set now |

There is no "AI toggle" and no separate bulleted-summary icon to sit next to.

### 1.6 Message-card swipe actions do different things now

`message_card_swipe_actions_wrapper.dart`:

- **Swipe left → right:** short = **Reply**, held past threshold = **Voice reply**.
- **Swipe right → left:** short = **Info** (message info), held past threshold =
  **Listen Later** / **Remove Listen Later**.

`clearing-notified-messages.md` claims left-to-right clears the notification and
right-to-left is "swipe to reply". Both are wrong, and **Listen Later** — a real feature
with its own filter chip, its own in-conversation mode, and its own toolbar button — is
never mentioned anywhere in the docs.

(`read-receipts.md`, `attachments.md` and `personal-notes.md` describing right-to-left as
"open Message Info" are still correct for the short swipe.)

### 1.7 "Directory Services" has been renamed and moved

`account-and-settings/directory-services.md` and `troubleshooting/missing-conversations.md`
both route people to **Settings → Directory Services**. That entry does not exist in the
Settings screen. The feature is now **"Linked Emails & Phone Numbers"**, a top-level item in
the profile menu (`user_menu_screen.dart`, `linked_emails_phone_numbers`).

The name "Directory Services" survives only as a workspace marketing string and an icon name.

### 1.8 The Settings screen doesn't match

Actual contents of Settings (`settings_screen.dart`), in order:

Conversation History · Recording & Playback · **Global Voice - TTS & Translation** ·
Manage Labels *(feature-flagged)* · **Notification Settings** · **Appearance** ·
**Language** · **Keyboard Shortcuts** *(macOS only)* · Developer Menu *(staff only)*

Doc mismatches:

- `notification-settings.md` says "Settings → **Notifications**" — it's "Notification Settings".
- `ai/voice-cloning.md` says "select **Global Voice** or **Text to Speech**" — there's one
  entry, "Global Voice - TTS & Translation".
- **Appearance** (light / dark / system), **Language**, and **Recording & Playback** are
  settings screens with no documentation at all.
- No Directory Services entry (see 1.7).

### 1.9 Pre-recorded messages are now "saved voice memos"

`messages/recording-and-sending/pre-recorded-messages.md` says: "Go to **Profile Menu →
Pre-recorded messages** and tap the **+**", and "**More → Pre-recorded reply**".

- There is **no "Pre-recorded messages" entry in the profile menu** (verified against the
  full list in `user_menu_screen.dart`).
- The message menu item is **"Reply with saved voice memo"** (`message_card_dropdown_menu.dart`).
- The `prerecorded_messages` string still exists in the locale file but is not referenced by
  any live UI code.

The page needs re-anchoring on the saved-voice-memo vocabulary and a correct entry point.

### 1.10 Listen-only: the toggle is narrower than described

`listen-only-conversations.md` says "Toggle **Set as Listen-Only**" and describes it as a
conversation-wide mode. The actual setting in Conversation Settings is **"Default to
'Listen Only'"** — *"Default new members to 'Listen Only' role"*. Existing members keep their
role. The page's promise that toggling it off converts the conversation back needs
re-checking against that behaviour.

### 1.11 Conversation Settings has grown well past what's documented

Docs cover: who can join, share link, add people, Media/Links/Docs, listen-only.
Actual contents (`conversation_settings_main_content.dart` + top/bottom actions):

Share Link · Add People · Change Time *(async)* · Engagement · Search · **Action Items** ·
Media, Links, Docs · Workspace · Who can join · Default to Listen Only ·
**Show in Quick Sends** · **Reminders** · **Automations** · **Move conversation** ·
**Mute conversation** · Leave · Delete

Bolded items are undocumented. Note **Show in Quick Sends** is a second route to Quick Sends
that `conversations/your-conversation-list/quick-send.md` doesn't mention.

### 1.12 The conversation long-press menu doesn't match

Actual (`conversation_card.dart`): View conversation · Add/Remove to Quick Sends ·
Mark all Read *(only when unread > 0)* · Copy Conversation Link · Conversation Settings.

`press-and-hold-actions.md` is a stub with a screenshot and no list, so it isn't wrong so
much as empty — but pages that cite specific items from this menu (see 1.3) are wrong.

### 1.13 Business CarbonLink is marked "not ported" but ships

`account-and-settings/personal-carbonlink.md` carries
`> **Placeholder.** Business CarbonLink setup has not been ported yet.`

The app has a complete claim-business flow: `claim_business_carbon_link_screen.dart`,
business name and business logo steps, and a `business_carbonlinks` section. There's also a
**Business** conversation type and a Business tab. This is writable now.

### 1.14 Smaller wording drift

- `conversations/index.md`: "the **Chat tab**, on the far left of the navigation bar" — the
  tab is Conversations (`SemanticLabels.conversationsTab`); on desktop it is one of seven rail icons.
- `filtering.md` describes a generic filter button and a "+". The real chips are
  **Unread · Listen Later · Direct · Named · Async Meeting · Customer**, plus **More filters**.
- `create-a-named-conversation.md` step 1 says the "+" is in the "bottom right corner" — on
  Home it sits above the bottom nav; on desktop it's ⌘N or the create button in the sidebar.

---

## 2. Coverage gaps

Features that ship with no help page. Ordered roughly by how visible they are to a user.

### 2.1 AI Agents — no coverage at all

A first-class product surface: its own icon in the desktop navigation rail, its own entry in
the profile menu, and eleven screens (`lib/agents/presentation/screens/`): agents list, agent
details, agent settings, agent conversations, agent contacts, voice agent details, agent
webhook details, plus an **integration guide** and an **interactive setup guide** with typed
steps (personal access token, webhook URL, HTTP request, terminal command, config file).
Agents can also be assigned to speed-dial slots.

The docs mention agents only as an API concept in `integrations/build-with-the-api.md` and in
the site tagline ("people and agents alike").

### 2.2 Action Items — no coverage at all

AI extracts action items from conversations; users can create, edit, move, complete and share
them. Surfaces: **Notebook → Action Items**, per-conversation action items, an action-items
card in AI Chats, Conversation Settings → Action Items, and "AI found new action items" feed
banners. Full offline queueing ("Action item will be created when you're back online").

### 2.3 AI Chat — no coverage at all

Chat with AI over your conversations. Two entry points: **global** (bottom nav on mobile,
`Navigation.goToAiChatsScreen(isGlobal: true)`) and **per-conversation** (app-bar menu on
mobile, dedicated button on desktop). Includes **saved prompts**, a workspace target for
global chats, and derived conversations spawned from a chat.

The docs' AI section covers summaries, catch-up, AI actions, cloning and translation — but
not the chat surface, which is now the most prominent AI entry point in the app.

### 2.4 Async meetings — referenced four times, explained zero times

Async meeting is one of the three options behind the "+" button, and one of five conversation
types. It has: a deadline for replies, meeting started / about-to-end / ended / extended
states, engagement stats and reminders, AI summaries and action items, a kick-off screen,
async-meeting-specific notification settings, and its own retention rules.

`conversations/creating/types-of-conversations.md` documents two types (DM, named). The real
enum is `customerConversation, directMessage, namedConversation, asyncMeeting, voiceMemo` —
**Business/Customer** conversations are undocumented too.

### 2.5 Keyboard shortcuts, Speed Dial, and the macOS menu-bar app

`settings/presentation/screens/keyboard_shortcuts/` — a whole settings screen (macOS):

- **Record Voice Memo** — global hotkey, record and send from anywhere.
- **Quick Send** (Quick Draft) — send a message from anywhere.
- **Speed Dial Panel** — ⌥` opens a floating panel with 10 destination shortcuts.
- **Speed Dial Shortcuts** — 10 slots, each bound to a conversation, a voice-memo folder, or
  an **agent**, with a configurable base modifier.
- **Per-slot webhook actions** ("Configure Action") — see 2.6.
- Plus: voice-memo target workspace, auto-copy, and a link-prefix setting.

Supporting services confirm a native macOS companion: `menu_bar_channel.dart`,
`macos_hotkey_registry.dart`, `recording_panel_channel.dart`, `draft_panel_channel.dart`,
`quick_send_shortcuts_panel_channel.dart`. The in-app copy is explicit: *"Get the desktop app
for global shortcuts, hands-free recording, and instant playback — right from your menu bar."*

There is also a **hold-spacebar-to-record** handler (`space_hold_to_record_handler.dart`).

Zero documentation for any of this.

### 2.6 In-app Integrations, tokens, and automations

`Profile Menu → Integrations` — *"Manage access tokens, webhooks, and third-party
integrations"*:

- **Integration Credentials** — personal access tokens, created and revoked in-app.
- **Connected Apps** — OAuth apps you've authorized, with a disconnect flow.
- **Automations** — webhooks per conversation, listed by the conversation they belong to,
  with filters ("Notify on new messages posted in…"), plus Conversation Settings → Automations
  and the per-speed-dial webhook actions.

The docs' Integrations section covers Zapier, MCP and the developer portal, but treats
tokens/webhooks as developer-portal territory. They are now self-serve in the app.

### 2.7 Search

A full search feature (`lib/search/`): tabs for **Conversations · Messages · Voice Memos ·
Contacts**, and filters for conversation type (DM / Named / Async / Business), message type
(voice / text), attachments (with / without), labels, sender, and date. On desktop it's a
⌘K overlay.

`a-tour-of-the-app.md` gives it two sentences ("find the conversation or contact you want to
send a message to").

### 2.8 Appearance / dark mode

Light, dark and system themes (`Settings → Appearance`; a segmented control on desktop, a
picker sheet with previews on mobile). The whole theming layer (`CarbonColors`) exists to
support it. Not mentioned once.

### 2.9 Notebook

The docs reference "Notebook" in passing (labels, private notes) but never explain it. It's a
top-level tab on both platforms with six sections: **Voice Memos · Action Items · Contacts ·
AI Outputs · Labels · Notes**, plus pinned-section customization ("Pinned Notebook Tabs").
**AI Outputs** — the history of every AI result across the app, with a detail view — is
entirely undocumented.

### 2.10 Message actions that exist but aren't written up

From `message_card_dropdown_menu.dart`: **Reply privately** · **Tag people** (@mentions) ·
**Edit text message** · **Mark as Unread** · **Translate → pick a language** ·
AI actions inline (Summary / Bulleted Summary / More AI Magic) · **Copy message link**.

Also missing: **sending typed text messages** into a conversation at all. The bottom bar has a
text field ("Message", "Reply", "Ask a question"); the docs cover the *voice* of a typed
message (TTS) but never say you can type one.

### 2.11 Threads and discussion view

`discussion_view_screen.dart`, threaded replies, "reply in thread", discussion notes on the
recorder. The docs mention threads only in passing ("threaded groups played together", "view
the discussion thread" in the iOS notification page). No page explains threading.

### 2.12 Offline behaviour and the send queue

`lib/offline/`, `lib/pending_messages/`, a queue button on Home with a pending count, and
"…will be sent/created/updated when you're back online" strings throughout. Recording offline
and sending later is a genuine selling point with no page.

### 2.13 Conversation reminders

`lib/conversation_reminders/` and Conversation Settings → Reminders, plus a dedicated reminder
notification settings screen. Undocumented.

### 2.14 SMS notify / "let them know"

When someone is added by phone number they must opt in to SMS before they're notified. The app
surfaces *"@count person was not notified of this message"* and a **Notify via Text Message /
Notify via other app** flow. This is a real "why didn't they get my message?" support case
and it's only half-covered by `troubleshooting/missing-conversations.md` (which addresses the
recipient side, not the sender side).

### 2.15 Onboarding and the welcome checklist

A **Welcome Checklist** and **Advanced Checklist** on Home and in the profile menu, with ~30
tracked items, plus a gesture guide, an intro video, a keyboard-shortcuts education dialog and
a speed-dial setup step in onboarding. New users see this first and there's no page for it.

### 2.16 Smaller undocumented surfaces

- **Playlists** — creating a playlist, the playlist queue screen, and the desktop Playlists
  tab. `playlists-and-labels.md` covers labels but not playlist creation or playback.
- **Voice memo folders** — move, record-into-folder, folder-per-workspace, breadcrumbs.
  Partly covered in `organizing-voice-memos.md`; the desktop Files view isn't.
- **Contacts** — a top-level tab and a contacts directory; `enabling-phone-contacts.md` only
  covers the "people you know" prompt.
- **Workspace conversation moving** and joinable workspace conversations.
- **Data & Storage** settings, cache management, network status and the offline indicator.
- **Merge accounts**.
- **Unsplash image picker** for conversation and workspace images.
- **Attachment viewer** — PDF, video, markdown, HTML, text previews with a desktop overlay.
- **Retro meetings** (Slack-driven retro landing flow).
- **Engagement stats dialog** at conversation level (docs only cover per-message engagement).
- **Guest access** in workspace conversations.
- **App updates screen** and the in-app download prompts.

---

## 3. Desktop: the whole platform is undocumented

The app ships on macOS and Windows (`macos/`, `windows/` platform shells; a download page at
`getcarbon.app/download`), and the desktop layout is a genuinely different shape — not a wide
phone. Every "tap / swipe / press and hold" instruction in the help center is a mobile
instruction with no stated desktop equivalent.

**The layout** (`DESKTOP_MIGRATION.md`, `main_view_desktop.dart`): three panels at ≥1100px —
a fixed navigation rail, a primary sidebar (the tab's list), and a main content view. Below
1100px it falls back to the mobile layout.

**Navigation differs by platform:**

| | Mobile | Desktop |
|---|---|---|
| Destinations | Chats, Notebook, *record*, Inbox, AI Chats | Chats, Voice Memos, Playlists, Contacts, Notebook, Agents, Inbox |
| Profile | avatar, top left of Home | avatar, bottom of the left rail |
| Search | icon top right, or pull down | ⌘K overlay / top search bar |
| New conversation | "+" button on Home | ⌘N |

**Behaviours that change on desktop:**

- **Conversation settings** open as a **secondary sidebar** (and toggle closed on re-tap), not
  as a bottom sheet. Every doc that says "tap the conversation name to bring up the Settings
  menu" describes only half of it.
- **Bottom sheets don't exist on desktop** — they're popups (a hard team rule in
  `.claude/rules/ui.md`). Any doc step that says "sheet" or implies a drag handle is mobile-only.
- **Recording happens inline in the main content pane**, not in a full-screen recorder.
- **AI Chats** has a dedicated app-bar button instead of living in the summarize menu.
- **Keyboard shortcuts:** ⌘K search, ⌘N create, Space to pause/resume recording or play/pause,
  Enter to send a recording, Escape to dismiss (search → sidebar → player, chained), and
  ⌘⇧⌃← / → to move focus between panels. Arrow keys and Enter navigate within a focused panel.
- **Settings → Keyboard Shortcuts is macOS-only** and gates the whole global-hotkey/speed-dial
  feature set (2.5).

**Suggested minimum:** a "Carbon Voice on desktop" section — the layout, the navigation map,
the shortcut reference, and the menu-bar/global-hotkey story — plus a platform note on the
pages whose steps differ.

---

---

## 4. Proposed structure

Today's sidebar is organized by **app object** — Conversations, Messages, Voice Memos.
Everything shipped since 2025-08 is organized by two different axes: **who is doing the
work** (you, an AI, an agent) and **how fast you need to get to it**. Forcing that into the
object taxonomy is what's causing the pressure. Three new sections resolve it.

### 4.1 "AI" now means three different directions of travel

One section can't hold them, because a reader arrives wanting exactly one. Split by which
way the content is moving:

| Direction | Section | Holds |
|---|---|---|
| **AI works on your content, inside Carbon Voice** | AI | Summaries, catch-up, bulleted summaries, AI Chat, action items, AI actions, AI Outputs history |
| **Your AI tools reach into Carbon Voice** | AI assistants & MCP | Claude, ChatGPT, Cursor, Windsurf, Obsidian, tips — promoted out of Integrations |
| **AI lives in Carbon Voice as a participant** | Agents | Agent accounts, connecting a platform (Hermes, OpenClaw, Claude Code…), agents in conversations, agents on speed dial |

One note on the catalogue: **the agent platform list is server-driven** — the app fetches it
from a remote endpoint with per-platform setup steps
(`http_remote_agent_integration_data_source.dart`, `AgentIntegration` with `live` /
`comingSoon` status). Document the in-app "Pick your platform" flow; don't hard-code a list
that will drift.

### 4.2 File by the reader's question, not the technology underneath

The docs already get this right once, and the precedent should govern everything else.
**Transcription is as AI-powered as anything in the product — and it lives under Messages →
Transcripts.** Nobody filed it under AI, because the reader's question is "how do I read what
was said?", not "what can AI do?" That's the correct test, and it's already load-bearing.

Applying it consistently, the **AI** section should hold only the places where someone
*deliberately invokes* AI and gets something back. Everything else goes where the job lives.

| Feature | Reader's question | Home |
|---|---|---|
| Transcripts | "How do I read what was said?" | Messages *(already correct)* |
| TTS voice, premium engine, voice cloning | "How do I sound to people?" | **Voice & language** |
| Global Voice, auto-translate, language list | "How do we talk across languages?" | **Voice & language** |
| Summaries, catch-up, AI Chat, AI actions | "What can AI do with this?" | AI |
| Action items | Created by AI, but lived with as a to-do list | Notebook, with a pointer from AI |

**Voice & language earns its own top-level section, not a corner of AI or Settings.** Three
reasons. It's *set once and then invisible* — there's no invoke-and-receive moment, so filing
it beside summaries mismatches the whole experience, and it wrongly implies AI credits and a
button to press. Its content is currently **fragmented across three pages in two sections** —
`ai/voice-cloning.md`, `ai/auto-translation.md` and `account-and-settings/typed-message-voice.md`
— all describing one settings screen. And it **spans messages, voice memos and CarbonLink**
(a shared memo offers translation, and the reply comes back in the sender's voice), so it
can't sit inside Messages either.

The two halves stay in one section rather than splitting across Messages and Settings,
because they're coupled — your cloned voice is what speaks the translated message, and that
coupling is the selling point. If a new top-level entry is unwelcome, the fallback is a
"Voice & language" group under Messages; what shouldn't happen is leaving it under AI.

### 4.3 Meeting Notes — the workflow deserves a section, not a page

**It's a category people search by name.** "AI meeting notes" is the query; a section can own
it, a paragraph inside the AI section can't. **It gives homeless features a home.** Async
meetings, action items, AI Outputs history, engagement stats and reminders, whole-discussion
transcripts and retros are all undocumented and all fit here naturally — async meetings
especially, which have no good home today: "a conversation type with a reply deadline" is a
definition, not the reason anyone would run one. And **it states the differentiator in the nav
itself**: a note-taker records the meeting you had; this section is about the meeting not
happening.

**On the name:** use **"Meeting Notes"** in the sidebar and let the section index page carry
the AI framing in its `title` and `description`. Leading the nav with "AI Meeting Notes"
fights Otter, Granola and Fireflies on their terms, when the whole point is that you skipped
the part they're recording — but the frontmatter still needs to capture the query people
actually type. Docusaurus lets those differ; use that.

**Suggested contents** — a sequence, since the reader is following a workflow rather than
browsing features:

- **Why there's no meeting** — the concept. Async discussion instead of a scheduled call;
  everyone contributes, and it's transcribed as it happens.
- **Run an async meeting** — create it, set the reply deadline, kick-off, reminders,
  engagement stats, what happens when it ends. *Homed here, not under Conversations.*
- **Get the notes** — catch-up summary, whole-discussion transcript, multi-select → AI action.
- **Action items** — what AI extracted, and working through them.
- **Share the notes** — AI Outputs, export, forward into another conversation, or push to
  Notion / Docs via a webhook or Zapier.
- **Retros** — the templated instance of the whole pattern, and already built.

**The rule that stops it duplicating: the section owns the workflow; feature sections own the
mechanics.** Meeting Notes pages are sequenced narrative that link out to the feature page at
each step — so "Get the notes" explains what you end up with and links to catch-up in AI,
rather than restating how catch-up works. Async meetings are the one exception: no other
section wants them, so they live here.

### 4.4 Quick capture — name the section for the job, not the platform

Desktop global hotkeys and iOS widgets look like different topics but answer the same
question: *get to the thing fast without opening the app.* A section named for that job
collects eight undocumented features under one banner and gives the shortcut story the
billing it deserves — where a per-platform split would bury it in two places.

- **Desktop** — global hotkeys (record voice memo, quick send), the Speed Dial panel
  (`⌥\``, 10 slots bound to conversations, folders or agents), the macOS menu-bar app,
  hold-spacebar-to-record.
- **iPhone** — Recents and Quick Sends widgets, **Siri**, the **share extension**, the
  **iMessage extension**, listen-and-reply from a push notification.
- **Apple Watch** — record from the wrist, offline, with sync.

**Siri and the iMessage extension are shipped iOS targets with no documentation at all** —
neither appears in the help center or in §2 above. `ios/Siri/IntentHandler.swift` handles
`INSendMessageIntent` and `INSearchForMessagesIntent`; `ios/MessageExtension/` is a full
iMessage app with its own conversation list.

Also undocumented: an **App Clip** (`ios/AppClip/`) with CarbonLink, discussion, magic-link
and player/recorder flows. That App Clip is the mechanism behind the CarbonLink promise that
people can listen and reply "without downloading an app" — worth saying out loud on the
CarbonLink pages.

### 4.5 Integrations: sort by how much you have to build

The current section mixes a no-code tool, an AI protocol and a REST API at the same level.
Readers self-select by effort, so tier by effort — and note that the middle tier, the one
that's missing entirely, is the bridge that makes the other two usable.

| Tier | Holds | State |
|---|---|---|
| **1 · No code — push**<br>"when X happens, do Y elsewhere" | Zapier, n8n, and the trigger patterns (label a message, post into a named conversation) | Zapier documented; n8n absent; per-workflow steps still a placeholder |
| **1 · No code — pull**<br>"keep my content where I already read" | The **Obsidian sync plugin**; any future sync or export path | **Entirely absent** |
| **2 · Your account's plumbing** | The in-app Integrations panel: credentials and personal access tokens, webhooks and Automations, Connected Apps | **Entirely absent** |
| **3 · Build on it** | Developer portal, OAuth apps, agent identities | Documented as a pointer |

**Obsidian resolves as tier 1, pull — not MCP.** It's a community sync plugin
([carbon-voice-sync](https://community.obsidian.md/plugins/carbon-voice-sync)): one-way,
Carbon Voice into the vault, importing conversations with transcripts, voice memos with their
AI summaries, and participant and workspace metadata as Markdown, with embedded audio and
auto-generated wiki links. Configurable scope, history window and background interval. So it
sits beside Zapier by effort, but answers a different question — which is why the two shapes
are worth naming separately: push sends an event somewhere, pull brings your content home.

**The missing tier is blocking a shipped integration.** The Obsidian plugin authenticates with
a **personal access token generated in the Carbon Voice app's integration settings** — tier 2,
the tier with no documentation at all. Step one of a shipped, public integration currently
points at a screen the help center has never described. That moves "document the Integrations
panel" from a backlog item to a prerequisite: write the credentials page first, and have the
Obsidian page open by linking to it.

Obsidian also belongs in the **Meeting Notes** cross-links. "Share the notes" is exactly what
it does — a discussion becomes a transcript and an AI summary, and lands in the vault you
already write in. But the mechanism isn't why people use it — see 4.6.

### 4.6 Two paths to get your content to an AI — and the page that routes between them

The second-brain pattern — fill a vault from voice, then let Claude or ChatGPT read it — is a
case where 4.2's rule ("file by the reader's question") and 4.5's rule ("file by the
mechanism") point at different sections. Worth resolving in the open, because it recurs.

The reader's question is *"how do I get my Carbon Voice content within reach of my AI?"* — an
AI assistants question. The steps are *install an Obsidian plugin and paste a token* — an
Integrations answer. Filing purely by mechanism means someone reading the MCP pages never
learns the vault path exists.

**There are genuinely two architectures here, and nobody has written the comparison:**

| | Direct, over MCP | Via your vault |
|---|---|---|
| **How** | The assistant queries Carbon Voice at question time | Content syncs into Obsidian as Markdown; any tool that reads the vault can use it |
| **Freshness** | Always current | A snapshot, on your sync interval |
| **Reach** | Only MCP-capable clients, only what the tools expose | Anything that reads files — and it composes with the rest of your notes |
| **You keep** | Nothing stored | Files you own, annotatable, linkable, yours if you leave |

**The fix is a routing page, not a move.** Add **"Getting your content to an AI"** to AI
assistants & MCP: it explains the two architectures, then hands off — to the MCP setup pages
for the direct path, and to the Obsidian page in Integrations for the vault path. The how-to
stays where its steps live, so someone who uses Obsidian as an archive and doesn't care about
AI still finds it; the concept lives where the intent lives.

That page should also say **what lands in the vault**, because that's what makes it queryable
later: transcripts, AI summaries, and participant and workspace wiki links — not just audio
files.

And it should say why anyone runs this at all, because that's the part the docs have never
articulated. **AI is only as personalized as the context it can reach** — and most of anyone's
best thinking happens in conversation, which is exactly the material that never gets written
down. Three steps, linear:

1. **Carbon Voice captures your ideas** as you talk, as a byproduct of communicating — no
   separate note-taking discipline to keep up.
2. **Obsidian Sync pulls them in**, as Markdown you own.
3. **Your agents query that second brain**, and answer with fuller context of you.

Step 3 is only ever as good as step 1 — which is the argument for capturing by voice in the
first place, and the reason this page belongs in the AI section rather than reading as an
Obsidian footnote.

### 4.7 The proposed sidebar

New in bold. Desktop stays a *single page* rather than a mirrored tree — it's the same app,
so document the delta, not a parallel universe.

| Section | Change |
|---|---|
| Getting Started | Add **Carbon Voice on desktop** — layout, navigation map, sheet-vs-sidebar, inline recording |
| **Meeting Notes** | **New.** Why there's no meeting · run an async meeting · get the notes · action items · share them · retros |
| Conversations | Add **Business conversations** as a type; expand filtering. Async meetings move to Meeting Notes |
| Messages | Add threads, Listen Later, typed messages, mentions, reply privately |
| Voice Memos | Largely as-is |
| **Voice & language** | **New.** Consolidates three scattered pages: how you sound (TTS, premium engine, cloning) and talking across languages (Global Voice, auto-translate) |
| **Quick capture** | **New.** Desktop hotkeys · Speed Dial · menu bar · widgets · Siri · share extension · iMessage · Apple Watch |
| AI | Narrowed to AI you invoke: summaries & catch-up · AI Chat · AI actions · AI Outputs |
| **Agents** | **New.** What an agent is · create one · connect a platform · agents in conversations · agents on speed dial |
| **AI assistants & MCP** | **Promoted** out of Integrations. Add **getting your content to an AI** (the routing page, 4.6) and **what your assistant can actually do** — the MCP tool surface, in plain language |
| Workspaces | Largely as-is |
| Integrations | Retiered per 4.5; gains the account-plumbing tier and the **Obsidian sync** page |
| Account & Settings | Add Appearance, Language, Recording & Playback; fix Directory Services |
| Troubleshooting | Largely as-is |

Three AI-named top-level entries — AI, Agents, AI assistants — down from four once Voice &
language moves out. If that still reads as too many in the rail, the fallback is one **AI**
parent with three children; keep the groups distinct whichever nesting wins, because the
reader's question differs in each. **Meeting Notes sits second, right after Getting Started**:
it's the "what is this actually for" story, and it's the section most likely to be someone's
first landing page from search.

---

## 5. Suggested priority

1. **Fix the wrong instructions first** — 1.1 (profile menu, 8 pages), 1.5 (AI controls,
   4 pages), 1.7 (Directory Services), 1.9 (pre-recorded messages). These actively misdirect.
2. **Terminology pass** — 1.2 / 1.3 / 1.4, which are one coherent rewrite of the
   notified/unread model across five pages.
3. **Land the new structure before writing into it** — agree §4 first. Six new pages written
   into today's taxonomy is six pages that get moved again.
4. **Fill the new sections** — Meeting Notes (4.3) first: it's the highest-intent landing page
   and it absorbs async meetings (2.4) and action items (2.2) on the way. Then the
   **credentials page** (2.6), which a shipped integration already depends on (4.5). Then
   Desktop (§3), Agents (2.1), AI Chat (2.3), Quick capture (4.4), Obsidian sync with its
   routing page (4.6), and the Voice & language consolidation (4.2).
5. **Backfill** — §2.7 onwards, and restart `whats-new/` from 2025-08.
