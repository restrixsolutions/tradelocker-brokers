-- Migration: Add indexes for filtering performance
-- This migration adds indexes for commonly filtered fields to improve query performance

-- Brokers table indexes
-- Array field indexes using GIN for efficient array operations
CREATE INDEX IF NOT EXISTS idx_brokers_asset_types ON brokers USING GIN (asset_types);
CREATE INDEX IF NOT EXISTS idx_brokers_tags ON brokers USING GIN (tags);

-- Regular field indexes
CREATE INDEX IF NOT EXISTS idx_brokers_min_deposit ON brokers(min_deposit);
CREATE INDEX IF NOT EXISTS idx_brokers_country_established ON brokers(country_established);
CREATE INDEX IF NOT EXISTS idx_brokers_deposit_fee ON brokers(deposit_fee);
CREATE INDEX IF NOT EXISTS idx_brokers_withdrawal_fee ON brokers(withdrawal_fee);
CREATE INDEX IF NOT EXISTS idx_brokers_inactivity_fee ON brokers(inactivity_fee);
CREATE INDEX IF NOT EXISTS idx_brokers_year_established ON brokers(year_established);

-- Composite indexes for common filter combinations
CREATE INDEX IF NOT EXISTS idx_brokers_featured_name ON brokers(is_featured DESC, name ASC);
CREATE INDEX IF NOT EXISTS idx_brokers_featured_min_deposit ON brokers(is_featured DESC, min_deposit ASC);
CREATE INDEX IF NOT EXISTS idx_brokers_featured_year ON brokers(is_featured DESC, year_established ASC);

-- Prop firms table indexes
-- Array field indexes using GIN
CREATE INDEX IF NOT EXISTS idx_prop_firms_asset_types ON prop_firms USING GIN (asset_types);
CREATE INDEX IF NOT EXISTS idx_prop_firms_tags ON prop_firms USING GIN (tags);

-- Regular field indexes
CREATE INDEX IF NOT EXISTS idx_prop_firms_country_established ON prop_firms(country_established);
CREATE INDEX IF NOT EXISTS idx_prop_firms_year_established ON prop_firms(year_established);

-- Prop firm specific indexes (already created in previous migration)
-- CREATE INDEX IF NOT EXISTS idx_prop_firms_challenge_type ON prop_firms(challenge_type);
-- CREATE INDEX IF NOT EXISTS idx_prop_firms_profit_split ON prop_firms(profit_split);
-- CREATE INDEX IF NOT EXISTS idx_prop_firms_max_funding_amount ON prop_firms(max_funding_amount);
-- CREATE INDEX IF NOT EXISTS idx_prop_firms_payout_frequency ON prop_firms(payout_frequency);

-- Composite indexes for common sort combinations
CREATE INDEX IF NOT EXISTS idx_prop_firms_featured_profit_split_name 
  ON prop_firms(is_featured DESC, profit_split DESC, name ASC);
CREATE INDEX IF NOT EXISTS idx_prop_firms_featured_name 
  ON prop_firms(is_featured DESC, name ASC);
CREATE INDEX IF NOT EXISTS idx_prop_firms_featured_year 
  ON prop_firms(is_featured DESC, year_established ASC);

-- Analyze tables to update statistics for query planner
ANALYZE brokers;
ANALYZE prop_firms;

-- Add comments to document the indexes
COMMENT ON INDEX idx_brokers_asset_types IS 'GIN index for efficient asset_types array filtering';
COMMENT ON INDEX idx_brokers_tags IS 'GIN index for efficient tags array filtering';
COMMENT ON INDEX idx_prop_firms_asset_types IS 'GIN index for efficient asset_types array filtering';
COMMENT ON INDEX idx_prop_firms_tags IS 'GIN index for efficient tags array filtering';
