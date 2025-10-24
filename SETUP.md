# 🚀 Linko Setup Guide

Welcome to Linko! Follow these steps to get your Web3 identity page up and running.

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ Node.js 18+ installed
- ✅ A code editor (VS Code recommended)
- ✅ A wallet (MetaMask, Coinbase Wallet, etc.)

## 🔑 Step 1: Get Your API Keys

### 1.1 Alchemy API Key (Required)
1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up or log in
3. Click "Create New App"
4. Select "Base" as the chain
5. Copy your API key

### 1.2 WalletConnect Project ID (Required)
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign in with GitHub
3. Click "Create New Project"
4. Name it "Linko" or anything you like
5. Copy your Project ID

### 1.3 Web3.Storage Token (Optional)
1. Go to [Web3.Storage](https://web3.storage/)
2. Sign up with email or GitHub
3. Go to "Account" → "Create API Token"
4. Copy your token

## ⚙️ Step 2: Configure Environment Variables

1. Open the file `.env.local` in the root directory
2. Add your API keys:

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3storage_token_here
```

3. Save the file

## 🎨 Step 3: Run the Development Server

Open your terminal and run:

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

## 🎯 Step 4: Test Your Setup

1. Open your browser to `http://localhost:3000`
2. Click "Connect Wallet"
3. Select your wallet and connect
4. Click "Edit Profile" to customize your page
5. Add your bio, links, and Spotify embed

## 🎵 Step 5: Add Spotify Music (Optional)

1. Open [Spotify Web Player](https://open.spotify.com/)
2. Find the track/playlist you want to embed
3. Click "..." → Share → Embed track
4. Copy the embed URL (should start with `https://open.spotify.com/embed/`)
5. Paste it in your profile editor's Spotify field

## 🌐 Step 6: Deploy to Vercel

When you're ready to deploy:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your GitHub repository
5. Add your environment variables in Vercel dashboard
6. Click "Deploy"

Your Linko page will be live! 🎉

## 🛠️ Troubleshooting

### Wallet won't connect?
- Make sure you have a wallet extension installed
- Try refreshing the page
- Check that you're on a supported network (Base or Base Sepolia)

### NFTs not showing?
- Make sure you have your Alchemy API key set
- NFTs only show if you own them on Base network
- It may take a moment to load

### Profile not saving?
- Check browser console for errors
- Make sure localStorage is enabled
- Try clearing your browser cache

## 📚 Next Steps

- Customize your theme in `tailwind.config.ts`
- Add more DApps in `components/VerifiedDApps.tsx`
- Implement IPFS storage for profile persistence
- Add your own custom components

## 🤝 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Join our community Discord (coming soon!)

---

**Happy building! 🚀**

Powered by Base ⚡
