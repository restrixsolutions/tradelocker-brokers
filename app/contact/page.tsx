import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import Link from "next/link"
import { Mail, MessageSquare, FileEdit, Bug, Lightbulb, Handshake } from "lucide-react"
import { SITE_URL, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact – Get in Touch with TradeLocker Brokers",
  description:
    "Contact TradeLocker Brokers for editorial inquiries, data corrections, partnership opportunities, or general questions about our platform directory.",
  keywords: ["contact TradeLocker Brokers", "trading platform support", "broker directory contact", "partnership inquiries"],
  openGraph: {
    title: "Contact TradeLocker Brokers",
    description: "Get in touch for inquiries, corrections, or partnership opportunities.",
    type: "website",
    url: absoluteUrl("/contact"),
  },
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: absoluteUrl("/contact") },
        ]}
      />
      <HeaderNav />

      <Section className="pt-32">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Contact Us
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12">
              We're here to help. Whether you have questions, suggestions, or partnership proposals, we'd love to hear from you.
            </p>

            {/* Primary Contact */}
            <Card className="mb-8 border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mail className="h-6 w-6 text-accent" />
                  Primary Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For all inquiries, please email us at:
                </p>
                <a
                  href="mailto:forexproprank@gmail.com"
                  className="inline-flex items-center gap-2 text-xl text-accent hover:underline font-medium"
                >
                  forexproprank@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-4">
                  We typically respond within 24-48 hours during business days.
                </p>
              </CardContent>
            </Card>

            {/* Contact Categories */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileEdit className="h-5 w-5" />
                    Editorial Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Submit broker/prop firm updates</li>
                    <li>• Request content corrections</li>
                    <li>• Suggest new features</li>
                    <li>• Report outdated information</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5" />
                    Partnership Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Broker listing requests</li>
                    <li>• Prop firm partnerships</li>
                    <li>• Content collaboration</li>
                    <li>• API access requests</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    Technical Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Report website bugs</li>
                    <li>• Data inconsistencies</li>
                    <li>• Broken links</li>
                    <li>• Mobile display issues</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    General Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• TradeLocker platform questions</li>
                    <li>• Broker recommendations</li>
                    <li>• Trading guidance</li>
                    <li>• Feature requests</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Editorial Guidelines */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Editorial Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When submitting information or corrections, please help us maintain accuracy by:
                </p>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="text-accent font-semibold">1.</span>
                    <p>Providing verifiable sources or official documentation</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-semibold">2.</span>
                    <p>Including specific details about what needs updating</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-semibold">3.</span>
                    <p>Sharing direct links to broker/prop firm official pages</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-semibold">4.</span>
                    <p>Noting any time-sensitive information or promotions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Response Times</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• General inquiries: 24-48 hours</li>
                      <li>• Data corrections: 1-3 business days</li>
                      <li>• Partnership proposals: 3-5 business days</li>
                      <li>• Technical issues: 24 hours</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">We Don't Provide</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Personal trading advice</li>
                      <li>• Investment recommendations</li>
                      <li>• Account management services</li>
                      <li>• Direct broker support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                You can also connect with us on social media:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://medium.com/@forexproprank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Medium
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://www.linkedin.com/in/forexproprank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://twitter.com/forexproprank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Twitter
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/about">
                <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-medium">About Us</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/press">
                <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-medium">Press Kit</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/how-to-use">
                <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-medium">Platform Guide</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
