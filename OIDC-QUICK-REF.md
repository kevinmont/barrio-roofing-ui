# AWS OIDC Quick Reference

## 🎯 One-Page Setup Guide

### 1️⃣ Create OIDC Provider (One-time)

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 2️⃣ Create Trust Policy

**File: `trust-policy.json`**

```json
{
  "Version": "2012-10-17",
  "Statement": [{
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
        "token.actions.githubusercontent.com:sub": "repo:YOUR_USERNAME/barrio:*"
      }
    }
  }]
}
```

**Replace:**
- `YOUR_ACCOUNT_ID` → Your 12-digit AWS account ID
- `YOUR_USERNAME` → Your GitHub username

### 3️⃣ Create IAM Role

```bash
aws iam create-role \
  --role-name GitHubActionsDeployRole \
  --assume-role-policy-document file://trust-policy.json
```

### 4️⃣ Create Permissions Policy

**File: `permissions-policy.json`**

```json
{
  "Version": "2012-10-17",
  "Statement": [{
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
  }]
}
```

### 5️⃣ Attach Policy to Role

```bash
# Create policy
aws iam create-policy \
  --policy-name GitHubActionsS3DeployPolicy \
  --policy-document file://permissions-policy.json

# Attach to role
aws iam attach-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsS3DeployPolicy
```

### 6️⃣ Get Role ARN

```bash
aws iam get-role \
  --role-name GitHubActionsDeployRole \
  --query 'Role.Arn' \
  --output text
```

**Output:** `arn:aws:iam::123456789012:role/GitHubActionsDeployRole`

### 7️⃣ Add to GitHub

```bash
# Using GitHub CLI
gh secret set AWS_ROLE_ARN -b"arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole"
gh secret set AWS_REGION -b"us-east-1"

# Or manually:
# GitHub → Settings → Secrets → New secret
# 
# Secret 1:
# Name: AWS_ROLE_ARN
# Value: arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole
#
# Secret 2:
# Name: AWS_REGION
# Value: us-east-1 (or your preferred region)
```

### 8️⃣ Deploy!

```bash
git push origin main
```

---

## 🔍 Verification Commands

```bash
# List OIDC providers
aws iam list-open-id-connect-providers

# Get role details
aws iam get-role --role-name GitHubActionsDeployRole

# List attached policies
aws iam list-attached-role-policies --role-name GitHubActionsDeployRole

# Test S3 access (after assuming role)
aws s3 ls s3://dev101-demo/
```

---

## 🐛 Common Issues

| Error | Solution |
|-------|----------|
| "Not authorized to perform sts:AssumeRoleWithWebIdentity" | Check trust policy repo name |
| "OIDC provider not found" | Create OIDC provider first |
| "Access Denied" on S3 | Verify permissions policy |
| "Invalid ARN format" | Use format: `arn:aws:iam::ACCOUNT:role/NAME` |

---

## 📋 Checklist

- [ ] OIDC provider created
- [ ] Trust policy has correct repo name
- [ ] IAM role created
- [ ] Permissions policy attached
- [ ] Role ARN copied
- [ ] GitHub secret `AWS_ROLE_ARN` set
- [ ] GitHub secret `AWS_REGION` set
- [ ] Test deployment successful

---

**For detailed instructions, see: [AWS-OIDC-SETUP.md](./AWS-OIDC-SETUP.md)**
