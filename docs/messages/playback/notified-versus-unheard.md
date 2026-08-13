---
title: Notified messages versus unheard messages
description: Every message has two separate states — how much of it you've heard, and whether it still wants your attention.
sidebar_position: 3
---

# Notified messages versus unheard messages

In most inboxes, "unread" does double duty: it tells you what you haven't seen *and*
gets used as a flag for what you still need to deal with. Carbon Voice separates those
into two attributes:

- **Heard status** — how much of a message you've listened to.
- **Notified** — whether the message still wants your attention.

## Notified messages

Notified messages are seeking your attention, most often because they're new. They act
as flags, indicating that action or acknowledgment is needed from you.

- New messages generally arrive notified, and they drive the count on the app badge and
  on your conversations.
- The notification clears automatically when you play through the message.
- Your own messages don't arrive notified.
- You can clear and set notifications by hand — see
  [Clearing and setting notified messages](clearing-notified-messages.md).

### Playing your notified messages

<!-- image: notified-playlist.png — screenshot to re-export from Notion -->

1. Use the **Notified playlist** on Home.
2. Filter for conversations that have notified messages.
3. Tap the dark purple play areas to play through all the notified messages in a
   conversation.

See [Play new messages](play-new-messages.md).

## Heard status

Carbon Voice remembers the furthest point you reached in a message. Leave it and come
back, and playback resumes where you stopped.

- The **dark purple waveform** marks the unheard part of a message; the **gray
  waveform** marks what you've heard.
- New messages from other people always show as fully unheard. Your own messages show
  as fully heard.
- Joining an ongoing conversation shows historical messages as unheard, but not
  notified.
- Joining an async meeting shows historical messages as unheard **and** notified.

## How the two interact

Because they're separate, a message can be in any combination of the two states.

**Read the transcript, cleared the notification** — unheard, not notified. You read the
text but never played the audio, so the message stays unheard; clearing notify drops
the flag.

**Automatic clearing** — unheard, not notified. If your settings clear notifications as
you scroll past messages, the flag drops even though you haven't listened.

**Manually re-notify** — heard and notified. You can re-apply the notified flag to a
message you've already heard, to come back to it later.

## Joining a conversation

- **Ongoing conversations** — earlier messages appear unheard, but not notified.
- **Async meetings** — earlier messages appear both unheard and notified.

## Related

- [Clearing and setting notified messages](clearing-notified-messages.md)
- [Play new messages](play-new-messages.md)
