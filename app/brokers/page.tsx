import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Broker } from "@/lib/types"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Best TradeLocker Brokers (2025) – Compare Spreads & Execution",
  description:
    "Compare the top forex brokers that support TradeLocker. Filter by ECN, spreads, execution speed, and more.",
  keywords: ["TradeLocker brokers", "forex brokers", "ECN", "raw spreads", "fast execution", "trading platform"],
  openGraph: {
    title: "Best TradeLocker Brokers (2025)",
    description: "Compare the top forex brokers that support TradeLocker.",
    type: "website",
  },
}

export default async function BrokersPage() {
  const supabase = await getSupabaseServerClient()

  const { data: brokers, error } = await supabase
    .from("brokers")
    .select(
      "id, name, logo, description, tags, asset_types, min_deposit, deposit_fee, withdrawal_fee, inactivity_fee, country_established, country_code, year_established, affiliate_link, is_featured, youtube_url",
    )
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true })

  if (error) {
    // Handle error silently
  }

  const brokersData: Broker[] = brokers || []

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Brokers", url: "https://tradelockerbrokers.com/brokers" },
        ]}
      />
      <HeaderNav />

      <Section className="pt-32 overflow-x-hidden">
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

      <Footer />
    </div>
  )
}
