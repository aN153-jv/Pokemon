import { Move, PokemonInstance } from '@/src/utils/dataLoader';

export function calculateDamage(attacker: PokemonInstance, defender: PokemonInstance, move: Move): number {
  // Formule de base inspirée de Pokémon (simplifiée)
  const levelFactor = (2 * attacker.level) / 5 + 2;
  const powerFactor = move.power || 30;
  
  // Calcul brut des dégâts
  let damage = Math.floor((levelFactor * powerFactor * 0.5) / 50) + 2;

  // Variation aléatoire pour simuler le jeu d'origine (entre 85% et 100%)
  const randomMultiplier = (Math.floor(Math.random() * 16) + 85) / 100;
  damage = Math.floor(damage * randomMultiplier);

  return Math.max(1, damage); // Garantit au moins 1 dégât
}
