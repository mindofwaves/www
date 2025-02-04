"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";

interface AlbumCoverProps {
  coverUrl: string;
  isPlaying: boolean;
}

export function AlbumCover({ coverUrl, isPlaying }: AlbumCoverProps) {
  return (
    <div className="relative [perspective:1000px]">
      <div
        className="relative animate-spin3d"
        style={{
          transformStyle: "preserve-3d",
          animation: isPlaying ? "spin3d 20s linear infinite" : "none",
        }}
      >
        <Tilt
          perspective={1000}
          glareMaxOpacity={0.25}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          scale={1.05}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src={coverUrl}
            width={500}
            height={500}
            alt="Album cover"
            className="object-cover rounded-xl shadow-xl transition-all duration-300 will-change-transform"
          />
        </Tilt>
      </div>
    </div>
  );
}
