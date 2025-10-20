# Implementation Checklist - Prop Firm Updates

Use this checklist to track progress on implementing proper prop firm data structure.

## Phase 1: Database Migration ⏳

### Step 1.1: Review Migration Scripts
- [ ] Review `/scripts/07-add-prop-firm-fields.sql`
- [ ] Review `/scripts/08-update-prop-firms-data.sql`
- [ ] Verify all new columns match requirements

### Step 1.2: Apply Database Changes
Choose ONE method:

**Option A: Using Supabase MCP Server (Recommended)**
```bash
# Apply migration using MCP tool
mcp_supabase_apply_migration
  project_id: "gmqmugsbrvhootvipxck"
  name: "add_prop_firm_fields"
  query: <contents of 07-add-prop-firm-fields.sql>
```

**Option B: Using Supabase Dashboard**
- [ ] Log into Supabase Dashboard
- [ ] Navigate to SQL Editor
- [ ] Run `07-add-prop-firm-fields.sql`
- [ ] Run `08-update-prop-firms-data.sql`

**Option C: Using Supabase CLI**
```bash
supabase db push
```

### Step 1.3: Verify Migration
- [ ] Check that new columns exist in `prop_firms` table
- [ ] Verify data populated correctly
- [ ] Run test query to ensure all fields accessible

```sql
SELECT 
  name, challenge_type, max_funding_amount, 
  profit_split, challenge_fee, payout_frequency
FROM prop_firms
LIMIT 5;
```

---

## Phase 2: TypeScript Updates ✅

- [x] Update `PropFirm` interface in `/lib/types.ts`
- [ ] Verify no TypeScript errors
- [ ] Update any type guards if needed

---

## Phase 3: Component Updates ⏳

### Step 3.1: Create Prop Firm Specific Table Component

**Option A: Modify existing BrokerTable** (Simpler)
- [ ] Add prop firm column rendering logic
- [ ] Conditional rendering based on `type` prop
- [ ] Update column widths for prop firms

**Option B: Create separate PropFirmTable** (Cleaner)
- [ ] Create `/components/prop-firm-table.tsx`
- [ ] Copy relevant logic from `broker-table.tsx`
- [ ] Customize columns for prop firms
- [ ] Update `/app/prop-firms/page.tsx` to use new component

### Step 3.2: Update Column Definitions
- [ ] Replace broker columns with prop firm columns
- [ ] Update sortable fields
- [ ] Add new data formatting functions

**Columns to Replace:**
```
❌ Min. Deposit → ✅ Challenge Fee
❌ Deposit Fee → ✅ Max Funding
❌ Withdrawal Fee → ✅ Profit Split
❌ Inactivity Fee → ✅ Challenge Type
➕ ADD: Max Drawdown
➕ ADD: Daily Loss
➕ ADD: Payout Frequency
```

### Step 3.3: Update Filters
- [ ] Modify `FilterSidebar` to show different filters for prop firms
- [ ] Add challenge type filter
- [ ] Add profit split range filter
- [ ] Add max funding range filter
- [ ] Add payout frequency filter
- [ ] Add drawdown type filter
- [ ] Add rule-based filters (EA allowed, news trading, etc.)

---

## Phase 4: Page Query Updates ⏳

### Step 4.1: Update prop-firms/page.tsx
- [ ] Update SELECT query to include new prop firm fields
- [ ] Remove unused broker fields from query
- [ ] Update ordering (consider ordering by profit_split desc)

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
    payout_frequency, scaling_plan, ea_allowed
  `)
  .order("is_featured", { ascending: false })
  .order("profit_split", { ascending: false });
```

### Step 4.2: Update Error Handling
- [ ] Add proper error messages
- [ ] Handle missing/null fields gracefully
- [ ] Add loading states

---

## Phase 5: Data Entry ⏳

### Step 5.1: Collect Real Prop Firm Data
Research and gather accurate data for:
- [ ] Alpha Funded
- [ ] Funded Trader  
- [ ] FTMO (if using TradeLocker)
- [ ] Prop Elite
- [ ] The5ers (if using TradeLocker)
- [ ] MyFundedFX (if using TradeLocker)
- [ ] Others...

### Step 5.2: Data Fields to Collect per Firm
For each prop firm, gather:
- [ ] Max funding amount
- [ ] Profit split (base & scaled)
- [ ] Challenge type & fee
- [ ] Phase profit targets
- [ ] Drawdown limits & type
- [ ] Daily loss limit
- [ ] Trading days (min/max)
- [ ] Payout frequency
- [ ] Trading rules (EA, news, weekend)
- [ ] Special features (scaling, consistency, etc.)

