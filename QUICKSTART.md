# Linko - Quick Start 🚀

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎯 First Time Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd linko
   npm install
   ```

2. **Get API Keys** (See SETUP.md for detailed instructions)
   - Alchemy API Key: https://www.alchemy.com/
   - WalletConnect Project ID: https://cloud.walletconnect.com/

3. **Configure Environment**
   - Edit `.env.local` file
   - Add your API keys

4. **Run the App**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## 🎨 Customization Quick Guide

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#0A66C2',    // Main brand color
  secondary: '#E6F0FA',  // Background
  text: '#1A1A1A',      // Text color
  accent: '#4B9CE2',    // Hover/accent
}
```

### Add Custom DApps
Edit `components/VerifiedDApps.tsx` and add to POPULAR_DAPPS array

### Modify Fonts
Edit `app/layout.tsx` to change the Google Font import

## 📁 Project Structure

```
linko/
├── app/                    # Next.js App Router
│   ├── [id]/              # Dynamic user profile pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Web3 providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ProfilePage.tsx    # Main profile view
│   ├── ProfileEditor.tsx  # Edit mode
│   ├── LinkCard.tsx       # Link display
│   ├── SpotifyEmbed.tsx   # Music player
│   ├── VerifiedDApps.tsx  # DApp badges
│   └── NFTBadges.tsx      # NFT display
├── lib/                   # Utilities
│   ├── ipfs.ts           # IPFS integration
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
└── public/               # Static assets
```

## 🔗 Important Links

- [Full Setup Guide](SETUP.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [README](README.md)

## 🆘 Quick Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies issues?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
npm run build
```

## 🎉 You're Ready!

Start building your Web3 identity page! Check SETUP.md for detailed instructions.

---
Powered by Base ⚡
