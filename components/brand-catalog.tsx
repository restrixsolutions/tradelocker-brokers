"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Broker, PropFirm } from "@/lib/types"

interface BrandCatalogProps {
  brands: (Broker | PropFirm)[]
  type: "broker" | "prop-firm"
}

export function BrandCatalog({ brands, type }: BrandCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    brands.forEach((brand) => {
      brand.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [brands])

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        searchQuery === "" ||
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((selectedTag) => brand.tags.includes(selectedTag))

      return matchesSearch && matchesTags
    })
  }, [brands, searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Search and Filter Section */}
      <div className="space-y-4 md:space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={`Search ${type === "broker" ? "brokers" : "prop firms"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border text-sm md:text-base"
          />
        </div>

        {/* Tag Filter */}
        <div className="space-y-3">
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Filter by tags:</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 text-xs"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTags([])}
              className="text-accent text-xs md:text-sm"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs md:text-sm text-muted-foreground">
        Showing {filteredBrands.length} of {brands.length} {type === "broker" ? "brokers" : "prop firms"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {filteredBrands.map((brand) => (
          <a
            key={brand.id}
            href={brand.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative bg-card border border-border rounded-xl p-4 md:p-5 transition-all duration-300 hover:border-accent hover:shadow-lg">
              {/* Horizontal Layout: Logo + Content */}
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain p-2"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Brand Name */}
                  <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {brand.name}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {brand.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {brand.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{brand.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* External Link Icon */}
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{brand.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-8 md:py-12 px-4">
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            No {type === "broker" ? "brokers" : "prop firms"} found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedTags([])
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
