import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { getAllBlogPosts, getAllCategories, getAllTags } from "@/lib/blog-utils"
import { BlogCard } from "@/components/blog-card"
import { FeaturedBlogCard } from "@/components/featured-blog-card"
import { BlogSearch } from "@/components/blog-search"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "TradeLocker Blog – Guides, Reviews & Trading Insights (2025)",
  description:
    "Expert insights on TradeLocker brokers, prop firms, and trading strategies. Compare platforms, learn setup guides, and stay updated with the latest trends.",
  keywords: [
    "TradeLocker blog",
    "trading guides",
    "broker reviews",
    "prop firm insights",
    "forex trading",
    "platform tutorials",
  ],
  openGraph: {
    title: "TradeLocker Blog – Trading Guides & Platform Reviews",
    description: "Expert insights on brokers, prop firms, and trading strategies for TradeLocker users.",
    type: "website",
    url: "https://tradelockerbrokers.com/blog",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/blog",
  },
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts()
  const categories = getAllCategories()
  const tags = getAllTags()
  
  const featuredPost = allPosts.find(post => post.featured) || allPosts[0]
  const recentPosts = allPosts.filter(post => post.slug !== featuredPost?.slug).slice(0, 6)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Blog", url: "https://tradelockerbrokers.com/blog" },
        ]}
      />
      <HeaderNav />

      <Section className="pt-32">
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              TradeLocker Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Expert insights on brokers, prop firms, and trading strategies. Stay updated with guides,
              reviews, and platform tutorials.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <BlogSearch />
            
            {/* Categories */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">CATEGORIES</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link key={category} href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Badge variant="outline" className="hover:bg-accent/10 cursor-pointer">
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">POPULAR TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Badge variant="secondary" className="hover:bg-accent/20 cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Post - Magazine Style */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <FeaturedBlogCard post={featuredPost} />
            </div>
          )}

          {/* Recent Posts Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* All Posts */}
          {allPosts.length > 7 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">All Articles</h2>
              <div className="space-y-4">
                {allPosts.slice(7).map((post) => (
                  <BlogCard key={post.slug} post={post} layout="list" />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

