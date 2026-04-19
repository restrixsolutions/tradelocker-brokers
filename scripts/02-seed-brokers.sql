-- Insert brokers data
INSERT INTO brokers (name, logo, description, tags, affiliate_link, min_deposit, deposit_fee, withdrawal_fee, inactivity_fee, regulation, country_established, country_code, year_established, asset_types, is_featured)
VALUES 
  (
    'GatesFX',
    '/images/logos/gatesfx.png',
    'Professional forex broker with competitive spreads and advanced trading tools for serious traders.',
    ARRAY['Low Spreads', 'ECN', 'MetaTrader'],
    'https://gatesfx.com',
    25.00,
    'None',
    'None',
    'None',
    'FSCA Regulated',
    'South Africa',
    'za',
    2015,
    ARRAY['forex', 'crypto', 'stocks', 'commodities'],
    false
  ),
  (
    'HeroFX',
    '/images/logos/herofx.png',
    'Next-generation trading platform with lightning-fast execution and institutional-grade infrastructure.',
    ARRAY['Fast Execution', 'Low Fees', 'Demo Account'],
    'https://herofx.com',
    5.00,
    'None',
    'None',
    'None',
    'Unregulated',
    'St. Lucia',
    'lc',
    2021,
    ARRAY['forex', 'crypto', 'stocks', 'commodities'],
    false
  ),
  (
    'RestroFX',
    '/images/logos/restrofx.svg',
    'TradeLocker broker with ECN/Standard from $25, leverage 1:500 up to 1:1000, and RAW $18 RT from $500.',
    ARRAY['Prop Firms', 'TradeLocker', 'ECN', 'RAW'],
    'https://portal.restrofx.com/r/0Osaul1w',
    25.00,
    'None',
    'None',
    'None',
    'Unregulated',
    'Saint Lucia',
    'lc',
    2024,
    ARRAY['forex', 'stocks', 'crypto', 'commodities', 'indices'],
    true
  )
ON CONFLICT DO NOTHING;
