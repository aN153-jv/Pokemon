import { calculateDamage } from './DamageCalculator';
import { getPokemonById } from '@/src/utils/dataLoader';

// Exemple d'initialisation propre avec vos fichiers JSON
const pikachuTemplate = getPokemonById('pikachu');
const charizardTemplate = getPokemonById('dracaufeu');

export class BattleManager {
  player: any;
  enemy: any;

  constructor(player: any, enemy: any) {
    this.player = player;
    this.enemy = enemy;
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
