"use client";

import { motion } from "framer-motion";

interface WallpaperCardsProps {
  onClose?: () => void;
}

const WallpaperCards = ({ onClose }: WallpaperCardsProps) => {
  const wallpapers = [
    {
      id: 1,
      title: "Neural Flow",
      previewUrl: "/wallpapers/neural-flow.jpg",
      downloadUrl: "/wallpapers/neural-flow.jpg"
    },
    {
      id: 2,
      title: "Cosmic Waves",
      previewUrl: "/wallpapers/cosmic-waves.jpg",
      downloadUrl: "/wallpapers/cosmic-waves.jpg"
    },
    {
      id: 3,
      title: "Digital Dreams",
      previewUrl: "/wallpapers/digital-dreams.jpg",
      downloadUrl: "/wallpapers/digital-dreams.jpg"
    },
  ];

  const handleDownload = (wallpaper: typeof wallpapers[0]) => {
    const link = document.createElement('a');
    link.href = wallpaper.downloadUrl;
    link.download = `${wallpaper.title.toLowerCase().replace(' ', '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-[calc(100vh-6rem)] max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-full">
        {wallpapers.map((wallpaper, index) => (
          <motion.div
            key={wallpaper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group h-full"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors h-full flex flex-col">
              <div className="relative flex-1">
                <img 
                  src={wallpaper.previewUrl} 
                  alt={wallpaper.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/40 group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-500" />
              </div>
              <div className="p-4 border-t border-white/10 backdrop-blur-xl bg-white/5">
                <h3 className="text-white text-lg font-medium mb-3">{wallpaper.title}</h3>
                <motion.button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload(wallpaper)}
                >
                  Download
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WallpaperCards; 