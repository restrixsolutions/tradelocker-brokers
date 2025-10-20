# ⚡ Quick Add Template - From Research to Database

Once you have the research data from an LLM, use these templates to quickly add to your database.

---

## 🎯 Method 1: SQL INSERT (Fastest)

### For Prop Firms:

```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types, is_featured,
  challenge_type, challenge_fee, refundable_fee,
  phase_1_profit_target, phase_2_profit_target,
  max_funding_amount, profit_split, profit_split_scaled,
  scaling_plan, payout_frequency, min_payout_amount,
  max_daily_loss, max_total_drawdown, drawdown_type,
  leverage, min_trading_days, max_trading_days,
  news_trading_allowed, weekend_holding_allowed, ea_allowed,
  consistency_rule, copy_trading_allowed, swap_free,
  youtube_url
) VALUES (
  'FIRM_NAME',                          -- name
  '/logo.png',                          -- logo
  'Description here.',                  -- description
  ARRAY['Tag1', 'Tag2', 'Tag3'],       -- tags
  'https://affiliate-link.com',         -- affiliate_link
  'United States',                      -- country_established
  'us',                                 -- country_code
  2020,                                 -- year_established
  ARRAY['forex', 'stocks'],            -- asset_types
  false,                                -- is_featured
  '2-Step',                            -- challenge_type
  99,                                   -- challenge_fee
  true,                                 -- refundable_fee
  8,                                    -- phase_1_profit_target
  5,                                    -- phase_2_profit_target
  200000,                               -- max_funding_amount
  80,                                   -- profit_split
  90,                                   -- profit_split_scaled
  true,                                 -- scaling_plan
  'On-Demand',                          -- payout_frequency
  50,                                   -- min_payout_amount
  5,                                    -- max_daily_loss
  10,                                   -- max_total_drawdown
  'Trailing',                           -- drawdown_type
  '1:100',                              -- leverage
  5,                                    -- min_trading_days
  NULL,                                 -- max_trading_days
  true,                                 -- news_trading_allowed
  true,                                 -- weekend_holding_allowed
  true,                                 -- ea_allowed
  false,                                -- consistency_rule
  false,                                -- copy_trading_allowed
  true,                                 -- swap_free
  'https://youtube.com/watch?v=xyz'    -- youtube_url
);
```

### For Brokers:

```sql
INSERT INTO brokers (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types, is_featured,
  min_deposit, deposit_fee, withdrawal_fee, inactivity_fee,
  youtube_url
) VALUES (
  'BROKER_NAME',                        -- name
  '/logo.png',                          -- logo
  'Description here.',                  -- description
  ARRAY['Tag1', 'Tag2', 'Tag3'],       -- tags
  'https://affiliate-link.com',         -- affiliate_link
  'United Kingdom',                     -- country_established
  'gb',                                 -- country_code
  2018,                                 -- year_established
  ARRAY['forex', 'stocks', 'crypto'],  -- asset_types
  false,                                -- is_featured
  100,                                  -- min_deposit
  'None',                               -- deposit_fee
  'None',                               -- withdrawal_fee
  'None',                               -- inactivity_fee
  'https://youtube.com/watch?v=xyz'    -- youtube_url
);
```

---

## 📋 Method 2: Copy-Paste Template

### Step 1: Get LLM Output
Use the research questionnaire to get data from LLM.

### Step 2: Fill This Template

