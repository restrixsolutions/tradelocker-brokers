# Modal Data Flow Verification - Brokers & Prop Firms Only

## Complete Data Flow for Pop-up Modals

### 1. Brokers Page → Broker Table → Modal

#### Step 1: Database Query (`app/brokers/page.tsx`)
```typescript
const { data: brokers, error } = await supabase
  .from("brokers")  // ← Database table
  .select(
    "id, name, logo, description, tags, asset_types, min_deposit, 
     deposit_fee, withdrawal_fee, inactivity_fee, country_established, 
     country_code, year_established, affiliate_link, is_featured, youtube_url"
  )
```
✅ Queries `brokers` table
✅ Selects `logo` column

#### Step 2: Pass to Table Component
```typescript
<BrokerTable brands={brokersData} type="broker" />
```
✅ `brokersData = brokers || []` (from database only)

#### Step 3: Table Component Receives Data (`components/broker-table.tsx`)
```typescript
export function BrokerTable({ brands, type }: BrokerTableProps) {
  const [selectedBrand, setSelectedBrand] = useState<Broker | PropFirm | null>(null)
  
  // brands → filteredBrands → sortedBrands → map over each brand
  
  {sortedBrands.map((brand) => (
    // Display brand in table
    <Image src={brand.logo || "/placeholder.svg"} />  // ✅ Table logo from DB
    
    // More Info button
    <Button onClick={() => setSelectedBrand(brand)}>  // ✅ Passes DB data to modal
      More Info
    </Button>
  ))}
}
```
✅ Receives `brands` prop from database query
✅ On "More Info" click → `setSelectedBrand(brand)` (brand from database)

#### Step 4: Modal Renders (`components/broker-detail-modal.tsx`)
```typescript
{selectedBrand && (
  <BrokerDetailModal
    brand={selectedBrand}  // ← The exact brand object from database
    type={type}
    isOpen={!!selectedBrand}
    onClose={() => setSelectedBrand(null)}
  />
)}

// Inside modal:
export function BrokerDetailModal({ brand, type, isOpen, onClose }) {
  console.log("[Modal] Logo from database:", brand.logo)
  
  return (
    <Image
      src={brand.logo || "/placeholder.svg"}  // ✅ Modal logo from DB
      alt={brand.name}
      width={80}
      height={80}
    />
  )
}
```
✅ Receives exact brand object from database
✅ Uses `brand.logo` directly from database

---

### 2. Prop Firms Page → Broker Table → Modal

#### Step 1: Database Query (`app/prop-firms/page.tsx`)
```typescript
const { data: propFirms, error } = await supabase
  .from("prop_firms")  // ← Database table
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
✅ Queries `prop_firms` table
✅ Selects `logo` column

#### Step 2: Pass to Table Component
```typescript
<BrokerTable brands={propFirmsData} type="prop-firm" />
```
✅ `propFirmsData = propFirms || []` (from database only)

#### Step 3: Table Component (Same as brokers)
```typescript
<BrokerTable brands={propFirmsData} type="prop-firm" />
```
✅ Same component handles both brokers and prop firms
✅ Same data flow: brands → selectedBrand → modal

#### Step 4: Modal Renders (Same component)
```typescript
<BrokerDetailModal
  brand={selectedBrand}  // ← Prop firm data from database
  type="prop-firm"
/>
```
✅ Uses exact same modal component
✅ Displays conditional content based on `type` prop
✅ Uses `brand.logo` from database

---

## Summary: Modal Logo Source

### For Brokers:
```
Supabase brokers.logo
  ↓
app/brokers/page.tsx (query)
  ↓
<BrokerTable brands={brokersData} />
  ↓
setSelectedBrand(brand) on "More Info" click
  ↓
<BrokerDetailModal brand={selectedBrand} />
  ↓
<Image src={brand.logo} /> in modal
```

### For Prop Firms:
```
Supabase prop_firms.logo
  ↓
app/prop-firms/page.tsx (query)
  ↓
<BrokerTable brands={propFirmsData} />
  ↓
setSelectedBrand(brand) on "More Info" click
  ↓
<BrokerDetailModal brand={selectedBrand} />
  ↓
<Image src={brand.logo} /> in modal
```

## ✅ VERIFIED: Pop-up Modal Logo Source

**The modal receives the EXACT brand object from the database query.**

- ❌ No data transformation
- ❌ No logo path changes
- ❌ No static fallbacks (except `/placeholder.svg` if logo is null)
- ❌ No hardcoded values
- ✅ **Direct pass-through from database to modal**

### What the modal displays:
1. **Table logo**: `brand.logo` from database
2. **Modal logo**: Same `brand.logo` object passed to modal
3. **Both use same data source**: Database `logo` column

If the logo isn't showing in the modal but IS showing in the table, the issue is NOT the data source - both use `brand.logo` from the database. The issue would be:
- Image rendering in modal dialog
- CSS/styling in modal
- Database value itself (check browser console logs)

