---
title: Add a blog post to a Google Doc
description: Turn a Blog Post AI result into a formatted draft appended to a Google Doc, with summary, hashtags and pull quotes.
sidebar_position: 4
---

# Add a blog post to a Google Doc

Talk through an idea, run the **Blog Post** AI action, and a formatted draft — title,
subtitle, summary, body, hashtags and pull quotes — is appended to a document you
already use for drafts.

## How you use it

1. Record a voice memo or message in Carbon Voice describing the blog post.
2. Open **message details** and run the **Blog Post** AI action.
3. Zapier appends the draft to your Google Doc.

## Build the Zap

[Start from the Zap template](https://zapier.com/apps/carbon-voice/integrations/google-docs/255562703/append-text-to-documents-in-google-docs-when-new-ai-system-blog-prompts-get-responses-in-carbon-voice),
or build it with the steps below. Steps 2 and 3 only improve the formatting — skip them
if you're on a free Zapier plan.

![The finished four-step Zap: Carbon Voice, two Formatter steps, then Google Docs](/img/integrations/automate-workflows/gdoc-blog-zap-overview.webp)

### Step 1 — Trigger on the AI result

**Setup**

- **App** — Carbon Voice
- **Trigger event** — New AI Prompt Response Generated
- **Account** — sign in to your Carbon Voice account

**Configure**

- **System Prompt ID** — Blog Post

![The Carbon Voice trigger in Zapier, with System Prompt ID set to Blog Post](/img/integrations/automate-workflows/gdoc-blog-trigger.webp)

### Step 2 — Format the date

**Setup**

- **App** — Formatter by Zapier
- **Action event** — Date/Time

**Configure**

- **Transform** — Format
- **Input** — the **Messages Message Created At** field from step 1
- **To Format** — `MMM DD YYYY` (Jan 22 2006)

![Formatter by Zapier formatting the message's created-at date](/img/integrations/automate-workflows/gdoc-blog-format-date.webp)

### Step 3 — Convert the body to HTML

**Setup**

- **App** — Formatter by Zapier
- **Action event** — Text

**Configure**

- **Transform** — Convert Markdown to HTML
- **Input** — the **Ai Responses Responses Json Body** field from step 1

![Formatter by Zapier converting the post body from Markdown to HTML](/img/integrations/automate-workflows/gdoc-blog-format-text.webp)

### Step 4 — Append the post to the document

**Setup**

- **App** — Google Docs
- **Action event** — Append Text to Document

**Configure**

- **Document Name** — the existing Google Doc you want blog post drafts appended to
- **Text to Append** — paste the block below, replacing each `<FIELD>` with the matching
  output from the earlier steps

```html
<hr>
<H3> <"<"Ai Responses Responses Json Title" from Step 1>> </H3>

<i style="font-size:10pt;">Created at: <b> <"Output" output from Step 2>
</b></i><br/>
<a href= <"Messages Message Link" output from Step 1> style="display:inline;">Open Message in App</a>
<br />

<H4>✨ Summary</H4>
<table style="background-color: #F2EFFF; width: 100%; border-collapse: collapse;"><tr><td>
<"Messages Message Ai Summary" output from Step 1>
</td></tr></table><br />
<H4>Blog Post</H4>
<p style="text-align: justify;">Subtitle:
<"Ai Responses Responses Json Subtitle" output from Step 1>
<br/><"Output" output from Step 3>
<br/> <i>Hashtags: <"Ai Response Responses Json Hashtags" output from Step 1></i>
<br/>
<br/> <b>Pull Quotes:</b> " <"Ai Response Responses Json Pull Quotes" output from Step 1> "
</p>
```

![Google Docs' Append Text to Document step, with the pasted HTML block](/img/integrations/automate-workflows/gdoc-blog-append.webp)

## Variations

- **Want a page per post instead?** See
  [Send a blog post to Notion](send-blog-post-to-notion.md).
- **Want it emailed to you?** See
  [Send a blog post to yourself in Gmail](send-blog-post-in-gmail.md).
- **Want a different trigger** — a label, or posting into a conversation named **Blog
  Posts**? See [Using a different trigger](index.md#using-a-different-trigger).

## Related

- [Automate workflows](index.md)
- [Zapier](../zapier.md)
- [Google Workspace](../google-workspace.md)
