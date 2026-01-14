#!/bin/bash

# Universal Quality Roofing - AWS OIDC Deployment Setup Script
# This script helps configure GitHub secrets for AWS deployment using IAM Role ARN

echo "🏗️  Universal Quality Roofing - AWS OIDC Deployment Setup"
echo "=========================================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📦 Install it from: https://cli.github.com/"
    echo ""
    echo "Or use Homebrew: brew install gh"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 Please authenticate with GitHub first:"
    gh auth login
fi

echo "✅ GitHub CLI is ready"
echo ""

echo "📋 This script will help you configure GitHub secrets for AWS OIDC deployment"
echo ""
echo "⚠️  IMPORTANT: You must first set up AWS IAM Role with OIDC"
echo "   See AWS-OIDC-SETUP.md for detailed instructions"
echo ""

read -p "Have you completed the AWS OIDC setup? (y/n): " SETUP_COMPLETE

if [ "$SETUP_COMPLETE" != "y" ]; then
    echo ""
    echo "📚 Please complete the AWS OIDC setup first:"
    echo "   1. Create OIDC Identity Provider in AWS"
    echo "   2. Create IAM Role with trust policy"
    echo "   3. Attach permissions policy to role"
    echo "   4. Get the Role ARN"
    echo ""
    echo "See AWS-OIDC-SETUP.md for step-by-step instructions"
    exit 0
fi

echo ""
echo "📝 Please enter your AWS configuration:"
echo ""

# Get AWS Role ARN
read -p "AWS IAM Role ARN (e.g., arn:aws:iam::123456789012:role/GitHubActionsDeployRole): " AWS_ROLE_ARN

# Validate ARN format
if [[ ! $AWS_ROLE_ARN =~ ^arn:aws:iam::[0-9]{12}:role/.+ ]]; then
    echo "❌ Invalid ARN format"
    echo "Expected format: arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME"
    exit 1
fi

echo ""

# Get AWS Region
read -p "AWS Region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

# Validate region format
if [[ ! $AWS_REGION =~ ^[a-z]{2}-[a-z]+-[0-9]{1}$ ]]; then
    echo "⚠️  Warning: Region format may be invalid"
    echo "Expected format: us-east-1, us-west-2, etc."
    read -p "Continue anyway? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        exit 1
    fi
fi

echo ""

# Optional CloudFront
read -p "CloudFront Distribution ID (optional, press Enter to skip): " CLOUDFRONT_ID
echo ""

# Confirm before setting secrets
echo "🔍 Review your configuration:"
echo "   AWS Role ARN: $AWS_ROLE_ARN"
echo "   AWS Region: $AWS_REGION"
if [ ! -z "$CLOUDFRONT_ID" ]; then
    echo "   CloudFront ID: $CLOUDFRONT_ID"
fi
echo "   S3 Bucket: dev101-demo"
echo "   Authentication: OIDC (OpenID Connect)"
echo ""

read -p "❓ Set these secrets in GitHub? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Setup cancelled"
    exit 0
fi

# Set GitHub secrets
echo ""
echo "⚙️  Setting GitHub secrets..."

gh secret set AWS_ROLE_ARN -b"$AWS_ROLE_ARN"
gh secret set AWS_REGION -b"$AWS_REGION"

if [ ! -z "$CLOUDFRONT_ID" ]; then
    gh secret set CLOUDFRONT_DISTRIBUTION_ID -b"$CLOUDFRONT_ID"
fi

echo ""
echo "✅ GitHub secrets configured successfully!"
echo ""
echo "📋 Configuration Summary:"
echo "   ✓ AWS_ROLE_ARN secret set"
echo "   ✓ AWS_REGION secret set ($AWS_REGION)"
if [ ! -z "$CLOUDFRONT_ID" ]; then
    echo "   ✓ CLOUDFRONT_DISTRIBUTION_ID secret set"
fi
echo ""
echo "🔐 Security Benefits:"
echo "   ✓ No long-lived credentials stored"
echo "   ✓ Temporary AWS credentials via OIDC"
echo "   ✓ Better audit trail in CloudTrail"
echo ""
echo "📋 Next steps:"
echo "   1. Verify your S3 bucket 'dev101-demo' is configured for static hosting"
echo "   2. Ensure bucket policy allows public read access"
echo "   3. Push to main branch to trigger deployment"
echo "   4. Monitor deployment in GitHub Actions tab"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - AWS-OIDC-SETUP.md (AWS configuration)"
echo "   - DEPLOYMENT.md (deployment guide)"
echo "   - QUICKSTART.md (quick reference)"
echo ""
echo "🚀 Happy deploying!"
