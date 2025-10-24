'use client';

import { motion } from 'framer-motion';

interface SpotifyEmbedProps {
  embedUrl: string;
}

export default function SpotifyEmbed({ embedUrl }: SpotifyEmbedProps) {
  // Extract the embed URL if it's a regular Spotify URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('embed')) {
      return url;
    }
    // Convert regular Spotify URLs to embed URLs
    const match = url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    }
    return url;
  };

  const finalEmbedUrl = getEmbedUrl(embedUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
        <span>🎵</span>
        Now Playing
      </h3>
      <div className="rounded-xl overflow-hidden">
        <iframe
          title="Spotify Embed"
          src={finalEmbedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
}
