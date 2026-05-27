#!/usr/bin/env python3
"""
Конвертирует PNG/JPG > 100 KB в WebP, включая подпапки.

WebP quality=80 — визуально без отличий, размер -85% типично.
Оригиналы оставлены на месте (для отката + fallback).

Запуск: python3 scripts/optimize-images.py
"""
import os, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent.parent
IMG_DIR = ROOT / 'public' / 'assets' / 'images'
THRESHOLD_KB = 100
WEBP_QUALITY = 80

if not IMG_DIR.exists():
    print(f"FATAL: {IMG_DIR} does not exist", file=sys.stderr)
    sys.exit(1)

total_before = 0
total_after = 0
converted = []
skipped = []

patterns = ['**/*.png', '**/*.jpg', '**/*.jpeg']
all_files = sorted({p for pat in patterns for p in IMG_DIR.glob(pat)})

for src_path in all_files:
    size_kb = src_path.stat().st_size / 1024
    if size_kb < THRESHOLD_KB:
        skipped.append((str(src_path.relative_to(IMG_DIR)), size_kb))
        continue

    webp_path = src_path.with_suffix('.webp')
    if webp_path.exists() and webp_path.stat().st_mtime > src_path.stat().st_mtime:
        new_size_kb = webp_path.stat().st_size / 1024
    else:
        img = Image.open(src_path)
        img.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=6)
        new_size_kb = webp_path.stat().st_size / 1024

    total_before += size_kb
    total_after += new_size_kb
    saved_pct = (1 - new_size_kb / size_kb) * 100
    converted.append((str(src_path.relative_to(IMG_DIR)), size_kb, new_size_kb, saved_pct))

print(f"\n{'FILE':<45} {'SRC KB':>10} {'WEBP KB':>10} {'SAVED':>8}")
print('-' * 80)
for name, before, after, pct in converted:
    print(f"{name:<45} {before:>10.0f} {after:>10.0f} {pct:>7.0f}%")
print('-' * 80)
if total_before > 0:
    print(f"{'TOTAL':<45} {total_before:>10.0f} {total_after:>10.0f} {(1 - total_after/total_before)*100:>7.0f}%")
print(f"\nConverted/found: {len(converted)} files")
print(f"Skipped (<{THRESHOLD_KB}KB): {len(skipped)} files")
