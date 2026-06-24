"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Heart,
  GitCompare,
  Info,
  ExternalLink,
  SlidersHorizontal,
  Bitcoin,
  TrendingUp,
  BarChart3,
  Wheat,
  X,
} from "lucide-react"
import type { Broker, PropFirm } from "@/lib/types"
import { getRating } from "@/lib/ratings"
import { StarRating } from "@/components/star-rating"
import { BrokerDetailModal } from "@/components/broker-detail-modal"
import { withRestroFXFirst } from "@/lib/broker-sort"

type Brand = Broker | PropFirm

interface FirmListProps {
  brands: Brand[]
  type: "broker" | "prop-firm"
  filterOptions?: {
    assetTypes: string[]
    countries: string[]
    tags: string[]
    challengeTypes?: string[]
    payoutFrequencies?: string[]
  }
}

const assetConfig: Record<string, { label: string; icon: any; color: string }> = {
  forex: { label: "Forex", icon: TrendingUp, color: "bg-blue-100 text-blue-700 border-blue-200" },
  crypto: { label: "Crypto", icon: Bitcoin, color: "bg-amber-100 text-amber-700 border-amber-200" },
  stocks: { label: "Stocks", icon: BarChart3, color: "bg-green-100 text-green-700 border-green-200" },
  commodities: { label: "Commodities", icon: Wheat, color: "bg-purple-100 text-purple-700 border-purple-200" },
}

const FAVORITES_KEY = "tlb:favorites"

