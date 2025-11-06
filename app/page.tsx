import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { GatesFXBanner } from "@/components/gatesfx-banner"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Broker } from "@/lib/types"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FAQPageJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "TradeLocker Brokers (2025) – Compare Best Forex Brokers Using TradeLocker",
  description:
    "Find the best TradeLocker brokers for 2025. Compare 20+ verified brokers by spreads, execution, regulation & features. Start trading with confidence today.",
  keywords: ["TradeLocker brokers", "best tradelocker brokers", "tradelocker brokers to use", "forex brokers", "ECN", "raw spreads", "fast execution", "trading platform"],
  openGraph: {
    title: "TradeLocker Brokers (2025) – Compare Best Forex Brokers",
    description: "Find the best TradeLocker brokers. Compare 20+ verified brokers by spreads, execution & features.",
    type: "website",
    url: "https://tradelockerbrokers.com",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com",
  },
}

export default async function HomePage() {
  const homepageFAQs = [
    {
      question: "What are TradeLocker brokers?",
      answer: "TradeLocker brokers are forex and CFD brokers that offer the TradeLocker platform as their trading interface. TradeLocker is a modern, browser-based trading platform known for fast execution, advanced charting, and mobile compatibility. These brokers integrate TradeLocker to provide traders with a superior trading experience compared to older platforms like MT4 or MT5."
    },
    {
      question: "Which TradeLocker brokers are best for beginners?",
      answer: "The best TradeLocker brokers for beginners offer low minimum deposits (under $200), educational resources, demo accounts, and responsive customer support. Look for brokers with user-friendly interfaces, clear fee structures, and good regulation."
    },
    {
      question: "Are TradeLocker brokers regulated?",
      answer: "Yes, reputable TradeLocker brokers are regulated by financial authorities like FCA, ASIC, CySEC, and other recognized regulators. Always verify a broker's regulation before opening an account. Our directory only lists regulated TradeLocker brokers with proper licensing and client fund protection."
    },
    {
      question: "What's the difference between TradeLocker and MT4?",
      answer: "TradeLocker is a modern, browser-based platform with no downloads required, while MT4 requires software installation. TradeLocker offers faster execution, a more intuitive interface, better mobile experience, and modern charting tools. MT4 has more third-party indicators and EAs available."
    },
    {
      question: "How do I choose the best TradeLocker broker?",
      answer: "Consider regulation, trading costs (spreads and commissions), execution quality, minimum deposit, withdrawal speed, and customer support. Use our comparison tool to filter by these criteria. Also check if the broker integrates well with TradeLocker and offers the instruments you want to trade."
    },
    {
      question: "Can I use TradeLocker for prop firm trading?",
      answer: "Yes, many TradeLocker brokers are compatible with prop firms and funded trading accounts. The platform's clean execution and risk management tools make it popular for traders pursuing funded challenges."
    }
  ]

  const supabase = await getSupabaseServerClient()

  const { data: brokers, error } = await supabase
    .from("brokers")
    .select(
      "id, name, logo, description, tags, asset_types, min_deposit, deposit_fee, withdrawal_fee, regulation, country_established, country_code, year_established, affiliate_link, is_featured, youtube_url",
    )
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true })

  if (error) {
    // Handle error silently
  }

  const brokersData: Broker[] = brokers || []

  // Get GatesFX data for the banner
  const { data: gatesfxData } = await supabase
    .from("brokers")
    .select("name, logo, affiliate_link")
    .eq("name", "GatesFX")
    .single()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FAQPageJsonLd faqs={homepageFAQs} />
      <HeaderNav />

      <Section className="pt-40">
        <Container>
          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Best TradeLocker Brokers (2025)
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-4">
              Compare the best TradeLocker brokers for forex, indices, and commodities trading. Our comprehensive directory features 20+ verified brokers with detailed comparisons of spreads, execution speed, regulation, and features. Find the perfect TradeLocker broker for your trading style.
            </p>
            <p className="text-base text-muted-foreground">
              Explore our{" "}
              <Link href="/brokers" className="text-accent hover:underline font-medium">
                complete broker comparison
              </Link>
              {" "}for detailed reviews or discover{" "}
              <Link href="/prop-firms" className="text-accent hover:underline font-medium">
                funded trading opportunities
              </Link>
              {" "}with prop firms. New to TradeLocker? Read our{" "}
              <Link href="/blog/how-to-login-tradelocker" className="text-accent hover:underline font-medium">
                login guide
              </Link>
              {" "}and{" "}
              <Link href="/blog/how-to-place-trade-tradelocker" className="text-accent hover:underline font-medium">
                trading tutorial
              </Link>
              . Updated for 2025.
            </p>
          </div>

          {gatesfxData && <GatesFXBanner gatesfx={gatesfxData} />}

          <BrokerTable brands={brokersData} type="broker" />
          
          {/* Why Choose TradeLocker Brokers Section */}
          <div className="mt-20 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose TradeLocker Brokers?</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">⚡ Lightning-Fast Execution</h3>
                  <p className="text-muted-foreground">
                    TradeLocker brokers offer institutional-grade execution speeds with minimal latency. The platform's modern infrastructure ensures orders are filled in milliseconds, crucial for scalping and day trading strategies.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">🌐 Browser-Based Platform</h3>
                  <p className="text-muted-foreground">
                    No downloads required. TradeLocker runs directly in your browser with full functionality on desktop, tablet, and mobile. Trade from anywhere with an internet connection while maintaining professional-grade charting and analysis tools.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">📊 Advanced Charting Tools</h3>
                  <p className="text-muted-foreground">
                    Access 100+ technical indicators, multiple timeframes, and advanced drawing tools. TradeLocker's modern interface makes technical analysis intuitive while providing the depth professional traders demand.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">🤝 Prop Firm Compatible</h3>
                  <p className="text-muted-foreground">
                    Many TradeLocker brokers integrate seamlessly with prop firms, making it easier to manage funded accounts. The platform's clean execution and comprehensive risk management tools are perfect for traders pursuing funded challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-muted-foreground">
              Whether you're looking for <strong>raw ECN spreads</strong>, <strong>fast execution</strong>, or <strong>low deposit requirements</strong>, our directory helps you find TradeLocker brokers that match your specific needs. Compare regulation, trading conditions, and user reviews to make an informed decision.
            </p>
          </div>
          
          {/* How to Choose Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How to Choose the Best TradeLocker Broker</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Selecting the right TradeLocker broker can significantly impact your trading success. Here's what to consider:
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">1. Regulation & Safety</h3>
              <p className="text-muted-foreground mb-4">
                Always verify your broker is properly regulated. Look for licenses from reputable authorities like FCA, ASIC, CySEC, or equivalent. Regulated TradeLocker brokers must maintain segregated client funds and follow strict operational standards, protecting your capital.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">2. Trading Costs</h3>
              <p className="text-muted-foreground mb-4">
                Compare spreads, commissions, and overnight fees. ECN accounts typically offer tighter spreads (from 0.0 pips) but charge commissions. Standard accounts have wider spreads but no commission. Calculate your total trading costs based on your strategy and trading volume.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">3. Execution Quality</h3>
              <p className="text-muted-foreground mb-4">
                Fast execution is crucial for TradeLocker trading. Check broker reviews for execution speed, slippage, and requote frequency. The best TradeLocker brokers offer sub-50ms execution with minimal slippage during normal market conditions.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">4. Deposit & Withdrawal</h3>
              <p className="text-muted-foreground mb-4">
                Review minimum deposit requirements, accepted payment methods, and withdrawal processing times. Top TradeLocker brokers process withdrawals within 24-48 hours and offer multiple funding options including cards, bank transfers, and e-wallets.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">5. Customer Support</h3>
              <p className="text-muted-foreground mb-4">
                Quality support can resolve issues quickly. Look for brokers offering 24/7 live chat, responsive email support, and knowledgeable staff familiar with TradeLocker platform specifics. Test their response time before funding your account.
              </p>
              
              <p className="text-muted-foreground">
                Use our{" "}
                <Link href="/brokers" className="text-accent hover:underline font-medium">
                  interactive comparison tool
                </Link>
                {" "}to filter TradeLocker brokers by these criteria and find your perfect match.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="mb-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">What are TradeLocker brokers?</h3>
                <p className="text-muted-foreground">
                  TradeLocker brokers are forex and CFD brokers that offer the TradeLocker platform as their trading interface. TradeLocker is a modern, browser-based trading platform known for fast execution, advanced charting, and mobile compatibility. These brokers integrate TradeLocker to provide traders with a superior trading experience compared to older platforms like MT4 or MT5.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Which TradeLocker brokers are best for beginners?</h3>
                <p className="text-muted-foreground">
                  The best TradeLocker brokers for beginners offer low minimum deposits (under $200), educational resources, demo accounts, and responsive customer support. Look for brokers with user-friendly interfaces, clear fee structures, and good regulation. Check our{" "}
                  <Link href="/brokers" className="text-accent hover:underline">
                    broker comparison
                  </Link>
                  {" "}to filter by minimum deposit and beginner-friendly features.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Are TradeLocker brokers regulated?</h3>
                <p className="text-muted-foreground">
                  Yes, reputable TradeLocker brokers are regulated by financial authorities like FCA, ASIC, CySEC, and other recognized regulators. Always verify a broker's regulation before opening an account. Our directory only lists regulated TradeLocker brokers with proper licensing and client fund protection.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between TradeLocker and MT4?</h3>
                <p className="text-muted-foreground">
                  TradeLocker is a modern, browser-based platform with no downloads required, while MT4 requires software installation. TradeLocker offers faster execution, a more intuitive interface, better mobile experience, and modern charting tools. MT4 has more third-party indicators and EAs available. Read our{" "}
                  <Link href="/blog/how-to-use-tradelocker-quick-guide" className="text-accent hover:underline">
                    complete TradeLocker guide
                  </Link>
                  {" "}to learn more.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How do I choose the best TradeLocker broker?</h3>
                <p className="text-muted-foreground">
                  Consider regulation, trading costs (spreads and commissions), execution quality, minimum deposit, withdrawal speed, and customer support. Use our comparison tool to filter by these criteria. Also check if the broker integrates well with TradeLocker and offers the instruments you want to trade. See our{" "}
                  <Link href="/blog/best-tradelocker-brokers-2025" className="text-accent hover:underline">
                    broker reviews
                  </Link>
                  {" "}for detailed analysis.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Can I use TradeLocker for prop firm trading?</h3>
                <p className="text-muted-foreground">
                  Yes, many TradeLocker brokers are compatible with prop firms and funded trading accounts. The platform's clean execution and risk management tools make it popular for traders pursuing funded challenges. Check our{" "}
                  <Link href="/prop-firms" className="text-accent hover:underline">
                    prop firms directory
                  </Link>
                  {" "}to find compatible funding providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-accent/10 via-background to-background py-12 md:py-16">
        <Container>
          <Card className="border-accent/30 bg-card/50 backdrop-blur">
            <CardContent className="pt-8 pb-8 md:pt-12 md:pb-12 px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">New to TradeLocker?</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                  Learn how to use the platform effectively with our comprehensive guide covering setup, features, and
                  best practices.
                </p>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto"
                  asChild
                >
                  <Link href="/how-to-use">
                    Read the Complete Guide
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
