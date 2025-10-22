import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog-utils'
import { SITE_URL, BRAND, DEFAULT_DESC } from '@/lib/seo'

export async function GET() {
  const posts = getAllBlogPosts()
  
  // Sort by publish date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )

  // Build JSON Feed v1 format
  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: BRAND,
    description: DEFAULT_DESC,
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    icon: `${SITE_URL}/tradelocker-logo.png`,
    favicon: `${SITE_URL}/icon.png`,
    authors: [
      {
        name: "TradeLocker Brokers Editorial",
        url: SITE_URL,
      }
    ],
    language: "en-US",
    items: sortedPosts.map(post => ({
      id: `${SITE_URL}/blog/${post.slug}`,
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      content_html: post.content, // MDX content will be rendered as HTML by the blog system
      content_text: post.excerpt,
      summary: post.description,
      date_published: new Date(post.publishDate).toISOString(),
      date_modified: post.lastUpdated ? new Date(post.lastUpdated).toISOString() : new Date(post.publishDate).toISOString(),
      authors: [
        {
          name: post.author,
        }
      ],
      tags: [post.category, ...post.tags],
      image: post.ogImage ? `${SITE_URL}${post.ogImage}` : undefined,
    }))
  }

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
