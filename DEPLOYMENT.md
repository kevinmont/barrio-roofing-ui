# Universal Quality Roofing - Deployment Guide

## AWS S3 Deployment Setup

This project is configured to automatically deploy to AWS S3 using GitHub Actions.

### Prerequisites

1. **AWS Account** with S3 bucket: `dev101-demo`
2. **GitHub Repository** with the following secrets configured
3. **IAM User** with appropriate S3 permissions

### Required GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

#### Authentication Method: IAM Role ARN with OIDC (Recommended)

**Required Secrets:**
- `AWS_ROLE_ARN` - Your IAM Role ARN for OIDC authentication
  - Example: `arn:aws:iam::123456789012:role/GitHubActionsDeployRole`
  - **Setup Guide**: See `AWS-OIDC-SETUP.md` for complete instructions
- `AWS_REGION` - Your AWS region
  - Example: `us-east-1`, `us-west-2`, `eu-west-1`
  - Default: `us-east-1` (if not specified)

**Optional Secret:**
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID (if using CDN)

**Why OIDC?**
- ✅ **More Secure**: No long-lived credentials in GitHub
- ✅ **Temporary Tokens**: AWS provides short-lived credentials
- ✅ **Better Auditing**: Clear identity in CloudTrail
- ✅ **Auto Rotation**: No manual credential management

#### Alternative: Access Keys (Legacy - Not Recommended)

If you must use access keys instead of OIDC:
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key

**Note**: Access keys are less secure. Use OIDC whenever possible.

### AWS IAM Policy

Your IAM user needs the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::dev101-demo",
        "arn:aws:s3:::dev101-demo/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

### S3 Bucket Configuration

1. **Enable Static Website Hosting**:
   - Go to S3 bucket properties
   - Enable "Static website hosting"
   - Index document: `index.html`
   - Error document: `404.html` (optional)

2. **Bucket Policy** (for public access):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::dev101-demo/*"
    }
  ]
}
```

3. **CORS Configuration** (if needed):
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

### Deployment Process

#### Automatic Deployment
- Push to `main` branch triggers automatic deployment
- GitHub Actions will:
  1. Build the Next.js application
  2. Export static files to `out/` directory
  3. Sync files to S3 bucket
  4. Invalidate CloudFront cache (if configured)

#### Manual Deployment
You can trigger deployment manually:
1. Go to GitHub Actions tab
2. Select "Deploy to AWS S3" workflow
3. Click "Run workflow"

### Local Testing

Test the static export locally before deploying:

```bash
# Install dependencies
npm install

# Build and export
npm run build

# The static files will be in the 'out/' directory
# You can serve them locally with:
npx serve out
```

### Build Configuration

The project uses Next.js static export mode configured in `next.config.ts`:

```typescript
{
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}
```

### Troubleshooting

#### Build Fails
- Check that all dependencies are installed
- Ensure no dynamic routes without `generateStaticParams`
- Verify no server-side only features are used

#### Deployment Fails
- Verify AWS credentials are correct
- Check IAM permissions
- Ensure S3 bucket exists and is accessible

#### Images Not Loading
- Images are unoptimized for static export
- Use standard `<img>` tags or Next.js Image with `unoptimized: true`

### CloudFront Setup (Optional)

For better performance, set up CloudFront:

1. Create CloudFront distribution
2. Origin: Your S3 bucket website endpoint
3. Add distribution ID to GitHub secrets
4. Configure custom domain (optional)

### Custom Domain Setup

1. **Route 53** (or your DNS provider):
   - Create A record pointing to S3 or CloudFront
   
2. **SSL Certificate** (if using CloudFront):
   - Request certificate in ACM (us-east-1 region)
   - Add to CloudFront distribution

### Monitoring

- Check GitHub Actions tab for deployment status
- View S3 bucket metrics in AWS Console
- Monitor CloudFront metrics (if applicable)

### Support

For issues or questions:
- Email: universalqualityroofingllc@hotmail.com
- Phone: 206-710-6754

---

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static files
npm run build
```

Visit `http://localhost:3000` to view the application.
