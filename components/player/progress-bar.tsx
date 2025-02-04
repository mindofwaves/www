interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (percentage: number) => void;
  isPlaying: boolean;
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
  isPlaying,
}: ProgressBarProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(percentage);
  };

  return (
    <div className="px-4 mt-5">
      <div
        className="h-1 bg-white/10 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <div
          className={`h-full bg-[#1DB954] rounded-full relative ${
            isPlaying ? "playing" : ""
          }`}
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
