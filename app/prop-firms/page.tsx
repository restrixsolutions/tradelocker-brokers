import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { BrokerTable } from "@/components/broker-table"
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/json-ld"
import { getFilteredPropFirms, getFilterOptions, type PropFirmFilterParams } from "@/app/actions"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Best TradeLocker Prop Firms 2025 – Compare Funding & Profit Splits",
  description:
    "Compare 15+ prop firms using TradeLocker. Filter by profit split, payout speed, challenge rules, and max funding. Start your funded trading journey today.",
  keywords: [
    "TradeLocker prop firms",
    "funded trading",
    "prop trading",
    "profit split",
    "instant funding",
    "challenge",
    "evaluation programs",
    "funded accounts",
  ],
  openGraph: {
    title: "Best TradeLocker Prop Firms 2025",
    description: "Compare profit splits, payout speeds, and rules across 15+ prop firms using TradeLocker.",
    type: "website",
    url: "https://tradelockerbrokers.com/prop-firms",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/prop-firms",
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

  // Create ItemList for top 10 prop firms (for SEO schema)
  const topPropFirms = propFirmsData.slice(0, 10).map((firm, index) => ({
    name: firm.name,
    url: `https://tradelockerbrokers.com/prop-firms`, // Update when individual prop firm pages exist
    position: index + 1,
  }))

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://tradelockerbrokers.com" },
          { name: "Prop Firms", url: "https://tradelockerbrokers.com/prop-firms" },
        ]}
      />
      <ItemListJsonLd items={topPropFirms} type="prop-firm" />
      <HeaderNav />

      <Section className="pt-32 overflow-x-hidden">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              TradeLocker Prop Firms
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-4">
              Compare the best prop trading firms that support the TradeLocker platform. Filter by profit split, rules,
              and payout options to find your ideal funding partner.
            </p>
            <p className="text-base text-muted-foreground">
              Need a personal trading account instead?{" "}
              <Link href="/brokers" className="text-accent hover:underline font-medium">
                Browse TradeLocker brokers
              </Link>
              . New to the platform?{" "}
              <Link href="/how-to-use" className="text-accent hover:underline font-medium">
                Learn how to use TradeLocker
              </Link>
              .
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
