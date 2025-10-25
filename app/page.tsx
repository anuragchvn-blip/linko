'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      // Normalize address to lowercase for consistent routing
      router.push(`/${address.toLowerCase()}`);
    }
  }, [isConnected, address, router]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl px-4 sm:px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Image src="/logo.svg" alt="Linko" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Linko
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <ConnectButton />
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-[#E8F5E9] to-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight"
          >
            Jumpstart your Web3 presence today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            <span className="font-mono text-sm sm:text-base">linko.xyz/</span>
            <span className="font-bold text-[#0A66C2]">yourname</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature 1: Create and Customize */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#FFF8E1] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                Create and customize your Linko in minutes
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed font-normal">
                Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail to match your Web3 brand.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 lg:order-2"
            >
              <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-2xl max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl sm:text-3xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-lg text-gray-900 mb-1 truncate">@yourname</div>
                    <div className="text-xs sm:text-sm text-gray-600">Web3 Creator</div>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl border-2 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl flex-shrink-0">🎨</span>
                      <span className="font-semibold text-xs sm:text-sm text-gray-900 truncate">My NFT Collection</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border-2 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl flex-shrink-0">⚡</span>
                      <span className="font-semibold text-xs sm:text-sm text-gray-900 truncate">DeFi Dashboard</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl flex-shrink-0">🔗</span>
                      <span className="font-semibold text-xs sm:text-sm text-gray-900 truncate">My Website</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 2: Share Everywhere */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2"
            >
              <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 shadow-2xl max-w-md mx-auto">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-white rounded-full flex items-center justify-center text-3xl sm:text-5xl shadow-xl border-4 border-gray-900">
                    🌐
                  </div>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border-2 border-gray-900">
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 truncate">linko.xyz/yourname</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm sm:text-lg border-2 border-gray-900 flex-shrink-0">
                        𝕏
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full flex items-center justify-center text-white text-sm sm:text-lg border-2 border-gray-900 flex-shrink-0">
                        📷
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm sm:text-lg border-2 border-gray-900 flex-shrink-0">
                        ▶
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                Share your Linko anywhere you like!
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed font-normal">
                Add your unique Linko URL to all the platforms and places you find your audience. Share your complete Web3 identity with one link.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 3: Showcase NFTs */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#F3E5F5] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                Showcase your NFTs and Web3 projects
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed font-normal">
                Automatically display your NFT collection and verified DApps. Track engagement and connect with your Web3 audience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-2xl border-4 border-gray-900 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { emoji: '🎨', bg: 'from-pink-200 to-purple-300' },
                    { emoji: '🖼️', bg: 'from-blue-200 to-cyan-300' },
                    { emoji: '✨', bg: 'from-yellow-200 to-orange-300' },
                    { emoji: '🎭', bg: 'from-green-200 to-emerald-300' }
                  ].map((nft, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className={`aspect-square bg-gradient-to-br ${nft.bg} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl border-2 border-gray-900 shadow-lg cursor-pointer`}
                    >
                      {nft.emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-4 leading-[1.1] tracking-tight"
          >
            The only link in bio trusted by Web3
          </motion.h2>
        </div>

        <div className="relative">
          <div className="flex gap-4 sm:gap-6 animate-scroll whitespace-nowrap">
            {['creators', 'influencers', 'NFT collectors', 'DeFi users', 'DAOs', 'blockchain devs', 'crypto traders', 'Web3 artists', 'metaverse builders', 'creators', 'influencers', 'NFT collectors'].map((word, i) => (
              <span key={i} className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#E8F5E9] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-10 sm:mb-16 leading-[1.1] tracking-tight"
          >
            Everything you need in one place
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: '🔗',
                title: 'One link for everything',
                description: 'Share your entire Web3 identity with a single link'
              },
              {
                icon: '🎨',
                title: 'NFT showcase',
                description: 'Automatically display your NFT collection'
              },
              {
                icon: '⚡',
                title: 'Verified DApps',
                description: 'Add and verify your favorite Web3 projects'
              },
              {
                icon: '🤝',
                title: 'Find connections',
                description: 'Meet people with similar interests nearby'
              },
              {
                icon: '👤',
                title: 'Custom profiles',
                description: 'Personalize with photos, bio, and interests'
              },
              {
                icon: '📊',
                title: 'Built on Polygon',
                description: 'Fast, secure, and decentralized'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#FFF8E1] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight"
          >
            Jumpstart your Web3 presence today
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 text-base sm:text-lg md:text-xl text-gray-600 flex-wrap justify-center">
              <span className="font-mono text-sm sm:text-base">linko.xyz/</span>
              <span className="font-bold text-[#0A66C2]">yourname</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center"
          >
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="Linko" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl sm:text-2xl font-extrabold text-gray-900">Linko</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Your Web3 identity platform</p>
            </div>

            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">Company</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                <li><a href="#" className="hover:text-[#0A66C2] transition">About</a></li>
                <li><a href="#" className="hover:text-[#0A66C2] transition">Blog</a></li>
                <li><a href="#" className="hover:text-[#0A66C2] transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">Community</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                <li><a href="#" className="hover:text-[#0A66C2] transition">Discord</a></li>
                <li><a href="#" className="hover:text-[#0A66C2] transition">Twitter</a></li>
                <li><a href="#" className="hover:text-[#0A66C2] transition">GitHub</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">Support</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                <li><a href="#" className="hover:text-[#0A66C2] transition">Help Center</a></li>
                <li><a href="#" className="hover:text-[#0A66C2] transition">Privacy</a></li>
                <li><a href="#" className="hover:text-[#0A66C2] transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-gray-100 text-center text-sm sm:text-base text-gray-600">
            <p className="mb-2">Built with ❤️ on Polygon Blockchain</p>
            <p className="text-xs sm:text-sm">© 2025 Linko. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </main>
  );
}
