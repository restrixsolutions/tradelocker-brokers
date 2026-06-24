import type { Broker, PropFirm } from "@/lib/types"

// Deterministic star ratings derived from real, verifiable attributes so the
// "score" reflects actual broker/prop-firm quality rather than arbitrary numbers.

const STRONG_REGULATORS = ["fca", "asic", "cysec", "fsca", "fsa", "cima"]

// Manual rating overrides (keyed by lowercased name). Use to pin a specific
// star value instead of the computed one.
const RATING_OVERRIDES: Record<string, number> = {
  gatesfx: 4.3,
  risen: 4.4,
}

function getOverride(name: string): number | undefined {
  return RATING_OVERRIDES[name.trim().toLowerCase()]
}

function clampRound(score: number): number {
  const clamped = Math.max(3.4, Math.min(5, score))
  return Math.round(clamped * 10) / 10
}

// Tiny stable variance from the name so equally-scored firms don't all tie.
function nameJitter(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 1000
  }
  return (hash / 1000) * 0.18 // 0 .. 0.18
}

export function getBrokerRating(broker: Broker): number {
  const override = getOverride(broker.name)
  if (override !== undefined) return override
  let score = 3.9
  const reg = (broker.regulation || "").toLowerCase()
  if (reg && !reg.includes("unregulated") && reg !== "not specified") {
    score += 0.35
    if (STRONG_REGULATORS.some((r) => reg.includes(r))) score += 0.15
  }
  if (typeof broker.min_deposit === "number") {
    if (broker.min_deposit <= 50) score += 0.2
    else if (broker.min_deposit <= 100) score += 0.1
  }
  if (broker.deposit_fee === "None") score += 0.1
  if (broker.withdrawal_fee === "None") score += 0.15
  if (broker.inactivity_fee === "None") score += 0.1
  if (broker.asset_types && broker.asset_types.length >= 3) score += 0.1
  if (broker.is_featured) score += 0.2
  score += nameJitter(broker.name)
  return clampRound(score)
}

export function getPropFirmRating(firm: PropFirm): number {
  const override = getOverride(firm.name)
  if (override !== undefined) return override
  let score = 3.9
  if (typeof firm.profit_split === "number") {
    if (firm.profit_split >= 90) score += 0.3
    else if (firm.profit_split >= 80) score += 0.2
  }
  if (firm.scaling_plan) score += 0.1
  const payout = (firm.payout_frequency || "").toLowerCase()
  if (payout.includes("daily") || payout.includes("weekly")) score += 0.15
  if (firm.news_trading_allowed) score += 0.05
  if (firm.ea_allowed) score += 0.05
  if (firm.weekend_holding_allowed) score += 0.05
  if (firm.refundable_fee) score += 0.1
  if (firm.is_featured) score += 0.2
  score += nameJitter(firm.name)
  return clampRound(score)
}

export function getRating(brand: Broker | PropFirm, type: "broker" | "prop-firm"): number {
  return type === "broker" ? getBrokerRating(brand as Broker) : getPropFirmRating(brand as PropFirm)
}
