import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type {WrapperProps} from '@docusaurus/types';
import {twinUrl} from '@site/src/twinUrl';

/**
 * The announcement-page counterpart to src/theme/DocItem/Layout: points each
 * post at its Markdown twin, the same two ways.
 *
 * The permalink comes from the `content` prop rather than useBlogPost(), which
 * would be called outside the provider BlogPostPage itself sets up. Wrapping the
 * page and not BlogPostItem is what keeps this to one tag per document: the item
 * renders once per post on the list pages too.
 */

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const route = twinUrl(props.content.metadata.permalink);

  return (
    <>
      <Head>
        <link rel="alternate" type="text/markdown" href={route} />
      </Head>
      {/* Hidden the same way, and for the same reason, as on a doc page: a note
          for a machine reading the rendered article, which a screen reader
          announcing it before every post would only get in the way of. */}
      <div className="visually-hidden" aria-hidden="true">
        {`A Markdown version of this page is available at ${siteConfig.url}${route}`}
      </div>
      <BlogPostPage {...props} />
    </>
  );
}
