-- Update existing prop firms with proper data
-- This script updates the existing prop firm records with accurate prop firm information

-- Update TradePro Capital (now Alpha Funded)
UPDATE prop_firms
SET 
  name = 'Alpha Funded',
  description = 'Leading prop firm with flexible challenges, high profit splits, and instant funding options.',
  tags = ARRAY['2-Step Challenge', 'Instant Funding', '90% Profit Split', 'Trailing Drawdown', 'Scaling Available'],
  max_funding_amount = 200000,
  profit_split = 80,
  profit_split_scaled = 90,
  scaling_plan = true,
  payout_frequency = 'On-Demand',
  min_payout_amount = 50,
  challenge_type = '2-Step',
  challenge_fee = 99,
  refundable_fee = true,
  phase_1_profit_target = 8,
  phase_2_profit_target = 5,
  max_daily_loss = 5,
  max_total_drawdown = 10,
  drawdown_type = 'Trailing',
  min_trading_days = 5,
  max_trading_days = NULL,
  news_trading_allowed = true,
  weekend_holding_allowed = true,
  ea_allowed = true,
  consistency_rule = false,
  copy_trading_allowed = false,
  swap_free = true,
  leverage = '1:100'
WHERE name = 'TradePro Capital';

-- Update Elite Traders Fund (now Funded Trader)
UPDATE prop_firms
SET 
  name = 'Funded Trader',
  description = 'Established prop firm offering instant funding and traditional 2-step challenges with competitive profit splits.',
  tags = ARRAY['Instant Funding', '1-Step Challenge', '80% Profit Split', 'No Time Limit', 'Expert Advisors Allowed'],
  max_funding_amount = 300000,
  profit_split = 80,
  profit_split_scaled = 95,
  scaling_plan = true,
  payout_frequency = 'Bi-weekly',
  min_payout_amount = 100,
  challenge_type = 'Instant Funding',
  challenge_fee = 149,
  refundable_fee = false,
  phase_1_profit_target = NULL,
  phase_2_profit_target = NULL,
  max_daily_loss = 5,
  max_total_drawdown = 12,
  drawdown_type = 'Balance-Based',
  min_trading_days = NULL,
  max_trading_days = NULL,
  news_trading_allowed = true,
  weekend_holding_allowed = true,
  ea_allowed = true,
  consistency_rule = true,
  copy_trading_allowed = true,
  swap_free = true,
  leverage = '1:100'
WHERE name = 'Elite Traders Fund';

-- Insert additional example prop firms
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types, is_featured,
  max_funding_amount, profit_split, profit_split_scaled, scaling_plan,
  payout_frequency, min_payout_amount, challenge_type, challenge_fee,
  refundable_fee, phase_1_profit_target, phase_2_profit_target,
  max_daily_loss, max_total_drawdown, drawdown_type,
  min_trading_days, max_trading_days, news_trading_allowed,
  weekend_holding_allowed, ea_allowed, consistency_rule,
  copy_trading_allowed, swap_free, leverage
) VALUES 
(
  'Prop Elite',
  '/propelite-prop-firm-logo.jpg',
  'Premium prop firm with generous profit splits and flexible trading rules for experienced traders.',
  ARRAY['2-Step Challenge', '90% Profit Split', 'No Consistency Rule', 'Fast Payouts', 'Trailing Drawdown'],
  'https://propelite.com',
  'United Kingdom',
  'gb',
  2021,
  ARRAY['forex', 'stocks', 'commodities', 'crypto'],
  false,
  250000,
  90,
  95,
  true,
  'Weekly',
  50,
  '2-Step',
  119,
  true,
  10,
  5,
  5,
  10,
  'Trailing',
  4,
  30,
  false,
  true,
  true,
  false,
  false,
  true,
  '1:50'
)
ON CONFLICT (id) DO NOTHING;

-- Add comments for clarity
COMMENT ON TABLE prop_firms IS 'Proprietary trading firms that fund traders - distinct from retail brokers';

