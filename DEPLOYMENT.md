# Smart Contract Deployment Guide

This guide will help you deploy the LinkoProfile smart contract to Base Sepolia testnet.

## Prerequisites

1. **Get a wallet with testnet ETH**
   - Install MetaMask or another Web3 wallet
   - Add Base Sepolia network to your wallet
   - Get testnet ETH from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

2. **Get your private key**
   - In MetaMask: Account Details → Show Private Key
   - ⚠️ **NEVER share your private key or commit it to Git!**

3. **Get a BaseScan API key** (for contract verification)
   - Go to [BaseScan](https://basescan.org/)
   - Create an account
   - Go to API Keys → Add API Key

## Setup Environment Variables

Add these to your `.env.local` file:

```bash
# Deployer wallet private key (DO NOT COMMIT THIS!)
DEPLOYER_PRIVATE_KEY=your_private_key_here

# BaseScan API key for contract verification
BASESCAN_API_KEY=

# Base Sepolia RPC (optional, uses public endpoint by default)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# This will be filled after deployment
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

## Deploy Contract

1. **Compile the contract**
   ```bash
   npx hardhat compile
   ```

2. **Deploy to Base Sepolia**
   ```bash
   npx hardhat run scripts/deploy.ts --network baseSepolia
   ```

3. **Copy the contract address** from the output and add it to `.env.local`:
   ```bash
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
   ```

4. **Verify the contract on BaseScan** (optional but recommended)
   ```bash
   npx hardhat verify --network baseSepolia YOUR_CONTRACT_ADDRESS
   ```

## How It Works

### Before (Centralized)
- Profile data uploaded to IPFS ✅
- IPFS CID stored in localStorage ❌ (not decentralized!)
- Profile only accessible on same device

### After (Decentralized)
- Profile data uploaded to IPFS ✅
- IPFS CID stored on Base blockchain ✅ (fully decentralized!)
- Profile accessible from any device
- Anyone can view your profile by your wallet address

### Smart Contract Functions

```solidity
// Save your profile CID on-chain
function setProfileCID(string memory _ipfsCID) public

// Get any user's profile CID
function getProfileCID(address _user) public view returns (string memory)

// Get your own profile CID
function getMyProfileCID() public view returns (string memory)

// Check if user has a profile
function hasProfile(address _user) public view returns (bool)
```

### User Flow

1. **Create/Edit Profile**
   - User clicks "Edit Profile"
   - Fills in name, bio, links, etc.
   - Clicks "Save"

2. **Upload to IPFS**
   - Profile data uploaded to Web3.Storage
   - Receives IPFS CID (e.g., `QmXYZ123...`)

3. **Save to Blockchain**
   - Transaction sent to Base blockchain
   - User signs transaction in wallet
   - CID stored on-chain at their address

4. **Load Profile**
   - App reads CID from smart contract
   - Fetches profile data from IPFS using CID
   - Displays profile

## Gas Costs

Approximate costs on Base Sepolia (testnet):
- Deploy contract: ~0.0001 ETH (free on testnet)
- First profile save: ~0.00005 ETH (free on testnet)
- Profile update: ~0.00003 ETH (free on testnet)

On Base Mainnet, costs are similar (Base has very low gas fees!).

## Troubleshooting

### "insufficient funds for gas"
- Get more testnet ETH from the faucet
- Make sure you're connected to Base Sepolia network

### "Contract not deployed"
- Check that `NEXT_PUBLIC_CONTRACT_ADDRESS` is set in `.env.local`
- Restart your dev server after adding env variables

### "Transaction failed"
- Check wallet is connected
- Check you're on the correct network (Base Sepolia)
- Check you have enough ETH for gas

### "IPFS upload failed"
- Check `NEXT_PUBLIC_WEB3_STORAGE_TOKEN` is set
- Check your Web3.Storage account is active

## Next Steps

After deployment, you can:

1. **Test it out**: Create a profile and verify it's stored on-chain
2. **View on BaseScan**: Check your transactions and contract interactions
3. **Deploy to mainnet**: When ready, deploy to Base mainnet using same process
4. **Share your profile**: Anyone can view your profile at `linko.app/YOUR_ADDRESS`

## Support

- Base Docs: https://docs.base.org/
- Hardhat Docs: https://hardhat.org/docs
- Web3.Storage: https://web3.storage/docs/
