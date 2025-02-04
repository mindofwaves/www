import { Player } from "@/components/player";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="size-full relative ">
      <BackgroundGradientAnimation />
      <div className="absolute inset-0 blur-xl z-10 bg-cover opacity-40 bg-[url('/cover.jpg')] bg-no-repeat bg-center animate-floating" />
      <Player
        className="absolute z-50 w-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
  );
}
