-- Update any existing prop firm logo paths to use correct format
UPDATE prop_firms 
SET logo = '/images/logos/' || LOWER(REPLACE(name, ' ', '-')) || '.png'
WHERE logo NOT LIKE '/images/logos/%';

-- Update any existing broker logo paths if needed
UPDATE brokers 
SET logo = '/images/logos/' || LOWER(REPLACE(name, ' ', '-')) || '.png'
WHERE logo NOT LIKE '/images/logos/%';
