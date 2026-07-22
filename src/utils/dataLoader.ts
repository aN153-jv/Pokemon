import pokemonData from '@/src/data/pokemon.json';
import movesData from '@/src/data/moves.json';

export interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
}

export interface PokemonInstance {
  name: string;
  type: string;
  level: number;
  maxHp: number;
  hp: number;
  attacks: Move[];
  frontSprite: string;
  backSprite: string;
}

export function createPokemonInstance(id: string): PokemonInstance | null {
  // @ts-ignore
  const rawPokemon = pokemonData[id];
  if (!rawPokemon) return null;

  // Récupère les objets attaques complets à partir de leurs noms dans le JSON
  const moves: Move[] = rawPokemon.attacks.map((moveName: string) => {
    // @ts-ignore
    return movesData[moveName] || { name: moveName, type: "Normal", power: 30, accuracy: 100 };
  });

  return {
    name: rawPokemon.name,
    type: rawPokemon.type,
    level: rawPokemon.level,
    maxHp: rawPokemon.maxHp,
    hp: rawPokemon.hp,
    attacks: moves,
    frontSprite: rawPokemon.frontSprite,
    backSprite: rawPokemon.backSprite
  };
}
