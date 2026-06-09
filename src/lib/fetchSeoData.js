// Replaces lib/fetchSeoData.js — uses import.meta.glob instead of fs.readdirSync
const seoFiles = import.meta.glob('../../content/seo/*.json', { eager: true });

const seoMap = {};
for (const [path, mod] of Object.entries(seoFiles)) {
  // path like ../../content/seo/home.json -> key "home"
  const key = path.replace(/.*\/([^/]+)\.json$/, '$1');
  seoMap[key] = mod.default || mod;
}

/**
 * Returns SEO metadata for a given route path.
 * @param {string} routePath - e.g. "/", "/contact", "/company/about"
 * @returns {Record<string, unknown>}
 */
export function getSeoForPath(routePath) {
  // normalize: "/" -> "home", "/contact" -> "contact", "/company/about" -> "company-about"
  const key =
    routePath === '/'
      ? 'home'
      : routePath.replace(/^\//, '').replace(/\//g, '-');
  return seoMap[key] || seoMap['default'] || {};
}
