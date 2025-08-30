#!/bin/bash

echo "🎨 Regenerating Spotify PWA Icons with color..."

# Source SVG file
SVG_FILE="spotify-icon.svg"
ICONS_DIR="icons"

# Create icons directory if it doesn't exist
mkdir -p $ICONS_DIR

# Array of icon sizes needed for PWA
SIZES=(72 96 128 144 152 192 384 512)

echo "📦 Generating icons from $SVG_FILE..."

for size in "${SIZES[@]}"; do
    echo "  🔄 Creating ${size}x${size}..."
    
    # Use ImageMagick with better color preservation
    convert "$SVG_FILE" \
        -background transparent \
        -colorspace sRGB \
        -density 300 \
        -resize "${size}x${size}" \
        -quality 95 \
        "$ICONS_DIR/icon-${size}x${size}.png"
    
    if [ $? -eq 0 ]; then
        echo "  ✅ icon-${size}x${size}.png ($(stat -c%s "$ICONS_DIR/icon-${size}x${size}.png" | numfmt --to=iec-i)B)"
    else
        echo "  ❌ Failed to create icon-${size}x${size}.png"
    fi
done

echo ""
echo "🎉 Icon generation complete!"
echo "📁 Icons saved in: $ICONS_DIR/"
echo ""

# Show generated files
ls -la $ICONS_DIR/

echo ""
echo "🔍 Testing first icon color profile..."
file "$ICONS_DIR/icon-192x192.png"

echo ""
echo "✅ Ready to test PWA with colorful icons!"
