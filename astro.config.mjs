import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://openintegrationengine.org',
  integrations: [sitemap()],
  build: {
    assets: 'assets',
  },
  compressHTML: true,
});
