---
title: Okta user provisioning with SCIM
description: Provision and de-provision Carbon Voice workspace members automatically from Okta.
sidebar_position: 6
---

# Okta user provisioning with SCIM

If your organization uses Okta to manage access to tools and services, you can use
Okta's provisioning to grant access to Carbon Voice automatically. The integration is
built on [SCIM](https://simplecloud.info/), the industry-standard protocol for
cross-domain identity management.

## What's supported

- **Push users** — users assigned to the Carbon Voice application in Okta are added as
  members of your workspace.
- **Update users** — changes in Okta sync to Carbon Voice. Supported fields are
  `first_name` and `last_name`.
- **Remove users** — removing someone from the Okta app removes them from the
  workspace.

## Requirements

SCIM provisioning is available to enterprise customers. You'll need an enterprise
account, then request an **Okta SCIM Integration** from
[support@carbonvoice.app](mailto:support@carbonvoice.app), naming the workspace you
want it enabled for.

Support configures the feature and returns the **URL and credentials** you'll need for
the Carbon Voice Okta app integration. After that you can assign users to the app to
provision and de-provision them.

> When Okta authorization is enabled on a workspace, all its members must sign in
> through Okta to use Carbon Voice.

## Configuring it in Okta

1. **Add the app.** Go to **Applications → Applications → Browse App Catalog** and
   search for **Carbon Voice**. Click **Add**, then **Done**.
2. **Enable provisioning.** On the **Provisioning** tab, click **Configure API
   Integration**, then **Save**.
3. **Enable user creation.** Still on **Provisioning**, click **To App**, then
   **Edit**.
4. Open the **Sign On** tab and click **Edit**.
5. Set **Application username format** to **Email**, then **Save**.
6. Go to **Assignments → Assign → Assign to People**. You can also assign to groups.

> Users are currently created in a workspace with the default role of **Member**.

## Changing someone's email address

If a user needs to change their email address in Okta, this sequence keeps their
workspace and conversation access intact:

1. Add the new email address in Okta.
2. Have the user add that same address to their Carbon Voice account. Depending on your
   Okta configuration they may already have been removed from the workspace and lost
   sight of their conversations — that's expected at this stage.
3. With both addresses on the account, provisioning either one restores access to the
   workspace and its conversations.
4. If you remove the old address from provisioning and access disappears, remove the
   new address from provisioning and add it back.

For help, contact [support](https://cv.chat/support) or
[support@carbonvoice.app](mailto:support@carbonvoice.app).

## Related

- [Create a workspace for your team](create-a-workspace.md)
- [Roles and access controls](roles-and-access-controls.md)
