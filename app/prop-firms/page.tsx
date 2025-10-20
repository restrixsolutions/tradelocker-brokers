import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { getFilteredPropFirms, getFilterOptions, type PropFirmFilterParams } from "@/app/actions"
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

interface PageProps {
  searchParams?: {
    assetTypes?: string | string[]
    countries?: string | string[]
    tags?: string | string[]
    challengeTypes?: string | string[]
    profitSplitMin?: string
    maxFundingMin?: string
    payoutFrequencies?: string | string[]
    sortField?: string
    sortDirection?: string
  }
}

export default async function PropFirmsPage({ searchParams }: PageProps) {
  // Parse search params
  const filterParams: PropFirmFilterParams = {
    assetTypes: searchParams?.assetTypes 
      ? Array.isArray(searchParams.assetTypes) 
        ? searchParams.assetTypes 
        : searchParams.assetTypes.split(',')
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
    challengeTypes: searchParams?.challengeTypes
      ? Array.isArray(searchParams.challengeTypes)
        ? searchParams.challengeTypes
        : searchParams.challengeTypes.split(',')
      : undefined,
    profitSplitMin: searchParams?.profitSplitMin 
      ? parseInt(searchParams.profitSplitMin)
      : undefined,
    maxFundingMin: searchParams?.maxFundingMin
      ? parseInt(searchParams.maxFundingMin)
      : undefined,
    payoutFrequencies: searchParams?.payoutFrequencies
      ? Array.isArray(searchParams.payoutFrequencies)
        ? searchParams.payoutFrequencies
        : searchParams.payoutFrequencies.split(',')
      : undefined,
    sortField: searchParams?.sortField as any,
    sortDirection: searchParams?.sortDirection as any,
  }

  // Fetch filtered data and filter options in parallel
  const [propFirmsData, filterOptions] = await Promise.all([
    getFilteredPropFirms(filterParams),
    getFilterOptions('prop-firm')
  ])

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

          <BrokerTable 
            brands={propFirmsData} 
            type="prop-firm" 
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
