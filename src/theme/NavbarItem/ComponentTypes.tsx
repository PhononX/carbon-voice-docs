import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import AskAI from '@site/src/components/AskAI';

/**
 * Registers `{type: 'custom-askAI'}` as a navbar item, which docusaurus.config
 * then places next to search. This is Docusaurus's documented extension point
 * for custom navbar items — no existing theme component is swizzled.
 */
export default {
  ...ComponentTypes,
  'custom-askAI': AskAI,
};
