const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.iubenda.com https://www.googletagmanager.com https://www.google-analytics.com https://r2.leadsy.ai https://api-gateway.scriptintel.io https://cdn.jsdelivr.net https://ddwl4m2hdecbv.cloudfront.net https://js.hs-scripts.com https://js.hsforms.net https://www.google.com https://www.gstatic.com https://snap.licdn.com https://www.linkedin.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://*.hsforms.net https://www.google.com https://ddwl4m2hdecbv.cloudfront.net",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://cdn.sanity.io https://*.apicdn.sanity.io https://www.google-analytics.com https://api-gateway.scriptintel.io https://ddwl4m2hdecbv.cloudfront.net https://r2.leadsy.ai https://forms.hsforms.com https://*.hubspot.com https://stats.g.doubleclick.net",
      "frame-src 'self' https://player.vimeo.com https://www.googletagmanager.com https://www.google.com https://forms.hsforms.com https://www.youtube.com",
      "media-src 'self' blob: https://player.vimeo.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://*.hubspot.com",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ')
  },
]

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 128, 256, 384, 512],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/:path*__:_slug.mdx', destination: '/:path*/:_slug', permanent: true },
    ]
  },
}
