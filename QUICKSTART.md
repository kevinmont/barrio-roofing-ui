# AWS S3 Deployment - Quick Start Guide

## ✅ What's Been Configured

Your Next.js application is now ready for AWS S3 deployment with GitHub Actions!

### Files Created/Modified:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow
2. **`next.config.ts`** - Updated with static export configuration
3. **`DEPLOYMENT.md`** - Comprehensive deployment documentation
4. **`setup-deployment.sh`** - Automated setup script

## 🚀 Quick Setup (3 Steps)

### Step 1: Configure AWS S3 Bucket

```bash
# 1. Create S3 bucket (if not exists)
aws s3 mb s3://dev101-demo --region us-east-1

# 2. Enable static website hosting
aws s3 website s3://dev101-demo --index-document index.html

# 3. Set bucket policy for public access
# (See DEPLOYMENT.md for the policy JSON)
```

### Step 2: Set GitHub Secrets

**Prerequisites**: Complete AWS OIDC setup first (see `AWS-OIDC-SETUP.md`)

**Option A: Use the automated script**
```bash
./setup-deployment.sh
```

**Option B: Manual setup**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Add these secrets:
   - `AWS_ROLE_ARN` - Your IAM Role ARN (e.g., `arn:aws:iam::123456789012:role/GitHubActionsDeployRole`)
   - `AWS_REGION` - Your AWS region (e.g., `us-east-1`, `us-west-2`)
   - `CLOUDFRONT_DISTRIBUTION_ID` - (Optional) CloudFront distribution ID

**Why ARN instead of Access Keys?**
- ✅ More secure (no long-lived credentials)
- ✅ Temporary credentials via OIDC
- ✅ Better audit trail
- ✅ Automatic credential rotation

### Step 3: Deploy!

```bash
# Push to main branch
git add .
git commit -m "Configure AWS deployment"
git push origin main
```

The GitHub Action will automatically:
- ✅ Build your Next.js app
- ✅ Export static files
- ✅ Upload to S3
- ✅ Invalidate CloudFront (if configured)

## 📊 Deployment Status

Check deployment status:
- GitHub: `Actions` tab in your repository
- AWS: S3 bucket contents at `s3://dev101-demo/`

## 🌐 Access Your Site

After deployment:
- **S3 Website URL**: `http://dev101-demo.s3-website-us-east-1.amazonaws.com`
- **CloudFront URL**: (if configured)
- **Custom Domain**: (if configured)

## 🛠️ Local Testing

Test the build before deploying:

```bash
# Build and export
npm run build

# Serve locally
npx serve out

# Visit http://localhost:3000
```

## 📝 Important Notes

### Static Export Limitations
- No server-side rendering (SSR)
- No API routes
- No dynamic routes without `generateStaticParams`
- Images are unoptimized

### What Works
- ✅ All static pages
- ✅ Client-side navigation
- ✅ Client-side data fetching
- ✅ Static assets (images, fonts, etc.)

## 🔧 Troubleshooting

### Build fails locally
```bash
# Clear cache and rebuild
rm -rf .next out
npm run build
```

### Deployment fails
1. Check GitHub Actions logs
2. Verify AWS credentials
3. Check IAM permissions
4. Ensure S3 bucket exists

### Images not loading
- Use standard `<img>` tags
- Or Next.js Image with `unoptimized: true`

## 📚 Additional Resources

- **Full Documentation**: See `DEPLOYMENT.md`
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **AWS S3 Static Hosting**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html

## 🆘 Need Help?

Contact:
- Email: universalqualityroofingllc@hotmail.com
- Phone: 206-710-6754

---

**Happy Deploying! 🎉**
