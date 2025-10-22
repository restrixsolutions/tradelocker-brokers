import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { BreadcrumbJsonLd, AboutPageJsonLd } from "@/components/json-ld"
import Link from "next/link"
import { Mail, FileText, MessageSquare } from "lucide-react"
import { SITE_URL, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About TradeLocker Brokers – Your Trusted Trading Platform Directory",
  description:
    "Learn about TradeLocker Brokers, the definitive directory for brokers and prop firms using the TradeLocker platform. Our mission, editorial policy, and commitment to traders.",
  keywords: ["about TradeLocker Brokers", "trading platform directory", "forex broker comparison", "prop firm directory"],
  openGraph: {
    title: "About TradeLocker Brokers",
    description: "Your trusted source for TradeLocker-compatible brokers and prop firms since 2025.",
    type: "website",
    url: absoluteUrl("/about"),
  },
  alternates: {
    canonical: absoluteUrl("/about"),
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "About", url: absoluteUrl("/about") },
        ]}
      />
      <AboutPageJsonLd />
      <HeaderNav />

      <Section className="pt-32">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              About TradeLocker Brokers
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                TradeLocker Brokers is the definitive directory for traders seeking brokers and prop firms that support the TradeLocker trading platform. We provide comprehensive, unbiased comparisons to help traders make informed decisions.
              </p>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    Founded in October 2025, TradeLocker Brokers emerged from a simple observation: traders struggled to find reliable information about which brokers and prop firms supported the innovative TradeLocker platform. Our mission is to bridge this gap by providing accurate, up-to-date information that empowers traders to choose the right partner for their trading journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">What We Do</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We maintain a comprehensive database of brokers and prop firms that integrate with TradeLocker, providing traders with:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li>• Detailed comparisons of spreads, execution speeds, and trading conditions</li>
                      <li>• Transparent information about fees, regulations, and account types</li>
                      <li>• Real-world insights into platform features and user experience</li>
                      <li>• Educational content to help traders maximize their use of TradeLocker</li>
                      <li>• Regular updates as new brokers adopt the platform</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Editorial Policy</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong>Independence:</strong> While we may receive affiliate commissions from some brokers, our reviews and rankings are based solely on objective criteria. Commission structures never influence our editorial content or ratings.
                    </p>
                    <p>
                      <strong>Accuracy:</strong> All information is verified directly with brokers and updated regularly. We test platforms personally and cross-reference all claims before publication.
                    </p>
                    <p>
                      <strong>Transparency:</strong> We clearly disclose affiliate relationships and maintain complete editorial independence. Our readers' trust is our most valuable asset.
                    </p>
                    <p>
                      <strong>User-First:</strong> Every piece of content is created with the trader's best interests in mind. We prioritize helpful, actionable information over promotional content.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Our Partnership</h2>
                  <p className="text-muted-foreground">
                    TradeLocker Brokers operates in partnership with <a href="https://forexpotrank.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Forex Prop Rank</a>, leveraging shared expertise in the trading industry to provide comprehensive resources for both retail and funded traders.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Link href="/press">
                  <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                      <FileText className="h-8 w-8 text-accent mb-3" />
                      <h3 className="text-xl font-semibold mb-2">Press & Brand</h3>
                      <p className="text-muted-foreground">
                        Media kit, brand assets, and press information for journalists.
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/how-to-use">
                  <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                      <MessageSquare className="h-8 w-8 text-accent mb-3" />
                      <h3 className="text-xl font-semibold mb-2">Platform Guide</h3>
                      <p className="text-muted-foreground">
                        Learn how to use TradeLocker effectively with our comprehensive guide.
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/contact">
                  <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                      <Mail className="h-8 w-8 text-accent mb-3" />
                      <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                      <p className="text-muted-foreground">
                        Get in touch for inquiries, suggestions, or partnership opportunities.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="mt-12 p-6 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Contact:</strong> For editorial inquiries, data corrections, or partnership opportunities, please reach out to{" "}
                  <a href="mailto:forexproprank@gmail.com" className="text-accent hover:underline">
                    forexproprank@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
