'use client';
import { useState, useEffect } from 'react';

// Types de tuiles pour la carte
type TileType = 'grass' | 'path' | 'tree' | 'building';

const MAP_GRID: TileType[][] = [
  ['tree', 'tree', 'tree', 'building', 'tree'],
  ['tree', 'path', 'path', 'path', 'tree'],
  ['tree', 'path', 'grass', 'path', 'tree'],
  ['tree', 'path', 'path', 'path', 'tree'],
  ['tree', 'tree', 'tree', 'tree', 'tree'],
];

export default function WorldMap({ onTriggerBattle }: { onTriggerBattle: () => void }) {
  const [playerPosition, setPlayerPosition] = useState({ x: 2, y: 2 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let { x, y } = playerPosition;

      if (e.key === 'ArrowUp' || e.key === 'z') y -= 1;
      if (e.key === 'ArrowDown' || e.key === 's') y += 1;
      if (e.key === 'ArrowLeft' || e.key === 'q') x -= 1;
      if (e.key === 'ArrowRight' || e.key === 'd') x += 1;

      // Vérifie les limites de la carte et les collisions avec les arbres
      if (
        y >= 0 &&
        y < MAP_GRID.length &&
        x >= 0 &&
        x < MAP_GRID[0].length &&
        MAP_GRID[y][x] !== 'tree'
      ) {
        setPlayerPosition({ x, y });

        // Si le joueur marche sur des hautes herbes, déclenche un combat aléatoire (30% de chance)
        if (MAP_GRID[y][x] === 'grass' && Math.random() < 0.3) {
          onTriggerBattle();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, onTriggerBattle]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 font-mono">
      <div className="text-white mb-4 text-center">
        <h2 className="text-xl font-bold">Route 1</h2>
        <p className="text-xs text-gray-400">Utilisez les flèches du clavier ou ZQSD pour vous déplacer</p>
      </div>

      <div className="border-4 border-gray-700 bg-green-800 p-2 rounded shadow-2xl">
        {MAP_GRID.map((row, y) => (
          <div key={y} className="flex">
            {row.map((tile, x) => {
              const isPlayer = playerPosition.x === x && playerPosition.y === y;
              
              // Style visuel selon la tuile
              let bgColor = 'bg-green-600'; // Chemin par défaut
              if (tile === 'tree') bgColor = 'bg-green-900 border border-green-950';
              if (tile === 'grass') bgColor = 'bg-green-500 animate-pulse';
              if (tile === 'building') bgColor = 'bg-red-700';

              return (
                <div
                  key={x}
                  className={`w-14 h-14 flex items-center justify-center relative ${bgColor}`}
                >
                  {isPlayer && (
                    <div className="w-10 h-10 bg-yellow-400 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold shadow">
                      👦
                    </div>
                  )}
                  {!isPlayer && tile === 'building' && <span className="text-xs text-white font-bold">🏠</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
