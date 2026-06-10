import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Shim Node.js built-ins that gray-matter imports at module level but never
// calls in our usage (we only use matter(string), not matter.read()).
// Cloudflare Pages runs Astro's prerender step inside a miniflare Worker
// which has no Node.js fs/path — this plugin intercepts those imports in the
// SSR/prerender bundle and replaces them with no-op stubs.
const cfNodeCompatPlugin = {
  name: 'cf-node-compat-shim',
  resolveId(id, _importer, opts) {
    if (opts?.ssr && (id === 'fs' || id === 'path')) {
      return `\0${id}-shim`;
    }
  },
  load(id) {
    if (id === '\0fs-shim') {
      return `
        const noop = () => {};
        const emptyArr = () => [];
        const emptyStr = () => '';
        const fakeStat = () => ({ isDirectory: () => false, isFile: () => true });
        export const readFileSync = emptyStr;
        export const readdirSync = emptyArr;
        export const existsSync = () => false;
        export const writeFileSync = noop;
        export const mkdirSync = noop;
        export const statSync = fakeStat;
        export const lstatSync = fakeStat;
        export const unlinkSync = noop;
        export const renameSync = noop;
        const _default = { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync, statSync, lstatSync, unlinkSync, renameSync };
        export default _default;
      `;
    }
    if (id === '\0path-shim') {
      return `
        export const join = (...a) => a.filter(Boolean).join('/').replace(/\\/+/g, '/');
        export const resolve = (...a) => a.filter(Boolean).join('/');
        export const dirname = (p) => p ? p.split('/').slice(0, -1).join('/') || '/' : '';
        export const basename = (p, ext) => { const b = (p || '').split('/').pop() || ''; return ext && b.endsWith(ext) ? b.slice(0, -ext.length) : b; };
        export const extname = (p) => { const m = (p || '').match(/\\.[^./]+$/); return m ? m[0] : ''; };
        export const sep = '/';
        export const delimiter = ':';
        const _default = { join, resolve, dirname, basename, extname, sep, delimiter };
        export default _default;
      `;
    }
  },
};

export default defineConfig({
  output: 'static',
  site: 'https://nitcoinc.com',
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
    plugins: [cfNodeCompatPlugin],
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

