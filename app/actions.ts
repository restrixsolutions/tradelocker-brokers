"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Broker, PropFirm } from "@/lib/types"
import { normalizeRestroFXBrokers, withRestroFXFirst } from "@/lib/broker-sort"

export interface BrokerFilterParams {
  assetTypes?: string[]
  minDepositRanges?: string[]
  leverageOptions?: string[]
  countries?: string[]
  tags?: string[]
  noDepositFee?: boolean
  noInactivityFee?: boolean
  sortField?: "name" | "minDeposit" | "yearEstablished"
  sortDirection?: "asc" | "desc"
}

export interface PropFirmFilterParams extends BrokerFilterParams {
  challengeTypes?: string[]
  profitSplitMin?: number
  maxFundingMin?: number
  payoutFrequencies?: string[]
}

export async function getFilteredBrokers(params: BrokerFilterParams = {}): Promise<Broker[]> {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("brokers")
    .select(`
      id, name, logo, description, tags, asset_types, 
      min_deposit, deposit_fee, withdrawal_fee, inactivity_fee, leverage, regulation, 
      country_established, country_code, year_established, 
      affiliate_link, is_featured, youtube_url
    `)

  if (error) {
    console.error('Error fetching filtered brokers:', error)
    return []
  }

  const allBrokers = normalizeRestroFXBrokers((data || []) as Broker[])

  const filtered = allBrokers.filter((broker) => {
    if (params.assetTypes && params.assetTypes.length > 0) {
      const hasMatchingAsset = params.assetTypes.some((assetType) => broker.asset_types.includes(assetType))
      if (!hasMatchingAsset) return false
    }

    if (params.minDepositRanges && params.minDepositRanges.length > 0) {
      const matchesRange = params.minDepositRanges.some((range) => {
        if (range === "0-50") return broker.min_deposit >= 0 && broker.min_deposit <= 50
        if (range === "50-100") return broker.min_deposit > 50 && broker.min_deposit <= 100
        if (range === "100-500") return broker.min_deposit > 100 && broker.min_deposit <= 500
        if (range === "500+") return broker.min_deposit > 500
        return false
      })
      if (!matchesRange) return false
    }

    if (params.countries && params.countries.length > 0 && !params.countries.includes(broker.country_established)) {
      return false
    }

    if (params.tags && params.tags.length > 0) {
      const hasMatchingTag = params.tags.some((tag) => broker.tags.includes(tag))
      if (!hasMatchingTag) return false
    }

    // Leverage filter — match if broker's leverage string contains the selected ratio
    if (params.leverageOptions && params.leverageOptions.length > 0) {
      const lev = (broker.leverage || "").toLowerCase()
      const matches = params.leverageOptions.some((opt) => lev.includes(opt.toLowerCase()))
      if (!matches) return false
    }

    if (params.noDepositFee && broker.deposit_fee !== "None") return false
    if (params.noInactivityFee && broker.inactivity_fee !== "None") return false

    return true
  })

  const sortField = params.sortField
  const sortDirection = params.sortDirection || "asc"

  // If no sort field specified, randomize non-featured rows.
  if (!sortField) {
    const featured = filtered.filter((b) => b.is_featured)
    const nonFeatured = filtered.filter((b) => !b.is_featured)

    for (let i = nonFeatured.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[nonFeatured[i], nonFeatured[j]] = [nonFeatured[j], nonFeatured[i]]
    }

    return withRestroFXFirst([...featured, ...nonFeatured])
  }

  const sorted = [...filtered].sort((a, b) => {
    // Keep featured first, then sort.
    if (a.is_featured !== b.is_featured) {
      return b.is_featured ? 1 : -1
    }

    let comparison = 0
    if (sortField === "name") comparison = a.name.localeCompare(b.name)
    if (sortField === "minDeposit") comparison = a.min_deposit - b.min_deposit
    if (sortField === "yearEstablished") comparison = a.year_established - b.year_established
    return sortDirection === "asc" ? comparison : -comparison
  })

  return withRestroFXFirst(sorted)
}

