import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/json-ld"
import { PropChallengeRiskPlanner } from "@/components/prop-challenge-risk-planner"

export const metadata: Metadata = {
  title: "TradeLocker Prop Challenge Calculator: Daily Drawdown Risk Planner",
  description:
    "Free TradeLocker prop challenge calculator to size positions safely around daily and max drawdown rules. Plan risk per trade, lot size, and session survival.",
  keywords: [
    "tradelocker prop challenge calculator",
    "prop firm daily drawdown calculator",
    "position size for prop challenge",
    "prop firm risk calculator",
    "tradelocker position size calculator",
  ],
  openGraph: {
    title: "TradeLocker Prop Challenge Calculator: Daily Drawdown Risk Planner",
    description:
      "Plan lot size and per-trade risk around daily and max drawdown limits before violating prop challenge rules.",
    type: "article",
    url: "https://tradelockerbrokers.com/tradelocker-prop-challenge-calculator",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/tradelocker-prop-challenge-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "How does this TradeLocker prop challenge calculator work?",
    answer:
      "It combines your account size, drawdown rules, current equity, stop loss, and risk settings to estimate a safer risk per trade and lot size before you place trades.",
  },
  {
    question: "Why is daily drawdown more restrictive than max drawdown?",
    answer:
      "Daily limits often force smaller risk per trade because they reset on a short window. Even if your total max drawdown is large, daily limits can still trigger violations first.",
  },
  {
    question: "Can I use this as a position size calculator for prop firms?",
    answer:
      "Yes. This tool functions as a prop-aware position size calculator by converting your risk amount and stop loss into a recommended lot size while respecting drawdown constraints.",
  },
  {
    question: "What if the calculator shows breach risk?",
    answer:
      "Reduce risk per trade, lower planned trades, or stop for the session. A breach-risk status means your current setup can violate one or more challenge limits.",
  },
]

export default function TradeLockerPropChallengeCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          {
            name: "TradeLocker Prop Challenge Calculator",
            url: "https://tradelockerbrokers.com/tradelocker-prop-challenge-calculator",
          },
        ]}
      />
      <FAQPageJsonLd faqs={faqs} />
      <HeaderNav />

      <Section className="pt-40 pb-12">
        <Container>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-4">
              <Badge variant="secondary">Free Tool</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                TradeLocker Prop Challenge Risk Planner
              </h1>
              <p className="text-lg text-muted-foreground">
                Use this free calculator to avoid accidental daily and max drawdown breaches. Set your account rules,
                stop loss, and risk parameters to get a safer per-trade risk cap and lot size estimate.
              </p>
            </div>

            <PropChallengeRiskPlanner />

            <Card>
              <CardHeader>
                <CardTitle>How to Use This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>1. Enter your challenge account size and current equity.</p>
                <p>2. Enter your daily and max drawdown limits from your provider rules.</p>
                <p>3. Set your stop loss and pip value for the instrument you plan to trade.</p>
                <p>4. Review safe risk per trade and lot size before entering a position in TradeLocker.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Fixed Risk Percent Can Fail Challenges</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  A fixed 1% model does not automatically respect daily limits, especially after earlier losses. This
                  planner reduces risk to what your remaining buffers can support.
                </p>
                <p>
                  Example: if your daily limit is $5,000 and your account is already down $4,000, a normal 1% risk on a
                  $100,000 account ($1,000) is too high. The safe cap is now only $1,000 total for the session and may
                  need to be split across planned trades.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4" id="faq">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

