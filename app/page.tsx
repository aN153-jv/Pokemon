"use client";

import { useEffect } from "react";
import Game from "@/src/engine/Game";

export default function Home() {
  useEffect(() => {
    const game = new Game("game-container");

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
}
