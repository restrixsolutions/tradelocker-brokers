export interface Broker {
  id: string
  name: string
  logo: string
  description: string
  tags: string[]
  affiliate_link: string
  min_deposit: number
  deposit_fee: string
  withdrawal_fee: string
  inactivity_fee: string
  leverage: string
  regulation: string
  country_established: string
  country_code: string
  year_established: number
  asset_types: string[]
  is_featured: boolean
  youtube_url?: string | null
  created_at?: string
  updated_at?: string
}

export interface PropFirm {
  // Core Info
  id: string
  name: string
  logo: string
  description: string
  tags: string[]
  affiliate_link: string
  country_established: string
  country_code: string
  year_established: number
  asset_types: string[]
  is_featured: boolean
  youtube_url?: string | null
  
  // Funding & Profit (Prop Firm Specific)
  max_funding_amount: number
  profit_split: number
  profit_split_scaled?: number | null
  scaling_plan: boolean
  payout_frequency: string
  min_payout_amount?: number | null
  
  // Challenge Structure (Prop Firm Specific)
  challenge_type: string
  challenge_fee: number
  refundable_fee: boolean
  phase_1_profit_target?: number | null
  phase_2_profit_target?: number | null
  
  // Risk Rules (Prop Firm Specific)
  max_daily_loss?: number | null
  max_total_drawdown?: number | null
  drawdown_type?: string | null
  min_trading_days?: number | null
  max_trading_days?: number | null
  news_trading_allowed: boolean
  weekend_holding_allowed: boolean
  ea_allowed: boolean
  
  // Additional Rules (Prop Firm Specific)
  consistency_rule: boolean
  copy_trading_allowed: boolean
  swap_free: boolean
  leverage?: string | null
  
  // Legacy fields (for backward compatibility - will be deprecated)
  min_deposit?: number
  deposit_fee?: string
  withdrawal_fee?: string
  inactivity_fee?: string
  
  // Timestamps
  created_at?: string
  updated_at?: string
}
