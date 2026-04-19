import type { Broker } from "@/lib/types"

const RESTROFX_AFFILIATE_LINK = "https://portal.restrofx.com/r/0Osaul1w"
const RESTROFX_DESCRIPTION =
  "TradeLocker broker with ECN/Standard from $25, leverage 1:500 up to 1:1000, and RAW $18 RT from $500. Unregulated offshore broker — verify terms before funding."

export function withRestroFXOverrides<T extends { name: string }>(brand: T): T {
  if (brand.name !== "RestroFX") return brand

  const next: Record<string, unknown> = { ...brand }

  // Keep RestroFX values consistent regardless of what the DB row contains.
  if ("affiliate_link" in next) next.affiliate_link = RESTROFX_AFFILIATE_LINK
  if ("min_deposit" in next) next.min_deposit = 25
  if ("leverage" in next) next.leverage = "1:500 up to 1:1000"
  if ("regulation" in next) next.regulation = "Unregulated"
  if ("asset_types" in next) next.asset_types = ["forex", "crypto", "stocks", "commodities", "indices"]
  if ("year_established" in next) next.year_established = 2024
  if ("country_established" in next) next.country_established = "Saint Lucia"
  if ("country_code" in next) next.country_code = "lc"
  if ("description" in next) next.description = RESTROFX_DESCRIPTION
  if ("logo" in next) next.logo = "/images/logos/restrofx.svg"

  return next as T
}

export function normalizeRestroFXBrokers<T extends { name: string }>(brands: T[]): T[] {
  return brands.map(withRestroFXOverrides)
}

/** Keeps RestroFX as the first row whenever it appears in a broker list. */
export function withRestroFXFirst<T extends { name: string }>(brands: T[]): T[] {
  const normalized = normalizeRestroFXBrokers(brands)
  const idx = normalized.findIndex((b) => b.name === "RestroFX")
  if (idx <= 0) return normalized
  const next = [...normalized]
  const [row] = next.splice(idx, 1)
  return [row, ...next]
}
