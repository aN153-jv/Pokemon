'use client';
import { useState } from 'react';
import { BattleManager } from './BattleManager';

export default function BattleComponent() {
  // On initialise le manager avec les identifiants présents dans pokemon.json
  const [battle] = useState(() => new BattleManager('pikachu', 'dracaufeu'));

  const [playerHp, setPlayerHp] = useState(battle.player.hp);
  const [enemyHp, setEnemyHp] = useState(battle.enemy.hp);
  const [dialogue, setDialogue] = useState(`Que doit faire ${battle.player.name} ?`);
  const [isLocked, setIsLocked] = useState(false);

  const handleAttackClick = (index: number) => {
    if (isLocked) return;
    setIsLocked(true);

    // Tour du joueur
    const pResult = battle.executePlayerTurn(index);
    setEnemyHp(pResult.enemyHp);
    setDialogue(`${battle.player.name} utilise ${pResult.move.name} !`);

    if (pResult.enemyHp <= 0) {
      setTimeout(() => setDialogue(`Victoire ! ${battle.enemy.name} est K.O. !`), 1000);
      return;
    }

    // Tour de l'ennemi
    setTimeout(() => {
      const eResult = battle.executeEnemyTurn();
      setPlayerHp(eResult.playerHp);
      setDialogue(`Le ${battle.enemy.name} adverse utilise ${eResult.move.name} !`);

      if (eResult.playerHp <= 0) {
        setTimeout(() => setDialogue(`${battle.player.name} est K.O... Vous avez perdu !`), 1000);
        return;
      }

      setTimeout(() => {
        setDialogue(`Que doit faire ${battle.player.name} ?`);
        setIsLocked(false);
      }, 1500);

    }, 1500);
  };

  return (
    <div className="flex flex-col w-[600px] h-[400px] border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl font-mono mx-auto mt-10">
      {/* Arène */}
      <div className="relative flex-2 bg-gradient-to-b from-sky-300 to-green-300 p-5">
        {/* Ennemi */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="bg-white/90 border-2 border-gray-600 p-2 rounded-lg w-40 text-sm shadow">
            <div className="flex justify-between font-bold">
              <span>{battle.enemy.name}</span>
              <span>Lv {battle.enemy.level}</span>
            </div>
            <div className="w-full bg-gray-300 h-2.5 border border-black rounded my-1 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500" 
                style={{ width: `${(enemyHp / battle.enemy.maxHp) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs">{enemyHp}/{battle.enemy.maxHp}</span>
          </div>
          <img src={battle.enemy.frontSprite} alt={battle.enemy.name} className="w-28 h-28" style={{ imageRendering: 'pixelated' }} />
        </div>

        {/* Joueur */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <img src={battle.player.backSprite} alt={battle.player.name} className="w-28 h-28" style={{ imageRendering: 'pixelated' }} />
          <div className="bg-white/90 border-2 border-gray-600 p-2 rounded-lg w-40 text-sm shadow">
            <div className="flex justify-between font-bold">
              <span>{battle.player.name}</span>
              <span>Lv {battle.player.level}</span>
            </div>
            <div className="w-full bg-gray-300 h-2.5 border border-black rounded my-1 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500" 
                style={{ width: `${(playerHp / battle.player.maxHp) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs">{playerHp}/{battle.player.maxHp}</span>
          </div>
        </div>
      </div>

      {/* Menu / Dialogue */}
      <div className="flex flex-1 bg-gray-800 border-t-4 border-gray-900">
        <div className="flex-[1.5] bg-gray-50 border-4 border-gray-600 m-2.5 p-3 text-sm font-bold text-gray-800 rounded">
          {dialogue}
        </div>
        <div className="flex-[1.5] grid grid-cols-2 gap-2 p-2.5">
          {battle.player.attacks.map((att, idx) => (
            <button
              key={idx}
              onClick={() => handleAttackClick(idx)}
              disabled={isLocked}
              className="bg-yellow-400 border-2 border-blue-600 rounded font-bold text-blue-800 text-xs hover:bg-yellow-300 disabled:opacity-50 cursor-pointer"
            >
              {att.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
