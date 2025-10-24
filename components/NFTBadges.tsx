'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NFTBadgesProps {
  address: string;
}

interface NFT {
  name: string;
  image: string;
  contract: string;
}

export default function NFTBadges({ address }: NFTBadgesProps) {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const fetchNFTs = async () => {
    try {
      // In production, fetch NFTs from Alchemy NFT API
      // For now, using placeholder data
      const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
      
      if (apiKey) {
        // Fetch from Alchemy
        const response = await fetch(
          `https://base-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&limit=4`
        );
        
        if (response.ok) {
          const data = await response.json();
          const nftData = data.ownedNfts?.slice(0, 4).map((nft: any) => ({
            name: nft.name || nft.contract.name || 'Unnamed NFT',
            image: nft.image?.thumbnailUrl || nft.image?.cachedUrl || '',
            contract: nft.contract.address,
          })) || [];
          setNfts(nftData);
        }
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
        <span>🎨</span>
        NFT Badges
      </h3>
      <div className="flex gap-3 flex-wrap">
        {nfts.map((nft, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
            title={nft.name}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
              {nft.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                  NFT
                </div>
              )}
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {nft.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
