'use client';

import { useParams } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import LinkCard from '@/components/LinkCard';
import NFTBadges from '@/components/NFTBadges';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import VerifiedDApps from '@/components/VerifiedDApps';
import ShareButton from '@/components/ShareButton';
import NearbyConnections from '@/components/NearbyConnections';
import ProfileEditor from '@/components/ProfileEditor';

export default function UserProfilePage() {
  const params = useParams();
  const identifier = params?.id as string;
  const { address: connectedAddress } = useAccount();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = connectedAddress?.toLowerCase() === identifier?.toLowerCase();

  useEffect(() => {
    loadUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier, connectedAddress]);

  const loadUserProfile = async () => {
    try {
      const stored = localStorage.getItem(`linko_profile_${identifier}`);
      
      if (stored) {
        setProfileData(JSON.parse(stored));
      } else {
        setProfileData({
          address: identifier,
          name: '',
          bio: '',
          avatarUrl: '',
          interests: [],
          links: [],
          dapps: [],
          spotifyEmbed: '',
          isEmpty: true
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = (data: any) => {
    const updatedData = { ...data, isEmpty: false };
    setProfileData(updatedData);
    localStorage.setItem(`linko_profile_${identifier}`, JSON.stringify(updatedData));
    setIsEditing(false);
  };

  const shortAddress = identifier
    ? `${identifier.slice(0, 6)}...${identifier.slice(-4)}`
    : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-primary text-lg">Loading profile...</div>
      </div>
    );
  }

  // Empty profile AND it's their own profile
  if (profileData?.isEmpty && isOwnProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🔗</span>
              <span className="text-xl font-bold">Linko</span>
            </a>
            <ConnectButton />
          </div>

          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm text-center mb-6"
          >
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Welcome to Your Linko!
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Let's set up your Web3 identity. Add your photo, bio, interests, and showcase your projects!
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Create Your Profile 🚀
            </button>
          </motion.div>

          {/* Editor */}
          {isEditing && (
            <ProfileEditor
              initialData={profileData}
              onSave={handleSaveProfile}
            />
          )}
        </div>
      </div>
    );
  }

  // Empty profile but NOT their own
  if (profileData?.isEmpty && !isOwnProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🔗</span>
              <span className="text-xl font-bold">Linko</span>
            </a>
            <ConnectButton />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm text-center"
          >
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{shortAddress}</h2>
            <p className="text-gray-600 mb-8">
              This user hasn&apos;t set up their Linko profile yet.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Create Your Own Profile
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  // Full Profile View
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <a href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <span className="text-2xl">🔗</span>
            <span className="text-xl font-bold">Linko</span>
          </a>
          <ConnectButton />
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {/* Avatar */}
          <div className="mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white">
              {profileData?.avatarUrl ? (
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name || 'Profile'}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl sm:text-5xl">
                  👤
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {profileData?.name || shortAddress}
          </h1>
          
          {profileData?.name && (
            <p className="text-sm text-gray-500 mb-3">{shortAddress}</p>
          )}

          {/* Bio */}
          {profileData?.bio && (
            <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-md mx-auto px-4">
              {profileData.bio}
            </p>
          )}

          {/* Interests */}
          {profileData?.interests && profileData.interests.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
              {profileData.interests.map((interest: string, index: number) => (
                <span
                  key={index}
                  className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm border border-gray-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-900 rounded-full font-semibold shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-gray-300"
              >
                {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
              </button>
            )}
            <ShareButton address={identifier} ensName={null} />
          </div>
        </motion.div>

        {/* Editor */}
        <AnimatePresence>
          {isEditing && isOwnProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <ProfileEditor
                initialData={profileData}
                onSave={handleSaveProfile}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        {!isEditing && (
          <div className="space-y-4">
            {/* Nearby Connections */}
            {profileData?.interests && profileData.interests.length > 0 && (
              <NearbyConnections 
                userInterests={profileData.interests}
                userAddress={identifier}
              />
            )}

            {/* Spotify */}
            {profileData?.spotifyEmbed && (
              <SpotifyEmbed embedUrl={profileData.spotifyEmbed} />
            )}

            {/* DApps */}
            {profileData?.dapps && profileData.dapps.length > 0 && (
              <VerifiedDApps address={identifier} dapps={profileData.dapps} />
            )}

            {/* Links */}
            {profileData?.links && profileData.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                {profileData.links.map((link: any, index: number) => (
                  <LinkCard key={index} link={link} index={index} />
                ))}
              </motion.div>
            )}

            {/* NFTs */}
            <NFTBadges address={identifier} />
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <span className="text-lg">🔗</span>
            <span className="font-semibold">Create your own Linko</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
