---
title: Send a blog post to yourself in Gmail
description: Email yourself every Blog Post AI result, formatted and linked back to the voice memo it came from.
sidebar_position: 6
---

# Send a blog post to yourself in Gmail

Every **Blog Post** AI result arrives in your inbox as a formatted email, so you can
read it later, forward it, or paste it wherever the post is going.

## How you use it

1. Record a voice memo or message in Carbon Voice describing the blog post.
2. Open **message details** and run the **Blog Post** AI action.
3. Zapier emails you the draft.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/gmail/255562712/get-gmail-emails-with-blog-posts-generated-by-carbon-voice),
or build the two steps below. Two steps means it runs on a free Zapier plan.

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Blog Post

### Step 2 — Send the email

**Setup**

- **App** — Gmail
- **Action event** — Send Email

**Configure**

- **To** — your own email address
- **From** — your own email address
- **Subject** — `[BLOG POST DRAFT]:` followed by the **Ai Responses Responses Json
  Title** field from step 1
- **Body Type** — html
- **Body** — paste the block below, replacing each `<FIELD>` with the matching output
  from step 1

```html
<H3> <"Ai Responses Responses Json Title" from Step 1> </H3>
<i style="font-size:10pt;">Created at: <b> <"Message Created At:" from Step 1>
</b></i><br/>
<a href="<"Message Link:" from Step 1>">Open Message in App</a>
<br />

<H4>✨ Summary</H4>
<table style="background-color: #F2EFFF; width: 100%; border-collapse: collapse;"><tr><td>
<"Message Ai Summary:" from Step 1>
</td></tr></table><br />

<H4>Blog Post</H4>
<"Ai Responses Responses Html" from Step 1>
```

## Variations

- **Want drafts collected in one document?** See
  [Add a blog post to a Google Doc](add-blog-post-to-google-doc.md).
- **Want a page per post?** See [Send a blog post to Notion](send-blog-post-to-notion.md).
- **Want a different trigger** — a label, or posting into a conversation named **Blog
  Posts**? See [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
