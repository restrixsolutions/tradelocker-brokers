# Logo Column Mapping Verification

## Database Schema
Both tables have a `logo` column of type TEXT:

### brokers table
```sql
logo TEXT NOT NULL
```

### prop_firms table
```sql
logo TEXT NOT NULL
```

## Data Flow

### 1. Database Queries (SELECT logo column)

#### Brokers Page (`app/brokers/page.tsx`)
```typescript
.from("brokers")
.select("id, name, logo, description, tags, asset_types, min_deposit, deposit_fee, withdrawal_fee, inactivity_fee, country_established, country_code, year_established, affiliate_link, is_featured, youtube_url")
```
✅ Selects `logo` column

#### Prop Firms Page (`app/prop-firms/page.tsx`)
```typescript
.from("prop_firms")
.select(`
  id, name, logo, description, tags, asset_types,
  country_established, country_code, year_established,
  affiliate_link, is_featured, youtube_url,
  max_funding_amount, profit_split, profit_split_scaled,
  challenge_type, challenge_fee, refundable_fee,
  phase_1_profit_target, phase_2_profit_target,
  max_daily_loss, max_total_drawdown, drawdown_type,
  payout_frequency, min_payout_amount, scaling_plan,
  min_trading_days, max_trading_days,
  news_trading_allowed, weekend_holding_allowed, ea_allowed,
  consistency_rule, copy_trading_allowed, swap_free, leverage
`)
```
✅ Selects `logo` column

#### Home Page (`app/page.tsx`)
```typescript
.from("brokers")
.select("id, name, logo, description, tags, asset_types, min_deposit, deposit_fee, withdrawal_fee, inactivity_fee, country_established, country_code, year_established, affiliate_link, is_featured, youtube_url")
```
✅ Selects `logo` column

### 2. TypeScript Types (`lib/types.ts`)

#### Broker Interface
```typescript
export interface Broker {
  logo: string  // Maps to database 'logo' column
  // ... other fields
}
```
✅ Has `logo` property

#### PropFirm Interface
```typescript
export interface PropFirm {
  logo: string  // Maps to database 'logo' column
  // ... other fields
}
```
✅ Has `logo` property

### 3. Display Components

#### Table Display (`components/broker-table.tsx`)
```typescript
<Image
  src={brand.logo || "/placeholder.svg"}
  alt={brand.name}
  width={64}
  height={64}
  className="object-contain p-2"
/>
```
✅ Uses `brand.logo` from database

#### Modal Display (`components/broker-detail-modal.tsx`)
```typescript
<Image
  src={brand.logo || "/placeholder.svg"}
  alt={brand.name}
  width={80}
  height={80}
  className="object-contain p-2"
  onError={(e) => {
    console.error("[Modal] Image failed to load:", brand.logo)
    console.error("[Modal] Error event:", e)
  }}
/>
```
✅ Uses `brand.logo` from database

## Expected Logo Values in Database

### Brokers
- GatesFX: `/images/logos/gatesfx.png`
- HeroFX: `/images/logos/herofx.png`

### Prop Firms
- AlphaFunded: `/alphafunded-prop-firm-logo.jpg`
- FundedTrader: `/fundedtrader-prop-firm-logo.jpg`
- PropElite: `/propelite-prop-firm-logo.jpg`
- TradeCapital: `/tradecapital-prop-firm-logo.jpg`

## File System

Broker logos exist at:
- `/public/images/logos/gatesfx.png` ✅
- `/public/images/logos/herofx.png` ✅

Prop firm logos exist at:
- `/public/alphafunded-prop-firm-logo.jpg` ✅
- `/public/fundedtrader-prop-firm-logo.jpg` ✅
- `/public/propelite-prop-firm-logo.jpg` ✅
- `/public/tradecapital-prop-firm-logo.jpg` ✅

## Next.js Image Configuration (`next.config.mjs`)

```javascript
images: {
  unoptimized: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
    {
      protocol: 'https',
      hostname: 'flagcdn.com',
      pathname: '/**',
    },
  ],
}
```

## Summary

✅ **All database queries correctly select the `logo` column**
✅ **TypeScript types correctly define `logo: string`**
✅ **All display components use `brand.logo` or `brand.logo`**
✅ **Logo files exist in the public directory**
✅ **Next.js Image component is configured properly**

## What to Check Next

If logos are not displaying in the modal, check:

1. **Browser Console Logs** - Look for `[Modal]` logs:
   - `[Modal] Logo from database:` - Should show the path (e.g., `/images/logos/gatesfx.png`)
   - `[Modal] Logo is null/undefined:` - Should be `false`

2. **Network Tab** - Check if the image request is being made and what the response is

3. **Database Content** - Run this query in Supabase SQL Editor:
   ```sql
   SELECT name, logo FROM brokers;
   SELECT name, logo FROM prop_firms;
   ```
   Verify that the `logo` column contains the correct paths.

