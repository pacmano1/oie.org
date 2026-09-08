# Eclipse Foundation branding

Status: **live.** Prepared 2026-08-30 as a parked prototype, unblocked 2026-09-07 when the
creation review completed and the project entered incubation. The affiliation is now formal,
so the branding states a fact rather than an intention.

## What this covers

- **Homepage hero** is a three-part lockup: Eclipse Foundation logo, OIE mark, OIE wordmark.
  All vector.
- **Header** carries an `ECLIPSE` eyebrow above the project name.
- **Footer** has a two-column Eclipse row (Foundation and incubation) plus the trademark line.
- **Downloads** carries the incubation logo and a note beside the release card.
- **Assets** under `public/images/`: `eclipse-foundation.svg` and `eclipse-incubation.svg`
  (both from the Foundation's own kits, unmodified), plus `oie-mark.svg` and `oie-wordmark.svg`
  derived from the `OpenIntegrationEngine/governance` repo.

## What the Foundation actually requires

Checked against the Project Handbook, the incubation article, and the Trademark Usage Policy
on 2026-09-07.

**The trademark symbol is mandatory.** "The appropriate trademark symbol (i.e. TM or (R)) must
appear at both the first and most prominent use of Eclipse Trademarks, and with all
occurrences." An earlier draft of this branding removed the `TM` from the header and footer on
the theory that the new attribution line replaced it. That was backwards. The symbol and the
attribution are both required.

We apply it to brand chrome (header, footer) and the default page title, not to the 14 per-page
titles or to body copy. "With all occurrences" read literally would put it everywhere, which
makes search results look like spam and body text unreadable. This is an interpretation, not a
quote. If it ever matters, ask the EMO rather than defending our own reading.

**The Eclipse prefix is per page, not per site.** "Both the first and the most prominent
reference to the project on each page is identified as 'Eclipse [project name]'. Subsequent
references may drop the Eclipse identifier." The header covers first reference everywhere. All
page titles carry the prefix.

**The attribution wording is prescribed.** "[Eclipse, CDT, Theia] are trademarks of Eclipse
Foundation AISBL." The footer line follows this form. Keep the legal entity name there; it is
dropped from reader-facing prose, where it costs the reader something and buys nothing.

**Incubation branding is mandatory, and there are four parts.** Display the incubation logo on
the project web page, display it on the primary download page, include "incubation" in the
filename of downloadable files where technically feasible, and include it in features such as
about dialogs and installers. The first two are done here. **The last two belong to the engine
repo and its release process and are not tracked in this repository.**

## Decisions that are not obvious from the code

**Why the EF logo is at 72% width.** Not a guess. Rendered at equal widths, the "ECLIPSE"
wordmark is 0.148 of its artwork width; "Open" in our wordmark is 0.136 of its own. Drawn at
44% against a wordmark at 100%, their type came out 2.1x smaller than ours, which is what made
it read as an afterthought. 72% puts EF type at ~78% of ours: present, deliberate, still
subordinate. 84% reads as near-parity, which overstates the relationship.

**Why `.hero__logo` is 300px, not 420px.** At 420px the lockup measured 567px tall against
248px for the whole copy block, a 2.29x imbalance. 300px brings it to ~1.3x.

**Why the headline was not shrunk to match.** Tried it. Shrinking the headline moves weight
back to the logo and makes the ratio worse (1.40x). The subhead went 1.1rem to 1.2rem instead,
which closes the headline/subhead interval and improves the column balance to 1.28x.

**Why `.hero__logo` needs an explicit `width: 100%`.** `container-type: inline-size` applies
inline-axis containment, so with width left at auto the container resolves to zero and takes
its percentage-sized children with it. The lockup renders as nothing without it.

**Why "Eclipse" is not set into the wordmark artwork.** The governance SVGs are real vectors
but the wordmark is outlined paths with no `font-family` recorded, so the typeface cannot be
identified from the file. Setting "Eclipse" in a near-miss face directly above the real
letterforms looked worse than not doing it. Using EF's actual logo sidesteps the problem. If
the wordmark is ever extended, get the source typeface from whoever produced `branding/logos/`.
The Foundation's own incubation logo has the same problem, so there is no matching face to
borrow from there either.

**Why the footer logos have different widths (112px and 164px) but look the same size.** The
incubation SVG carries clear space inside its viewBox. Its artwork spans x 54.4 to 375.6 of
468, so only 68.6% of the box is ink, and vertically only 52.6%. The EF logo is the opposite,
filling 100.8% of its viewBox and bleeding slightly past the edge. Sizing the two boxes equally
makes the incubation mark render about a third smaller. **Size these two by artwork, never by
box or by height.** A script to remeasure is not kept; the numbers came from parsing the path
coordinates out of each SVG.

**Why the hero EF logo has 11cqw beneath it.** Brand guidelines page 4.3: "No text or graphic
elements should appear in this area. The amount of clear space around our logo should be equal
to or greater than the height of the capital 'E' in Eclipse Foundation." The "ECLIPSE" wordmark
is 39.6 units tall on a 283.2 by 90.7 viewBox. The logo renders at 72% of the lockup container,
so the required clear space works out to 10.07cqw. 11cqw clears it with a margin, and the
container-query unit keeps the ratio correct as the lockup scales. An earlier version had 4cqw,
which was 12px against a required 30.2px, with our own OIE mark as the intruding element.
Above and to the sides we have 64px and 42px, both comfortably clear.

**Why the OIE mark dropped from 60% to 52%.** Adding the clear space made the lockup 21px
taller and unbalanced it against the copy block. Shrinking the mark gives back about 24px, so
the column balance stays close to the 1.28x the measurements above were tuned for.

**Why the share card is light.** `og-image.jpg` is judged in a feed at thumbnail size, and the
feeds it lands in are dark. Discord, Slack and Teams all default to dark chrome, so a dark navy
card blends into the surrounding UI while a white one reads as a lit panel. An earlier version
of this card was dark on the opposite reasoning, that a dark ground gives contrast at thumbnail
size. That holds on a white page and inverts in the places the card is actually seen. Both were
mocked at 400px against Discord's `#313338` message area before the switch. The hero is a
separate question and the pink hero stays: the visitor has already arrived and is about to read.
The card is generated by `scripts/brand/og-card.py`, not drawn by hand, because the previous one
sat unchanged from April 2026 with no Eclipse branding and the wordmark cropped mid-name. Review
it at `/og-preview/`, which is `noindex` and excluded from the sitemap.

**Why the card carries the colour Eclipse logo.** Guidelines 4.2 reserve the reversed
orange-and-white mark for dark backgrounds, so a white card takes the colour one.
`scripts/brand/eclipse-foundation-reversed.svg` is retained although nothing references it now.
It is the correct asset the day anything of ours goes on a dark ground, and it is their file
byte for byte, so re-fetching it later is avoidable work.

**Why the generator crops the OIE mark before scaling it.** `oie-mark.svg` carries about 6%
empty margin inside its 1024 viewBox, so scaling the nominal box undershoots. A nominal 0.80
rendered as 0.71 of its container and left a white ring half again as wide as intended, with
nothing in the code to suggest it. The script crops to the alpha bounding box first, so the
scale constant means what it says.

**Why the icons carry no Eclipse logo and no wordmark.** `favicon-32.png` and
`apple-touch-icon.png` are the OIE mark alone on opaque white, generated by
`scripts/brand/icons.py`. The pair they replaced included the wordmark, which inside a 32px
square is noise rather than small type, and were transparent, which iOS composites onto black
on a touch icon. A lockup is unreadable at icon sizes, so the trademark rules are met by using
the marks legibly elsewhere rather than stamping them onto every surface.

**The logos are used unmodified, deliberately.** The Trademark Usage Policy forbids altering
their logos without written permission, and the artwork kits repeat it in `NOTICE.txt`. Both
files are byte-identical to the Foundation's own `EF_Color.svg` and
`eclipse_incubation_horizontal-svg.svg`. The registered mark on their artwork stays as
supplied.

## Known issues, accepted rather than fixed

**"Eclipse" appears twice within ~100 vertical pixels on the homepage:** once as the header
eyebrow, once as the hero's EF logo. Reviewed and accepted. If it grates later, drop the
eyebrow from the header on the homepage only; the hero lockup is both the first and most
prominent reference there, so the naming rule stays satisfied.

## Still outstanding

- `oie-logo.png` (644KB) is still the logo in the Organization and news-publisher structured
  data. Left as a raster deliberately, since search engines want one there. The header and
  footer now use `oie-mark.svg`.
- The engine repo still owes the other two incubation requirements: "incubation" in the
  filename of downloadable files, and in about dialogs and installers.
