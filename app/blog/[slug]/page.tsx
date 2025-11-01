import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { getAllBlogPosts, getBlogPostBySlug, formatDate } from "@/lib/blog-utils"
import { BreadcrumbJsonLd, BlogPostingJsonLd } from "@/components/json-ld"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, AlertCircle } from "lucide-react"
// import { MDXRemote } from "next-mdx-remote/rsc"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { parseMarkdown } from "@/lib/markdown-parser"
import { BrokerCtaBanner } from "@/components/broker-cta-banner"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://tradelockerbrokers.com/blog/${slug}`,
      publishedTime: post.publishDate,
      modifiedTime: post.lastUpdated || post.publishDate,
      authors: [post.author],
      tags: post.tags,
      ...(post.ogImage && { images: [post.ogImage] }),
    },
    alternates: {
      canonical: `https://tradelockerbrokers.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => 
      p.slug !== slug && 
      (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Blog", url: "https://tradelockerbrokers.com/blog" },
          { name: post.title, url: `https://tradelockerbrokers.com/blog/${slug}` },
        ]}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        publishDate={post.publishDate}
        lastUpdated={post.lastUpdated}
        author={post.author}
        image={post.ogImage}
        url={`https://tradelockerbrokers.com/blog/${slug}`}
        category={post.category}
        tags={post.tags}
      />
      <HeaderNav />

      <Section className="pt-32">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="text-sm">{post.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishDate)}
                </span>
                {post.lastUpdated && (
                  <span className="text-sm text-muted-foreground">
                    Updated: {formatDate(post.lastUpdated)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Badge variant="outline" className="hover:bg-accent/10 cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* Risk Disclaimer */}
              <Alert className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Risk Disclaimer</AlertTitle>
                <AlertDescription>
                  Trading forex and CFDs involves significant risk of loss. This content is for educational
                  purposes only and should not be considered financial advice. Always conduct your own research
                  and consider your risk tolerance before trading.
                </AlertDescription>
              </Alert>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-12">
              {parseMarkdown(post.content)}
            </div>

            {/* CTA Banner */}
            {post.ctaBrokerName && post.ctaAffiliateLink && (
              <BrokerCtaBanner
                brokerName={post.ctaBrokerName}
                affiliateLink={post.ctaAffiliateLink}
                highlight={post.ctaHighlight}
              />
            )}

            {/* Affiliate Disclosure */}
            <Card className="mb-12 bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Affiliate Disclosure
                </h3>
                <p className="text-sm text-muted-foreground">
                  Some links on this page may be affiliate links. When you sign up through these links, we may
                  receive a commission at no additional cost to you. This helps us maintain the site and provide
                  free content. We only recommend brokers and prop firms we've personally reviewed and verified.
                </p>
              </CardContent>
            </Card>

            {/* Author Info */}
            <div className="border-t border-border pt-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-2xl font-bold text-accent">
                  TL
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{post.author}</h3>
                  <p className="text-muted-foreground">
                    Expert insights on TradeLocker brokers, prop firms, and trading platforms. Helping traders make
                    informed decisions since 2025.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full hover:border-accent/50 transition-colors">
                        <CardContent className="pt-6">
                          <Badge variant="secondary" className="mb-3">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

