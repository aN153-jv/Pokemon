'use client';
import { useState } from 'react';
import WorldMap from '@/src/world/WorldMap'; // ou le chemin correspondant
import BattleComponent from '@/src/battle/BattleComponent';

export default function Home() {
  const [inBattle, setInBattle] = useState(false);

  return (
    <main className="min-h-screen bg-gray-900">
      {inBattle ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <BattleComponent />
          <button 
            onClick={() => setInBattle(false)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded font-bold cursor-pointer"
          >
            Fuir le combat
          </button>
        </div>
      ) : (
        <WorldMap onTriggerBattle={() => setInBattle(true)} />
      )}
    </main>
  );
}
