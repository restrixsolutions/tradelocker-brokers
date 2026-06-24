import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import Link from "next/link"
import { FileText, Mail } from "lucide-react"
import { SITE_URL, BRAND, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Press & Company Info – TL Brokers",
  description:
    "Press and company information for TL Brokers, an independent broker and prop-firm comparison site. Contact us for media coverage and partnership opportunities.",
  keywords: ["TL Brokers press", "media kit", "company information", "press contact"],
  openGraph: {
    title: "Press & Company Info – TL Brokers",
    description: "Press and company information for TL Brokers.",
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
              Press & Company Info
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12">
              Press and company information for {BRAND}, an independent broker and prop-firm comparison site.
            </p>

            {/* Brand Boilerplate */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  About TL Brokers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Short Description</h3>
                  <p className="text-muted-foreground bg-accent/5 p-4 rounded-lg font-mono text-sm">
                    TL Brokers is an independent comparison site for brokers and prop firms that support the TradeLocker trading platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Long Description</h3>
                  <p className="text-muted-foreground bg-accent/5 p-4 rounded-lg font-mono text-sm">
                    TL Brokers provides independent comparisons of forex brokers and prop firms that support the TradeLocker platform. We help traders compare spreads, execution speed, funding options, and regulatory compliance. TL Brokers is not affiliated with, endorsed by, or operated by TradeLocker Limited.
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
                  href="mailto:tradelockerbroker@gmail.com"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  <Mail className="h-4 w-4" />
                  tradelockerbroker@gmail.com
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
