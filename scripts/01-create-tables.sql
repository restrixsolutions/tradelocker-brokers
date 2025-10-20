-- Create brokers table
CREATE TABLE IF NOT EXISTS brokers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  affiliate_link TEXT NOT NULL,
  min_deposit NUMERIC(10,2) NOT NULL,
  deposit_fee TEXT NOT NULL DEFAULT 'None',
  withdrawal_fee TEXT NOT NULL DEFAULT 'None',
  inactivity_fee TEXT NOT NULL DEFAULT 'None',
  country_established TEXT NOT NULL,
  country_code TEXT NOT NULL,
  year_established INTEGER NOT NULL,
  asset_types TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prop_firms table
CREATE TABLE IF NOT EXISTS prop_firms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  affiliate_link TEXT NOT NULL,
  min_deposit NUMERIC(10,2) NOT NULL,
  deposit_fee TEXT NOT NULL DEFAULT 'None',
  withdrawal_fee TEXT NOT NULL DEFAULT 'None',
  inactivity_fee TEXT NOT NULL DEFAULT 'None',
  country_established TEXT NOT NULL,
  country_code TEXT NOT NULL,
  year_established INTEGER NOT NULL,
  asset_types TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_brokers_name ON brokers(name);
CREATE INDEX IF NOT EXISTS idx_brokers_featured ON brokers(is_featured);
CREATE INDEX IF NOT EXISTS idx_prop_firms_name ON prop_firms(name);
CREATE INDEX IF NOT EXISTS idx_prop_firms_featured ON prop_firms(is_featured);

-- Enable Row Level Security
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;
ALTER TABLE prop_firms ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to brokers" ON brokers
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to prop_firms" ON prop_firms
  FOR SELECT USING (true);
