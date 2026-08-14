import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';

/**
 * Carbon Voice Help — https://help.carbonvoice.app
 *
 * The canonical content lives in `docs/` as plain Markdown. Docusaurus is only
 * the renderer, so this config deliberately stays close to the defaults.
 */

const SITE_URL = 'https://help.carbonvoice.app';
const REPO_URL = 'https://github.com/PhononX/carbon-voice-docs';
const PRODUCT_URL = 'https://getcarbon.app';

const config: Config = {
  title: 'Carbon Voice Help',
  tagline: 'Documentation for Carbon Voice — voice messaging for your whole team, people and agents alike.',
  // The raster fallback, which is also what anything requesting the conventional
  // /favicon.ico gets: Safari ignores SVG icons, and so do a fair number of
  // crawlers, feed readers and link unfurlers. The SVG version — sharper, and
  // color-adaptive — is offered alongside it in headTags below.
  favicon: 'favicon.ico',

  url: SITE_URL,
  baseUrl: '/',
  trailingSlash: false,

  // GitHub Pages deployment target.
  organizationName: 'PhononX',
  projectName: 'carbon-voice-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    // Icons. `favicon` above emits the .ico; these two cover the cases it does
    // not. Browsers that understand `type="image/svg+xml"` prefer the vector,
    // which stays sharp on hidpi tab strips and swaps the mark to the lighter
    // violet in dark mode; the rest fall back to the .ico.
    {
      tagName: 'link',
      attributes: {rel: 'icon', type: 'image/svg+xml', href: '/img/favicon.svg'},
    },
    // Home-screen bookmarks on iOS. Without this, Safari saves a screenshot of
    // the page instead of the mark. 180x180 is the largest size iOS asks for,
    // and it is on a white ground on purpose: iOS composites the icon onto its
    // own tile, where transparency comes out black.
    {
      tagName: 'link',
      attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
    },
    // Tints browser UI (mobile address bar, PWA chrome) to match the site
    // background in each color mode: white in light, the brand indigo in dark.
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff'},
    },
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0E0434'},
    },
    // Schema.org structured data, emitted into every page's <head> as JSON-LD.
    // This names the publisher and the site so search and answer engines can
    // attribute the content. Per-page BreadcrumbList markup is already emitted
    // by the theme's breadcrumbs component, so it is not repeated here.
    //
    // Site-wide identity: who publishes this documentation.
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Phonon X, Inc.',
        url: 'https://phononx.com',
        logo: `${SITE_URL}/img/logo.svg`,
        sameAs: [PRODUCT_URL, 'https://github.com/PhononX'],
      }),
    },
    // The site itself: name, canonical origin, language, publisher, and the
    // licence the content is offered under.
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Carbon Voice Help',
        url: SITE_URL,
        inLanguage: 'en',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        publisher: {
          '@type': 'Organization',
          name: 'Phonon X, Inc.',
          url: 'https://phononx.com',
        },
      }),
    },
  ],

  markdown: {
    // `.md` files are parsed as CommonMark rather than MDX, so the canonical
    // content stays portable: what renders here also renders on GitHub and in
    // any other Markdown tool. Use `.mdx` explicitly if a page ever needs JSX.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          // Serve the docs at the site root: docs/ai/ai-summaries.md -> /ai/ai-summaries
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // No editUrl on purpose: readers here are Carbon Voice customers, and
          // an "Edit this page" link into GitHub reads as noise to them. The
          // Markdown source stays public in the repository for anyone who does
          // want to suggest a fix.
          // The stamp reads each file's last git commit, so the workflows in
          // .github/ check out with `fetch-depth: 0`. Under the default shallow
          // clone every page would instead show the day the site was deployed.
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        // Product updates and announcements. These are dated and superseded
        // over time, unlike the evergreen help articles in docs/, so they use
        // the blog plugin: chronological, archived, and with an RSS feed.
        blog: {
          path: 'whats-new',
          routeBasePath: 'whats-new',
          blogTitle: "What's New in Carbon Voice",
          blogDescription: 'Product updates, new features, and announcements for Carbon Voice.',
          blogSidebarTitle: 'Recent updates',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          postsPerPage: 20,
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: 'all',
            title: "Carbon Voice — What's New",
            description: 'Product updates and announcements for Carbon Voice.',
            copyright: `Copyright © ${new Date().getFullYear()} Phonon X, Inc.`,
          },
        },
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Pages that have moved. The site has been public and indexed, so every
  // relocated URL keeps working rather than 404ing. Add a pair here whenever a
  // doc changes path.
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Voice cloning, translation and TTS left AI / Account for their own
          // Voice & Language section.
          {from: '/ai/voice-cloning', to: '/voice-and-language/voice-cloning'},
          {from: '/ai/auto-translation', to: '/voice-and-language/auto-translation'},
          {
            from: '/account-and-settings/typed-message-voice',
            to: '/voice-and-language/typed-message-voice',
          },
          // Widgets and the watch moved into Quick Capture.
          {from: '/account-and-settings/apple-watch', to: '/quick-capture/apple-watch'},
          {
            from: '/account-and-settings/iphone-widgets',
            to: '/quick-capture/iphone-widgets',
          },
          // The MCP guides were promoted out of Integrations.
          {from: '/integrations/mcp', to: '/ai-assistants'},
          {from: '/integrations/mcp/claude', to: '/ai-assistants/claude'},
          {from: '/integrations/mcp/chatgpt', to: '/ai-assistants/chatgpt'},
          {from: '/integrations/mcp/cursor', to: '/ai-assistants/cursor'},
          {from: '/integrations/mcp/windsurf', to: '/ai-assistants/windsurf'},
          {
            from: '/integrations/mcp/tips-and-tricks',
            to: '/ai-assistants/tips-and-tricks',
          },
        ],
      },
    ],
  ],

  themes: [
    // Search, built into the site at compile time. Deliberately not Algolia
    // DocSearch: this keeps the help center self-contained, with no external
    // service, no crawler to wait on, and no request leaving the reader's
    // browser when they type.
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: true,
        docsRouteBasePath: '/',
        // Both the on-disk directory and the route: announcements live in
        // whats-new/, not the plugin's default blog/.
        blogDir: 'whats-new',
        blogRouteBasePath: '/whats-new',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig: {
    // Default social-card image for link unfurls (Open Graph + Twitter). Pages
    // may override it with an `image` frontmatter field; announcements in
    // whats-new/ can point at their own screenshot.
    image: 'img/social-card.png',
    metadata: [
      {name: 'author', content: 'Phonon X, Inc.'},
      {
        name: 'keywords',
        content: 'carbon voice, voice messaging, voice notes, transcription, ai summaries, async communication',
      },
      {property: 'og:site_name', content: 'Carbon Voice Help'},
      {property: 'og:type', content: 'website'},
      // `summary_large_image`, not `summary`: the card above is a 1200x630
      // landscape image, and `summary` renders it as a small square thumbnail —
      // cropped to the middle of the artwork, which cuts the wordmark off.
      {name: 'twitter:card', content: 'summary_large_image'},
      // Dimensions stated up front so scrapers that render a preview before
      // they have finished downloading the image (Facebook's first pass,
      // LinkedIn, iMessage) lay out the card instead of dropping it.
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {property: 'og:image:type', content: 'image/png'},
      {property: 'og:image:alt', content: 'Carbon Voice Help & Support — everything you need to know.'},
      {name: 'twitter:image:alt', content: 'Carbon Voice Help & Support — everything you need to know.'},
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    navbar: {
      title: 'Carbon Voice Help',
      logo: {
        alt: 'Carbon Voice',
        src: 'img/logo.svg',
        // Same mark in the lighter brand violet, which the #5E4CCE version is
        // too dim to hold against the indigo navbar in dark mode.
        srcDark: 'img/logo-dark.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Help',
        },
        {to: '/whats-new', label: "What's New", position: 'left'},
        // The right side is for finding an answer, so it holds only search and
        // Ask AI. Links out to the product site and the repository live in the
        // footer, where someone looks once rather than on every page.
        //
        // Declaring `search` explicitly is what lets it be sequenced at all:
        // without it the theme appends the search box after everything else.
        // The color-mode toggle is always rendered last by the theme, which
        // gives <search> <ask ai> <dark mode>.
        {type: 'search', position: 'right'},
        // Registered in src/theme/NavbarItem/ComponentTypes.tsx.
        {type: 'custom-askAI', position: 'right'},
      ],
    },
    footer: {
      // Dark in both color modes, like the footer on getcarbon.app. The exact
      // palette is set on `.footer--dark` in src/css/custom.css.
      style: 'dark',
      links: [
        {
          title: 'Help',
          items: [
            {label: 'Record your first message', to: '/messages/recording-and-sending/record-a-voice-message'},
            {label: 'AI', to: '/ai'},
            {label: 'Troubleshooting', to: '/troubleshooting'},
          ],
        },
        {
          title: 'Carbon Voice',
          items: [
            {label: 'About Carbon Voice', href: PRODUCT_URL},
            {label: 'Download the app', href: `${PRODUCT_URL}/download`},
            {label: 'Human support', href: 'https://cv.chat/support'},
            {label: 'Developer Portal', href: 'https://developer.carbonvoice.app'},
          ],
        },
        {
          title: 'For agents and machines',
          items: [
            // pathname:// keeps these out of the SPA router: they are static
            // files generated into static/, not Docusaurus routes.
            {label: 'About this documentation', to: '/about'},
            {label: 'llms.txt', href: 'pathname:///llms.txt'},
            {label: 'llms-full.txt', href: 'pathname:///llms-full.txt'},
            {label: 'Markdown source', href: REPO_URL},
          ],
        },
      ],
      // The licence is now only stated here, so it links out: the home page no
      // longer carries an "About this documentation" section.
      copyright: `Copyright © ${new Date().getFullYear()} Phonon X, Inc. Documentation licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.`,
    },
    prism: {
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
