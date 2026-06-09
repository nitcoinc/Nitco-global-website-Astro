import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://nitcoinc.com',
  integrations: [
    react(),
    sitemap(),
  ],
  // redirects: { '/[...path]__[slug].mdx': '/[...path]/[slug]' },
  // Uncomment when corresponding dynamic pages exist in src/pages/
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: { api: 'modern' },
      },
    },
    server: {
      fs: { allow: ['..'] },
    },
  },
});

