# 📸 Logo Status & Guide

## ✅ Current Logo Status

### Brokers:
| Broker | Logo Path | File Exists | Status |
|--------|-----------|-------------|--------|
| **GatesFX** | `/images/logos/gatesfx.png` | ✅ Yes | Ready |
| **HeroFX** | `/images/logos/herofx.png` | ✅ Yes | Ready |

### Prop Firms:
| Prop Firm | Logo Path | File Exists | Status |
|-----------|-----------|-------------|--------|
| **Alpha Funded** | `/alphafunded-prop-firm-logo.jpg` | ✅ Yes | Ready |
| **Funded Trader** | `/fundedtrader-prop-firm-logo.jpg` | ✅ Yes | Ready |
| **Prop Elite** | `/propelite-prop-firm-logo.jpg` | ✅ Yes | Ready |
| **FunderPro** | `/placeholder-logo.png` | ⚠️ Placeholder | **Needs Logo** |

## ⚠️ Action Required

### FunderPro Logo Needed:
1. Download logo from: https://funderpro.com
2. Save as: `funderpro-logo.png`
3. Upload to: `/public/`
4. Update database:
```sql
UPDATE prop_firms
SET logo = '/funderpro-logo.png'
WHERE name = 'FunderPro';
```

## 📁 Logo File Organization

### Current Structure:
```
/public/
  ├── alphafunded-prop-firm-logo.jpg ✅
  ├── fundedtrader-prop-firm-logo.jpg ✅
  ├── propelite-prop-firm-logo.jpg ✅
  ├── placeholder-logo.png ✅
  └── images/
      └── logos/
          ├── gatesfx.png ✅
          └── herofx.png ✅
```

### Recommended Organization:
```
/public/
  └── images/
      └── logos/
          ├── brokers/
          │   ├── gatesfx.png
          │   └── herofx.png
          └── prop-firms/
              ├── alphafunded.png
              ├── fundedtrader.png
              ├── propelite.png
              └── funderpro.png
```

## 🎨 Logo Guidelines

### Specifications:
- **Format**: PNG with transparent background (preferred) or JPG
- **Size**: 256x256px (square)
- **Max File Size**: < 100KB
- **Content**: Logo mark only (no text if possible)
- **Background**: Transparent or white

### How to Get Logos:

#### Method 1: Official Website
1. Visit prop firm/broker website
2. Right-click logo → Save image
3. Or check their "Press Kit" / "Brand Assets" page

#### Method 2: Use LLM
```
Find and download the official logo for [FIRM NAME] in PNG format with transparent background
```

#### Method 3: Google Images
```
Search: "[FIRM NAME] logo transparent PNG"
Filter: Size > Medium
```

### How to Optimize:
```bash
# Using ImageMagick (if installed)
convert logo.jpg -resize 256x256 -background none logo.png

# Or use online tools:
# - TinyPNG.com (compression)
# - Remove.bg (background removal)
# - CloudConvert.com (format conversion)
```

## 🔧 Adding Logo to Database

### Step 1: Upload File
Place file in `/public/` folder:
```
/public/funderpro-logo.png
```

### Step 2: Update Database
```sql
UPDATE prop_firms
SET logo = '/funderpro-logo.png'
WHERE name = 'FunderPro';
```

### Step 3: Verify
```sql
SELECT name, logo FROM prop_firms WHERE name = 'FunderPro';
```

### Step 4: Test
- Refresh `/prop-firms` page
- Click "More Info" on FunderPro
- Logo should display in modal

## ✅ Logo Display Checklist

For logos to show in modal, ensure:
- [ ] Logo file exists in `/public/` folder
- [ ] Path in database starts with `/`
- [ ] File extension matches (.png, .jpg, .svg)
- [ ] File is not corrupted
- [ ] File size is reasonable (< 500KB)
- [ ] Image dimensions are sensible (not 5000x5000px)

## 🐛 Troubleshooting

### "Logo Not Showing in Modal"

**Check 1: File Exists**
```bash
ls -la public/funderpro-logo.png
```

**Check 2: Path in Database**
```sql
SELECT logo FROM prop_firms WHERE name = 'FunderPro';
```
Should return: `/funderpro-logo.png`

**Check 3: Browser Console**
Open DevTools → Console → Look for 404 errors on image

**Check 4: Image Component**
The modal uses Next.js Image component which needs:
```tsx
<Image
  src={brand.logo || "/placeholder.svg"}
  alt={brand.name}
  width={80}
  height={80}
  className="object-contain p-2"
/>
```

### "Logo Looks Blurry"
- Upload higher resolution (512x512px)
- Use PNG instead of JPG
- Ensure file is not compressed too much

### "Logo Has Wrong Background"
- Use PNG with transparency
- Or use background-color matching your theme

## 📋 Logo Naming Convention

### Recommended Pattern:
```
Prop Firms: [firmname]-logo.png
Brokers: [brokername]-logo.png
```

### Examples:
```
✅ funderpro-logo.png
✅ alpha-funded-logo.png
✅ gatesfx-logo.png
❌ FunderPro-LOGO.PNG
❌ logo_funderpro.jpg
❌ funderpro.png
```

## 🎯 Current Status Summary

### ✅ Ready (5):
- GatesFX
- HeroFX
- Alpha Funded
- Funded Trader
- Prop Elite

### ⚠️ Needs Logo (1):
- FunderPro (currently using placeholder)

## 📝 Quick Fix for FunderPro

### Option 1: Download Logo
```
1. Go to https://funderpro.com
2. Save logo as funderpro-logo.png
3. Upload to /public/
4. Run: UPDATE prop_firms SET logo = '/funderpro-logo.png' WHERE name = 'FunderPro';
```

### Option 2: Use Placeholder (Current)
```
Logo will show as generic placeholder until real logo is added.
Database already set to: /placeholder-logo.png
```

### Option 3: Extract from Supabase
```
The logo URL from research:
https://gmqmugsbrvhootvipxck.supabase.co/storage/v1/object/public/logos/funderpro.png

This means it's already in Supabase storage!
You can download it from there and put in /public/
```

---

**Action Required**: Upload FunderPro logo to `/public/funderpro-logo.png` and all logos will display correctly! 📸

