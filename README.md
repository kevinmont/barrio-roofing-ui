# Universal Quality Roofing LLC

![Deploy to AWS S3](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml/badge.svg)

Professional roofing, construction, and remodeling services website built with Next.js.

## 🏗️ Features

- **Modern Design**: Premium, responsive UI with Tailwind CSS
- **Service Pages**: Roofing, Construction, and Remodeling sections
- **Quote System**: Multi-step estimate form
- **Static Export**: Optimized for AWS S3 hosting
- **Automated Deployment**: GitHub Actions CI/CD pipeline

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Test static export locally
npx serve out
```

## 📦 Deployment

This project is configured for automatic deployment to AWS S3 using IAM Role ARN with OIDC.

### Quick Setup

1. **Configure AWS OIDC** (one-time setup):
   - See [AWS-OIDC-SETUP.md](./AWS-OIDC-SETUP.md) for detailed instructions
   
2. **Set GitHub Secret**:
   ```bash
   ./setup-deployment.sh
   ```

3. **Deploy**:
   ```bash
   git push origin main
   ```

### Documentation

- **OIDC Setup**: See [AWS-OIDC-SETUP.md](./AWS-OIDC-SETUP.md)
- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)
- **Full Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Deployment**: AWS S3 + GitHub Actions
- **Hosting**: Static Export

## 📁 Project Structure

```
barrio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Homepage
│   │   ├── services/          # Services page
│   │   └── estimate/          # Quote form
│   └── components/            # React components
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       └── Footer.tsx
├── next.config.ts             # Next.js configuration
└── tailwind.config.ts         # Tailwind configuration
```

## 🌐 Pages

- **Home** (`/`) - Hero section with service overview
- **Services** (`/services`) - Roofing, Construction, Remodeling
- **Estimate** (`/estimate`) - Multi-step quote form

## 📱 Contact

- **Phone**: [206-710-6754](tel:+12067106754)
- **Email**: universalqualityroofingllc@hotmail.com
- **Facebook**: [Universal Quality Roofing](https://facebook.com/profile.php?id=100091521892847)
- **TikTok**: [@universalqualityroofing](https://tiktok.com/@universalqualityroofing)

## 📄 License

© 2026 Universal Quality Roofing LLC. All rights reserved.

---

**Built with ❤️ using Next.js and deployed to AWS S3**
