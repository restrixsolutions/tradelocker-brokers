import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import Link from "next/link"
import { Database, FileJson, Rss, GitBranch, Bot } from "lucide-react"
import { SITE_URL, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Open Data & AI Feeds – TradeLocker Brokers",
  description: "Access our RSS feeds, JSON feeds, and open datasets. Machine-readable content for AI assistants, search engines, and research tools.",
  keywords: ["TradeLocker data", "RSS feed", "JSON feed", "AI data", "machine readable", "open data"],
  openGraph: {
    title: "Open Data & AI Feeds",
    description: "Machine-readable feeds and datasets from TradeLocker Brokers.",
    type: "website",
    url: absoluteUrl("/data"),
  },
  alternates: {
    canonical: absoluteUrl("/data"),
  },
}

export default function DataPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Data & Feeds", url: absoluteUrl("/data") },
        ]}
      />
      <HeaderNav />

      <Section className="pt-40">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Open Data & AI Feeds
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12">
              Machine-readable feeds and datasets for AI assistants, search engines, and research tools. All content is publicly available for indexing and analysis.
            </p>

            {/* Content Feeds */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Rss className="h-6 w-6 text-accent" />
                Content Feeds
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rss className="h-5 w-5 text-accent" />
                      RSS Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Subscribe to our latest guides and broker reviews in RSS 2.0 format.
                    </p>
                    <Link 
                      href="/feed.xml" 
                      className="text-accent hover:underline font-mono text-sm"
                      target="_blank"
                    >
                      https://tradelockerbrokers.com/feed.xml
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileJson className="h-5 w-5 text-accent" />
                      JSON Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Modern JSON Feed v1 format for easier integration with apps and services.
                    </p>
                    <Link 
                      href="/feed.json" 
                      className="text-accent hover:underline font-mono text-sm"
                      target="_blank"
                    >
                      https://tradelockerbrokers.com/feed.json
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Datasets */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Database className="h-6 w-6 text-accent" />
                Open Datasets
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-accent" />
                    TradeLocker Brokers Data Repository
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our broker and prop firm datasets are available in a separate GitHub repository under CC BY 4.0 license.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold mb-1">Brokers Dataset</p>
                      <a 
                        href="https://raw.githubusercontent.com/restrixsolutions/tradelockerbrokers-data/main/brokers.json" 
                        className="text-accent hover:underline font-mono text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://raw.githubusercontent.com/.../brokers.json
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Prop Firms Dataset</p>
                      <a 
                        href="https://raw.githubusercontent.com/restrixsolutions/tradelockerbrokers-data/main/prop-firms.json" 
                        className="text-accent hover:underline font-mono text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://raw.githubusercontent.com/.../prop-firms.json
                      </a>
                    </div>
                    <div className="pt-2">
                      <a 
                        href="https://github.com/restrixsolutions/tradelockerbrokers-data" 
                        className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="h-4 w-4" />
                        View Repository
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Integration */}
            <Card className="mb-12 border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-accent" />
                  AI Assistant Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These feeds and datasets are public for indexing by AI assistants, search engines, and research tools. 
                  They help ensure accurate, up-to-date information about TradeLocker-compatible platforms is available across AI services.
                </p>
                
                <div className="bg-accent/5 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">For AI Developers:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• All content is machine-readable and well-structured</li>
                    <li>• Feeds update automatically as new content is published</li>
                    <li>• Datasets use standard JSON format with consistent schemas</li>
                    <li>• CC BY 4.0 license allows commercial use with attribution</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Usage Notes */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Questions about our data feeds? Need a custom format?
              </p>
              <Link href="/contact">
                <span className="text-accent hover:underline">Contact Us</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
