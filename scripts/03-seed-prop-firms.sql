-- Insert prop firms data
INSERT INTO prop_firms (name, logo, description, tags, affiliate_link, min_deposit, deposit_fee, withdrawal_fee, inactivity_fee, country_established, country_code, year_established, asset_types, is_featured)
VALUES 
  (
    'TradePro Capital',
    '/images/logos/tradepro-capital.png',
    'Leading prop trading firm offering funded accounts up to $200K with flexible profit splits.',
    ARRAY['Funded Accounts', 'High Profit Split', 'No Time Limit'],
    'https://tradeprocapital.com',
    99.00,
    'None',
    'None',
    'None',
    'United States',
    'us',
    2020,
    ARRAY['forex', 'stocks', 'commodities'],
    true
  ),
  (
    'Elite Traders Fund',
    '/images/logos/elite-traders.png',
    'Prop firm with instant funding options and competitive evaluation programs for skilled traders.',
    ARRAY['Instant Funding', 'Flexible Rules', '90% Profit Split'],
    'https://elitetradersfund.com',
    149.00,
    'None',
    'None',
    'None',
    'United Kingdom',
    'gb',
    2019,
    ARRAY['forex', 'crypto', 'stocks'],
    false
  )
ON CONFLICT DO NOTHING;
