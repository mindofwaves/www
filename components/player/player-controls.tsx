interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}: PlayerControlsProps) {
  return (
    <div className="mt-5 flex justify-between items-center px-10">
      <button
        onClick={onPrevious}
        className="text-gray-400 hover:text-[#1DB954] transition-colors"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6L9 12L19 18V6Z M7 6V18H5V6H7Z" />
        </svg>
      </button>

      <button
        onClick={onPlayPause}
        className="text-[#1DB954] hover:scale-110 transition-transform"
      >
        {isPlaying ? (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <button
        onClick={onNext}
        className="text-gray-400 hover:text-[#1DB954] transition-colors"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 18L15 12L5 6V18Z M17 6V18h2V6H17Z" />
        </svg>
      </button>
    </div>
  );
}
