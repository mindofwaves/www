import React from "react";
import MorphingText from "@/components/player/morphing.text";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <MorphingText texts={["games", "and", "heartbreaks"]} />
    </div>
  );
} 