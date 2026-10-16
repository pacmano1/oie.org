#!/usr/bin/env bash
# One-time setup: serve the site's 404 page for paths that do not exist.
#
# The S3 origin is private (origin access control without s3:ListBucket),
# so S3 answers a missing key with 403, not 404. Both codes are mapped to
# /404.html with a 404 status. Requests blocked by the WAF also return 403,
# so they get the same page.
#
# Safe to re-run: the error responses are replaced, not appended.

set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f deploy.config.local.sh ]]; then
    echo "ERROR: deploy.config.local.sh not found."
    echo "       Copy deploy.config.example.sh to deploy.config.local.sh and fill in your values."
    exit 1
fi
# shellcheck source=deploy.config.example.sh
source deploy.config.local.sh

: "${DISTRIBUTION_ID:?DISTRIBUTION_ID must be set in deploy.config.local.sh}"

if ! command -v jq &> /dev/null; then
    echo "ERROR: jq is required for the distribution-config edit."
    exit 1
fi

echo "==> Reading distribution ${DISTRIBUTION_ID}"
RESPONSE=$(aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" --output json)
DIST_ETAG=$(jq -r '.ETag' <<< "${RESPONSE}")

UPDATED_CONFIG=$(jq '
  .DistributionConfig
  | .CustomErrorResponses = {
      Quantity: 2,
      Items: [
        { ErrorCode: 403, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 60 },
        { ErrorCode: 404, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 60 }
      ]
    }
' <<< "${RESPONSE}")

echo "==> Mapping 403 and 404 to /404.html"
aws cloudfront update-distribution \
    --id "${DISTRIBUTION_ID}" \
    --if-match "${DIST_ETAG}" \
    --distribution-config "${UPDATED_CONFIG}" \
    --no-cli-pager > /dev/null

echo "==> Done."
echo "    Distribution changes take 5-15 minutes to deploy to all edge locations."
echo "    You can check status with:"
echo "      aws cloudfront get-distribution --id ${DISTRIBUTION_ID} --query 'Distribution.Status'"
