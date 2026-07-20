import React from 'react';

/**
 * Renders Organization JSON-LD structured data for NITCO Inc.
 */
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NITCO Inc.',
    url: 'https://nitcoinc.ai',
    logo: 'https://nitcoinc.ai/images/logo-nitco.png',
    sameAs: [
      'https://www.linkedin.com/company/nitco-inc',
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/**
 * Renders WebSite JSON-LD structured data for NITCO Inc.
 */
export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NITCO Inc.',
    url: 'https://nitcoinc.ai',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/**
 * Renders BlogPosting JSON-LD structured data for a blog post.
 * @param {Object} props
 * @param {string} props.title - Post headline
 * @param {string} props.description - Post description
 * @param {string} props.image - Post image URL
 * @param {string} props.datePublished - ISO date string
 * @param {string} props.author - Author name
 */
export function BlogPostingSchema({ title, description, image, datePublished, author }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished,
    author: { '@type': 'Person', name: author || 'NITCO Inc.' },
    publisher: {
      '@type': 'Organization',
      name: 'NITCO Inc.',
      logo: { '@type': 'ImageObject', url: 'https://nitcoinc.ai/images/logo-nitco.png' },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
