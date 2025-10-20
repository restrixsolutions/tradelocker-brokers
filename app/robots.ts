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
          // Allow filter URLs to be indexed (removed /*?* restriction)
        ],
      },
    ],
    sitemap: 'https://tradelockerbrokers.com/sitemap.xml',
  }
}
