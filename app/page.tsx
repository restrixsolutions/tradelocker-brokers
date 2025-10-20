import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Broker } from "@/lib/types"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Best TradeLocker Brokers (2025) – Compare Spreads & Execution",
  description:
    "Compare the top forex brokers that support TradeLocker. Filter by ECN, spreads, execution speed, and more.",
  keywords: ["TradeLocker brokers", "forex brokers", "ECN", "raw spreads", "fast execution", "trading platform"],
  openGraph: {
    title: "Best TradeLocker Brokers (2025)",
    description: "Compare the top forex brokers that support TradeLocker.",
    type: "website",
    url: "https://tradelockerbrokers.com",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com",
  },
}

export default async function HomePage() {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <Section className="pt-32">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              TradeLocker Brokers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Compare the best forex brokers that support the TradeLocker platform. Filter by execution type, spreads,
              and features to find your perfect match.
            </p>
          </div>

          <BrokerTable brands={brokersData} type="broker" />
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
