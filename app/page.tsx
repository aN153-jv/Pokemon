'use client';
import { useState } from 'react';
import WorldMap from '@/src/world/WorldMap';
import BattleComponent from '@/src/battle/BattleComponent';

export default function GamePage() {
  const [inBattle, setInBattle] = useState(false);

  return (
    <main>
      {!inBattle ? (
        <WorldMap onTriggerBattle={() => setInBattle(true)} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
          <BattleComponent />
          <button 
            onClick={() => setInBattle(false)}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-500 cursor-pointer"
          >
            Fuir le combat / Retour carte
          </button>
        </div>
      )}
    </main>
  );
}
