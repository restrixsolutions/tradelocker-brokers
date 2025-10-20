-- Migration: Add Prop Firm Specific Fields
-- This migration adds all the necessary fields for prop firms that differ from brokers

-- Add Funding & Profit columns
ALTER TABLE prop_firms 
  ADD COLUMN IF NOT EXISTS max_funding_amount NUMERIC NOT NULL DEFAULT 100000,
  ADD COLUMN IF NOT EXISTS profit_split NUMERIC NOT NULL DEFAULT 80,
  ADD COLUMN IF NOT EXISTS profit_split_scaled NUMERIC,
  ADD COLUMN IF NOT EXISTS scaling_plan BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS payout_frequency TEXT DEFAULT 'Monthly',
  ADD COLUMN IF NOT EXISTS min_payout_amount NUMERIC DEFAULT 100;

-- Add Challenge/Evaluation Structure columns
ALTER TABLE prop_firms 
  ADD COLUMN IF NOT EXISTS challenge_type TEXT DEFAULT '2-Step',
  ADD COLUMN IF NOT EXISTS challenge_fee NUMERIC,
  ADD COLUMN IF NOT EXISTS refundable_fee BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS phase_1_profit_target NUMERIC DEFAULT 10,
  ADD COLUMN IF NOT EXISTS phase_2_profit_target NUMERIC DEFAULT 5;

-- Add Risk Rules columns
ALTER TABLE prop_firms 
  ADD COLUMN IF NOT EXISTS max_daily_loss NUMERIC DEFAULT 5,
  ADD COLUMN IF NOT EXISTS max_total_drawdown NUMERIC DEFAULT 10,
  ADD COLUMN IF NOT EXISTS drawdown_type TEXT DEFAULT 'Trailing',
  ADD COLUMN IF NOT EXISTS min_trading_days INTEGER,
  ADD COLUMN IF NOT EXISTS max_trading_days INTEGER,
  ADD COLUMN IF NOT EXISTS news_trading_allowed BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS weekend_holding_allowed BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS ea_allowed BOOLEAN DEFAULT true;

-- Add Additional Rules & Info columns
ALTER TABLE prop_firms 
  ADD COLUMN IF NOT EXISTS consistency_rule BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS copy_trading_allowed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS swap_free BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS leverage TEXT DEFAULT '1:100';

-- Add comment to clarify the purpose of these fields
COMMENT ON COLUMN prop_firms.max_funding_amount IS 'Maximum account size offered (e.g., 200000 for $200K)';
COMMENT ON COLUMN prop_firms.profit_split IS 'Percentage of profits the trader keeps (e.g., 80 for 80%)';
COMMENT ON COLUMN prop_firms.profit_split_scaled IS 'Increased profit split after account scaling (optional)';
COMMENT ON COLUMN prop_firms.scaling_plan IS 'Whether the firm offers account scaling/growth';
COMMENT ON COLUMN prop_firms.payout_frequency IS 'How often payouts are processed (e.g., Weekly, Monthly, On-Demand)';
COMMENT ON COLUMN prop_firms.challenge_type IS 'Type of evaluation (e.g., 1-Step, 2-Step, Instant Funding)';
COMMENT ON COLUMN prop_firms.challenge_fee IS 'Cost to enter the evaluation/challenge';
COMMENT ON COLUMN prop_firms.refundable_fee IS 'Whether the challenge fee is refunded upon first payout';
COMMENT ON COLUMN prop_firms.phase_1_profit_target IS 'Profit target % for phase 1 (if applicable)';
COMMENT ON COLUMN prop_firms.phase_2_profit_target IS 'Profit target % for phase 2 (if applicable)';
COMMENT ON COLUMN prop_firms.max_daily_loss IS 'Maximum daily loss percentage allowed';
COMMENT ON COLUMN prop_firms.max_total_drawdown IS 'Maximum total drawdown percentage allowed';
COMMENT ON COLUMN prop_firms.drawdown_type IS 'Type of drawdown calculation (Static, Trailing, Balance-Based, Equity-Based)';
COMMENT ON COLUMN prop_firms.min_trading_days IS 'Minimum number of trading days required';
COMMENT ON COLUMN prop_firms.max_trading_days IS 'Maximum days allowed to complete challenge (NULL = unlimited)';
COMMENT ON COLUMN prop_firms.news_trading_allowed IS 'Whether trading during news events is permitted';
COMMENT ON COLUMN prop_firms.weekend_holding_allowed IS 'Whether positions can be held over the weekend';
COMMENT ON COLUMN prop_firms.ea_allowed IS 'Whether Expert Advisors/trading bots are allowed';
COMMENT ON COLUMN prop_firms.consistency_rule IS 'Whether firm has consistency/max daily profit requirements';
COMMENT ON COLUMN prop_firms.copy_trading_allowed IS 'Whether copy trading is permitted';
COMMENT ON COLUMN prop_firms.swap_free IS 'Whether swap-free/Islamic accounts are available';
COMMENT ON COLUMN prop_firms.leverage IS 'Available leverage (e.g., 1:100, 1:30)';

-- Migrate existing min_deposit values to challenge_fee
UPDATE prop_firms 
SET challenge_fee = min_deposit 
WHERE challenge_fee IS NULL AND min_deposit IS NOT NULL;

-- Add deprecation comments to old broker-specific fields
COMMENT ON COLUMN prop_firms.min_deposit IS 'DEPRECATED: Use challenge_fee instead. Kept for backward compatibility.';
COMMENT ON COLUMN prop_firms.deposit_fee IS 'DEPRECATED: Not applicable to prop firms. Kept for backward compatibility.';
COMMENT ON COLUMN prop_firms.withdrawal_fee IS 'DEPRECATED: Not applicable to prop firms. Kept for backward compatibility.';
COMMENT ON COLUMN prop_firms.inactivity_fee IS 'DEPRECATED: Not applicable to prop firms. Kept for backward compatibility.';

-- Create indexes for commonly filtered fields
CREATE INDEX IF NOT EXISTS idx_prop_firms_challenge_type ON prop_firms(challenge_type);
CREATE INDEX IF NOT EXISTS idx_prop_firms_profit_split ON prop_firms(profit_split);
CREATE INDEX IF NOT EXISTS idx_prop_firms_max_funding_amount ON prop_firms(max_funding_amount);
CREATE INDEX IF NOT EXISTS idx_prop_firms_payout_frequency ON prop_firms(payout_frequency);

