# 📊 Data Management Guide

## ✅ All Data Comes from Supabase

Your application is now **100% database-driven**. There is **NO hardcoded data** in the codebase.

### What Was Removed:
- ❌ `/data/brokers.ts` - Deleted
- ❌ `/data/prop-firms.ts` - Deleted
- ❌ Hardcoded fallback values - Removed

### What Remains:
- ✅ All data pulled from Supabase
- ✅ Dynamic queries on every page load
- ✅ Real-time updates when database changes

---

## 🎯 How to Add/Update Data

### Option 1: Using Supabase Dashboard (Recommended for Non-Developers)

#### Adding a New Broker:
1. Go to Supabase Dashboard → Table Editor
2. Select `brokers` table
3. Click "Insert" → "Insert row"
4. Fill in the fields:

**Required Fields:**
- `name` - Broker name (e.g., "MetaTrader FX")
- `logo` - Logo path (e.g., "/metatrader-logo.png")
- `description` - Brief description
- `tags` - Array of tags (e.g., ["ECN", "Low Spreads"])
- `affiliate_link` - Your affiliate URL
- `min_deposit` - Minimum deposit amount (number)
- `deposit_fee` - Fee or "None"
- `withdrawal_fee` - Fee or "None"
- `inactivity_fee` - Fee or "None"
- `country_established` - Country name
- `year_established` - Year (number)
- `asset_types` - Array (e.g., ["forex", "stocks", "crypto"])
- `is_featured` - true/false

**Optional Fields:**
- `youtube_url` - YouTube video URL (full URL)
- `country_code` - 2-letter code (e.g., "us")

5. Click "Save"
6. Refresh your website - the broker appears instantly!

#### Adding a New Prop Firm:
1. Go to Supabase Dashboard → Table Editor
2. Select `prop_firms` table
3. Click "Insert" → "Insert row"
4. Fill in the fields:

**Core Fields (Same as Brokers):**
- `name` - Prop firm name
- `logo` - Logo path
- `description` - Brief description
- `tags` - Array of tags
- `affiliate_link` - Your affiliate URL
- `country_established` - Country
- `year_established` - Year
- `asset_types` - Array of assets
- `is_featured` - true/false
- `youtube_url` - Optional YouTube URL

**Prop Firm Specific Fields (REQUIRED):**
- `challenge_type` - "1-Step", "2-Step", or "Instant Funding"
- `challenge_fee` - Cost to enter (number, e.g., 99)
- `max_funding_amount` - Max account size (number, e.g., 200000)
- `profit_split` - Base profit % (number, e.g., 80)
- `max_daily_loss` - Daily loss % (number, e.g., 5)
- `max_total_drawdown` - Total drawdown % (number, e.g., 10)
- `drawdown_type` - "Trailing", "Static", "Balance-Based", etc.
- `payout_frequency` - "Weekly", "Bi-weekly", "Monthly", "On-Demand"

**Prop Firm Specific Fields (OPTIONAL):**
- `profit_split_scaled` - Scaled profit % after growth
- `scaling_plan` - true/false (does firm offer scaling?)
- `min_payout_amount` - Minimum withdrawal (number)
- `refundable_fee` - true/false (is challenge fee refundable?)
- `phase_1_profit_target` - Phase 1 target % (number)
- `phase_2_profit_target` - Phase 2 target % (number)
- `min_trading_days` - Minimum days required (number)
- `max_trading_days` - Maximum days allowed (number)
- `leverage` - Available leverage (text, e.g., "1:100")
- `news_trading_allowed` - true/false
- `weekend_holding_allowed` - true/false
- `ea_allowed` - true/false (Expert Advisors)
- `consistency_rule` - true/false
- `copy_trading_allowed` - true/false
- `swap_free` - true/false

5. Click "Save"
6. Refresh your website - the prop firm appears instantly!

---

### Option 2: Using SQL (Recommended for Developers)

#### Add a Broker via SQL:
```sql
INSERT INTO brokers (
  name, logo, description, tags, affiliate_link,
  min_deposit, deposit_fee, withdrawal_fee, inactivity_fee,
  country_established, country_code, year_established, 
  asset_types, is_featured, youtube_url
) VALUES (
  'Your Broker Name',
  '/your-broker-logo.png',
  'Great broker with low spreads and fast execution.',
  ARRAY['ECN', 'Low Spreads', 'Fast Execution'],
  'https://youraffiliatelink.com',
  100,
  'None',
  'None',
  'None',
  'United Kingdom',
  'gb',
  2020,
  ARRAY['forex', 'stocks', 'crypto'],
  false,
  'https://www.youtube.com/watch?v=VIDEO_ID'
);
```

