"use client";

import dynamic from 'next/dynamic';
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const WallpaperCards = dynamic(
  () => import('@/components/wallpapers/WallpaperCards'),
  { ssr: false }
);

export default function WallpaperSection() {
  return (
    <>
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>

      {/* Wallpapers section */}
      <WallpaperCards />
    </>
  );
} 