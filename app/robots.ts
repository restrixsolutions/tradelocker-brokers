import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*?*', // URLs with query parameters (for now)
        ],
      },
    ],
    sitemap: 'https://tradelockerbrokers.com/sitemap.xml',
  }
}
