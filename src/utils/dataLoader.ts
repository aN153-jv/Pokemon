import pokemonData from '@/src/data/pokemon.json';
import movesData from '@/src/data/moves.json';
import itemsData from '@/src/data/items.json';

export interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
}

export interface PokemonTemplate {
  name: string;
  type: string;
  level: number;
  maxHp: number;
  hp: number;
  attacks: string[]; // Noms des attaques
  frontSprite: string;
  backSprite: string;
}

export function getPokemon(id: string): PokemonTemplate | null {
  const pokemons = pokemonData as Record<string, PokemonTemplate>;
  return pokemons[id] || null;
}

export function getMove(moveName: string): Move | null {
  const moves = movesData as Record<string, Move>;
  return moves[moveName] || null;
}

// Récupère les vrais objets d'attaques complets pour un Pokémon
export function getPokemonMoves(pokemonId: string): Move[] {
  const pokemon = getPokemon(pokemonId);
  if (!pokemon) return [];
  
  return pokemon.attacks
    .map(moveName => getMove(moveName))
    .filter((move): move is Move => move !== null);
}
