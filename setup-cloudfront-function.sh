#!/usr/bin/env bash
# One-time setup: create + publish the CloudFront Function that rewrites
# trailing-slash URIs to index.html, and attach it to the distribution.
#
# Safe to re-run: if the function already exists, it is updated in place.

set -euo pipefail

FUNCTION_NAME="oie-trailing-slash-rewrite"
FUNCTION_FILE="cloudfront/rewrite.js"
COMMENT="Rewrite URIs ending in / or without an extension to /.../index.html"

cd "$(dirname "$0")"

if [[ ! -f "${FUNCTION_FILE}" ]]; then
    echo "ERROR: ${FUNCTION_FILE} not found."
    exit 1
fi

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
    echo "       Install with: brew install jq"
    exit 1
fi

# 1. Create the function (or update it if it already exists).
if aws cloudfront describe-function --name "${FUNCTION_NAME}" &> /dev/null; then
    echo "==> Updating existing function: ${FUNCTION_NAME}"
    FN_ETAG=$(aws cloudfront describe-function --name "${FUNCTION_NAME}" --query 'ETag' --output text)
    aws cloudfront update-function \
        --name "${FUNCTION_NAME}" \
        --if-match "${FN_ETAG}" \
        --function-config "Comment=${COMMENT},Runtime=cloudfront-js-2.0" \
        --function-code "fileb://${FUNCTION_FILE}" \
        --no-cli-pager > /dev/null
else
    echo "==> Creating function: ${FUNCTION_NAME}"
    aws cloudfront create-function \
        --name "${FUNCTION_NAME}" \
        --function-config "Comment=${COMMENT},Runtime=cloudfront-js-2.0" \
        --function-code "fileb://${FUNCTION_FILE}" \
        --no-cli-pager > /dev/null
fi

# 2. Publish the DEVELOPMENT stage to LIVE.
echo "==> Publishing function to LIVE stage"
FN_ETAG=$(aws cloudfront describe-function --name "${FUNCTION_NAME}" --query 'ETag' --output text)
FUNCTION_ARN=$(aws cloudfront publish-function \
    --name "${FUNCTION_NAME}" \
    --if-match "${FN_ETAG}" \
    --query 'FunctionSummary.FunctionMetadata.FunctionARN' \
    --output text)
echo "    ARN: ${FUNCTION_ARN}"

# 3. Attach the function to the distribution's default cache behavior
#    at the viewer-request event type.
echo "==> Attaching function to distribution ${DISTRIBUTION_ID}"
TMPDIR=$(mktemp -d)
trap 'rm -rf "${TMPDIR}"' EXIT

aws cloudfront get-distribution-config \
    --id "${DISTRIBUTION_ID}" \
    --output json > "${TMPDIR}/response.json"

DIST_ETAG=$(jq -r '.ETag' "${TMPDIR}/response.json")

jq --arg arn "${FUNCTION_ARN}" '
  .DistributionConfig
  | .DefaultCacheBehavior.FunctionAssociations = {
      Quantity: 1,
      Items: [{
        FunctionARN: $arn,
        EventType: "viewer-request"
      }]
    }
' "${TMPDIR}/response.json" > "${TMPDIR}/updated-config.json"

aws cloudfront update-distribution \
    --id "${DISTRIBUTION_ID}" \
    --if-match "${DIST_ETAG}" \
    --distribution-config "file://${TMPDIR}/updated-config.json" \
    --no-cli-pager > /dev/null

echo "==> Done."
echo "    Function ARN: ${FUNCTION_ARN}"
echo "    Distribution: ${DISTRIBUTION_ID}"
echo ""
echo "    Distribution changes take 5-15 minutes to deploy to all edge locations."
echo "    You can check status with:"
echo "      aws cloudfront get-distribution --id ${DISTRIBUTION_ID} --query 'Distribution.Status'"
