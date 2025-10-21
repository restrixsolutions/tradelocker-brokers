"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Broker, PropFirm } from "@/lib/types"

export interface BrokerFilterParams {
  assetTypes?: string[]
  minDepositRanges?: string[]
  countries?: string[]
  tags?: string[]
  noDepositFee?: boolean
  noWithdrawalFee?: boolean
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
  
  let query = supabase
    .from("brokers")
    .select(`
      id, name, logo, description, tags, asset_types, 
      min_deposit, deposit_fee, withdrawal_fee, regulation, 
      country_established, country_code, year_established, 
      affiliate_link, is_featured, youtube_url
    `)
    
  // Apply filters
  if (params.assetTypes && params.assetTypes.length > 0) {
    query = query.or(params.assetTypes.map(asset => `asset_types.cs.{${asset}}`).join(','))
  }
  
  if (params.minDepositRanges && params.minDepositRanges.length > 0) {
    const rangeConditions = params.minDepositRanges.map(range => {
      switch (range) {
        case "0-50":
          return "min_deposit.gte.0,min_deposit.lte.50"
        case "50-100":
          return "min_deposit.gt.50,min_deposit.lte.100"
        case "100-500":
          return "min_deposit.gt.100,min_deposit.lte.500"
        case "500+":
          return "min_deposit.gt.500"
        default:
          return null
      }
    }).filter(Boolean)
    
    if (rangeConditions.length > 0) {
      query = query.or(rangeConditions.join(','))
    }
  }
  
  if (params.countries && params.countries.length > 0) {
    query = query.in('country_established', params.countries)
  }
  
  if (params.tags && params.tags.length > 0) {
    query = query.or(params.tags.map(tag => `tags.cs.{${tag}}`).join(','))
  }
  
  if (params.noDepositFee) {
    query = query.eq('deposit_fee', 'None')
  }
  
  if (params.noWithdrawalFee) {
    query = query.eq('withdrawal_fee', 'None')
  }
  
  // Note: Removed inactivity fee filter as we replaced it with regulation
  
  // Apply sorting
  const sortField = params.sortField
  const sortDirection = params.sortDirection || 'asc'
  
  // Always order featured first
  query = query.order('is_featured', { ascending: false })
  
  // If no sort field specified, randomize the order (but featured stays on top)
  if (!sortField) {
    // Note: We can't use random() directly in Supabase JS client ordering
    // So we'll fetch all data and randomize non-featured items in JavaScript
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching filtered brokers:', error)
      return []
    }
    
    if (!data) return []
    
    // Separate featured and non-featured brokers
    const featured = data.filter(b => b.is_featured)
    const nonFeatured = data.filter(b => !b.is_featured)
    
    // Shuffle non-featured brokers using Fisher-Yates algorithm
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
  } else if (sortField === 'minDeposit') {
    query = query.order('min_deposit', { ascending: sortDirection === 'asc' })
  } else if (sortField === 'yearEstablished') {
    query = query.order('year_established', { ascending: sortDirection === 'asc' })
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching filtered brokers:', error)
    return []
  }
  
  return data || []
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
      .select('asset_types, country_established, tags')
      
    if (!data) return { assetTypes: [], countries: [], tags: [] }
    
    const assetTypes = Array.from(new Set(data.flatMap(b => b.asset_types))).sort()
    const countries = Array.from(new Set(data.map(b => b.country_established))).sort()
    const tags = Array.from(new Set(data.flatMap(b => b.tags))).sort()
    
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
