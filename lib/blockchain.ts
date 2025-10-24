// Utility function to validate Ethereum addresses
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Fetch NFTs from Alchemy
export async function fetchNFTsFromAlchemy(address: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&limit=4`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch NFTs');
    }
    
    const data = await response.json();
    return data.ownedNfts || [];
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
}

// Resolve ENS name
export async function resolveENSName(address: string) {
  // This would use a library like ethers.js or viem
  // For now, returning null as placeholder
  return null;
}

// Format transaction data
export function formatTransaction(tx: any) {
  return {
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
    timestamp: tx.timestamp,
  };
}
