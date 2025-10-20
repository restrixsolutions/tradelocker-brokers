# Filtering System Documentation

## Overview

The TradeLocker Brokers platform now supports both client-side and server-side filtering for optimal performance. The filtering widget integrates seamlessly with the database, providing fast and efficient filtering of brokers and prop firms.

## Architecture

### Server-Side Filtering (Recommended)
- **Performance**: Filters are applied at the database level, reducing data transfer
- **URL Parameters**: Filter state is preserved in the URL for bookmarking and sharing
- **Scalability**: Handles large datasets efficiently with proper indexing

### Client-Side Filtering (Fallback)
- **Instant**: No server round-trip needed
- **Offline**: Works without network connectivity
- **Simple**: Good for small datasets

## Implementation Details

### 1. Server Actions (`app/actions.ts`)

The filtering logic is implemented in server actions:

```typescript
// Filter brokers with specific parameters
const filteredBrokers = await getFilteredBrokers({
  assetTypes: ["forex", "crypto"],
  minDepositRanges: ["0-50"],
  countries: ["Cyprus"],
  noDepositFee: true
})

// Filter prop firms
const filteredPropFirms = await getFilteredPropFirms({
  challengeTypes: ["2-Step"],
  profitSplitMin: 80,
  payoutFrequencies: ["Weekly"]
})
```

### 2. URL Parameter Support

Filter state is preserved in URL parameters:

```
/brokers?assetTypes=forex,crypto&noDepositFee=true&sortField=minDeposit&sortDirection=asc
/prop-firms?challengeTypes=2-Step,1-Step&profitSplitMin=90
```

### 3. Database Indexes

Optimized indexes for common filter queries:

```sql
-- Array field indexes (GIN for efficient array operations)
CREATE INDEX idx_brokers_asset_types ON brokers USING GIN (asset_types);
CREATE INDEX idx_brokers_tags ON brokers USING GIN (tags);

-- Regular field indexes
CREATE INDEX idx_brokers_min_deposit ON brokers(min_deposit);
CREATE INDEX idx_brokers_country_established ON brokers(country_established);

-- Composite indexes for sorting
CREATE INDEX idx_brokers_featured_name ON brokers(is_featured DESC, name ASC);
```

## Filter Options

### Broker Filters
- **Asset Types**: forex, crypto, stocks, commodities
- **Min Deposit Ranges**: 0-50, 50-100, 100-500, 500+
- **Countries**: All countries where brokers are established
- **Tags**: Feature tags (e.g., "ECN", "STP", "Raw Spreads")
- **Fee Filters**: No deposit fee, No withdrawal fee, No inactivity fee

### Prop Firm Filters
- **Challenge Types**: 1-Step, 2-Step, Instant Funding
- **Profit Split**: Minimum profit split percentage
- **Max Funding**: Minimum funding amount
- **Payout Frequencies**: Weekly, Bi-Weekly, Monthly, On-Demand

## Usage in Components

### Enable Server-Side Filtering

```tsx
<BrokerTable 
  brands={brokersData} 
  type="broker" 
  filterOptions={filterOptions}
  initialFilters={filterParams}
  serverSideFiltering // Enable server-side filtering
/>
```

### Client-Side Filtering (Default)

```tsx
<BrokerTable 
  brands={brokersData} 
  type="broker"
  // serverSideFiltering not set, uses client-side
/>
```

## Performance Considerations

1. **Database Indexes**: All commonly filtered fields are indexed
2. **GIN Indexes**: Array fields use GIN indexes for efficient contains operations
3. **Query Optimization**: Filters are applied efficiently using Supabase query builder
4. **Data Transfer**: Only filtered results are sent to the client

## Testing

Visit `/test-filters` to see the filtering system in action with various test cases.

## Future Enhancements

1. **Filter Presets**: Save common filter combinations
2. **Advanced Filters**: Date ranges, regex patterns
3. **Filter Analytics**: Track popular filter combinations
4. **Filter Suggestions**: Auto-suggest based on user behavior

## Migration Guide

To enable server-side filtering on existing pages:

1. Update the page to accept `searchParams`
2. Parse filter parameters from URL
3. Use `getFilteredBrokers` or `getFilteredPropFirms` server actions
4. Pass `serverSideFiltering={true}` to BrokerTable component

## Troubleshooting

### Filters not working?
1. Check database indexes are created
2. Verify URL parameters are properly formatted
3. Check browser console for errors
4. Ensure server actions are properly imported

### Performance issues?
1. Run `ANALYZE` on tables to update statistics
2. Check query execution plans
3. Consider adding more specific indexes
4. Monitor Supabase dashboard for slow queries