```
COPY THIS AND FILL IN THE BLANKS:

name: ___________________________
logo: ___________________________
description: ___________________________
tags: ["_______", "_______", "_______"]
affiliate_link: ___________________________
country_established: ___________________________
country_code: ___________________________
year_established: ___________________________
asset_types: ["_______", "_______"]
is_featured: false

[FOR PROP FIRMS ONLY]
challenge_type: ___________________________
challenge_fee: ___________________________
refundable_fee: ___________________________
phase_1_profit_target: ___________________________
phase_2_profit_target: ___________________________
max_funding_amount: ___________________________
profit_split: ___________________________
profit_split_scaled: ___________________________
scaling_plan: ___________________________
payout_frequency: ___________________________
min_payout_amount: ___________________________
max_daily_loss: ___________________________
max_total_drawdown: ___________________________
drawdown_type: ___________________________
leverage: ___________________________
min_trading_days: ___________________________
max_trading_days: ___________________________
news_trading_allowed: ___________________________
weekend_holding_allowed: ___________________________
ea_allowed: ___________________________
consistency_rule: ___________________________
copy_trading_allowed: ___________________________
swap_free: ___________________________

[FOR BROKERS ONLY]
min_deposit: ___________________________
deposit_fee: ___________________________
withdrawal_fee: ___________________________
inactivity_fee: ___________________________

[BOTH]
youtube_url: ___________________________
```

### Step 3: Convert to SQL
Use the SQL template above and replace values.

---

## 🤖 Method 3: Ask LLM to Generate SQL

### Prompt for LLM:

```
Based on the prop firm data you just researched, please generate a complete PostgreSQL INSERT statement using this exact format:

[PASTE SQL TEMPLATE FROM ABOVE]

Replace all the placeholder values with the actual data you found. Make sure:
1. Strings are in single quotes
2. Numbers have no quotes
3. Booleans are true/false (no quotes)
4. Arrays use ARRAY['value1', 'value2'] format
5. NULL values have no quotes
```

The LLM will generate ready-to-run SQL!

---

## ✅ Pre-Flight Checklist

Before running the SQL, verify:

### Data Format:
- [ ] Name is in quotes: `'Alpha Funded'`
- [ ] Numbers have NO quotes: `99` not `'99'`
- [ ] Booleans are lowercase: `true` not `'true'`
- [ ] Arrays use proper format: `ARRAY['forex', 'stocks']`
- [ ] NULL has no quotes: `NULL` not `'NULL'`
- [ ] Percentages are numbers: `80` not `'80%'`

### Data Accuracy:
- [ ] Logo path starts with `/`
- [ ] Affiliate link is complete URL
- [ ] Country code is 2 letters, lowercase
- [ ] Year is 4 digits
- [ ] Challenge type is exact: "1-Step", "2-Step", or "Instant Funding"
- [ ] Asset types are lowercase: forex, stocks, crypto, commodities
- [ ] TradeLocker support confirmed

### Required Fields (Prop Firms):
- [ ] name ✓
- [ ] logo ✓
- [ ] description ✓
- [ ] affiliate_link ✓
- [ ] challenge_type ✓
- [ ] challenge_fee ✓
- [ ] max_funding_amount ✓
- [ ] profit_split ✓
- [ ] max_daily_loss ✓
- [ ] max_total_drawdown ✓
- [ ] drawdown_type ✓
- [ ] payout_frequency ✓

### Required Fields (Brokers):
- [ ] name ✓
- [ ] logo ✓
- [ ] description ✓
- [ ] affiliate_link ✓
- [ ] min_deposit ✓
- [ ] deposit_fee ✓
- [ ] withdrawal_fee ✓
- [ ] inactivity_fee ✓

---

## 🎬 Complete Workflow Example

### Step 1: Research
```
PROMPT: Research "FTMO" using the questionnaire
```

### Step 2: Get Output
```
LLM provides structured data
```

### Step 3: Generate SQL
```
PROMPT: Convert this to SQL INSERT statement
```

### Step 4: Review
```
Check all fields match format requirements
```

### Step 5: Execute
```
Run in Supabase SQL Editor or via MCP
```

### Step 6: Verify
```
Refresh website and check display
```

---

## 💡 Time-Saving Tips

### Tip 1: Batch Processing
Research 5 prop firms, then generate all SQL at once:

```
Please generate INSERT statements for all 5 prop firms we just researched. Separate each with a semicolon and line break.
```

