'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VerifiedDAppsProps {
  address: string;
  dapps?: any[];
}

export default function VerifiedDApps({ address, dapps = [] }: VerifiedDAppsProps) {
  const [verifiedDApps, setVerifiedDApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDAppInteractions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, dapps]);

  const checkDAppInteractions = async () => {
    try {
      // Use user-provided DApps
      setVerifiedDApps(dapps);
    } catch (error) {
      console.error('Error checking DApp interactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (verifiedDApps.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">✓</span>
        </div>
        <h3 className="text-lg font-semibold text-text">
          Web3 Projects
        </h3>
      </div>
      <div className="space-y-2">
        {verifiedDApps.map((dapp, index) => (
          <motion.a
            key={index}
            href={dapp.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-primary/5 hover:to-primary/10 border border-gray-100 hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {dapp.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text group-hover:text-primary transition-colors">
                {dapp.name}
              </h4>
              <p className="text-xs text-gray-500 truncate">{dapp.category || 'DApp'}</p>
            </div>
            {dapp.verified && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <span>✓</span>
                Verified
              </div>
            )}
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
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
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
