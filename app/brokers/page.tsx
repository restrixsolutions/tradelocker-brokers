import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getFilteredBrokers, getFilterOptions, type BrokerFilterParams } from "@/app/actions"
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
