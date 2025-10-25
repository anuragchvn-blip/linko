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
  const gradients = [
    'from-blue-100 to-cyan-100',
    'from-purple-100 to-pink-100',
    'from-green-100 to-emerald-100',
    'from-orange-100 to-yellow-100',
    'from-rose-100 to-pink-100',
    'from-indigo-100 to-purple-100',
  ];
  
  const gradient = gradients[index % gradients.length];

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${gradient} border-2 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer`}
    >
      {link.icon && (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border-2 border-gray-900 flex-shrink-0">
          {link.icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate">
          {link.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 truncate mt-0.5 sm:mt-1">{link.url}</p>
      </div>
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </motion.a>
  );
}
