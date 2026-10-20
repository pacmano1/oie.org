import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://openintegrationengine.org',
  integrations: [sitemap({ filter: (page) => !page.includes('/og-preview') })],
  build: {
    assets: 'assets',
  },
  compressHTML: true,
  redirects: {
    // The WordPress site's vendor page, still linked from vendors issues.
    '/commercial-support-vendors': '/commercial-support/',
  },
});
