# 🔧 Modal Logo Troubleshooting

## Issue
Logos not showing in the "More Info" popup modal (but working in table).

## ✅ Verification

### Code is Correct:
The modal component at line 73-79 in `broker-detail-modal.tsx`:
```tsx
<Image
  src={brand.logo || "/placeholder.svg"}  // ✅ Using database logo
  alt={brand.name}
  width={80}
  height={80}
  className="object-contain p-2"
/>
```

### Data is Correct:
All brands have proper logo paths in database ✅

### Config is Correct:
`next.config.mjs` now supports external URLs ✅

## 🔧 Solution: Restart Dev Server

Since we updated `next.config.mjs`, you need to restart the dev server.

### Step 1: Stop Current Server
Press `Ctrl+C` in the terminal running `npm run dev`

### Step 2: Restart Server
```bash
npm run dev
```

### Step 3: Hard Refresh Browser
- Chrome/Edge: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Safari: `Cmd+Option+R`
- Firefox: `Ctrl+Shift+R`

### Step 4: Test Modal
1. Go to `/brokers` or `/prop-firms`
2. Click "More Info" on any brand
3. Logo should now display in modal header ✅

## 🐛 If Still Not Working

### Debug Checklist:

1. **Check Browser Console**
```
Open DevTools (F12)
Look for errors like:
- "Failed to load resource"
- "Image optimization error"
- "Invalid src prop"
```

2. **Verify Logo Path**
```sql
SELECT name, logo FROM brokers;
SELECT name, logo FROM prop_firms;
```

3. **Check File Exists**
```bash
ls -la public/funderpro-logo.png
ls -la public/images/logos/gatesfx.png
```

4. **Test Direct URL**
Try accessing directly in browser:
```
http://localhost:3000/funderpro-logo.png
http://localhost:3000/images/logos/gatesfx.png
```

5. **Check Next.js Image Config**
Verify `next.config.mjs` has:
```javascript
images: {
  unoptimized: true,
  remotePatterns: [...]
}
```

## 💡 Quick Test

### Test with Placeholder:
If a logo isn't showing, temporarily use placeholder:
```sql
UPDATE prop_firms 
SET logo = '/placeholder.svg' 
WHERE name = 'FunderPro';
```

If placeholder shows but custom logo doesn't:
- Logo file might be corrupted
- Path might be wrong
- File permissions issue

## 🔍 Alternative: Use Regular img Tag

If Next.js Image is causing issues, use regular img:

```tsx
// Replace Image component with regular img
<img
  src={brand.logo || "/placeholder.svg"}
  alt={brand.name}
  className="w-20 h-20 object-contain p-2"
/>
```

But first try restarting the dev server!

## ✅ Expected Result

After restarting server and hard refresh, you should see:

**In Modal Header:**
```
┌─────────────────────────────────┐
│  [LOGO]  Brand Name             │
│          Description text here  │
└─────────────────────────────────┘
```

Where [LOGO] is the actual logo from the database, not a broken image icon.

---

**Most likely fix: Restart dev server to apply next.config.mjs changes!**

