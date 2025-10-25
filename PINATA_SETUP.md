# Pinata Setup Guide

## Why Pinata?

Pinata is a reliable IPFS pinning service that ensures your files stay available on IPFS. It's free to start and much more reliable than public IPFS gateways.

## How It Works

1. **Your app uploads** → Profile data goes to Pinata via API
2. **Pinata stores** → File is pinned on IPFS network
3. **Pinata returns CID** → Content Identifier (e.g., `bafyreiabc123...`)
4. **Smart contract stores CID** → On Polygon blockchain
5. **Anyone can fetch** → Using the CID from any IPFS gateway

## Setup Steps

### 1. Create Pinata Account (Free)

1. Go to https://app.pinata.cloud/register
2. Sign up for a free account (1GB storage free)
3. Verify your email

### 2. Get API Key (JWT Token)

1. Go to https://app.pinata.cloud/developers/api-keys
2. Click **"New Key"**
3. Give it a name: `Linko IPFS`
4. Enable these permissions:
   - ✅ **pinFileToIPFS**
   - ✅ **pinJSONToIPFS**
5. Click **"Create Key"**
6. **Copy the JWT token** (starts with `eyJ...`)
   - ⚠️ **Save it immediately** - you can't see it again!

### 3. Add to Environment Variables

**Local Development (.env.local):**
```bash
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24...
```

**Vercel Production:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name:** `PINATA_JWT`
   - **Value:** Your JWT token
   - **Environment:** Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your app

## Testing

### Without Pinata JWT:
- ✅ App still works
- ⚠️ Uses simulated in-memory storage
- ❌ Data doesn't persist across server restarts
- ✅ Good for testing/development

### With Pinata JWT:
- ✅ App works with real IPFS
- ✅ Data persists permanently
- ✅ Accessible from any IPFS gateway
- ✅ Production-ready

## How to Test

1. **Add PINATA_JWT to .env.local**
2. **Restart dev server:** `npm run dev`
3. **Save a profile**
4. **Check console** - should see:
   ```
   Uploaded to Pinata: bafyrei...
   ```
5. **Verify on Pinata Dashboard:**
   - Go to https://app.pinata.cloud/pinmanager
   - See your uploaded `profile.json` file

## IPFS Gateways

Your files will be accessible via:
- `https://gateway.pinata.cloud/ipfs/{CID}`
- `https://ipfs.io/ipfs/{CID}`
- `https://cloudflare-ipfs.com/ipfs/{CID}`

The app automatically tries multiple gateways for reliability.

## Free Tier Limits

Pinata Free Plan:
- **1 GB** storage
- **Unlimited** bandwidth
- **Perfect** for your use case!

Each profile is ~1-5 KB, so you can store ~200,000+ profiles on free tier.

## Troubleshooting

### "Upload failed: 401 Unauthorized"
- Check JWT token is correct
- Regenerate API key if needed

### "Upload failed: 429 Too Many Requests"
- Free tier rate limit hit
- Wait a minute and try again
- Consider upgrading if needed

### "Simulated IPFS storage" in console
- PINATA_JWT not set in environment
- Add the token and restart server

## Alternative: Keep Simulated Storage

If you don't want to use Pinata:
- Leave `PINATA_JWT` empty
- App uses in-memory storage (works for development)
- Data clears on server restart
- Not recommended for production

## Next Steps

After setting up Pinata:
1. Test profile save/load locally
2. Add PINATA_JWT to Vercel
3. Deploy to production
4. Verify profiles persist
5. Deploy smart contract to Polygon mainnet
