---
title: Integration credentials
description: Create and revoke the access tokens integrations use, and see which apps are connected to your account.
sidebar_position: 0.5
---

# Integration credentials

Most integrations need a credential — a token that proves a request is really coming from
you. They're managed in one place: **Profile Menu → Integrations**.

## Personal access tokens

A personal access token lets another tool act as you. The Obsidian sync plugin uses one; so
does anything you build against the API, and most n8n or scripted workflows.

### Create one

1. Go to **Profile Menu → Integrations → Integration Credentials**.
2. Tap **Manage tokens**, then **Create token**.
3. Give it a name you'll recognise later — the tool it's for is the useful choice.

Tokens are created with **read and write permissions** and **expire after one year**.

> **Copy the token as soon as it's created.** It's shown once and never again. If you lose
> it, revoke it and make another.

### Revoke or delete one

Open a token to see when it was created, when it expires, and when it was last used.

- **Revoke** stops it working immediately. It stays in the list so you can see it was there.
- **Delete** removes it entirely.

Revoking is the right move if a token might have leaked — it takes effect at once, and
doesn't disturb your other integrations.

## Your user ID

The same screen shows **My user ID**, which some integrations ask for.

## Connected apps

**Connected Apps** lists the applications you've authorized to act on your behalf, and when
each was connected. Disconnect any of them from here.

> Some apps can only be disconnected by uninstalling them from the app itself — you'll be
> told when that's the case.

## Related

- [Automations and webhooks](../conversations/access-and-sharing/access-and-sharing-settings.md)
- [Build with the Carbon Voice API](build-with-the-api.md)
- [Obsidian](obsidian.md)
