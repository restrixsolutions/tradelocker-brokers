import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, XCircle, Shield, Zap, DollarSign, Star } from "lucide-react"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Athens Markets Review 2025: Is Athens Markets Legit? Complete Broker Analysis",
  description:
    "Athens Markets broker review 2025: Is Athens Markets regulated? Analyze spreads, execution, TradeLocker integration & legitimacy. Read our complete review.",
  keywords: [
    "athens markets",
    "athens markets review",
    "is athens markets regulated",
    "athens markets broker",
    "athens markets forex",
    "athens markets minimum deposit",
    "athens markets trustpilot",
  ],
  openGraph: {
    title: "Athens Markets Review 2025 - Complete Broker Analysis",
    description: "Is Athens Markets legit? Full review of regulation, spreads, and TradeLocker integration.",
    type: "article",
    url: "https://tradelockerbrokers.com/athens-markets-review",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/athens-markets-review",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function AthensMarketsReviewPage() {
  const supabase = await getSupabaseServerClient()

  const { data: athensMarkets } = await supabase
    .from("brokers")
    .select("*")
    .ilike("name", "%Athens Markets%")
    .single()

  const { data: competitors } = await supabase
    .from("brokers")
    .select("id, name, logo, min_deposit, tags, affiliate_link")
    .neq("name", "Athens Markets")
    .limit(2)

  const broker = athensMarkets || {
    name: "Athens Markets",
    logo: "/images/logos/athens-markets.png",
    affiliate_link: "https://athensmarkets.com",
    min_deposit: 50,
    regulation: "Unregulated",
    country_established: "Saint Lucia",
    year_established: 2021,
  }

  const competitorBrokers = competitors || []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "FinancialService",
              name: "Athens Markets",
              description: "Forex and CFD broker offering TradeLocker platform",
              url: broker.affiliate_link,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4.2,
              bestRating: 5,
            },
            author: {
              "@type": "Organization",
              name: "TradeLocker Brokers",
            },
          }),
        }}
      />

      <Section className="pt-32 pb-12">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              {" > "}
              <Link href="/brokers" className="hover:text-foreground">
                Brokers
              </Link>
              {" > "}
              <span className="text-foreground">Athens Markets Review</span>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl border-2 border-border overflow-hidden bg-background">
                  <Image
                    src={broker.logo}
                    alt={broker.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Athens Markets Review 2025</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Is Athens Markets legit? Complete analysis of regulation, trading conditions, and TradeLocker platform integration.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    <Shield className="w-3 h-3 mr-1" />
                    {broker.regulation}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ${broker.min_deposit} Min Deposit
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Zap className="w-3 h-3 mr-1" />
                    TradeLocker
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Star className="w-3 h-3 mr-1" />
                    4.2/5 Rating
                  </Badge>
                </div>

                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Visit Athens Markets
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Quick Verdict</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Pros
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Competitive spreads</li>
                      <li>✓ Good TradeLocker integration</li>
                      <li>✓ Multiple asset classes</li>
                      <li>✓ Reasonable minimum deposit</li>
                      <li>✓ Fast execution speeds</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Cons
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✗ Unregulated broker</li>
                      <li>✗ Limited regulatory oversight</li>
                      <li>✗ Newer company</li>
                      <li>✗ Limited educational materials</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best For:</strong> Traders comfortable with unregulated brokers seeking competitive spreads and modern platform access.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="max-w-5xl mx-auto space-y-12">
            <div id="legitimacy">
              <h2 className="text-3xl font-bold mb-6">Is Athens Markets Regulated?</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg font-semibold text-yellow-600 mb-3">
                    ⚠️ Athens Markets operates as an unregulated broker
                  </p>
                  <p className="mb-4">
                    Athens Markets is based in {broker.country_established} and operates without regulatory oversight from major financial authorities. While the broker is functional, traders should understand the implications.
                  </p>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Important:</strong> Unregulated brokers lack client fund protection schemes and dispute resolution mechanisms. Exercise caution and only trade with funds you can afford to lose.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="costs">
              <h2 className="text-3xl font-bold mb-6">Trading Costs & Conditions</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4">${broker.min_deposit}</h3>
                      <p className="text-sm text-muted-foreground mb-4">Minimum Deposit</p>
                      <p className="text-sm">
                        Accessible entry point for most traders, balancing affordability with serious trading intent.
                      </p>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4">Competitive</h3>
                      <p className="text-sm text-muted-foreground mb-4">Spreads</p>
                      <p className="text-sm">
                        Athens Markets offers competitive spreads across major currency pairs and instruments.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Cost Structure:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Competitive spreads on major pairs</li>
                      <li>• Multiple account types available</li>
                      <li>• No hidden fees (verify with broker)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="platform">
              <h2 className="text-3xl font-bold mb-6">TradeLocker Platform</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    Athens Markets provides TradeLocker integration with good performance and reliability.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Platform Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Browser-based access</li>
                        <li>• Mobile trading support</li>
                        <li>• Advanced charting tools</li>
                        <li>• Fast execution</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Trading Tools:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Technical indicators</li>
                        <li>• Multiple order types</li>
                        <li>• Risk management</li>
                        <li>• Real-time data</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Trade with Athens Markets?</h3>
                <p className="text-muted-foreground mb-6">
                  Access competitive spreads and TradeLocker platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    asChild
                  >
                    <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                      Open Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/brokers">Compare Brokers</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {competitorBrokers.length > 0 && (
              <div id="comparison">
                <h2 className="text-3xl font-bold mb-6">Broker Comparison</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-accent/50">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex justify-center">
                        <Image
                          src={broker.logo}
                          alt={broker.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-center mb-3">{broker.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Min Deposit:</strong> ${broker.min_deposit}
                        </p>
                        <p>
                          <strong>Regulation:</strong> {broker.regulation}
                        </p>
                      </div>
                      <Button className="w-full mt-4" asChild>
                        <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                          Visit {broker.name}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {competitorBrokers.slice(0, 2).map((competitor) => (
                    <Card key={competitor.id}>
                      <CardContent className="pt-6">
                        <div className="mb-4 flex justify-center">
                          <Image
                            src={competitor.logo}
                            alt={competitor.name}
                            width={80}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <h3 className="font-semibold text-center mb-3">{competitor.name}</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Min Deposit:</strong> ${competitor.min_deposit}
                          </p>
                        </div>
                        <Button variant="outline" className="w-full mt-4" asChild>
                          <a href={competitor.affiliate_link} target="_blank" rel="noopener noreferrer">
                            View {competitor.name}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div id="faq">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((faq) => ({
                      "@type": "Question",
                      name: faq.question,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                      },
                    })),
                  }),
                }}
              />
            </div>

            <Card className="bg-gradient-to-br from-accent/10 via-background to-background border-accent/30">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Final Verdict</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Athens Markets offers competitive trading conditions with modern platform access. However, the lack of regulation remains a significant consideration for serious traders.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500/30 text-yellow-500" />
                  <span className="ml-2 font-semibold">4.2/5</span>
                </div>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Start Trading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Risk Warning: Trading involves significant risk.
                </p>
              </CardContent>
            </Card>

            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/blog/best-tradelocker-brokers-2025"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Best TradeLocker Brokers</h4>
                  <p className="text-sm text-muted-foreground">Compare top brokers</p>
                </Link>
                <Link
                  href="/blog/how-to-login-tradelocker"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">TradeLocker Login Guide</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step instructions</p>
                </Link>
                <Link
                  href="/brokers"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Broker Comparison</h4>
                  <p className="text-sm text-muted-foreground">Compare all brokers</p>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

const faqs = [
  {
    question: "Is Athens Markets regulated?",
    answer:
      "No, Athens Markets is not regulated by major financial authorities. The broker is based in Saint Lucia and operates without oversight from regulators like FCA, ASIC, or CySEC.",
  },
  {
    question: "What is Athens Markets minimum deposit?",
    answer:
      "Athens Markets minimum deposit is $50, offering a reasonable entry point for traders while maintaining accessibility for various trading styles and account sizes.",
  },
  {
    question: "Is Athens Markets legit?",
    answer:
      "Athens Markets is a functioning broker that processes trades and operates the TradeLocker platform. However, without regulation, traders should exercise caution and only deposit funds they can afford to risk.",
  },
  {
    question: "Does Athens Markets offer demo accounts?",
    answer:
      "Contact Athens Markets directly to inquire about demo account availability. Demo accounts are recommended for testing the platform before committing real capital.",
  },
  {
    question: "What platforms does Athens Markets support?",
    answer:
      "Athens Markets primarily offers the TradeLocker platform, which is a modern, browser-based trading interface accessible on desktop, web, and mobile devices.",
  },
]

