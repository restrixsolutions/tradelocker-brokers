import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { PropFirm } from "@/lib/types"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Best TradeLocker Prop Firms (2025) – Compare Funding & Profit Splits",
  description:
    "Compare the top prop trading firms that support TradeLocker. Filter by profit split, rules, payout speed, and more.",
  keywords: [
    "TradeLocker prop firms",
    "funded trading",
    "prop trading",
    "profit split",
    "instant funding",
    "challenge",
  ],
  openGraph: {
    title: "Best TradeLocker Prop Firms (2025)",
    description: "Compare the top prop trading firms that support TradeLocker.",
    type: "website",
  },
}

export default async function PropFirmsPage() {
  const supabase = await getSupabaseServerClient()

  const { data: propFirms, error } = await supabase
    .from("prop_firms")
    .select(`
      id, name, logo, description, tags, asset_types,
      country_established, country_code, year_established,
      affiliate_link, is_featured, youtube_url,
      max_funding_amount, profit_split, profit_split_scaled,
      challenge_type, challenge_fee, refundable_fee,
      phase_1_profit_target, phase_2_profit_target,
      max_daily_loss, max_total_drawdown, drawdown_type,
      payout_frequency, min_payout_amount, scaling_plan,
      min_trading_days, max_trading_days,
      news_trading_allowed, weekend_holding_allowed, ea_allowed,
      consistency_rule, copy_trading_allowed, swap_free, leverage
    `)
    .order("is_featured", { ascending: false })
    .order("profit_split", { ascending: false })
    .order("name", { ascending: true })

  if (error) {
    // Handle error silently
  }

  const propFirmsData: PropFirm[] = propFirms || []

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Prop Firms", url: "https://tradelockerbrokers.com/prop-firms" },
        ]}
      />
      <HeaderNav />

      <Section className="pt-32 overflow-x-hidden">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              TradeLocker Prop Firms
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Compare the best prop trading firms that support the TradeLocker platform. Filter by profit split, rules,
              and payout options to find your ideal funding partner.
            </p>
          </div>

          <BrokerTable brands={propFirmsData} type="prop-firm" />
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
