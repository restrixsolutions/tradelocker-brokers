# Broker vs Prop Firm Table Comparison

This document shows the side-by-side comparison of what data should be displayed for Brokers vs Prop Firms.

## Current Issue
Both brokers and prop firms are currently using the same table columns, which is incorrect.

---

## BROKERS Table (Current - Correct ✅)

### Columns Displayed:
| Column | Description | Example |
|--------|-------------|---------|
| Logo | Broker logo with DEAL badge | ![logo] |
| Name | Broker name | "ForexEdge" |
| Asset Types | Trading instruments | 🔄💰📈🌾 (icons) |
| Min. Deposit | Minimum account deposit | "$100.00" |
| Deposit Fee | Fee to deposit | "None" |
| Withdrawal Fee | Fee to withdraw | "None" |
| Inactivity Fee | Fee for inactive account | "None" |
| Country Est. | Country of establishment | 🇺🇸 "United States" |
| Year Est. | Year established | "2018" |
| Actions | Buttons | "More Info" + "Get Started" |

### Sample Broker Data:
```json
{
  "name": "ForexEdge",
  "asset_types": ["forex", "stocks", "crypto", "commodities"],
  "min_deposit": 100,
  "deposit_fee": "None",
  "withdrawal_fee": "None",
  "inactivity_fee": "None",
  "country_established": "United States",
  "year_established": 2018
}
```

---

## PROP FIRMS Table (Needs Update ❌ → ✅)

### Columns That SHOULD Be Displayed:

| Column | Description | Example | Database Field |
|--------|-------------|---------|----------------|
| Logo | Firm logo with DEAL badge | ![logo] | `logo`, `is_featured` |
| Name | Prop firm name | "Alpha Funded" | `name` |
| Challenge Type | Evaluation type | "2-Step" | `challenge_type` |
| Max Funding | Maximum account size | "$200K" | `max_funding_amount` |
| Challenge Fee | Cost to enter | "$99" | `challenge_fee` |
| Profit Split | Trader's profit % | "80% → 90%" | `profit_split`, `profit_split_scaled` |
| Max Drawdown | Total DD limit | "10% Trailing" | `max_total_drawdown`, `drawdown_type` |
| Daily Loss | Daily loss limit | "5%" | `max_daily_loss` |
| Payout | Payout frequency | "On-Demand" | `payout_frequency` |
| Country | Country established | 🇬🇧 "United Kingdom" | `country_established` |
| Actions | Buttons | "More Info" + "Get Started" | - |

### Sample Prop Firm Data:
```json
{
  "name": "Alpha Funded",
  "challenge_type": "2-Step",
  "max_funding_amount": 200000,
  "challenge_fee": 99,
  "profit_split": 80,
  "profit_split_scaled": 90,
  "max_total_drawdown": 10,
  "drawdown_type": "Trailing",
  "max_daily_loss": 5,
  "payout_frequency": "On-Demand",
  "country_established": "United Kingdom"
}
```

---

## Detailed Comparison

### What Traders Care About:

#### When Choosing a BROKER:
1. ✅ What assets can I trade?
2. ✅ How much money do I need to start?
3. ✅ What are the trading costs (spreads, commissions)?
4. ✅ What fees will I pay (deposit, withdrawal, inactivity)?
5. ✅ Is the broker regulated and established?

#### When Choosing a PROP FIRM:
1. ❌ ~~What are the fees?~~ → ✅ What's the challenge fee?
2. ❌ ~~What's the minimum deposit?~~ → ✅ How much funding can I get?
3. ✅ What profit split do I get?
4. ✅ What are the drawdown rules?
5. ✅ What are the daily loss limits?
6. ✅ How often can I withdraw profits?
7. ✅ What type of challenge (1-step, 2-step, instant)?
8. ✅ Are there trading restrictions?

---

## Filter Sidebar Differences

### BROKER Filters (Current ✅):
- Asset Types (Forex, Stocks, Crypto, Commodities)
- Min Deposit Ranges ($0-50, $50-100, $100-500, $500+)
- Country
- Tags
- No Deposit Fee
- No Withdrawal Fee
- No Inactivity Fee