export function FirmList({ brands, type, filterOptions }: FirmListProps) {
  const [asset, setAsset] = useState<string>("all")
  const [sort, setSort] = useState<string>("featured")
  const [savedOnly, setSavedOnly] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [compare, setCompare] = useState<string[]>([])
  const [selected, setSelected] = useState<Brand | null>(null)
  const [compareOpen, setCompareOpen] = useState(false)

  // Broker-specific filters
  const [regulatedOnly, setRegulatedOnly] = useState(false)
  const [noDepositFee, setNoDepositFee] = useState(false)
  const [noInactivityFee, setNoInactivityFee] = useState(false)
  // Prop-firm-specific filters
  const [scalingOnly, setScalingOnly] = useState(false)
  const [eaOnly, setEaOnly] = useState(false)
  const [newsOnly, setNewsOnly] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY)
      if (raw) setFavorites(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next)))
      } catch {}
      return next
    })
  }

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const availableAssets = filterOptions?.assetTypes || Array.from(new Set(brands.flatMap((b) => b.asset_types)))

  const activeFilterCount =
    (asset !== "all" ? 1 : 0) +
    (savedOnly ? 1 : 0) +
    (type === "broker"
      ? [regulatedOnly, noDepositFee, noInactivityFee].filter(Boolean).length
      : [scalingOnly, eaOnly, newsOnly].filter(Boolean).length)

  const filtered = useMemo(() => {
    let list = brands.filter((b) => {
      if (asset !== "all" && !b.asset_types.includes(asset)) return false
      if (savedOnly && !favorites.has(b.id)) return false
      if (type === "broker") {
        const brk = b as Broker
        if (regulatedOnly) {
          const reg = (brk.regulation || "").toLowerCase()
          if (!reg || reg.includes("unregulated") || reg === "not specified") return false
        }
        if (noDepositFee && brk.deposit_fee !== "None") return false
        if (noInactivityFee && brk.inactivity_fee !== "None") return false
      } else {
        const pf = b as PropFirm
        if (scalingOnly && !pf.scaling_plan) return false
        if (eaOnly && !pf.ea_allowed) return false
        if (newsOnly && !pf.news_trading_allowed) return false
      }
      return true
    })

    if (sort === "rating") {
      list = [...list].sort((a, b) => getRating(b, type) - getRating(a, type))
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === "deposit" && type === "broker") {
      list = [...list].sort((a, b) => ((a as Broker).min_deposit ?? 0) - ((b as Broker).min_deposit ?? 0))
    } else if (sort === "funding" && type === "prop-firm") {
      list = [...list].sort((a, b) => ((b as PropFirm).max_funding_amount ?? 0) - ((a as PropFirm).max_funding_amount ?? 0))
    } else {
      // featured: keep server (featured-first) order
      if (type === "broker") list = withRestroFXFirst([...list])
    }
    return list
  }, [brands, asset, savedOnly, favorites, sort, type, regulatedOnly, noDepositFee, noInactivityFee, scalingOnly, eaOnly, newsOnly])

  const compareBrands = brands.filter((b) => compare.includes(b.id))

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Select value={asset} onValueChange={setAsset}>
          <SelectTrigger className="w-[150px] rounded-full bg-card">
            <SelectValue placeholder="All Assets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assets</SelectItem>
            {availableAssets.map((a) => (
              <SelectItem key={a} value={a}>
                {assetConfig[a]?.label || a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[170px] rounded-full bg-card">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            {type === "broker" ? (
              <SelectItem value="deposit">Lowest Deposit</SelectItem>
            ) : (
              <SelectItem value="funding">Highest Funding</SelectItem>
            )}
            <SelectItem value="name">Name (A–Z)</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full gap-2 bg-card">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-xs font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="saved" checked={savedOnly} onCheckedChange={(v) => setSavedOnly(!!v)} />
              <Label htmlFor="saved" className="cursor-pointer">Saved only</Label>
            </div>
            <div className="h-px bg-border" />
            {type === "broker" ? (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reg" checked={regulatedOnly} onCheckedChange={(v) => setRegulatedOnly(!!v)} />
                  <Label htmlFor="reg" className="cursor-pointer">Regulated only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nodep" checked={noDepositFee} onCheckedChange={(v) => setNoDepositFee(!!v)} />
                  <Label htmlFor="nodep" className="cursor-pointer">No deposit fee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="noina" checked={noInactivityFee} onCheckedChange={(v) => setNoInactivityFee(!!v)} />
                  <Label htmlFor="noina" className="cursor-pointer">No inactivity fee</Label>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox id="scaling" checked={scalingOnly} onCheckedChange={(v) => setScalingOnly(!!v)} />
                  <Label htmlFor="scaling" className="cursor-pointer">Scaling plan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ea" checked={eaOnly} onCheckedChange={(v) => setEaOnly(!!v)} />
                  <Label htmlFor="ea" className="cursor-pointer">EAs allowed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="news" checked={newsOnly} onCheckedChange={(v) => setNewsOnly(!!v)} />
                  <Label htmlFor="news" className="cursor-pointer">News trading allowed</Label>
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>

        <div className="ml-auto text-sm text-muted-foreground">
          {filtered.length} {type === "broker" ? "brokers" : "prop firms"}
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {filtered.map((brand) => {
          const rating = getRating(brand, type)
          const isFav = favorites.has(brand.id)
          const inCompare = compare.includes(brand.id)
          return (
            <div
              key={brand.id}
              className="group flex flex-col md:flex-row md:items-center gap-4 rounded-xl border border-border/60 bg-card px-4 py-4 md:px-5 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md"
            >
              {/* Logo + name */}
              <div className="flex items-center gap-3 md:w-[300px] md:flex-shrink-0">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={48}
                    height={48}
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold group-hover:text-emerald-600">{brand.name}</span>
                    {brand.name.toLowerCase().includes("gatesfx") ? (
                      <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">
                        Hot
                      </span>
                    ) : brand.is_featured ? (
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                        Deal
                      </span>
                    ) : null}
                  </div>
                  <StarRating rating={rating} showValue />
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-1 items-center justify-start gap-8 md:justify-center">
                {type === "broker" ? (
                  <>
                    <Metric label="Min Deposit" value={`$${((brand as Broker).min_deposit ?? 0).toFixed(0)}`} />
                    <Metric label="Max Leverage" value={(brand as Broker).leverage || "1:100"} accent />
                  </>
                ) : (
                  <>
                    <Metric label="Max Drawdown" value={`${(brand as PropFirm).max_total_drawdown ?? "—"}%`} danger />
                    <Metric label="Payout" value={`${(brand as PropFirm).profit_split ?? "—"}%`} accent />
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1.5 md:flex-shrink-0">
                <button
                  type="button"
                  aria-label={isFav ? "Remove from saved" : "Save"}
                  onClick={() => toggleFavorite(brand.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                    isFav ? "border-rose-300 bg-rose-50 text-rose-500" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-rose-500" : ""}`} />
                </button>
                <button
                  type="button"
                  aria-label="Add to compare"
                  onClick={() => toggleCompare(brand.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                    inCompare ? "border-emerald-400 bg-emerald-50 text-emerald-600" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <GitCompare className="h-4 w-4" />
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5"
                  onClick={() => setSelected(brand)}
                >
                  <Info className="h-3.5 w-3.5" />
                  Details
                </Button>
                <Button
                  size="sm"
                  className="h-9 gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600"
                  asChild
                >
                  <a href={brand.affiliate_link} target="_blank" rel="noopener noreferrer">
                    View Details
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No {type === "broker" ? "brokers" : "prop firms"} match your filters.
          </div>
        )}
      </div>

      {/* Compare tray */}
      {compare.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur shadow-lg">
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
            <span className="text-sm font-medium">
              {compare.length} selected to compare
            </span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCompare([])}>
                Clear
              </Button>
              <Button
                size="sm"
                className="bg-emerald-500 text-white hover:bg-emerald-600"
                disabled={compare.length < 2}
                onClick={() => setCompareOpen(true)}
              >
                Compare ({compare.length})
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <BrokerDetailModal brand={selected} type={type} isOpen={!!selected} onClose={() => setSelected(null)} />
      )}

      {/* Compare modal */}
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        brands={compareBrands}
        type={type}
        onRemove={toggleCompare}
      />
    </div>
  )
}

function Metric({
  label,
  value,
  accent,
  danger,
}: {
  label: string
  value: string
  accent?: boolean
  danger?: boolean
}) {
  return (
    <div className="text-left">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div
        className={`text-sm font-bold ${accent ? "text-emerald-600" : danger ? "text-rose-500" : "text-foreground"}`}
      >
        {value}
      </div>
    </div>
  )
}

function CompareModal({
  open,
  onClose,
  brands,
  type,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  brands: Brand[]
  type: "broker" | "prop-firm"
  onRemove: (id: string) => void
}) {
  const rows: { label: string; get: (b: Brand) => string }[] =
    type === "broker"
      ? [
          { label: "Rating", get: (b) => getRating(b, type).toFixed(1) + " / 5" },
          { label: "Min Deposit", get: (b) => `$${((b as Broker).min_deposit ?? 0).toFixed(0)}` },
          { label: "Max Leverage", get: (b) => (b as Broker).leverage || "1:100" },
          { label: "Regulation", get: (b) => (b as Broker).regulation || "—" },
          { label: "Deposit Fee", get: (b) => (b as Broker).deposit_fee || "—" },
          { label: "Withdrawal Fee", get: (b) => (b as Broker).withdrawal_fee || "—" },
          { label: "Country", get: (b) => b.country_established },
          { label: "Established", get: (b) => String(b.year_established) },
        ]
      : [
          { label: "Rating", get: (b) => getRating(b, type).toFixed(1) + " / 5" },
          { label: "Max Funding", get: (b) => `$${(((b as PropFirm).max_funding_amount ?? 0) / 1000).toFixed(0)}K` },
          { label: "Profit Split", get: (b) => `${(b as PropFirm).profit_split ?? "—"}%` },
          { label: "Payout", get: (b) => (b as PropFirm).payout_frequency || "—" },
          { label: "Max Drawdown", get: (b) => `${(b as PropFirm).max_total_drawdown ?? "—"}%` },
          { label: "Daily Loss", get: (b) => `${(b as PropFirm).max_daily_loss ?? "—"}%` },
          { label: "Challenge Fee", get: (b) => `$${((b as PropFirm).challenge_fee ?? 0).toFixed(0)}` },
          { label: "Country", get: (b) => b.country_established },
        ]

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Compare {type === "broker" ? "Brokers" : "Prop Firms"}</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 bg-background p-2 text-left" />
                {brands.map((b) => (
                  <th key={b.id} className="min-w-[140px] p-2 text-center align-top">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold">{b.name}</span>
                      <button
                        onClick={() => onRemove(b.id)}
                        className="text-muted-foreground hover:text-rose-500"
                        aria-label={`Remove ${b.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="sticky left-0 bg-background p-2 font-medium text-muted-foreground">{row.label}</td>
                  {brands.map((b) => (
                    <td key={b.id} className="p-2 text-center">
                      {row.get(b)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
