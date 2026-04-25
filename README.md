# oie.org

Source for [openintegrationengine.org](https://openintegrationengine.org), the website for the Open Integration Engine project.

Built with [Astro](https://astro.build) 5, hosted on AWS S3 with CloudFront in front.

## Develop locally

```
npm install
npm run dev
```

The dev server runs at <http://localhost:4321>. Edits hot-reload.

## Build

```
npm run build
```

Output goes to `dist/`. Every page is rendered as a static `index.html` plus assets under `assets/` and `images/`.

## Project layout

```
src/
  components/   Astro components (Icon, PageHero, Header, Footer)
  content/      Markdown content (news articles)
  data/         Sponsor and vendor data files
  layouts/      Base page layout
  pages/        Routes; each .astro file is a page
  styles/       Global CSS and design tokens
public/         Static files copied to the site root
cloudfront/     CloudFront Function source
```

Adding a news article: drop a Markdown file into `src/content/news/`. The frontmatter needs `title`, `date`, and (optionally) `excerpt`. The filename becomes the URL slug.

Adding a sponsor or commercial-support vendor: edit `src/data/sponsors.ts` or `src/data/vendors.ts` and add the logo to `public/images/`.

## Deploy

The site deploys to AWS S3, fronted by CloudFront for caching and HTTPS. Requires the `aws` CLI configured with credentials that can write to the bucket. `jq` is also needed for the one-time CloudFront Function setup.

### One-time setup

Copy the config template and fill in values:

```
cp deploy.config.example.sh deploy.config.local.sh
```

Edit `BUCKET`, `REGION`, and `DISTRIBUTION_ID` to match your AWS resources. `deploy.config.local.sh` is gitignored.

Install the CloudFront Function that resolves `/about/` to `/about/index.html`:

```
./setup-cloudfront-function.sh
```

This is safe to re-run if you change the function later.

### Push a build to S3

```
./deploy.sh
```

The script builds the site, syncs to S3 with tiered cache headers (immutable for hashed assets in `/assets/`, 1-day for images, no-cache for HTML), then triggers a CloudFront invalidation so updates are visible immediately.

## Contributing

Typo fixes, broken-link fixes, content updates, and design improvements are welcome. Open an issue first for anything substantial.
