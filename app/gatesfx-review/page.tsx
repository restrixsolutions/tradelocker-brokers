import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, XCircle, Shield, Zap, DollarSign, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata: Metadata = {
  title: "GatesFX Review 2026: Is GatesFX Legit? Spreads, Regulation & Platform",
  description:
    "GatesFX broker review 2025: Is GatesFX regulated? Analyze 0.0 pip spreads, FSCA oversight, TradeLocker integration & real trader feedback. Is GatesFX a good broker?",
  keywords: [
    "gatesfx",
    "gatesfx review",
    "is gatesfx legit",
    "gatesfx broker review",
    "is gatesfx a good broker",
    "is gatesfx regulated",
    "gatesfx forex broker",
    "gatesfx spreads",
    "gatesfx minimum deposit",
  ],
  openGraph: {
    title: "GatesFX Review 2026 - Complete Broker Analysis",
    description: "Is GatesFX legit? In-depth review of regulation, spreads, and TradeLocker integration.",
    type: "article",
    url: "https://tradelockerbrokers.com/gatesfx-review",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/gatesfx-review",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function GatesFXReviewPage() {
  const supabase = await getSupabaseServerClient()

  // Fetch GatesFX data from database
  const { data: gatesfx } = await supabase
    .from("brokers")
    .select("*")
    .ilike("name", "%GatesFX%")
    .single()

  // Fetch comparison brokers
  const { data: competitors } = await supabase
    .from("brokers")
    .select("id, name, logo, min_deposit, tags, affiliate_link")
    .neq("name", "GatesFX")
    .limit(2)

  const broker = gatesfx || {
    name: "GatesFX",
    logo: "/images/logos/gatesfx.png",
    affiliate_link: "https://gatesfx.com",
    min_deposit: 100,
    regulation: "FSCA Regulated",
    country_established: "South Africa",
    year_established: 2015,
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
              name: "GatesFX",
              description: "Forex and CFD broker offering TradeLocker platform",
              url: broker.affiliate_link,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4.5,
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
              <span className="text-foreground">GatesFX Review</span>
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">GatesFX Review 2026</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Is GatesFX legit? Complete analysis of regulation, spreads, and TradeLocker integration.
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
                    4.5/5 Rating
                  </Badge>
                </div>

                {/* Primary CTA */}
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Visit GatesFX
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
                      <li>✓ Ultra-low spreads from 0.0 pips</li>
                      <li>✓ Fast execution under 50ms</li>
                      <li>✓ FSCA regulated broker</li>
                      <li>✓ Excellent TradeLocker integration</li>
                      <li>✓ 24/7 customer support</li>
                      <li>✓ <strong>NEW:</strong> Instant card deposits (Visa/Mastercard)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Cons
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✗ Limited educational resources</li>
                      <li>✗ Withdrawal fees on some methods</li>
                      <li>✗ Higher minimum than some competitors</li>
                      <li>✗ Spreads widen during high volatility</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best For:</strong> Scalpers, day traders, and experienced traders seeking low spreads and
                    fast execution with TradeLocker.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Main Content Sections */}
      <Section className="py-12">
        <Container>
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Is GatesFX Regulated? */}
            <div id="regulation">
              <h2 className="text-3xl font-bold mb-6">Is GatesFX Regulated?</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    <strong>Yes, GatesFX is regulated by the FSCA</strong> (Financial Sector Conduct Authority) in
                    South Africa. Founded in {broker.year_established} and headquartered in {broker.country_established}
                    , GatesFX operates under proper regulatory oversight.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2">Regulatory Protection:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Segregated client accounts</li>
                      <li>• Negative balance protection</li>
                      <li>• Regular regulatory audits</li>
                      <li>• Transparent fee structure</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> While FSCA is not a Tier-1 regulator like FCA or ASIC, it maintains solid
                    oversight standards for broker operations and client fund protection.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Is GatesFX Legit? */}
            <div id="legitimacy">
              <h2 className="text-3xl font-bold mb-6">Is GatesFX Legit or a Scam?</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-green-600 mb-3">
                      ✓ GatesFX is a legitimate, regulated broker
                    </p>
                    <p className="mb-4">
                      Based on our analysis, GatesFX is <strong>not a scam</strong>. The broker demonstrates multiple
                      trust indicators:
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <Shield className="w-8 h-8 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">Regulated</h4>
                      <p className="text-sm text-muted-foreground">FSCA oversight & licensing</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <Zap className="w-8 h-8 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">Functional Platform</h4>
                      <p className="text-sm text-muted-foreground">Working TradeLocker integration</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <TrendingUp className="w-8 h-8 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">User Feedback</h4>
                      <p className="text-sm text-muted-foreground">Positive trader reviews</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Risk Warning:</strong> Trading forex and CFDs involves significant risk. Only trade with
                      money you can afford to lose.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Costs */}
            <div id="costs">
              <h2 className="text-3xl font-bold mb-6">Trading Costs & Spreads</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-6">
                    GatesFX offers competitive pricing across multiple account types. Here's a breakdown of their trading
                    costs:
                  </p>

                  {/* Account Types Comparison */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Standard Account</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Min Deposit:</strong> $100
                        </p>
                        <p>
                          <strong>Spreads:</strong> From 1.2 pips
                        </p>
                        <p>
                          <strong>Commission:</strong> $0
                        </p>
                        <p className="text-muted-foreground">Best for beginners</p>
                      </div>
                    </div>
                    <div className="border-2 border-accent rounded-lg p-4 relative">
                      <Badge className="absolute -top-3 left-4">Popular</Badge>
                      <h3 className="font-semibold mb-2">ECN Account</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Min Deposit:</strong> $500
                        </p>
                        <p>
                          <strong>Spreads:</strong> From 0.0 pips
                        </p>
                        <p>
                          <strong>Commission:</strong> $7/lot
                        </p>
                        <p className="text-muted-foreground">Best for scalpers</p>
                      </div>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">VIP Account</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Min Deposit:</strong> $2,500
                        </p>
                        <p>
                          <strong>Spreads:</strong> From 0.0 pips
                        </p>
                        <p>
                          <strong>Commission:</strong> $5/lot
                        </p>
                        <p className="text-muted-foreground">Best pricing + support</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">Additional Fees:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Deposit Fees: Free (most methods)</li>
                      <li>• Withdrawal Fees: Free for bank transfer, varies for e-wallets</li>
                      <li>• Inactivity Fee: $10/month after 6 months</li>
                    </ul>
                  </div>

                  {/* Card Deposits Announcement */}
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      NEW: Instant Card Deposits
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      GatesFX now accepts Visa and Mastercard deposits! Fund your account in under 60 seconds.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Minimum deposit: $25</li>
                      <li>• Maximum deposit: $5,000</li>
                      <li>• Processing time: Under 60 seconds</li>
                      <li>• Supported cards: Visa, Mastercard (Credit & Debit)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* TradeLocker Integration */}
            <div id="platform">
              <h2 className="text-3xl font-bold mb-6">TradeLocker Integration Quality</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    GatesFX offers excellent TradeLocker integration with fast execution and reliable performance. The
                    platform is accessible via web browser and mobile apps.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Performance Metrics:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Execution Speed: Under 50ms average</li>
                        <li>• Uptime: 99.9% reliability</li>
                        <li>• Slippage: Minimal on major pairs</li>
                        <li>• Mobile Support: iOS & Android</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Available Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 100+ technical indicators</li>
                        <li>• One-click trading</li>
                        <li>• Advanced order types</li>
                        <li>• Multi-device sync</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Trade with GatesFX?</h3>
                <p className="text-muted-foreground mb-6">
                  Open an account and access ultra-low spreads with TradeLocker platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    asChild
                  >
                    <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                      Open GatesFX Account
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
                <h2 className="text-3xl font-bold mb-6">How GatesFX Compares</h2>
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
                          <strong>Spreads:</strong> From 0.0 pips
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

            {/* FAQ Section with Schema */}
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

            {/* Final CTA */}
            <Card className="bg-gradient-to-br from-accent/10 via-background to-background border-accent/30">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Final Verdict: Is GatesFX a Good Broker?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Yes, GatesFX is a solid choice for active traders and scalpers. With ultra-low spreads, fast
                  execution, FSCA regulation, and excellent TradeLocker integration, GatesFX delivers on its promise of
                  institutional-grade trading.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500/50 text-yellow-500" />
                  <span className="ml-2 font-semibold">4.5/5</span>
                </div>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Start Trading with GatesFX
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
    question: "Is GatesFX regulated?",
    answer:
      "Yes, GatesFX is regulated by the FSCA (Financial Sector Conduct Authority) in South Africa. The broker operates under proper licensing with client fund protection measures including segregated accounts and negative balance protection.",
  },
  {
    question: "Is GatesFX legit or a scam?",
    answer:
      "GatesFX is a legitimate, regulated broker. It demonstrates multiple trust indicators including FSCA regulation, functional platform integration, reliable execution, and positive user feedback from traders.",
  },
  {
    question: "What is GatesFX minimum deposit?",
    answer:
      "GatesFX minimum deposit is $100 for Standard accounts, $500 for ECN accounts, and $2,500 for VIP accounts offering the best pricing and dedicated support.",
  },
  {
    question: "Is GatesFX a good broker?",
    answer:
      "Yes, GatesFX is a good broker, especially for active traders and scalpers. It excels at low spreads (0.0 pips on ECN), fast execution (under 50ms), excellent TradeLocker integration, and 24/7 customer support. Overall rating: 4.5/5.",
  },
  {
    question: "What spreads does GatesFX offer?",
    answer:
      "Standard accounts have spreads from 1.2 pips on EUR/USD. ECN and VIP accounts offer raw spreads from 0.0 pips plus commission ($7 and $5 per lot respectively), making GatesFX one of the most competitive offerings.",
  },
  {
    question: "What trading platforms does GatesFX offer?",
    answer:
      "GatesFX offers TradeLocker, MetaTrader 4 (MT4), and MetaTrader 5 (MT5) platforms. All platforms are available on web, desktop, and mobile devices for flexible trading across different devices.",
  },
  {
    question: "How fast are GatesFX withdrawals?",
    answer:
      "Withdrawals are typically processed within 24-48 hours. Bank transfers may take an additional 1-3 business days to reach your account. The minimum withdrawal amount is $50.",
  },
  {
    question: "Is GatesFX good for scalping?",
    answer:
      "Yes, GatesFX is excellent for scalping due to ultra-low spreads (0.0 pips on ECN), fast execution (under 50ms average), and no restrictions on trading strategies. The broker is specifically well-suited for high-frequency trading styles.",
  },
  {
    question: "Does GatesFX work with prop firms?",
    answer:
      "Yes, GatesFX is compatible with several proprietary trading firms that use TradeLocker platform. The broker offers reliable execution and low latency suitable for prop firm challenges.",
  },
  {
    question: "What platforms does GatesFX offer?",
    answer:
      "GatesFX offers TradeLocker, MetaTrader 4 (MT4), and MetaTrader 5 (MT5) platforms. All platforms are available on web, desktop, and mobile devices (iOS and Android).",
  },
]

