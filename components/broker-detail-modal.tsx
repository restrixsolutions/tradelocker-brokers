"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  ExternalLink,
  Bitcoin,
  TrendingUp,
  BarChart3,
  Wheat,
  Target,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import type { Broker, PropFirm } from "@/lib/types"

interface BrokerDetailModalProps {
  brand: Broker | PropFirm
  type: "broker" | "prop-firm"
  isOpen: boolean
  onClose: () => void
}

const assetIcons = {
  forex: TrendingUp,
  crypto: Bitcoin,
  stocks: BarChart3,
  commodities: Wheat,
}

const assetLabels = {
  forex: "Forex",
  crypto: "Crypto",
  stocks: "Stocks",
  commodities: "Commodities",
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

export function BrokerDetailModal({ brand, type, isOpen, onClose }: BrokerDetailModalProps) {
  const youtubeVideoId = brand.youtube_url ? getYouTubeVideoId(brand.youtube_url) : null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto p-4 md:p-6 w-[95vw] md:w-full">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
            {/* Logo */}
            <div className="w-16 sm:w-[80px] flex-shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="object-contain p-2"
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <DialogTitle className="text-xl sm:text-2xl mb-1 sm:mb-2">{brand.name}</DialogTitle>
              <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{brand.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 md:space-y-6">
          {/* Video Overview */}
          {youtubeVideoId && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Video Overview</h3>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={`${brand.name} video overview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Features</h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {brand.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs md:text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Asset Types */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Asset Types</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {brand.asset_types.map((asset) => {
                const Icon = assetIcons[asset as keyof typeof assetIcons]
                const label = assetLabels[asset as keyof typeof assetLabels] || asset
                if (!Icon) return null
                return (
                  <div key={asset} className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 bg-muted rounded-lg">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Financial Details - Conditional based on type */}
          {type === "broker" ? (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Financial Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-muted rounded-lg">
                  <div className="text-xs md:text-sm text-muted-foreground mb-1">Minimum Deposit</div>
                  <div className="text-lg md:text-xl font-bold">${brand.min_deposit?.toFixed(2)}</div>
                </div>
                <div className="p-3 md:p-4 bg-muted rounded-lg">
                  <div className="text-xs md:text-sm text-muted-foreground mb-1">Deposit Fee</div>
                  <div className={`text-lg md:text-xl font-bold ${brand.deposit_fee === "None" ? "text-green-600" : ""}`}>
                    {brand.deposit_fee}
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-muted rounded-lg">
                  <div className="text-xs md:text-sm text-muted-foreground mb-1">Withdrawal Fee</div>
                  <div className={`text-lg md:text-xl font-bold ${brand.withdrawal_fee === "None" ? "text-green-600" : ""}`}>
                    {brand.withdrawal_fee}
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-muted rounded-lg">
                  <div className="text-xs md:text-sm text-muted-foreground mb-1">Inactivity Fee</div>
                  <div className={`text-lg md:text-xl font-bold ${brand.inactivity_fee === "None" ? "text-green-600" : ""}`}>
                    {brand.inactivity_fee}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Challenge Details */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Challenge Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Challenge Type</div>
                    <div className="text-lg md:text-xl font-bold text-primary">{(brand as any).challenge_type}</div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Challenge Fee</div>
                    <div className="text-lg md:text-xl font-bold">${(brand as any).challenge_fee?.toFixed(0)}</div>
                    {(brand as any).refundable_fee && (
                      <div className="text-xs text-green-600 mt-1">Refundable on 1st payout</div>
                    )}
                  </div>
                  {(brand as any).phase_1_profit_target && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Phase 1 Target</div>
                      <div className="text-lg md:text-xl font-bold text-blue-600">{(brand as any).phase_1_profit_target}%</div>
                    </div>
                  )}
                  {(brand as any).phase_2_profit_target && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Phase 2 Target</div>
                      <div className="text-lg md:text-xl font-bold text-blue-600">{(brand as any).phase_2_profit_target}%</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Funding & Profit */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Funding & Profit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Max Funding</div>
                    <div className="text-lg md:text-xl font-bold text-green-600">
                      ${((brand as any).max_funding_amount / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Profit Split</div>
                    <div className="text-lg md:text-xl font-bold text-green-600">
                      {(brand as any).profit_split}%
                      {(brand as any).profit_split_scaled && (
                        <span className="text-sm ml-1">→ {(brand as any).profit_split_scaled}%</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Payout Frequency</div>
                    <div className="text-base md:text-lg font-bold">{(brand as any).payout_frequency}</div>
                  </div>
                  {(brand as any).scaling_plan && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Scaling Plan</div>
                      <div className="text-base md:text-lg font-bold text-green-600">Available ✓</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Risk Rules */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Risk Rules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Max Daily Loss</div>
                    <div className="text-lg md:text-xl font-bold text-red-600">{(brand as any).max_daily_loss}%</div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Max Total Drawdown</div>
                    <div className="text-lg md:text-xl font-bold text-red-600">{(brand as any).max_total_drawdown}%</div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Drawdown Type</div>
                    <div className="text-base md:text-lg font-bold">{(brand as any).drawdown_type}</div>
                  </div>
                  {(brand as any).leverage && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Leverage</div>
                      <div className="text-base md:text-lg font-bold">{(brand as any).leverage}</div>
                    </div>
                  )}
                  {(brand as any).min_trading_days && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Min Trading Days</div>
                      <div className="text-base md:text-lg font-bold">{(brand as any).min_trading_days} days</div>
                    </div>
                  )}
                  {(brand as any).max_trading_days && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Max Trading Days</div>
                      <div className="text-base md:text-lg font-bold">{(brand as any).max_trading_days} days</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trading Rules */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Trading Rules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Expert Advisors (EAs)</div>
                    <div className={`text-base md:text-lg font-bold ${(brand as any).ea_allowed ? "text-green-600" : "text-red-600"}`}>
                      {(brand as any).ea_allowed ? "Allowed ✓" : "Not Allowed ✗"}
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">News Trading</div>
                    <div className={`text-base md:text-lg font-bold ${(brand as any).news_trading_allowed ? "text-green-600" : "text-red-600"}`}>
                      {(brand as any).news_trading_allowed ? "Allowed ✓" : "Not Allowed ✗"}
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">Weekend Holding</div>
                    <div className={`text-base md:text-lg font-bold ${(brand as any).weekend_holding_allowed ? "text-green-600" : "text-red-600"}`}>
                      {(brand as any).weekend_holding_allowed ? "Allowed ✓" : "Not Allowed ✗"}
                    </div>
                  </div>
                  {(brand as any).copy_trading_allowed && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Copy Trading</div>
                      <div className="text-base md:text-lg font-bold text-green-600">Allowed ✓</div>
                    </div>
                  )}
                  {(brand as any).swap_free && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Swap-Free Accounts</div>
                      <div className="text-base md:text-lg font-bold text-green-600">Available ✓</div>
                    </div>
                  )}
                  {(brand as any).consistency_rule && (
                    <div className="p-3 md:p-4 bg-muted rounded-lg">
                      <div className="text-xs md:text-sm text-muted-foreground mb-1">Consistency Rule</div>
                      <div className="text-base md:text-lg font-bold text-orange-600">Required</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">Company Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-muted rounded-lg">
                <div className="text-xs md:text-sm text-muted-foreground mb-1">Country Established</div>
                <div className="text-base md:text-lg font-semibold">{brand.country_established}</div>
              </div>
              <div className="p-3 md:p-4 bg-muted rounded-lg">
                <div className="text-xs md:text-sm text-muted-foreground mb-1">Year Established</div>
                <div className="text-base md:text-lg font-semibold">{brand.year_established}</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white text-sm md:text-base py-6 md:py-7 touch-manipulation" asChild>
            <a href={brand.affiliate_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <span className="truncate">Get Started with {brand.name}</span>
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 ml-2 flex-shrink-0" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
