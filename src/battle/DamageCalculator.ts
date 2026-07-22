export function calculateDamage(attacker: any, defender: any, move: any): number {
  // Formule de dégâts basique (ou inspirée de Pokémon)
  const baseDamage = move.power;
  return Math.max(1, baseDamage);
}
