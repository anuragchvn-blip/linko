'use client';

import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { mainnet } from 'wagmi/chains';
import Image from 'next/image';
import ProfileEditor from './ProfileEditor';
import LinkCard from './LinkCard';
import NFTBadges from './NFTBadges';
import SpotifyEmbed from './SpotifyEmbed';
import VerifiedDApps from './VerifiedDApps';
import ShareButton from './ShareButton';
import NearbyConnections from './NearbyConnections';

export default function ProfilePage() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName || undefined,
    chainId: mainnet.id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      loadProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const loadProfileData = async () => {
    try {
      // Try to load from localStorage first (in production, this would be IPFS)
      const stored = localStorage.getItem(`linko_profile_${address}`);
      if (stored) {
        setProfileData(JSON.parse(stored));
      } else {
        // Default profile
        setProfileData({
          name: '',
          bio: 'Web3 enthusiast | Building on Base',
          avatarUrl: '',
          interests: [],
          links: [],
          dapps: [],
          spotifyEmbed: '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = (data: any) => {
    setProfileData(data);
    localStorage.setItem(`linko_profile_${address}`, JSON.stringify(data));
    setIsEditing(false);
  };

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse text-primary">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center"
      >
        {/* Avatar */}
        <div className="relative inline-block mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg mx-auto">
            {profileData?.avatarUrl ? (
              <Image
                src={profileData.avatarUrl}
                alt={profileData.name || ensName || 'Profile'}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : ensAvatar ? (
              <Image
                src={ensAvatar}
                alt={ensName || 'ENS Avatar'}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">
                👤
              </div>
            )}
          </div>
          {ensName && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Name/Address */}
        <h2 className="text-3xl font-bold mb-2">
          {profileData?.name || ensName || shortAddress}
        </h2>
        {ensName && (
          <p className="text-gray-500 text-sm mb-3">{shortAddress}</p>
        )}

        {/* Bio */}
        <p className="text-gray-700 max-w-md mx-auto mb-4">
          {profileData?.bio}
        </p>

        {/* Interests Tags */}
        {profileData?.interests && profileData.interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profileData.interests.map((interest: string, index: number) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit Profile ✏️'}
          </button>
          <ShareButton address={address || ''} ensName={ensName} />
        </div>
      </motion.div>

      {/* Editor */}
      {isEditing && (
        <ProfileEditor
          initialData={profileData}
          onSave={handleSaveProfile}
        />
      )}

      {/* Nearby Connections */}
      {!isEditing && profileData?.interests && profileData.interests.length > 0 && (
        <NearbyConnections 
          userInterests={profileData.interests}
          userAddress={address || ''}
        />
      )}

      {/* Spotify Embed */}
      {profileData?.spotifyEmbed && !isEditing && (
        <SpotifyEmbed embedUrl={profileData.spotifyEmbed} />
      )}

      {/* Verified DApps */}
      {!isEditing && <VerifiedDApps address={address!} dapps={profileData?.dapps || []} />}

      {/* Custom Links */}
      {!isEditing && profileData?.links && profileData.links.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-text mb-3">Links</h3>
          {profileData.links.map((link: any, index: number) => (
            <LinkCard key={index} link={link} index={index} />
          ))}
        </motion.div>
      )}

      {/* NFT Badges */}
      {!isEditing && <NFTBadges address={address!} />}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-6 text-sm text-gray-500"
      >
        Powered by{' '}
        <a
          href="https://base.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          Base ⚡
        </a>
      </motion.div>
    </div>
  );
}
