import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import Link from "next/link"
import { Download, FileText, Image, Mail } from "lucide-react"
import { SITE_URL, BRAND, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Press & Brand Assets – TradeLocker Brokers Media Kit",
  description:
    "Download TradeLocker Brokers logos, brand guidelines, and press materials. Get official information for media coverage and partnership opportunities.",
  keywords: ["TradeLocker Brokers press", "media kit", "brand assets", "logo download", "press information"],
  openGraph: {
    title: "Press & Brand Assets – TradeLocker Brokers",
    description: "Official media kit and brand resources for TradeLocker Brokers.",
    type: "website",
    url: absoluteUrl("/press"),
  },
  alternates: {
    canonical: absoluteUrl("/press"),
  },
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Press", url: absoluteUrl("/press") },
        ]}
      />
      <HeaderNav />

      <Section className="pt-40">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Press & Brand Assets
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12">
              Official brand resources and press information for {BRAND}. All assets are available for editorial use with proper attribution.
            </p>

            {/* Brand Boilerplate */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Brand Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Short Description (150 characters)</h3>
                  <p className="text-muted-foreground bg-accent/5 p-4 rounded-lg font-mono text-sm">
                    TradeLocker Brokers is the definitive directory for finding brokers and prop firms that support the TradeLocker trading platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Long Description (300 characters)</h3>
                  <p className="text-muted-foreground bg-accent/5 p-4 rounded-lg font-mono text-sm">
                    TradeLocker Brokers provides comprehensive comparisons of forex brokers and prop firms using the TradeLocker platform. Our directory helps traders find the perfect match based on spreads, execution speed, funding options, and regulatory compliance, with detailed reviews and real-time data updates.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Logo Downloads */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Logo Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center p-8">
                      <img
                        src="/tradelocker-logo.png"
                        alt="TradeLocker Brokers Logo"
                        className="max-h-32 w-auto"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" asChild>
                        <a href="/tradelocker-logo.png" download>
                          <Download className="h-4 w-4 mr-2" />
                          PNG
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        <Download className="h-4 w-4 mr-2" />
                        SVG (Coming Soon)
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="aspect-video bg-foreground rounded-lg flex items-center justify-center p-8">
                      <img
                        src="/tradelocker-logo.png"
                        alt="TradeLocker Brokers Logo (Dark)"
                        className="max-h-32 w-auto"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Logo on dark background
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-accent/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Usage Guidelines:</strong> Please maintain clear space around the logo equal to the height of the "T" in TradeLocker. Do not alter colors, proportions, or add effects. Minimum size: 120px width for digital, 1 inch for print.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Facts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="font-semibold">Founded</dt>
                    <dd className="text-muted-foreground">October 2025</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="font-semibold">Type</dt>
                    <dd className="text-muted-foreground">Trading Platform Directory</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="font-semibold">Coverage</dt>
                    <dd className="text-muted-foreground">20+ Brokers, 15+ Prop Firms</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="font-semibold">Focus</dt>
                    <dd className="text-muted-foreground">TradeLocker Platform Integration</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="font-semibold">Partnership</dt>
                    <dd className="text-muted-foreground">Co-partnered with Forex Prop Rank</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="font-semibold">Website</dt>
                    <dd className="text-muted-foreground">
                      <a href={SITE_URL} className="text-accent hover:underline">
                        tradelockerbrokers.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Press Releases */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Recent articles and mentions coming soon. Follow us on social media for the latest updates:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://medium.com/@forexproprank" target="_blank" rel="noopener noreferrer">
                        Medium
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.linkedin.com/in/forexproprank" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://twitter.com/forexproprank" target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Press Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For press inquiries, interview requests, or additional resources, please contact:
                </p>
                <a
                  href="mailto:forexproprank@gmail.com"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  <Mail className="h-4 w-4" />
                  forexproprank@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-4">
                  We typically respond to press inquiries within 24 hours.
                </p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/about">About Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
