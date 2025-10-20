# Prop Firm Database Analysis & Recommendations

## Executive Summary

After analyzing the current database structure using the Supabase MCP server, I've identified that the `prop_firms` table is currently using the same schema as the `brokers` table. This is problematic because **prop firms and brokers require fundamentally different data points**.

## Current Database State

### Existing Structure
```
prop_firms table (Project: TradeLocker Brokers - gmqmugsbrvhootvipxck)
├── Basic info: name, logo, description, tags, affiliate_link ✅
├── Generic fields: min_deposit, deposit_fee, withdrawal_fee, inactivity_fee ❌
├── Location: country_established, country_code, year_established ✅
├── Trading: asset_types ✅
├── Marketing: is_featured, youtube_url ✅
└── Timestamps: created_at, updated_at ✅
```

### Current Data
- **2 prop firms** in database:
  - TradePro Capital (Featured)
  - Elite Traders Fund

### The Problem
The table uses broker-centric fields like:
- `deposit_fee` - Not relevant to prop firms
- `withdrawal_fee` - Not relevant to prop firms  
- `inactivity_fee` - Not relevant to prop firms
- `min_deposit` - Should be "challenge_fee"

## What Prop Firms Actually Need

### Missing Critical Fields

#### 1. **Funding & Profit Information**
- `max_funding_amount` - Account size ($100K, $200K, etc.)
- `profit_split` - Trader's profit % (80%, 90%, etc.)
- `profit_split_scaled` - Increased split after scaling
- `scaling_plan` - Can accounts be scaled up?
- `payout_frequency` - Weekly, Bi-weekly, Monthly, On-Demand
- `min_payout_amount` - Minimum withdrawal amount

#### 2. **Challenge/Evaluation Structure**
- `challenge_type` - 1-Step, 2-Step, Instant Funding
- `challenge_fee` - Cost to enter evaluation
- `refundable_fee` - Is fee refunded on first payout?
- `phase_1_profit_target` - Phase 1 target %
- `phase_2_profit_target` - Phase 2 target %

#### 3. **Risk Management Rules**
- `max_daily_loss` - Daily loss limit %
- `max_total_drawdown` - Total drawdown limit %
- `drawdown_type` - Static, Trailing, Balance-Based, Equity-Based
- `min_trading_days` - Minimum days to trade
- `max_trading_days` - Max days (or unlimited)

#### 4. **Trading Rules & Restrictions**
- `news_trading_allowed` - Can trade during news?
- `weekend_holding_allowed` - Can hold over weekend?
- `ea_allowed` - Expert Advisors permitted?
- `consistency_rule` - Has max daily profit rules?
- `copy_trading_allowed` - Copy trading permitted?
- `swap_free` - Islamic accounts available?
- `leverage` - Available leverage (1:100, etc.)

## Files Created

### 1. `/PROP_FIRM_REQUIREMENTS.md`
Comprehensive documentation of all required fields with examples and rationale.

### 2. `/scripts/07-add-prop-firm-fields.sql`
Migration script to add all new columns to the `prop_firms` table.

### 3. `/scripts/08-update-prop-firms-data.sql`
Sample data updates showing how to populate the new fields.

### 4. `/lib/types.ts` (Updated)
Updated TypeScript interface with all prop firm specific fields.

## Implementation Steps

### Step 1: Apply Database Migration
Run the migration to add new columns:

```bash
# Option A: Using Supabase CLI
supabase db push

# Option B: Using the MCP server
# Apply migration via mcp_supabase_apply_migration
```

### Step 2: Update Existing Data
Run the data update script to populate new fields for existing prop firms:

```sql
-- Execute scripts/08-update-prop-firms-data.sql
```

### Step 3: Update Frontend Components
Modify `broker-table.tsx` to show different columns for prop firms:

**Broker Columns (Current):**
- Logo, Name, Asset Types, Min Deposit, Deposit Fee, Withdrawal Fee, Inactivity Fee, Country, Year

**Prop Firm Columns (Needed):**
- Logo, Name, Challenge Type, Max Funding, Challenge Fee, Profit Split, Max Drawdown, Daily Loss, Payout Frequency, Actions

### Step 4: Update Page Queries
Modify `/app/prop-firms/page.tsx` to select the new fields:

```typescript
const { data: propFirms } = await supabase
  .from("prop_firms")
  .select(`
    id, name, logo, description, tags, asset_types,
    affiliate_link, country_established, year_established,
    is_featured, youtube_url,
    max_funding_amount, profit_split, scaling_plan,
    payout_frequency, challenge_type, challenge_fee,
    refundable_fee, phase_1_profit_target, phase_2_profit_target,
    max_daily_loss, max_total_drawdown, drawdown_type,
    ea_allowed, news_trading_allowed, leverage
  `)
```

## Expected Table Display (Prop Firms)

| Column | Field | Example |
|--------|-------|---------|
| Logo | logo | Brand image + DEAL badge |
| Name | name | "Alpha Funded" |
| Challenge | challenge_type | "2-Step" |
| Max Funding | max_funding_amount | "$200K" |
| Fee | challenge_fee | "$99" |
| Profit Split | profit_split | "80%" |
| Max DD | max_total_drawdown | "10%" |
| Daily Loss | max_daily_loss | "5%" |
| Payout | payout_frequency | "On-Demand" |
| Country | country_established | Flag + name |
| Actions | - | More Info + Get Started |

## Comparison: Brokers vs Prop Firms

| Aspect | Brokers | Prop Firms |
|--------|---------|------------|
| **Primary Service** | Trading platform access | Funded trading accounts |
| **Trader's Capital** | Their own money | Firm's capital |
| **Key Metrics** | Spreads, fees, execution | Profit split, challenge cost, rules |
| **Risk Management** | Personal risk | Firm's drawdown limits |
| **Costs** | Deposit fees, spreads | Challenge/evaluation fee |
| **Profit** | 100% of profits (minus fees) | 80-90% profit split |

## Next Actions Required

1. ✅ **Review** - Review the migration scripts and requirements doc
2. ⏳ **Approve** - Approve the database schema changes
3. ⏳ **Migrate** - Apply migration to add new columns
4. ⏳ **Populate** - Update existing records with new data
5. ⏳ **UI Update** - Modify broker-table component to handle prop firm columns
6. ⏳ **Filter Update** - Add prop firm specific filters (challenge type, profit split ranges, etc.)
7. ⏳ **Test** - Verify all data displays correctly

## Benefits of This Change

1. **Better User Experience** - Show information traders actually care about
2. **Accurate Comparisons** - Compare prop firms on relevant metrics
3. **SEO Improvement** - Prop firm specific terminology and data
4. **Data Integrity** - Proper schema for each business type
5. **Scalability** - Easy to add more prop firms with complete data

## Questions to Consider

1. Should we create a separate component `PropFirmTable` instead of using `BrokerTable` for both?
2. Do we want to add filtering by profit split ranges, challenge types, etc.?
3. Should max_funding_amount filter have ranges like $50K-$100K, $100K-$200K, $200K+?
4. Do we need a comparison tool specifically for prop firm rules?

---

**Status**: Ready for implementation  
**Estimated Development Time**: 2-3 hours  
**Priority**: High - Current data structure is misleading for prop firm users

