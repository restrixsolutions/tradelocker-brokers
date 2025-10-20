-- Update GatesFX country to South Africa
UPDATE brokers 
SET 
  country_established = 'South Africa',
  country_code = 'za'
WHERE name = 'GatesFX';

-- Verify the update
SELECT name, country_established, country_code, year_established 
FROM brokers 
WHERE name = 'GatesFX';
