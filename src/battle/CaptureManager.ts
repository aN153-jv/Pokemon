import { PokemonInstance } from '@/src/utils/dataLoader';

export class CaptureManager {
  static tryCatch(enemy: PokemonInstance): boolean {
    // Plus le Pokémon adverse a peu de PV, plus il est facile à capturer
    const hpPercentage = enemy.hp / enemy.maxHp;
    
    // Formule simplifiée : base de 30% de chance, monte jusqu'à 80% si PV très bas
    const catchRate = 0.3 + (1 - hpPercentage) * 0.5;
    const roll = Math.random();

    return roll <= catchRate;
  }
}
