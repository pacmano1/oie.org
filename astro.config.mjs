import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://openintegrationengine.org',
  integrations: [sitemap({ filter: (page) => !page.includes('/og-preview') })],
  build: {
    assets: 'assets',
  },
  compressHTML: true,
});
