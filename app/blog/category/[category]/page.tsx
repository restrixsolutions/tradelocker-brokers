import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { getAllCategories, getBlogPostsByCategory } from "@/lib/blog-utils"
import { BlogCard } from "@/components/blog-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { ArrowLeft } from "lucide-react"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${categoryName} Articles – TradeLocker Blog`,
    description: `Browse all ${categoryName.toLowerCase()} articles about TradeLocker brokers, prop firms, and trading strategies.`,
    openGraph: {
      title: `${categoryName} – TradeLocker Blog`,
      description: `Expert insights and guides in ${categoryName.toLowerCase()}.`,
      url: `https://tradelockerbrokers.com/blog/category/${category}`,
    },
    alternates: {
      canonical: `https://tradelockerbrokers.com/blog/category/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const posts = getBlogPostsByCategory(categoryName)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Blog", url: "https://tradelockerbrokers.com/blog" },
          { name: categoryName, url: `https://tradelockerbrokers.com/blog/category/${category}` },
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
            <Badge className="mb-4 text-base px-4 py-2">{categoryName}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              {categoryName} Articles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Explore {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
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

