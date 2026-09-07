#!/usr/bin/env python3
"""Rebuild public/favicon-32.png and public/apple-touch-icon.png.

Both are the OIE mark alone on an opaque white ground. Two things the previous
pair got wrong, kept here as the reason this script exists:

  * They included the wordmark. "Open Integration Engine" set inside a 32px
    square is not small type, it is noise. At icon sizes only the mark survives.
  * They were transparent. iOS does not honour alpha on a touch icon; it
    composites onto black, so a transparent icon renders as a dark tile.

No Eclipse Foundation logo here either. At 32px a lockup is unreadable, and the
trademark policy is about legible, unaltered use, not about stamping the mark
onto every surface.

Usage:  python3 scripts/brand/icons.py
"""
import os, subprocess
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
MARK = os.path.join(ROOT, 'public', 'images', 'oie-mark.svg')
WHITE = (255, 255, 255)

# Ink as a fraction of the square. The favicon is tighter because at 32px every
# pixel of padding is one the mark does not get; the touch icon is looser
# because iOS masks it to a squircle and clips the corners.
TARGETS = [
    ('favicon-32.png',       32, 0.86),
    ('apple-touch-icon.png', 180, 0.72),
]

def render_mark(px):
    tmp = os.path.join(HERE, '.tmp')
    os.makedirs(tmp, exist_ok=True)
    out = os.path.join(tmp, 'mark-%d.png' % px)
    subprocess.run(
        ['node', '-e',
         "require('sharp')(process.argv[1],{density:900}).resize({width:+process.argv[3]})"
         ".png().toFile(process.argv[2]).catch(e=>{console.error(e.message);process.exit(1)})",
         MARK, out, str(px)],
        cwd=ROOT, check=True)
    return Image.open(out).convert('RGBA')

def main():
    for name, size, fill in TARGETS:
        # Render large, crop to the actual ink, then scale. The mark's viewBox
        # carries padding, so scaling the box would leave the artwork undersized.
        big = render_mark(1600)
        box = big.split()[3].getbbox()
        ink = big.crop(box)
        target = int(round(size*fill))
        w, h = ink.size
        scale = target/max(w, h)
        ink = ink.resize((max(1, int(round(w*scale))), max(1, int(round(h*scale)))), Image.LANCZOS)

        canvas = Image.new('RGB', (size, size), WHITE)
        canvas.paste(ink, ((size-ink.width)//2, (size-ink.height)//2), ink)
        out = os.path.join(ROOT, 'public', name)
        canvas.save(out, optimize=True)
        print("wrote public/%-22s %dx%d  ink %dx%d (%.0f%%)"
              % (name, size, size, ink.width, ink.height, 100*max(ink.size)/size))

if __name__ == '__main__':
    main()
