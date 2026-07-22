'use client';
import { useState } from 'react';
import { BattleManager } from './BattleManager';
import { PlayerTeam } from '@/src/player/PlayerTeam';
import { InventoryManager } from '@/src/inventory/InventoryManager';

export default function BattleComponent() {
  // Gestion de l'équipe du joueur et de l'adversaire
  const [playerTeam] = useState(() => new PlayerTeam(['pikachu', 'dracaufeu']));
  const [inventory] = useState(() => new InventoryManager());
  
  const [battle] = useState(() => new BattleManager(playerTeam.getActiveModelId ? 'pikachu' : 'pikachu', 'dracaufeu'));

  const [activePokemon, setActivePokemon] = useState(playerTeam.getActivePokemon());
  const [playerHp, setPlayerHp] = useState(activePokemon.hp);
  const [enemyHp, setEnemyHp] = useState(battle.enemy.hp);
  const [dialogue, setDialogue] = useState(`Que doit faire ${activePokemon.name} ?`);
  const [isLocked, setIsLocked] = useState(false);
  const [showTeamMenu, setShowTeamMenu] = useState(false);
  const [showBag, setShowBag] = useState(false);

  // Changement de Pokémon actif
  const handleSwitchPokemon = (index: number) => {
    const success = playerTeam.switchPokemon(index);
    if (!success) {
      setDialogue("Ce Pokémon ne peut pas combattre !");
      return;
    }

    const newActive = playerTeam.getActivePokemon();
    setActivePokemon(newActive);
    setPlayerHp(newActive.hp);
    setShowTeamMenu(false);
    setIsLocked(true);

    setDialogue(`Reviens ! Go, ${newActive.name} !`);

    setTimeout(() => {
      const eResult = battle.executeEnemyTurn();
      setPlayerHp(eResult.playerHp);
      setDialogue(`Le ${battle.enemy.name} adverse utilise ${eResult.move.name} !`);

      setTimeout(() => {
        setDialogue(`Que doit faire ${newActive.name} ?`);
        setIsLocked(false);
      }, 1500);
    }, 1500);
  };

  const handleAttackClick = (index: number) => {
    if (isLocked) return;
    setIsLocked(true);

    // Tour du joueur (en prenant les attaques du Pokémon actif)
    const move = activePokemon.attacks[index];
    const damage = move ? move.power : 30;
    const newEnemyHp = Math.max(0, battle.enemy.hp - damage);
    battle.enemy.hp = newEnemyHp;
    setEnemyHp(newEnemyHp);

    setDialogue(`${activePokemon.name} utilise ${move.name} !`);

    if (newEnemyHp <= 0) {
      setTimeout(() => setDialogue(`Victoire ! ${battle.enemy.name} est K.O. !`), 1000);
      return;
    }

    // Tour de l'ennemi
    setTimeout(() => {
      const eResult = battle.executeEnemyTurn();
      setPlayerHp(eResult.playerHp);
      playerTeam.updateActiveHp(eResult.playerHp);
      setDialogue(`Le ${battle.enemy.name} adverse utilise ${eResult.move.name} !`);

      if (eResult.playerHp <= 0) {
        setTimeout(() => setDialogue(`${activePokemon.name} est K.O...`), 1000);
        return;
      }

      setTimeout(() => {
        setDialogue(`Que doit faire ${activePokemon.name} ?`);
        setIsLocked(false);
      }, 1500);

    }, 1500);
  };

  return (
    <div className="flex flex-col w-[600px] h-[400px] border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl font-mono mx-auto mt-10">
      {/* Arène de combat */}
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

        {/* Joueur Actif */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <img src={activePokemon.backSprite} alt={activePokemon.name} className="w-28 h-28" style={{ imageRendering: 'pixelated' }} />
          <div className="bg-white/90 border-2 border-gray-600 p-2 rounded-lg w-40 text-sm shadow">
            <div className="flex justify-between font-bold">
              <span>{activePokemon.name}</span>
              <span>Lv {activePokemon.level}</span>
            </div>
            <div className="w-full bg-gray-300 h-2.5 border border-black rounded my-1 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500" 
                style={{ width: `${(playerHp / activePokemon.maxHp) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs">{playerHp}/{activePokemon.maxHp}</span>
          </div>
        </div>
      </div>

      {/* Menu et Contrôles */}
      <div className="flex flex-1 bg-gray-800 border-t-4 border-gray-900">
        <div className="flex-[1.5] bg-gray-50 border-4 border-gray-600 m-2.5 p-3 text-sm font-bold text-gray-800 rounded">
          {dialogue}
        </div>
        <div className="flex-[1.5] grid grid-cols-2 gap-2 p-2.5">
          {!showTeamMenu ? (
            <>
              {activePokemon.attacks.map((att, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAttackClick(idx)}
                  disabled={isLocked}
                  className="bg-yellow-400 border-2 border-blue-600 rounded font-bold text-blue-800 text-xs hover:bg-yellow-300 disabled:opacity-50 cursor-pointer"
                >
                  {att.name}
                </button>
              ))}
              <button
                onClick={() => setShowTeamMenu(true)}
                disabled={isLocked}
                className="bg-purple-500 border-2 border-white rounded font-bold text-white text-xs hover:bg-purple-400 cursor-pointer"
              >
                ÉQUIPE
              </button>
            </>
          ) : (
            <>
              {playerTeam.team.map((poke, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSwitchPokemon(idx)}
                  className={`border-2 rounded font-bold text-xs cursor-pointer p-1 ${poke.hp > 0 ? 'bg-blue-400 text-white hover:bg-blue-300' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                >
                  {poke.name} ({poke.hp}/{poke.maxHp})
                </button>
              ))}
              <button
                onClick={() => setShowTeamMenu(false)}
                className="col-span-2 bg-gray-600 border-2 border-white rounded font-bold text-white text-xs hover:bg-gray-500 cursor-pointer"
              >
                RETOUR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
