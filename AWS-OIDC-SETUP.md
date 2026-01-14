# AWS IAM Role Setup for GitHub Actions OIDC

This guide explains how to set up AWS IAM Role with OIDC (OpenID Connect) for secure GitHub Actions authentication.

## 🔐 Why Use IAM Role ARN with OIDC?

**Benefits over Access Keys:**
- ✅ **More Secure**: No long-lived credentials stored in GitHub
- ✅ **Temporary Credentials**: AWS provides short-lived tokens
- ✅ **Better Auditing**: Clear identity in CloudTrail logs
- ✅ **Automatic Rotation**: No manual key rotation needed
- ✅ **Least Privilege**: Fine-grained permissions per repository

## 📋 Setup Steps

### Step 1: Create OIDC Identity Provider in AWS

1. **Open AWS IAM Console**
   - Go to: https://console.aws.amazon.com/iam/

2. **Navigate to Identity Providers**
   - Click "Identity providers" in the left menu
   - Click "Add provider"

3. **Configure Provider**
   - Provider type: `OpenID Connect`
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
   - Click "Add provider"

**Using AWS CLI:**
```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### Step 2: Create IAM Role

1. **Create Trust Policy**

Create a file `trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/YOUR_REPO_NAME:*"
        }
      }
    }
  ]
}
```

**Replace:**
- `YOUR_ACCOUNT_ID` - Your AWS account ID (12 digits)
- `YOUR_GITHUB_USERNAME` - Your GitHub username or organization
- `YOUR_REPO_NAME` - Your repository name (e.g., `barrio`)

2. **Create the Role**

```bash
aws iam create-role \
  --role-name GitHubActionsDeployRole \
  --assume-role-policy-document file://trust-policy.json \
  --description "Role for GitHub Actions to deploy to S3"
```

### Step 3: Attach Permissions Policy

1. **Create Permissions Policy**

Create a file `permissions-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketAccess",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::dev101-demo",
        "arn:aws:s3:::dev101-demo/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

2. **Create and Attach Policy**

```bash
# Create the policy
aws iam create-policy \
  --policy-name GitHubActionsS3DeployPolicy \
  --policy-document file://permissions-policy.json

# Attach to role
aws iam attach-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsS3DeployPolicy
```

### Step 4: Get the Role ARN

```bash
aws iam get-role --role-name GitHubActionsDeployRole --query 'Role.Arn' --output text
```

The output will look like:
```
arn:aws:iam::123456789012:role/GitHubActionsDeployRole
```

### Step 5: Add Secrets to GitHub

1. **Go to GitHub Repository**
   - Navigate to: `Settings > Secrets and variables > Actions`

2. **Add Required Secrets**
   
   **AWS_ROLE_ARN**
   - Click "New repository secret"
   - Name: `AWS_ROLE_ARN`
   - Value: `arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole`
   - Click "Add secret"
   
   **AWS_REGION**
   - Click "New repository secret"
   - Name: `AWS_REGION`
   - Value: Your AWS region (e.g., `us-east-1`, `us-west-2`)
   - Click "Add secret"

3. **Optional: Add CloudFront Distribution ID**
   - Name: `CLOUDFRONT_DISTRIBUTION_ID`
   - Value: Your CloudFront distribution ID (e.g., `E1234ABCD5678`)

## 🧪 Testing the Setup

### Test Locally (Optional)

You can test the role assumption locally:

```bash
# Requires AWS CLI v2
aws sts assume-role-with-web-identity \
  --role-arn arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole \
  --role-session-name test-session \
  --web-identity-token $(curl -H "Authorization: bearer $GITHUB_TOKEN" \
    https://token.actions.githubusercontent.com/.well-known/openid-configuration)
```

### Test via GitHub Actions

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Test OIDC deployment"
   git push origin main
   ```

2. **Check GitHub Actions**
   - Go to "Actions" tab
   - Watch the workflow run
   - Verify authentication step succeeds

## 🔍 Verification Checklist

- [ ] OIDC provider created in AWS IAM
- [ ] Trust policy correctly references your GitHub repo
- [ ] IAM role created with trust policy
- [ ] Permissions policy attached to role
- [ ] Role ARN copied correctly
- [ ] GitHub secret `AWS_ROLE_ARN` added
- [ ] GitHub Actions workflow updated
- [ ] Test deployment succeeds

## 🐛 Troubleshooting

### Error: "Not authorized to perform sts:AssumeRoleWithWebIdentity"

**Cause**: Trust policy doesn't match your repository

**Fix**: Verify trust policy has correct:
- GitHub username/organization
- Repository name
- OIDC provider ARN

### Error: "Access Denied" during S3 sync

**Cause**: Insufficient permissions in role policy

**Fix**: Verify permissions policy includes:
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:ListBucket`

### Error: "OIDC provider not found"

**Cause**: OIDC provider not created or wrong ARN

**Fix**: 
```bash
# List OIDC providers
aws iam list-open-id-connect-providers

# Verify provider exists
```

## 📊 CloudTrail Monitoring

View deployment activity in CloudTrail:

```bash
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=Username,AttributeValue=GitHubActionsDeployRole \
  --max-results 10
```

## 🔒 Security Best Practices

1. **Restrict Repository Access**
   ```json
   "StringLike": {
     "token.actions.githubusercontent.com:sub": "repo:YOUR_ORG/YOUR_REPO:ref:refs/heads/main"
   }
   ```

2. **Use Least Privilege**
   - Only grant necessary S3 permissions
   - Limit to specific bucket

3. **Enable CloudTrail**
   - Monitor all API calls
   - Set up alerts for suspicious activity

4. **Regular Audits**
   - Review role permissions quarterly
   - Check CloudTrail logs

## 📝 Complete Example

### Trust Policy (trust-policy.json)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:yourusername/barrio:*"
        }
      }
    }
  ]
}
```

### GitHub Secret
```
Name: AWS_ROLE_ARN
Value: arn:aws:iam::123456789012:role/GitHubActionsDeployRole
```

## 🆘 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review CloudTrail events
3. Verify IAM role trust policy
4. Test permissions with AWS CLI

## 📚 Additional Resources

- [AWS OIDC Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [AWS Configure Credentials Action](https://github.com/aws-actions/configure-aws-credentials)

---

**Setup Date**: January 2026
**Role Name**: GitHubActionsDeployRole
**S3 Bucket**: dev101-demo
