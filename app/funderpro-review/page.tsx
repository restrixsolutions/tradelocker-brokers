import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, XCircle, Shield, Zap, DollarSign, Star, TrendingUp, Target } from "lucide-react"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata: Metadata = {
  title: "FunderPro Review 2025: Is FunderPro Legit? Complete Prop Firm Analysis",
  description:
    "FunderPro prop firm review 2025: Analyze profit splits, challenge rules, payout speed & legitimacy. Is FunderPro a good prop firm? Read our review.",
  keywords: [
    "funderpro",
    "funderpro review",
    "is funderpro legit",
    "funderpro prop firm",
    "funderpro profit split",
    "funderpro challenge",
    "funderpro payout",
  ],
  openGraph: {
    title: "FunderPro Review 2025 - Complete Prop Firm Analysis",
    description: "Is FunderPro legit? Full review of profit splits, challenges, and payout conditions.",
    type: "article",
    url: "https://tradelockerbrokers.com/funderpro-review",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/funderpro-review",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function FunderProReviewPage() {
  const supabase = await getSupabaseServerClient()

  const { data: funderpro } = await supabase
    .from("prop_firms")
    .select("*")
    .ilike("name", "%FunderPro%")
    .single()

  const { data: competitors } = await supabase
    .from("prop_firms")
    .select("id, name, logo, challenge_fee, max_funding_amount, profit_split, affiliate_link")
    .neq("name", "FunderPro")
    .limit(2)

  const propFirm = funderpro || {
    name: "FunderPro",
    logo: "/images/logos/funderpro.png",
    affiliate_link: "https://funderpro.com",
    challenge_fee: 99,
    max_funding_amount: 200000,
    profit_split: 80,
    challenge_type: "2-Step",
  }

  const competitorFirms = competitors || []

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
              name: "FunderPro",
              description: "Proprietary trading firm offering funded trading accounts",
              url: propFirm.affiliate_link,
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
              <Link href="/prop-firms" className="hover:text-foreground">
                Prop Firms
              </Link>
              {" > "}
              <span className="text-foreground">FunderPro Review</span>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl border-2 border-border overflow-hidden bg-background">
                  <Image
                    src={propFirm.logo}
                    alt={propFirm.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">FunderPro Review 2025</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Is FunderPro legit? Complete analysis of profit splits, challenge rules, and funding conditions.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    <Target className="w-3 h-3 mr-1" />
                    {propFirm.challenge_type} Challenge
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ${(propFirm.max_funding_amount / 1000).toFixed(0)}K Max Funding
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {propFirm.profit_split}% Profit Split
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
                  <a href={propFirm.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Join FunderPro
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
                      <li>✓ Competitive profit splits</li>
                      <li>✓ Large funding amounts available</li>
                      <li>✓ Structured 2-step evaluation</li>
                      <li>✓ TradeLocker platform support</li>
                      <li>✓ Reasonable challenge fees</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Cons
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✗ Must pass 2-step challenge</li>
                      <li>✗ Strict drawdown rules</li>
                      <li>✗ Challenge fees non-refundable</li>
                      <li>✗ Limited trading strategies allowed</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best For:</strong> Disciplined traders seeking funded accounts with competitive profit splits and clear evaluation criteria.
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
              <h2 className="text-3xl font-bold mb-6">Is FunderPro Legit?</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-green-600 mb-3">
                      ✓ FunderPro is a legitimate prop trading firm
                    </p>
                    <p className="mb-4">
                      FunderPro operates as a proprietary trading firm offering funded accounts to qualified traders. The firm processes payouts and maintains a structured evaluation program.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">✓ Positive Indicators</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Processes payouts</li>
                        <li>• Clear challenge rules</li>
                        <li>• Transparent fee structure</li>
                        <li>• Active trader community</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">⚠️ Considerations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Challenge can be difficult</li>
                        <li>• Fees are non-refundable</li>
                        <li>• Strict trading rules apply</li>
                        <li>• Success not guaranteed</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="funding">
              <h2 className="text-3xl font-bold mb-6">Funding & Profit Splits</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="border border-border rounded-lg p-6 text-center">
                      <h3 className="text-3xl font-bold mb-2 text-green-600">
                        ${(propFirm.max_funding_amount / 1000).toFixed(0)}K
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">Maximum Funding</p>
                      <p className="text-xs">Grow your account to $200,000</p>
                    </div>
                    <div className="border border-border rounded-lg p-6 text-center">
                      <h3 className="text-3xl font-bold mb-2 text-accent">{propFirm.profit_split}%</h3>
                      <p className="text-sm text-muted-foreground mb-2">Profit Split</p>
                      <p className="text-xs">Keep 80% of your profits</p>
                    </div>
                    <div className="border border-border rounded-lg p-6 text-center">
                      <h3 className="text-3xl font-bold mb-2">${propFirm.challenge_fee}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Challenge Fee</p>
                      <p className="text-xs">One-time evaluation cost</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 2-Step evaluation process</li>
                      <li>• Scaling plan available for successful traders</li>
                      <li>• Multiple account sizes to choose from</li>
                      <li>• Regular payout schedule</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="challenge">
              <h2 className="text-3xl font-bold mb-6">Challenge Process</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                    FunderPro uses a 2-step evaluation process to assess trader skill and risk management capabilities.
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">Phase 1: Initial Evaluation</h4>
                      <p className="text-sm text-muted-foreground">
                        Demonstrate consistent profitability while adhering to risk management rules. Achieve profit targets without violating drawdown limits.
                      </p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">Phase 2: Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Confirm your trading approach with a second evaluation phase. Prove consistency and risk discipline.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold mb-2">Funded Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Upon passing both phases, receive a funded account and start earning profit splits on successful trades.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Funded with FunderPro?</h3>
                <p className="text-muted-foreground mb-6">
                  Start your evaluation and access up to $200K in funding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    asChild
                  >
                    <a href={propFirm.affiliate_link} target="_blank" rel="noopener noreferrer">
                      Start Challenge
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/prop-firms">Compare Prop Firms</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {competitorFirms.length > 0 && (
              <div id="comparison">
                <h2 className="text-3xl font-bold mb-6">Prop Firm Comparison</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-accent/50">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex justify-center">
                        <Image
                          src={propFirm.logo}
                          alt={propFirm.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-center mb-3">{propFirm.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Max Funding:</strong> ${(propFirm.max_funding_amount / 1000).toFixed(0)}K
                        </p>
                        <p>
                          <strong>Profit Split:</strong> {propFirm.profit_split}%
                        </p>
                        <p>
                          <strong>Challenge Fee:</strong> ${propFirm.challenge_fee}
                        </p>
                      </div>
                      <Button className="w-full mt-4" asChild>
                        <a href={propFirm.affiliate_link} target="_blank" rel="noopener noreferrer">
                          Join {propFirm.name}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {competitorFirms.slice(0, 2).map((competitor) => (
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
                            <strong>Max Funding:</strong> ${(competitor.max_funding_amount / 1000).toFixed(0)}K
                          </p>
                          <p>
                            <strong>Profit Split:</strong> {competitor.profit_split}%
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
                <h2 className="text-3xl font-bold mb-4">Final Verdict: Is FunderPro Worth It?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  FunderPro offers competitive funding conditions with clear evaluation criteria. The 80% profit split and structured challenge make it a solid choice for disciplined traders seeking funded accounts.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <Star className="w-6 h-6 fill-yellow-500/50 text-yellow-500" />
                  <span className="ml-2 font-semibold">4.4/5</span>
                </div>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8"
                  asChild
                >
                  <a href={propFirm.affiliate_link} target="_blank" rel="noopener noreferrer">
                    Get Funded with FunderPro
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Note: Challenge fees apply. Pass rates vary by trader skill.
                </p>
              </CardContent>
            </Card>

            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/prop-firms"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Prop Firm Comparison</h4>
                  <p className="text-sm text-muted-foreground">Compare all prop firms</p>
                </Link>
                <Link
                  href="/blog/best-tradelocker-brokers-2025"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Best TradeLocker Brokers</h4>
                  <p className="text-sm text-muted-foreground">Find compatible brokers</p>
                </Link>
                <Link
                  href="/brokers"
                  className="block p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-semibold mb-2">Broker Directory</h4>
                  <p className="text-sm text-muted-foreground">Browse all brokers</p>
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
    question: "Is FunderPro legit?",
    answer:
      "Yes, FunderPro is a legitimate proprietary trading firm that funds qualified traders. The firm processes payouts and maintains a structured evaluation program with clear rules and transparent conditions.",
  },
  {
    question: "What is FunderPro profit split?",
    answer:
      "FunderPro offers an 80% profit split, meaning traders keep 80% of the profits they generate on funded accounts. This is competitive within the prop trading industry.",
  },
  {
    question: "How much does FunderPro challenge cost?",
    answer:
      "FunderPro challenge fees start at $99 depending on the account size selected. Fees are non-refundable and provide access to the 2-step evaluation process.",
  },
  {
    question: "What is FunderPro maximum funding?",
    answer:
      "FunderPro offers funding up to $200,000 for qualified traders. Successful traders may have opportunities to scale their accounts further based on performance.",
  },
  {
    question: "How long does FunderPro payout take?",
    answer:
      "FunderPro processes payouts on a regular schedule. Specific payout timelines and minimum withdrawal amounts are detailed in the funded trader agreement.",
  },
  {
    question: "Does FunderPro support TradeLocker?",
    answer:
      "Yes, FunderPro supports TradeLocker platform, making it compatible with traders who prefer this modern trading interface for their funded accounts.",
  },
]

