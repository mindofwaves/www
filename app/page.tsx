"use client";

import { Player } from "@/components/player";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dynamic from 'next/dynamic';

// Use dynamic import for WallpaperCards
const WallpaperCards = dynamic(() => import('@/components/wallpapers/WallpaperCards'), {
  loading: () => <div>Loading...</div>
});

export default function Page() {
  const [showWallpapers, setShowWallpapers] = useState(false);

  return (
    <div className="h-[100dvh] relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <BackgroundGradientAnimation 
          gradientBackgroundStart={showWallpapers ? "rgb(24, 24, 32)" : "rgb(40, 40, 40)"}
          gradientBackgroundEnd={showWallpapers ? "rgb(8, 8, 16)" : "rgb(10, 10, 10)"}
          firstColor={showWallpapers ? "120, 120, 180" : "200, 200, 200"}
          secondColor={showWallpapers ? "100, 100, 160" : "160, 160, 160"}
          thirdColor={showWallpapers ? "80, 80, 140" : "120, 120, 120"}
          fourthColor={showWallpapers ? "60, 60, 120" : "80, 80, 80"}
          fifthColor={showWallpapers ? "40, 40, 100" : "40, 40, 40"}
          pointerColor={showWallpapers ? "140, 140, 200" : "180, 180, 180"}
        />
      </div>
      <div className="absolute inset-0 blur-xl bg-cover opacity-40 bg-[url('/cover.jpg')] bg-no-repeat bg-center animate-floating z-0" />
      
      {/* Content layer */}
      <div className="relative z-10 h-full flex flex-col items-center">
        {/* Player */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
          <Player
            song={{
              title: "Games & Heartbreaks",
              artist: "WAVE$",
              coverUrl: "/cover.jpg",
              audioUrl: "/your-audio-file.mp3",
              spotifyUrl: "https://open.spotify.com/artist/1XAJ4OgJnBTqYh3m6g8OI0",
              appleMusicUrl: "https://music.apple.com/your-artist-url",
            }}
          />
        </div>

        {/* Arrow button */}
        <motion.button 
          onClick={() => setShowWallpapers(true)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.button>
      </div>

      {/* Modal layer */}
      <AnimatePresence>
        {showWallpapers && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 backdrop-blur-xl z-50 flex flex-col"
          >
            <motion.button
              onClick={() => setShowWallpapers(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className="w-8 h-8 rotate-180" />
            </motion.button>
            <div className="flex-1 flex items-center justify-center">
              <WallpaperCards onClose={() => setShowWallpapers(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}