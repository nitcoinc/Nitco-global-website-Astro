import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 't8ctf4dg',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Returns an image URL builder for a given Sanity image source.
 * @param {import('@sanity/types').SanityImageSource} source
 */
export function urlFor(source) {
  return builder.image(source);
}
