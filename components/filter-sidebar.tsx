"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export interface FilterOptions {
  assetTypes: string[]
  minDepositRanges: string[]
  countries: string[]
  tags: string[]
  noDepositFee: boolean
  noInactivityFee: boolean
}

interface FilterSidebarProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  availableAssetTypes: string[]
  availableCountries: string[]
  availableTags: string[]
  resultsCount: number
  totalCount: number
}

const depositRanges = [
  { label: "$0 - $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $500", value: "100-500" },
  { label: "$500+", value: "500+" },
]

export function FilterSidebar({
  filters,
  onFilterChange,
  availableAssetTypes,
  availableCountries,
  availableTags,
  resultsCount,
  totalCount,
}: FilterSidebarProps) {
  const handleAssetTypeToggle = (assetType: string) => {
    const newAssetTypes = filters.assetTypes.includes(assetType)
      ? filters.assetTypes.filter((t) => t !== assetType)
      : [...filters.assetTypes, assetType]
    onFilterChange({ ...filters, assetTypes: newAssetTypes })
  }

  const handleDepositRangeToggle = (range: string) => {
    const newRanges = filters.minDepositRanges.includes(range)
      ? filters.minDepositRanges.filter((r) => r !== range)
      : [...filters.minDepositRanges, range]
    onFilterChange({ ...filters, minDepositRanges: newRanges })
  }

  const handleCountryToggle = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter((c) => c !== country)
      : [...filters.countries, country]
    onFilterChange({ ...filters, countries: newCountries })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]
    onFilterChange({ ...filters, tags: newTags })
  }

  const handleClearAll = () => {
    onFilterChange({
      assetTypes: [],
      minDepositRanges: [],
      countries: [],
      tags: [],
      noDepositFee: false,
      noInactivityFee: false,
    })
  }

  const hasActiveFilters =
    filters.assetTypes.length > 0 ||
    filters.minDepositRanges.length > 0 ||
    filters.countries.length > 0 ||
    filters.tags.length > 0 ||
    filters.noDepositFee ||
    filters.noInactivityFee

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="bg-primary/10 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-primary">{resultsCount}</div>
        <div className="text-sm text-muted-foreground">
          of {totalCount} {totalCount === 1 ? "result" : "results"}
        </div>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={handleClearAll} className="w-full bg-transparent" size="sm">
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}

      {/* Asset Types */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Asset Types</h3>
        <div className="space-y-2">
          {availableAssetTypes.map((assetType) => (
            <div key={assetType} className="flex items-center space-x-2">
              <Checkbox
                id={`asset-${assetType}`}
                checked={filters.assetTypes.includes(assetType)}
                onCheckedChange={() => handleAssetTypeToggle(assetType)}
              />
              <Label htmlFor={`asset-${assetType}`} className="text-sm capitalize cursor-pointer">
                {assetType}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Min Deposit */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Minimum Deposit</h3>
        <div className="space-y-2">
          {depositRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox
                id={`deposit-${range.value}`}
                checked={filters.minDepositRanges.includes(range.value)}
                onCheckedChange={() => handleDepositRangeToggle(range.value)}
              />
              <Label htmlFor={`deposit-${range.value}`} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Fees</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-deposit-fee"
              checked={filters.noDepositFee}
              onCheckedChange={(checked) => onFilterChange({ ...filters, noDepositFee: checked as boolean })}
            />
            <Label htmlFor="no-deposit-fee" className="text-sm cursor-pointer">
              No Deposit Fee
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-inactivity-fee"
              checked={filters.noInactivityFee}
              onCheckedChange={(checked) => onFilterChange({ ...filters, noInactivityFee: checked as boolean })}
            />
            <Label htmlFor="no-inactivity-fee" className="text-sm cursor-pointer">
              No Inactivity Fee
            </Label>
          </div>
        </div>
      </div>

      {/* Countries */}
      {availableCountries.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-sm">Country</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableCountries.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={`country-${country}`}
                  checked={filters.countries.includes(country)}
                  onCheckedChange={() => handleCountryToggle(country)}
                />
                <Label htmlFor={`country-${country}`} className="text-sm cursor-pointer">
                  {country}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {availableTags.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-sm">Features</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={filters.tags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                />
                <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters {hasActiveFilters && `(${resultsCount})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto p-6">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <Card className="hidden lg:block sticky top-24 h-fit">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterContent />
        </CardContent>
      </Card>
    </>
  )
}
