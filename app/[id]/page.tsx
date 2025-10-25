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
      <div className="min-h-screen flex items-center justify-center bg-white overflow-x-hidden">
        <div className="animate-pulse text-[#0A66C2] text-lg sm:text-xl font-bold">Loading profile...</div>
      </div>
    );
  }

  // Empty profile AND it's their own profile
  if (profileData?.isEmpty && isOwnProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8E1] to-white overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl px-4 sm:px-6 py-4 shadow-lg flex justify-between items-center">
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image src="/logo.svg" alt="Linko" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-lg sm:text-2xl font-extrabold text-gray-900">Linko</span>
              </a>
              <ConnectButton />
            </div>
          </div>
          
          {/* Spacer for fixed header */}
          <div className="h-20 sm:h-24"></div>

          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-16 shadow-2xl border-4 border-gray-900 text-center mb-6"
          >
            <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">✨</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Welcome to Your Linko!
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed">
              Let's set up your Web3 identity. Add your photo, bio, interests, and showcase your projects!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-[#0A66C2] text-white rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-base sm:text-lg md:text-xl border-2 border-gray-900"
              >
                Create Your Profile 🚀
              </button>
            </div>
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
      <div className="min-h-screen bg-gradient-to-b from-[#F3E5F5] to-white overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl px-4 sm:px-6 py-4 shadow-lg flex justify-between items-center">
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image src="/logo.svg" alt="Linko" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-lg sm:text-2xl font-extrabold text-gray-900">Linko</span>
              </a>
              <ConnectButton />
            </div>
          </div>
          
          {/* Spacer for fixed header */}
          <div className="h-20 sm:h-24"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-16 shadow-2xl border-4 border-gray-900 text-center"
          >
            <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">👤</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-[1.1] tracking-tight">{shortAddress}</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              This user hasn&apos;t set up their Linko profile yet.
            </p>
            <div className="flex justify-center">
              <a
                href="/"
                className="inline-block w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-[#7C3AED] text-white rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:translate-x-[3px] sm:hover:translate-y-[3px] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-base sm:text-lg md:text-xl border-2 border-gray-900"
              >
                Create Your Own Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Full Profile View
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] via-white to-[#FFF8E1] overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Header */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
          <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl px-4 sm:px-6 py-4 shadow-lg flex justify-between items-center">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/logo.svg" alt="Linko" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-2xl font-extrabold text-gray-900">Linko</span>
            </a>
            <ConnectButton />
          </div>
        </div>
        
        {/* Spacer for fixed header */}
        <div className="h-20 sm:h-24"></div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          {/* Avatar */}
          <div className="mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-gray-900">
              {profileData?.avatarUrl ? (
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name || 'Profile'}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-4xl sm:text-6xl">
                  👤
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3 leading-[1.1] tracking-tight">
            {profileData?.name || shortAddress}
          </h1>
          
          {profileData?.name && (
            <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 font-medium">{shortAddress}</p>
          )}

          {/* Bio */}
          {profileData?.bio && (
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 max-w-xl mx-auto leading-relaxed">
              {profileData.bio}
            </p>
          )}

          {/* Interests */}
          {profileData?.interests && profileData.interests.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
              {profileData.interests.map((interest: string, index: number) => (
                <span
                  key={index}
                  className="bg-white text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10">
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-900 rounded-full font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all border-2 border-gray-900 text-base sm:text-lg"
              >
                {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
              </button>
            )}
            <div className="w-full sm:w-auto flex justify-center">
              <ShareButton address={identifier} ensName={null} />
            </div>
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
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-900 inline-block">
            <a
              href="/"
              className="inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg text-gray-900 hover:text-[#0A66C2] transition-colors font-bold"
            >
              <Image src="/logo.svg" alt="Linko" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Create your own Linko</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
