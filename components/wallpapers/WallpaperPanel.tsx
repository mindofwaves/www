'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function WallpaperPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center">
      {/* Arrow Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-l-xl z-20 transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight 
          className={`h-6 w-6 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      {/* Sliding Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed right-0 top-0 h-screen w-96 bg-black/40 backdrop-blur-xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-8">Wallpapers</h2>
        <div className="grid gap-8">
          {/* Wallpaper Cards */}
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-lg border border-white/5">
                <div className="aspect-[16/9] w-full relative">
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-400">Wallpaper {index}</span>
                  </div>
                </div>
                <div className="p-4 border-t border-white/5">
                  <motion.button 
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 