export async function getFilteredPropFirms(params: PropFirmFilterParams = {}): Promise<PropFirm[]> {
  const supabase = await getSupabaseServerClient()
  
  let query = supabase
    .from("prop_firms")
    .select(`
      id, name, logo, description, tags, asset_types,
      country_established, country_code, year_established,
      affiliate_link, is_featured, youtube_url,
      max_funding_amount, profit_split, profit_split_scaled,
      challenge_type, challenge_fee, refundable_fee,
      phase_1_profit_target, phase_2_profit_target,
      max_daily_loss, max_total_drawdown, drawdown_type,
      payout_frequency, min_payout_amount, scaling_plan,
      min_trading_days, max_trading_days,
      news_trading_allowed, weekend_holding_allowed, ea_allowed,
      consistency_rule, copy_trading_allowed, swap_free, leverage
    `)
    
  // Apply filters
  if (params.assetTypes && params.assetTypes.length > 0) {
    query = query.or(params.assetTypes.map(asset => `asset_types.cs.{${asset}}`).join(','))
  }
  
  if (params.countries && params.countries.length > 0) {
    query = query.in('country_established', params.countries)
  }
  
  if (params.tags && params.tags.length > 0) {
    query = query.or(params.tags.map(tag => `tags.cs.{${tag}}`).join(','))
  }
  
  if (params.challengeTypes && params.challengeTypes.length > 0) {
    query = query.in('challenge_type', params.challengeTypes)
  }
  
  if (params.profitSplitMin) {
    query = query.gte('profit_split', params.profitSplitMin)
  }
  
  if (params.maxFundingMin) {
    query = query.gte('max_funding_amount', params.maxFundingMin)
  }
  
  if (params.payoutFrequencies && params.payoutFrequencies.length > 0) {
    query = query.in('payout_frequency', params.payoutFrequencies)
  }
  
  // Apply sorting
  const sortField = params.sortField
  const sortDirection = params.sortDirection || 'asc'
  
  // Always order featured first
  query = query.order('is_featured', { ascending: false })
  
  // If no sort field specified, randomize the order (but featured stays on top)
  if (!sortField) {
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching filtered prop firms:', error)
      return []
    }
    
    if (!data) return []
    
    // Separate featured and non-featured prop firms
    const featured = data.filter(p => p.is_featured)
    const nonFeatured = data.filter(p => !p.is_featured)
    
    // Shuffle non-featured prop firms using Fisher-Yates algorithm
    for (let i = nonFeatured.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonFeatured[i], nonFeatured[j]] = [nonFeatured[j], nonFeatured[i]]
    }
    
    // Return featured first, then randomized non-featured
    return [...featured, ...nonFeatured]
  }
  
  // Apply specific sorting
  if (sortField === 'name') {
    query = query.order('name', { ascending: sortDirection === 'asc' })
  } else if (sortField === 'yearEstablished') {
    query = query.order('year_established', { ascending: sortDirection === 'asc' })
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching filtered prop firms:', error)
    return []
  }
  
  return data || []
}

// Get unique filter values from the database
export async function getFilterOptions(type: 'broker' | 'prop-firm') {
  const supabase = await getSupabaseServerClient()
  
  if (type === 'broker') {
    const { data } = await supabase
      .from('brokers')
      .select('name, asset_types, country_established, tags')
      
    if (!data) return { assetTypes: [], countries: [], tags: [] }

    const normalized = normalizeRestroFXBrokers(data)
    const assetTypes = Array.from(new Set(normalized.flatMap(b => b.asset_types))).sort()
    const countries = Array.from(new Set(normalized.map(b => b.country_established))).sort()
    const tags = Array.from(new Set(normalized.flatMap(b => b.tags))).sort()
    
    return { assetTypes, countries, tags }
  } else {
    const { data } = await supabase
      .from('prop_firms')
      .select('asset_types, country_established, tags, challenge_type, payout_frequency')
      
    if (!data) return { 
      assetTypes: [], 
      countries: [], 
      tags: [], 
      challengeTypes: [], 
      payoutFrequencies: [] 
    }
    
    const assetTypes = Array.from(new Set(data.flatMap(b => b.asset_types))).sort()
    const countries = Array.from(new Set(data.map(b => b.country_established))).sort()
    const tags = Array.from(new Set(data.flatMap(b => b.tags))).sort()
    const challengeTypes = Array.from(new Set(data.map(b => b.challenge_type).filter(Boolean))).sort()
    const payoutFrequencies = Array.from(new Set(data.map(b => b.payout_frequency).filter(Boolean))).sort()
    
    return { assetTypes, countries, tags, challengeTypes, payoutFrequencies }
  }
}
