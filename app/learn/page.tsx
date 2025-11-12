import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Video, FileText } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Learn About TradeLocker - Platform Education & Tutorials",
  description:
    "Educational resources about TradeLocker platform. Learn how to use the software, understand its features, and access comprehensive guides and tutorials for this modern trading platform.",
  keywords: ["TradeLocker tutorial", "trading platform education", "how to use TradeLocker", "platform guide", "trading software tutorial"],
  openGraph: {
    title: "Learn About TradeLocker Platform",
    description: "Educational resources and tutorials for understanding TradeLocker platform software.",
    type: "website",
    url: "https://tradelockerbrokers.com/learn",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/learn",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      {/* Hero Section */}
      <Section className="pt-40 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Learn About TradeLocker
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Free educational resources to help you understand and use the TradeLocker platform effectively.
              Explore tutorials, guides, and documentation about this modern browser-based software.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
              <CardContent className="pt-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
                <p className="text-muted-foreground mb-4">
                  New to TradeLocker? Start here with basic introduction to the platform.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/blog/how-to-use-tradelocker-quick-guide">
                    Read Guide
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
              <CardContent className="pt-8 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Platform Features</h3>
                <p className="text-muted-foreground mb-4">
                  Understand TradeLocker's capabilities and tools available in the software.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/platform">
                    Explore Features
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
              <CardContent className="pt-8 text-center">
                <Video className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Tutorials</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step instructions for common platform tasks and features.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/how-to-use">
                    View Tutorials
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* What You'll Learn Section */}
      <Section className="py-20 bg-muted/30">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What You'll Learn</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Platform Basics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Understanding the TradeLocker interface and navigation</li>
                  <li>• How to access the platform through web browsers</li>
                  <li>• Setting up your workspace and customizing layouts</li>
                  <li>• Using the mobile app vs web browser version</li>
                  <li>• System requirements and compatibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Technical Analysis Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Charting features and customization options</li>
                  <li>• Available technical indicators and how to apply them</li>
                  <li>• Drawing tools and chart annotation features</li>
                  <li>• Setting up multiple timeframes and chart types</li>
                  <li>• Saving and loading custom chart templates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Platform Navigation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Account login and authentication process</li>
                  <li>• Dashboard overview and main menu features</li>
                  <li>• Watchlist management and market searching</li>
                  <li>• Account settings and preferences</li>
                  <li>• Notification and alert configurations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Software Capabilities</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time data streaming and price updates</li>
                  <li>• Order management panel features</li>
                  <li>• Account history and reporting tools</li>
                  <li>• Risk management calculator features</li>
                  <li>• Platform performance optimization tips</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Educational Articles Section */}
      <Section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Popular Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">How to Login to TradeLocker</h3>
                <p className="text-muted-foreground mb-4">
                  Complete guide to accessing your TradeLocker account through web and mobile platforms.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/how-to-login-tradelocker">
                    Read Tutorial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Complete TradeLocker Guide</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive overview of all platform features and how to use them effectively.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/how-to-use-tradelocker-quick-guide">
                    Read Tutorial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Understanding TradeLocker Features</h3>
                <p className="text-muted-foreground mb-4">
                  Deep dive into the platform's technical specifications and capabilities.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/platform">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">TradeLocker vs Other Platforms</h3>
                <p className="text-muted-foreground mb-4">
                  Compare TradeLocker's software architecture with traditional desktop platforms.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/best-tradelocker-brokers-2025">
                    Read Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* About TradeLocker Section */}
      <Section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About TradeLocker Software</h2>
            <Card>
              <CardContent className="pt-6 space-y-4 text-left">
                <p className="text-lg text-muted-foreground">
                  TradeLocker is a modern, cloud-based trading platform software designed for financial market access. Unlike traditional desktop applications, TradeLocker operates entirely through web browsers, making it accessible from any device without downloads.
                </p>
                <p className="text-lg text-muted-foreground">
                  The platform emphasizes user experience with a clean, intuitive interface while maintaining professional-grade functionality. It supports real-time data streaming, advanced charting tools, and comprehensive order management systems.
                </p>
                <p className="text-lg text-muted-foreground">
                  TradeLocker is available through various financial service providers who license the software as a white-label solution. Each provider may configure the platform differently, but the core technology and interface remain consistent.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Container>
          <Card className="bg-gradient-to-br from-accent/10 via-background to-background border-accent/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Learning Today</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Access our complete library of TradeLocker tutorials, guides, and educational resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link href="/how-to-use">
                    View All Tutorials
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/blog">
                    Browse Articles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

