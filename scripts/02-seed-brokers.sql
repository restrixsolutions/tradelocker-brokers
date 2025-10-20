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
    true
  )
ON CONFLICT DO NOTHING;
