import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  publishDate: string
  lastUpdated?: string
  category: string
  tags: string[]
  author: string
  readTime: number
  featured: boolean
  ogImage?: string
  content: string
  excerpt: string
  ctaBrokerName?: string
  ctaAffiliateLink?: string
  ctaHighlight?: string
}

const blogDirectory = path.join(process.cwd(), 'content/blog')

export function getAllBlogPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(blogDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.(mdx|md)$/, '')
        const fullPath = path.join(blogDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title,
          description: data.description,
          publishDate: data.publishDate,
          lastUpdated: data.lastUpdated,
          category: data.category,
          tags: data.tags || [],
          author: data.author || 'TradeLockerBrokers Team',
          readTime: data.readTime || calculateReadTime(content),
          featured: data.featured || false,
          ogImage: data.ogImage,
          content,
          excerpt: data.excerpt || content.slice(0, 160) + '...',
          ctaBrokerName: data.ctaBrokerName,
          ctaAffiliateLink: data.ctaAffiliateLink,
          ctaHighlight: data.ctaHighlight,
        } as BlogPost
      })

    // Sort by date (newest first)
    return allPostsData.sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      publishDate: data.publishDate,
      lastUpdated: data.lastUpdated,
      category: data.category,
      tags: data.tags || [],
      author: data.author || 'TradeLockerBrokers Team',
      readTime: data.readTime || calculateReadTime(content),
      featured: data.featured || false,
      ogImage: data.ogImage,
      content,
      excerpt: data.excerpt || content.slice(0, 160) + '...',
      ctaBrokerName: data.ctaBrokerName,
      ctaAffiliateLink: data.ctaAffiliateLink,
      ctaHighlight: data.ctaHighlight,
    }
  } catch (error) {
    return null
  }
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => 
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts()
  const categories = allPosts.map((post) => post.category)
  return [...new Set(categories)]
}

export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts()
  const tags = allPosts.flatMap((post) => post.tags)
  return [...new Set(tags)]
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readTime = Math.ceil(words / wordsPerMinute)
  return readTime
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

