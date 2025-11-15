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
  title: "Clarity FX Review 2025: Is Clarity FX Legit? Complete Broker Analysis",
  description:
    "Clarity FX broker review 2025: Analyze spreads, execution, TradeLocker integration & regulation. Is Clarity FX a good broker? Read our complete review.",
  keywords: [
    "clarity fx",
    "clarity fx review",
    "clarity fx broker",
    "clarity fx forex",
    "clarity fx minimum deposit",
    "is clarity fx legit",
  ],
  openGraph: {
    title: "Clarity FX Review 2025 - Complete Broker Analysis",
    description: "Is Clarity FX legit? Complete review of spreads and TradeLocker integration.",
    type: "article",
    url: "https://tradelockerbrokers.com/clarity-fx-review",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/clarity-fx-review",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ClarityFXReviewPage() {
  const supabase = await getSupabaseServerClient()

  const { data: clarityFx } = await supabase
    .from("brokers")
    .select("*")
    .ilike("name", "%Clarity FX%")
    .single()

  const { data: competitors } = await supabase
    .from("brokers")
    .select("id, name, logo, min_deposit, tags, affiliate_link")
    .neq("name", "Clarity FX")
    .limit(2)

  const broker = clarityFx || {
    name: "Clarity FX",
    logo: "/images/logos/clarity-fx.png",
    affiliate_link: "https://clarityfx.com",
    min_deposit: 10,
    regulation: "Unregulated",
    country_established: "Saint Lucia",
    year_established: 2024,
  }

  const competitorBrokers = competitors || []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "FinancialService",
              name: "Clarity FX",
              description: "Forex broker offering TradeLocker platform with low minimum deposit",
              url: broker.affiliate_link,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4.0,
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
              <span className="text-foreground">Clarity FX Review</span>
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Clarity FX Review 2025</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Is Clarity FX legit? Complete analysis of this new TradeLocker broker's features and trading conditions.
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
                    4.0/5 Rating
                  </Badge>
                </div>

                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Visit Clarity FX
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
                      <li>✓ Very low minimum deposit ($10)</li>
                      <li>✓ Modern TradeLocker platform</li>
                      <li>✓ Simple account setup</li>
                      <li>✓ Competitive trading conditions</li>
                      <li>✓ Mobile trading support</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Cons
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✗ Unregulated broker</li>
                      <li>✗ Very new company (2024)</li>
                      <li>✗ Limited track record</li>
                      <li>✗ No regulatory protection</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best For:</strong> Traders seeking ultra-low entry points with modern platform access, comfortable with unregulated brokers.
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
              <h2 className="text-3xl font-bold mb-6">Is Clarity FX Legit?</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg font-semibold text-yellow-600 mb-3">
                    ⚠️ Clarity FX is a new, unregulated broker (Founded {broker.year_established})
                  </p>
                  <p className="mb-4">
                    Clarity FX launched in 2024, making it an extremely new entrant to the forex market. Based in {broker.country_established}, the broker operates without regulatory oversight. The limited track record requires extra caution from traders.
                  </p>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Caution:</strong> New, unregulated brokers carry higher risks. Start with minimal deposits and verify withdrawal capabilities before committing significant capital.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="costs">
              <h2 className="text-3xl font-bold mb-6">Minimum Deposit & Costs</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-green-600">${broker.min_deposit}</h3>
                      <p className="text-sm text-muted-foreground mb-4">Minimum Deposit</p>
                      <p className="text-sm">
                        One of the lowest minimum deposits available, perfect for absolute beginners or testing the platform.
                      </p>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4">Low Cost</h3>
                      <p className="text-sm text-muted-foreground mb-4">Trading Structure</p>
                      <p className="text-sm">
                        Clarity FX aims to provide competitive spreads and transparent fee structures for traders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="platform">
              <h2 className="text-3xl font-bold mb-6">TradeLocker Platform</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    Clarity FX offers TradeLocker, a modern browser-based trading platform with mobile support.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Platform Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Browser-based trading</li>
                        <li>• Mobile app support</li>
                        <li>• Modern interface</li>
                        <li>• Real-time charts</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Trading Tools:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Technical indicators</li>
                        <li>• Multiple order types</li>
                        <li>• Risk management</li>
                        <li>• Fast execution</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Try Clarity FX?</h3>
                <p className="text-muted-foreground mb-6">
                  Start with just $10 and access modern TradeLocker platform.
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
                          <strong>Founded:</strong> {broker.year_established}
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
                  Clarity FX offers an ultra-low entry point for traders, but the lack of regulation and very limited track record require extreme caution. Best for minimal testing rather than serious trading.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-muted text-muted" />
                  <span className="ml-2 font-semibold">4.0/5</span>
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
                  <h4 className="font-semibold mb-2">TradeLocker Login</h4>
                  <p className="text-sm text-muted-foreground">Login guide</p>
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
    question: "Is Clarity FX legit?",
    answer:
      "Clarity FX is a new broker launched in 2024. While it's a functioning platform, the extremely limited track record and lack of regulation require caution. Start with minimal deposits to test the service.",
  },
  {
    question: "What is Clarity FX minimum deposit?",
    answer:
      "Clarity FX minimum deposit is just $10, making it one of the most accessible brokers for beginners or traders wanting to test the platform with minimal risk.",
  },
  {
    question: "Is Clarity FX regulated?",
    answer:
      "No, Clarity FX is not regulated by major financial authorities. The broker operates from Saint Lucia without regulatory oversight.",
  },
  {
    question: "Does Clarity FX support TradeLocker?",
    answer:
      "Yes, Clarity FX offers the TradeLocker platform for trading, providing modern browser-based and mobile trading capabilities.",
  },
]

