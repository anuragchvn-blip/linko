# 🚀 Smart Contract Deployment - Quick Start

Follow these steps to deploy the LinkoProfile smart contract to Base Sepolia.

## Prerequisites

✅ MetaMask wallet installed  
✅ Base Sepolia network added to wallet  
✅ Testnet ETH from [Base Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

## 5-Minute Deployment

### 1. Get Your Private Key

In MetaMask:
- Click account icon → Account Details
- Click "Show Private Key"
- Enter password and copy the key

⚠️ **NEVER commit this or share it!**

### 2. Add to .env.local

```bash
DEPLOYER_PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=get_from_basescan_org
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

### 3. Compile

```powershell
npx hardhat compile
```

### 4. Deploy

```powershell
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### 5. Copy Contract Address

From the output, copy the contract address:
```
LinkoProfile deployed to: 0x1234...
```

Add it to `.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234...
```

### 6. Restart Server

```powershell
# Press Ctrl+C to stop
npm run dev
```

## ✅ Test It

1. Go to http://localhost:3000
2. Connect wallet
3. Edit profile
4. Save → **Sign transaction**
5. Wait 2-3 seconds
6. See "✅ Profile saved on-chain!"

## 🎉 Success!

Your profiles are now stored on Base blockchain!

- **Before**: IPFS → localStorage (centralized)
- **After**: IPFS → Base blockchain (decentralized!)

## Need More Help?

See `DEPLOYMENT.md` for detailed guide.
