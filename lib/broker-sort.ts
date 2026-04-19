import type { Broker } from "@/lib/types"

const RESTROFX_AFFILIATE_LINK = "https://portal.restrofx.com/r/0Osaul1w"

function withRestroFXOverrides<T extends { name: string }>(brand: T): T {
  if (brand.name !== "RestroFX") return brand

  const next: Record<string, unknown> = { ...brand }

  // Keep RestroFX UI values consistent even if DB row is stale.
  if ("affiliate_link" in next) next.affiliate_link = RESTROFX_AFFILIATE_LINK
  if ("min_deposit" in next) next.min_deposit = 25
  if ("leverage" in next) next.leverage = "1:500 up to 1:1000"
  if ("regulation" in next) next.regulation = "Unregulated"
  if ("asset_types" in next) next.asset_types = ["forex", "crypto", "stocks", "commodities", "indices"]

  return next as T
}

/** Keeps RestroFX as the first row whenever it appears in a broker list. */
export function withRestroFXFirst<T extends { name: string }>(brands: T[]): T[] {
  const normalized = brands.map(withRestroFXOverrides)
  const idx = normalized.findIndex((b) => b.name === "RestroFX")
  if (idx <= 0) return normalized
  const next = [...normalized]
  const [row] = next.splice(idx, 1)
  return [row, ...next]
}
