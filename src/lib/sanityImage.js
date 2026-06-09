import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.js'

const builder = imageUrlBuilder(sanityClient)

/**
 * Returns an image URL builder for a given Sanity image source.
 * Supports chained API: urlFor(source).width(800).url()
 * Also accepts plain CDN URL strings (passthrough).
 *
 * @param {import('@sanity/types').SanityImageSource | string} source
 * @returns {import('@sanity/image-url/lib/types/builder').ImageUrlBuilder | { width: () => any, height: () => any, url: () => string }}
 */
export function urlFor(source) {
  if (!source) {
    // Return a no-op builder for null/undefined
    const noop = {
      width: () => noop,
      height: () => noop,
      format: () => noop,
      auto: () => noop,
      url: () => '',
    }
    return noop
  }

  if (typeof source === 'string') {
    // Plain URL string — wrap in chainable shim
    let _url
    try {
      _url = new URL(source)
      _url.searchParams.set('auto', 'format')
    } catch {
      const shim = {
        width: () => shim,
        height: () => shim,
        format: () => shim,
        auto: () => shim,
        url: () => source,
      }
      return shim
    }
    const shim = {
      width: (w) => { _url.searchParams.set('w', String(w)); return shim },
      height: (h) => { _url.searchParams.set('h', String(h)); return shim },
      format: (f) => { _url.searchParams.set('fm', f); return shim },
      auto: () => shim,
      url: () => _url.toString(),
    }
    return shim
  }

  return builder.image(source).auto('format')
}
