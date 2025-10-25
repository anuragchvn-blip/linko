'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ShareButtonProps {
  address: string;
  ensName?: string | null;
}

export default function ShareButton({ address, ensName }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${ensName || address}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-[#7C3AED] text-white rounded-full font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all border-2 border-gray-900 text-base sm:text-lg"
      >
        Share Profile
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-primary to-accent p-6 text-white relative">
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close share modal"
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                      🔗
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Share Your Linko</h3>
                      <p className="text-sm text-white/90">Perfect for Instagram, Twitter & Discord bios!</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* URL Display */}
                  <div>
                    <label htmlFor="profile-link-input" className="block text-sm font-medium text-gray-700 mb-2">Your Profile Link</label>
                    <div className="flex gap-2">
                      <input
                        id="profile-link-input"
                        type="text"
                        value={shareUrl}
                        readOnly
                        title="Your profile link"
                        aria-label="Your profile link"
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        onClick={copyToClipboard}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                          copied
                            ? 'bg-green-500 text-white'
                            : 'bg-primary text-white hover:bg-accent'
                        }`}
                      >
                        {copied ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Social Share Buttons */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Share On</label>
                    <a
                      href={`https://twitter.com/intent/tweet?text=Check out my Web3 identity on Linko!&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#1DA1F2] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#1a8cd8] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Share on X
                    </a>
                    
                    {navigator.share && (
                      <button
                        onClick={() => {
                          navigator.share({
                            title: 'My Linko Profile',
                            text: 'Check out my Web3 identity on Linko!',
                            url: shareUrl,
                          });
                        }}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share More
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