#### Add a Prop Firm via SQL:
```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types, is_featured,
  challenge_type, challenge_fee, max_funding_amount, profit_split, profit_split_scaled,
  max_daily_loss, max_total_drawdown, drawdown_type, payout_frequency,
  refundable_fee, phase_1_profit_target, phase_2_profit_target,
  scaling_plan, min_payout_amount, leverage,
  news_trading_allowed, weekend_holding_allowed, ea_allowed,
  consistency_rule, copy_trading_allowed, swap_free
) VALUES (
  'Your Prop Firm',
  '/your-propfirm-logo.png',
  'Amazing prop firm with great profit splits and flexible rules.',
  ARRAY['2-Step Challenge', '90% Profit Split', 'Scaling Available'],
  'https://youraffiliatelink.com',
  'United States',
  'us',
  2023,
  ARRAY['forex', 'stocks', 'commodities'],
  false,
  '2-Step',
  99,
  200000,
  80,
  90,
  5,
  10,
  'Trailing',
  'On-Demand',
  true,
  8,
  5,
  true,
  50,
  '1:100',
  true,
  true,
  true,
  false,
  false,
  true
);
```

---

### Option 3: Using Supabase MCP (Via AI/Automation)

```typescript
// Using the MCP server
await mcp_supabase_execute_sql({
  project_id: "gmqmugsbrvhootvipxck",
  query: "INSERT INTO prop_firms (...) VALUES (...);"
});
```

---

## 🔄 Updating Existing Data

### Update a Broker:
```sql
UPDATE brokers
SET 
  min_deposit = 50,
  deposit_fee = 'None',
  tags = ARRAY['ECN', 'Updated Feature'],
  youtube_url = 'https://www.youtube.com/watch?v=NEW_VIDEO'
WHERE name = 'Broker Name';
```

### Update a Prop Firm:
```sql
UPDATE prop_firms
SET 
  challenge_fee = 79,
  profit_split = 85,
  profit_split_scaled = 95,
  max_funding_amount = 250000,
  payout_frequency = 'Weekly'
WHERE name = 'Prop Firm Name';
```

---

## 📋 Data Validation Checklist

### Before Adding a Broker:
- [ ] Name is unique and correct
- [ ] Logo file exists in `/public/` folder
- [ ] Affiliate link is correct and active
- [ ] Min deposit is a number (not text)
- [ ] Fees are either "None" or a dollar amount
- [ ] Country name matches exactly (for flag display)
- [ ] Year is a 4-digit number
- [ ] Asset types use lowercase: forex, crypto, stocks, commodities
- [ ] Tags are descriptive and relevant

### Before Adding a Prop Firm:
- [ ] All broker checklist items above
- [ ] Challenge type is exactly: "1-Step", "2-Step", or "Instant Funding"
- [ ] Challenge fee is a number
- [ ] Max funding is in dollars (e.g., 200000 for $200K)
- [ ] Profit splits are numbers without % sign (e.g., 80 for 80%)
- [ ] Drawdown percentages are numbers (e.g., 10 for 10%)
- [ ] Drawdown type is descriptive (Trailing, Static, etc.)
- [ ] Payout frequency is clear (Weekly, Bi-weekly, Monthly, On-Demand)
- [ ] Boolean fields are true/false (not "yes"/"no")
- [ ] Phase targets are numbers if set (or NULL if not applicable)

---

## 🎨 Logo Management

### Where to Store Logos:
```
/public/
  ├── broker-name-logo.png
  ├── prop-firm-name-logo.png
  └── images/
      └── logos/
          ├── broker-name.png
          └── prop-firm-name.png
```

### Logo Path in Database:
```sql
-- Option 1: Root level
logo: '/broker-name-logo.png'

-- Option 2: In images/logos folder
logo: '/images/logos/broker-name.png'
```

### Recommended Logo Specs:
- Format: PNG with transparency
- Size: 256x256px (square)
- File size: < 50KB
- Background: Transparent
- Content: Logo only (no text if possible)

---

## 🔍 Verifying Your Data

### Check All Brokers:
```sql
SELECT name, logo, min_deposit, is_featured 
FROM brokers 
ORDER BY is_featured DESC, name;
```

### Check All Prop Firms:
```sql
SELECT 
  name, 
  challenge_type, 
  challenge_fee, 
  max_funding_amount,
  profit_split,
  is_featured
FROM prop_firms 
ORDER BY is_featured DESC, profit_split DESC;
```

