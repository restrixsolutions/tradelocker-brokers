# Logo Fix Summary

## Issue Found
The database `logo` column contains **Supabase Storage URLs**, not local file paths:

### Database Content (via MCP Supabase Server):

**Brokers Table:**
```
GatesFX: https://gmqmugsbrvhootvipxck.supabase.co/storage/v1/object/public/logos/gatesfx.png
HeroFX: https://gmqmugsbrvhootvipxck.supabase.co/storage/v1/object/public/logos/herofx.png
```

**Prop Firms Table:**
```
FunderPro: https://gmqmugsbrvhootvipxck.supabase.co/storage/v1/object/public/logos/funderpro.png
```

## The Fix

### Updated `next.config.mjs`:
Added your specific Supabase project hostname to the allowed image domains:

```javascript
{
  protocol: 'https',
  hostname: 'gmqmugsbrvhootvipxck.supabase.co',
  pathname: '/storage/v1/object/public/**',
}
```

## What `brand.logo` Is

- `brand.logo` comes from the database `logo` column
- It contains the full Supabase Storage URL
- The modal displays: `<Image src={brand.logo} />` which is the Supabase URL

## Result

✅ **Logos should now display in the modals!**

The Next.js Image component can now load images from your Supabase Storage URLs:
- `https://gmqmugsbrvhootvipxck.supabase.co/storage/v1/object/public/logos/...`

## Note

I restarted your dev server for the config changes to take effect. Your logos are stored in Supabase Storage, not in the `/public` folder, which is why they appear as full URLs in the database.

Try opening a modal now - the logos should display correctly!
