#!/usr/bin/env bash
# Resize gallery photos, write WebP variants, and build thumbs for the grid.
# Run from repo root: ./scripts/optimize-photos.sh

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PHOTOS="$ROOT/photos"
THUMBS="$PHOTOS/thumbs"
MAX_EDGE=1920
THUMB_EDGE=480
WEBP_QUALITY=82

mkdir -p "$THUMBS"

shopt -s nullglob
for jpg in "$PHOTOS"/*.jpg; do
  base="$(basename "$jpg" .jpg)"
  sips -Z "$MAX_EDGE" "$jpg" >/dev/null
  cwebp -q "$WEBP_QUALITY" "$jpg" -o "$PHOTOS/${base}.webp" >/dev/null
  sips -Z "$THUMB_EDGE" "$jpg" --out "$THUMBS/${base}.jpg" >/dev/null
  cwebp -q "$WEBP_QUALITY" "$THUMBS/${base}.jpg" -o "$THUMBS/${base}.webp" >/dev/null
  echo "OK $base"
done
