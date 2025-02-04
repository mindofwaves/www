import { useRef } from "react";

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/your-audio-file.mp3" />
      <button
        onClick={handlePlay}
        className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Play Audio
      </button>
    </div>
  );
}

export default AudioPlayer;
