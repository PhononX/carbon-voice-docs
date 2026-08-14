---
title: Send a blog post to Notion
description: Turn a Blog Post AI result into a new Notion page under a parent page you choose.
sidebar_position: 5
---

# Send a blog post to Notion

Every **Blog Post** AI result becomes its own Notion page, titled with the post's title
and filled in with the summary, body, hashtags and pull quotes.

## How you use it

1. Record a voice memo or message in Carbon Voice describing the blog post.
2. Open **message details** and run the **Blog Post** AI action.
3. Zapier creates the Notion page.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/notion/255562719/create-notion-pages-with-blog-posts-when-new-ai-responses-are-generated-in-carbon-voice),
or build it with the steps below. Step 2 only improves the formatting — skip it if
you're on a free Zapier plan.

![The finished three-step Zap: Carbon Voice, Formatter, then Notion](/img/integrations/automate-workflows/notion-blog-zap-overview.webp)

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Blog Post

![The Carbon Voice trigger in Zapier, with System Prompt ID set to Blog Post](/img/integrations/automate-workflows/notion-blog-trigger.webp)

### Step 2 — Format the date

**Setup**

- **App** — Formatter by Zapier
- **Action event** — Date/Time

**Configure**

- **Transform** — Format
- **Input** — the **Messages Message Created At** field from step 1
- **To Format** — `MMM DD YYYY` (Jan 22 2006)

![Formatter by Zapier formatting the message's created-at date](/img/integrations/automate-workflows/notion-blog-format-date.webp)

### Step 3 — Create the Notion page

**Setup**

- **App** — Notion
- **Action event** — Create Page

**Configure**

- **Parent Page** — the existing Notion page you want drafts created under
- **Title** — the **Ai Response Responses Json Title** field from step 1
- **Content** — paste the block below, replacing each `<FIELD>` with the matching output

```text
Title: <"Ai Response Responses Json Title:" from Step 1>
Subtitle: <"Ai Response Responses Json Subtitle:" from Step 1>

Created at: <"Output" from Step 2>
Message Link: <"Messages Message Link:" from Step 1>

✨ Summary: <"Messages Message Ai Summary:" from Step 1>
Blog Post: <"Ai Response Responses Json Body:" from Step 1>
Hashtags: <"Ai Response Responses Json Hashtags" from Step 1>

Pull Quotes: <"Ai Response Responses Json Pull Quotes" from Step 1>
```

![Notion's Create Page step, with the title and content mapped to the AI response](/img/integrations/automate-workflows/notion-blog-create-page.webp)

## Variations

- **Want drafts collected in one document?** See
  [Add a blog post to a Google Doc](add-blog-post-to-google-doc.md).
- **Want it emailed to you?** See
  [Send a blog post to yourself in Gmail](send-blog-post-in-gmail.md).
- **Want a different trigger** — a label, or posting into a conversation named **Blog
  Posts**? See [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
