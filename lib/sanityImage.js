import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.js'

const builder = imageUrlBuilder(sanityClient)

/**
 * Returns a transformed image URL.
 * Accepts either a Sanity image object { _type: 'image', asset: {...} }
 * or a plain CDN URL string (from MDX frontmatter).
 *
 * @param {object|string} source
 * @param {{ width?: number, height?: number, format?: string }} opts
 * @returns {string}
 */
export function urlFor(source, opts = {}) {
  if (!source) return ''

  if (typeof source === 'string') {
    try {
      const url = new URL(source)
      if (opts.width) url.searchParams.set('w', String(opts.width))
      if (opts.height) url.searchParams.set('h', String(opts.height))
      url.searchParams.set('auto', 'format')
      return url.toString()
    } catch {
      return source
    }
  }

  // Sanity image object
  let b = builder.image(source).auto('format')
  if (opts.width) b = b.width(opts.width)
  if (opts.height) b = b.height(opts.height)
  if (opts.format) b = b.format(opts.format)
  return b.url()
}
