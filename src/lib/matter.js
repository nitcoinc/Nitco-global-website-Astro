import { load } from 'js-yaml';

/**
 * Drop-in replacement for gray-matter using js-yaml.
 * gray-matter uses Buffer.from() on every call which breaks Cloudflare
 * Workers prerender (miniflare). js-yaml is pure JS with no Node.js globals.
 *
 * @param {string} raw - raw file content with optional YAML frontmatter
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
export default function matter(raw) {
  if (typeof raw !== 'string' || !raw.trimStart().startsWith('---')) {
    return { data: {}, content: raw ?? '' };
  }
  const start = raw.indexOf('---') + 3;
  const end = raw.indexOf('\n---', start);
  if (end === -1) {
    return { data: {}, content: raw };
  }
  const yamlStr = raw.slice(start, end).trim();
  const content = raw.slice(end + 4).trimStart();
  let data = {};
  try {
    const parsed = load(yamlStr);
    if (parsed && typeof parsed === 'object') {
      data = parsed;
    }
  } catch {
    // malformed YAML — return empty data
  }
  return { data, content };
}
