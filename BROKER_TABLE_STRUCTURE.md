# Broker Table Structure & Implementation Guide
**For: forexproprank.com**

This document provides the complete structure and implementation details of the broker comparison table system used on tradelockerbrokers.com.

---

## 📋 Table of Contents
1. [Database Schema](#database-schema)
2. [TypeScript Types](#typescript-types)
3. [Server Actions](#server-actions)
4. [Components](#components)
5. [Page Implementation](#page-implementation)
6. [Key Features](#key-features)

---

## 🗄️ Database Schema

### Brokers Table
```sql
CREATE TABLE brokers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  asset_types TEXT[],
  min_deposit NUMERIC,
  deposit_fee TEXT,
  withdrawal_fee TEXT,
  inactivity_fee TEXT,
  regulation TEXT,
  country_established TEXT,
  country_code TEXT,
  year_established INTEGER,
  affiliate_link TEXT,
  is_featured BOOLEAN DEFAULT false,
  youtube_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📝 TypeScript Types

### File: `lib/types.ts`
```typescript
export interface Broker {
  id: string
  name: string
  logo: string
  description: string
  tags: string[]
  affiliate_link: string
  min_deposit: number
  deposit_fee: string
  withdrawal_fee: string
  inactivity_fee: string
  regulation: string
  country_established: string
  country_code: string
  year_established: number
  asset_types: string[]
  is_featured: boolean
  youtube_url?: string | null
  created_at?: string
  updated_at?: string
}
```

---

## ⚙️ Server Actions

### File: `app/actions.ts`

#### Filter Parameters Interface
```typescript
export interface BrokerFilterParams {
  assetTypes?: string[]
  minDepositRanges?: string[]
  countries?: string[]
  tags?: string[]
  noDepositFee?: boolean
  noWithdrawalFee?: boolean
  noInactivityFee?: boolean
  sortField?: "name" | "minDeposit" | "yearEstablished"
  sortDirection?: "asc" | "desc"
}
```

#### Main Functions

1. **`getFilteredBrokers(params)`** - Fetches filtered broker data
   - Supports asset types, deposit ranges, countries, tags
   - Boolean filters for fees
   - Sorting by name, min deposit, or year established
   - Randomization for non-featured brokers
   - Featured brokers always appear first

2. **`getFilterOptions(type)`** - Gets unique filter values
   - Returns available asset types, countries, tags
   - Used to populate filter sidebar

---

## 🧩 Components

### 1. BrokerTable Component
**File:** `components/broker-table.tsx`

#### Props
```typescript
interface BrokerTableProps {
  brands: (Broker | PropFirm)[]
  type: "broker" | "prop-firm"
  filterOptions?: {
    assetTypes: string[]
    countries: string[]
    tags: string[]
  }
  initialFilters?: any
  serverSideFiltering?: boolean
}
```

#### Features
- Client-side filtering and sorting
- Sortable columns (Name, Min Deposit, Year)
- Responsive design (mobile/desktop)
- Modal popup for detailed broker info
- "More Info" and "Get Started" buttons
- Asset type icons
- Country flags
- URL parameter management

#### Display Columns
1. Logo + Name
2. Assets (icons)
3. Min Deposit
4. Fees (Deposit/Withdrawal)
5. Country + Year
6. Actions (More Info, Get Started)

---

### 2. FilterSidebar Component
**File:** `components/filter-sidebar.tsx`

#### Filter Options
```typescript
interface FilterOptions {
  assetTypes: string[]
  minDepositRanges: string[]
  countries: string[]
  tags: string[]
  noDepositFee: boolean
  noWithdrawalFee: boolean
  noInactivityFee: boolean
}
```

#### Features
- Asset type checkboxes (Forex, Crypto, Stocks, Commodities)
- Deposit range filters ($0-$50, $50-$100, $100-$500, $500+)
- Country filters
- Tag filters
- No-fee checkboxes
- Clear all filters button
- Results count display
- Mobile responsive (Sheet/Drawer on mobile)

---

### 3. BrokerDetailModal Component
**File:** `components/broker-detail-modal.tsx`

#### Features
- Full broker description
- Detailed fee information
- Asset types with icons
- Tags and regulation info
- YouTube video embedding
- "Get Started" CTA button
- Responsive design

---

## 📄 Page Implementation

### File: `app/brokers/page.tsx`

```typescript
export default async function BrokersPage({ searchParams }: PageProps) {
  // Parse URL search params
  const filterParams: BrokerFilterParams = {
    assetTypes: searchParams?.assetTypes 
      ? Array.isArray(searchParams CalgaryTypedArray) 
        ? searchParams.assetTypes 
        : searchParams.assetTypes.split(',')
      : undefined,
    // ... other params
  }

  // Fetch data and filters in parallel
  const [brokersData, filterOptions] = await Promise.all([
    getFilteredBrokers(filterParams),
    getFilterOptions('broker')
  ])

  return (
    <div className="min-h-screen">
      <HeaderNav />
      <Section>
        <Container>
          {/* Page Header */}
          <div className="mb-12">
            <h1>Forex Brokers</h1>
            <p>Compare and filter forex brokers...</p>
          </div>

          {/* Broker Table */}
          <BrokerTable 
            brands={brokersData} 
            type="broker" 
            filterOptions={filterOptions}
            initialFilters={filterParams}
            serverSideFiltering
          />
        </Container>
      </Section>
      <Footer />
    </div>
  )
}
```

---

## ✨ Key Features

### 1. **Server-Side Filtering**
- Filters applied at database level
- URL parameters updated with filter state
- Shareable filtered URLs
- SEO-friendly

### 2. **Randomization**
- Non-featured brokers randomized on each load
- Featured brokers always appear first
- Fisher-Yates shuffle algorithm
- Prevents bias in display order

### 3. **Responsive Design**
- Mobile: Compact layout with horizontal scroll
- Tablet: Filter sidebar + table
- Desktop: Full layout with all columns visible

### 4. **Modal System**
- Click "More Info" to open detailed modal
- Shows complete broker information
- Embedded YouTube videos
- Multiple CTAs

### 5. **SEO Optimization**
- Breadcrumb JSON-LD
- ItemList JSON-LD for top 10 brokers
- Canonical URLs
- Meta descriptions

---

## 📦 Required UI Components

Use Shadcn/UI components:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add card
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add badge
```

---

## 🚀 Implementation Steps for forexproprank.com

### 1. Set Up Database
- Create Supabase project
- Run the brokers table SQL schema
- Add broker data
- Upload logos to Supabase Storage

### 2. Install Dependencies
```bash
npm install @supabase/ssr @supabase/supabase-js
```

### 3. Create Files
- `lib/types.ts` - Type definitions
- `lib/supabase/server.ts` - Supabase server client
- `lib/supabase/client.ts` - Supabase browser client
- `app/actions.ts` - Server actions
- `components/broker-table.tsx` - Main table component
- `components/filter-sidebar.tsx` - Filter component
- `components/broker-detail-modal.tsx` - Modal component
- `app/brokers/page.tsx` - Page component

### 4. Configure Environment
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Add Logo Storage
- Create `logos` bucket in Supabase Storage
- Upload broker logos
- Set public access policy

---

## 📊 Display Specifications

### Table Columns
| Column | Width | Content |
|--------|-------|---------|
| Broker | Flexible | Logo (64px) + Name |
| Assets | 100px | Asset type icons |
| Min Deposit | 120px | Dollar amount |
| Fees | 100px | Deposit/Withdrawal fees |
| Location | 140px | Flag + Country + Year |
| Actions | 180px | More Info + Get Started buttons |

### Colors
- Featured badge: Primary color
- Get Started button: Success color (green)
- More Info button: Secondary
- Filters: Accent color

### Icons (Lucide)
- `TrendingUp` - Forex
- `Bitcoin` - Crypto
- `BarChart3` - Stocks
- `Wheat` - Commodities
- `Info` - More Info
- `ExternalLink` - Get Started

---

## 🔄 URL Parameter Format

Example filtered URL:
```
/brokers?assetTypes=forex,crypto&minDepositRanges=0-50,50-100&countries=Cyprus&tags=ECN&noDepositFee=true
```

---

## 📱 Mobile Responsiveness

### Mobile (< 768px)
- Filter sidebar becomes a Sheet (drawer)
- Horizontal scroll on table
- Smaller logos and text
- Stacked action buttons
- Compact modal

### Desktop (≥ 768px)
- Fixed filter sidebar
- Full table width
- All columns visible
- Expanded modal

---

## 🎯 Customization Tips

### 1. Change Colors
Update `globals.css` CSS variables:
```css
:root {
  --primary: your-color;
  --success: your-color;
}
```

### 2. Modify Columns
Edit `components/broker-table.tsx` table headers and data mapping

### 3. Add Filters
Update `FilterOptions` interface and sidebar UI

### 4. Change Sorting Options
Modify `SortField` type and sorting logic

### 5. Customize Modal
Edit `components/broker-detail-modal.tsx` layout

---

## 🐛 Troubleshooting

### Logos Not Showing
- Check Supabase Storage public access
- Verify logo URLs are accessible
- Use placeholder.svg as fallback

### Filters Not Working
- Check Supabase RLS policies
- Verify filter params match database columns
- Debug with console.log in actions.ts

### Slow Performance
- Add database indexes on filtered columns
- Use server-side filtering
- Limit results per page

---

## 📚 Related Documentation
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Shadcn UI: https://ui.shadcn.com

---

**Last Updated:** October 2024
**Template Version:** 1.0

