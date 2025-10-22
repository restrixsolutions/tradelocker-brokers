#!/bin/bash

# Convert OG image from SVG to PNG
# This script requires ImageMagick to be installed
# On macOS: brew install imagemagick
# On Ubuntu/Debian: sudo apt-get install imagemagick

echo "Converting og-image.svg to og-image.png..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  Or use an online converter: https://cloudconvert.com/svg-to-png"
    exit 1
fi

# Convert SVG to PNG with proper dimensions
convert public/og-image.svg -resize 1200x630 -background transparent public/og-image.png

# Optimize the PNG file size
if command -v optipng &> /dev/null; then
    optipng -o7 public/og-image.png
else
    echo "optipng not found. Skipping optimization."
    echo "To install: brew install optipng (macOS) or sudo apt-get install optipng (Ubuntu)"
fi

echo "✅ Conversion complete! OG image saved to public/og-image.png"
echo ""
echo "Next steps:"
echo "1. Test the image at:"
echo "   - Facebook: https://developers.facebook.com/tools/debug/"
echo "   - Twitter: https://cards-dev.twitter.com/validator"
echo "   - LinkedIn: https://www.linkedin.com/post-inspector/"
echo "2. Commit the new PNG file to your repository"
