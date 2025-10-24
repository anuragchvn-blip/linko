'use client';

import { motion } from 'framer-motion';

interface Link {
  title: string;
  url: string;
  icon?: string;
}

interface LinkCardProps {
  link: Link;
  index: number;
}

export default function LinkCard({ link, index }: LinkCardProps) {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:from-primary/5 hover:to-primary/10 border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {link.icon && (
        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          {link.icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text group-hover:text-primary transition-colors truncate">
          {link.title}
        </h4>
        <p className="text-xs text-gray-500 truncate">{link.url}</p>
      </div>
      <svg
        className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
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
  );
}
