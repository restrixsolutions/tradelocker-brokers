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
          // Allow filter URLs to be indexed (removed /*?* restriction)
        ],
      },
      {
        userAgent: '*',
        allow: ['/feed.json', '/feed.xml'],
      },
    ],
    sitemap: 'https://tradelockerbrokers.com/sitemap.xml',
  }
}