### Tip 2: Logo Preparation
Before adding to database:
1. Download logo
2. Rename to lowercase-with-hyphens (e.g., `alpha-funded-logo.png`)
3. Upload to `/public/` folder
4. Use path: `/alpha-funded-logo.png`

### Tip 3: Verification Script
Create a query to check your new additions:

```sql
-- Check last 5 prop firms added
SELECT name, challenge_type, challenge_fee, profit_split, created_at
FROM prop_firms
ORDER BY created_at DESC
LIMIT 5;
```

### Tip 4: Update Instead of Insert
If firm already exists, use UPDATE:

```sql
UPDATE prop_firms
SET 
  challenge_fee = 89,
  profit_split = 85,
  updated_at = NOW()
WHERE name = 'Alpha Funded';
```

---

## 🔧 Common SQL Errors & Fixes

### Error: `syntax error at or near "`
**Fix**: Check for missing quotes or commas

### Error: `column "value" does not exist`
**Fix**: Value needs quotes - it's a string not a column name

### Error: `invalid input syntax for type boolean`
**Fix**: Use `true` or `false`, not `'true'` or `'false'`

### Error: `null value in column violates not-null constraint`
**Fix**: Required field is missing - check which field and add value

### Error: `array value must start with "{"`
**Fix**: Use `ARRAY['value']` not just `['value']`

---

## 📞 Quick Reference

### PostgreSQL Array Syntax:
```sql
ARRAY['value1', 'value2', 'value3']
```

### PostgreSQL Boolean:
```sql
true  -- Not 'true' or TRUE
false -- Not 'false' or FALSE
```

### PostgreSQL NULL:
```sql
NULL  -- Not 'NULL' or 'null'
```

### PostgreSQL String:
```sql
'String value'  -- Single quotes only
```

### PostgreSQL Number:
```sql
99    -- No quotes
99.00 -- No quotes
```

---

## 🚀 Ready-to-Use Examples

### Example 1: Minimal Prop Firm (Required Fields Only)
```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, year_established, asset_types,
  challenge_type, challenge_fee, max_funding_amount, profit_split,
  max_daily_loss, max_total_drawdown, drawdown_type, payout_frequency
) VALUES (
  'Quick Prop Firm',
  '/quick-logo.png',
  'Fast and simple prop firm.',
  ARRAY['2-Step', 'Fast'],
  'https://quickprop.com',
  'United States',
  2024,
  ARRAY['forex'],
  '2-Step',
  99,
  100000,
  80,
  5,
  10,
  'Trailing',
  'Monthly'
);
```

### Example 2: Full Featured Prop Firm (All Fields)
```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types, is_featured,
  challenge_type, challenge_fee, refundable_fee, phase_1_profit_target, phase_2_profit_target,
  max_funding_amount, profit_split, profit_split_scaled, scaling_plan,
  payout_frequency, min_payout_amount, max_daily_loss, max_total_drawdown,
  drawdown_type, leverage, min_trading_days, max_trading_days,
  news_trading_allowed, weekend_holding_allowed, ea_allowed,
  consistency_rule, copy_trading_allowed, swap_free, youtube_url
) VALUES (
  'Premium Prop Firm',
  '/premium-logo.png',
  'Industry-leading prop firm with the best conditions.',
  ARRAY['Instant Funding', '95% Split', 'No Rules'],
  'https://premiumprop.com/ref123',
  'United Kingdom',
  'gb',
  2023,
  ARRAY['forex', 'stocks', 'crypto', 'commodities'],
  true,
  'Instant Funding',
  149,
  true,
  NULL,
  NULL,
  300000,
  95,
  98,
  true,
  'On-Demand',
  0,
  5,
  10,
  'Trailing',
  '1:100',
  NULL,
  NULL,
  true,
  true,
  true,
  false,
  true,
  true,
  'https://youtube.com/watch?v=example'
);
```

---

**You're ready to add prop firms and brokers quickly!** 🎉

Use the research questionnaires, get LLM output, generate SQL, and add to database - all in minutes!