### Check for Missing Required Fields:
```sql
-- Brokers with potential issues
SELECT name, 
  CASE WHEN logo IS NULL THEN 'Missing Logo' END,
  CASE WHEN affiliate_link IS NULL THEN 'Missing Link' END,
  CASE WHEN min_deposit IS NULL THEN 'Missing Deposit' END
FROM brokers
WHERE logo IS NULL OR affiliate_link IS NULL OR min_deposit IS NULL;

-- Prop firms with potential issues
SELECT name,
  CASE WHEN challenge_type IS NULL THEN 'Missing Challenge Type' END,
  CASE WHEN challenge_fee IS NULL THEN 'Missing Fee' END,
  CASE WHEN max_funding_amount IS NULL THEN 'Missing Funding' END,
  CASE WHEN profit_split IS NULL THEN 'Missing Split' END
FROM prop_firms
WHERE challenge_type IS NULL 
   OR challenge_fee IS NULL 
   OR max_funding_amount IS NULL 
   OR profit_split IS NULL;
```

---

## 🚀 Quick Add Examples

### Example 1: Simple Broker
```sql
INSERT INTO brokers (
  name, logo, description, tags, affiliate_link,
  min_deposit, deposit_fee, withdrawal_fee, inactivity_fee,
  country_established, year_established, asset_types, is_featured
) VALUES (
  'FastTrade FX',
  '/fasttrade-logo.png',
  'Lightning fast execution with competitive spreads.',
  ARRAY['Fast Execution', 'Low Spreads'],
  'https://fasttrade.com/ref/12345',
  50,
  'None',
  'None',
  'None',
  'Cyprus',
  2021,
  ARRAY['forex', 'crypto'],
  false
);
```

### Example 2: Featured Prop Firm
```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, year_established, asset_types, is_featured,
  challenge_type, challenge_fee, max_funding_amount, profit_split,
  max_daily_loss, max_total_drawdown, drawdown_type, payout_frequency,
  refundable_fee, ea_allowed, news_trading_allowed, weekend_holding_allowed
) VALUES (
  'Apex Traders',
  '/apex-logo.png',
  'Premium prop firm with the best profit splits in the industry.',
  ARRAY['95% Split', '1-Step', 'Instant Funding'],
  'https://apextraders.com/ref/12345',
  'United Kingdom',
  2024,
  ARRAY['forex', 'stocks', 'crypto'],
  true,  -- Featured!
  '1-Step',
  149,
  300000,
  95,
  5,
  10,
  'Trailing',
  'On-Demand',
  true,
  true,
  true,
  true
);
```

---

## 🔧 Troubleshooting

### "Logo Not Showing"
1. Check logo file exists in `/public/` folder
2. Verify path in database is correct (starts with `/`)
3. Check file extension matches (`.png`, `.jpg`, `.svg`)
4. Verify image file isn't corrupted

### "Prop Firm Not Displaying"
1. Check all required fields are filled
2. Verify challenge_fee is not NULL
3. Check max_funding_amount is a number
4. Ensure profit_split is set
5. Verify drawdown fields are numbers

### "Data Not Updating"
1. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Check Supabase connection
3. Verify query is running successfully
4. Check browser console for errors

---

## 📊 Current Database Status

### ✅ Brokers:
- Total: 2
- Complete data: Yes
- Featured: 1 (HeroFX)

### ✅ Prop Firms:
- Total: 3
- Complete data: Yes
- Featured: 1 (Alpha Funded)

### ✅ Data Integrity:
- No hardcoded data in codebase ✓
- All data from Supabase ✓
- Default values set in database ✓
- Required fields enforced ✓

---

## 🎯 Best Practices

1. **Always test in staging first** (if available)
2. **Verify logo files exist** before adding records
3. **Use consistent naming** (e.g., all lowercase for asset types)
4. **Keep descriptions concise** (1-2 sentences max)
5. **Use descriptive tags** that users search for
6. **Verify affiliate links** work before adding
7. **Set is_featured = true** for sponsored/premium listings
8. **Add YouTube URLs** for better engagement
9. **Update regularly** to keep data current
10. **Back up data** before bulk operations

---

## 📞 Need Help?

### Supabase Dashboard:
https://supabase.com/dashboard

### Project ID:
`gmqmugsbrvhootvipxck`

### Database Tables:
- `brokers` - For forex/trading brokers
- `prop_firms` - For proprietary trading firms

### SQL Editor:
Supabase Dashboard → SQL Editor → New query

---

**Status**: 🟢 **100% Database-Driven**

All data is dynamically loaded from Supabase. No hardcoded values exist in the codebase. You can now manage all brokers and prop firms entirely through the database! 🎉

