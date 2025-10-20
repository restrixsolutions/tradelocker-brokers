import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/json-ld"
import { getFilteredBrokers, getFilterOptions, type BrokerFilterParams } from "@/app/actions"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Best TradeLocker Brokers 2025 – Compare Spreads, ECN & Execution",
  description:
    "Compare 20+ verified TradeLocker brokers. Filter by spreads, execution speed, regulation, and deposit requirements. Find your perfect forex broker today.",
  keywords: ["TradeLocker brokers", "forex brokers", "ECN brokers", "raw spreads", "fast execution", "regulated trading", "trading platform"],
  openGraph: {
    title: "Best TradeLocker Brokers 2025",
    description: "Compare spreads, execution speed, and features across 20+ verified TradeLocker brokers.",
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
    countries?: string | string[]
    tags?: string | string[]
    noDepositFee?: string
    noWithdrawalFee?: string
    noInactivityFee?: string
    sortField?: string
    sortDirection?: string
  }
}

export default async function BrokersPage({ searchParams }: PageProps) {
  // Parse search params
  const filterParams: BrokerFilterParams = {
    assetTypes: searchParams?.assetTypes 
      ? Array.isArray(searchParams.assetTypes) 
        ? searchParams.assetTypes 
        : searchParams.assetTypes.split(',')
      : undefined,
    minDepositRanges: searchParams?.minDepositRanges
      ? Array.isArray(searchParams.minDepositRanges)
        ? searchParams.minDepositRanges
        : searchParams.minDepositRanges.split(',')
      : undefined,
    countries: searchParams?.countries
      ? Array.isArray(searchParams.countries)
        ? searchParams.countries
        : searchParams.countries.split(',')
      : undefined,
    tags: searchParams?.tags
      ? Array.isArray(searchParams.tags)
        ? searchParams.tags
        : searchParams.tags.split(',')
      : undefined,
    noDepositFee: searchParams?.noDepositFee === 'true',
    noWithdrawalFee: searchParams?.noWithdrawalFee === 'true',
    noInactivityFee: searchParams?.noInactivityFee === 'true',
    sortField: searchParams?.sortField as any,
    sortDirection: searchParams?.sortDirection as any,
  }

  // Fetch filtered data and filter options in parallel
  const [brokersData, filterOptions] = await Promise.all([
    getFilteredBrokers(filterParams),
    getFilterOptions('broker')
  ])

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

      <Section className="pt-32 overflow-x-hidden">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              TradeLocker Brokers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-4">
              Compare the best forex brokers that support the TradeLocker platform. Filter by execution type, spreads,
              and features to find your perfect match.
            </p>
            <p className="text-base text-muted-foreground">
              Looking for funding? Check out our{" "}
              <Link href="/prop-firms" className="text-accent hover:underline font-medium">
                TradeLocker prop firms directory
              </Link>
              . New to the platform?{" "}
              <Link href="/how-to-use" className="text-accent hover:underline font-medium">
                Learn how to use TradeLocker
              </Link>
              .
            </p>
          </div>

          <BrokerTable 
            brands={brokersData} 
            type="broker" 
            filterOptions={filterOptions}
            initialFilters={filterParams}
            serverSideFiltering
          />
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