### Step 5.3: Insert/Update Data
- [ ] Create SQL INSERT statements
- [ ] Run data population script
- [ ] Verify all data displays correctly

---

## Phase 6: UI/UX Enhancements ⏳

### Step 6.1: Visual Indicators
- [ ] Add icons for challenge types
- [ ] Color-code profit splits (green for 85%+)
- [ ] Add badges for key features (refundable, instant, scaling)
- [ ] Highlight favorable drawdown types

### Step 6.2: Tooltips & Help Text
- [ ] Add tooltips explaining prop firm terms
- [ ] Add info icons for complex concepts
- [ ] Create glossary link

### Step 6.3: Comparison Features
- [ ] Add side-by-side comparison mode
- [ ] Add "Compare" checkboxes
- [ ] Create comparison modal/page

---

## Phase 7: Testing ⏳

### Step 7.1: Data Integrity
- [ ] Verify all fields display correctly
- [ ] Test with null/missing data
- [ ] Check responsive behavior
- [ ] Verify sorting works on all columns
- [ ] Test filtering combinations

### Step 7.2: Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Step 7.3: Performance
- [ ] Check load times
- [ ] Verify horizontal scroll smooth
- [ ] Test with 20+ prop firms
- [ ] Optimize images/logos

---

## Phase 8: Documentation ⏳

### Step 8.1: Code Documentation
- [ ] Add JSDoc comments
- [ ] Document new prop firm fields
- [ ] Update README

### Step 8.2: User Documentation
- [ ] Create "How to Choose a Prop Firm" guide
- [ ] Add glossary of terms
- [ ] Create comparison guide

---

## Phase 9: SEO & Content ⏳

### Step 9.1: Meta Tags
- [ ] Update prop firm page title
- [ ] Update description with prop firm keywords
- [ ] Add structured data for prop firms

### Step 9.2: Content
- [ ] Write prop firm comparison content
- [ ] Add educational content about challenges
- [ ] Create prop firm FAQs

---

## Phase 10: Deployment ⏳

### Step 10.1: Pre-Deployment
- [ ] Run linter
- [ ] Fix any TypeScript errors
- [ ] Test build locally
- [ ] Review all changes

### Step 10.2: Deploy
- [ ] Deploy to staging (if available)
- [ ] Test on staging
- [ ] Deploy to production
- [ ] Monitor for errors

### Step 10.3: Post-Deployment
- [ ] Verify production works correctly
- [ ] Check analytics
- [ ] Monitor error logs
- [ ] Gather user feedback

---

## Quick Start Commands

### View Database Structure
```bash
# List tables
mcp_supabase_list_tables project_id: "gmqmugsbrvhootvipxck"

# Query data
mcp_supabase_execute_sql 
  project_id: "gmqmugsbrvhootvipxck"
  query: "SELECT * FROM prop_firms LIMIT 5;"
```

### Apply Migration
```bash
# Using MCP
mcp_supabase_apply_migration
  project_id: "gmqmugsbrvhootvipxck"
  name: "add_prop_firm_fields"
  query: "<contents of migration file>"
```

### Test Locally
```bash
npm run dev
# Navigate to http://localhost:3000/prop-firms
```

---

## Rollback Plan 🔄

If something goes wrong:

1. **Database Rollback**
```sql
-- Drop new columns if needed
ALTER TABLE prop_firms 
  DROP COLUMN IF EXISTS max_funding_amount,
  DROP COLUMN IF EXISTS profit_split,
  -- ... etc
```

2. **Code Rollback**
```bash
git revert <commit-hash>
git push
```

3. **Quick Fix**
- Revert type changes in `lib/types.ts`
- Make new fields optional with `?` in TypeScript
- Display fallback data for missing fields

---

## Support & Resources

- **Database Schema**: See `PROP_FIRM_REQUIREMENTS.md`
- **Comparison Guide**: See `TABLE_COMPARISON.md`
- **Analysis**: See `DATABASE_ANALYSIS_SUMMARY.md`
- **Migration Scripts**: See `/scripts/07-*.sql` and `/scripts/08-*.sql`

---

**Priority**: High  
**Estimated Time**: 3-4 hours for full implementation  
**Risk Level**: Medium (database changes required)  
**Impact**: High (significantly improves prop firm comparison value)

