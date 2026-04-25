# Deploy configuration template.
# Copy this file to deploy.config.local.sh and fill in your values.
# deploy.config.local.sh is gitignored.

# Target S3 bucket (origin for CloudFront).
BUCKET="your-s3-bucket-name"

# AWS region the bucket lives in.
REGION="us-east-1"

# CloudFront distribution ID (the 13-character one in the AWS console).
DISTRIBUTION_ID="EXAMPLE12345"
