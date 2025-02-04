"use client";

import { AlbumCover } from "@/components/player/album-cover";
import { AppleMusicButton } from "@/components/player/apple-music-button";
import { PlayerControls } from "@/components/player/player-controls";
import { PlayerInfo } from "@/components/player/player-info";
import { ProgressBar } from "@/components/player/progress-bar";
import { SpotifyButton } from "@/components/player/spotify-button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface Song {
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
}

interface PlayerProps {
  song: Song;
  className?: string;
}

export function Player({ song, className }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [song.audioUrl]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      if (!isNaN(audioDuration)) {
        setDuration(audioDuration);
      }
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (percentage: number) => {
    if (audioRef.current) {
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className={cn("flex flex-col z-50 items-center w-full", className)}>
      <div className="player w-full bg-white/10 p-5 rounded-3xl backdrop-blur-sm border border-white/10 animate-fadeIn">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          src={song.audioUrl}
          preload="metadata"
        />

        <AlbumCover coverUrl={song.coverUrl} isPlaying={isPlaying} />
        <PlayerInfo title={song.title} artist={song.artist} />

        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          isPlaying={isPlaying}
        />

        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          onPrevious={() => {
            if (audioRef.current) audioRef.current.currentTime = 0;
          }}
          onNext={() => {
            if (audioRef.current) audioRef.current.currentTime = 0;
          }}
        />
      </div>

      <div className="w-full space-y-3 mt-8">
        <SpotifyButton href={song.spotifyUrl} />
        <AppleMusicButton href={song.appleMusicUrl} />
      </div>
    </div>
  );
}