### PROP FIRM Filters (Should Be ✅):
- Asset Types (Forex, Stocks, Crypto, Commodities)
- Challenge Type (1-Step, 2-Step, Instant Funding)
- Challenge Fee Ranges ($0-100, $100-200, $200-500, $500+)
- Profit Split Ranges (70-80%, 80-90%, 90%+)
- Max Funding Ranges ($50K-$100K, $100K-$200K, $200K+)
- Drawdown Type (Static, Trailing, Balance-Based)
- Payout Frequency (Weekly, Bi-weekly, Monthly, On-Demand)
- Max Drawdown (5%, 10%, 12%, 15%)
- Country
- Tags
- Expert Advisors Allowed
- News Trading Allowed
- No Consistency Rule
- Refundable Fee

---

## Visual Layout Comparison

### BROKER ROW:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [LOGO] │ Name      │ 🔄💰📈 │ $100 │ None │ None │ None │ 🇺🇸 US │ 2018 │ [Buttons] │
└────────────────────────────────────────────────────────────────────────┘
```

### PROP FIRM ROW:
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] │ Name      │ 2-Step │ $200K │ $99 │ 80%→90% │ 10% Trail │ 5% │ On-Demand │ 🇬🇧 │ [Buttons] │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### Column Width Adjustments Needed:

```typescript
// Broker columns (current)
const brokerColumns = {
  logo: "w-[80px]",
  name: "w-[180px]",
  assetTypes: "w-[140px]",
  minDeposit: "w-[110px]",
  depositFee: "w-[110px]",
  withdrawalFee: "w-[120px]",
  inactivityFee: "w-[120px]",
  country: "w-[160px]",
  year: "w-[120px]",
  actions: "w-[220px]"
};

// Prop firm columns (needed)
const propFirmColumns = {
  logo: "w-[80px]",
  name: "w-[160px]",
  challengeType: "w-[100px]",
  maxFunding: "w-[100px]",
  challengeFee: "w-[90px]",
  profitSplit: "w-[120px]",
  maxDrawdown: "w-[120px]",
  dailyLoss: "w-[80px]",
  payout: "w-[120px]",
  country: "w-[140px]",
  actions: "w-[220px]"
};
```

### Responsive Design Considerations:
- Mobile: Stack key info vertically
- Tablet: Show 6-7 most important columns
- Desktop: Show all columns with horizontal scroll

---

## Database Query Differences

### Broker Query (Current):
```typescript
const { data: brokers } = await supabase
  .from("brokers")
  .select(`
    id, name, logo, description, tags, asset_types,
    min_deposit, deposit_fee, withdrawal_fee, inactivity_fee,
    country_established, year_established, 
    affiliate_link, is_featured, youtube_url
  `)
  .order("is_featured", { ascending: false })
  .order("name", { ascending: true });
```

### Prop Firm Query (Needed):
```typescript
const { data: propFirms } = await supabase
  .from("prop_firms")
  .select(`
    id, name, logo, description, tags, asset_types,
    country_established, year_established,
    affiliate_link, is_featured, youtube_url,
    max_funding_amount, profit_split, profit_split_scaled,
    challenge_type, challenge_fee, refundable_fee,
    max_daily_loss, max_total_drawdown, drawdown_type,
    payout_frequency, scaling_plan,
    phase_1_profit_target, phase_2_profit_target,
    ea_allowed, news_trading_allowed, consistency_rule
  `)
  .order("is_featured", { ascending: false })
  .order("profit_split", { ascending: false })
  .order("name", { ascending: true });
```

---

## SEO & Marketing Benefits

### Better Keywords for Prop Firms:
- "2-step challenge prop firm"
- "instant funding prop firm"
- "90% profit split"
- "trailing drawdown"
- "on-demand payouts"
- "no consistency rule"

### Improved User Experience:
- Traders can quickly compare relevant metrics
- Clear differentiation from retail brokers
- Industry-standard terminology
- Better filtering capabilities

---

**Conclusion**: The prop firm table needs completely different columns and data to properly serve traders looking for funded accounts. The current broker-style data is not providing value to users researching prop firms.

