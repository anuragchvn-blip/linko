# Linko 🔗

> Your minimal Web3 identity page - Inspired by Linktree and LinkedIn, powered by Base

A clean, one-page Web3 bio link that connects to your wallet and automatically lists your verified DApps, ENS name, Base profile, and NFT badges.

## ✨ Features

- 🔐 **Wallet Connection** - Connect via RainbowKit with support for all major wallets
- ✅ **ENS Integration** - Displays your ENS name and avatar with verification badge
- 🎯 **Verified DApps** - Automatically shows your verified Base interactions
- 🎨 **NFT Badges** - Display your favorite NFTs as profile badges
- 🎵 **Spotify Embed** - Add music to your profile page
- 🔗 **Custom Links** - Add all your social and Web3 profiles
- 💾 **IPFS Ready** - Profile data prepared for IPFS storage
- ⚡ **Powered by Base** - Built on Base blockchain

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Wallet**: wagmi + RainbowKit
- **Blockchain**: Base (Alchemy SDK)
- **Storage**: IPFS via Web3.Storage
- **ENS**: ENS name & avatar resolution
- **Styling**: TailwindCSS + Framer Motion
- **Typography**: Inter & Satoshi fonts
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com))
- Alchemy API Key ([Get one here](https://www.alchemy.com))
- (Optional) Web3.Storage token for IPFS ([Get one here](https://web3.storage))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/linko.git
   cd linko
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   copy .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

Linko uses a clean, LinkedIn-inspired design language:

- **Primary Color**: `#0A66C2` (LinkedIn Blue)
- **Secondary**: `#E6F0FA` (Soft background)
- **Text**: `#1A1A1A`
- **Accent**: `#4B9CE2` (Hover states)

### UI Principles
- Light mode first
- Center-aligned column layout
- Rounded link cards with subtle shadows
- Fade-in animations only (no flashy effects)
- Smooth hover lifts

## 📱 Usage

### 1. Connect Your Wallet
Click "Connect Wallet" and select your preferred wallet (MetaMask, Coinbase Wallet, etc.)

### 2. Edit Your Profile
- Click "Edit Profile" to customize your bio
- Add links with custom icons and titles
- Add your Spotify embed URL
- Save your changes

### 3. Automatic Features
Once connected, Linko automatically:
- ✅ Resolves your ENS name and avatar
- ✅ Displays verified DApp interactions on Base
- ✅ Loads your NFT collection as badges

### 4. Share Your Page
Your Linko page is accessible at:
- `linko.xyz/{your-ens-name}` (if you have ENS)
- `linko.xyz/{wallet-address}` (wallet short address)

## 🔧 Customization

### Adding Custom Links
```typescript
{
  title: "My Twitter",
  url: "https://twitter.com/username",
  icon: "🐦"
}
```

### Adding Spotify Music
1. Go to Spotify and find your track/playlist
2. Click Share → Embed track
3. Copy the embed URL
4. Paste it in your profile editor

### Styling
Edit `tailwind.config.ts` to customize colors and fonts:
```typescript
colors: {
  primary: '#0A66C2',
  secondary: '#E6F0FA',
  text: '#1A1A1A',
  accent: '#4B9CE2',
}
```

## 🛠️ Project Structure

```
linko/
├── app/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   ├── providers.tsx     # Web3 providers
│   └── globals.css       # Global styles
├── components/
│   ├── ProfilePage.tsx   # Main profile component
│   ├── ProfileEditor.tsx # Profile editing form
│   ├── LinkCard.tsx      # Individual link card
│   ├── SpotifyEmbed.tsx  # Spotify player
│   ├── VerifiedDApps.tsx # DApp verification
│   └── NFTBadges.tsx     # NFT display
├── public/              # Static assets
└── README.md
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Base](https://base.org)
- Powered by [RainbowKit](https://www.rainbowkit.com/)
- Icons from emoji
- Inspired by Linktree and LinkedIn

## 📧 Support

For support, please open an issue or reach out on Twitter.

---

**Powered by Base ⚡**

Made with ❤️ for the Web3 community
