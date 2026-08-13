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
  favicon: 'img/logo.svg',

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

  // Tints browser UI (mobile address bar, PWA chrome) to match the site
  // background in each color mode: white in light, the brand indigo in dark.
  headTags: [
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff'},
    },
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0E0434'},
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
    metadata: [
      {name: 'author', content: 'Phonon X, Inc.'},
      {
        name: 'keywords',
        content: 'carbon voice, voice messaging, voice notes, transcription, ai summaries, async communication',
      },
      {property: 'og:site_name', content: 'Carbon Voice Help'},
      {property: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary'},
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
          label: 'Documentation',
        },
        {to: '/whats-new', label: "What's New", position: 'left'},
        {href: PRODUCT_URL, label: 'Carbon Voice', position: 'right'},
        {href: REPO_URL, label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      // Dark in both color modes, like the footer on getcarbon.app. The exact
      // palette is set on `.footer--dark` in src/css/custom.css.
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/getting-started'},
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
