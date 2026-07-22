import { createPokemonInstance, PokemonInstance, Move } from '@/src/utils/dataLoader';
import { calculateDamage } from './DamageCalculator';
import { BattleAI } from './AI';

export class BattleManager {
  player: PokemonInstance;
  enemy: PokemonInstance;

  constructor(playerId: string, enemyId: string) {
    const playerInstance = createPokemonInstance(playerId);
    const enemyInstance = createPokemonInstance(enemyId);

    if (!playerInstance || !enemyInstance) {
      throw new Error("Pokémon introuvable dans les fichiers JSON !");
    }

    this.player = playerInstance;
    this.enemy = enemyInstance;
  }

  // Exécute le tour du joueur avec un index d'attaque donné
  executePlayerTurn(attackIndex: number, activePlayerPokemon?: PokemonInstance) {
    const currentAttacker = activePlayerPokemon || this.player;
    const move = currentAttacker.attacks[attackIndex] || { name: "Charge", type: "Normal", power: 30, accuracy: 100 };
    
    const damage = calculateDamage(currentAttacker, this.enemy, move);
    this.enemy.hp = Math.max(0, this.enemy.hp - damage);
    
    return { move, damage, enemyHp: this.enemy.hp };
  }

  // Exécute le tour de l'ennemi en utilisant l'IA
  executeEnemyTurn(activePlayerPokemon?: PokemonInstance) {
    const currentDefender = activePlayerPokemon || this.player;
    const chosenMove = BattleAI.chooseMove(this.enemy, currentDefender);
    
    const damage = calculateDamage(this.enemy, currentDefender, chosenMove);
    currentDefender.hp = Math.max(0, currentDefender.hp - damage);
    
    return { move: chosenMove, damage, playerHp: currentDefender.hp };
  }
}
