#!/usr/bin/env bash
# Deploy oie.org to S3.
# Requires: aws CLI configured with credentials that can write to the bucket.
# Usage: ./deploy.sh

set -euo pipefail

cd "$(dirname "$0")"
if [[ ! -f package.json ]]; then
    echo "ERROR: package.json not found. Run this script from the project root."
    exit 1
fi

if [[ ! -f deploy.config.local.sh ]]; then
    echo "ERROR: deploy.config.local.sh not found."
    echo "       Copy deploy.config.example.sh to deploy.config.local.sh and fill in your values."
    exit 1
fi
# shellcheck source=deploy.config.example.sh
source deploy.config.local.sh

: "${BUCKET:?BUCKET must be set in deploy.config.local.sh}"
: "${REGION:?REGION must be set in deploy.config.local.sh}"
: "${DISTRIBUTION_ID:?DISTRIBUTION_ID must be set in deploy.config.local.sh}"

echo "==> Building site"
npm run build

echo "==> Cleaning macOS metadata"
find dist -name ".DS_Store" -delete 2>/dev/null || true

# Hashed assets (CSS, JS, fonts): safe for long immutable cache.
echo "==> Syncing /assets/ with immutable cache (1 year)"
aws s3 sync dist/assets/ "s3://${BUCKET}/assets/" \
    --region "${REGION}" \
    --delete \
    --cache-control "public, max-age=31536000, immutable"

# Images: 1-day cache. If you change an image, run a CloudFront invalidation.
echo "==> Syncing /images/ with 1-day cache"
aws s3 sync dist/images/ "s3://${BUCKET}/images/" \
    --region "${REGION}" \
    --delete \
    --cache-control "public, max-age=86400"

# HTML and other root files: no cache so edits show up immediately.
echo "==> Syncing HTML and root files with no cache"
aws s3 sync dist/ "s3://${BUCKET}/" \
    --region "${REGION}" \
    --delete \
    --exclude "assets/*" \
    --exclude "images/*" \
    --cache-control "public, max-age=0, must-revalidate"

echo "==> Invalidating CloudFront cache"
aws cloudfront create-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --paths "/*" \
    --no-cli-pager \
    --query 'Invalidation.{Id:Id,Status:Status}' \
    --output table

echo "==> Deploy complete"
echo "    s3://${BUCKET}"
echo "    CloudFront: ${DISTRIBUTION_ID}"
