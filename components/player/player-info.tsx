interface PlayerInfoProps {
  title: string;
  artist: string;
}

export function PlayerInfo({ title, artist }: PlayerInfoProps) {
  return (
    <div className="mt-6 px-4">
      <h2 className="text-[#1DB954] text-3xl font-bold">{title}</h2>
      <h3 className="text-gray-400 text-lg">{artist}</h3>
    </div>
  );
}
