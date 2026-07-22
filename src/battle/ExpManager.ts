import { PokemonInstance } from '@/src/utils/dataLoader';

export class ExpManager {
  // Calcule l'EXP gagnée en fonction du niveau de l'ennemi vaincu
  static calculateExpReward(enemyLevel: number): number {
    return enemyLevel * 15;
  }

  // Gère l'ajout d'EXP et vérifie si le Pokémon monte de niveau
  static addExp(pokemon: PokemonInstance, expGained: number): { leveledUp: boolean; newLevel: number } {
    // Initialise les propriétés si elles n'existent pas encore dans l'instance
    pokemon.exp = (pokemon.exp || 0) + expGained;
    pokemon.maxExp = pokemon.maxExp || (pokemon.level * 100);

    let leveledUp = false;

    while (pokemon.exp >= pokemon.maxExp) {
      pokemon.exp -= pokemon.maxExp;
      pokemon.level += 1;
      pokemon.maxExp = pokemon.level * 100;

      // Augmentation des statistiques lors du passage de niveau
      pokemon.maxHp += 10;
      pokemon.hp = pokemon.maxHp; // Soin complet au level-up (style classique)
      
      leveledUp = true;
    }

    return { leveledUp, newLevel: pokemon.level };
  }
}
