import { createPokemonInstance, PokemonInstance } from '@/src/utils/dataLoader';
import { calculateDamage } from './DamageCalculator';

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

  executePlayerTurn(attackIndex: number) {
    const move = this.player.attacks[attackIndex];
    const damage = calculateDamage(this.player, this.enemy, move);
    this.enemy.hp = Math.max(0, this.enemy.hp - damage);
    return { move, damage, enemyHp: this.enemy.hp };
  }

  executeEnemyTurn() {
    const randomMove = this.enemy.attacks[Math.floor(Math.random() * this.enemy.attacks.length)];
    const damage = calculateDamage(this.enemy, this.player, randomMove);
    this.player.hp = Math.max(0, this.player.hp - damage);
    return { move: randomMove, damage, playerHp: this.player.hp };
  }
}
