import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, Lightbulb, AlertCircle } from "lucide-react"
import { BreadcrumbJsonLd, ArticleJsonLd, FAQPageJsonLd } from "@/components/json-ld"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "How to Use TradeLocker – Complete Guide for Traders (2025)",
  description:
    "Learn how to use the TradeLocker platform effectively. Step-by-step guide covering setup, features, and best practices. Master TradeLocker trading today.",
  keywords: [
    "TradeLocker guide",
    "how to use TradeLocker",
    "TradeLocker tutorial",
    "forex trading platform",
    "trading guide",
    "TradeLocker setup",
  ],
  openGraph: {
    title: "How to Use TradeLocker – Complete Guide",
    description: "Learn how to use the TradeLocker platform effectively with our comprehensive guide.",
    type: "article",
    url: "https://tradelockerbrokers.com/how-to-use",
    article: {
      publishedTime: "2025-01-01",
      modifiedTime: "2025-01-19",
      authors: ["TradeLockerBrokers.com"],
    },
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/how-to-use",
  },
}

export default function HowToUsePage() {
  const faqs = [
    {
      question: "How do I get started with TradeLocker?",
      answer: "First, choose a broker or prop firm that supports TradeLocker. Sign up with your chosen provider and receive login credentials to access the TradeLocker platform through their portal. TradeLocker is cloud-based, so you can access it from any device with a web browser - no downloads required."
    },
    {
      question: "What are the key features of TradeLocker?",
      answer: "TradeLocker offers advanced charting with 100+ technical indicators, one-click trading, multi-asset support (forex, indices, commodities, cryptocurrencies), risk management tools including stop loss and take profit, an economic calendar, and both mobile and web access."
    },
    {
      question: "How do I place a trade on TradeLocker?",
      answer: "Select your instrument from the market watch, analyze the market using charts and indicators, set your position size based on risk management rules (typically 1-2% per trade), place stop loss and take profit levels, then click Buy or Sell to execute the trade. Always review the order confirmation."
    },
    {
      question: "What risk management rules should I follow?",
      answer: "Never risk more than 1-2% per trade to survive losing streaks, always use stop losses to protect capital, maintain a risk-reward ratio of at least 1:2 where potential profit is twice the potential loss, avoid overtrading by waiting for high-probability setups, and keep a trading journal to track patterns."
    },
    {
      question: "Does TradeLocker support automated trading?",
      answer: "Yes, TradeLocker supports algorithmic trading and Expert Advisors (EAs) to execute trades based on predefined rules. Some brokers also offer copy trading features through TradeLocker, allowing you to replicate trades of experienced traders automatically."
    },
    {
      question: "Can I use TradeLocker on mobile devices?",
      answer: "Yes, TradeLocker is accessible on both mobile and desktop devices. It features a responsive web interface and dedicated mobile apps, allowing you to trade from anywhere with an internet connection."
    },
    {
      question: "What is the best way to learn TradeLocker?",
      answer: "Start with a demo account to practice with virtual money until you're comfortable with the platform. Focus on mastering 2-3 currency pairs or assets before expanding. Trade during high liquidity hours (London and New York sessions), stay informed about economic events, and review your trades regularly to identify what works."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "How to Use", url: "https://tradelockerbrokers.com/how-to-use" },
        ]}
      />
      <ArticleJsonLd
        title="How to Use TradeLocker – Complete Guide for Traders (2025)"
        description="Learn how to use the TradeLocker platform effectively. Step-by-step guide covering setup, features, and best practices."
        datePublished="2025-01-01"
        dateModified="2025-01-19"
      />
      <FAQPageJsonLd faqs={faqs} />
      <HeaderNav />

      <Section className="pt-40">
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <Badge className="mb-4">Complete Guide</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              How to Use TradeLocker
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              TradeLocker is a modern, cloud-based trading platform designed for forex and CFD trading. This guide will
              walk you through everything you need to know to start trading effectively.
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="mb-12 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: "Getting Started", href: "#getting-started" },
                  { title: "Platform Features", href: "#features" },
                  { title: "Placing Trades", href: "#placing-trades" },
                  { title: "Risk Management", href: "#risk-management" },
                  { title: "Advanced Tools", href: "#advanced-tools" },
                  { title: "Tips & Best Practices", href: "#tips" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
                  >
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    {item.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            {/* Getting Started */}
            <section id="getting-started" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-xl font-bold">
                  1
                </span>
                Getting Started
              </h2>

              <div className="space-y-6 not-prose">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Choose Your Broker or Prop Firm
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p>
                      First, select a broker or prop firm that supports TradeLocker. Browse our curated lists of{" "}
                      <a href="/brokers" className="text-accent hover:underline">
                        TradeLocker brokers
                      </a>{" "}
                      and{" "}
                      <a href="/prop-firms" className="text-accent hover:underline">
                        prop firms
                      </a>{" "}
                      to find one that matches your trading style and requirements.
                    </p>
                    <p className="text-sm">
                      <strong>Key factors to consider:</strong> Spreads, execution speed, minimum deposit, regulation,
                      and available instruments.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Create Your Account
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p>
                      Sign up with your chosen broker or prop firm. You'll receive login credentials to access the
                      TradeLocker platform through their portal.
                    </p>
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <p className="text-sm flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Pro Tip:</strong> TradeLocker is cloud-based, so you can access it from any device
                          with a web browser. No downloads required!
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Log In and Explore
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p>
                      Navigate to your broker's TradeLocker portal and log in with your credentials. Take time to
                      familiarize yourself with the interface before placing any trades.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Platform Features */}
            <section id="features" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-xl font-bold">
                  2
                </span>
                Platform Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {[
                  {
                    title: "Advanced Charting",
                    description:
                      "Multiple timeframes, 100+ technical indicators, drawing tools, and customizable chart layouts.",
                  },
                  {
                    title: "One-Click Trading",
                    description:
                      "Execute trades instantly with pre-set lot sizes and risk parameters for fast execution.",
                  },
                  {
                    title: "Multi-Asset Support",
                    description: "Trade forex, indices, commodities, and cryptocurrencies all from one platform.",
                  },
                  {
                    title: "Risk Management Tools",
                    description: "Built-in stop loss, take profit, trailing stops, and position sizing calculators.",
                  },
                  {
                    title: "Economic Calendar",
                    description: "Stay informed with integrated news feeds and economic event notifications.",
                  },
                  {
                    title: "Mobile & Web Access",
                    description: "Trade from anywhere with responsive web interface and dedicated mobile apps.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Placing Trades */}
            <section id="placing-trades" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-xl font-bold">
                  3
                </span>
                Placing Trades
              </h2>

              <div className="space-y-6 not-prose">
                <Card>
                  <CardHeader>
                    <CardTitle>Step-by-Step Trading Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          title: "Select Your Instrument",
                          description: "Choose the currency pair or asset you want to trade from the market watch.",
                        },
                        {
                          step: "2",
                          title: "Analyze the Market",
                          description: "Use charts, indicators, and technical analysis to identify your entry point.",
                        },
                        {
                          step: "3",
                          title: "Set Your Position Size",
                          description:
                            "Determine your lot size based on your risk management rules (typically 1-2% per trade).",
                        },
                        {
                          step: "4",
                          title: "Place Stop Loss & Take Profit",
                          description:
                            "Always set your stop loss to limit potential losses and take profit to secure gains.",
                        },
                        {
                          step: "5",
                          title: "Execute the Trade",
                          description: 'Click "Buy" or "Sell" to open your position. Review the order confirmation.',
                        },
                        {
                          step: "6",
                          title: "Monitor & Manage",
                          description: "Track your open positions and adjust stop loss/take profit as needed.",
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Risk Management */}
            <section id="risk-management" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-xl font-bold">
                  4
                </span>
                Risk Management
              </h2>

              <div className="space-y-6 not-prose">
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-accent" />
                      Essential Risk Management Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      {[
                        {
                          rule: "Never risk more than 1-2% per trade",
                          explanation: "This ensures you can survive a losing streak without depleting your account.",
                        },
                        {
                          rule: "Always use stop losses",
                          explanation: "Protect your capital by limiting potential losses on every trade.",
                        },
                        {
                          rule: "Maintain a risk-reward ratio of at least 1:2",
                          explanation: "Your potential profit should be at least twice your potential loss.",
                        },
                        {
                          rule: "Don't overtrade",
                          explanation: "Quality over quantity. Wait for high-probability setups.",
                        },
                        {
                          rule: "Keep a trading journal",
                          explanation: "Track your trades to identify patterns and improve your strategy.",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground">{item.rule}</p>
                            <p className="text-sm text-muted-foreground">{item.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Advanced Tools */}
            <section id="advanced-tools" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-xl font-bold">
                  5
                </span>
                Advanced Tools
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <Card>
                  <CardHeader>
                    <CardTitle>Algorithmic Trading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      TradeLocker supports automated trading strategies. You can use Expert Advisors (EAs) to execute
                      trades based on predefined rules and algorithms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Copy Trading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Some brokers offer copy trading features through TradeLocker, allowing you to replicate the trades
                      of experienced traders automatically.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create and import custom technical indicators to enhance your analysis and develop unique trading
                      strategies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Multi-Chart Layouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Monitor multiple instruments and timeframes simultaneously with customizable chart layouts and
                      workspace templates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Tips & Best Practices */}
            <section id="tips" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-xl font-bold">
                  6
                </span>
                Tips & Best Practices
              </h2>

              <div className="space-y-6 not-prose">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {[
                        {
                          tip: "Start with a demo account",
                          description:
                            "Practice with virtual money until you're comfortable with the platform and your strategy.",
                        },
                        {
                          tip: "Focus on a few instruments",
                          description:
                            "Master 2-3 currency pairs or assets before expanding to others. Specialization beats diversification for beginners.",
                        },
                        {
                          tip: "Trade during high liquidity hours",
                          description:
                            "The London and New York sessions offer the best spreads and execution for forex trading.",
                        },
                        {
                          tip: "Stay informed about economic events",
                          description:
                            "Use the economic calendar to avoid trading during high-impact news releases unless you have a specific strategy.",
                        },
                        {
                          tip: "Review your trades regularly",
                          description:
                            "Analyze both winning and losing trades to understand what works and what doesn't in your strategy.",
                        },
                        {
                          tip: "Manage your emotions",
                          description:
                            "Stick to your trading plan and avoid revenge trading after losses or overconfidence after wins.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 items-start p-4 rounded-lg bg-card/50 border border-border/50"
                        >
                          <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground mb-1">{item.tip}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-16">
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    TradeLocker is a powerful platform that combines modern design with professional-grade trading
                    tools. Whether you're a beginner or an experienced trader, following these guidelines will help you
                    make the most of the platform's capabilities.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/brokers"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Browse Brokers
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/prop-firms"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-lg font-semibold hover:bg-card/80 transition-colors"
                    >
                      Explore Prop Firms
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </section>
          </article>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
