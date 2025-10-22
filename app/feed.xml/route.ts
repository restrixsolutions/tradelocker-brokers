import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog-utils'
import { SITE_URL, BRAND, DEFAULT_DESC } from '@/lib/seo'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllBlogPosts()
  
  // Sort by publish date (newest first) and format dates
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )

  // Generate RSS XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BRAND)}</title>
    <description>${escapeXml(DEFAULT_DESC)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>Tue, 14 Oct 2025 00:00:00 GMT</lastBuildDate>
    <generator>TradeLocker Brokers Feed Generator</generator>
    ${sortedPosts.map(post => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.publishDate).toUTCString()
      
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
