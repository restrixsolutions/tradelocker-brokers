"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Info, Bitcoin, TrendingUp, BarChart3, Wheat, ChevronUp, ChevronDown } from "lucide-react"
import type { Broker, PropFirm } from "@/lib/types"
import { BrokerDetailModal } from "./broker-detail-modal"
import { FilterSidebar, type FilterOptions } from "./filter-sidebar"

type SortField = "name" | "minDeposit" | "yearEstablished"
type SortDirection = "asc" | "desc"
type SortFieldOrNull = SortField | null

interface BrokerTableProps {
  brands: (Broker | PropFirm)[]
  type: "broker" | "prop-firm"
  filterOptions?: {
    assetTypes: string[]
    countries: string[]
    tags: string[]
    challengeTypes?: string[]
    payoutFrequencies?: string[]
  }
  initialFilters?: any
  serverSideFiltering?: boolean
}

const assetIcons = {
  forex: TrendingUp,
  crypto: Bitcoin,
  stocks: BarChart3,
  commodities: Wheat,
}

const assetConfig = {
  forex: { label: "Forex", color: "bg-blue-100 text-blue-700 border-blue-200", icon: TrendingUp },
  crypto: { label: "Crypto", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Bitcoin },
  stocks: { label: "Stocks", color: "bg-green-100 text-green-700 border-green-200", icon: BarChart3 },
  commodities: { label: "Commodities", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Wheat },
}

const countryFlagCodes: Record<string, string> = {
  "St. Lucia": "lc",
  "South Africa": "za",
  Cyprus: "cy",
  "United States": "us",
  "United Kingdom": "gb",
  Canada: "ca",
  Australia: "au",
}

