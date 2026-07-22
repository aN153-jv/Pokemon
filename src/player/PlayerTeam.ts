import { createPokemonInstance, PokemonInstance } from '@/src/utils/dataLoader';

export class PlayerTeam {
  team: PokemonInstance[] = [];
  activeIndex: number = 0;

  constructor(starterIds: string[] = ['pikachu']) {
    // Initialise l'équipe à partir des IDs du JSON
    this.team = starterIds
      .map(id => createPokemonInstance(id))
      .filter((p): p is PokemonInstance => p !== null);
  }

  getActivePokemon(): PokemonInstance {
    return this.team[this.activeIndex];
  }

  switchPokemon(index: number): boolean {
    if (index >= 0 && index < this.team.length && this.team[index].hp > 0 && index !== this.activeIndex) {
      this.activeIndex = index;
      return true;
    }
    return false;
  }

  hasAvailablePokemon(): boolean {
    return this.team.some(p => p.hp > 0);
  }
}
