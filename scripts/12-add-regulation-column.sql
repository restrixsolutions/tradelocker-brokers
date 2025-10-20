-- Add regulation column to brokers table
ALTER TABLE brokers ADD COLUMN regulation VARCHAR(100) DEFAULT 'Unregulated';

-- Update GatesFX to FSCA Regulated
UPDATE brokers 
SET regulation = 'FSCA Regulated'
WHERE name = 'GatesFX';

-- Update all other brokers to Unregulated (if any exist)
UPDATE brokers 
SET regulation = 'Unregulated'
WHERE name != 'GatesFX';

-- Verify the updates
SELECT name, regulation, country_established 
FROM brokers 
ORDER BY name;
