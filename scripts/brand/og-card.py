#!/usr/bin/env python3
"""Rebuild public/og-image.jpg, the Open Graph share card.

The card never appears on the site, so it is easy to forget it exists and let it
go stale. It did exactly that once: it sat unchanged from April 2026 with no
Eclipse branding and the wordmark cropped mid-name. Run this whenever the
branding, the headline, or the palette changes. See docs/eclipse-branding-notes.md.

Requirements: python3 with Pillow, node with sharp (both already in the repo's
node_modules), and the Raleway variable font, which this script fetches on first
run into scripts/brand/Raleway.ttf (gitignored, ~300KB).

Usage:  python3 scripts/brand/og-card.py
"""
import os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT  = os.path.join(ROOT, 'public', 'og-image.jpg')
FONT = os.path.join(HERE, 'Raleway.ttf')
FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/raleway/Raleway%5Bwght%5D.ttf'

# --- canvas -----------------------------------------------------------------
W, H   = 1200, 630          # the size every platform expects
BG     = (24, 51, 67)       # --color-headings #183343
FG     = (255, 255, 255)
MARGIN = 80
HEADLINE = ["Healthcare Integration", "Free and Open Source", "No Vendor Lock-In"]
NAME     = "Eclipse Open Integration Engine"
START_SIZE = 70             # shrinks automatically if the copy grows

def fetch_font():
    if os.path.exists(FONT):
        return
    # curl, not urllib: the python.org macOS builds ship without CA certificates,
    # so urllib raises CERTIFICATE_VERIFY_FAILED on a perfectly good URL.
    print("fetching Raleway...")
    subprocess.run(['curl', '-fsSL', '-o', FONT, FONT_URL], check=True)

def svg_to_png(svg, png, width):
    """Render an SVG through sharp, which Astro already depends on."""
    subprocess.run(
        ['node', '-e',
         "require('sharp')(process.argv[1],{density:600}).resize({width:+process.argv[3]})"
         ".png().toFile(process.argv[2]).catch(e=>{console.error(e.message);process.exit(1)})",
         svg, png, str(width)],
        cwd=ROOT, check=True)

def font(px, weight):
    f = ImageFont.truetype(FONT, px)
    f.set_variation_by_axes([weight])   # Raleway ships as a variable font
    return f

def main():
    fetch_font()
    tmp = os.path.join(HERE, '.tmp')
    os.makedirs(tmp, exist_ok=True)
    mark_png = os.path.join(tmp, 'mark.png')
    ef_png   = os.path.join(tmp, 'ef.png')
    svg_to_png(os.path.join(ROOT, 'public', 'images', 'oie-mark.svg'), mark_png, 600)
    # Their reversed logo, not the colour one recoloured. Brand guidelines 4.2:
    # on dark backgrounds use the inverted orange-and-white mark.
    svg_to_png(os.path.join(HERE, 'eclipse-foundation-reversed.svg'), ef_png, 600)

    im = Image.new('RGB', (W, H), BG)
    d  = ImageDraw.Draw(im)

    # Top row. The OIE mark is navy and would vanish on this background, so it
    # sits on a light chip rather than being recoloured.
    CHIP, CHIP_Y = 88, 62
    chip = Image.new('RGBA', (CHIP, CHIP), (0, 0, 0, 0))
    ImageDraw.Draw(chip).rounded_rectangle([0, 0, CHIP-1, CHIP-1], radius=20, fill=(255, 255, 255, 255))
    mark = Image.open(mark_png).convert('RGBA').resize((int(CHIP*0.80),)*2, Image.LANCZOS)
    chip.paste(mark, ((CHIP-mark.width)//2,)*2, mark)
    im.paste(chip, (MARGIN, CHIP_Y), chip)

    fn = font(29, 600)
    bb = d.textbbox((0, 0), NAME, font=fn)
    d.text((MARGIN+CHIP+24, CHIP_Y+CHIP//2-(bb[3]-bb[1])//2-6), NAME, font=fn, fill=FG)
    top_ink = CHIP_Y + CHIP

    # Eclipse Foundation logo, bottom right. Its clear-space requirement is the
    # cap height of the "E", which at this width is 26.6px; it gets 80 and 72.
    EF_W = 190
    ef = Image.open(ef_png).convert('RGBA')
    ef = ef.resize((EF_W, int(EF_W*ef.height/ef.width)), Image.LANCZOS)
    ex, ey = W-MARGIN-EF_W, H-72-ef.height
    bottom_ink = ey

    size = START_SIZE
    while size > 36:
        fh = font(size, 700)
        if max(d.textlength(l, font=fh) for l in HEADLINE) <= W-2*MARGIN-40:
            break
        size -= 2
    fh = font(size, 700)
    lh = int(size*1.2)

    # Position by measured glyph ink, not by the nominal line box. A font's line
    # box carries leading above the caps that no glyph occupies, so centring on
    # it drops the block visibly low.
    probe = Image.new('L', (W, H), 0)
    pd = ImageDraw.Draw(probe)
    for i, l in enumerate(HEADLINE):
        pd.text((MARGIN, i*lh), l, font=fh, fill=255)
    ink = probe.getbbox()
    y0 = top_ink + (bottom_ink-top_ink-(ink[3]-ink[1]))//2 - ink[1]
    for i, l in enumerate(HEADLINE):
        d.text((MARGIN, y0+i*lh), l, font=fh, fill=FG)

    im.paste(ef, (ex, ey), ef)
    im.save(OUT, quality=92, subsampling=0)
    print("wrote %s  headline %dpx  gaps %d/%d"
          % (os.path.relpath(OUT, ROOT), size,
             (y0+ink[1])-top_ink, bottom_ink-(y0+ink[3])))

if __name__ == '__main__':
    main()
