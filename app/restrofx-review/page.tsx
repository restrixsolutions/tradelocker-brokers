import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, XCircle, Shield, Zap, DollarSign, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata: Metadata = {
  title: "RestroFX Review 2026: Prop Firm TradeLocker Broker",
  description:
    "RestroFX broker review: TradeLocker integration, $25 minimum deposit, ECN-style pricing, and prop firm compatibility. Costs, execution, and who RestroFX fits best.",
  keywords: [
    "restrofx",
    "restrofx review",
    "restrofx broker",
    "restrofx tradelocker",
    "restrofx prop firm",
    "restrofx minimum deposit",
  ],
  openGraph: {
    title: "RestroFX Review 2026 – TradeLocker & Prop Firms",
    description:
      "Independent RestroFX review covering regulation, spreads, TradeLocker quality, and funded-trader fit.",
    type: "article",
    url: "https://tradelockerbrokers.com/restrofx-review",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/restrofx-review",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RestroFXReviewPage() {
  const supabase = await getSupabaseServerClient()

  const { data: restrofx } = await supabase
    .from("brokers")
    .select("*")
    .ilike("name", "%RestroFX%")
    .single()

  const { data: competitors } = await supabase
    .from("brokers")
    .select("id, name, logo, min_deposit, tags, affiliate_link")
    .neq("name", "RestroFX")
    .limit(2)

  const broker = {
    ...(restrofx || {}),
    name: "RestroFX",
    logo: restrofx?.logo || "/images/logos/restrofx.svg",
    affiliate_link: "https://portal.restrofx.com/r/0Osaul1w",
    min_deposit: 25,
    leverage: "1:500 up to 1:1000",
    regulation: "Unregulated",
    country_established: restrofx?.country_established || "Saint Lucia",
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
              name: "RestroFX",
              description: "Forex and CFD broker with TradeLocker and prop-firm-oriented accounts",
              url: broker.affiliate_link,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4.4,
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
              <span className="text-foreground">RestroFX Review</span>
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">RestroFX Review 2026</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  TradeLocker broker with two public account configurations (RAW and ECN/Standard). Below reflects
                  RestroFX&apos;s internal pricing structure: LP feed plus fixed markups and separate round-turn commissions.
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
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {broker.leverage || "1:500 up to 1:1000"} Leverage
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Zap className="w-3 h-3 mr-1" />
                    TradeLocker
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Star className="w-3 h-3 mr-1" />
                    4.4/5 Rating
                  </Badge>
                </div>

                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Visit RestroFX
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
                      <li>✓ ECN/Standard retail entry from ${broker.min_deposit} with $4 RT commission ($2/side)</li>
                      <li>✓ RAW tier: $18 RT ($9/side), transparent LP-based execution</li>
                      <li>✓ Transparent model: client price = live B2B LP + fixed markup (dynamic with feed)</li>
                      <li>✓ ECN/Standard account with transparent LP feed + fixed markup pricing</li>
                      <li>✓ TradeLocker-first workflow for prop-style and active CFD traders</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Cons
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✗ RAW recommended minimum $500 — higher than ECN&apos;s ${broker.min_deposit} entry</li>
                      <li>✗ Execution quality can vary by symbol/session — test your exact setup before scaling</li>
                      <li>✗ Confirm current spread/commission structure on the official RestroFX site before funding</li>
                      <li>✗ Regulation profile may differ from Tier-1 FCA/ASIC-only brokers — verify disclosures</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best For:</strong> Prop firm and funded-account traders who want TradeLocker-first execution
                    and stable spreads around news and session changes.
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
            <div id="regulation">
              <h2 className="text-3xl font-bold mb-6">Regulation & Safety Context</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    RestroFX is currently positioned as an unregulated broker with offshore-style disclosures. If
                    regulation is your main filter, compare this profile against FCA, ASIC, or CySEC supervised firms
                    before funding.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Check segregated funds and policy wording on the broker site</li>
                      <li>• Start small, confirm withdrawals on your chosen method early</li>
                      <li>• Keep screenshots of key terms at account open</li>
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">Last updated: April 2026</p>
                </CardContent>
              </Card>
            </div>

            <div id="account-structure">
              <h2 className="text-3xl font-bold mb-6">Account types (pricing structure)</h2>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-sm text-muted-foreground">
                    RestroFX operates three configurations. All forex/crypto CFD markups stack on the live B2B LP feed;
                    indices, gold, and oil use a proprietary engine with markups on that output.
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/40 text-left">
                          <th className="p-3 font-semibold">Account</th>
                          <th className="p-3 font-semibold">Commission (RT)</th>
                          <th className="p-3 font-semibold">Spread / markup</th>
                          <th className="p-3 font-semibold">Min. deposit</th>
                          <th className="p-3 font-semibold">Routing</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium text-foreground">RAW</td>
                          <td className="p-3">$18 RT ($9 per side), open + close</td>
                          <td className="p-3">LP-based pricing (e.g. majors +0.1 pip on feed)</td>
                          <td className="p-3">$500 recommended</td>
                          <td className="p-3">Market execution</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium text-foreground">ECN / Standard — Default</td>
                          <td className="p-3">$4 RT ($2 per side), on top of spread</td>
                          <td className="p-3">Majors +2.0 pips on feed; minors +3.0; tiered exotics/crypto</td>
                          <td className="p-3">$25</td>
                          <td className="p-3">Hybrid routing by order profile</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Figures are from RestroFX&apos;s internal pricing reference (v1.0). Live quotes move with the LP;
                    you always see feed + markup. Confirm current retail terms on the official RestroFX site before
                    trading.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div id="legitimacy">
              <h2 className="text-3xl font-bold mb-6">Is RestroFX Legit?</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    RestroFX presents as a functioning TradeLocker broker with prop-trader positioning. We do not treat
                    licensing labels as a substitute for your own due diligence—verify current terms, reviews, and
                    withdrawal experience before scaling size.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <Shield className="w-8 h-8 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">Disclosures</h4>
                      <p className="text-sm text-muted-foreground">Read legal and risk docs on the official site</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <Zap className="w-8 h-8 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">Platform</h4>
                      <p className="text-sm text-muted-foreground">TradeLocker as primary workflow</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <TrendingUp className="w-8 h-8 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">Execution</h4>
                      <p className="text-sm text-muted-foreground">Consistency matters for prop rules</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Risk Warning:</strong> Forex and CFDs carry significant risk. Only trade capital you can
                      afford to lose.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="costs">
              <h2 className="text-3xl font-bold mb-6">Markups & commissions (detail)</h2>
              <Card>
                <CardContent className="pt-6 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">RAW — add above B2B feed</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Fixed additions on top of whatever the live feed shows (not absolute spreads). Examples from the
                      pricing grid:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                      <li>Forex majors: +0.1 pip on feed</li>
                      <li>Forex minors: +0.3 pip</li>
                      <li>Gold (XAUUSD): +$0.05/oz · Silver: +$0.02/oz</li>
                      <li>US indices (US30, US500, NAS100): +0.3 points · EU/UK indices: +0.5 · Nikkei: +3.0</li>
                      <li>BTC/USD: +$3.00 · ETH/USD: +$0.20 (other crypto tiers in doc)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">ECN / Standard — Default ($4 RT)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                      <li>Majors: +2.0 pips on feed · Minors: +3.0 pips</li>
                      <li>Exotics: +3× current feed spread · High-vol exotics: +2× feed spread</li>
                      <li>Gold: +$0.30/oz · US30: +2.5 points · US500: +0.5 · NAS100: +1.5 · GER40/UK100: +1.8</li>
                      <li>BTC/USD: +$50.00 · ETH/USD: +$4.00 (altcoins tiered)</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                    <strong className="text-foreground">Before you fund:</strong> add your expected symbol, session,
                    and hold time, then compare total cost (markup + commission + swap) on ECN vs RAW on a
                    demo account.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="platform">
              <h2 className="text-3xl font-bold mb-6">TradeLocker Integration</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    RestroFX is positioned around TradeLocker as the core experience—useful if your prop firm or
                    personal workflow is already TradeLocker-native.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">What to test:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Market orders during volatility windows you trade</li>
                        <li>• Mobile vs web parity for your strategy</li>
                        <li>• Reporting exports if your firm audits trades</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Prop fit:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Confirm your firm’s approved broker list</li>
                        <li>• Match max leverage and instrument permissions</li>
                        <li>• Align news trading rules with your execution style</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Compare RestroFX on a live shortlist</h3>
                <p className="text-muted-foreground mb-6">
                  Use our broker directory, then confirm the latest RestroFX terms on the official site.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    asChild
                  >
                    <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                      Open RestroFX
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/brokers">Compare brokers</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {competitorBrokers.length > 0 && (
              <div id="comparison">
                <h2 className="text-3xl font-bold mb-6">Quick comparison</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-accent/50">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex justify-center">
                        <Image src={broker.logo} alt={broker.name} width={80} height={40} className="object-contain" />
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
                <h2 className="text-3xl font-bold mb-4">Summary</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  RestroFX is a sensible shortlist broker if TradeLocker plus prop-style discipline is your focus. Pair
                  this page with your firm’s rules and a small live withdrawal test before scaling.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500/40 text-yellow-500" />
                  <span className="ml-2 font-semibold">4.4/5</span>
                </div>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8"
                  asChild
                >
                  <a href={broker.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Go to RestroFX
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Risk Warning: Trading involves significant risk. Only trade with funds you can afford to lose.
                </p>
              </CardContent>
            </Card>

            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-semibold mb-4">Related</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/blog/restrofx-review"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Long-form RestroFX article</h4>
                  <p className="text-sm text-muted-foreground">Editorial deep dive on the blog</p>
                </Link>
                <Link
                  href="/blog/best-tradelocker-brokers-2025"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Best TradeLocker brokers</h4>
                  <p className="text-sm text-muted-foreground">Broader comparison</p>
                </Link>
                <Link
                  href="/brokers"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Broker directory</h4>
                  <p className="text-sm text-muted-foreground">Filter and compare</p>
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
    question: "What is RestroFX?",
    answer:
      "RestroFX is a TradeLocker-oriented forex and CFD broker marketed heavily toward prop firm traders and funded account workflows.",
  },
  {
    question: "What is the RestroFX minimum deposit?",
    answer:
      "ECN/Standard uses a $25 accessible retail entry. RAW accounts recommend a $500 minimum. Always confirm the current requirement on the official RestroFX website before funding.",
  },
  {
    question: "Is RestroFX good for prop firms?",
    answer:
      "It can be a strong fit if your proprietary trading firm approves RestroFX and your strategy matches their instrument and leverage rules. Always verify the firm’s approved broker list first.",
  },
  {
    question: "Does RestroFX support TradeLocker?",
    answer:
      "Yes. RestroFX is positioned as a TradeLocker-first broker, which is the main reason traders compare it alongside GatesFX and HeroFX.",
  },
  {
    question: "How does RestroFX compare to HeroFX?",
    answer:
      "HeroFX emphasizes ultra-low minimums and volatile-market angles, while RestroFX emphasizes prop-trader positioning and a higher typical entry deposit. Your best pick depends on firm rules and cost structure.",
  },
  {
    question: "Is RestroFX regulated?",
    answer:
      "No. RestroFX is presented as an unregulated broker, so there is no Tier-1 FCA/ASIC style oversight. Read their legal disclosures and decide your risk tolerance before funding.",
  },
]
