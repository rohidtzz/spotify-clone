#!/bin/bash

# Generate PWA icons from SVG
# This script requires ImageMagick (install with: sudo apt install imagemagick)

SIZES=(72 96 128 144 152 192 384 512)
SOURCE="./public/icons/icon-base.svg"
OUTPUT_DIR="./public/icons"

echo "Generating PWA icons..."

for size in "${SIZES[@]}"; do
  output_file="${OUTPUT_DIR}/icon-${size}x${size}.png"
  echo "Generating ${size}x${size} icon..."
  
  # Convert SVG to PNG with specific size
  convert -background none -size ${size}x${size} "${SOURCE}" "${output_file}"
  
  if [ $? -eq 0 ]; then
    echo "✅ Generated: ${output_file}"
  else
    echo "❌ Failed to generate: ${output_file}"
  fi
done

echo "Icon generation complete!"
echo "Note: If convert command is not found, install ImageMagick:"
echo "  Ubuntu/Debian: sudo apt install imagemagick"
echo "  macOS: brew install imagemagick"
