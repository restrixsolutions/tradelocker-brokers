-- Pin RestroFX as the featured broker and clear other brokers from featured
-- (site UI sorts RestroFX first; this aligns DB flags for badges and filters)
UPDATE brokers SET is_featured = false WHERE name <> 'RestroFX';
UPDATE brokers SET is_featured = true WHERE LOWER(name) = 'restrofx';

-- Align RestroFX directory fields with internal pricing doc (ECN retail entry)
UPDATE brokers
SET
  affiliate_link = 'https://portal.restrofx.com/r/0Osaul1w',
  min_deposit = 25.00,
  leverage = '1:500 up to 1:1000',
  regulation = 'Unregulated',
  description = 'TradeLocker broker with ECN/Standard from $25, leverage 1:500 up to 1:1000, VIP wider markups, and RAW $18 RT from $500.',
  tags = ARRAY['Prop Firms', 'TradeLocker', 'ECN', 'RAW'],
  asset_types = ARRAY['forex', 'stocks', 'crypto', 'commodities', 'indices']
WHERE LOWER(name) = 'restrofx';

SELECT name, is_featured, min_deposit FROM brokers ORDER BY is_featured DESC, name;
