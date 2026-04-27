-- Update RestroFX directory record to surface the new PowerUp Account USP
-- (lead with PowerUp messaging in description/tags; keep ECN/RAW context intact)
-- Companion to scripts/13-restrofx-featured-pin.sql which handles is_featured flag.

UPDATE brokers
SET
  description = 'TradeLocker broker with new PowerUp Account: 125% buying-power bonus on every deposit (no challenge, no evaluation). Also offers ECN/Standard from $25 and RAW from $500.',
  tags = ARRAY['PowerUp Bonus', 'Prop Firms', 'TradeLocker', 'ECN', 'RAW']
WHERE LOWER(name) = 'restrofx';

-- Confirm the pin + updated copy
SELECT name, is_featured, min_deposit, tags, description
FROM brokers
WHERE LOWER(name) = 'restrofx';
