# Brand asset generators

Rebuilds `public/og-image-2.jpg`, the Open Graph image every page points at. It is
what LinkedIn, Slack, Teams, Discord and iMessage render when a link to the site
is posted, and it never appears on the site itself.

```
python3 scripts/brand/og-card.py
```

Needs python3 with Pillow, and node with sharp (already a dependency of Astro).
The Raleway variable font is fetched on first run into `Raleway.ttf` here, which
is gitignored.

The card is white, so it uses the Eclipse Foundation's colour logo from
`public/images/`. `eclipse-foundation-reversed.svg` here is their own
`EF_White-Orange.svg`, byte for byte, and is currently unreferenced: guidelines
(4.2) require the reversed mark on dark backgrounds, so it is kept for the day
something of ours needs one. Their trademark policy forbids altering the artwork,
so both are copied rather than recoloured.

The icons are the mark alone on an opaque white ground. Not a lockup, because a
wordmark inside a 32px square is noise rather than small type, and not transparent,
because iOS ignores alpha on a touch icon and composites onto black.

Preview the results at `/og-preview/`, which renders the card at the sizes it is
actually seen at. That page is `noindex` and excluded from the sitemap.

Platforms cache share cards aggressively. After deploying a new one, force a
re-scrape (LinkedIn Post Inspector, Slack's unfurl refresh) or previews will keep
showing the old image.
