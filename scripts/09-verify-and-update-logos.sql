-- Verify current logo paths in brokers table
SELECT name, logo FROM brokers ORDER BY name;

-- Verify current logo paths in prop_firms table
SELECT name, logo FROM prop_firms ORDER BY name;

-- Update brokers logos to ensure correct paths
UPDATE brokers 
SET logo = CASE 
  WHEN LOWER(name) = 'gatesfx' THEN '/images/logos/gatesfx.png'
  WHEN LOWER(name) = 'herofx' THEN '/images/logos/herofx.png'
  ELSE '/placeholder.svg'
END
WHERE logo IS NULL OR logo = '' OR logo NOT LIKE '/images/logos/%';

-- Update prop_firms logos to ensure correct paths
UPDATE prop_firms 
SET logo = CASE 
  WHEN LOWER(name) = 'alphafunded' THEN '/alphafunded-prop-firm-logo.jpg'
  WHEN LOWER(name) = 'fundedtrader' THEN '/fundedtrader-prop-firm-logo.jpg'
  WHEN LOWER(name) = 'propelite' THEN '/propelite-prop-firm-logo.jpg'
  WHEN LOWER(name) = 'tradecapital' THEN '/tradecapital-prop-firm-logo.jpg'
  ELSE '/placeholder.svg'
END
WHERE logo IS NULL OR logo = '' OR NOT (logo LIKE '/images/logos/%' OR logo LIKE '/%prop-firm-logo.jpg');

-- Verify the updates
SELECT 'Brokers after update:' as info;
SELECT name, logo FROM brokers ORDER BY name;

SELECT 'Prop Firms after update:' as info;
SELECT name, logo FROM prop_firms ORDER BY name;

