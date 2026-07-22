import { PokemonInstance, Move } from '@/src/utils/dataLoader';

export class BattleAI {
  // Détermine la meilleure action pour l'ennemi
  static chooseMove(enemy: PokemonInstance, player: PokemonInstance): Move {
    if (!enemy.attacks || enemy.attacks.length === 0) {
      return { name: "Charge", type: "Normal", power: 30, accuracy: 100 };
    }

    // Stratégie simple : Choisit l'attaque ayant la plus forte puissance
    let bestMove = enemy.attacks[0];
    let maxPower = bestMove.power || 0;

    for (const move of enemy.attacks) {
      const power = move.power || 0;
      if (power > maxPower) {
        maxPower = power;
        bestMove = move;
      }
    }

    return bestMove;
  }
}
