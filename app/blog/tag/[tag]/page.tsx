import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { getAllTags, getBlogPostsByTag } from "@/lib/blog-utils"
import { BlogCard } from "@/components/blog-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { ArrowLeft, Tag } from "lucide-react"

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${tagName} Articles – TradeLocker Blog`,
    description: `Browse all articles tagged with ${tagName} on TradeLocker brokers, prop firms, and trading strategies.`,
    openGraph: {
      title: `${tagName} – TradeLocker Blog`,
      description: `All articles about ${tagName}.`,
      url: `https://tradelockerbrokers.com/blog/tag/${tag}`,
    },
    alternates: {
      canonical: `https://tradelockerbrokers.com/blog/tag/${tag}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const posts = getBlogPostsByTag(tagName)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Blog", url: "https://tradelockerbrokers.com/blog" },
          { name: `Tag: ${tagName}`, url: `https://tradelockerbrokers.com/blog/tag/${tag}` },
        ]}
      />
      <HeaderNav />

      <Section className="pt-32">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="h-6 w-6 text-accent" />
              <Badge variant="secondary" className="text-base px-4 py-2">{tagName}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Articles Tagged: {tagName}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              {posts.length} article{posts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

