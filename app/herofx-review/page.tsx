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
  title: "HeroFX Review 2026: Is HeroFX Legit? Complete Broker Analysis",
  description:
    "HeroFX broker review 2025: Is HeroFX regulated? Discover spreads, execution speed, TradeLocker integration & legitimacy. Is HeroFX a good broker? Read our review.",
  keywords: [
    "herofx",
    "herofx review",
    "is herofx a good broker",
    "herofx broker review",
    "herofx demo",
    "herofx regulation",
    "herofx minimum deposit",
    "herofx forex broker",
    "herofx trustpilot",
  ],
  openGraph: {
    title: "HeroFX Review 2026 - Complete Broker Analysis",
    description: "Is HeroFX legit? Complete review of regulation, spreads, and TradeLocker integration.",
    type: "article",
    url: "https://tradelockerbrokers.com/herofx-review",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/herofx-review",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function HeroFXReviewPage() {
  const supabase = await getSupabaseServerClient()

  // Fetch HeroFX data from database
  const { data: herofx } = await supabase
    .from("brokers")
    .select("*")
    .ilike("name", "%HeroFX%")
    .single()

  // Fetch comparison brokers
  const { data: competitors } = await supabase
    .from("brokers")
    .select("id, name, logo, min_deposit, tags, affiliate_link")
    .neq("name", "HeroFX")
    .limit(2)

  const broker = herofx || {
    name: "HeroFX",
    logo: "/images/logos/herofx.png",
    affiliate_link: "https://herofx.com",
    min_deposit: 5,
    regulation: "Unregulated",
    country_established: "St. Lucia",
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
              name: "HeroFX",
              description: "Forex and CFD broker offering TradeLocker platform with low minimum deposit",
              url: broker.affiliate_link,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4.3,
              bestRating: 5,
            },
            author: {
              "@type": "Organization",
              name: "TradeLocker Brokers",
            },
            publisher: {
              "@type": "Organization",
              name: "TradeLocker Brokers",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              {" > "}
              <Link href="/brokers" className="hover:text-foreground">
                Brokers
              </Link>
              {" > "}
              <span className="text-foreground">HeroFX Review</span>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
              {/* Logo */}
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

              {/* Title & Quick Info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">HeroFX Review 2026</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Is HeroFX a good broker? Complete analysis of features, spreads, and TradeLocker platform integration.
                </p>

                {/* Quick Stats */}
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
                    4.3/5 Rating
                  </Badge>
                </div>

                {/* Primary CTA */}
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Visit HeroFX
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Verdict */}
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
                      <li>✓ Extremely low minimum deposit ($5)</li>
                      <li>✓ Fast execution speeds</li>
                      <li>✓ Excellent TradeLocker integration</li>
                      <li>✓ No deposit or withdrawal fees</li>
                      <li>✓ Demo account available</li>
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
                      <li>✗ Newer company (founded 2021)</li>
                      <li>✗ Limited educational resources</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best For:</strong> Beginner traders seeking low entry barriers and experienced traders wanting a secondary account for testing strategies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-12">
        <Container>
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Is HeroFX Legit? */}
            <div id="legitimacy">
              <h2 className="text-3xl font-bold mb-6">Is HeroFX Legit or a Scam?</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-yellow-600 mb-3">
                      ⚠️ HeroFX operates as an unregulated broker
                    </p>
                    <p className="mb-4">
                      HeroFX is based in {broker.country_established} and operates without regulatory oversight from major financial authorities. While the broker functions and processes withdrawals, traders should understand the implications of using an unregulated platform.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">✓ Positive Indicators</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Functional trading platform</li>
                        <li>• Processes withdrawals</li>
                        <li>• Active customer support</li>
                        <li>• Transparent fee structure</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">⚠️ Risk Factors</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• No regulatory oversight</li>
                        <li>• Limited client fund protection</li>
                        <li>• No compensation schemes</li>
                        <li>• Dispute resolution limited</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Important:</strong> Unregulated brokers carry higher risks. Only trade with funds you can afford to lose. Consider regulated alternatives for larger capital deployments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Is HeroFX a Good Broker? */}
            <div id="analysis">
              <h2 className="text-3xl font-bold mb-6">Is HeroFX a Good Broker?</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    HeroFX excels in specific areas while having notable limitations. Here's the breakdown:
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold mb-2">Excellent Low Entry Point</h4>
                      <p className="text-sm text-muted-foreground">
                        With a $5 minimum deposit, HeroFX offers one of the lowest barriers to entry in the industry. Perfect for beginners testing live trading or experienced traders wanting a secondary account.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold mb-2">Strong Platform Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        The TradeLocker integration is smooth with fast execution speeds. The platform is reliable for both scalping and swing trading strategies.
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold mb-2">Regulation Concerns</h4>
                      <p className="text-sm text-muted-foreground">
                        The lack of regulation is the main drawback. Traders should be cautious with larger deposits and understand they have limited recourse in case of disputes.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-accent/5 rounded-lg">
                    <p className="text-sm">
                      <strong>Verdict:</strong> HeroFX is suitable for small account traders and testing strategies, but not recommended as a primary broker for serious capital. Overall rating: <strong>4.3/5</strong> for its target audience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Costs */}
            <div id="costs">
              <h2 className="text-3xl font-bold mb-6">Trading Costs & Minimum Deposit</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-green-600">${broker.min_deposit}</h3>
                      <p className="text-sm text-muted-foreground mb-4">Minimum Deposit</p>
                      <p className="text-sm">
                        One of the lowest minimum deposits in the industry. Start trading with just $5, making HeroFX extremely accessible for beginners.
                      </p>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4">Competitive</h3>
                      <p className="text-sm text-muted-foreground mb-4">Spreads & Fees</p>
                      <p className="text-sm">
                        No deposit fees, no withdrawal fees, and competitive spreads. Low-cost structure ideal for frequent traders.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Fee Structure:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Deposit Fees: Free</li>
                      <li>• Withdrawal Fees: Free</li>
                      <li>• Inactivity Fee: None</li>
                      <li>• Spreads: Competitive (varies by instrument)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* TradeLocker Integration */}
            <div id="platform">
              <h2 className="text-3xl font-bold mb-6">TradeLocker Platform Integration</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    HeroFX provides solid TradeLocker integration with fast execution and reliable platform performance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Performance:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Fast execution speeds</li>
                        <li>• Minimal slippage</li>
                        <li>• 99%+ uptime</li>
                        <li>• Mobile & web support</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Advanced charting</li>
                        <li>• One-click trading</li>
                        <li>• Multiple order types</li>
                        <li>• Risk management tools</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Trading with HeroFX?</h3>
                <p className="text-muted-foreground mb-6">
                  Open an account with just $5 and access TradeLocker platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    asChild
                  >
                    <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                      Open HeroFX Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/brokers">Compare Other Brokers</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Section */}
            {competitorBrokers.length > 0 && (
              <div id="comparison">
                <h2 className="text-3xl font-bold mb-6">How HeroFX Compares</h2>
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
                          <p>
                            <strong>Features:</strong> {competitor.tags?.[0] || "TradeLocker"}
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

            {/* FAQ Section */}
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

              {/* FAQ Schema */}
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

            {/* Final Verdict */}
            <Card className="bg-gradient-to-br from-accent/10 via-background to-background border-accent/30">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Final Verdict: Is HeroFX a Good Broker?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  HeroFX is a solid choice for beginners and traders with small accounts. The $5 minimum deposit and no-fee structure make it highly accessible. However, the lack of regulation means it's best suited for smaller trading amounts rather than serious capital deployment.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500/30 text-yellow-500" />
                  <span className="ml-2 font-semibold">4.3/5</span>
                </div>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Start Trading with HeroFX
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Risk Warning: Trading involves significant risk. Only trade with funds you can afford to lose.
                </p>
              </CardContent>
            </Card>

            {/* Related Content */}
            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/blog/best-tradelocker-brokers-2025"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Best TradeLocker Brokers 2025</h4>
                  <p className="text-sm text-muted-foreground">Compare top TradeLocker brokers</p>
                </Link>
                <Link
                  href="/blog/how-to-login-tradelocker"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">How to Login to TradeLocker</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step login guide</p>
                </Link>
                <Link
                  href="/brokers"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Broker Comparison Tool</h4>
                  <p className="text-sm text-muted-foreground">Compare all TradeLocker brokers</p>
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

// FAQ Data
const faqs = [
  {
    question: "Is HeroFX a good broker?",
    answer:
      "HeroFX is a good broker for beginners and small account traders, offering a $5 minimum deposit, fast execution, and excellent TradeLocker integration. However, it operates as an unregulated broker, which limits its appeal for larger capital deployments. Overall rating: 4.3/5 for its target audience.",
  },
  {
    question: "Is HeroFX regulated?",
    answer:
      "No, HeroFX is not regulated by major financial authorities. The broker is based in Saint Lucia and operates without oversight from regulators like FCA, ASIC, or CySEC. Traders should understand the risks of using an unregulated broker.",
  },
  {
    question: "What is HeroFX minimum deposit?",
    answer:
      "HeroFX minimum deposit is just $5, one of the lowest in the industry. This makes it extremely accessible for beginners wanting to start live trading with minimal capital or experienced traders testing strategies.",
  },
  {
    question: "Is HeroFX safe?",
    answer:
      "HeroFX operates and processes withdrawals, but without regulation, there's limited client fund protection. The broker is best suited for small trading amounts. For serious capital, consider regulated alternatives with proper oversight and compensation schemes.",
  },
  {
    question: "Does HeroFX have a demo account?",
    answer:
      "Yes, HeroFX offers demo accounts for traders to practice and test the TradeLocker platform without risking real money. This is highly recommended before funding a live account.",
  },
  {
    question: "What are HeroFX trading fees?",
    answer:
      "HeroFX has no deposit fees, no withdrawal fees, and no inactivity fees. Trading costs come from spreads, which are competitive across major instruments. This low-fee structure is beneficial for active traders.",
  },
  {
    question: "How fast are HeroFX withdrawals?",
    answer:
      "HeroFX typically processes withdrawal requests within 24-48 hours. The actual time to receive funds depends on your payment method, with e-wallets being fastest and bank transfers taking 1-3 additional business days.",
  },
  {
    question: "Does HeroFX accept US clients?",
    answer:
      "No, HeroFX does not accept clients from the United States due to regulatory restrictions. The broker is available to traders from most other countries.",
  },
  {
    question: "Is HeroFX legit or a scam?",
    answer:
      "HeroFX is a functioning broker that processes trades and withdrawals. While unregulated, it's not a scam. However, traders should be cautious with larger deposits due to the lack of regulatory protection and limited recourse in case of disputes.",
  },
  {
    question: "What platforms does HeroFX offer?",
    answer:
      "HeroFX primarily offers TradeLocker platform, which is a modern, browser-based trading interface. The platform is accessible on web, desktop, and mobile devices (iOS and Android) with full functionality.",
  },
]

