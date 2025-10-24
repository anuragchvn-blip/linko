'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InfoSection() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {/* Info Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowInfo(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 z-40"
      >
        ?
      </motion.button>

      {/* Info Modal */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInfo(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold font-satoshi text-text mb-2">
                  What is Linko? 🔗
                </h2>
                <p className="text-gray-600">
                  Your all-in-one Web3 identity page
                </p>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            {/* Why Linko? */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Why Linko is Helpful
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <h4 className="font-medium text-text">One Link for Everything</h4>
                    <p className="text-sm text-gray-600">
                      Share all your Web3 projects, socials, and NFTs in a single link - perfect for Instagram, Twitter, or Discord bios!
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-medium text-text">Verified Web3 Identity</h4>
                    <p className="text-sm text-gray-600">
                      Connect your wallet to automatically display your ENS name, NFTs, and verified DApp interactions
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h4 className="font-medium text-text">Showcase Your Projects</h4>
                    <p className="text-sm text-gray-600">
                      Add DApps you&apos;ve built or use regularly - we verify them automatically so others know they&apos;re legit!
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <h4 className="font-medium text-text">Professional Yet Fun</h4>
                    <p className="text-sm text-gray-600">
                      Clean LinkedIn-style design with cute touches - perfect for professional networking and community building
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text mb-3 flex items-center gap-2">
                <span className="text-2xl">📖</span>
                How to Use Linko
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">
                    <strong>Connect Your Wallet</strong> - Click &quot;Connect Wallet&quot; to link your Web3 identity
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">
                    <strong>Edit Your Profile</strong> - Add your bio, links, Web3 projects, and favorite music
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">
                    <strong>Share Your Link</strong> - Copy your Linko URL and add it to your Instagram bio, Twitter, or anywhere!
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-gray-700">
                    <strong>Keep it Updated</strong> - Your NFTs and DApps update automatically when you connect your wallet
                  </p>
                </div>
              </div>
            </div>

            {/* Perfect For */}
            <div>
              <h3 className="text-xl font-semibold text-text mb-3 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Perfect For
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">👨‍💻</div>
                  <p className="text-sm font-medium text-gray-700">Web3 Developers</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">🎨</div>
                  <p className="text-sm font-medium text-gray-700">NFT Collectors</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">✨</div>
                  <p className="text-sm font-medium text-gray-700">Content Creators</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">🏢</div>
                  <p className="text-sm font-medium text-gray-700">DAOs & Communities</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowInfo(false)}
              className="w-full mt-6 btn-primary"
            >
              Got it! Let&apos;s build my Linko
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-4">
              Powered by Base ⚡ | Free to use | Your data, your control
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
