# AWS S3 Deployment Checklist

Use this checklist to ensure your deployment is properly configured.

## ✅ Pre-Deployment Checklist

### AWS Configuration

- [ ] S3 bucket `dev101-demo` exists
- [ ] Static website hosting enabled on bucket
- [ ] Bucket policy allows public read access
- [ ] IAM user created with S3 permissions
- [ ] AWS Access Key ID generated
- [ ] AWS Secret Access Key generated
- [ ] (Optional) CloudFront distribution created
- [ ] (Optional) Custom domain configured

### GitHub Configuration

- [ ] Repository created on GitHub
- [ ] Local code pushed to GitHub
- [ ] GitHub secret `AWS_ACCESS_KEY_ID` added
- [ ] GitHub secret `AWS_SECRET_ACCESS_KEY` added
- [ ] (Optional) GitHub secret `CLOUDFRONT_DISTRIBUTION_ID` added

### Code Configuration

- [ ] `next.config.ts` has `output: 'export'`
- [ ] Build completes successfully (`npm run build`)
- [ ] `out/` directory contains static files
- [ ] All pages render correctly in production build
- [ ] Images load properly (unoptimized mode)
- [ ] No server-side features used

## 🚀 Deployment Steps

### First-Time Setup

1. [ ] Run `./setup-deployment.sh` to configure GitHub secrets
2. [ ] Verify S3 bucket configuration
3. [ ] Test build locally: `npm run build`
4. [ ] Commit and push to main branch
5. [ ] Monitor GitHub Actions workflow
6. [ ] Verify deployment in S3 bucket
7. [ ] Test website at S3 URL

### Subsequent Deployments

1. [ ] Make code changes
2. [ ] Test locally: `npm run dev`
3. [ ] Commit changes
4. [ ] Push to main branch
5. [ ] Verify deployment in GitHub Actions

## 🧪 Testing Checklist

### Local Testing

- [ ] Development server runs: `npm run dev`
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Images display correctly
- [ ] Mobile responsive design works
- [ ] Production build succeeds: `npm run build`

### Production Testing

- [ ] Website loads at S3 URL
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Links work properly
- [ ] Forms function correctly
- [ ] Mobile view works
- [ ] Performance is acceptable

## 🔍 Verification Steps

### After Deployment

```bash
# Check S3 bucket contents
aws s3 ls s3://dev101-demo/

# Verify index.html exists
aws s3 ls s3://dev101-demo/index.html

# Test website accessibility
curl -I http://dev101-demo.s3-website-us-east-1.amazonaws.com
```

### GitHub Actions

- [ ] Workflow runs successfully
- [ ] Build step completes
- [ ] Deploy step completes
- [ ] No errors in logs

## 🐛 Troubleshooting

### Build Fails

- [ ] Check Node.js version (should be 20+)
- [ ] Clear cache: `rm -rf .next out`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check for TypeScript errors
- [ ] Verify all imports are correct

### Deployment Fails

- [ ] Verify AWS credentials are correct
- [ ] Check IAM permissions
- [ ] Ensure S3 bucket exists
- [ ] Check GitHub Actions logs
- [ ] Verify bucket name in workflow file

### Website Issues

- [ ] Check S3 bucket policy
- [ ] Verify static hosting is enabled
- [ ] Check CloudFront configuration (if used)
- [ ] Verify DNS settings (if custom domain)
- [ ] Check browser console for errors

## 📊 Performance Optimization

- [ ] Enable gzip compression on S3
- [ ] Set proper cache headers
- [ ] Use CloudFront for CDN
- [ ] Optimize images before upload
- [ ] Minify CSS/JS (done by Next.js)

## 🔒 Security Checklist

- [ ] AWS credentials stored as GitHub secrets (not in code)
- [ ] S3 bucket policy restricts to read-only
- [ ] CloudFront HTTPS enabled (if used)
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly configured

## 📝 Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] Team members know how to deploy
- [ ] Rollback procedure documented

## 🎉 Launch Checklist

### Before Going Live

- [ ] All content reviewed and approved
- [ ] Contact information verified
- [ ] Social media links tested
- [ ] Phone numbers correct
- [ ] Email addresses working
- [ ] Forms tested end-to-end
- [ ] SEO meta tags added
- [ ] Analytics configured (if needed)
- [ ] Favicon uploaded
- [ ] 404 page customized

### Post-Launch

- [ ] Monitor GitHub Actions for issues
- [ ] Check website analytics
- [ ] Test all forms
- [ ] Verify email delivery
- [ ] Monitor AWS costs
- [ ] Set up alerts for failures

## 📞 Support Contacts

- **Technical Issues**: Check GitHub Actions logs
- **AWS Issues**: AWS Support Console
- **Business Contact**: universalqualityroofingllc@hotmail.com
- **Phone**: 206-710-6754

---

**Last Updated**: January 2026
**Deployment Target**: s3://dev101-demo/
**Framework**: Next.js 16
