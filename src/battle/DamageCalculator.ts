import { Move, PokemonInstance } from '@/src/utils/dataLoader';

// Table des types simplifiée (Multiplicateur de dégâts)
const TYPE_CHART: Record<string, Record<string, number>> = {
  Feu: { Plante: 2.0, Eau: 0.5, Feu: 0.5, Electrik: 1.0 },
  Eau: { Feu: 2.0, Plante: 0.5, Eau: 0.5, Electrik: 1.0 },
  Plante: { Eau: 2.0, Feu: 0.5, Plante: 0.5, Electrik: 1.0 },
  Electrik: { Eau: 2.0, Plante: 0.5, Electrik: 0.5, Feu: 1.0 },
  Normal: { Feu: 1.0, Eau: 1.0, Plante: 1.0, Electrik: 1.0, Acier: 1.0 },
  Acier: { Feu: 0.5, Eau: 0.5, Electrik: 0.5, Acier: 1.0 }
};

export function calculateDamage(attacker: PokemonInstance, defender: PokemonInstance, move: Move): { damage: number; isEffective: boolean; isIneffective: boolean } {
  const levelFactor = (2 * (attacker.level || 50)) / 5 + 2;
  const powerFactor = move.power || 30;
  
  // Calcul de base
  let baseDamage = Math.floor((levelFactor * powerFactor * 0.5) / 50) + 2;

  // Multiplicateur de type
  let typeMultiplier = 1.0;
  if (move.type && defender.type && TYPE_CHART[move.type] && TYPE_CHART[move.type][defender.type] !== undefined) {
    typeMultiplier = TYPE_CHART[move.type][defender.type];
  }

  // Application du multiplicateur et variation aléatoire (85% à 100%)
  const randomFactor = (Math.floor(Math.random() * 16) + 85) / 100;
  let finalDamage = Math.floor(baseDamage * typeMultiplier * randomFactor);

  return {
    damage: Math.max(1, finalDamage),
    isEffective: typeMultiplier > 1.0,
    isIneffective: typeMultiplier < 1.0
  };
}