export function BrokerTable({ 
  brands, 
  type, 
  filterOptions, 
  initialFilters, 
  serverSideFiltering = false 
}: BrokerTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [sortField, setSortField] = useState<SortField | null>(
    (initialFilters?.sortField as SortField) || null
  )
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    (initialFilters?.sortDirection as SortDirection) || "asc"
  )
  const [selectedBrand, setSelectedBrand] = useState<Broker | PropFirm | null>(null)

  const [filters, setFilters] = useState<FilterOptions>({
    assetTypes: initialFilters?.assetTypes || [],
    minDepositRanges: initialFilters?.minDepositRanges || [],
    countries: initialFilters?.countries || [],
    tags: initialFilters?.tags || [],
    noDepositFee: initialFilters?.noDepositFee || false,
    noInactivityFee: initialFilters?.noInactivityFee || false,
  })

  // Use server-provided filter options or calculate from brands
  const availableAssetTypes = filterOptions?.assetTypes || Array.from(new Set(brands.flatMap((b) => b.asset_types))).sort()
  const availableCountries = filterOptions?.countries || Array.from(new Set(brands.map((b) => b.country_established))).sort()
  const availableTags = filterOptions?.tags || Array.from(new Set(brands.flatMap((b) => b.tags))).sort()

  // Update URL params when filters change (for server-side filtering)
  const updateURLParams = useCallback((newFilters: FilterOptions, newSortField?: SortField | null, newSortDirection?: SortDirection) => {
    if (!serverSideFiltering) return

    const params = new URLSearchParams(searchParams.toString())
    
    // Handle array params
    const arrayParams = ['assetTypes', 'minDepositRanges', 'countries', 'tags'] as const
    arrayParams.forEach(param => {
      params.delete(param)
      const value = newFilters[param]
      if (value && value.length > 0) {
        params.set(param, value.join(','))
      }
    })
    
    // Handle boolean params
    const boolParams = ['noDepositFee', 'noInactivityFee'] as const
    boolParams.forEach(param => {
      params.delete(param)
      if (newFilters[param]) {
        params.set(param, 'true')
      }
    })
    
    // Handle sorting
    if (newSortField) {
      params.set('sortField', newSortField)
    } else {
      params.delete('sortField')
    }
    if (newSortDirection) {
      params.set('sortDirection', newSortDirection)
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [serverSideFiltering, searchParams, pathname, router])

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    if (serverSideFiltering) {
      updateURLParams(newFilters, sortField, sortDirection)
    }
  }

  // For server-side filtering, brands are already filtered
  const filteredBrands = serverSideFiltering ? brands : brands.filter((brand) => {
    // Asset type filter
    if (filters.assetTypes.length > 0) {
      const hasMatchingAsset = filters.assetTypes.some((assetType) => brand.asset_types.includes(assetType))
      if (!hasMatchingAsset) return false
    }

    // Min deposit filter
    if (filters.minDepositRanges.length > 0) {
      const matchesRange = filters.minDepositRanges.some((range) => {
        if (range === "0-50") return brand.min_deposit >= 0 && brand.min_deposit <= 50
        if (range === "50-100") return brand.min_deposit > 50 && brand.min_deposit <= 100
        if (range === "100-500") return brand.min_deposit > 100 && brand.min_deposit <= 500
        if (range === "500+") return brand.min_deposit > 500
        return false
      })
      if (!matchesRange) return false
    }

    // Country filter
    if (filters.countries.length > 0 && !filters.countries.includes(brand.country_established)) {
      return false
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) => brand.tags.includes(tag))
      if (!hasMatchingTag) return false
    }

    // Fee filters
    if (filters.noDepositFee && brand.deposit_fee !== "None") return false
    if (filters.noInactivityFee && brand.inactivity_fee !== "None") return false

    return true
  })

  const handleSort = (field: SortField) => {
    let newSortDirection: SortDirection = "asc"
    if (sortField === field) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc"
    }
    
    setSortField(field)
    setSortDirection(newSortDirection)
    
    if (serverSideFiltering) {
      updateURLParams(filters, field, newSortDirection)
    }
  }

  // For server-side filtering, data is already sorted by the server
  // Don't do any additional sorting to preserve the server's featured-first ordering
  const sortedBrands = serverSideFiltering ? filteredBrands : [...filteredBrands].sort((a, b) => {
    // First sort by featured status
    if (a.is_featured !== b.is_featured) {
      return b.is_featured ? 1 : -1 // Featured items first
    }
    
    // If no sort field, maintain current order (will be randomized on page load)
    if (!sortField) return 0
    
    let comparison = 0
    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "minDeposit") {
      comparison = a.min_deposit - b.min_deposit
    } else if (sortField === "yearEstablished") {
      comparison = a.year_established - b.year_established
    }
    return sortDirection === "asc" ? comparison : -comparison
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-64 flex-shrink-0">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          availableAssetTypes={availableAssetTypes}
          availableCountries={availableCountries}
          availableTags={availableTags}
          resultsCount={serverSideFiltering ? brands.length : filteredBrands.length}
          totalCount={serverSideFiltering ? brands.length : brands.length}
        />
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="flex gap-3 px-6 py-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/60 font-bold text-sm relative shadow-sm backdrop-blur-sm">
              <div key="header-logo" className="w-[80px] flex-shrink-0"></div>
              <button
                key="header-name"
                onClick={() => handleSort("name")}
                className="w-[180px] flex-shrink-0 text-left hover:text-primary transition-colors flex items-center"
              >
                Name <SortIcon field="name" />
              </button>
              {type === "broker" ? (
                <>
                  <div key="header-assets" className="w-[140px] flex-shrink-0">Asset Types</div>
                  <button
                    key="header-deposit"
                    onClick={() => handleSort("minDeposit")}
                    className="w-[110px] flex-shrink-0 text-left hover:text-primary transition-colors flex items-center"
                  >
                    Min. Deposit <SortIcon field="minDeposit" />
                  </button>
                  <div key="header-leverage" className="w-[120px] flex-shrink-0">Leverage</div>
                  <div key="header-regulation" className="w-[120px] flex-shrink-0">Regulation</div>
                  <div key="header-country" className="w-[160px] flex-shrink-0">Country Est.</div>
                  <button
                    key="header-year"
                    onClick={() => handleSort("yearEstablished")}
                    className="w-[120px] flex-shrink-0 text-left hover:text-primary transition-colors flex items-center"
                  >
                    Year Est. <SortIcon field="yearEstablished" />
                  </button>
                </>
              ) : (
                <>
                  <div key="header-challenge" className="w-[120px] flex-shrink-0">Challenge Type</div>
                  <div key="header-funding" className="w-[120px] flex-shrink-0">Max Funding</div>
                  <div key="header-fee" className="w-[100px] flex-shrink-0">Fee</div>
                  <div key="header-split" className="w-[120px] flex-shrink-0">Profit Split</div>
                  <div key="header-drawdown" className="w-[130px] flex-shrink-0">Max Drawdown</div>
                  <div key="header-daily" className="w-[100px] flex-shrink-0">Daily Loss</div>
                  <div key="header-payout" className="w-[120px] flex-shrink-0">Payout</div>
                  <div key="header-country" className="w-[160px] flex-shrink-0">Country Est.</div>
                </>
              )}
              <div key="header-actions" className="w-[220px] flex-shrink-0 text-right pr-2 sticky right-0"></div>
            </div>

            <div className="space-y-4 mt-4">
              {sortedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex gap-3 px-6 py-5 bg-card border border-border/60 rounded-xl shadow-sm hover:shadow-lg hover:border-primary/40 hover:bg-card/80 transition-all duration-300 items-center relative group backdrop-blur-sm"
                >
                  {/* Logo with DEAL badge */}
                  <div className="w-[80px] flex-shrink-0 relative">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        width={64}
                        height={64}
                        className="object-contain p-2"
                      />
                    </div>
                    {brand.is_featured && (
                      <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                        DEAL
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="w-[180px] flex-shrink-0 font-bold text-sm text-foreground group-hover:text-primary transition-colors">{brand.name}</div>

                  {type === "broker" ? (
                    <>
                      {/* Asset Types */}
                      <div className="w-[140px] flex-shrink-0 flex flex-wrap gap-1.5">
                        {brand.asset_types.slice(0, 2).map((asset, assetIndex) => {
                          const config = assetConfig[asset as keyof typeof assetConfig]
                          if (!config) return null
                          const Icon = config.icon
                          return (
                            <div
                              key={`${brand.id}-${asset}-${assetIndex}`}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors ${config.color} group-hover:shadow-sm`}
                              title={asset}
                            >
                              <Icon className="w-3 h-3" />
                              <span className="hidden sm:inline">{config.label}</span>
                            </div>
                          )
                        })}
                        {brand.asset_types.length > 2 && (
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border" title={`+${brand.asset_types.length - 2} more`}>
                            +{brand.asset_types.length - 2}
                          </div>
                        )}
                      </div>

                      {/* Min Deposit */}
                      <div className="w-[110px] flex-shrink-0">
                        <div className="font-bold text-foreground">${brand.min_deposit?.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">minimum</div>
                      </div>

                      {/* Leverage */}
                      <div className="w-[120px] flex-shrink-0">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {brand.leverage || '1:100'}
                        </span>
                      </div>

                      {/* Regulation */}
                      <div className="w-[120px] flex-shrink-0">
                        {brand.regulation ? (
                          <span className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-bold border ${
                            brand.regulation.toLowerCase().includes("regulated") 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}>
                            {brand.regulation}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not specified</span>
                        )}
                      </div>

                      {/* Country */}
                      <div className="w-[160px] flex-shrink-0 flex items-center gap-3">
                        <div className="w-7 h-5 rounded-sm overflow-hidden border border-border/50 flex-shrink-0 shadow-sm">
                          <img
                            src={`https://flagcdn.com/w40/${countryFlagCodes[brand.country_established] || "un"}.png`}
                            alt={`${brand.country_established} flag`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground truncate">{brand.country_established}</span>
                      </div>

                      {/* Year Established */}
                      <div className="w-[120px] flex-shrink-0">
                        <div className="font-semibold text-foreground">{brand.year_established}</div>
                        <div className="text-xs text-muted-foreground">established</div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Challenge Type */}
                      <div className="w-[120px] flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {(brand as any).challenge_type}
                        </span>
                      </div>

                      {/* Max Funding */}
                      <div className="w-[120px] flex-shrink-0 font-medium text-green-600">
                        ${((brand as any).max_funding_amount / 1000).toFixed(0)}K
                      </div>

                      {/* Challenge Fee */}
                      <div className="w-[100px] flex-shrink-0 font-medium">
                        ${(brand as any).challenge_fee?.toFixed(0)}
                      </div>

                      {/* Profit Split */}
                      <div className="w-[120px] flex-shrink-0 font-semibold text-green-600">
                        {(brand as any).profit_split}%
                        {(brand as any).profit_split_scaled && (
                          <span className="text-xs ml-1">→ {(brand as any).profit_split_scaled}%</span>
                        )}
                      </div>

                      {/* Max Drawdown */}
                      <div className="w-[130px] flex-shrink-0">
                        <div className="text-sm">{(brand as any).max_total_drawdown}%</div>
                        <div className="text-xs text-muted-foreground">{(brand as any).drawdown_type}</div>
                      </div>

                      {/* Daily Loss */}
                      <div className="w-[100px] flex-shrink-0">{(brand as any).max_daily_loss}%</div>

                      {/* Payout Frequency */}
                      <div className="w-[120px] flex-shrink-0 text-sm">{(brand as any).payout_frequency}</div>

                      {/* Country */}
                      <div className="w-[160px] flex-shrink-0 flex items-center gap-2">
                        <div className="w-6 h-4 rounded overflow-hidden border border-border/50 flex-shrink-0">
                          <img
                            src={`https://flagcdn.com/w40/${countryFlagCodes[brand.country_established] || "un"}.png`}
                            alt={`${brand.country_established} flag`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm truncate">{brand.country_established}</span>
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="w-[220px] flex-shrink-0 flex gap-3 items-center justify-end sticky right-0 pl-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBrand(brand)}
                      className="whitespace-nowrap px-3 py-2 h-9 text-xs font-medium border-2 hover:border-primary/50 transition-all duration-200 shadow-sm"
                    >
                      <Info className="w-3.5 h-3.5 mr-1.5" />
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="whitespace-nowrap bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 h-9 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                      asChild
                    >
                      <a href={brand.affiliate_link} target="_blank" rel="noopener noreferrer">
                        Get Started
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-muted-foreground flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary/30 animate-pulse-dot" />
                More {type === "broker" ? "brokers" : "prop firms"} on the way
              </div>
              <div>
                1–{sortedBrands.length} of {filteredBrands.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedBrand && (
        <BrokerDetailModal
          brand={selectedBrand}
          type={type}
          isOpen={!!selectedBrand}
          onClose={() => setSelectedBrand(null)}
        />
      )}
    </div>
  )
}
