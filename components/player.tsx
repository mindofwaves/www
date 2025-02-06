"use client";

import Image from "next/image";
import Link from "next/link";
import { Music2, Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerProps {
  song: {
    title: string;
    artist: string;
    coverUrl: string;
    audioUrl: string;
    spotifyUrl: string;
    appleMusicUrl: string;
  };
}

export default function Player({ song }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
    }
  }, []);

  useEffect(() => {
    let timeUpdateInterval: NodeJS.Timeout;
    if (isPlaying) {
      setCurrentTime(audioRef.current?.currentTime || 0);
      timeUpdateInterval = setInterval(() => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      }, 16);
    }
    return () => clearInterval(timeUpdateInterval);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
      <div className="p-8 flex flex-col items-center">
        <div className="aspect-square w-full relative rounded-2xl overflow-hidden mb-8">
          <Image
            src={song.coverUrl}
            alt={song.title}
            fill
            className="object-cover"
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-transform hover:scale-105">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white translate-x-0.5" />
              )}
            </div>
          </button>
        </div>
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1]
              }}
              className="w-full mb-6 space-y-2 overflow-hidden"
            >
              <div 
                className="w-full h-1 bg-white/5 rounded-full cursor-pointer relative overflow-hidden group"
                onClick={handleTimelineClick}
              >
                <motion.div 
                  className="absolute h-full bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-colors"
                  initial={false}
                  animate={{ 
                    width: `${(currentTime / duration) * 100}%` 
                  }}
                  transition={{ 
                    duration: 0,
                    ease: "linear"
                  }}
                />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between text-sm text-white/40"
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <h2 className="text-white text-2xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
          {song.title}
        </h2>
        <p className="text-white/70 mt-2 text-lg">{song.artist}</p>
      </div>
      <div className="p-8 pt-0 flex flex-col gap-3">
        <Link
          href={song.spotifyUrl}
          target="_blank"
          className="w-full bg-[#1DB954]/20 hover:bg-[#1DB954]/30 text-white py-4 rounded-2xl transition-all text-center text-lg border border-[#1DB954]/30 shadow-[0_0_15px_rgba(29,185,84,0.3)] hover:shadow-[0_0_20px_rgba(29,185,84,0.5)]"
        >
          <div className="flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span>Spotify</span>
          </div>
        </Link>
        <Link
          href={song.appleMusicUrl}
          target="_blank"
          className="w-full bg-[#FB5C74]/20 hover:bg-[#FB5C74]/30 text-white py-4 rounded-2xl transition-all text-center text-lg border border-[#FB5C74]/30 shadow-[0_0_15px_rgba(251,92,116,0.3)] hover:shadow-[0_0_20px_rgba(251,92,116,0.5)]"
        >
          <div className="flex items-center justify-center gap-2">
            <Music2 className="w-6 h-6" />
            <span>Apple Music</span>
          </div>
        </Link>
      </div>
      <audio ref={audioRef} src={song.audioUrl} />
    </div>
  );
} 