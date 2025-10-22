import { MetadataRoute } from 'next'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getAllBlogPosts } from '@/lib/blog-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tradelockerbrokers.com'
  
  // Get all brokers and prop firms for dynamic URLs
  const supabase = await getSupabaseServerClient()
  
  const [brokersResult, propFirmsResult] = await Promise.all([
    supabase.from('brokers').select('id, name'),
    supabase.from('prop_firms').select('id, name')
  ])
  
  const brokers = brokersResult.data || []
  const propFirms = propFirmsResult.data || []
  
  // Get all blog posts
  const blogPosts = getAllBlogPosts()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/brokers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prop-firms`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-use`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]
  
  // Dynamic broker pages (if you have individual broker pages)
  const brokerPages = brokers.map((broker) => ({
    url: `${baseUrl}/brokers/${broker.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Dynamic prop firm pages (if you have individual prop firm pages)
  const propFirmPages = propFirms.map((propFirm) => ({
    url: `${baseUrl}/prop-firms/${propFirm.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated || post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.7,
  }))
  
  // Blog category pages
  const categories = [...new Set(blogPosts.map(post => post.category))]
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  // Blog tag pages
  const tags = [...new Set(blogPosts.flatMap(post => post.tags))]
  const tagPages = tags.slice(0, 20).map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))
  
  // Combine all pages
  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...tagPages,
    // Note: Only include dynamic broker/prop firm pages if you actually have those routes
    // ...brokerPages,
    // ...propFirmPages,
  ]
}
