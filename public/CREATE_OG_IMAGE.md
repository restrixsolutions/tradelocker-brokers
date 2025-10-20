# Creating Professional OG Image

## Quick Setup

A temporary SVG has been created at `/public/og-image.svg` that works as a placeholder.

For **production**, create a proper PNG image:

## Option 1: Use Canva (Recommended - Free)

1. Go to [canva.com](https://canva.com)
2. Create custom size: **1200 x 630 pixels**
3. Use this template structure:

```
Background: Dark gradient (#0f172a → #334155)
Logo: TradeLocker logo (top left, 60px margin)
Title: "TradeLocker Brokers & Prop Firms 2025" (bold, white, 64px)
Subtitle: "Compare Top Trading Platforms" (gray, 32px)
Features: • 20+ Verified Brokers • 15+ Prop Firms • Complete Guide
URL: tradelockerbrokers.com (bottom, accent color)
```

4. Download as PNG
5. Name it `og-image.png`
6. Replace the SVG file in `/public/`

## Option 2: Use Figma (Professional)

1. Create frame: 1200 x 630
2. Apply brand colors:
   - Background: `#0f172a` to `#334155` gradient
   - Accent: `#06b6d4` (cyan) to `#8b5cf6` (purple)
   - Text: White `#ffffff` and gray `#94a3b8`
3. Export as PNG @ 2x for retina displays
4. Compress with TinyPNG

## Option 3: Use the SVG (Current - Temporary)

The SVG works but PNG is preferred for social media:

```bash
# Convert SVG to PNG (requires ImageMagick or similar)
convert public/og-image.svg -resize 1200x630 public/og-image.png

# Or use an online converter:
# https://cloudconvert.com/svg-to-png
```

## Design Requirements

✅ **Dimensions:** 1200 x 630 pixels (Facebook/Twitter optimal)  
✅ **File size:** Under 1MB (ideally 100-300KB)  
✅ **Format:** PNG (best compatibility) or JPG  
✅ **Safe zone:** Keep important content 40px from edges  
✅ **Text:** Large, readable, high contrast  
✅ **Branding:** Include logo and domain name  

## Testing

After creating the image, test it:

1. **Facebook Debugger:** https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

## Current SVG Preview

The current SVG includes:
- Dark gradient background with decorative circles
- Gradient accent lines (top & bottom)
- Main heading: "TradeLocker Brokers & Prop Firms 2025"
- Subheading: "Compare Top Trading Platforms"
- Feature bullets with colored dots
- Domain name at bottom

**This is functional but not as polished as a professionally designed PNG.**

## Logo File

Also create a `logo.png` (512x512) for schema markup:
- Square format
- Transparent background
- High resolution
- Contains just the TradeLocker logo

Or update schema references to use existing `/tradelocker-logo.png`.

---

**Priority:** Medium-High  
**Time:** 15-30 minutes with Canva  
**Impact:** Proper social media sharing previews

