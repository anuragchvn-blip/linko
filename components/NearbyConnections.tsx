'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Profile {
  address: string;
  name?: string;
  bio?: string;
  interests: string[];
  avatarUrl?: string;
}

interface NearbyConnectionsProps {
  userInterests: string[];
  userAddress: string;
}

export default function NearbyConnections({ 
  userInterests, 
  userAddress 
}: NearbyConnectionsProps) {
  const [connections, setConnections] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'medium'>('all');

  useEffect(() => {
    findConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInterests]);

  const findConnections = () => {
    setLoading(true);
    
    // In production, this would query a backend/database
    // For now, we'll simulate with mock data from localStorage
    const allProfiles: Profile[] = [];
    
    // Scan localStorage for other profiles
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('linko_profile_') && key !== `linko_profile_${userAddress}`) {
        try {
          const profile = JSON.parse(localStorage.getItem(key) || '{}');
          if (profile.interests && profile.interests.length > 0) {
            allProfiles.push({
              address: key.replace('linko_profile_', ''),
              name: profile.name,
              bio: profile.bio,
              interests: profile.interests || [],
              avatarUrl: profile.avatarUrl
            });
          }
        } catch (e) {
          // Skip invalid profiles
        }
      }
    }

    // Calculate match scores
    const matches = allProfiles
      .map(profile => {
        const commonInterests = profile.interests.filter(interest =>
          userInterests.some(ui => 
            ui.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(ui.toLowerCase())
          )
        );
        
        return {
          ...profile,
          matchScore: commonInterests.length,
          commonInterests
        };
      })
      .filter(m => m.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    setConnections(matches as any);
    setLoading(false);
  };

  const getMatchLevel = (score: number) => {
    if (score >= 3) return { level: 'high', color: 'from-green-400 to-emerald-500', text: 'High Match' };
    if (score >= 2) return { level: 'medium', color: 'from-blue-400 to-primary', text: 'Good Match' };
    return { level: 'low', color: 'from-gray-400 to-gray-500', text: 'Some Match' };
  };

  const filteredConnections = connections.filter(conn => {
    const match = getMatchLevel((conn as any).matchScore);
    if (selectedFilter === 'all') return true;
    return match.level === selectedFilter;
  });

  if (userInterests.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-lg font-semibold text-text mb-2">
            Add Interests to Connect
          </h3>
          <p className="text-gray-600 text-sm">
            Add some interests to your profile to find people with similar passions!
          </p>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-text mb-2">
            No Connections Yet
          </h3>
          <p className="text-gray-600 text-sm">
            Be the first in your area! Share your profile to connect with others.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-primary/20 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🤝</span>
          </div>
          <h3 className="text-lg font-semibold text-text">
            Nearby Connections
          </h3>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {connections.length}
          </span>
        </div>

        {/* Filter */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'high', label: 'High' },
            { key: 'medium', label: 'Good' }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                selectedFilter === filter.key
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-3">
          {filteredConnections.slice(0, 10).map((connection: any, index) => {
            const match = getMatchLevel(connection.matchScore);
            
            return (
              <motion.a
                key={connection.address}
                href={`/${connection.address}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group block p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-primary/5 hover:to-accent/5 border border-gray-100 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                    {connection.avatarUrl ? (
                      <Image
                        src={connection.avatarUrl}
                        alt={connection.name || 'User'}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                        👤
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-text group-hover:text-primary transition-colors truncate">
                        {connection.name || `${connection.address.slice(0, 6)}...${connection.address.slice(-4)}`}
                      </h4>
                      <span className={`bg-gradient-to-r ${match.color} text-white px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0`}>
                        {match.text}
                      </span>
                    </div>
                    
                    {connection.bio && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {connection.bio}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {connection.commonInterests.slice(0, 3).map((interest: string, i: number) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                      {connection.commonInterests.length > 3 && (
                        <span className="text-gray-500 text-xs py-0.5">
                          +{connection.commonInterests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.a>
            );
          })}
        </div>
      </AnimatePresence>

      {filteredConnections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No connections match this filter</p>
        </div>
      )}
    </motion.div>
  );
}
