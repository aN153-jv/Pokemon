'use client';
import { useState, useEffect } from 'react';

export default function WorldMap({ onTriggerBattle }: { onTriggerBattle: () => void }) {
  const [position, setPosition] = useState({ x: 5, y: 5 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === 'ArrowUp') newY -= 1;
        if (e.key === 'ArrowDown') newY += 1;
        if (e.key === 'ArrowLeft') newX -= 1;
        if (e.key === 'ArrowRight') newX += 1;

        // Exemple : déclencher un combat aléatoire en bougeant
        if (Math.random() < 0.1) {
          onTriggerBattle();
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTriggerBattle]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-800 text-white font-mono">
      <h2 className="text-xl mb-4">Exploration du Monde</h2>
      <p>Position du joueur : X: {position.x}, Y: {position.y}</p>
      <p className="text-sm text-green-300 mt-2">Utilisez les flèches du clavier pour vous déplacer.</p>
    </div>
  );
}
