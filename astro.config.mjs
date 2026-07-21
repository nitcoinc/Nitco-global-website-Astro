import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';

import cloudflare from '@astrojs/cloudflare';

// gray-matter does `require('fs')` at module top level (CJS), but our pages
// only call matter(string) — never matter.read(). Cloudflare Pages runs
// Astro's prerender step in a miniflare Worker with no Node.js fs.
// resolve.alias replaces the `fs` import before Rollup externalises it.
const fsShim = fileURLToPath(new URL('./src/lib/fs-shim.js', import.meta.url));

export default defineConfig({
  output: 'static',
  site: 'https://nitcoinc.ai',

  integrations: [
    react(),
    sitemap(),
  ],

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },

  vite: {
    resolve: {
      alias: {
        fs: fsShim,
      },
    },
    css: {
      preprocessorOptions: {
        scss: { api: 'modern' },
      },
    },
    server: {
      fs: { allow: ['..'] },
    },
  },

  adapter: cloudflare(),
});