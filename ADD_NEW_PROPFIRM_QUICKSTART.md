# ⚡ Add New Prop Firm - 5 Minute Quick Start

The fastest way to research and add a new prop firm to your database.

---

## 🎯 THE PROMPT (Copy & Paste This)

```
Research this prop firm for my TradeLocker directory database: [PROP FIRM NAME]

Provide this information in the exact format shown:

## BASIC INFO
- Name: (official name)
- Logo URL: (direct link to logo PNG)
- Description: (2-3 sentences about what makes them unique)
- Country: (full name e.g., "United States")
- Country Code: (2-letter, e.g., "us")
- Year: (e.g., 2023)
- Website: (main URL)
- YouTube: (review video URL or "None")
- Tags: 3-5 key features (e.g., "90% Split", "2-Step", "Scaling")
- Assets: (forex, stocks, crypto, commodities - list what they offer)

## CHALLENGE
- Type: (exactly: "1-Step", "2-Step", or "Instant Funding")
- Fee: (number only, e.g., 99)
- Refundable: (YES/NO)
- Phase 1 Target: (% number if 2-step, or NULL)
- Phase 2 Target: (% number if 2-step, or NULL)

## FUNDING
- Max Account Size: (number, e.g., 200000 for $200K)
- Base Profit Split: (%, e.g., 80)
- Scaled Split: (% after scaling, or NULL if none)
- Scaling Available: (YES/NO)
- Payout Frequency: ("Weekly", "Bi-weekly", "Monthly", "On-Demand")
- Min Payout: (number, e.g., 50)

## RISK RULES
- Max Daily Loss: (%, e.g., 5)
- Max Drawdown: (%, e.g., 10)
- Drawdown Type: ("Trailing", "Static", "Balance-Based", "Equity-Based")
- Leverage: (e.g., "1:100")
- Min Trading Days: (number or NULL)
- Max Trading Days: (number or NULL)

## TRADING RULES
- EAs Allowed: (YES/NO)
- News Trading: (YES/NO)
- Weekend Holding: (YES/NO)
- Copy Trading: (YES/NO)
- Consistency Rule: (YES/NO)
- Swap-Free: (YES/NO)

## CRITICAL
- Supports TradeLocker: (YES/NO - VERIFY THIS!)

Format your response so I can easily copy each field into my database.
```

---

## 📝 USAGE STEPS

### 1. Copy the prompt above

### 2. Replace `[PROP FIRM NAME]` with actual name
Example: Replace with "FTMO" or "MyFundedFX"

### 3. Paste into ChatGPT/Claude/Perplexity

### 4. Wait for response (usually 30-60 seconds)

### 5. Convert to SQL

Use this template:
```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types,
  challenge_type, challenge_fee, refundable_fee,
  phase_1_profit_target, phase_2_profit_target,
  max_funding_amount, profit_split, profit_split_scaled,
  scaling_plan, payout_frequency, min_payout_amount,
  max_daily_loss, max_total_drawdown, drawdown_type,
  leverage, min_trading_days, max_trading_days,
  news_trading_allowed, weekend_holding_allowed, ea_allowed,
  consistency_rule, copy_trading_allowed, swap_free
) VALUES (
  'NAME_HERE',
  '/logo.png',
  'DESCRIPTION_HERE',
  ARRAY['Tag1', 'Tag2', 'Tag3'],
  'https://website.com',
  'Country Name',
  'cc',
  2023,
  ARRAY['forex', 'stocks'],
  '2-Step',
  99,
  true,
  8,
  5,
  200000,
  80,
  90,
  true,
  'On-Demand',
  50,
  5,
  10,
  'Trailing',
  '1:100',
  5,
  NULL,
  true,
  true,
  true,
  false,
  false,
  true
);
```

### 6. Run SQL in Supabase

Go to: Supabase Dashboard → SQL Editor → New query → Paste → Run

### 7. Verify

Refresh your website at `/prop-firms` and check the new firm appears!

---

## ✅ QUICK CHECKLIST

Before submitting:
- [ ] Name spelled correctly
- [ ] Logo file uploaded to `/public/`
- [ ] Challenge type is exact: "1-Step", "2-Step", or "Instant Funding"
- [ ] All numbers are just numbers (no $ or %)
- [ ] Country code is 2 letters lowercase
- [ ] They ACTUALLY support TradeLocker
- [ ] Affiliate link works

---

## 🚨 COMMON MISTAKES

### ❌ WRONG:
```sql
profit_split: "80%"          -- Don't include %
challenge_fee: "$99"         -- Don't include $
max_funding_amount: "$200K"  -- Use full number
challenge_type: "two step"   -- Use exact: "2-Step"
```

### ✅ CORRECT:
```sql
profit_split: 80
challenge_fee: 99
max_funding_amount: 200000
challenge_type: 2-Step
```

---

## 🎬 REAL EXAMPLE

### Input to LLM:
```
Research this prop firm for my TradeLocker directory database: FTMO
[rest of prompt...]
```

### LLM Output → Your SQL:
```sql
INSERT INTO prop_firms (
  name, logo, description, tags, affiliate_link,
  country_established, country_code, year_established, asset_types,
  challenge_type, challenge_fee, refundable_fee,
  phase_1_profit_target, phase_2_profit_target,
  max_funding_amount, profit_split, profit_split_scaled,
  scaling_plan, payout_frequency, min_payout_amount,
  max_daily_loss, max_total_drawdown, drawdown_type,
  leverage, news_trading_allowed, ea_allowed
) VALUES (
  'FTMO',
  '/ftmo-logo.png',
  'Leading prop firm with 2-step evaluation and up to $200K funding.',
  ARRAY['2-Step', '90% Split', 'Scaling', 'Free Retries'],
  'https://ftmo.com',
  'Czech Republic',
  'cz',
  2015,
  ARRAY['forex', 'stocks', 'commodities', 'crypto'],
  '2-Step',
  155,
  true,
  10,
  5,
  200000,
  80,
  90,
  true,
  'Bi-weekly',
  100,
  5,
  10,
  'Balance-Based',
  '1:100',
  true,
  true
);
```

---

## 💡 PRO TIPS

### 1. Verify TradeLocker Support
**CRITICAL**: Always verify they support TradeLocker!
- Visit their website
- Check platform list
- Search for "TradeLocker" on their site
- Contact support if unclear

### 2. Get Multiple Sources
Research from:
- Official website (primary source)
- Trustpilot reviews
- YouTube reviews
- Reddit discussions

### 3. Use Multiple LLMs
Cross-reference data:
- ChatGPT
- Claude
- Perplexity
- Gemini

### 4. Batch Processing
Research 5 firms at once:
```
Research these prop firms: FTMO, MyFundedFX, The5%ers, Apex Trader, TopStep
```

---

## 📊 TOTAL TIME

- Research: 2 minutes (LLM does it)
- Format to SQL: 1 minute
- Add to database: 30 seconds
- Verify on website: 30 seconds

**Total: ~4 minutes per prop firm!**

---

## 📞 NEED MORE DETAIL?

See these files:
- `RESEARCH_QUESTIONNAIRE_PROP_FIRMS.md` - Full detailed questionnaire
- `RESEARCH_QUESTIONNAIRE_BROKERS.md` - For brokers
- `QUICK_ADD_TEMPLATE.md` - SQL templates
- `DATA_MANAGEMENT_GUIDE.md` - Complete guide

---

**You're ready to add prop firms in minutes!** 🚀

Just copy the prompt, paste it with a prop firm name, and let the LLM do the research work for you!

