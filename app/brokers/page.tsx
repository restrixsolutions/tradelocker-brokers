import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { FirmList } from "@/components/firm-list"
import { TopRatedFirms } from "@/components/top-rated-firms"
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/json-ld"
import { getFilteredBrokers, getFilterOptions, type BrokerFilterParams } from "@/app/actions"
import { Footer } from "@/components/footer"
import { RestroFXBanner } from "@/components/restrofx-banner"
import Link from "next/link"

// Force dynamic rendering to ensure randomization works on every page load
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Best TradeLocker Brokers 2025 – Compare Spreads, ECN & Execution",
  description:
    "Compare 20+ listed TradeLocker brokers. Filter by spreads, execution speed, regulation, and deposit requirements. Find your perfect forex broker today.",
  keywords: ["TradeLocker brokers", "forex brokers", "ECN brokers", "raw spreads", "fast execution", "regulated trading", "trading platform"],
  openGraph: {
    title: "Best TradeLocker Brokers 2025",
    description: "Compare spreads, execution speed, and features across 20+ listed TradeLocker brokers.",
    type: "website",
    url: "https://tradelockerbrokers.com/brokers",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/brokers",
  },
}

interface PageProps {
  searchParams?: {
    assetTypes?: string | string[]
    minDepositRanges?: string | string[]
    leverageOptions?: string | string[]
    countries?: string | string[]
    tags?: string | string[]
    noDepositFee?: string
    noInactivityFee?: string
    sortField?: string
    sortDirection?: string
  }
}

function parseParam(value: string | string[] | undefined): string[] | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value : value.split(',')
}

export default async function BrokersPage({ searchParams }: PageProps) {
  // Parse search params
  const filterParams: BrokerFilterParams = {
    assetTypes: parseParam(searchParams?.assetTypes),
    minDepositRanges: parseParam(searchParams?.minDepositRanges),
    leverageOptions: parseParam(searchParams?.leverageOptions),
    countries: parseParam(searchParams?.countries),
    tags: parseParam(searchParams?.tags),
    noDepositFee: searchParams?.noDepositFee === 'true',
    noInactivityFee: searchParams?.noInactivityFee === 'true',
    sortField: searchParams?.sortField as any,
    sortDirection: searchParams?.sortDirection as any,
  }

  // Fetch filtered data and filter options in parallel
  const [brokersData, filterOptions] = await Promise.all([
    getFilteredBrokers(filterParams),
    getFilterOptions('broker')
  ])
  const restrofxBanner = brokersData.find((broker) => broker.name.toLowerCase().includes("restrofx"))

  // Create ItemList for top 10 brokers (for SEO schema)
  const topBrokers = brokersData.slice(0, 10).map((broker, index) => ({
    name: broker.name,
    url: `https://tradelockerbrokers.com/brokers`, // Update when individual broker pages exist
    position: index + 1,
  }))

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Brokers", url: "https://tradelockerbrokers.com/brokers" },
        ]}
      />
      <ItemListJsonLd items={topBrokers} type="broker" />
      <HeaderNav />

      <Section className="pt-40 overflow-x-hidden">
        <Container>
          <div className="mx-auto max-w-3xl mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Best TradeLocker <span className="text-emerald-500">Brokers</span> 2026
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-4">
              Compare top-rated forex brokers that support the TradeLocker platform. Filter by assets, fees, and
              regulation to find the perfect match for your trading style.
            </p>
            <p className="text-base text-muted-foreground">
              Looking for funding? Check out our{" "}
              <Link href="/prop-firms" className="text-emerald-600 hover:underline font-medium">
                prop firms directory
              </Link>
              . New to the platform?{" "}
              <Link href="/how-to-use" className="text-emerald-600 hover:underline font-medium">
                Learn how to use TradeLocker
              </Link>
              .
            </p>
          </div>

          {restrofxBanner && (
            <RestroFXBanner
              broker={{
                name: restrofxBanner.name,
                logo: restrofxBanner.logo,
                affiliate_link: restrofxBanner.affiliate_link,
              }}
            />
          )}

          <FirmList brands={brokersData} type="broker" filterOptions={filterOptions} />

          <TopRatedFirms brands={brokersData} type="broker" heading="Brokers" />
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
