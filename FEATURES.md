# 🎯 Linko Feature Guide

Complete guide to all features and functionality in Linko.

## 🔐 Wallet Connection

### Supported Wallets
- MetaMask
- Coinbase Wallet
- WalletConnect
- Rainbow Wallet
- Trust Wallet
- And more via RainbowKit

### How to Connect
1. Click "Connect Wallet" button
2. Choose your preferred wallet
3. Approve the connection request
4. Your profile loads automatically

### Security
- Linko never asks for private keys
- All transactions require your approval
- Connection is secure via RainbowKit
- No data is stored on servers

## ✅ ENS Integration

### What is ENS?
ENS (Ethereum Name Service) is like a domain name for your wallet address.

### Features
- Automatically resolves your ENS name
- Displays your ENS avatar
- Shows verification checkmark
- Falls back to wallet address if no ENS

### Getting an ENS Name
1. Visit [ens.domains](https://ens.domains)
2. Search for available names
3. Register on Ethereum mainnet
4. Set your avatar (optional)

## 🎨 Profile Customization

### Bio Section
- Add a short description about yourself
- Max recommended: 2-3 sentences
- Supports emoji 🎉
- Updates instantly

### Custom Links
Each link has:
- **Icon**: Any emoji or text (🐦, 🎮, etc.)
- **Title**: Display name for the link
- **URL**: Where it points to

Popular link ideas:
- Twitter/X profile
- GitHub repositories
- Discord server
- Personal website
- Farcaster profile
- Lens Protocol profile
- Mirror blog

### Adding Links
1. Click "Edit Profile"
2. Click "+ Add Link"
3. Fill in icon, title, and URL
4. Click "Save Profile"

## 🎵 Spotify Integration

### How to Add Music
1. Go to [Spotify Web Player](https://open.spotify.com)
2. Find your favorite track or playlist
3. Click the "..." menu
4. Select "Share" → "Embed track"
5. Copy the embed URL
6. Paste in Profile Editor → Spotify Embed URL field
7. Save your profile

### What Works
- Individual tracks
- Albums
- Playlists
- Podcasts

### Display
- Shows album art
- Playable player
- 30-second preview for free users
- Full tracks for Spotify Premium users

## ✅ Verified DApps

### Auto-Detection
Linko automatically shows DApps you've interacted with on Base:
- Uniswap
- Aerodrome
- Moonwell
- BaseSwap
- And more!

### How It Works
1. Connects to Base blockchain via Alchemy
2. Checks your transaction history
3. Identifies verified DApp interactions
4. Displays them with badges

### Status Indicators
- **Active**: Recent interactions
- **Verified**: Official DApp confirmed

## 🎨 NFT Badges

### What Are NFT Badges?
Small circular displays of your NFT collection on Base.

### Features
- Shows up to 4 NFTs
- Displays as profile badges
- Hover for NFT name
- Click to view (coming soon)

### Requirements
- NFTs must be on Base network
- Alchemy API key configured
- Wallet connected

### Not Showing?
- Make sure you own NFTs on Base
- Check Alchemy API key is valid
- Try refreshing the page

## 💾 Profile Storage

### Current: Browser Storage
Your profile is saved in browser localStorage:
- ✅ Fast and instant
- ✅ No costs
- ❌ Only available on same browser/device

### Future: IPFS Storage
Coming soon - permanent, decentralized storage:
- ✅ Accessible from any device
- ✅ Permanent and censorship-resistant
- ✅ Shareable URL

### Exporting Profile
Your profile data is stored as JSON:
```json
{
  "bio": "Your bio here",
  "links": [...],
  "spotifyEmbed": "URL"
}
```

## 🔗 Sharing Your Profile

### Profile URL Formats
- With ENS: `linko.xyz/yourname.eth`
- Without ENS: `linko.xyz/0x1234...5678`

### Tips for Sharing
- Add to Twitter bio
- Share on Discord
- Include in email signature
- Pin in Telegram
- Add to Farcaster profile

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#0A66C2',    // Main color
  secondary: '#E6F0FA',  // Background
  text: '#1A1A1A',      // Text
  accent: '#4B9CE2',    // Hover
}
```

### Adding Custom DApps
Edit `components/VerifiedDApps.tsx`:
```typescript
{
  name: 'My DApp',
  address: '0x...',
  icon: '🚀',
  url: 'https://...',
}
```

### Fonts
Change in `app/layout.tsx`:
- Inter (default)
- Satoshi (accent)
- Add your own Google Font

## 🚀 Advanced Features

### IPFS Upload (Coming Soon)
```typescript
import { ipfsService } from '@/lib/ipfs';

const cid = await ipfsService.uploadProfile(profileData);
```

### ENS Resolution
Built-in ENS name and avatar fetching via wagmi hooks.

### Base Integration
Direct connection to Base blockchain for:
- Transaction history
- NFT ownership
- DApp interactions

## 📱 Mobile Support

### Responsive Design
- Works on all screen sizes
- Mobile-first approach
- Touch-friendly interface

### Mobile Wallets
Supported via WalletConnect:
- MetaMask Mobile
- Coinbase Wallet
- Rainbow
- Trust Wallet

## 🔒 Privacy & Security

### What Linko Collects
- Nothing! All data stays in your browser
- No analytics
- No tracking
- No server storage

### Smart Contract Interactions
- Read-only by default
- No tokens required
- No hidden fees
- Transparent on Base

## 🆘 Troubleshooting

### Common Issues

**Wallet Won't Connect**
- Clear browser cache
- Try different wallet
- Disable other wallet extensions
- Refresh page

**ENS Not Showing**
- ENS must be on Ethereum mainnet
- Set reverse resolution
- Wait for cache refresh

**NFTs Not Loading**
- Verify Alchemy API key
- Check NFTs are on Base
- Wait ~30 seconds for load

**Links Not Saving**
- Check localStorage enabled
- Try incognito mode test
- Clear browser data

**Spotify Not Playing**
- Verify embed URL format
- Must include `/embed/` in URL
- Check track is available

## 💡 Tips & Best Practices

### Profile Optimization
- Keep bio concise and clear
- Use recognizable icons
- Order links by priority
- Update regularly

### Link Ideas
1. Primary social (Twitter)
2. Professional (LinkedIn, GitHub)
3. Web3 identity (ENS, Lens)
4. Content (Blog, YouTube)
5. Community (Discord, Telegram)

### Visual Appeal
- Choose relevant Spotify track
- Curate NFT collection
- Use clear, consistent icons
- Keep it simple

## 🔄 Updates & Roadmap

### Current Features
- ✅ Wallet connection
- ✅ ENS integration
- ✅ Profile editing
- ✅ Spotify embed
- ✅ NFT badges
- ✅ DApp verification

### Coming Soon
- 🔄 IPFS profile storage
- 🔄 Custom domains
- 🔄 Profile themes
- 🔄 Social sharing cards
- 🔄 Analytics (privacy-focused)
- 🔄 QR code generation

### Community Requests
Submit feature requests on GitHub!

---

**Need more help?** Check out:
- [README.md](README.md) - Main documentation
- [SETUP.md](SETUP.md) - Setup instructions
- [QUICKSTART.md](QUICKSTART.md) - Quick reference

Powered by Base ⚡
