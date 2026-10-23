# oie.org — Contributor & Agent Instructions

## Adding or updating a commercial support vendor

Vendor listings on this site are generated from `src/data/vendors.ts`. New vendors
are submitted as **issues** (via an issue form) in the separate
[`OpenIntegrationEngine/vendors`](https://github.com/OpenIntegrationEngine/vendors)
repository. Your job is to translate one of those submissions into a `Vendor`
entry here.

### Golden rule: use the vendor's own words verbatim

**Always copy the tagline, description, region, and language text directly from the
submission. Do not paraphrase, summarize, or "improve" it.** The vendor wrote this
copy about themselves; rewording it changes their meaning and is treated as wrong.
The only editing allowed is trimming to fit a field (e.g. deriving a short tagline
from the first sentence of their description) — and even then, use their exact
phrasing.

### Step-by-step

1. **Read the source submission, not a summary of it.** Fetch the raw issue body so
   you can see the exact text and the exact checkbox states:

   ```sh
   gh issue view <N> --repo OpenIntegrationEngine/vendors --json title,body -q '.title, .body'
   ```

   Do **not** rely on a rendered/markdown-fetched version or a description of the
   issue — checkbox state (`- [x]` vs `- [ ]`) and verbatim copy must come from the
   raw body.

2. **Map the checked service boxes to the `VendorService` union.** Only include a
   service if its box is checked (`- [x]`). The issue-form labels map to the union
   values in `src/data/vendors.ts` as:

   | Issue form label                | `VendorService` value                |
   | ------------------------------- | ------------------------------------ |
   | Integration and Interface Services | `'Integration & Interface Services'` |
   | Migration from Other Engines    | `'Migration from Other Engines'`     |
   | Cloud Hosting                   | `'Cloud Hosting'`                    |
   | Managed Support                 | `'Managed Support'`                  |
   | Custom Development              | `'Custom Development'`               |
   | Training                        | `'Training'`                         |
   | Something Else                  | *(no enum value — ignore; it is covered by the free-text description)* |

   An unchecked box means the service is **omitted** from the `services` array. Double
   check each box individually — this is the field most often gotten wrong.

3. **Fill the `Vendor` fields from the submission:**
   - `name` — Vendor Name
   - `url` — the primary website from Contact Information (first URL). Additional
     sites (e.g. a product site) and the contact email belong in the description if
     the vendor mentioned them, not in `url`.
   - `regions` — Supported Regions, verbatim
   - `languages` — Languages Spoken, verbatim
   - `tagline` — a short one-liner in the vendor's own words (derive from their
     description if they didn't supply a separate tagline)
   - `description` — the "Additional Information" text, verbatim
   - `services` — from the checked boxes (step 2)
   - `logo` — see step 4

4. **Download and add the logo.** Save it under `public/images/vendors/` with a
   short lowercase filename (e.g. `sysnet.png`) and set `logo` to
   `/images/vendors/<file>`:

   ```sh
   curl -sSL -o public/images/vendors/<name>.png "<logo-url-from-issue>"
   ```

   If the image is much larger than the existing logos (which sit well under a few
   hundred KB), downscale it to a max width of ~800px so it matches the others:

   ```sh
   sips -Z 800 public/images/vendors/<name>.png
   ```

5. **Append the entry** to the `vendors` array in `src/data/vendors.ts`, matching the
   formatting of the surrounding entries.

6. **Verify the build** before considering the change complete:

   ```sh
   npm install   # first time only
   npm run build
   ```

   The build must exit 0 and the vendor must appear in `dist/commercial-support/`.

### Committing

Follow the existing history convention — branch off `main`, and reference the source
submission in the commit/PR body, e.g.:

> Vendor submission from OpenIntegrationEngine/vendors#<N>.
