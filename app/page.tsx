'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import InfoSection from '@/components/InfoSection';

export default function Home() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      router.push(`/${address}`);
    }
  }, [isConnected, address, router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <InfoSection />
      
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Image src="/logo.svg" alt="Linko" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-xl sm:text-2xl font-bold text-primary">
              Linko
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ConnectButton />
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 shadow-sm border border-gray-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Powered by Base Blockchain
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight px-4 text-center w-full">
              Your Web3 Identity,
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent">
                All in One Place
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed px-4 text-center">
              Connect your wallet, showcase NFTs, share projects, and meet people 
              with similar interests — all with one beautiful link.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex justify-center"
              >
                <ConnectButton />
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-gray-700 bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300 transition-all text-center"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 sm:mt-16 w-full"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {['👤', '🎨', '🤝', '⚡'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-4xl sm:text-6xl shadow-sm border border-gray-100"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A complete Web3 identity solution with powerful features
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {[
            {
              icon: '👤',
              title: 'Profile Pictures',
              description: 'Upload your photo and make your profile uniquely yours'
            },
            {
              icon: '🤝',
              title: 'Find Connections',
              description: 'Meet people nearby who share your interests and passions'
            },
            {
              icon: '🎨',
              title: 'NFT Showcase',
              description: 'Automatically display your NFT collection from your wallet'
            },
            {
              icon: '⚡',
              title: 'Web3 Projects',
              description: 'Add and verify your favorite DApps with automatic verification'
            },
            {
              icon: '🏷️',
              title: 'Interests & Tags',
              description: 'Add interests to connect with like-minded people'
            },
            {
              icon: '🎵',
              title: 'Rich Media',
              description: 'Embed Spotify tracks, links, and social profiles'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md group w-full max-w-sm"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform border border-gray-100">
                <span className="text-3xl sm:text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Simple steps to create your Web3 identity
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              step: '01',
              title: 'Connect Wallet',
              description: 'Connect your Web3 wallet to get started instantly',
              icon: '🔐'
            },
            {
              step: '02',
              title: 'Customize Profile',
              description: 'Add your photo, bio, interests, and showcase your projects',
              icon: '✨'
            },
            {
              step: '03',
              title: 'Share & Connect',
              description: 'Share your link on social media and find like-minded people',
              icon: '🚀'
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group bg-white rounded-3xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl">{item.icon}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary via-accent to-purple-500 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-lg flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Stand Out?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join the future of Web3 identity. Create your profile in seconds.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center w-full sm:w-auto"
          >
            <ConnectButton />
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2 text-sm sm:text-base">Built with ❤️ on Base</p>
          <p className="text-xs sm:text-sm">Linko © 2025 - Your Web3 Identity Platform</p>
        </div>
      </footer>
    </main>
  );
}
